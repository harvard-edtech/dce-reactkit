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
export declare const createSignedPack: (opts: {
    method: string;
    path: string;
    params: {
        [key: string]: any;
    };
    key: string;
    secret: string;
}) => string;
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
export declare const parseSignedPack: (opts: {
    method: string;
    path: string;
    scope: string;
    signedPack: string;
}) => Promise<{
    [key: string]: any;
}>;
