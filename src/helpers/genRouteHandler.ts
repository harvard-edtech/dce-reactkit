// Import caccl functions
import { cacclGetLaunchInfo } from '../server/initServer';

// Import shared types
import ReactKitErrorCode from '../types/ReactKitErrorCode';
import ParamType from '../types/ParamType';

// Import helpers
import handleError from './handleError';
import handleSuccess from './handleSuccess';

/**
 * Generate an express API route handler
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.paramTypes map containing the types for each parameter that is
 *   included in the request (map: param name => type)
 * @param opts.handler function that processes the request
 * @returns express route handler that takes the following arguments:
 *   params (map: param name => value), handleSuccess (function for handling
 *   successful requests), handleError (function for handling failed requests),
 *   req (express request object), res (express response object),
 *   next (express next function). Params also has userId, userFirstName,
 *   userLastName, isLearner, isTTM, isAdmin, and any other variables that
 *   are directly added to the session
 */
const genRouteHandler = (
  opts: {
    paramTypes?: {
      [k: string]: ParamType
    },
    handler: (
      opts: {
        params: {
          [k: string]: any
        },
        req: any,
        res: any,
        next: () => void,
      },
    ) => any,
  },
) => {
  // Return a route handler
  return async (req: any, res: any, next: () => void) => {
    // Output params
    const output: { [k in string]: any } = {};

    /*----------------------------------------*/
    /*              Parse Params              */
    /*----------------------------------------*/

    // Process items one by one
    const paramList = Object.entries(opts.paramTypes ?? {});
    for (let i = 0; i < paramList.length; i++) {
      const [name, type] = paramList[i];

      // Find the value as a string
      const value = (
        req.params[name]
        || req.query[name]
        || req.body[name]
      );

      // Parse
      if (type === ParamType.Boolean || type === ParamType.BooleanOptional) {
        // Boolean

        // Handle case where value doesn't exist
        if (value === undefined) {
          if (type === ParamType.BooleanOptional) {
            output[name] = undefined;
          } else {
            return handleError(
              res,
              {
                message: `Parameter ${name} is required, but it was not included.`,
                code: ReactKitErrorCode.MissingParameter,
                status: 422,
              },
            );
          }
        } else {
          // Value exists

          // Simplify value
          const simpleVal = (
            String(value)
              .trim()
              .toLowerCase()
          );

          // Parse
          output[name] = (
            [
              'true',
              'yes',
              'y',
              '1',
              't',
            ].indexOf(simpleVal) >= 0
          );
        }
      } else if (type === ParamType.Float || type === ParamType.FloatOptional) {
        // Float

        // Handle case where value doesn't exist
        if (value === undefined) {
          if (type === ParamType.FloatOptional) {
            output[name] = undefined;
          } else {
            return handleError(
              res,
              {
                message: `Parameter ${name} is required, but it was not included.`,
                code: ReactKitErrorCode.MissingParameter,
                status: 422,
              },
            );
          }
        } else if (!Number.isNaN(Number.parseFloat(String(value)))) {
          // Value is a number
          output[name] = Number.parseFloat(String(value));
        } else {
          // Issue!
          return handleError(
            res,
            {
              message: `Request data was malformed: ${name} was not a valid float.`,
              code: ReactKitErrorCode.InvalidParameter,
              status: 422,
            },
          );
        }
      } else if (type === ParamType.Int || type === ParamType.IntOptional) {
        // Int

        // Handle case where value doesn't exist
        if (value === undefined) {
          if (type === ParamType.IntOptional) {
            output[name] = undefined;
          } else {
            return handleError(
              res,
              {
                message: `Parameter ${name} is required, but it was not included.`,
                code: ReactKitErrorCode.MissingParameter,
                status: 422,
              },
            );
          }
        } else if (!Number.isNaN(Number.parseInt(String(value), 10))) {
          // Value is a number
          output[name] = Number.parseInt(String(value), 10);
        } else {
          // Issue!
          return handleError(
            res,
            {
              message: `Request data was malformed: ${name} was not a valid int.`,
              code: ReactKitErrorCode.InvalidParameter,
              status: 422,
            },
          );
        }
      } else if (type === ParamType.JSON || type === ParamType.JSONOptional) {
        // Stringified JSON

        // Handle case where value doesn't exist
        if (value === undefined) {
          if (type === ParamType.JSONOptional) {
            output[name] = undefined;
          } else {
            return handleError(
              res,
              {
                message: `Parameter ${name} is required, but it was not included.`,
                code: ReactKitErrorCode.MissingParameter,
                status: 422,
              },
            );
          }
        } else {
          // Value exists

          // Parse
          try {
            output[name] = JSON.parse(String(value));
          } catch (err) {
            return handleError(
              res,
              {
                message: `Request data was malformed: ${name} was not a valid JSON payload.`,
                code: ReactKitErrorCode.InvalidParameter,
                status: 422,
              },
            );
          }
        }
      } else if (type === ParamType.String || type === ParamType.StringOptional) {
        // String

        // Handle case where value doesn't exist
        if (value === undefined) {
          if (type === ParamType.StringOptional) {
            output[name] = undefined;
          } else {
            return handleError(
              res,
              {
                message: `Parameter ${name} is required, but it was not included.`,
                code: ReactKitErrorCode.MissingParameter,
                status: 422,
              },
            );
          }
        } else {
          // Value exists

          // Leave as is
          output[name] = value;
        }
      } else {
        // No valid data type
        return handleError(
          res,
          {
            message: `An internal error occurred: we could not determine the type of ${name}.`,
            code: ReactKitErrorCode.InvalidParameter,
            status: 422,
          },
        );
      }
    }

    /*----------------------------------------*/
    /*               Launch Info              */
    /*----------------------------------------*/

    // Get launch info
    const { launched, launchInfo } = cacclGetLaunchInfo(req);
    if (!launched || !launchInfo) {
      return handleError(
        res,
        {
          message: 'Your session has expired. Please refresh the page and try again.',
          code: ReactKitErrorCode.SessionExpired,
          status: 440,
        },
      );
    }

    // Error if user info cannot be found
    if (
      !launchInfo.userId
      || !launchInfo.userFirstName
      || !launchInfo.userLastName
      || (
        launchInfo.notInCourse
        && !launchInfo.isAdmin
      )
      || (
        !launchInfo.isTTM
        && !launchInfo.isLearner
        && !launchInfo.isAdmin
      )
    ) {
      return handleError(
        res,
        {
          message: 'Your session was invalid. Please refresh the page and try again.',
          code: ReactKitErrorCode.SessionExpired,
          status: 440,
        },
      );
    }

    // Add launch info to output
    output.userId = launchInfo.userId;
    output.userFirstName = launchInfo.userFirstName;
    output.userLastName = launchInfo.userLastName;
    output.userEmail = launchInfo.userEmail;
    output.isLearner = !!launchInfo.isLearner;
    output.isTTM = !!launchInfo.isTTM;
    output.isAdmin = !!launchInfo.isAdmin;
    output.courseId = (output.courseId ?? launchInfo.courseId);
    output.courseName = launchInfo.contextLabel;

    // Add other session variables
    Object.keys(req.session).forEach((propName) => {
      // Skip if prop already in output
      if (output[propName] !== undefined) {
        return;
      }

      // Add to output
      const value = req.session[propName];
      if (
        typeof value === 'string'
        || typeof value === 'boolean'
        || typeof value === 'number'
      ) {
        output[propName] = value;
      }
    });

    /*----------------------------------------*/
    /*       Require Course Consistency       */
    /*----------------------------------------*/

    // Make sure the user actually launched from the appropriate course
    if (
      output.courseId
      && launchInfo.courseId
      && output.courseId !== launchInfo.courseId
      && !output.isTTM
      && !output.isAdmin
    ) {
      // Course of interest is not the launch course
      return handleError(
        res,
        {
          message: 'You switched sessions by opening this app in another tab. Please refresh the page and try again.',
          code: ReactKitErrorCode.WrongCourse,
          status: 401,
        },
      );
    }

    /*----------------------------------------*/
    /*       Require Proper Permissions       */
    /*----------------------------------------*/

    // Add TTM endpoint security
    if (
      // This is a TTM endpoint
      req.path.startsWith('/api/ttm')
      // User is not a TTM
      && (
        // User is not a TTM
        !output.isTTM
        // User is not an admin
        && !output.isAdmin
      )
    ) {
      // User does not have access
      return handleError(
        res,
        {
          message: 'This action is only allowed if you are a teaching team member for the course. Please go back to Canvas, log in as a teaching team member, and try again.',
          code: ReactKitErrorCode.NotTTM,
          status: 401,
        },
      );
    }
    
    // Add Admin endpoint security
    if (
      // This is an admin endpoint
      req.path.startsWith('/api/admin')
      // User is not an admin
      && !output.isAdmin
    ) {
      // User does not have access
      return handleError(
        res,
        {
          message: 'This action is only allowed if you are a Canvas admin. Please go back to Canvas, log in as an admin, and try again.',
          code: ReactKitErrorCode.NotAdmin,
          status: 401,
        },
      );
    }

    /*------------------------------------------------------------------------*/
    /*                              Call handler                              */
    /*------------------------------------------------------------------------*/

    // Keep track of whether "next" was called
    let nextCalled = false;

    /**
     * Call the "next" function and keep track of the call so responses
     *   are not sent
     * @author Gabe Abrams
     */
    const nextWithTracking = () => {
      nextCalled = true;
      next();
    };

    // Call the handler
    try {
      const results = await opts.handler({
        params: output,
        req,
        res,
        next: nextWithTracking,
      });

      // Send results to client (only if next wasn't called)
      if (!nextCalled) {
        return handleSuccess(res, results ?? undefined);
      }
    } catch (err) {
      // Send error to client (only if next wasn't called)
      if (!nextCalled) {
        return handleError(res, err);
      }
    }
  };
};

export default genRouteHandler;
