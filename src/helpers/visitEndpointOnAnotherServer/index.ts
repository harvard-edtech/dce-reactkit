// Import data signer
import { createSignedPack } from '../dataSigner';

// Import shared types
import ErrorWithCode from '../../errors/ErrorWithCode';
import ReactKitErrorCode from '../../types/ReactKitErrorCode';
import sendServerToServerRequest from './sendServerToServerRequest';

/**
 * Visit an endpoint on another server
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.method the method of the endpoint
 * @param opts.path the path of the other server's endpoint
 * @param opts.host the host of the other server
 * @param [opts.key=process.env.REACTKIT_CROSS_SERVER_CREDENTIAL_KEY] reactkit cross-server
 *   credential key
 * @param [opts.secret=process.env.REACTKIT_CROSS_SERVER_CREDENTIAL_SECRET] reactkit cross-server
 *   credential secret
 * @param [opts.params={}] query/body parameters to include
 * @param [opts.responseType=JSON] the response type from the other server
 */
const visitEndpointOnAnotherServer = async (
  opts: {
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    path: string,
    host: string,
    key?: string,
    secret?: string,
    params?: { [key in string]: any },
    responseType?: 'JSON' | 'Text',
  },
): Promise<any> => {
  // Get cross-server credentials
  const key = opts.key ?? process.env.REACTKIT_CROSS_SERVER_KEY;
  const secret = opts.secret ?? process.env.REACTKIT_CROSS_SERVER_SECRET;

  // Throw error if no credentials
  if (!key || !secret) {
    throw new ErrorWithCode(
      'Cannot send cross-server signed request because either or both the key and secret were not included or found in env.',
      ReactKitErrorCode.CrossServerNoCredentialsToSignWith,
    );
  }

  // Create signed pack
  const signedPack = createSignedPack({
    method: opts.method,
    path: opts.path,
    params: opts.params ?? {},
    key,
    secret,
  });

  // Send the request
  const response = await sendServerToServerRequest({
    path: opts.path,
    host: opts.host,
    method: opts.method,
    params: {
      signedPack,
    },
    responseType: opts.responseType,
  });

  // Check for failure
  if (!response || !response.body) {
    throw new ErrorWithCode(
      'We didn\'t get a response from the other server. Please check your internet connection.',
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
