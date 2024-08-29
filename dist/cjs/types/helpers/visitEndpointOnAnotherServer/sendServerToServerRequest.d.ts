/**
 * Sends and retries an http request
 * @author Gabriel Abrams
 * @param opts object containing all arguments
 * @param opts.path path to send request to
 * @param [opts.host] host to send request to
 * @param [opts.method=GET] http method to use
 * @param [opts.params] body/data to include in the request
 * @param [opts.headers] headers to include in the request
 * @param [opts.sendCrossDomainCredentials=true if in development mode] if true,
 *   send cross-domain credentials even if not in dev mode
 * @param [opts.responseType=JSON] expected response type
 * @returns { body, status, headers } on success
 */
declare const sendServerToServerRequest: (opts: {
    path: string;
    host?: string | undefined;
    method?: "GET" | "POST" | "DELETE" | "PUT" | undefined;
    params?: {
        [x: string]: any;
    } | undefined;
    headers?: {
        [x: string]: any;
    } | undefined;
    responseType?: "Text" | "JSON" | undefined;
}) => Promise<{
    body: any;
    status: number;
    headers: {
        [x: string]: any;
    };
}>;
export default sendServerToServerRequest;
