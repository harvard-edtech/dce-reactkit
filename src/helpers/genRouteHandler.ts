// Import caccl functions
// TODO: fix dependency cycle
// eslint-disable-next-line import/no-cycle
import {
  cacclGetLaunchInfo,
  internalGetLogCollection,
} from '../server/initServer';

// Import shared types
import ReactKitErrorCode from '../types/ReactKitErrorCode';
import ParamType from '../types/ParamType';

// Import helpers
import handleError from './handleError';
import handleSuccess from './handleSuccess';
import genErrorPage from '../html/genErrorPage';
import genInfoPage from '../html/genInfoPage';
import parseUserAgent from './parseUserAgent';
import getTimeInfoInET from './getTimeInfoInET';

// Import shared types
import LogFunction from '../types/LogFunction';
import Log from '../types/Log';
import LogType from '../types/LogType';
import LogSource from '../types/LogSource';
import LogTypeSpecificInfo from '../types/Log/LogTypeSpecificInfo';
import LogMainInfo from '../types/Log/LogMainInfo';
import LogSourceSpecificInfo from '../types/Log/LogSourceSpecificInfo';
import LogBuiltInMetadata from '../types/LogBuiltInMetadata';
import LogAction from '../types/LogAction';
import LogLevel from '../types/LogLevel';

/**
 * Generate an express API route handler
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.paramTypes map containing the types for each parameter that is
 *   included in the request (map: param name => type)
 * @param opts.handler function that processes the request
 * @param [opts.skipSessionCheck] if true, skip the session check (allow users
 *   to not be logged in and launched via LTI)
 * @param [opts.allowedHosts] if included, only allow requests from these hosts
 *   (start a hostname with a "*" to only check the end of the hostname)
 *   you can include just one string instead of an array
 * @param [opts.bannedHosts] if included, do not allow requests from these hosts
 *   (start a hostname with a "*" to only check the end of the hostname)
 *   you can include just one string instead of an array
 * @param [opts.unhandledErrorMessagePrefix] if included, when an error that
 *   is not of type ErrorWithCode is thrown, the client will receive an error
 *   where the error message is prefixed with this string. For example,
 *   if unhandledErrorMessagePrefix is
 *   'While saving progress, we encountered an error:'
 *   and the error is 'progressInfo is not an object',
 *   the client will receive an error with the message
 *   'While saving progress, we encountered an error: progressInfo is not an object'
 * @returns express route handler that takes the following arguments:
 *   params (map: param name => value),
 *   req (express request object),
 *   next (express next function),
 *   send (a function that sends a string to the client),
 *   redirect (takes a url and redirects the user to that url),
 *   renderErrorPage (shows a static error page to the user),
 *   renderInfoPage (shows a static info page to the user),
 *   renderCustomHTML (renders custom html and sends it to the user),
 *   and returns the value to send to the client as a JSON API response, or
 *   calls next() or redirect(...) or send(...) or renderErrorPage(...).
 *   Note: params also has userId, userFirstName,
 *   userLastName, userEmail, userAvatarURL, isLearner, isTTM, isAdmin,
 *   and any other variables that
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
        renderInfoPage: (
          opts: {
            title: string,
            body: string,
          },
        ) => void,
        renderCustomHTML: (
          opts: {
            html: string,
            status?: number,
          },
        ) => void,
        logServerEvent: LogFunction,
      },
    ) => any,
    skipSessionCheck?: boolean,
    allowedHosts?: string[] | string,
    bannedHosts?: string[] | string,
    unhandledErrorMessagePrefix?: string,
  },
) => {
  // Return a route handler
  return async (req: any, res: any, next: () => void) => {
    // Output params
    const output: { [k in string]: any } = {};

    /*----------------------------------------*/
    /* ----------- Hostname Check ----------- */
    /*----------------------------------------*/

    // Get hostnames
    const originURL = String(
      req.get('origin')
      || req.headers.origin
      || req.headers.referer,
    );
    const originHostname = (
      originURL
        // Remove protocol
        .replace(/(^\w+:|^)\/\//, '')
        // Remove port
        .replace(/:\d+$/, '')
    );
    const serverHostname = String(req.hostname);

    // Check allowed
    if (opts.allowedHosts) {
      // Only accept requests from allowed hosts
      const allowedArray = (
        Array.isArray(opts.allowedHosts)
          ? opts.allowedHosts
          : [opts.allowedHosts]
      );

      // Check if server is localhost
      if (serverHostname === 'localhost') {
        // Allow localhost
        allowedArray.push('localhost');
      }

      // Check if current host is allowed
      const allowed = allowedArray.some((allowedHost) => {
        if (allowedHost.startsWith('*')) {
          // Check end of hostname
          return originHostname.endsWith(allowedHost.substring(1));
        }

        // Check full hostname
        return originHostname.toLowerCase() === allowedHost.toLowerCase();
      });

      // If not allowed, return error
      if (!allowed) {
        return handleError(
          res,
          {
            message: 'You are not allowed to access this endpoint.',
            code: ReactKitErrorCode.HostNotAllowed,
            status: 403,
          },
        );
      }
    }

    // Check banned
    if (opts.bannedHosts) {
      // Do not allow requests from banned hosts
      const bannedArray = (
        Array.isArray(opts.bannedHosts)
          ? opts.bannedHosts
          : [opts.bannedHosts]
      );

      // Check if current host is banned
      const banned = bannedArray.some((bannedHost) => {
        if (bannedHost.startsWith('*')) {
          // Check end of hostname
          return originHostname.endsWith(bannedHost.substring(1));
        }

        // Check full hostname
        return originHostname.toLowerCase() === bannedHost.toLowerCase();
      });

      // If banned, return error
      if (banned) {
        return handleError(
          res,
          {
            message: 'You are not allowed to access this endpoint.',
            code: ReactKitErrorCode.HostBanned,
            status: 403,
          },
        );
      }
    }

    /*----------------------------------------*/
    /* ------------ Parse Params ------------ */
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
    /* ------------- Launch Info ------------ */
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
        !launchInfo
        || !launchInfo.userId
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
        : (output.userId ?? undefined)
    );
    output.userFirstName = (
      launchInfo
        ? launchInfo.userFirstName
        : (output.userFirstName ?? undefined)
    );
    output.userLastName = (
      launchInfo
        ? launchInfo.userLastName
        : (output.userLastName ?? undefined)
    );
    output.userEmail = (
      launchInfo
        ? launchInfo.userEmail
        : (output.userEmail ?? undefined)
    );
    output.userAvatarURL = (
      launchInfo
        ? (
          launchInfo.userImage
          ?? 'http://www.gravatar.com/avatar/?d=identicon'
        )
        : (output.userAvatarURL ?? undefined)
    );
    output.isLearner = (
      launchInfo
        ? !!launchInfo.isLearner
        : (output.isLearner ?? undefined)
    );
    output.isTTM = (
      launchInfo
        ? !!launchInfo.isTTM
        : (output.isTTM ?? undefined)
    );
    output.isAdmin = (
      launchInfo
        ? !!launchInfo.isAdmin
        : (output.isAdmin ?? undefined)
    );
    output.courseId = (
      launchInfo
        ? (output.courseId ?? launchInfo.courseId)
        : (output.courseId ?? undefined)
    );
    output.courseName = (
      launchInfo
        ? launchInfo.contextLabel
        : (output.courseName ?? undefined)
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
    /* ----- Require Course Consistency ----- */
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

    /*----------------------------------------*/
    /* ------------- Log Handler ------------ */
    /*----------------------------------------*/

    // Create a log handler function

    /**
     * Log an event on the server
     * @author Gabe Abrams
     */
    const logServerEvent: LogFunction = async (logOpts) => {
      // NOTE: internally, we slip through an opts.overrideAsClientEvent boolean
      // that indicates that this is actually a client event, but we don't
      // include that in the LogFunction type because this is internal and
      // hidden from users
      try {
        // Parse user agent
        const {
          browser,
          device,
        } = parseUserAgent(req.headers['user-agent']);

        // Get time info in ET
        const {
          timestamp,
          year,
          month,
          day,
          hour,
          minute,
        } = getTimeInfoInET();

        // Main log info
        const mainLogInfo: LogMainInfo = {
          id: `${launchInfo ? launchInfo.userId : 'unknown'}-${Date.now()}-${Math.floor(Math.random() * 100000)}-${Math.floor(Math.random() * 100000)}`,
          userFirstName: (launchInfo ? launchInfo.userFirstName: 'unknown'),
          userLastName: (launchInfo ? launchInfo.userLastName : 'unknown'),
          userEmail: (launchInfo ? launchInfo.userEmail : 'unknown'),
          userId: (launchInfo ? launchInfo.userId : 'unknown'),
          isLearner: (launchInfo && !!launchInfo.isLearner),
          isAdmin: (launchInfo && !!launchInfo.isAdmin),
          isTTM: (launchInfo && !!launchInfo.isTTM),
          courseId: (launchInfo ? launchInfo.courseId : 'unknown' ),
          courseName: (launchInfo ? launchInfo.contextLabel : 'unknown'),
          browser,
          device,
          year,
          month,
          day,
          hour,
          minute,
          timestamp,
          context: (
            typeof logOpts.context === 'string'
              ? logOpts.context
              : (
                ((logOpts.context as any) ?? {})._
                ?? LogBuiltInMetadata.Context.Uncategorized
              )
          ),
          subcontext: (
            logOpts.subcontext
            ?? LogBuiltInMetadata.Context.Uncategorized
          ),
          tags: (logOpts.tags ?? []),
          level: (logOpts.level ?? LogLevel.Info),
          metadata: (logOpts.metadata ?? {}),
        };

        // Type-specific info
        const typeSpecificInfo: LogTypeSpecificInfo = (
          ('error' in opts && opts.error)
            ? {
              type: LogType.Error,
              errorMessage: (logOpts as any).error.message ?? 'Unknown message',
              errorCode: (logOpts as any).error.code ?? ReactKitErrorCode.NoCode,
              errorStack: (logOpts as any).error.stack ?? 'No stack',
            }
            : {
              type: LogType.Action,
              target: (
                (logOpts as any).target
                ?? LogBuiltInMetadata.Target.NoTarget
              ),
              action: (
                (logOpts as any).action
                ?? LogAction.Unknown
              ),
            }
        );

        // Source-specific info
        const sourceSpecificInfo: LogSourceSpecificInfo = (
          (logOpts as any).overrideAsClientEvent
            ? {
              source: LogSource.Client,
            }
            : {
              source: LogSource.Server,
              routePath: req.path,
              routeTemplate: req.route.path,
            }
        );

        // Build log event
        const log: Log = {
          ...mainLogInfo,
          ...typeSpecificInfo,
          ...sourceSpecificInfo,
        };

        // Either print to console or save to db
        const logCollection = internalGetLogCollection();
        if (logCollection) {
          // Store to the log collection
          await logCollection.insert(log);
        } else if (log.type === LogType.Error) {
          // Print to console
          // eslint-disable-next-line no-console
          console.error('dce-reactkit error log:', log);
        } else {
          // eslint-disable-next-line no-console
          console.log('dce-reactkit action log:', log);
        }

        // Return log entry
        return log;
      } catch (err) {
        // Print because we cannot store the error
        // eslint-disable-next-line no-console
        console.error(
          'Could not log the following:',
          logOpts,
          'due to this error:',
          (err as any ?? {}).message,
          (err as any ?? {}).stack,
        );

        // Create a dummy log to return
        const dummyMainInfo: LogMainInfo = {
          id: '-1',
          userFirstName: 'Unknown',
          userLastName: 'Unknown',
          userEmail: 'unknown@harvard.edu',
          userId: 1,
          isLearner: false,
          isAdmin: false,
          isTTM: false,
          courseId: 1,
          courseName: 'Unknown',
          browser: {
            name: 'Unknown',
            version: 'Unknown',
          },
          device: {
            isMobile: false,
            os: 'Unknown',
          },
          year: 1,
          month: 1,
          day: 1,
          hour: 1,
          minute: 1,
          timestamp: Date.now(),
          tags: [],
          level: LogLevel.Warn,
          metadata: {},
          context: LogBuiltInMetadata.Context.Uncategorized,
          subcontext: LogBuiltInMetadata.Context.Uncategorized,
        };

        const dummyTypeSpecificInfo: LogTypeSpecificInfo = {
          type: LogType.Error,
          errorMessage: 'Unknown',
          errorCode: 'Unknown',
          errorStack: 'No Stack',
        };

        const dummySourceSpecificInfo: LogSourceSpecificInfo = {
          source: LogSource.Server,
          routePath: req.path,
          routeTemplate: req.route.path,
        };

        const log: Log = {
          ...dummyMainInfo,
          ...dummyTypeSpecificInfo,
          ...dummySourceSpecificInfo,
        };

        return log;
      }
    };

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
     * @param renderOpts object containing all arguments
     * @param [renderOpts.title=An Error Occurred] title of the error box
     * @param [renderOpts.description=An unknown server error occurred. Please contact support.]
     *   a human-readable description of the error
     * @param [renderOpts.code=ReactKitErrorCode.NoCode] error code to show
     * @param [renderOpts.pageTitle=renderOpts.title] title of the page/tab if it differs from
     *   the title of the error
     * @param [renderOpts.status=500] http status code
     */
    const renderErrorPage = (
      renderOpts: {
        title?: string,
        description?: string,
        code?: string,
        pageTitle?: string,
        status?: number,
      } = {},
    ) => {
      const html = genErrorPage(renderOpts);
      send(html, renderOpts.status ?? 500);

      // Log server-side error if not a session expired error or 404
      if (renderOpts.status && renderOpts.status === 404) {
        return;
      }
      if (renderOpts.title?.toLowerCase().includes('session expired')) {
        return;
      }
      logServerEvent({
        context: LogBuiltInMetadata.Context.ServerRenderedErrorPage,
        error: {
          message: `${renderOpts.title}: ${renderOpts.description}`,
          code: renderOpts.code,
        },
        metadata: {
          title: renderOpts.title,
          description: renderOpts.description,
          code: renderOpts.code,
          pageTitle: renderOpts.pageTitle,
          status: renderOpts.status ?? 500,
        },
      });
    };

    /**
     * Render an info page
     * @author Gabe Abrams
     * @param renderOpts object containing all arguments
     * @param renderOpts.title title of the info box
     * @param renderOpts.body a human-readable text body for the info alert
     */
    const renderInfoPage = (
      renderOpts: {
        title: string,
        body: string,
      },
    ) => {
      const html = genInfoPage(renderOpts);
      send(html, 200);
    };

    /**
     * Render custom HTML
     * @author Gabe Abrams
     * @param htmlOpts object containing all arguments
     * @param htmlOpts.html the HTML to send to the client
     * @param [ejsOpts.status=200] the http status code to send
     */
    const renderCustomHTML = (
      htmlOpts: {
        html: string,
        status?: number,
      },
    ) => {
      send(htmlOpts.html, htmlOpts.status ?? 200);
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
        renderInfoPage,
        renderCustomHTML,
        logServerEvent,
      });

      // Send results to client (only if next wasn't called)
      if (!responseSent) {
        return handleSuccess(res, results ?? undefined);
      }
    } catch (err) {
      // Prefix error message if needed
      if (
        opts.unhandledErrorMessagePrefix
        && err instanceof Error
        && err.message
        && err.name !== 'ErrorWithCode'
      ) {
        err.message = `${opts.unhandledErrorMessagePrefix.trim()} ${err.message.trim()}`;
      }

      // Send error to client (only if next wasn't called)
      if (!responseSent) {
        handleError(res, err);

        // Log server-side error
        logServerEvent({
          context: LogBuiltInMetadata.Context.ServerEndpointError,
          error: err,
        });

        return;
      }

      // Log error that was not responded with
      // eslint-disable-next-line no-console
      console.log('Error occurred but could not be sent to client because a response was already sent:', err);
    }
  };
};

export default genRouteHandler;
