// Import custom error
import LOG_ROUTE_PATH from '../constants/LOG_ROUTE_PATH';
import ErrorWithCode from '../errors/ErrorWithCode';

// Import shared helpers
import genRouteHandler from '../helpers/genRouteHandler';
import ParamType from '../types/ParamType';

// Import shared types
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
 */
const initServer = (
  opts: {
    app: any,
    getLaunchInfo: GetLaunchInfoFunction,
    logCollection?: any,
  },
) => {
  _cacclGetLaunchInfo = opts.getLaunchInfo;
  _logCollection = opts.logCollection;

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
        metadata: ParamType.JSON,
        errorMessage: ParamType.StringOptional,
        errorCode: ParamType.StringOptional,
        errorStack: ParamType.StringOptional,
        target: ParamType.StringOptional,
        action: ParamType.StringOptional,
      },
      handler: ({ params, logServerEvent }) => {
        const log = logServerEvent(
          (params.errorMessage || params.errorCode || params.errorStack)
            // Error
            ? {
              context: params.context,
              subcontext: params.subcontext,
              tags: params.tags,
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
              metadata: params.metadata,
              target: params.target,
              action: params.action,
            }
        );

        return log;
      },
    }),
  );
};

export default initServer;
