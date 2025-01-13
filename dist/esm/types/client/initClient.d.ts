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
declare let noServer: boolean;
/**
 * Check if there is no server for this app
 * @author Gabe Abrams
 */
export declare const appHasNoServer: () => boolean;
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
declare let darkModeOn: boolean;
/**
 * Get whether dark mode is enabled or not
 * @returns true if dark mode is enabled
 */
export declare const isDarkModeOn: () => boolean;
/**
 * Initialize the client-side version of reactkit
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.sendRequest caccl send request functions
 * @param [opts.sessionExpiredMessage] a custom session expired message
 * @param [opts.darkModeOn] if true, dark mode is enabled
 * @param [opts.noServer] if true, there is no server for this app
 */
declare const initClient: (opts: ({
    sendRequest: SendRequestFunction;
    sessionExpiredMessage?: string;
    darkModeOn?: boolean;
    noServer?: false;
} | {
    darkModeOn?: boolean;
    noServer: true;
    sendRequest?: undefined;
    sessionExpiredMessage?: undefined;
})) => void;
export default initClient;
