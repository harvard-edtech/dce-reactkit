// Import caccl libs
import { getLaunchInfo } from 'caccl-lti';

// Import shared types
import ReactKitErrorCode from '../types/ReactKitErrorCode';
import ParamType from '../types/ParamType';

// Import helpers
import handleError from './handleError';

/**
 * Parse express request params and body
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.req express request instance
 * @param opts.res express response instance
 * @param opts.params map of parameters that should be parsed out of the request
 * @returns parsed params + user info from session (if it exists) or undefined
 *   if an error occurred
 */
const parseRequest = (
  opts: {
    req: any,
    res: any,
    params: {
      [k in string]: ParamType
    },
  },
): ({ [k in string]: any } | undefined) => {
  // Output

  const output: { [k in string]: any } = {};

  /*----------------------------------------*/
  /*              Parse Params              */
  /*----------------------------------------*/

  // Process items one by one
  const paramList = Object.entries(opts.params);
  for (let i = 0; i < paramList.length; i++) {
    const [name, type] = paramList[i];

    // Find the value as a string
    const value = (
      opts.req.params[name]
      || opts.req.query[name]
      || opts.req.body[name]
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
            opts.res,
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
            opts.res,
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
          opts.res,
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
            opts.res,
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
          opts.res,
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
            opts.res,
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
            opts.res,
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
            opts.res,
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
        opts.res,
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
  const { launched, launchInfo } = getLaunchInfo(opts.req);
  if (!launched || !launchInfo) {
    return handleError(
      opts.res,
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
      opts.res,
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
  output.isLearner = !!launchInfo.isLearner;
  output.isTTM = !!launchInfo.isTTM;
  output.isAdmin = !!launchInfo.isAdmin;
  output.isWatchingInPrivate = !!(opts.req.session.isWatchingInPrivate);

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
      opts.res,
      {
        message: 'You switched sessions by opening Immersive Classroom in another tab. Please refresh the page and try again.',
        code: ReactKitErrorCode.WrongCourse,
        status: 401,
      },
    );
  }

  // Return processed params
  return output;
};

export default parseRequest;
