// Import shared helpers
// eslint-disable-next-line import/no-cycle
import { internalGetCrossServerCredentialCollection } from '../server/initServer';

// Import shared types
import ErrorWithCode from '../errors/ErrorWithCode';
import ReactKitErrorCode from '../types/ReactKitErrorCode';
import CrossServerCredential from '../types/CrossServerCredential';

// Import shared constants
import MINUTE_IN_MS from '../constants/MINUTE_IN_MS';

/*------------------------------------------------------------------------*/
/* --------------------------- Dynamic Imports -------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Get a copy of the oauth lib
 * @author Gabe Abrams
 * @return the oauth lib
 */
const getOauthLib = async () => {
  // Get the oauth signing library (included with caccl)
  // Ignore because this is assumed to be included with caccl
  try {
    // @ts-ignore
    // eslint-disable-next-line import/no-extraneous-dependencies
    const oauth = await import('oauth-signature');
    return oauth;
  } catch (err) {
    throw new ErrorWithCode(
      'Could not sign a cross-server request because we could not load the oauth library. Please make sure this app has caccl as one of its dependencies.',
      ReactKitErrorCode.NoOauthLib,
    );
  }
};

/**
 * Get a copy of the crypto lib
 * @author Gabe Abrams
 * @return the crypto lib
 */
const getCryptoLib = async () => {
  // Get the crypto library (included on the server)
  // Ignore because this is assumed to be included with typescript
  // @ts-ignore
  try {
    const crypto = await import('crypto');
    return crypto;
  } catch (err) {
    throw new ErrorWithCode(
      'Could not sign a cross-server request because we could not load the crypto library. Please make sure this operation is running on the server.',
      ReactKitErrorCode.NoCryptoLib,
    );
  }
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Helpers ------------------------------ */
/*------------------------------------------------------------------------*/

/**
 * Generate an oauth signature
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.method the http method
 * @param opts.path the http request path
 * @param opts.params the data in the body to sign
 * @param opts.secret the secret to sign with
 * @return the signature
 */
const genSignature = async (
  opts: {
    method?: string,
    path?: string,
    params?: { [key: string]: any },
    secret: string,
  },
): Promise<string> => {
  // Destructure opts
  const {
    method,
    path,
    params,
    secret,
  } = opts;

  // Get the oauth library
  const oauth = await getOauthLib();

  // Order the params alphabetically by key
  const keys = Object.keys(params ?? {});
  keys.sort();
  const orderedParams: {
    [key: string]: any,
  } = {};
  keys.forEach((key) => {
    // Skip oauth_signature
    if (key === 'oauth_signature') {
      return;
    }

    // Add the param
    orderedParams[key] = (params ?? {})[key];
  });

  // Generate the signature
  return decodeURIComponent(oauth.generate(
    method ?? 'GET',
    path ?? 'no-path',
    orderedParams,
    secret,
  ));
};

/**
 * Decrypt an encrypted string using a secret
 * @author Gabe Abrams
 * @param str the encrypted string
 * @return the decrypted string
 */
const decrypt = async (
  encryptedPack: string,
): Promise<string> => {
  // Decryption process based on:
  // https://medium.com/@tony.infisical/guide-to-nodes-crypto-module-for-encryption-decryption-65c077176980

  // Get the encryption secret
  const { REACTKIT_CRED_ENCODING_SALT } = process.env;
  if (!REACTKIT_CRED_ENCODING_SALT) {
    throw new ErrorWithCode(
      'Could not decrypt a string because the encryption salt was not set.',
      ReactKitErrorCode.CrossServerNoCredentialEncodingSalt,
    );
  }

  // Get the crypto library
  const crypto = await getCryptoLib();

  // Separate encrypted pack
  const {
    ciphertext,
    iv,
    tag,
  } = JSON.parse(decodeURIComponent(encryptedPack));

  // Parse the encrypted data
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(REACTKIT_CRED_ENCODING_SALT, 'base64'),
    Buffer.from(iv, 'base64'),
  );

  // Set the authentication tag
  decipher.setAuthTag(Buffer.from(tag, 'base64'));

  // Decrypt the string
  let str = decipher.update(ciphertext, 'base64', 'utf8');
  str += decipher.final('utf8');

  // Return the decrypted string
  return str;
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Signing ------------------------------ */
/*------------------------------------------------------------------------*/

/**
 * Sign a request and get the new request params
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.method the method to sign
 * @param opts.path the http request path
 * @param opts.params the data in the body to sign
 * @param opts.key the reactkit key to sign with
 * @param opts.secret the reactkit secret to sign with
 * @return augmented params for the request, including a signature, timestamp, and key
 */
export const signRequest = async (
  opts: {
    method: string,
    path: string,
    params: { [key: string]: any },
    key: string,
    secret: string,
  },
): Promise<{ [key: string]: any }> => {
  // Destructure opts
  const method = opts.method.toUpperCase();
  const {
    path,
    params,
    key,
    secret,
  } = opts;

  // Augment the params
  const augmentedParams: {
    [key: string]: any,
  } = {
    ...params,
    oauth_consumer_key: key,
    oauth_nonce: Math.random().toString(36),
    oauth_timestamp: Date.now(),
  };

  // Generate a signature
  const signature = await genSignature({
    method,
    path,
    params,
    secret,
  });

  // Add signature to the augmented params
  augmentedParams.oauth_signature = signature;

  // Return the augmented params
  return augmentedParams;
};

/**
 * Validate a signed request. Throws an error if invalid
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.method the method of the data validate
 * @param opts.path the http request path to validate
 * @param opts.scope the name of the scope to validate
 * @param opts.params the request data to validate
 * @returns parsed and validated params
 */
export const validateSignedRequest = async (
  opts: {
    method: string,
    path: string,
    scope: string,
    params: { [key: string]: any },
  },
) => {
  /* ---------- Collect Info ---------- */

  // Get the signature
  if (!opts.params.oauth_signature) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request there was no oauth signature.',
      ReactKitErrorCode.CrossServerMissingSignedRequestInfo,
    );
  }
  const signature = opts.params.oauth_signature;

  // Get the timestamp
  if (
    // No timestamp
    !opts.params.oauth_timestamp
    // Invalid timestamp
    || Number.isNaN(Number.parseInt(opts.params.oauth_timestamp, 10))
  ) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request there was no valid oauth timestamp.',
      ReactKitErrorCode.CrossServerMissingSignedRequestInfo,
    );
  }
  const timestamp = Number.parseInt(opts.params.oauth_timestamp, 10);

  // Get the key
  if (!opts.params.oauth_consumer_key) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request there was no oauth consumer key.',
      ReactKitErrorCode.CrossServerMissingSignedRequestInfo,
    );
  }
  const key = opts.params.oauth_consumer_key;

  // Get the rest of the info
  const {
    method,
    path,
    params,
  } = opts;

  /* ------- Look Up Credential ------- */

  // Get the cross-server credential collection
  const crossServerCredentialCollection = internalGetCrossServerCredentialCollection();
  if (!crossServerCredentialCollection) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request because the cross-server credential collection was not ready in time.',
      ReactKitErrorCode.SignedRequestInvalidCollection,
    );
  }

  // Get the cross-server credential
  const crossServerCredential: CrossServerCredential = await crossServerCredentialCollection.find({ key });
  if (!crossServerCredential) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request because the credential was not found.',
      ReactKitErrorCode.SignedRequestInvalidCredential,
    );
  }

  // Make sure the scope is included
  const allowedScopes = crossServerCredential.scopes;
  if (!allowedScopes.includes(opts.scope)) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request because the scope was not included.',
      ReactKitErrorCode.SignedRequestInvalidScope,
    );
  }

  // Decode the secret
  const secret = await decrypt(crossServerCredential.encodedeSecret);

  /* -------- Verify Signature -------- */

  // Generate a new signature to compare
  const expectedSignature = await genSignature({
    method,
    path,
    params,
    secret,
  });

  // Make sure the signatures match
  if (signature !== expectedSignature) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request because the signature did not match.',
      ReactKitErrorCode.SignedRequestInvalidSignature,
    );
  }

  // Make sure the timestamp was recent enough
  const elapsedMs = Math.abs(Date.now() - timestamp);
  if (elapsedMs < MINUTE_IN_MS) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request because the request was too old.',
      ReactKitErrorCode.SignedRequestInvalidTimestamp,
    );
  }
};
