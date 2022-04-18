/**
 * A wrapper for the entire React app that adds global functionality like
 *   handling for fatal error messages
 * @author Gabe Abrams
 */
import React from 'react';
declare type Props = {
    children: React.ReactNode;
    dark?: boolean;
    sessionExpiredMessage?: string;
};
/**
 * Show an alert modal with an "Okay" button
 * @author Gabe Abrams
 * @param title the title text to display at the top of the alert
 * @param text the text to display in the alert
 */
export declare const alert: (title: string, text: string) => Promise<unknown>;
/**
 * Show a confirmation modal with an "Okay" and a "Cancel" button
 * @author Gabe Abrams
 * @param title the title text to display at the top of the alert
 * @param text the text to display in the alert
 * @returns true if the user confirmed
 */
export declare const confirm: (title: string, text: string) => Promise<boolean>;
/**
 * Show a fatal error message
 * @author Gabe Abrams
 * @param error the error to show
 * @param [errorTitle] title of the error box
 */
export declare const showFatalError: (error: any, errorTitle?: string) => Promise<unknown>;
declare const AppWrapper: (props: Props) => React.ReactElement;
export default AppWrapper;
