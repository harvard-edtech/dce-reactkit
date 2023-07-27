/**
 * A wrapper for the entire React app that adds global functionality like
 *   handling for fatal error messages, adds bootstrap support
 * @author Gabe Abrams
 */
import React from 'react';
import Variant from '../types/Variant';
type Props = {
    children: React.ReactNode;
    dark?: boolean;
};
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
    confirmButtonText?: string;
    confirmButtonVariant?: Variant;
    cancelButtonText?: string;
    cancelButtonVariant?: Variant;
}) => Promise<boolean>;
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
