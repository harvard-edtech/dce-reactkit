// Initialize caccl
import { sendRequest } from 'caccl/client';

// Import custom error
import ErrorWithCode from '../errors/ErrorWithCode';
import ReactKitErrorCode from '../types/ReactKitErrorCode';

/**
 * Visit an endpoint on the server
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
  const response = await sendRequest({
    path: opts.path,
    method: opts.method,
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
