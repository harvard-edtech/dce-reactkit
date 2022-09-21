import ParamType from '../types/ParamType';
/**
 * Generate an express API route handler
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.paramTypes map containing the types for each parameter that is
 *   included in the request (map: param name => type)
 * @param opts.handler function that processes the request
 * @param [opts.allowNotLoggedIn] if true, allow the user to not be logged
 *   in (the user will be allowed to not have launched via LTI)
 * @returns express route handler that takes the following arguments:
 *   params (map: param name => value), handleSuccess (function for handling
 *   successful requests), handleError (function for handling failed requests),
 *   req (express request object), redirect (a function that takes a url and
 *   redirects the user to the url), and send (a function that sends a string
 *   and optional http status code). Params also has userId, userFirstName,
 *   userLastName, isLearner, isTTM, isAdmin, and any other variables that
 *   are directly added to the session
 */
declare const genRouteHandler: (opts: {
    paramTypes?: {
        [k: string]: ParamType;
    } | undefined;
    handler: (opts: {
        params: {
            [k: string]: any;
        };
        req: any;
        next: () => void;
        redirect: (pathOrURL: string) => void;
        send: (text: string, status?: number | undefined) => void;
    }) => any;
    allowNotLoggedIn?: boolean | undefined;
}) => (req: any, res: any, next: () => void) => Promise<undefined>;
export default genRouteHandler;
