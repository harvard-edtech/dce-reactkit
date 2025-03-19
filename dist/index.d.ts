/// <reference types="react" />
import React$1 from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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

type Props$m = {
    children: React$1.ReactNode;
};
/**
 * Redirect to a new page
 * @author Gabe Abrams
 * @param url the url to redirect to
 * @param destination the destination of the redirect, for example "YouTube"
 *   and will be used in the following text: `Redirecting to ${destination}...`
 */
declare const leaveToURL: (url: string, destination: string) => Promise<void>;
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
    confirmButtonText?: string;
    confirmButtonVariant?: Variant;
    cancelButtonText?: string;
    cancelButtonVariant?: Variant;
}) => Promise<boolean>;
/**
 * Show a prompt modal asking the user for input
 * @author Yuen Ler Chow
 * @param title the title text to display at the top of the prompt
 * @param [opts={}] additional options for the prompt dialog
 * @param [opts.textAboveInputField] the text to display in the prompt
 * @param [opts.defaultText] the default text for the input field
 * @param [opts.placeholder] the placeholder text for the input field
 * @param [opts.confirmButtonText=Okay] the text of the confirm button
 * @param [opts.confirmButtonVariant=Variant.Dark] the variant of the confirm button
 * @param [opts.cancelButtonText=Cancel] the text of the cancel button
 * @param [opts.cancelButtonVariant=Variant.Secondary] the variant of the cancel button
 * @param [opts.minNumChars] the minimum number of characters required for
 *   the input to be valid
 * @param [opts.findValidationError] a function that takes the input text and
 *   returns an error message if the input is invalid, returns undefined if the
 *   input is valid
 * @param [opts.ariaLabel] the aria label for the input field
 * @returns Promise that resolves with the input string or null if canceled
 */
declare const prompt: (title: string, opts?: {
    textAboveInputField?: string | undefined;
    defaultText?: string | undefined;
    placeholder?: string | undefined;
    confirmButtonText?: string | undefined;
    confirmButtonVariant?: Variant | undefined;
    cancelButtonText?: string | undefined;
    cancelButtonVariant?: Variant | undefined;
    minNumChars?: number | undefined;
    findValidationError?: ((text: string) => string | undefined) | undefined;
    ariaLabel?: string | undefined;
} | undefined) => Promise<string | null>;
/**
 * Show a fatal error message
 * @author Gabe Abrams
 * @param error the error to show
 * @param [errorTitle] title of the error box
 */
declare const showFatalError: (error: any, errorTitle?: string) => Promise<void>;
/**
 * Add a handler for when a fatal error occurs (or when a session expiry occurs)
 * @author Gabe Abrams
 */
declare const addFatalErrorHandler: (handler: () => void) => void;
declare const AppWrapper: React$1.FC<Props$m>;

/**
 * Loading spinner/indicator
 * @author Gabe Abrams
 */

declare const LoadingSpinner: () => React$1.JSX.Element;

/**
 * Displays an error
 * @author Gabe Abrams
 */

type Props$l = {
    error: any;
    title?: string;
    onClose?: () => void;
    variant?: Variant;
    icon?: IconProp;
};
declare const ErrorBox: React$1.FC<Props$l>;

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
    Cancel = "cancel",
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
 * Props for the Modal component
 * @author Gabe Abrams
 */
type ModalProps = {
    key?: string;
    type?: ModalType;
    size?: ModalSize;
    title?: React.ReactNode;
    largeTitle?: boolean;
    children?: React.ReactNode;
    onClose?: (type: ModalButtonType) => void;
    dontAllowBackdropExit?: boolean;
    dontShowXButton?: boolean;
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
    isLoading?: boolean;
    isLoadingCancelable?: boolean;
};

/**
 * The displayable modal component (this is the modal that's added to the
 *   wrapper, not the one that the programmer renders)
 * @author Gabe Abrams
 */

declare const Modal: React$1.FC<ModalProps>;

/**
 * A box with a tab on the top that holds buttons and other content
 * @author Gabe Abrams
 */

type Props$k = {
    title: React$1.ReactNode;
    children: React$1.ReactNode;
    topRightChildren?: React$1.ReactNode;
    noBottomMargin?: boolean;
    noBottomPadding?: boolean;
};
declare const TabBox: React$1.FC<Props$k>;

/**
 * A radio selection button
 * @author Gabe Abrams
 */

type Props$j = {
    text: React$1.ReactNode;
    onSelected: () => void;
    ariaLabel: string;
    title?: string;
    selected?: boolean;
    id?: string;
    className?: string;
    noMarginOnRight?: boolean;
    selectedVariant?: Variant;
    unselectedVariant?: Variant;
    small?: boolean;
    useComplexFormatting?: boolean;
};
declare const RadioButton: React$1.FC<Props$j>;

/**
 * A checkbox button
 * @author Gabe Abrams
 */

type Props$i = {
    text: React$1.ReactNode;
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
    useComplexFormatting?: boolean;
};
declare const CheckboxButton: React$1.FC<Props$i>;

/**
 * Input group with a title and space for buttons
 * @author Gabe Abrams
 */

type Props$h = {
    label: React$1.ReactNode;
    minLabelWidth?: string;
    children: React$1.ReactNode;
    className?: string;
    wrapButtonsAndAddGaps?: boolean;
    isAdminFeature?: boolean;
    noMarginOnBottom?: boolean;
};
declare const ButtonInputGroup: React$1.FC<Props$h>;

/**
 * A very simple, lightweight date chooser
 * @author Gabe Abrams
 * @author Gardeniu Liu
 */

type Props$g = {
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
    dontAllowPast?: boolean;
    dontAllowFuture?: boolean;
};
declare const SimpleDateChooser: React$1.FC<Props$g>;

/**
 * A very simple, lightweight time chooser
 * @author Gardenia Liu
 */

type Props$f = {
    ariaLabel: string;
    name: string;
    hour: number;
    minute: number;
    /**
     * Handler for when time changes
     * @param hour new 24hr hour number
     * @param minute new minute number
     */
    onChange: (hour: number, minute: number) => void;
    intervalMin?: number;
};
declare const SimpleTimeChooser: React$1.FC<Props$f>;

/**
 * Drawer container
 * @author Gabe Abrams
 */

type Props$e = {
    grayBackground?: boolean;
    customBackgroundColor?: string;
    children: React$1.ReactNode;
};
declare const Drawer: React$1.FC<Props$e>;

/**
 * Success checkmark that pops into view
 * @author Gabe Abrams
 */

type Props$d = {
    sizeRem?: number;
    circleVariant?: string;
    checkVariant?: string;
};
declare const PopSuccessMark: React$1.FC<Props$d>;

/**
 * Failure x mark that pops into view
 * @author Gabe Abrams
 */

type Props$c = {
    sizeRem?: number;
    circleVariant?: string;
    xVariant?: string;
};
declare const PopFailureMark: React$1.FC<Props$c>;

/**
 * Failure pending that pops into view
 * @author Gabe Abrams
 */

type Props$b = {
    sizeRem?: number;
    circleVariant?: string;
    hourglassVariant?: string;
};
declare const PopPendingMark: React$1.FC<Props$b>;

/**
 * Copiable text box
 * @author Gabe Abrams
 */

type Props$a = {
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
declare const CopiableBox: React$1.FC<Props$a>;

/**
 * An item that can be chosen (for use within ItemPicker)
 * @author Gabe Abrams
 */
type PickableItem = ({
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

type Props$9 = {
    title: string;
    items: PickableItem[];
    /**
     * Handler to call when item selection is changed
     * @param updatedItems an updated copy of the list of items with checked
     *   values updated
     */
    onChanged: (updatedItems: PickableItem[]) => void;
    noBottomMargin?: boolean;
    hideSelectAllOrNoneButtons?: boolean;
};
declare const ItemPicker: React$1.FC<Props$9>;

/**
 * Type of the context map in a LogMetadata file
 * @author Gabe Abrams
 */
type LogMetadataContextMap = {
    [k: string]: (string | {
        _: string;
        [k: string]: string;
    });
};

/**
 * Type of the tag map inside a LogMetadata file
 * @author Gabe Abrams
 */
type LogMetadataTagMap = {
    [k: string]: string;
};

/**
 * Type of the target map inside a LogMetadata file
 * @author Gabe Abrams
 */
type LogMetadataTargetMap = {
    [k: string]: string;
};

/**
 * Type of a LogMetadata file
 * @author Gabe Abrams
 */
type LogMetadataType = {
    Context?: LogMetadataContextMap;
    Tag?: LogMetadataTagMap;
    Target?: LogMetadataTargetMap;
};

/**
 * Log reviewer panel that allows users (must be approved admins) to
 *   review logs written by dce-reactkit
 * @author Gabe Abrams
 */

type Props$8 = {
    LogMetadata: LogMetadataType;
    onClose: () => void;
};
declare const LogReviewer: React$1.FC<Props$8>;

/**
 * Server-side API param types
 * @author Gabe Abrams
 */
declare enum ParamType {
    Boolean = "Boolean",
    BooleanOptional = "BooleanOptional",
    Float = "Float",
    FloatOptional = "FloatOptional",
    Int = "Int",
    IntOptional = "IntOptional",
    JSON = "JSON",
    JSONOptional = "JSONOptional",
    String = "String",
    StringOptional = "StringOptional"
}

/**
 * Column description for a column in the IntelliTable
 * @author Gabe Abrams
 */
type IntelliTableColumn = {
    title: string;
    param: string;
    type: (ParamType.Boolean | ParamType.Float | ParamType.Int | ParamType.String | ParamType.JSON);
    startsHidden?: boolean;
};

/**
 * Intelligent table
 * @author Gabe Abrams
 */

type Props$7 = {
    title: string;
    id: string;
    data: {
        id: string | number;
        [k: string]: any;
    }[];
    columns: IntelliTableColumn[];
    csvName?: string;
};
declare const IntelliTable: React$1.FC<Props$7>;

/**
 * Button for downloading a csv file
 * @author Gabe Abrams
 */

type Props$6 = {
    filename: string;
    csv: string;
    id?: string;
    className?: string;
    ariaLabel?: string;
    style?: {
        [k: string]: any;
    };
    onClick?: () => void;
    children?: React$1.ReactNode;
};
declare const CSVDownloadButton: React$1.FC<Props$6>;

/**
 * Generic type for an object
 * @author Yuen Ler Chow
 */
type DBEntry = {
    [k: string]: any;
};

/**
 * Options for field types
 * @author Yuen Ler Chow
 */
declare enum DBEntryFieldType {
    String = "String",
    Number = "Number",
    Object = "Object",
    StringArray = "StringArray",
    NumberArray = "NumberArray"
}

/**
 * A database entry input field
 * @author Yuen Ler Chow
 */
type DBEntryField = ({
    label: string;
    objectKey: string;
    placeholder: string;
    lockAfterCreation?: boolean;
    required?: boolean;
} & ({
    type: DBEntryFieldType.String;
    minNumChars?: number;
    maxNumChars?: number;
    defaultValue?: string;
    choices?: {
        title: string;
        value: string;
    }[];
} | {
    type: DBEntryFieldType.Number;
    minNumber?: number;
    maxNumber?: number;
    defaultValue?: number;
} | {
    type: DBEntryFieldType.StringArray;
    minNumElements?: number;
    maxNumElements?: number;
    defaultValue?: string[];
    choices?: {
        title: string;
        value: string;
    }[];
} | {
    type: DBEntryFieldType.NumberArray;
    minNumElements?: number;
    maxNumElements?: number;
    minNumber?: number;
    maxNumber?: number;
    defaultValue?: number[];
} | {
    type: DBEntryFieldType.Object;
    defaultValue?: {
        [k: string]: any;
    };
    subfields: DBEntryField[];
}));

/**
 * DB Entry Manager Panel
 * @author Yuen Ler Chow
 * @author Gabe Abrams
 */

type Props$5 = {
    entryFields: DBEntryField[];
    idPropName: string;
    titlePropName: string;
    descriptionPropName: string;
    itemListTitle: string;
    itemName: string;
    /**
     * Function to validate the db entry before sending to the server
     *   (throws an error if not validate)
     * @param dbEntry the db entry to validate
     */
    validateEntry?: (dbEntry: DBEntry) => Promise<void>;
    /**
     * Function to modify the db entry before sending to the server
     * @param dbEntry the db entry to modify
     * @returns the modified db entry
     */
    modifyEntry?: (dbEntry: DBEntry) => Promise<DBEntry> | DBEntry;
    disableEdit?: boolean;
    collectionName: string;
    adminsOnly?: boolean;
    filterQuery?: {
        [k: string]: any;
    };
};
declare const DBEntryManagerPanel: React$1.FC<Props$5>;

/**
 * Simple tooltip component
 * @author Gabe Abrams
 */

type Props$4 = {
    text: string;
    children: any;
};
declare const Tooltip: React$1.FC<Props$4>;

/**
 * A toggle switch that toggles on or off
 * @author Alessandra De Lucas
 * @author Gabe Abrams
 */

type Props$3 = {
    isOn: boolean;
    /**
     * A handler to call when the switch is toggled
     * @param isOn Updated value for isOn
     */
    onToggle: (isOn: boolean) => void;
    id?: string;
    className?: string;
    description: string;
    backgroundVariantWhenOn?: Variant;
};
declare const ToggleSwitch: React$1.FC<Props$3>;

/**
 * Container that automatically scrolls when new items are added,
 *   lets the user scroll up to see old items, but resumes
 *   autoscroll when the user scrolls back to the bottom.
 *   Note: takes up full height of parent, so parent should
 *   have a determined height for the scroll to work.
 * @author Gabe Abrams
 */

type Props$2 = {
    itemsName?: string;
    items: AutoScrollItem[];
    jumpToBottomButtonVariant?: Variant;
    messageBeforeItems?: React$1.ReactNode;
    messageAfterItems?: React$1.ReactNode;
};
type AutoScrollItem = {
    id: string | number;
    item: React$1.ReactNode;
};
declare const AutoscrollToBottomContainer: React$1.FC<Props$2>;

/**
 * A switch with multiple options for selection
 * @author Alessandra De Lucas
 * @author Gabe Abrams
 * @author Austen Money
 */

type Props$1 = {
    options: Option[];
    selectedOptionId: string;
    /**
     * A handler to call when the switch is changed
     * @param selectedOptionId Updated option when switch is changed
     */
    onChange: (selectedOptionId: string) => void;
    heightRem?: number;
};
type Option = {
    label: string;
    icon: IconProp;
    id: string;
};
declare const MultiSwitch: React$1.FC<Props$1>;

declare enum DropdownItemType {
    Header = "Header",
    Divider = "Divider",
    Item = "Item"
}

/**
 * A simple dropdown menu
 * @author Alessandra De Lucas
 * @author Yuen Ler Chow
 * @author Gabe Abrams
 */

type Props = {
    items: DropdownItem[];
    dropdownButton: {
        ariaLabel: string;
        id: string;
        content?: React$1.ReactNode;
        variant?: Variant;
    };
};
type DropdownItem = ({
    type: DropdownItemType.Header;
    content: React$1.ReactNode;
} | {
    type: DropdownItemType.Divider;
} | {
    type: DropdownItemType.Item;
    content: React$1.ReactNode;
    ariaLabel: string;
    id: string;
    onClick: () => void;
});
declare const Dropdown: React$1.FC<Props>;

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
 * Path of the route for storing client-side logs
 * @author Gabe Abrams
 */
declare const LOG_REVIEW_ROUTE_PATH_PREFIX: string;

/**
 * Path of the route for storing client-side logs
 * @author Gabe Abrams
 */
declare const LOG_ROUTE_PATH: string;

/**
 * Route for checking the status of the current user's
 *   access to log review
 * @author Gabe Abrams
 */
declare const LOG_REVIEW_STATUS_ROUTE: string;

/**
 * Dynamic words determined by the user's platform
 * @author Gabe Abrams
 */
declare const DynamicWord: {
    Click: string;
    ClickCapitalized: string;
    App: string;
    AppCapitalized: string;
    Device: string;
    DeviceCapitalized: string;
};

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
 * @param [dateOrTimestamp=now] the date to get info on or a ms since epoch timestamp
 * @returns object with timestamp (ms since epoch) and numbers
 *   corresponding to ET time values for year, month, day, hour, hour12, minute, isPM
 *   where hour is in 24hr time and hour12 is in 12hr time.
 */
declare const getTimeInfoInET: (dateOrTimestamp?: Date | number) => {
    timestamp: number;
    year: number;
    month: number;
    day: number;
    hour: number;
    hour12: number;
    minute: number;
    isPM: boolean;
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
declare const getHumanReadableDate: (dateOrTimestamp?: Date | number) => string;

/**
 * Get the current part of day (morning, evening, etc.)
 * @author Gabe Abrams
 * @returns the part of day (morning, evening, etc.)
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
declare const parallelLimit: (taskFunctions: (() => Promise<any>)[], limit?: number) => Promise<any[]>;

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
type LogMainInfo = {
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
type LogSourceSpecificInfo = ({
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
    Open = "Open",
    Close = "Close",
    Cancel = "Cancel",
    Expand = "Expand",
    Collapse = "Collapse",
    View = "View",
    Interrupt = "Interrupt",
    Create = "Create",
    Modify = "Modify",
    Delete = "Delete",
    Add = "Add",
    Remove = "Remove",
    Activate = "Activate",
    Deactivate = "Deactivate",
    Peek = "Peek",
    Halt = "Halt",
    Resume = "Resume",
    Jump = "Jump",
    Post = "Post",
    Unknown = "Unknown"
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
type LogTypeSpecificInfo = ({
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
type Log = (LogMainInfo & LogSourceSpecificInfo & LogTypeSpecificInfo);

/**
 * Type of a log action function
 * @author Gabe Abrams
 */
type LogFunction = (opts: ({
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

type MetadataPopulator = () => {
    [k: string]: any;
} | Promise<{
    [k: string]: any;
}>;
/**
 * Set the metadata populator function that will be called before every client
 *   event is logged. The function should return a set of metadata values that
 *   will be added to all client events
 * @author Gabe Abrams
 * @param metadataPopulator function to call that will return a set of metadata
 *   values that will be added to all client events
 */
declare const setClientEventMetadataPopulator: (newMetadataPopulator: MetadataPopulator) => void;
/**
 * Log a user action on the client (cannot be used on the server)
 * @author Gabe Abrams
 */
declare const logClientEvent: LogFunction;

/**
 * Get the name of a month given the month number (1 = January, etc.)
 *   If an invalid number is provided, we will treat it like January
 * @author Gabe Abrams
 * @param month the number of the month
 * @returns object containing multiple month name formats:
 *   { short, full } where short will look like "Jan" and full will look like
 *   "January"
 */
declare const getMonthName: (month: number) => {
    short: string;
    full: string;
};

/**
 * Generate a CSV file
 * @author Gabe Abrams
 * @param data list of row data in the form of json objects
 * @param columns list of columns to include in the csv
 * @returns multiline csv string
 */
declare const genCSV: (data: {
    [k: string]: any;
}[], columns: {
    title: string;
    param: string;
}[]) => string;

/**
 * Check if the current user can review logs
 * @author Gabe Abrams
 * @returns true if current user can review logs
 */
declare const canReviewLogs: () => Promise<boolean>;

/**
 * Check if the user is on a mobile device or tablet
 * from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
 * @returns true if user is on a mobile device
 */
declare const isMobileOrTablet: () => boolean;

/**
 * For every element in an array, extract the value of a prop
 *   (e.g. for all user objects, extract their ages and put that into a new
 *   ages array)
 * @author Gabe Abrams
 * @param arr the array of objects to operate on
 * @param prop the property to extract from each object
 * @returns new array containing the corresponding values, in order, of each
 *   object in the original array
 */
declare const extractProp: (arr: any[], prop: string) => any[];

/**
 * Compare two arrays of objects by only comparing the values in a specific
 *  property (e.g. compare user arrays by comparing their user.id values)
 * @author Gabe Abrams
 * @param a the first array
 * @param b the second array
 * @param prop the property to compare with, or an array of props to compare
 *   with (if array, all values associated with those props must match)
 * @returns true if the arrays contain the same objects as determined by
 *   the values associated with each object's prop
 */
declare const compareArraysByProp: (a: any[], b: any[], prop: string | string[]) => boolean;

/**
 * Get current time info in local time
 * @author Gabe Abrams
 * @param [dateOrTimestamp=now] the date to get info on or a ms since epoch timestamp
 * @returns object with timestamp (ms since epoch) and numbers
 *   corresponding to time values for year, month, day, hour, hour12, minute, isPM
 *   where hour is in 24hr time and hour12 is in 12hr time.
 */
declare const getLocalTimeInfo: (dateOrTimestamp?: Date | number) => {
    timestamp: number;
    year: number;
    month: number;
    day: number;
    hour: number;
    hour12: number;
    minute: number;
    isPM: boolean;
};

/**
 * Given an array of strings, create a single comma-separated string that includes
 * 'and' as well as an oxford comma.
 *   Ex: ['apples'] => 'apples'
 *   Ex: ['apples', 'bananas'] => 'apples and bananas'
 *   Ex: ['apples', 'bananas', 'grapes'] => 'apples, bananas, and grapes'
 * @author Austen Money
 * @param list an array of elements to be made into a single comma-separated string.
 * @returns a comma-separated string.
 */
declare const genCommaList: (list: string[]) => string;

/**
 * Result of a validation function.
 * @author Austen Money
 */
type ValidationResult<CleanedValueType> = ({
    isValid: true;
    cleanedValue: CleanedValueType;
} | {
    isValid: false;
    errorMessage: string;
});

/**
 * Determines whether a given email address is valid.
 * @author Austen Money
 * @param email email address to validate
 * @returns whether email fulfills proper formatting requirements, includes a
 *   cleaned version of the address without leading or trailing
 *   whitespace if valid or an error message if invalid.
 */
declare const validateEmail: (email: string) => ValidationResult<string>;

/**
 * Determines whether a given phone number is valid.
 * @author Austen Money
 * @param phoneNumber phone number to validate
 * @returns whether phone number is considered valid - if valid, also returns
 *   a cleaned version of the number without any formatting. If invalid,
 *   returns an error message.
 */
declare const validatePhoneNumber: (phoneNumber: string) => ValidationResult<string>;

/**
 * Determines whether a given input string is considered valid based on
 *   the provided requirements.
 * @author Austen Money
 * @param input input string
 * @param opts options for validation
 * @returns whether input is considered valid according to reqs - if
 *   valid, returns a cleaned version of input; if invalid, returns
 *   a string containing error messages describing which requirements
 *   were not met.
 */
declare const validateString: (input: string, opts: {
    ignoreWhitespace?: boolean;
    minLen?: number;
    maxLen?: number;
    lettersOnly?: boolean;
    numbersOnly?: boolean;
    regexTest?: RegExp;
    regexDescription?: string;
}) => ValidationResult<string>;

/**
 * Convert a string to hyphenated lowercase format with no space or
 *   non-alphanumeric characters
 * @author Gabe Abrams
 * @param str the string to convert
 * @returns the idified string
 */
declare const idify: (str: string) => string;

/**
 * Given some text, make the links clickable
 * @author Gabe Abrams
 * @param text the text to process
 * @param [opts] options to customize behavior
 * @param [opts.newTab] if true, links will open in a new tab
 * @param [opts.preventPropagation] if true, clicks to link will prevent
 *   propagation
 * @param [opts.inheritColor] if true, inherit text color for links
 * @returns the processed text
 */
declare const makeLinksClickable: (text: string, opts?: {
    newTab?: boolean;
    preventPropagation?: boolean;
    inheritColor?: boolean;
}) => React$1.ReactNode;

/**
 * Merges a list of class names into a class name, intelligently handling spaces
 * @author Gabe Abrams
 * @param classNames the list of class names to merge (or falsey values to
 *   ignore)
 * @returns the merged class name
 */
declare const combineClassNames: (classNames: (string | undefined | null | false)[]) => string;

/**
 * Prefix a word or name with "a" or "an" depending on whether it starts with a
 *   vowel or not
 * @author Gabe Abrams
 * @param text the text to prefix
 * @param capitalize whether to capitalize the "A" or "An"
 * @returns the text prefixed with "a" or "an"
 */
declare const prefixWithAOrAn: (text: string, capitalize?: boolean) => string;

/**
 * Create a function that forces a render of a component. Use this only when
 *   absolutely necessary
 * @author Gabe Abrams
 * @param useReducer the useReducer hook
 * @returns forceRender function
 */
declare const useForceRender: (useReducer: any) => () => void;

/**
 * Run the operator function on each item in the array, returning true if
 *   the operator function returns true for every item in the array
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply. If it returns true
 *   for every item, this function will return true
 * @returns true if the operator function returns true for every item in the array
 */
declare const everyAsync: <T>(array: T[], operatorFunction: (item: T, index: number, opts: {
    breakNow: () => void;
    array: T[];
}) => Promise<any>) => Promise<boolean>;

/**
 * Run the operator function on each item in the array, returning a new array
 *   that only contains the items that pass the filter
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply. If it returns true
 *   for an item, the item will be included in the returned array
 * @returns the filtered array
 */
declare const filterAsync: <T>(array: T[], operatorFunction: (item: T, index: number, opts: {
    breakNow: () => void;
    array: T[];
}) => Promise<any>) => Promise<T[]>;

/**
 * Run the operator function on each item in the array
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply
 */
declare const forEachAsync: <T>(array: T[], operatorFunction: (item: T, index: number, opts: {
    breakNow: () => void;
    array: T[];
}) => void) => Promise<void>;

/**
 * Run the operator function on each item in the array, collecting all results
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply
 * @returns the array of results
 */
declare const mapAsync: <T, U>(array: T[], operatorFunction: (item: T, index: number, opts: {
    breakNow: () => void;
    array: T[];
}) => Promise<U>) => Promise<U[]>;

/**
 * Run the operator function on each item in the array, returning true if
 *   the operator function returns true for any item in the array
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply. If it returns true
 *   for any item, this function will return true
 * @returns true if the operator function returns true for any item in the array
 */
declare const someAsync: <T>(array: T[], operatorFunction: (item: T, index: number, opts: {
    breakNow: () => void;
    array: T[];
}) => Promise<any>) => Promise<boolean>;

/**
 * Capitalize every word in a string (just the first letter)
 * @param str string to capitalize
 * @returns string with every word capitalized
 */
declare const capitalize: (str: string) => string;

/**
 * Shuffle a given array
 * @author Austen Money
 * @param arr the array to shuffle
 * @returns the shuffled array
 */
declare const shuffleArray: <T>(arr: T[]) => T[];

/**
 * Get number of words in string
 * @author Gardenia Liu
 * @author Allison Zhang
 * @author Gabe Abrams
 * @param text the string to check
 * @returns number of words in the string
 */
declare const getWordCount: (text: string) => number;

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
        ClientFatalError: string;
    };
    Target: {
        NoTarget: string;
    };
};

/**
 * List of error codes built into the react kit
 * @author Gabe Abrams
 */
declare enum ReactKitErrorCode {
    NoResponse = "DRK1",
    NoCode = "DRK2",
    SessionExpired = "DRK3",
    NoCACCLSendRequestFunction = "DRK7",
    SimpleDateChooserInvalidDateRange = "DRK35",
    SimpleDateChooserInvalidNumMonths = "DRK36"
}

export { AppWrapper, AutoscrollToBottomContainer, ButtonInputGroup, CSVDownloadButton, CheckboxButton, CopiableBox, DAY_IN_MS, DBEntry, DBEntryField, DBEntryFieldType, DBEntryManagerPanel, DayOfWeek, Drawer, Dropdown, DropdownItemType, DynamicWord, ErrorBox, ErrorWithCode, HOUR_IN_MS, IntelliTable, IntelliTableColumn, ItemPicker, LOG_REVIEW_ROUTE_PATH_PREFIX, LOG_REVIEW_STATUS_ROUTE, LOG_ROUTE_PATH, LoadingSpinner, Log, LogAction, LogBuiltInMetadata, LogFunction, LogLevel, LogMainInfo, LogMetadataType, LogReviewer, LogSource, LogSourceSpecificInfo, LogType, LogTypeSpecificInfo, MINUTE_IN_MS, Modal, ModalButtonType, ModalSize, ModalType, MultiSwitch, ParamType, PickableItem, PopFailureMark, PopPendingMark, PopSuccessMark, RadioButton, ReactKitErrorCode, SimpleDateChooser, SimpleTimeChooser, TabBox, ToggleSwitch, Tooltip, Variant, abbreviate, addFatalErrorHandler, alert, avg, canReviewLogs, capitalize, ceilToNumDecimals, combineClassNames, compareArraysByProp, confirm, everyAsync, extractProp, filterAsync, floorToNumDecimals, forEachAsync, forceNumIntoBounds, genCSV, genCommaList, getHumanReadableDate, getLocalTimeInfo, getMonthName, getOrdinal, getPartOfDay, getTimeInfoInET, getWordCount, idify, initClient, isMobileOrTablet, leaveToURL, logClientEvent, makeLinksClickable, mapAsync, onlyKeepLetters, padDecimalZeros, padZerosLeft, parallelLimit, prefixWithAOrAn, prompt, roundToNumDecimals, setClientEventMetadataPopulator, showFatalError, shuffleArray, someAsync, startMinWait, stringsToHumanReadableList, stubServerEndpoint, sum, useForceRender, validateEmail, validatePhoneNumber, validateString, visitServerEndpoint, waitMs };
