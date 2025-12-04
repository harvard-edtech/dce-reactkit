/// <reference types="react" />
import { LogMetadataType, ParamType, LogFunction, LogType, LogSource } from 'dce-commonkit';
export { DAY_IN_MS, DayOfWeek, ErrorWithCode, HOUR_IN_MS, LOG_REVIEW_GET_LOGS_ROUTE, LOG_REVIEW_ROUTE_PATH_PREFIX, LOG_REVIEW_STATUS_ROUTE, LOG_ROUTE_PATH, Log, LogAction, LogBuiltInMetadata, LogFunction, LogLevel, LogMainInfo, LogMetadataType, LogSource, LogSourceSpecificInfo, LogType, LogTypeSpecificInfo, MINUTE_IN_MS, ParamType, SELECT_ADMIN_CHECK_ROUTE, abbreviate, avg, capitalize, ceilToNumDecimals, cloneDeep, compareArraysByProp, everyAsync, extractProp, filterAsync, floorToNumDecimals, forEachAsync, forceNumIntoBounds, genCSV, genCommaList, getHumanReadableDate, getLocalTimeInfo, getMonthName, getOrdinal, getPartOfDay, getTimeInfoInET, getTimestampFromTimeInfoInET, getWordCount, idify, mapAsync, onlyKeepLetters, padDecimalZeros, padZerosLeft, parallelLimit, prefixWithAOrAn, roundToNumDecimals, shuffleArray, someAsync, startMinWait, stringsToHumanReadableList, sum, validateEmail, validatePhoneNumber, validateString, waitMs } from 'dce-commonkit';
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

type Props$n = {
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
declare const AppWrapper: React$1.FC<Props$n>;

/**
 * Loading spinner/indicator
 * @author Gabe Abrams
 */

declare const LoadingSpinner: () => React$1.JSX.Element;

/**
 * Displays an error
 * @author Gabe Abrams
 */

type Props$m = {
    error: any;
    title?: string;
    onClose?: () => void;
    variant?: Variant;
    icon?: IconProp;
};
declare const ErrorBox: React$1.FC<Props$m>;

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

type Props$l = {
    title: React$1.ReactNode;
    children: React$1.ReactNode;
    topRightChildren?: React$1.ReactNode;
    noBottomMargin?: boolean;
    noBottomPadding?: boolean;
    minTitleWidth?: string;
};
declare const TabBox: React$1.FC<Props$l>;

/**
 * A radio selection button
 * @author Gabe Abrams
 */

type Props$k = {
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
declare const RadioButton: React$1.FC<Props$k>;

/**
 * A checkbox button
 * @author Gabe Abrams
 */

type Props$j = {
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
declare const CheckboxButton: React$1.FC<Props$j>;

/**
 * Input group with a title and space for buttons
 * @author Gabe Abrams
 */

type Props$i = {
    label: React$1.ReactNode;
    minLabelWidth?: string;
    children: React$1.ReactNode;
    className?: string;
    wrapButtonsAndAddGaps?: boolean;
    isAdminFeature?: boolean;
    noMarginOnBottom?: boolean;
};
declare const ButtonInputGroup: React$1.FC<Props$i>;

/**
 * A very simple, lightweight date chooser
 * @author Gabe Abrams
 * @author Gardenia Liu
 */

type Props$h = {
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
    isDisabled?: boolean;
};
declare const SimpleDateChooser: React$1.FC<Props$h>;

/**
 * A very simple, lightweight time chooser
 * @author Gardenia Liu
 */

type Props$g = {
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
    isDisabled?: boolean;
};
declare const SimpleTimeChooser: React$1.FC<Props$g>;

/**
 * Drawer container
 * @author Gabe Abrams
 */

type Props$f = {
    grayBackground?: boolean;
    customBackgroundColor?: string;
    children: React$1.ReactNode;
};
declare const Drawer: React$1.FC<Props$f>;

/**
 * Success checkmark that pops into view
 * @author Gabe Abrams
 */

type Props$e = {
    sizeRem?: number;
    circleVariant?: string;
    checkVariant?: string;
};
declare const PopSuccessMark: React$1.FC<Props$e>;

/**
 * Failure x mark that pops into view
 * @author Gabe Abrams
 */

type Props$d = {
    sizeRem?: number;
    circleVariant?: string;
    xVariant?: string;
};
declare const PopFailureMark: React$1.FC<Props$d>;

/**
 * Failure pending that pops into view
 * @author Gabe Abrams
 */

type Props$c = {
    sizeRem?: number;
    circleVariant?: string;
    hourglassVariant?: string;
};
declare const PopPendingMark: React$1.FC<Props$c>;

/**
 * Copiable text box
 * @author Gabe Abrams
 */

type Props$b = {
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
declare const CopiableBox: React$1.FC<Props$b>;

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

type Props$a = {
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
declare const ItemPicker: React$1.FC<Props$a>;

/**
 * Log reviewer panel that allows users (must be approved admins) to
 *   review logs written by dce-reactkit
 * @author Gabe Abrams
 */

type Props$9 = {
    LogMetadata: LogMetadataType;
    onClose: () => void;
};
declare const LogReviewer: React$1.FC<Props$9>;

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

type Props$8 = {
    title: string;
    id: string;
    data: {
        id: string | number;
        [k: string]: any;
    }[];
    columns: IntelliTableColumn[];
    csvName?: string;
};
declare const IntelliTable: React$1.FC<Props$8>;

/**
 * Button for downloading a csv file
 * @author Gabe Abrams
 */

type Props$7 = {
    filename: string;
    csv: string;
    label?: string;
    id?: string;
    className?: string;
    ariaLabel?: string;
    style?: {
        [k: string]: any;
    };
    onClick?: () => void;
    children?: React$1.ReactNode;
};
declare const CSVDownloadButton: React$1.FC<Props$7>;

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

type Props$6 = {
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
declare const DBEntryManagerPanel: React$1.FC<Props$6>;

/**
 * Simple tooltip component
 * @author Gabe Abrams
 */

type Props$5 = {
    text: string;
    children: any;
};
declare const Tooltip: React$1.FC<Props$5>;

/**
 * A toggle switch that toggles on or off
 * @author Alessandra De Lucas
 * @author Gabe Abrams
 */

type Props$4 = {
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
declare const ToggleSwitch: React$1.FC<Props$4>;

/**
 * Container that automatically scrolls when new items are added,
 *   lets the user scroll up to see old items, but resumes
 *   autoscroll when the user scrolls back to the bottom.
 *   Note: takes up full height of parent, so parent should
 *   have a determined height for the scroll to work.
 * @author Gabe Abrams
 */

type Props$3 = {
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
declare const AutoscrollToBottomContainer: React$1.FC<Props$3>;

/**
 * A switch with multiple options for selection
 * @author Alessandra De Lucas
 * @author Gabe Abrams
 * @author Austen Money
 */

type Props$2 = {
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
declare const MultiSwitch: React$1.FC<Props$2>;

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

type Props$1 = {
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
declare const Dropdown: React$1.FC<Props$1>;

/**
 * Progress bar sizes
 * @author Allison Zhang
 */
declare enum ProgressBarSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large"
}

/**
 * Customizable Progress Bar component using Bootstrap styles
 * @author Allison Zhang
 */

type Props = (({
    percentProgress: number;
    numDecimalPlaces?: number;
} | {
    numComplete: number;
    total: number;
}) & {
    striped?: boolean;
    variant?: Variant;
    bgVariant?: Variant;
    showOutline?: boolean;
    size?: ProgressBarSize;
});
declare const ProgressBar: React$1.FC<Props>;

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
 * Create a function that forces a render of a component. Use this only when
 *   absolutely necessary
 * @author Gabe Abrams
 * @param useReducer the useReducer hook
 * @returns forceRender function
 */
declare const useForceRender: (useReducer: any) => () => void;

/**
 * Checks if the current user is a select admin
 * @author Gardenia Liu
 * @returns true if the user is a select admin, false otherwise
 */
declare const isSelectAdmin: () => Promise<boolean>;

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
    SimpleDateChooserInvalidNumMonths = "DRK36",
    ETTimestampInvalid = "DRK37"
}

/**
 * Date filter state
 * @author Yuen Ler Chow
 */
type DateFilterState = {
    startDate: {
        year: number;
        month: number;
        day: number;
    };
    endDate: {
        year: number;
        month: number;
        day: number;
    };
};

/**
 * Context filter state
 * @author Yuen Ler Chow
 */
type ContextFilterState = {
    [k: string]: (boolean | {
        [k: string]: boolean;
    });
};

/**
 * Tag filter state
 * @author Yuen Ler Chow
 */
type TagFilterState = {
    [k: string]: boolean;
};

/**
 * Action filter state (only relevant for action logs)
 * @author Yuen Ler Chow
 */
type ActionErrorFilterState = {
    type: LogType | undefined;
    errorMessage: string;
    errorCode: string;
    target: {
        [k: string]: boolean;
    };
    action: {
        [k: string]: boolean;
    };
};

/**
 * Advanced filter state
 * @author Yuen Ler Chow
 */
type AdvancedFilterState = {
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userId: string;
    includeLearners: boolean;
    includeTTMs: boolean;
    includeAdmins: boolean;
    courseId: string;
    courseName: string;
    isMobile: (true | false | undefined);
    source: LogSource | undefined;
    routePath: string;
    routeTemplate: string;
};

/**
 * A bundle of filter state objects for each type of filter
 * @author Gabe Abrams
 */
type LogReviewerFilterState = {
    dateFilterState: DateFilterState;
    contextFilterState: ContextFilterState;
    tagFilterState: TagFilterState;
    actionErrorFilterState: ActionErrorFilterState;
    advancedFilterState: AdvancedFilterState;
};

export { AppWrapper, AutoscrollToBottomContainer, ButtonInputGroup, CSVDownloadButton, CheckboxButton, CopiableBox, DBEntry, DBEntryField, DBEntryFieldType, DBEntryManagerPanel, Drawer, Dropdown, DropdownItemType, DynamicWord, ErrorBox, IntelliTable, IntelliTableColumn, ItemPicker, LoadingSpinner, LogReviewer, LogReviewerFilterState, Modal, ModalButtonType, ModalSize, ModalType, MultiSwitch, PickableItem, PopFailureMark, PopPendingMark, PopSuccessMark, ProgressBar, ProgressBarSize, RadioButton, ReactKitErrorCode, SimpleDateChooser, SimpleTimeChooser, TabBox, ToggleSwitch, Tooltip, Variant, addFatalErrorHandler, alert, canReviewLogs, combineClassNames, confirm, initClient, isMobileOrTablet, isSelectAdmin, leaveToURL, logClientEvent, makeLinksClickable, prompt, setClientEventMetadataPopulator, showFatalError, stubServerEndpoint, useForceRender, visitServerEndpoint };
