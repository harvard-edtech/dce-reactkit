// Import shared types
import ReactKitErrorCode from '../types/ReactKitErrorCode';

/**
 * Handle an error and respond to the client
 * @author Gabe Abrams
 * @param res express response
 * @param error error info
 * @param opts.err the error to send to the client
 *   or the error message
 * @param [opts.code] an error code (only used if err.code is not
 *   included)
 * @param [opts.status=500] the https status code to use
 *   defined)
 */
const handleError = (
  res: any,
  error: (
    | {
      message: any,
      code?: string,
      status?: number,
    }
    | Error
    | string
    | any
  ),
): undefined => {
  // Get the error message
  let message;
  if (error && (error as any).message) {
    message = (error.message || 'An unknown error occurred.');
  } else if (typeof error === 'string') {
    message = (
      error.trim().length > 0
        ? error
        : 'An unknown error occurred.'
    );
  } else {
    message = 'An unknown error occurred.';
  }

  // Get the error code
  const code = (error.code || ReactKitErrorCode.NoCode);

  // Get the status code
  const status = (error.status || 500);

  // Respond to user
  res
    // Set the http status code
    .status(status)
    // Send a JSON response
    .json({
      // Error message
      message,
      // Error code
      code,
      // Success = false flag so client can detect server-side errors
      success: false,
    });
  return undefined;
};

export default handleError;
