/**
 * A wrapper for the entire React app that adds global functionality like
 *   handling for fatal error messages, adds bootstrap support
 * @author Gabe Abrams
 */
import React from 'react';
import Variant from '../types/Variant';
declare type Props = {
    children: React.ReactNode;
    sendRequest: SendRequestFunction;
    dark?: boolean;
    sessionExpiredMessage?: string;
};
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
 * Send a request using caccl's send request feature
 * @author Gabe Abrams
 * @param opts send request options
 * @returns send request response
 */
export declare const cacclSendRequest: SendRequestFunction;
/**
 * Show an alert modal with an "Okay" button
 * @author Gabe Abrams
 * @param title the title text to display at the top of the alert
 * @param text the text to display in the alert
 */
export declare const alert: (title: string, text: string) => Promise<undefined>;
/**
 * Show a confirmation modal with an "Okay" and a "Cancel" button
 *   (with the option to customize the text of those buttons)
 * @author Gabe Abrams
 * @param title the title text to display at the top of the alert
 * @param text the text to display in the alert
 * @param [opts={}] additional options for the confirmation dialog
 * @param [opts.confirmButtonText=Okay] the text of the confirm button
 * @param [opts.confirmButtonVariant=Variant.Dark] the variant of the confirm
 *   button
 * @param [opts.cancelButtonText=Cancel] the text of the cancel button
 * @param [opts.cancelButtonVariant=Variant.Secondary] the variant of the cancel
 *   button
 * @returns true if the user confirmed
 */
export declare const confirm: (title: string, text: string, opts?: {
    confirmButtonText?: string | undefined;
    confirmButtonVariant?: Variant | undefined;
    cancelButtonText?: string | undefined;
    cancelButtonVariant?: Variant | undefined;
} | undefined) => Promise<boolean>;
/**
 * Show a fatal error message
 * @author Gabe Abrams
 * @param error the error to show
 * @param [errorTitle] title of the error box
 */
export declare const showFatalError: (error: any, errorTitle?: string) => undefined;
/**
 * Show the "session expired" message
 * @author Gabe Abrams
 */
export declare const showSessionExpiredMessage: () => undefined;
declare const AppWrapper: React.FC<Props>;
export default AppWrapper;
