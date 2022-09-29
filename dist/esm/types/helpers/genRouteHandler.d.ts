import ParamType from '../types/ParamType';
/**
 * Generate an express API route handler
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.paramTypes map containing the types for each parameter that is
 *   included in the request (map: param name => type)
 * @param opts.handler function that processes the request
 * @param [opts.skipSessionCheck] if true, skip the session check (allow users
 *   to not be logged in and launched via LTI)
 * @returns express route handler that takes the following arguments:
 *   params (map: param name => value),
 *   req (express request object),
 *   next (express next function),
 *   send (a function that sends a string to the client),
 *   redirect (takes a url and redirects the user to that url),
 *   renderErrorPage (shows a static error page to the user),
 *   and returns the value to send to the client as a JSON API response, or
 *   calls next() or redirect(...) or send(...) or renderErrorPage(...).
 *   Note: params also has userId, userFirstName,
 *   userLastName, isLearner, isTTM, isAdmin, and any other variables that
 *   are directly added to the session, if the user does have a session.
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
        renderErrorPage: (opts?: {
            title?: string | undefined;
            description?: string | undefined;
            code?: string | undefined;
            pageTitle?: string | undefined;
            status?: number | undefined;
        } | undefined) => void;
    }) => any;
    skipSessionCheck?: boolean | undefined;
}) => (req: any, res: any, next: () => void) => Promise<undefined>;
export default genRouteHandler;
