/**
 * Type of CACCL's send request function
 * @author Gabe Abrams
 */
type SendRequestFunction = (opts: {
    path: string;
    method: ('GET' | 'POST' | 'DELETE' | 'PUT');
    params?: {
        [x: string]: any;
    } | undefined;
    headers?: {
        [x: string]: any;
    } | undefined;
    numRetries?: number | undefined;
}) => Promise<{
    body: any;
    status: number;
    headers: {
        [x: string]: any;
    };
}>;
/**
 * Get the send request function
 * @author Gabe Abrams
 * @returns sendRequest function
 */
export declare const getSendRequest: () => Promise<SendRequestFunction>;
declare let sessionExpiredMessage: string | undefined;
/**
 * Get the custom session expired message
 * @author Gabe Abrams
 * @returns session expired message
 */
export declare const getSessionExpiredMessage: () => string;
/**
 * Initialize the client-side version of reactkit
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.sendRequest caccl send request functions
 * @param [opts.sessionExpiredMessage] a custom session expired message
 */
declare const initClient: (opts: {
    sendRequest: SendRequestFunction;
    sessionExpiredMessage?: string;
}) => void;
export default initClient;
