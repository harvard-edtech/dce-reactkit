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
export declare const signRequest: (opts: {
    method: string;
    path: string;
    params: {
        [key: string]: any;
    };
    key: string;
    secret: string;
}) => Promise<{
    [key: string]: any;
}>;
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
export declare const validateSignedRequest: (opts: {
    method: string;
    path: string;
    scope: string;
    params: {
        [key: string]: any;
    };
}) => Promise<void>;
