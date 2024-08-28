/**
 * Send a server-to-server request from this sever to another server that uses
 *   dce-reactkit [for server only]
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.path - the path of the other server's endpoint
 * @param [opts.method=GET] - the method of the endpoint
 * @param [opts.params] - query/body parameters to include
 * @param [opts.headers] - headers to include
 * @returns response from server
 */
declare const visitEndpointOnAnotherServer: (opts: {
    path: string;
    method?: "GET" | "POST" | "DELETE" | "PUT" | undefined;
    params?: {
        [x: string]: any;
    } | undefined;
    headers?: {
        [x: string]: any;
    } | undefined;
}) => Promise<any>;
export default visitEndpointOnAnotherServer;
