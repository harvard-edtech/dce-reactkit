/**
 * Visit an endpoint on another server
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.method the method of the endpoint
 * @param opts.path the path of the other server's endpoint
 * @param opts.host the host of the other server
 * @param [opts.params={}] query/body parameters to include
 * @param [opts.responseType=JSON] the response type from the other server
 */
declare const visitEndpointOnAnotherServer: (opts: {
    method: 'GET' | 'POST' | 'DELETE' | 'PUT';
    path: string;
    host: string;
    params?: {
        [x: string]: any;
    } | undefined;
    responseType?: "Text" | "JSON" | undefined;
}) => Promise<any>;
export default visitEndpointOnAnotherServer;
