// Import custom error
import ErrorWithCode from '../errors/ErrorWithCode';
import ReactKitErrorCode from '../types/ReactKitErrorCode';

// Import helpers from app wrapper
import { cacclSendRequest } from '../components/AppWrapper';

/*------------------------------------------------------------------------*/
/*                                Listener                                */
/*------------------------------------------------------------------------*/

// Handler for session expiry
let sessionExpiryHandler: () => void;

// Keep track of whether or not session expiry has already been handled
let sessionAlreadyExpired = false;

/**
 * Set the session expiry handler
 * @author Gabe Abrams
 * @param handler new handler to use when session expires
 */
export const setSessionExpiryHandler = (handler: () => void) => {
  sessionExpiryHandler = handler;
};

/*------------------------------------------------------------------------*/
/*                               Stub Logic                               */
/*------------------------------------------------------------------------*/

// Stored stub responses
const stubResponses: {
  [method: string]: {
    [path: string]: (
      | {
        // Success boolean
        success: true,
        // Body of response from fake server
        body: any,
      }
      | {
        // Success boolean
        success: false,
        // Error message
        errorMessage: string,
        // Error code
        errorCode: string,
      }
    )
  }
} = {};

/**
 * Add a stub response
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param [opts.method=GET] http request method
 * @param opts.path pathname of the request
 * @param [opts.body] body of the response if successful
 * @param [opts.errorMessage] error message if not successful
 * @param [opts.errorCode] error code if not successful
 */
export const _setStubResponse = (
  opts: {
    method?: string,
    path: string,
    body?: any,
    errorMessage?: string,
    errorCode?: string,
  },
) => {
  const {
    path,
    body,
  } = opts;
  const method = (opts.method ?? 'GET').toUpperCase();
  const errorMessage = (opts.errorMessage ?? 'An unknown error has occurred.');
  const errorCode = (opts.errorCode ?? ReactKitErrorCode.NoCode);

  // Store to stub responses
  if (!stubResponses[method]) {
    stubResponses[method] = {};
  }
  if (!stubResponses[method][path]) {
    stubResponses[method][path] = (
      (opts.errorMessage || opts.errorCode)
        ? {
          success: false,
          errorMessage,
          errorCode,
        }
        : {
          success: true,
          body: body ?? undefined,
        }
    );
  }
};

/*------------------------------------------------------------------------*/
/*                                  Main                                  */
/*------------------------------------------------------------------------*/

/**
 * Visit an endpoint on the server [for client only]
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.path - the path of the server endpoint
 * @param [opts.method=GET] - the method of the endpoint
 * @param [opts.params] - query/body parameters to include
 * @returns response from server
 */
const visitServerEndpoint = async (
  opts: {
    path: string,
    method?: ('GET' | 'POST' | 'DELETE' | 'PUT'),
    params?: { [key in string]: any },
  },
): Promise<any> => {
  // Handle stubs
  const stubResponse = stubResponses[opts.method ?? 'GET']?.[opts.path];
  if (stubResponse) {
    // Success
    if (stubResponse.success) {
      return stubResponse.body;
    }
    // Error
    throw new ErrorWithCode(
      stubResponse.errorMessage,
      stubResponse.errorCode,
    );
  }

  // Send the request
  const response = await cacclSendRequest({
    path: opts.path,
    method: opts.method ?? 'GET',
    params: opts.params,
  });

  // Check for failure
  if (!response || !response.body) {
    throw new ErrorWithCode(
      'We didn\'t get a response from the server. Please check your internet connection.',
      ReactKitErrorCode.NoResponse,
    );
  }
  if (!response.body.success) {
    // Session expired
    if (response.body.code === ReactKitErrorCode.SessionExpired) {
      // Skip notice if session was already expired
      if (sessionAlreadyExpired) {
        // Never return (browser is already reloading)
        await new Promise<{ [key in string]: any }>(() => {
          // Promise that never returns
        });
      }
      sessionAlreadyExpired = true;

      // Show session expiration message
      if (sessionExpiryHandler) {
        // Use handler
        sessionExpiryHandler();
      } else {
        // Fallback to alert

        // eslint-disable-next-line no-alert
        alert('Your session has expired. Please start over.');
      }

      // Never return (don't continue execution)
      await new Promise<{ [key in string]: any }>(() => {
        // Promise that never returns
      });
    }

    // Other errors
    throw new ErrorWithCode(
      (
        response.body.message
        || 'An unknown error occurred. Please contact an admin.'
      ),
      (
        response.body.code
        || ReactKitErrorCode.NoCode
      ),
    );
  }

  // Success! Extract the body
  const { body } = response.body;

  // Return
  return body;
};

export default visitServerEndpoint;
