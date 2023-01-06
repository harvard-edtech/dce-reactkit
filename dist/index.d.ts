/// <reference types="react" />
import React from 'react';

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
 * A wrapper for the entire React app that adds global functionality like
 *   handling for fatal error messages, adds bootstrap support
 * @author Gabe Abrams
 */

declare type Props$d = {
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
declare const confirm: (title: string, text: string, opts?: {
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
declare const showFatalError: (error: any, errorTitle?: string) => undefined;
declare const AppWrapper: React.FC<Props$d>;

/**
 * Loading spinner/indicator
 * @author Gabe Abrams
 */
declare const LoadingSpinner: () => JSX.Element;

/**
 * Displays an error
 * @author Gabe Abrams
 */

declare type Props$c = {
    error: any;
    title?: string;
    onClose?: () => void;
};
declare const ErrorBox: React.FC<Props$c>;

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

declare type Props$b = {
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
declare const Modal: React.FC<Props$b>;

/**
 * A box with a tab on the top that holds buttons and other content
 * @author Gabe Abrams
 */

declare type Props$a = {
    title: React.ReactNode;
    children: React.ReactNode;
    noBottomMargin?: boolean;
    noBottomPadding?: boolean;
};
declare const TabBox: React.FC<Props$a>;

/**
 * A radio selection button
 * @author Gabe Abrams
 */

declare type Props$9 = {
    text: string;
    onSelected: () => void;
    ariaLabel: string;
    title?: string;
    selected?: boolean;
    id?: string;
    noMarginOnRight?: boolean;
    selectedVariant?: Variant;
    unselectedVariant?: Variant;
    small?: boolean;
};
declare const RadioButton: React.FC<Props$9>;

/**
 * A checkbox button
 * @author Gabe Abrams
 */

declare type Props$8 = {
    text: string;
    onChanged: (checked: boolean) => void;
    ariaLabel: string;
    title?: string;
    checked?: boolean;
    id?: string;
    className?: string;
    noMarginOnRight?: boolean;
    checkedVariant?: Variant;
    uncheckedVariant?: Variant;
    small?: boolean;
    dashed?: boolean;
};
declare const CheckboxButton: React.FC<Props$8>;

/**
 * Input group with a title and space for buttons
 * @author Gabe Abrams
 */

declare type Props$7 = {
    label: string;
    minLabelWidth?: string;
    children: React.ReactNode;
};
declare const ButtonInputGroup: React.FC<Props$7>;

/**
 * A very simple, lightweight date chooser
 * @author Gabe Abrams
 */

declare type Props$6 = {
    ariaLabel: string;
    name: string;
    month: number;
    day: number;
    year: number;
    /**
     * Handler for when date changes
     * @param month new 1-indexed month number
     * @param day new 1-indexed day number
     * @param year new full year number
     */
    onChange: (month: number, day: number, year: number) => void;
    numMonthsToShow?: number;
};
declare const SimpleDateChooser: React.FC<Props$6>;

/**
 * Drawer container
 * @author Gabe Abrams
 */

declare type Props$5 = {
    children: React.ReactNode;
};
declare const Drawer: React.FC<Props$5>;

/**
 * Success checkmark that pops into view
 * @author Gabe Abrams
 */

declare type Props$4 = {
    sizeRem?: number;
    circleVariant?: string;
    checkVariant?: string;
};
declare const PopSuccessMark: React.FC<Props$4>;

/**
 * Failure x mark that pops into view
 * @author Gabe Abrams
 */

declare type Props$3 = {
    sizeRem?: number;
    circleVariant?: string;
    xVariant?: string;
};
declare const PopFailureMark: React.FC<Props$3>;

/**
 * Failure pending that pops into view
 * @author Gabe Abrams
 */

declare type Props$2 = {
    sizeRem?: number;
    circleVariant?: string;
    hourglassVariant?: string;
};
declare const PopPendingMark: React.FC<Props$2>;

/**
 * Copiable text box
 * @author Gabe Abrams
 */

declare type Props$1 = {
    text: string;
    maxTextWidthRem?: number;
    label?: string;
    labelIcon?: any;
    minLabelWidthRem?: number;
    multiline?: boolean;
    numVisibleLines?: number;
    onClick?: () => void;
    textAreaId?: string;
    copyButtonId?: string;
};
declare const CopiableBox: React.FC<Props$1>;

/**
 * An item that can be chosen (for use within ItemPicker)
 * @author Gabe Abrams
 */
declare type PickableItem = ({
    id: number | string;
    name: string;
    link?: string;
} & ({
    isGroup: false;
    checked: boolean;
} | {
    isGroup: true;
    children: PickableItem[];
}));

/**
 * Reusable nested item picker
 * @author Yuen Ler Chow
 */

declare type Props = {
    title: string;
    items: PickableItem[];
    /**
     * Handler to call when item selection is changed
     * @param updatedItems an updated copy of the list of items with checked
     *   values updated
     */
    onChanged: (updatedItems: PickableItem[]) => void;
};
declare const ItemPicker: React.FC<Props>;

/**
 * An error with a code
 * @author Gabe Abrams
 */
declare class ErrorWithCode extends Error {
    code: string;
    constructor(message: string, code: string);
}

/**
 * One minute in ms
 * @author Gabe Abrams
 */
declare const MINUTE_IN_MS = 60000;

/**
 * One hour in ms
 * @author Gabe Abrams
 */
declare const HOUR_IN_MS = 3600000;

/**
 * One day in ms
 * @author Gabe Abrams
 */
declare const DAY_IN_MS = 86400000;

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
 * Allowed log levels
 * @author Gabe Abrams
 */
declare enum LogLevel {
    Warn = "Warn",
    Info = "Info",
    Debug = "Debug"
}

/**
 * Main information in a log event
 * @author Gabe Abrams
 */
declare type LogMainInfo = {
    id: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userId: number;
    isLearner: boolean;
    isAdmin: boolean;
    isTTM: boolean;
    courseId: number;
    courseName: string;
    browser: {
        name: string;
        version: string;
    };
    device: {
        os: string;
        isMobile: boolean;
    };
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    timestamp: number;
    context: string;
    subcontext: string;
    tags: string[];
    level: LogLevel;
    metadata?: {
        [k: string]: any;
    };
};

/**
 * Source of a log event
 * @author Gabe Abrams
 */
declare enum LogSource {
    Client = "client",
    Server = "server"
}

/**
 * Log info that is specific to the type of source
 * @author Gabe Abrams
 */
declare type LogSourceSpecificInfo = ({
    source: LogSource.Client;
} | {
    source: LogSource.Server;
    routePath: string;
    routeTemplate: string;
});

/**
 * Types of actions
 * @author Gabe Abrams
 */
declare enum LogAction {
    Open = "open",
    Close = "close",
    Cancel = "cancel",
    Expand = "expand",
    Collapse = "collapse",
    View = "view",
    Interrupt = "interrupt",
    Create = "create",
    Edit = "edit",
    Delete = "delete",
    Add = "add",
    Remove = "remove",
    Activate = "activate",
    Deactivate = "deactivate",
    Peek = "peek",
    Unknown = "unknown"
}

/**
 * Type of a log event
 * @author Gabe Abrams
 */
declare enum LogType {
    Action = "action",
    Error = "error"
}

/**
 * Log info that is specific to the type of log
 * @author Gabe Abrams
 */
declare type LogTypeSpecificInfo = ({
    type: LogType.Error;
    errorMessage: string;
    errorCode: string;
    errorStack: string;
} | {
    type: LogType.Action;
    target: string;
    action: LogAction;
});

/**
 * A single log event corresponding to an action performed by a user or an
 *   error encountered by a user
 * @author Gabe Abrams
 */
declare type Log = (LogMainInfo & LogSourceSpecificInfo & LogTypeSpecificInfo);

/**
 * Type of a log action function
 * @author Gabe Abrams
 */
declare type LogFunction = (opts: ({
    context: string | {
        _: string;
    };
    subcontext?: string;
    tags?: string[];
    metadata?: {
        [k: string]: any;
    };
    level?: LogLevel;
} & ({
    error: any;
} | {
    action: LogAction;
    target?: string;
}))) => Promise<Log>;

/**
 * Generate an express API route handler
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.paramTypes map containing the types for each parameter that is
 *   included in the request (map: param name => type)
 * @param opts.handler function that processes the request
 * @param [opts.skipSessionCheck] if true, skip the session check (allow users
 *   to not be logged in and launched via LTI)
 * @returns express route handler that takes the following arguments:
 *   params (map: param name => value),
 *   req (express request object),
 *   next (express next function),
 *   send (a function that sends a string to the client),
 *   redirect (takes a url and redirects the user to that url),
 *   renderErrorPage (shows a static error page to the user),
 *   and returns the value to send to the client as a JSON API response, or
 *   calls next() or redirect(...) or send(...) or renderErrorPage(...).
 *   Note: params also has userId, userFirstName,
 *   userLastName, isLearner, isTTM, isAdmin, and any other variables that
 *   are directly added to the session, if the user does have a session.
 */
declare const genRouteHandler: (opts: {
    paramTypes?: {
        [k: string]: ParamType;
    } | undefined;
    handler: (opts: {
        params: {
            [k: string]: any;
        };
        req: any;
        next: () => void;
        redirect: (pathOrURL: string) => void;
        send: (text: string, status?: number | undefined) => void;
        renderErrorPage: (opts?: {
            title?: string | undefined;
            description?: string | undefined;
            code?: string | undefined;
            pageTitle?: string | undefined;
            status?: number | undefined;
        } | undefined) => void;
        logServerEvent: LogFunction;
    }) => any;
    skipSessionCheck?: boolean | undefined;
}) => (req: any, res: any, next: () => void) => Promise<undefined>;

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

declare type GetLaunchInfoFunction = (req: any) => {
    launched: boolean;
    launchInfo?: any;
};
/**
 * Prepare dce-reactkit to run on the server
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.app express app from inside of the postprocessor function that
 *   we will add routes to
 * @param opts.getLaunchInfo CACCL LTI's get launch info function
 * @param [opts.logCollection] mongo collection from dce-mango to use for
 *   storing logs. If none is included, logs are written to the console
 */
declare const initServer: (opts: {
    app: any;
    getLaunchInfo: GetLaunchInfoFunction;
    logCollection?: any;
}) => void;

/**
 * Get a number's ordinal
 * @author Gabe Abrams
 * @param num the number being analyzed
 * @returns ordinal
 */
declare const getOrdinal: (num: number) => string;

/**
 * Get current time info in US Boston Eastern Time, independent of machine
 *   timezone
 * @author Gabe Abrams
 * @param [date=now] the date to get info on or a ms since epoch timestamp
 * @returns object with timestamp (ms since epoch) and numbers
 *   corresponding to ET time values for year, month, day, hour, minute
 */
declare const getTimeInfoInET: (dateOrTimestamp?: number | Date | undefined) => {
    timestamp: number;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
};

/**
 * Stub a server endpoint response
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param [opts.method=GET] http method to stub
 * @param opts.path full pathname to stub
 * @param opts.body body of response if stubbing a successful response
 * @param opts.errorMessage message of error if stubbing a failed response
 * @param [opts.errorCode] error code if stubbing a failed response
 */
declare const stubServerEndpoint: (opts: {
    method?: string | undefined;
    path: string;
    body?: any;
    errorMessage?: string | undefined;
    errorCode?: string | undefined;
}) => void;

/**
 * Start a dynamic wait, call the function once the operation has completed and
 *   the dynamic wait will continue waiting for the rest of the minimum time
 * @author Gabe Abrams
 * @param minWaitMs the minimum number of ms to wait
 * @returns async function to call to finish the wait
 */
declare const startMinWait: (minWaitMs: number) => () => Promise<void>;

/**
 * Get a human-readable description of a date (all in ET)
 * @author Gabe Abrams
 * @param [dateOrTimestamp=today] the date or timestamp for the date to describe
 * @returns human-readable description of the date
 */
declare const getHumanReadableDate: (dateOrTimestamp?: number | Date | undefined) => string;

/**
 * Get the current part of day (morning, evening, etc.)
 * @author Gabe Abrams
 */
declare const getPartOfDay: () => string;

/**
 * Create a human readable list from an array of strings.
 *   For example, ['apple', 'orange'] becomes "apple and orange"
 *   and ['apple', 'orange', 'mango'] becomes "apple, orange, and mango"
 * @author Gabe Abrams
 * @param items list of items in the list
 * @returns human-readable list
 */
declare const stringsToHumanReadableList: (items: string[]) => string;

/**
 * Given a string, only keep the letters inside it
 * @author Gabe Abrams
 * @param str the string to parse
 * @returns only the letters inside of the string
 */
declare const onlyKeepLetters: (str: string) => string;

/**
 * Run tasks in parallel with a limit on how many tasks can execute at once.
 *   No guarantees are made about the order of task execution
 * @author Gabe Abrams
 * @param taskFunctions functions that start asynchronous tasks and optionally
 *   resolve with values
 * @param [limit=no limit] maximum number of asynchronous tasks to permit to run at
 *   once
 * @returns array of resolved values in the same order as the task functions
 */
declare const parallelLimit: (taskFunctions: (() => Promise<any>)[], limit?: number | undefined) => Promise<any[]>;

/**
 * Log a user action on the client (cannot be used on the server)
 * @author Gabe Abrams
 */
declare const logClientEvent: LogFunction;

/**
 * Initialize a log collection given the dce-mango Collection class
 * @author Gabe Abrams
 * @param Collection the Collection class from dce-mango
 * @returns initialized logCollection
 */
declare const initLogCollection: (Collection: any) => any;

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
    NoCACCLGetLaunchInfoFunction = "DRK8",
    NotTTM = "DRK9",
    NotAdmin = "DRK10"
}

/**
 * Days of the week
 * @author Gabe Abrams
 */
declare enum DayOfWeek {
    Monday = "m",
    Tuesday = "t",
    Wednesday = "w",
    Thursday = "r",
    Friday = "f",
    Saturday = "s",
    Sunday = "u"
}

/**
 * Built-in metadata for logs
 * @author Gabe Abrams
 */
declare const LogBuiltInMetadata: {
    Context: {
        Uncategorized: string;
        ServerRenderedErrorPage: string;
        ServerEndpointError: string;
    };
    Target: {
        NoSpecificTarget: string;
    };
};

export { AppWrapper, ButtonInputGroup, CheckboxButton, CopiableBox, DAY_IN_MS, DayOfWeek, Drawer, ErrorBox, ErrorWithCode, HOUR_IN_MS, ItemPicker, LoadingSpinner, Log, LogAction, LogBuiltInMetadata, LogSource, LogType, MINUTE_IN_MS, Modal, ModalButtonType, ModalSize, ModalType, ParamType, PickableItem, PopFailureMark, PopPendingMark, PopSuccessMark, RadioButton, ReactKitErrorCode, SimpleDateChooser, TabBox, Variant, abbreviate, alert, avg, ceilToNumDecimals, confirm, floorToNumDecimals, forceNumIntoBounds, genRouteHandler, getHumanReadableDate, getOrdinal, getPartOfDay, getTimeInfoInET, handleError, handleSuccess, initLogCollection, initServer, logClientEvent, onlyKeepLetters, padDecimalZeros, padZerosLeft, parallelLimit, roundToNumDecimals, showFatalError, startMinWait, stringsToHumanReadableList, stubServerEndpoint, sum, visitServerEndpoint, waitMs };
