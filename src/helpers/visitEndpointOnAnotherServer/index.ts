// Import custom error
import ErrorWithCode from '../../errors/ErrorWithCode';

// Import shared types
import ReactKitErrorCode from '../../types/ReactKitErrorCode';

// Import other helpers
import sendServerToServerRequest from './sendServerToServerRequest';

/**
 * Send a server-to-server request from this sever to another server that uses
 *   dce-reactkit [for server only]
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.host - the host of the other server
 * @param opts.path - the path of the other server's endpoint
 * @param [opts.method=GET] - the method of the endpoint
 * @param [opts.params] - query/body parameters to include
 * @param [opts.headers] - headers to include
 * @returns response from server
 */
const visitEndpointOnAnotherServer = async (
  opts: {
    host: string,
    path: string,
    method?: ('GET' | 'POST' | 'DELETE' | 'PUT'),
    params?: { [key in string]: any },
    headers?: { [k in string]: any },
  },
): Promise<any> => {
  // Remove properties with undefined values
  let params: { [key in string]: any } | undefined;
  if (opts.params) {
    params = Object.fromEntries(
      Object
        .entries(opts.params)
        .filter(([, value]) => {
          return value !== undefined;
        }),
    );
  }

  // Automatically JSONify arrays and objects
  if (params) {
    params = Object.fromEntries(
      Object
        .entries(params)
        .map(([key, value]) => {
          if (Array.isArray(value) || typeof value === 'object') {
            return [key, JSON.stringify(value)];
          }
          return [key, value];
        }),
    );
  }

  // Send the request
  const response = await sendServerToServerRequest({
    host: opts.host,
    path: opts.path,
    method: opts.method ?? 'GET',
    params,
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

export default visitEndpointOnAnotherServer;
