// Import custom error
import ErrorWithCode from '../errors/ErrorWithCode';

// Import shared constants
import LOG_REVIEW_ROUTE_PATH_PREFIX from '../constants/LOG_REVIEW_ROUTE_PATH_PREFIX';
import LOG_ROUTE_PATH from '../constants/LOG_ROUTE_PATH';
import LOG_REVIEW_STATUS_ROUTE from '../constants/LOG_REVIEW_STATUS_ROUTE';

// Import shared helpers
import genRouteHandler from '../helpers/genRouteHandler';

// Import shared types
import Log from '../types/Log';
import LogFunction from '../types/LogFunction';
import ParamType from '../types/ParamType';
import ReactKitErrorCode from '../types/ReactKitErrorCode';

// Types
type GetLaunchInfoFunction = (req: any) => {
  launched: boolean,
  launchInfo?: any,
};

// Stored copy of caccl functions
let _cacclGetLaunchInfo: GetLaunchInfoFunction;

// Stored copy of dce-mango log collection
let _logCollection: any;

/*------------------------------------------------------------------------*/
/*                                 Helpers                                */
/*------------------------------------------------------------------------*/

/**
 * Get launch info via CACCL
 * @author Gabe Abrams
 * @param req express request object
 * @returns object { launched, launchInfo }
 */
export const cacclGetLaunchInfo: GetLaunchInfoFunction = (req: any) => {
  if (!_cacclGetLaunchInfo) {
    throw new ErrorWithCode(
      'Could not get launch info because server was not initialized with dce-reactkit\'s initServer function',
      ReactKitErrorCode.NoCACCLGetLaunchInfoFunction,
    );
  }

  return _cacclGetLaunchInfo(req);
};

/**
 * Get log collection
 * @author Gabe Abrams
 * @returns log collection if one was included during launch or null if we don't
 *   have a log collection (yet)
 */
export const internalGetLogCollection = () => {
  return _logCollection ?? null;
};

/*------------------------------------------------------------------------*/
/*                                  Main                                  */
/*------------------------------------------------------------------------*/

/**
 * Prepare dce-reactkit to run on the server
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.app express app from inside of the postprocessor function that
 *   we will add routes to
 * @param opts.getLaunchInfo CACCL LTI's get launch info function
 * @param [opts.logCollection] mongo collection from dce-mango to use for
 *   storing logs. If none is included, logs are written to the console
 * @param [opts.logReviewAdmins=all] info on which admins can review
 *   logs from the client. If not included, all Canvas admins are allowed to
 *   review logs. If null, no Canvas admins are allowed to review logs.
 *   If an array of Canvas userIds (numbers), only Canvas admins with those
 *   userIds are allowed to review logs. If a dce-mango collection, only
 *   Canvas admins with entries in that collection ({ userId, ...}) are allowed
 *   to review logs
 */
const initServer = (
  opts: {
    app: any,
    getLaunchInfo: GetLaunchInfoFunction,
    logCollection?: any,
    logReviewAdmins?: (number[] | any),
  },
) => {
  _cacclGetLaunchInfo = opts.getLaunchInfo;
  _logCollection = opts.logCollection;

  /*----------------------------------------*/
  /*                Logging                 */
  /*----------------------------------------*/

  /**
   * Log an event
   * @author Gabe Abrams
   * @param {string} context Context of the event (each app determines how to
   *   organize its contexts)
   * @param {string} subcontext Subcontext of the event (each app determines
   *   how to organize its subcontexts)
   * @param {string} tags stringified list of tags that apply to this action
   *   (each app determines tag usage)
   * @param {string} metadata stringified object containing optional custom metadata
   * @param {string} level log level
   * @param {string} [errorMessage] error message if type is an error
   * @param {string} [errorCode] error code if type is an error
   * @param {string} [errorStack] error stack if type is an error
   * @param {string} [target] Target of the action (each app determines the list
   *   of targets) These are usually buttons, panels, elements, etc.
   * @param {LogAction} [action] the type of action performed on the target
   * @returns {Log}
   */
  opts.app.post(
    LOG_ROUTE_PATH,
    genRouteHandler({
      paramTypes: {
        context: ParamType.String,
        subcontext: ParamType.String,
        tags: ParamType.JSON,
        level: ParamType.String,
        metadata: ParamType.JSON,
        errorMessage: ParamType.StringOptional,
        errorCode: ParamType.StringOptional,
        errorStack: ParamType.StringOptional,
        target: ParamType.StringOptional,
        action: ParamType.StringOptional,
      },
      handler: ({ params, logServerEvent }) => {
        // Create log info
        const logInfo: Parameters<LogFunction>[0] = (
          (params.errorMessage || params.errorCode || params.errorStack)
            // Error
            ? {
              context: params.context,
              subcontext: params.subcontext,
              tags: params.tags,
              level: params.level,
              metadata: params.metadata,
              error: {
                message: params.errorMessage,
                code: params.errorCode,
                stack: params.errorStack,
              },
            }
            // Action
            : {
              context: params.context,
              subcontext: params.subcontext,
              tags: params.tags,
              level: params.level,
              metadata: params.metadata,
              target: params.target,
              action: params.action,
            }
        );

        // Add hidden boolean to change source to "client"
        const logInfoForcedFromClient = {
          ...logInfo,
          overrideAsClientEvent: true,
        };

        // Write the log
        const log = logServerEvent(logInfoForcedFromClient);

        // Return
        return log;
      },
    }),
  );

  /*----------------------------------------*/
  /*              Log Reviewer              */
  /*----------------------------------------*/

  /**
   * Check if a given user is allowed to review logs
   * @author Gabe Abrams
   * @param userId the id of the user
   * @param isAdmin if true, the user is an admin
   * @returns true if the user can review logs
   */
  const canReviewLogs = async (
    userId: number,
    isAdmin: boolean,
  ): Promise<boolean> => {
    // Immediately deny access if user is not an admin
    if (!isAdmin) {
      return false;
    }

    // If all admins are allowed, we're done
    if (!opts.logReviewAdmins) {
      return true;
    }

    // Do a dynamic check
    try {
      // Array of userIds
      if (Array.isArray(opts.logReviewAdmins)) {
        return opts.logReviewAdmins.some((allowedId) => {
          return (userId === allowedId);
        });
      }

      // Must be a collection
      const matches = await opts.logReviewAdmins.find({ userId });

      // Make sure at least one entry matches
      return matches.length > 0;
    } catch (err) {
      // If an error occurred, simply return false
      return false;
    }
  };

  /**
   * Check if the current user has access to logs
   * @author Gabe Abrams
   * @returns {boolean} true if user has access
   */
  opts.app.get(
    LOG_REVIEW_STATUS_ROUTE,
    genRouteHandler({
      handler: async ({ params }) => {
        const { userId, isAdmin } = params;
        const canReview = await canReviewLogs(userId, isAdmin);
        return canReview;
      },
    }),
  );

  /**
 * Get filtered logs based on provided filters
 * @author Gabe Abrams, Yuen Ler Chow
 * @returns {Log[]} list of logs that match the filters
 */
  opts.app.get(
    `${LOG_REVIEW_ROUTE_PATH_PREFIX}/logs`,
    genRouteHandler({
      paramTypes: {
        pageNumber: ParamType.Int,
        filters: ParamType.JSON,
      },
      handler: async ({ params }) => {
      // Get user info
        const {
          pageNumber,
          userId,
          isAdmin,
          filters,
        } = params;

        // Validate user
        const canReview = await canReviewLogs(userId, isAdmin);
        if (!canReview) {
          throw new ErrorWithCode(
            'You cannot access this resource because you do not have the appropriate permissions.',
            ReactKitErrorCode.NotAllowedToReviewLogs,
          );
        }

        // Build MongoDB query based on filters
        const query: any = {};

        /* -------------- Date Filter ------------- */
        const { startDate, endDate } = filters.dateFilterState;
        const startTimestamp = new Date(startDate.year, startDate.month - 1, startDate.day).getTime();
        const endTimestamp = new Date(endDate.year, endDate.month - 1, endDate.day + 1).getTime() - 1;

        query.timestamp = {
          $gte: startTimestamp,
          $lte: endTimestamp,
        };

        /* ------------ Context Filter ------------ */
        const { contextFilterState } = filters;
        const contextConditions: any[] = [];

        Object.keys(contextFilterState).forEach((context) => {
          const value = contextFilterState[context];
          if (typeof value === 'boolean') {
            if (value) {
              // The entire context is selected
              contextConditions.push({ context });
            }
          } else {
            // The context has subcontexts
            const subcontexts = Object.keys(value).filter((subcontext) => { return value[subcontext]; });
            if (subcontexts.length > 0) {
              contextConditions.push({
                context,
                subcontext: { $in: subcontexts },
              });
            }
          }
        });

        if (contextConditions.length > 0) {
          query.$or = contextConditions;
        }

        /* -------------- Tag Filter -------------- */
        const { tagFilterState } = filters;
        const selectedTags = Object.keys(tagFilterState).filter((tag) => { return tagFilterState[tag]; });
        if (selectedTags.length > 0) {
          query.tags = { $in: selectedTags };
        }

        /* --------- Action/Error Filter ---------- */
        const { actionErrorFilterState } = filters;

        if (actionErrorFilterState.type) {
          query.type = actionErrorFilterState.type;
        }

        if (actionErrorFilterState.type === 'error' && actionErrorFilterState.errorMessage) {
          query.errorMessage = { $regex: actionErrorFilterState.errorMessage, $options: 'i' };
        }

        if (actionErrorFilterState.type === 'error' && actionErrorFilterState.errorCode) {
          query.errorCode = { $regex: actionErrorFilterState.errorCode, $options: 'i' };
        }

        if (actionErrorFilterState.type === 'action') {
          const selectedTargets = Object.keys(actionErrorFilterState.target).filter(
            (target) => { return actionErrorFilterState.target[target]; },
          );
          const selectedActions = Object.keys(actionErrorFilterState.action).filter(
            (action) => { return actionErrorFilterState.action[action]; },
          );
          if (selectedTargets.length > 0) {
            query.target = { $in: selectedTargets };
          }
          if (selectedActions.length > 0) {
            query.action = { $in: selectedActions };
          }
        }

        /* ------------ Advanced Filter ----------- */
        const { advancedFilterState } = filters;

        if (advancedFilterState.userFirstName) {
          query.userFirstName = { $regex: advancedFilterState.userFirstName, $options: 'i' };
        }

        if (advancedFilterState.userLastName) {
          query.userLastName = { $regex: advancedFilterState.userLastName, $options: 'i' };
        }

        if (advancedFilterState.userEmail) {
          query.userEmail = { $regex: advancedFilterState.userEmail, $options: 'i' };
        }

        if (advancedFilterState.userId) {
          query.userId = parseInt(advancedFilterState.userId, 10);
        }

        const roles = [];
        if (advancedFilterState.includeLearners) {
          roles.push({ isLearner: true });
        }
        if (advancedFilterState.includeTTMs) {
          roles.push({ isTTM: true });
        }
        if (advancedFilterState.includeAdmins) {
          roles.push({ isAdmin: true });
        }
        if (roles.length > 0) {
          query.$and = [{ $or: roles }];
        }

        if (advancedFilterState.courseId) {
          query.courseId = parseInt(advancedFilterState.courseId, 10);
        }

        if (advancedFilterState.courseName) {
          query.courseName = { $regex: advancedFilterState.courseName, $options: 'i' };
        }

        if (advancedFilterState.isMobile !== undefined) {
          query['device.isMobile'] = advancedFilterState.isMobile;
        }

        if (advancedFilterState.source) {
          query.source = advancedFilterState.source;
        }

        if (advancedFilterState.routePath) {
          query.routePath = { $regex: advancedFilterState.routePath, $options: 'i' };
        }

        if (advancedFilterState.routeTemplate) {
          query.routeTemplate = { $regex: advancedFilterState.routeTemplate, $options: 'i' };
        }

        // Query for logs
        const response = await _logCollection.findPaged({
          query,
          perPage: 50,
          pageNumber,
        });

        // Return response
        return response;
      },
    }),
  );
};

export default initServer;
