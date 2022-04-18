import ParamType from '../types/ParamType';
/**
 * Parse express request params and body
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.req express request instance
 * @param opts.res express response instance
 * @param opts.params map of parameters that should be parsed out of the request
 * @returns parsed params + user info from session (if it exists) or undefined
 *   if an error occurred
 */
declare const parseRequest: (opts: {
    req: any;
    res: any;
    params: {
        [x: string]: ParamType;
    };
}) => {
    [x: string]: any;
} | undefined;
export default parseRequest;
