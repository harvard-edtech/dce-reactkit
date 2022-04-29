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
