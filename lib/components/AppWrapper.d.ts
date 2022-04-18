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
 * Show a fatal error message
 * @author Gabe Abrams
 * @param error the error to show
 */
export declare const showFatalError: (error: any) => void;
declare const AppWrapper: (props: Props) => React.ReactElement;
export default AppWrapper;
