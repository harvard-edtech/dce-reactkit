/**
 * Type of CACCL's send request function
 * @author Gabe Abrams
 */
declare type SendRequestFunction = (opts: {
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
export declare const getSendRequest: () => SendRequestFunction;
declare let dark: boolean | undefined;
/**
 * Get the current dark/light theme
 * @author Gabe Abrams
 * @returns true if the app has a dark theme
 */
export declare const darkModeIsOn: () => boolean;
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
 * @param [opts.dark] if true, the app is a dark-themed app
 * @param [opts.sessionExpiredMessage] a custom session expired message
 */
declare const initClient: (opts: {
    sendRequest: SendRequestFunction;
    dark?: boolean;
    sessionExpiredMessage?: string;
}) => void;
export default initClient;
