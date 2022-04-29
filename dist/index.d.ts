/// <reference types="react" />
import React from 'react';

/**
 * A wrapper for the entire React app that adds global functionality like
 *   handling for fatal error messages, adds bootstrap support
 * @author Gabe Abrams
 */

declare type Props$3 = {
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
 * Show an alert modal with an "Okay" button
 * @author Gabe Abrams
 * @param title the title text to display at the top of the alert
 * @param text the text to display in the alert
 */
declare const alert: (title: string, text: string) => Promise<undefined>;
/**
 * Show a confirmation modal with an "Okay" and a "Cancel" button
 * @author Gabe Abrams
 * @param title the title text to display at the top of the alert
 * @param text the text to display in the alert
 * @returns true if the user confirmed
 */
declare const confirm: (title: string, text: string) => Promise<boolean>;
/**
 * Show a fatal error message
 * @author Gabe Abrams
 * @param error the error to show
 * @param [errorTitle] title of the error box
 */
declare const showFatalError: (error: any, errorTitle?: string) => undefined;
declare const AppWrapper: React.FC<Props$3>;

/**
 * Loading spinner/indicator
 * @author Gabe Abrams
 */
declare const LoadingSpinner: () => JSX.Element;

/**
 * Displays an error
 * @author Gabe Abrams
 */

declare type Props$2 = {
    error: any;
    title?: string;
    onClose?: () => void;
};
declare const ErrorBox: React.FC<Props$2>;

/**
 * Bootstrap variants
 * @author Gabe Abrams
 */
declare enum Variant {
    Primary = "primary",
    Secondary = "secondary",
    Success = "success",
    Warning = "warning",
    Info = "info",
    Danger = "danger",
    Light = "light",
    Dark = "dark"
}

/**
 * Types of buttons in the modal
 * @author Gabe Abrams
 */
declare enum ModalButtonType {
    Okay = "okay",
    Cancel = "cancel",
    Yes = "yes",
    No = "no",
    Abandon = "abandon",
    GoBack = "goBack",
    Continue = "continue",
    ImSure = "imSure",
    Delete = "delete",
    Confirm = "confirm"
}

/**
 * Modal sizes
 * @author Gabe Abrams
 */
declare enum ModalSize {
    Small = "sm",
    Medium = "md",
    Large = "lg",
    ExtraLarge = "xl"
}

/**
 * Types of modals
 * @author Gabe Abrams
 */
declare enum ModalType {
    Okay = "okay",
    OkayCancel = "okay-cancel",
    YesNo = "yes-no",
    YesNoCancel = "yes-no-cancel",
    AbandonGoBack = "abandon-goBack",
    ImSureCancel = "imSure-cancel",
    DeleteCancel = "delete-cancel",
    ConfirmCancel = "confirm-cancel",
    NoButtons = "-"
}

/**
 * A generic popup modal
 * @author Gabe Abrams
 */

declare type Props$1 = {
    type?: ModalType;
    size?: ModalSize;
    title?: React.ReactNode;
    children?: React.ReactNode;
    onClose?: (type: ModalButtonType) => void;
    dontAllowBackdropExit?: boolean;
    okayLabel?: string;
    okayVariant?: Variant;
    cancelLabel?: string;
    cancelVariant?: Variant;
    yesLabel?: string;
    yesVariant?: Variant;
    noLabel?: string;
    noVariant?: Variant;
    abandonLabel?: string;
    abandonVariant?: Variant;
    goBackLabel?: string;
    goBackVariant?: Variant;
    continueLabel?: string;
    continueVariant?: Variant;
    imSureLabel?: string;
    imSureVariant?: Variant;
    deleteLabel?: string;
    deleteVariant?: Variant;
    confirmLabel?: string;
    confirmVariant?: Variant;
    onTopOfOtherModals?: boolean;
};
declare const Modal: React.FC<Props$1>;

/**
 * A box with a tab on the top that holds buttons and other content
 * @author Gabe Abrams
 */

declare type Props = {
    title: React.ReactNode;
    children: React.ReactNode;
    noBottomPadding?: boolean;
};
declare const TabBox: React.FC<Props>;

/**
 * An error with a code
 * @author Gabe Abrams
 */
declare class ErrorWithCode extends Error {
    code: string;
    constructor(message: string, code: string);
}

/**
 * Shorten text so it fits into a certain number of chars
 * @author Gabe Abrams
 * @param text the text to abbreviate
 * @param maxChars the maximum number of chars to include
 * @returns abbreviated text with length no greater than maxChars
 *   (including ellipses if applicable)
 */
declare const abbreviate: (text: string, maxChars: number) => string;

/**
 * Get the average of a set of numbers
 * @author Gabe Abrams
 * @param nums the numbers to average
 * @returns average value or 0 if no numbers
 */
declare const avg: (nums: number[]) => number;

/**
 * Round a number (ceiling) to a certain number of decimals
 * @author Gabe Abrams
 * @param num the number to round
 * @param numDecimals the number of decimals to round to
 * @returns rounded number
 */
declare const ceilToNumDecimals: (num: number, numDecimals: number) => number;

/**
 * Round a number (floor) to a certain number of decimals
 * @author Gabe Abrams
 * @param num the number to round
 * @param numDecimals the number of decimals to round to
 * @returns rounded number
 */
declare const floorToNumDecimals: (num: number, numDecimals: number) => number;

/**
 * Force a number to stay within specific bounds
 * @author Gabe Abrams
 * @param num the number to move into the bounds
 * @param min the minimum number in the bound
 * @param max the maximum number in the bound
 * @returns bounded number
 */
declare const forceNumIntoBounds: (num: number, min: number, max: number) => number;

/**
 * Pad a number's decimal with zeros on the right
 *   (e.g. 5.2 becomes 5.20 with 2 digit padding)
 * @author Gabe Abrams
 * @param num the number to pad
 * @param numDigits the minimum number of digits after the decimal
 * @returns padded number
 */
declare const padDecimalZeros: (num: number, numDigits: number) => string;

/**
 * Pad a number with zeros on the left (e.g. 5 becomes 05 with 2 digit padding)
 * @author Gabe Abrams
 * @param num the number to pad
 * @param numDigits the minimum number of digits before the decimal
 * @returns padded number
 */
declare const padZerosLeft: (num: number, numDigits: number) => string;

/**
 * Round a number to a certain number of decimals
 * @author Gabe Abrams
 * @param num the number to round
 * @param numDecimals the number of decimals to round to
 * @returns rounded number
 */
declare const roundToNumDecimals: (num: number, numDecimals: number) => number;

/**
 * Sum the numbers in an array
 * @author Gabe Abrams
 * @param nums the numbers to sum
 * @returns the sum of the numbers
 */
declare const sum: (nums: number[]) => number;

/**
 * Wait for a certain number of ms
 * @author Gabe Abrams
 * @param ms number of ms to wait
 */
declare const waitMs: (ms?: number) => Promise<unknown>;

/**
 * Visit an endpoint on the server [for client only]
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.path - the path of the server endpoint
 * @param [opts.method=GET] - the method of the endpoint
 * @param [opts.params] - query/body parameters to include
 * @returns response from server
 */
declare const visitServerEndpoint: (opts: {
    path: string;
    method?: "GET" | "POST" | "DELETE" | "PUT" | undefined;
    params?: {
        [x: string]: any;
    } | undefined;
}) => Promise<any>;

/**
 * Server-side API param types
 * @author Gabe Abrams
 */
declare enum ParamType {
    Boolean = "boolean",
    BooleanOptional = "boolean-optional",
    Float = "float",
    FloatOptional = "float-optional",
    Int = "int",
    IntOptional = "int-optional",
    JSON = "json",
    JSONOptional = "json-optional",
    String = "string",
    StringOptional = "string-optional"
}

/**
 * Handle an error and respond to the client
 * @author Gabe Abrams
 * @param res express response
 * @param error error info
 * @param opts.err the error to send to the client
 *   or the error message
 * @param [opts.code] an error code (only used if err.code is not
 *   included)
 * @param [opts.status=500] the https status code to use
 *   defined)
 */
declare const handleError: (res: any, error: ({
    message: any;
    code?: string;
    status?: number;
} | Error | string | any)) => undefined;

/**
 * Send successful API response
 * @author Gabe Abrams
 * @param res express response
 * @param body the body of the response to send to the client
 */
declare const handleSuccess: (res: any, body: any) => undefined;

/**
 * Generate an express API route handler
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.paramTypes map containing the types for each parameter that is
 *   included in the request (map: param name => type)
 * @param opts.handler function that processes the request
 * @returns express route handler that takes the following arguments:
 *   params (map: param name => value), handleSuccess (function for handling
 *   successful requests), handleError (function for handling failed requests),
 *   req (express request object), res (express response object)
 */
declare const genRouteHandler: (opts: {
    paramTypes?: {
        [k: string]: ParamType;
    } | undefined;
    handler: (opts: {
        params: {
            [k: string]: any;
        };
        handleSuccess: (body: any) => void;
        handleError: (error: any) => void;
        req: any;
        res: any;
    }) => void;
}) => (req: any, res: any) => Promise<undefined>;

/**
 * List of error codes built into the react kit
 * @author Gabe Abrams
 */
declare enum ReactKitErrorCode {
    NoResponse = "DRK1",
    NoCode = "DRK2",
    SessionExpired = "DRK3",
    MissingParameter = "DRK4",
    InvalidParameter = "DRK5",
    WrongCourse = "DRK6",
    NoCACCLSendRequestFunction = "DRK7",
    NoCACCLGetLaunchInfoFunction = "DRK8"
}

export { AppWrapper, ErrorBox, ErrorWithCode, LoadingSpinner, Modal, ModalButtonType, ModalSize, ModalType, ParamType, ReactKitErrorCode, TabBox, Variant, abbreviate, alert, avg, ceilToNumDecimals, confirm, floorToNumDecimals, forceNumIntoBounds, genRouteHandler, handleError, handleSuccess, padDecimalZeros, padZerosLeft, roundToNumDecimals, showFatalError, sum, visitServerEndpoint, waitMs };
