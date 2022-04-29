/**
 * Handle an error and respond to the client
 * @author Gabe Abrams
 * @param res express response
 * @param error error info
 * @param opts.err the error to send to the client
 *   or the error message
 * @param [opts.code] an error code (only used if err.code is not
 *   included)
 * @param [opts.status=500] the https status code to use
 *   defined)
 */
declare const handleError: (res: any, error: ({
    message: any;
    code?: string;
    status?: number;
} | Error | string | any)) => undefined;
export default handleError;
