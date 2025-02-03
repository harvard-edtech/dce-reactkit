// Import crypto
import { createHash } from 'crypto';

// Import shared helpers
import { internalGetCrossServerCredentialCollection } from '../server/initServer';

// Import shared types
import ErrorWithCode from '../errors/ErrorWithCode';
import ReactKitErrorCode from '../types/ReactKitErrorCode';
import CrossServerCredential from '../types/CrossServerCredential';

// Import shared constants
import MINUTE_IN_MS from '../constants/MINUTE_IN_MS';

/**
 * Sign using sha 256
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.pack the pack to sign
 * @param opts.secret the reactkit secret to sign with
 * @return the signed hash
 */
const genSignature = (
  opts: {
    pack: string,
    secret: string,
  },
): string => {
  // Generate signature
  return (
    createHash('sha256')
      .update(JSON.stringify({ pack: opts.pack, secret: opts.secret }))
      .digest('base64')
  );
};

/**
 * Sign data with a private reactkit key, package it into a signed data pack
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.method the method to sign
 * @param opts.path the http request path
 * @param opts.params the data in the body to sign
 * @param opts.key the reactkit key to sign with
 * @param opts.secret the reactkit secret to sign with
 * @return the signed data
 */
export const createSignedPack = (
  opts: {
    method: string,
    path: string,
    params: { [key: string]: any },
    key: string,
    secret: string,
  },
): string => {
  // Create a timestamp
  const timestamp = Date.now();

  // Create the pack
  const pack = JSON.stringify({
    method: opts.method,
    path: opts.path,
    params: opts.params,
    key: opts.key,
    timestamp,
  });

  // Generate signature
  const signature = genSignature({
    pack,
    secret: opts.secret,
  });

  // Create a signed pack
  const signedPack = encodeURIComponent(JSON.stringify({
    pack,
    signature,
  }));

  // Return the signed pack
  return signedPack;
};

/**
 * Parse signed pack. Throws an error if invalid
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.method the method of the data validate
 * @param opts.path the http request path to validate
 * @param opts.scope the name of the scope to validate
 * @param opts.signedPack the signed data pack to validate
 * @returns parsed and validated params
 */
export const parseSignedPack = async (
  opts: {
    method: string,
    path: string,
    scope: string,
    signedPack: string,
  },
): Promise<{ [key: string]: any }> => {
  // Extract signature
  let pack: string;
  let signature: string;
  let method: string;
  let path: string;
  let key: string;
  let timestamp: number;
  let params: { [k: string]: any };
  try {
    ({
      pack,
      signature,
    } = JSON.parse(decodeURIComponent(opts.signedPack)));

    // Unpack
    ({
      method,
      path,
      params,
      key,
      timestamp,
    } = JSON.parse(pack));
  } catch (err) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request because the request could not be parsed.',
      ReactKitErrorCode.PackUnparseable,
    );
  }

  // Make sure the method and path match
  if (method !== opts.method) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request because the method did not match.',
      ReactKitErrorCode.PackInvalidMethod,
    );
  }
  if (path !== opts.path) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request because the path did not match.',
      ReactKitErrorCode.PackInvalidPath,
    );
  }

  // Make sure the timestamp was recent enough
  const elapsedMs = Math.abs(Date.now() - timestamp);
  if (elapsedMs < MINUTE_IN_MS) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request because the request was too old.',
      ReactKitErrorCode.PackInvalidTimestamp,
    );
  }

  // Get the cross-server credential collection
  const crossServerCredentialCollection = internalGetCrossServerCredentialCollection();
  if (!crossServerCredentialCollection) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request because the cross-server credential collection was not ready in time.',
      ReactKitErrorCode.PackInvalidCollection,
    );
  }

  // Get the cross-server credential
  const crossServerCredential: CrossServerCredential = await crossServerCredentialCollection.find({ key });
  if (!crossServerCredential) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request because the credential was not found.',
      ReactKitErrorCode.PackInvalidCredential,
    );
  }

  // Make sure the scope is included
  const allowedScopes = crossServerCredential.scopes;
  if (!allowedScopes.includes(opts.scope)) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request because the scope was not included.',
      ReactKitErrorCode.PackInvalidScope,
    );
  }

  // Generate signature
  const expectedSignature = genSignature({
    pack,
    secret: crossServerCredential.secret,
  });

  // Make sure the signature matches
  if (signature !== expectedSignature) {
    throw new ErrorWithCode(
      'Could not validate a cross-server request because the signature did not match.',
      ReactKitErrorCode.PackInvalidSignature,
    );
  }

  // Return body
  return params ?? {};
};
