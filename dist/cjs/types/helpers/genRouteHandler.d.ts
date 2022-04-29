import ParamType from '../types/ParamType';
import handleError from './handleError';
import handleSuccess from './handleSuccess';
/**
 * Generate an express API route handler
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.paramTypes map containing the types for each parameter that is
 *   included in the request (map: param name => type)
 * @param opts.handler function that processes the request
 * @returns express route handler that takes the following arguments:
 *   params (map: param name => value), handleSuccess (function for handling
 *   successful requests), handleError (function for handling failed requests),
 *   req (express request object), res (express response object)
 */
declare const genRouteHandler: (opts: {
    paramTypes: {
        [k: string]: ParamType;
    };
    handler: (opts: {
        params: {
            [k: string]: any;
        };
        handleSuccess: (body: any) => void;
        handleError: (error: any) => void;
        req: any;
        res: any;
    }) => void;
}) => (req: any, res: any) => Promise<undefined>;
export default genRouteHandler;
