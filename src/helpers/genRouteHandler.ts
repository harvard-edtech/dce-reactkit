// Import caccl functions
import { cacclGetLaunchInfo } from '../server/initServer';

// Import shared types
import ReactKitErrorCode from '../types/ReactKitErrorCode';
import ParamType from '../types/ParamType';

// Import helpers
import handleError from './handleError';
import handleSuccess from './handleSuccess';
import genErrorPage from '../html/genErrorPage';

/**
 * Generate an express API route handler
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.paramTypes map containing the types for each parameter that is
 *   included in the request (map: param name => type)
 * @param opts.handler function that processes the request
 * @param [opts.skipSessionCheck] if true, skip the session check (allow users
 *   to not be logged in and launched via LTI)
 * @returns express route handler that takes the following arguments:
 *   params (map: param name => value),
 *   req (express request object),
 *   next (express next function),
 *   send (a function that sends a string to the client),
 *   redirect (takes a url and redirects the user to that url),
 *   renderErrorPage (shows a static error page to the user),
 *   and returns the value to send to the client as a JSON API response, or
 *   calls next() or redirect(...) or send(...) or renderErrorPage(...).
 *   Note: params also has userId, userFirstName,
 *   userLastName, isLearner, isTTM, isAdmin, and any other variables that
 *   are directly added to the session, if the user does have a session.
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
        next: () => void,
        redirect: (pathOrURL: string) => void,
        send: (text: string, status?: number) => void,
        renderErrorPage: (
          opts?: {
            title?: string,
            description?: string,
            code?: string,
            pageTitle?: string,
            status?: number,
          },
        ) => void,
      },
    ) => any,
    skipSessionCheck?: boolean,
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
    if (
      // Not launched
      (!launched || !launchInfo)
      // Not skipping the session check
      && !opts.skipSessionCheck
    ) {
      return handleError(
        res,
        {
          message: 'Your session has expired. Please refresh the page and try again.',
          code: ReactKitErrorCode.SessionExpired,
          status: 401,
        },
      );
    }

    // Error if user info cannot be found
    if (
      // User information is incomplete
      (
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
      )
      // Not skipping the session check
      && !opts.skipSessionCheck
    ) {
      return handleError(
        res,
        {
          message: 'Your session was invalid. Please refresh the page and try again.',
          code: ReactKitErrorCode.SessionExpired,
          status: 401,
        },
      );
    }

    // Add launch info to output
    output.userId = (
      launchInfo
        ? launchInfo.userId
        : undefined
    );
    output.userFirstName = (
      launchInfo
        ? launchInfo.userFirstName
        : undefined
    );
    output.userLastName = (
      launchInfo
        ? launchInfo.userLastName
        : undefined
    );
    output.userEmail = (
      launchInfo
        ? launchInfo.userEmail
        : undefined
    );
    output.isLearner = (
      launchInfo
        ? !!launchInfo.isLearner
        : undefined
    );
    output.isTTM = (
      launchInfo
        ? !!launchInfo.isTTM
        : undefined
    );
    output.isAdmin = (
      launchInfo
        ? !!launchInfo.isAdmin
        : undefined
    );
    output.courseId = (
      launchInfo
        ? (output.courseId ?? launchInfo.courseId)
        : undefined
    );
    output.courseName = (
      launchInfo
        ? launchInfo.contextLabel
        : undefined
    );

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
      && launchInfo
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

    // Keep track of whether a response was already sent
    let responseSent = false;

    /**
     * Redirect the user to another path or url
     * @author Gabe Abrams
     * @param pathOrURL the path or url to redirect to
     */
    const redirect = (pathOrURL: string) => {
      responseSent = true;
      res.redirect(pathOrURL);
    };

    /**
     * Send text to the client (with an optional status code)
     * @author Gabe Abrams
     * @param text the text to send to the client
     * @parm [status=200] the http status code to send
     */
    const send = (text: string, status: number = 200) => {
      responseSent = true;
      res.status(status).send(text);
    };

    /**
     * Render an error page
     * @author Gabe Abrams
     * @param opts object containing all arguments
     * @param [opts.title=An Error Occurred] title of the error box
     * @param [opts.description=An unknown server error occurred. Please contact support.]
     *   a human-readable description of the error
     * @param [opts.code=ReactKitErrorCode.NoCode] error code to show
     * @param [opts.pageTitle=opts.title] title of the page/tab if it differs from
     *   the title of the error
     * @param [opts.status=500] http status code
     */
    const renderErrorPage = (
      opts: {
        title?: string,
        description?: string,
        code?: string,
        pageTitle?: string,
        status?: number,
      } = {},
    ) => {
      const html = genErrorPage(opts);
      send(html, opts.status ?? 500);
    };

    // Call the handler
    try {
      const results = await opts.handler({
        params: output,
        req,
        send,
        next: () => {
          responseSent = true;
          next();
        },
        redirect,
        renderErrorPage,
      });

      // Send results to client (only if next wasn't called)
      if (!responseSent) {
        return handleSuccess(res, results ?? undefined);
      }
    } catch (err) {
      // Send error to client (only if next wasn't called)
      if (!responseSent) {
        return handleError(res, err);
      }

      // Log error that was not responded with
      console.log('Error occurred but could not be sent to client because a response was already sent:', err);
    }
  };
};

export default genRouteHandler;
