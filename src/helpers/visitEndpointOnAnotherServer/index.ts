// Import data signer
import { signRequest } from '../dataSigner';

// Import shared types
import ErrorWithCode from '../../errors/ErrorWithCode';
import ReactKitErrorCode from '../../types/ReactKitErrorCode';
import sendServerToServerRequest from './sendServerToServerRequest';

/*------------------------------------------------------------------------*/
/* ----------------------------- Credentials ---------------------------- */
/*------------------------------------------------------------------------*/

/*
REACTKIT_CROSS_SERVER_CREDENTIALS format:
|host:key:secret||host:key:secret|...
*/

const credentials: {
  host: string,
  key: string,
  secret: string,
}[] = (
  (process.env.REACTKIT_CROSS_SERVER_CREDENTIALS ?? '')
    // Replace multiple | with a single one
    .replace(/\|+/g, '|')
    // Split by |
    .split('|')
    // Remove empty strings
    .filter((str) => {
      return str.trim().length > 0;
    })
    // Process each credential
    .map((str) => {
      // Split by :
      const parts = str.split(':');

      // Check for errors
      if (parts.length !== 3) {
        throw new ErrorWithCode(
          'Invalid REACTKIT_CROSS_SERVER_CREDENTIALS format. Each credential must be in the format |host:key:secret|',
          ReactKitErrorCode.InvalidCrossServerCredentialsFormat,
        );
      }

      // Return the credential
      return {
        host: parts[0].trim(),
        key: parts[1].trim(),
        secret: parts[2].trim(),
      };
    })
);

/*------------------------------------------------------------------------*/
/* ------------------------------- Helpers ------------------------------ */
/*------------------------------------------------------------------------*/

/**
 * Get the credential to use for the request to another server
 * @author Gabe Abrams
 * @param host the host of the other server
 * @return the credential to use
 */
const getCrossServerCredential = (host: string) => {
  // Find the credential
  const credential = credentials.find((cred) => {
    return cred.host.toLowerCase() === host.toLowerCase();
  });
  if (!credential) {
    throw new ErrorWithCode(
      'Cannot send cross-server signed request there was no credential that matched the host that the request is being sent to.',
      ReactKitErrorCode.CrossServerNoCredentialsToSignWith,
    );
  }

  // Return credential
  return credential;
};

/*------------------------------------------------------------------------*/
/* -------------------------------- Main -------------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Visit an endpoint on another server
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.method the method of the endpoint
 * @param opts.path the path of the other server's endpoint
 * @param opts.host the host of the other server
 * @param [opts.params={}] query/body parameters to include
 * @param [opts.responseType=JSON] the response type from the other server
 */
const visitEndpointOnAnotherServer = async (
  opts: {
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    path: string,
    host: string,
    params?: { [key in string]: any },
    responseType?: 'JSON' | 'Text',
  },
): Promise<any> => {
  // Get cross-server credential
  const credential = getCrossServerCredential(opts.host);

  // Sign the request, get new params
  const augmentedParams = await signRequest({
    method: opts.method,
    path: opts.path,
    params: opts.params ?? {},
    key: credential.key,
    secret: credential.secret,
  });

  // Send the request
  const response = await sendServerToServerRequest({
    path: opts.path,
    host: opts.host,
    method: opts.method,
    params: augmentedParams,
    responseType: opts.responseType,
  });

  // Check for failure
  if (!response || !response.body) {
    throw new ErrorWithCode(
      'We didn\'t get a response from the other server. Please check the network between the two connection.',
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
