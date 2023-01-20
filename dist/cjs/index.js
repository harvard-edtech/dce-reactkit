'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var freeRegularSvgIcons = require('@fortawesome/free-regular-svg-icons');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

// Highest error code = DRK11
/**
 * List of error codes built into the react kit
 * @author Gabe Abrams
 */
var ReactKitErrorCode;
(function (ReactKitErrorCode) {
    ReactKitErrorCode["NoResponse"] = "DRK1";
    ReactKitErrorCode["NoCode"] = "DRK2";
    ReactKitErrorCode["SessionExpired"] = "DRK3";
    ReactKitErrorCode["MissingParameter"] = "DRK4";
    ReactKitErrorCode["InvalidParameter"] = "DRK5";
    ReactKitErrorCode["WrongCourse"] = "DRK6";
    ReactKitErrorCode["NoCACCLSendRequestFunction"] = "DRK7";
    ReactKitErrorCode["NoCACCLGetLaunchInfoFunction"] = "DRK8";
    ReactKitErrorCode["NotTTM"] = "DRK9";
    ReactKitErrorCode["NotAdmin"] = "DRK10";
    ReactKitErrorCode["NotAllowedToReviewLogs"] = "DRK11";
})(ReactKitErrorCode || (ReactKitErrorCode = {}));
var ReactKitErrorCode$1 = ReactKitErrorCode;

/**
 * Displays an error
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const ErrorBox = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    var _a;
    /* -------------- Props ------------- */
    const { error, title = 'An Error Occurred', onClose, } = props;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    // Determine error text
    const errorText = (typeof error === 'string'
        ? error.trim()
        : String(error.message || 'An unknown error occurred. Please contact support.'));
    // Error code box
    let errorCodeBox;
    if (error && error.code) {
        errorCodeBox = (React__default["default"].createElement("span", null,
            ' ',
            React__default["default"].createElement("span", { style: {
                    backgroundColor: 'white',
                    borderRadius: '0.3rem',
                    paddingLeft: '0.2rem',
                    paddingRight: '0.2rem',
                    color: '#DC4150',
                    fontVariant: 'small-caps',
                    fontSize: '80%',
                    whiteSpace: 'nowrap',
                } },
                "code:",
                ' ',
                String((_a = error.code) !== null && _a !== void 0 ? _a : ReactKitErrorCode$1.NoCode).toUpperCase())));
    }
    // Main UI
    return (React__default["default"].createElement("div", { className: "alert alert-danger text-center", style: {
            maxWidth: '40rem',
            margin: 'auto',
        } },
        React__default["default"].createElement("h4", { className: "mb-1" },
            React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faExclamationTriangle, className: "me-2" }),
            title),
        React__default["default"].createElement("div", null,
            errorText,
            errorCodeBox),
        onClose && (React__default["default"].createElement("div", { className: "mt-2" },
            React__default["default"].createElement("button", { type: "button", className: "btn btn-light", "aria-label": "dismiss error and close this activity or view", onClick: onClose }, "Close")))));
};

/**
 * Types of buttons in the modal
 * @author Gabe Abrams
 */
var ModalButtonType;
(function (ModalButtonType) {
    ModalButtonType["Okay"] = "okay";
    ModalButtonType["Cancel"] = "cancel";
    ModalButtonType["Yes"] = "yes";
    ModalButtonType["No"] = "no";
    ModalButtonType["Abandon"] = "abandon";
    ModalButtonType["GoBack"] = "goBack";
    ModalButtonType["Continue"] = "continue";
    ModalButtonType["ImSure"] = "imSure";
    ModalButtonType["Delete"] = "delete";
    ModalButtonType["Confirm"] = "confirm";
})(ModalButtonType || (ModalButtonType = {}));
var ModalButtonType$1 = ModalButtonType;

/**
 * Types of modals
 * @author Gabe Abrams
 */
var ModalType;
(function (ModalType) {
    ModalType["Okay"] = "okay";
    ModalType["OkayCancel"] = "okay-cancel";
    ModalType["YesNo"] = "yes-no";
    ModalType["YesNoCancel"] = "yes-no-cancel";
    ModalType["AbandonGoBack"] = "abandon-goBack";
    ModalType["ImSureCancel"] = "imSure-cancel";
    ModalType["DeleteCancel"] = "delete-cancel";
    ModalType["ConfirmCancel"] = "confirm-cancel";
    ModalType["NoButtons"] = "-";
})(ModalType || (ModalType = {}));
var ModalType$1 = ModalType;

/**
 * Wait for a certain number of ms
 * @author Gabe Abrams
 * @param ms number of ms to wait
 */
const waitMs = (ms = 0) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
});

/**
 * Bootstrap variants
 * @author Gabe Abrams
 */
var Variant;
(function (Variant) {
    Variant["Primary"] = "primary";
    Variant["Secondary"] = "secondary";
    Variant["Success"] = "success";
    Variant["Warning"] = "warning";
    Variant["Info"] = "info";
    Variant["Danger"] = "danger";
    Variant["Light"] = "light";
    Variant["Dark"] = "dark";
})(Variant || (Variant = {}));
var Variant$1 = Variant;

/**
 * Modal sizes
 * @author Gabe Abrams
 */
var ModalSize;
(function (ModalSize) {
    ModalSize["Small"] = "sm";
    ModalSize["Medium"] = "md";
    ModalSize["Large"] = "lg";
    ModalSize["ExtraLarge"] = "xl";
})(ModalSize || (ModalSize = {}));
var ModalSize$1 = ModalSize;

/**
 * A generic popup modal
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                Constants                               */
/*------------------------------------------------------------------------*/
// Constants
const MS_TO_ANIMATE = 200; // Animation duration
// Modal type to list of buttons
const modalTypeToModalButtonTypes = {
    [ModalType$1.Okay]: [
        ModalButtonType$1.Okay,
    ],
    [ModalType$1.OkayCancel]: [
        ModalButtonType$1.Okay,
        ModalButtonType$1.Cancel,
    ],
    [ModalType$1.YesNo]: [
        ModalButtonType$1.Yes,
        ModalButtonType$1.No,
    ],
    [ModalType$1.YesNoCancel]: [
        ModalButtonType$1.Yes,
        ModalButtonType$1.No,
        ModalButtonType$1.Cancel,
    ],
    [ModalType$1.AbandonGoBack]: [
        ModalButtonType$1.Abandon,
        ModalButtonType$1.GoBack,
    ],
    [ModalType$1.ImSureCancel]: [
        ModalButtonType$1.ImSure,
        ModalButtonType$1.Cancel,
    ],
    [ModalType$1.DeleteCancel]: [
        ModalButtonType$1.Delete,
        ModalButtonType$1.Cancel,
    ],
    [ModalType$1.ConfirmCancel]: [
        ModalButtonType$1.Confirm,
        ModalButtonType$1.Cancel,
    ],
};
// Button type styling and labels
const ModalButtonTypeToLabelAndVariant = {
    [ModalButtonType$1.Okay]: {
        label: 'Okay',
        variant: Variant$1.Dark,
    },
    [ModalButtonType$1.Cancel]: {
        label: 'Cancel',
        variant: Variant$1.Secondary,
    },
    [ModalButtonType$1.Yes]: {
        label: 'Yes',
        variant: Variant$1.Dark,
    },
    [ModalButtonType$1.No]: {
        label: 'No',
        variant: Variant$1.Secondary,
    },
    [ModalButtonType$1.Abandon]: {
        label: 'Abandon Changes',
        variant: Variant$1.Warning,
    },
    [ModalButtonType$1.GoBack]: {
        label: 'Go Back',
        variant: Variant$1.Secondary,
    },
    [ModalButtonType$1.Continue]: {
        label: 'Continue',
        variant: Variant$1.Dark,
    },
    [ModalButtonType$1.ImSure]: {
        label: 'I am sure',
        variant: Variant$1.Warning,
    },
    [ModalButtonType$1.Delete]: {
        label: 'Yes, Delete',
        variant: Variant$1.Danger,
    },
    [ModalButtonType$1.Confirm]: {
        label: 'Confirm',
        variant: Variant$1.Dark,
    },
};
/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/
const style$7 = `
  .Modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vw;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .Modal-fading-in {
    animation-name: Modal-fading-in;
    animation-duration: ${Math.floor(MS_TO_ANIMATE * 2)}ms;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    animation-timing-function: ease-out;
  }
  @keyframes Modal-fading-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .Modal-animating-in {
    animation-name: Modal-animating-in;
    animation-duration: ${MS_TO_ANIMATE}ms;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    animation-timing-function: ease-out;
  }
  @keyframes Modal-animating-in {
    0% {
      transform: scale(1.05) translate(0, -1.5rem);
      opacity: 0;
    }
    100% {
      transform: scale(1) translate(0, 0);
      opacity: 1;
    }
  }
  .Modal-animating-pop {
    animation-name: Modal-animating-pop;
    animation-duration: ${MS_TO_ANIMATE}ms;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    animation-timing-function: ease-in-out;
  }
  @keyframes Modal-animating-pop {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.9;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const Modal = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    var _a;
    /* -------------- Props ------------- */
    const { type = ModalType$1.NoButtons, size = ModalSize$1.Large, title, children, onClose, dontAllowBackdropExit, onTopOfOtherModals, } = props;
    /* -------------- State ------------- */
    // If true, the modal is shown
    const [visible, setVisible] = React.useState(false);
    // True if animation is in use
    const [animatingIn, setAnimatingIn] = React.useState(true);
    const [animatingPop, setAnimatingPop] = React.useState(false);
    // Keep track of whether modal is still mounted
    const mounted = React.useRef(false);
    /*------------------------------------------------------------------------*/
    /*                           Lifecycle Functions                          */
    /*------------------------------------------------------------------------*/
    /**
     * Mount
     * @author Gabe Abrams
     */
    React.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            // Set defaults
            setVisible(false);
            setAnimatingIn(true);
            setAnimatingPop(false);
            // Wait for animation
            yield waitMs(MS_TO_ANIMATE);
            // Update to state after animated in
            if (mounted.current) {
                setVisible(true);
                setAnimatingIn(false);
            }
        }))();
        return () => {
            mounted.current = false;
        };
    }, []);
    /*------------------------------------------------------------------------*/
    /*                           Component Functions                          */
    /*------------------------------------------------------------------------*/
    /**
     * Handles the closing of the modal
     * @author Gabe Abrams
     * @param ModalButtonType the button that was clicked when closing the
     *   modal
     */
    const handleClose = (ModalButtonType) => __awaiter(void 0, void 0, void 0, function* () {
        // Don't close if no handler
        if (!onClose) {
            return;
        }
        onClose(ModalButtonType);
    });
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Footer                 */
    /*----------------------------------------*/
    // Get list of buttons for this modal type
    const ModalButtonTypes = (_a = modalTypeToModalButtonTypes[type]) !== null && _a !== void 0 ? _a : [];
    // Create buttons
    const buttons = ModalButtonTypes.map((ModalButtonType, i) => {
        // Get default style
        let { label, variant, } = ModalButtonTypeToLabelAndVariant[ModalButtonType];
        // Override with customizations
        const newLabel = props[`${ModalButtonType}Label`];
        if (newLabel) {
            label = newLabel;
        }
        const newVariant = props[`${ModalButtonType}Variant`];
        if (newVariant) {
            variant = newVariant;
        }
        // Check if this button is last
        const last = (i === ModalButtonTypes.length - 1);
        // Create the button
        return (React__default["default"].createElement("button", { key: ModalButtonType, type: "button", className: `Modal-${ModalButtonType}-button btn btn-${variant} ${last ? '' : 'me-1'}`, onClick: () => {
                handleClose(ModalButtonType);
            } }, label));
    });
    // Put all buttons in a footer
    const footer = ((buttons && buttons.length)
        ? (React__default["default"].createElement("div", null, buttons))
        : undefined);
    // Choose an animation
    let animationClass = '';
    let backdropAnimationClass = '';
    if (animatingIn) {
        animationClass = 'Modal-animating-in';
        backdropAnimationClass = 'Modal-fading-in';
    }
    else if (animatingPop) {
        animationClass = 'Modal-animating-pop';
    }
    // Render the modal
    return (React__default["default"].createElement("div", { className: `modal show modal-dialog-scrollable modal-dialog-centered`, tabIndex: -1, style: {
            zIndex: (onTopOfOtherModals
                ? 5000000001
                : 5000000000),
            display: 'block',
            margin: 'auto',
            left: 0,
            right: 0,
        } },
        React__default["default"].createElement("style", null, style$7),
        React__default["default"].createElement("div", { className: `Modal-backdrop ${backdropAnimationClass}`, style: {
                zIndex: 5000000003,
            }, onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                // Skip if exit via backdrop not allowed
                if (dontAllowBackdropExit || !onClose) {
                    // Show pop animation
                    if (!animatingPop) {
                        setAnimatingPop(true);
                        // Wait then stop pop animation
                        yield waitMs(MS_TO_ANIMATE);
                        setAnimatingPop(false);
                    }
                    return;
                }
                // Handle close
                handleClose(ModalButtonType$1.Cancel);
            }) }),
        React__default["default"].createElement("div", { className: `modal-dialog modal-${size} ${animationClass}`, style: {
                zIndex: 5000000002,
            } },
            React__default["default"].createElement("div", { className: "modal-content" },
                React__default["default"].createElement("div", { className: "modal-header" },
                    React__default["default"].createElement("h5", { className: "modal-title", style: {
                            fontWeight: 'bold',
                        } }, title),
                    onClose && (React__default["default"].createElement("button", { type: "button", className: "btn-close", "aria-label": "Close", onClick: () => {
                            // Handle close
                            handleClose(ModalButtonType$1.Cancel);
                        } }))),
                children && (React__default["default"].createElement("div", { className: "modal-body" }, children)),
                footer && (React__default["default"].createElement("div", { className: "modal-footer pt-1 pb-1" }, footer))))));
};

/**
 * An error with a code
 * @author Gabe Abrams
 */
class ErrorWithCode extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'ErrorWithCode';
        this.code = code;
    }
}

/**
 * Path that all routes start with
 * @author Gabe Abrams
 */
const ROUTE_PATH_PREFIX = '/dce-reactkit';

/**
 * Path of the route for storing client-side logs
 * @author Gabe Abrams
 */
const LOG_ROUTE_PATH = `${ROUTE_PATH_PREFIX}/log`;

/**
 * Built-in metadata for logs
 * @author Gabe Abrams
 */
const LogBuiltInMetadata = {
    // Contexts
    Context: {
        Uncategorized: 'n/a',
        ServerRenderedErrorPage: '_server-rendered-error-page',
        ServerEndpointError: '_server-endpoint-error',
        ClientFatalError: '_client-fatal-error',
    },
    // Targets
    Target: {
        NoSpecificTarget: 'n/a',
    },
};

/**
 * Allowed log levels
 * @author Gabe Abrams
 */
var LogLevel;
(function (LogLevel) {
    LogLevel["Warn"] = "Warn";
    LogLevel["Info"] = "Info";
    LogLevel["Debug"] = "Debug";
})(LogLevel || (LogLevel = {}));
var LogLevel$1 = LogLevel;

// Keep track of whether or not session expiry has already been handled
let sessionAlreadyExpired = false;
/*------------------------------------------------------------------------*/
/*                               Stub Logic                               */
/*------------------------------------------------------------------------*/
// Stored stub responses
const stubResponses = {};
/**
 * Add a stub response
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param [opts.method=GET] http request method
 * @param opts.path pathname of the request
 * @param [opts.body] body of the response if successful
 * @param [opts.errorMessage] error message if not successful
 * @param [opts.errorCode] error code if not successful
 */
const _setStubResponse = (opts) => {
    var _a, _b, _c;
    const { path, body, } = opts;
    const method = ((_a = opts.method) !== null && _a !== void 0 ? _a : 'GET').toUpperCase();
    const errorMessage = ((_b = opts.errorMessage) !== null && _b !== void 0 ? _b : 'An unknown error has occurred.');
    const errorCode = ((_c = opts.errorCode) !== null && _c !== void 0 ? _c : ReactKitErrorCode$1.NoCode);
    // Store to stub responses
    if (!stubResponses[method]) {
        stubResponses[method] = {};
    }
    stubResponses[method][path] = ((opts.errorMessage || opts.errorCode)
        ? {
            success: false,
            errorMessage,
            errorCode,
        }
        : {
            success: true,
            body: body !== null && body !== void 0 ? body : undefined,
        });
};
/*------------------------------------------------------------------------*/
/*                                  Main                                  */
/*------------------------------------------------------------------------*/
/**
 * Visit an endpoint on the server [for client only]
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.path - the path of the server endpoint
 * @param [opts.method=GET] - the method of the endpoint
 * @param [opts.params] - query/body parameters to include
 * @returns response from server
 */
const visitServerEndpoint = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const method = ((_a = opts.method) !== null && _a !== void 0 ? _a : 'GET');
    // Handle stubs
    const stubResponse = (_b = stubResponses[method]) === null || _b === void 0 ? void 0 : _b[opts.path];
    if (stubResponse) {
        // Remove from list
        try {
            stubResponses[method][opts.path] = undefined;
        }
        catch (err) {
            // Ignore
        }
        // Success
        if (stubResponse.success) {
            return stubResponse.body;
        }
        // Error
        throw new ErrorWithCode(stubResponse.errorMessage, stubResponse.errorCode);
    }
    // Send the request
    const response = yield cacclSendRequest({
        path: opts.path,
        method: (_c = opts.method) !== null && _c !== void 0 ? _c : 'GET',
        params: opts.params,
    });
    // Check for failure
    if (!response || !response.body) {
        throw new ErrorWithCode('We didn\'t get a response from the server. Please check your internet connection.', ReactKitErrorCode$1.NoResponse);
    }
    if (!response.body.success) {
        // Session expired
        if (response.body.code === ReactKitErrorCode$1.SessionExpired) {
            // Skip notice if session was already expired
            if (sessionAlreadyExpired) {
                // Never return (browser is already reloading)
                yield new Promise(() => {
                    // Promise that never returns
                });
            }
            sessionAlreadyExpired = true;
            // Show session expiration message
            {
                // Fallback to alert
                // eslint-disable-next-line no-alert
                alert('Your session has expired. Please start over.');
            }
            // Never return (don't continue execution)
            yield new Promise(() => {
                // Promise that never returns
            });
        }
        // Other errors
        throw new ErrorWithCode((response.body.message
            || 'An unknown error occurred. Please contact an admin.'), (response.body.code
            || ReactKitErrorCode$1.NoCode));
    }
    // Success! Extract the body
    const { body } = response.body;
    // Return
    return body;
});

/**
 * Log a user action on the client (cannot be used on the server)
 * @author Gabe Abrams
 */
const logClientEvent = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    return visitServerEndpoint({
        path: LOG_ROUTE_PATH,
        method: 'POST',
        params: {
            context: (typeof opts.context === 'string'
                ? opts.context
                : ((_b = ((_a = opts.context) !== null && _a !== void 0 ? _a : {})._) !== null && _b !== void 0 ? _b : LogBuiltInMetadata.Context.Uncategorized)),
            subcontext: ((_c = opts.subcontext) !== null && _c !== void 0 ? _c : LogBuiltInMetadata.Context.Uncategorized),
            level: ((_d = opts.level) !== null && _d !== void 0 ? _d : LogLevel$1.Info),
            tags: JSON.stringify((_e = opts.tags) !== null && _e !== void 0 ? _e : []),
            metadata: JSON.stringify((_f = opts.metadata) !== null && _f !== void 0 ? _f : {}),
            errorMessage: (opts.error
                ? opts.error.message
                : undefined),
            errorCode: (opts.error
                ? opts.error.code
                : undefined),
            errorStack: (opts.error
                ? opts.error.stack
                : undefined),
            target: (opts.action
                ? ((_g = opts.target) !== null && _g !== void 0 ? _g : LogBuiltInMetadata.Target.NoSpecificTarget)
                : undefined),
            action: (opts.action
                ? opts.action
                : undefined),
        },
    });
});

/**
 * A wrapper for the entire React app that adds global functionality like
 *   handling for fatal error messages, adds bootstrap support
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                             Static Helpers                             */
/*------------------------------------------------------------------------*/
/*----------------------------------------*/
/*              Send Request              */
/*----------------------------------------*/
// Store copy of caccl send request
let _cacclSendRequest;
/**
 * Send a request using caccl's send request feature
 * @author Gabe Abrams
 * @param opts send request options
 * @returns send request response
 */
const cacclSendRequest = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    // Make sure send request has been passed in
    if (!_cacclSendRequest) {
        throw new ErrorWithCode(`\nThe request could not be sent because the AppWrapper component does not have a copy of sendRequest from CACCL.\nIf you are currently writing tests for your app, this means you did not properly stub the server response.\nMethod: ${opts.method}\nPath: ${opts.path}\n\n`, ReactKitErrorCode$1.NoCACCLSendRequestFunction);
    }
    return _cacclSendRequest(opts);
});
/*----------------------------------------*/
/*                  Alert                 */
/*----------------------------------------*/
// Stored copies of setters
let setAlertInfo;
let onAlertClosed;
/**
 * Show an alert modal with an "Okay" button
 * @author Gabe Abrams
 * @param title the title text to display at the top of the alert
 * @param text the text to display in the alert
 */
const alert$1 = (title, text) => __awaiter(void 0, void 0, void 0, function* () {
    // Fallback if alert not available
    if (!setAlertInfo) {
        window.alert(`${title}\n\n${text}`);
        return undefined;
    }
    // Return promise that resolves when alert is closed
    return new Promise((resolve) => {
        // Setup handler
        onAlertClosed = () => {
            resolve(undefined);
        };
        // Show the alert
        setAlertInfo({
            title,
            text,
        });
    });
});
/*----------------------------------------*/
/*                 Confirm                */
/*----------------------------------------*/
// Stored copies of setters
let setConfirmInfo;
let onConfirmClosed;
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
const confirm = (title, text, opts) => __awaiter(void 0, void 0, void 0, function* () {
    // Fallback if confirm is not available
    if (!setConfirmInfo) {
        return window.confirm(`${title}\n\n${text}`);
    }
    // Return promise that resolves with result of confirmation
    return new Promise((resolve) => {
        // Setup handler
        onConfirmClosed = (confirmed) => {
            resolve(confirmed);
        };
        // Show the confirm
        setConfirmInfo({
            title,
            text,
            opts: (opts !== null && opts !== void 0 ? opts : {}),
        });
    });
});
/*----------------------------------------*/
/*               Fatal Error              */
/*----------------------------------------*/
// Stored copies of setters
let setFatalErrorMessage;
let setFatalErrorCode;
let setFatalErrorTitle;
/**
 * Show a fatal error message
 * @author Gabe Abrams
 * @param error the error to show
 * @param [errorTitle] title of the error box
 */
const showFatalError = (error, errorTitle = 'An Error Occurred') => {
    var _a, _b;
    // Determine message and code
    const message = (typeof error === 'string'
        ? error.trim()
        : String((_a = error.message) !== null && _a !== void 0 ? _a : 'An unknown error occurred.'));
    const code = (typeof error === 'string'
        ? ReactKitErrorCode$1.NoCode
        : String((_b = error.code) !== null && _b !== void 0 ? _b : ReactKitErrorCode$1.NoCode));
    // Add log
    logClientEvent({
        context: LogBuiltInMetadata.Context.ClientFatalError,
        error: {
            message,
            code,
            stack: (error !== null && error !== void 0 ? error : {}).stack,
        },
        metadata: {
            errorTitle,
        },
    });
    // Handle case where app hasn't loaded
    if (!setFatalErrorMessage || !setFatalErrorCode) {
        alert$1(errorTitle, `${message} (code: ${code}). Please contact support.`);
        return undefined;
    }
    // Use setters
    setFatalErrorMessage(message);
    setFatalErrorCode(code);
    setFatalErrorTitle(errorTitle);
    return undefined;
};
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const AppWrapper = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    const { children, sendRequest, dark, sessionExpiredMessage = 'Your session has expired. Please go back to Canvas and start over.', } = props;
    // Store copy of send request
    _cacclSendRequest = sendRequest;
    /* -------------- State ------------- */
    // Fatal error
    const [fatalErrorMessage, setFatalErrorMessageInner,] = React.useState();
    setFatalErrorMessage = setFatalErrorMessageInner;
    const [fatalErrorCode, setFatalErrorCodeInner,] = React.useState();
    setFatalErrorCode = setFatalErrorCodeInner;
    const [fatalErrorTitle, setFatalErrorTitleInner,] = React.useState();
    setFatalErrorTitle = setFatalErrorTitleInner;
    // Alert
    const [alertInfo, setAlertInfoInner,] = React.useState(undefined);
    setAlertInfo = setAlertInfoInner;
    // Confirm
    const [confirmInfo, setConfirmInfoInner,] = React.useState(undefined);
    setConfirmInfo = setConfirmInfoInner;
    // Session expired
    const [sessionHasExpired, setSessionHasExpiredInner,] = React.useState(false);
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                  Modal                 */
    /*----------------------------------------*/
    // Modal that may be defined
    let modal;
    /* -------------- Alert ------------- */
    if (alertInfo) {
        modal = (React__default["default"].createElement(Modal, { key: `alert-${alertInfo.title}-${alertInfo.text}`, title: alertInfo.title, type: ModalType$1.Okay, onClose: () => {
                // Alert closed
                setAlertInfo(undefined);
                if (onAlertClosed) {
                    onAlertClosed();
                }
            }, onTopOfOtherModals: true }, alertInfo.text));
    }
    /* ------------- Confirm ------------ */
    if (confirmInfo) {
        modal = (React__default["default"].createElement(Modal, { key: `confirm-${confirmInfo.title}-${confirmInfo.text}`, title: confirmInfo.title, type: ModalType$1.OkayCancel, okayLabel: confirmInfo.opts.confirmButtonText, okayVariant: confirmInfo.opts.confirmButtonVariant, cancelLabel: confirmInfo.opts.cancelButtonText, cancelVariant: confirmInfo.opts.cancelButtonVariant, onClose: (buttonType) => {
                setConfirmInfo(undefined);
                if (onConfirmClosed) {
                    onConfirmClosed(buttonType === ModalButtonType$1.Okay);
                }
            }, dontAllowBackdropExit: true }, confirmInfo.text));
    }
    /*----------------------------------------*/
    /*                  Views                 */
    /*----------------------------------------*/
    // Body that will be filled with the current view
    let body;
    /* ----------- Fatal Error ---------- */
    if (fatalErrorMessage || fatalErrorCode || sessionHasExpired) {
        // Re-encapsulate in an error
        const error = (sessionHasExpired
            ? new ErrorWithCode(sessionExpiredMessage, ReactKitErrorCode$1.SessionExpired)
            : new ErrorWithCode((fatalErrorMessage !== null && fatalErrorMessage !== void 0 ? fatalErrorMessage : 'An unknown error has occurred. Please contact support.'), (fatalErrorCode !== null && fatalErrorCode !== void 0 ? fatalErrorCode : ReactKitErrorCode$1.NoCode)));
        // Build error screen
        body = (React__default["default"].createElement("div", { style: {
                display: 'block',
                width: '100vw',
                minHeight: '100vh',
                paddingTop: '2rem',
                backgroundColor: (dark
                    ? '#222'
                    : '#fff'),
            } },
            React__default["default"].createElement(ErrorBox, { title: (sessionHasExpired
                    ? 'Session Expired'
                    : fatalErrorTitle), error: error })));
    }
    /* --------------- App -------------- */
    if (!body) {
        body = (React__default["default"].createElement(React__default["default"].Fragment, null, children));
    }
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        modal,
        body));
};

/**
 * Loading spinner/indicator
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/
const style$6 = `
/* Container fades in */
.LoadingSpinner-container {
  animation-name: LoadingSpinner-container-fade-in;
  animation-duration: 0.3s;
  animation-delay: 0.4s;
  animation-fill-mode: both;
  animation-timing-function: ease-out;
}
@keyframes LoadingSpinner-container-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Blips */
.LoadingSpinner-blip-1,
.LoadingSpinner-blip-2,
.LoadingSpinner-blip-3,
.LoadingSpinner-blip-4 {
  font-size: 1.8rem;
  opacity: 0.6;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

/* First Blip */
.LoadingSpinner-blip-1 {
  animation: LoadingSpinner-pop-animation 2s infinite;
}

/* Second Blip */
.LoadingSpinner-blip-2 {
  animation: LoadingSpinner-pop-animation 2s infinite;
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

/* Third Blip */
.LoadingSpinner-blip-3 {
  animation: LoadingSpinner-pop-animation 2s infinite;
  animation-delay: 0.2s;
}

/* Fourth Blip */
.LoadingSpinner-blip-4 {
  animation: LoadingSpinner-pop-animation 2s infinite;
  animation-delay: 0.3s;
}

/* Pop Animation for Each Blip */
@keyframes LoadingSpinner-pop-animation {
  0%  {
    transform: scale(1.0);
  }
  10% {
    transform: scale(1.5);
  }
  30% {
    transform: scale(1.0);
  }
  100% {
    transform: scale(1.0);
  }
}
`;
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const LoadingSpinner = () => {
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    // Add all four blips to a container
    return (React__default["default"].createElement("div", { className: "text-center LoadingSpinner LoadingSpinner-container" },
        React__default["default"].createElement("style", null, style$6),
        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCircle, className: "LoadingSpinner-blip-1 me-1" }),
        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCircle, className: "LoadingSpinner-blip-2 me-1" }),
        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCircle, className: "LoadingSpinner-blip-3 me-1" }),
        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCircle, className: "LoadingSpinner-blip-4" })));
};

/**
 * A box with a tab on the top that holds buttons and other content
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/
const style$5 = `
  /* Tab Box */
  .TabBox-box {
    /* Light Border */
    border: 0.15rem solid #dedede;
    
    /* Rounded Corners (except top-left) */
    border-bottom-right-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;

    /* Very Light Gray Border */
    background: #fdfdfd;

    /* Align Contents on Left */
    text-align: left;

    /* Add Text Padding */
    padding-left: 0.3rem;
    padding-right: 0.3rem;
  }

  /* Container for Title */
  .TabBox-title-container {
    /* Place on Left */
    position: relative;
    left: 0;
    text-align: left;
  }

  /* Tab-style Title */
  .TabBox-title {
    /* Place so it Barely Overlaps the Box Border */
    display: inline-block;
    position: relative;
    top: 0.15rem; /* Gives Illusion that Border Doesn't Exist Below Tab */

    /* Title-sized Font */
    font-size: 1.5rem;

    /* Add Border on Top and Sides */
    border-top: 0.15rem solid #dedede;
    border-left: 0.15rem solid #dedede;
    border-right: 0.15rem solid #dedede;

    /* Round the Top Corners */
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;

    /* Add Text Padding */
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    /* Match Background Color of Box */
    background: #fdfdfd;
  }

  /* Make the TabBox's Children Appear Above Title if Overlap Occurs */
  .TabBox-children {
    position: relative;
    z-index: 1;
  }
`;
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const TabBox = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    const { title, children, noBottomPadding, noBottomMargin, } = props;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    // Full UI
    return (React__default["default"].createElement("div", { className: `TabBox-container ${noBottomMargin ? '' : 'mb-2'}` },
        React__default["default"].createElement("style", null, style$5),
        React__default["default"].createElement("div", { className: "TabBox-title-container" },
            React__default["default"].createElement("div", { className: "TabBox-title" }, title)),
        React__default["default"].createElement("div", { className: `TabBox-box ps-2 pt-2 pe-2 ${noBottomPadding ? '' : 'pb-2'}` },
            React__default["default"].createElement("div", { className: "TabBox-children" }, children))));
};

/**
 * A radio selection button
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const RadioButton = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    const { text, onSelected, ariaLabel, title, selected, id, noMarginOnRight, selectedVariant = Variant$1.Secondary, unselectedVariant = Variant$1.Light, small, } = props;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                Main UI                 */
    /*----------------------------------------*/
    return (React__default["default"].createElement("button", { type: "button", id: id, title: title, className: `btn btn-${selected ? selectedVariant : unselectedVariant}${selected ? ' selected' : ''}${small ? ' btn-sm' : ''} m-0${noMarginOnRight ? '' : ' me-1'}`, "aria-label": `${ariaLabel}${selected ? ': currently selected' : ''}`, onClick: () => {
            if (!selected) {
                onSelected();
            }
        } },
        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: selected ? freeSolidSvgIcons.faDotCircle : freeRegularSvgIcons.faCircle, className: "me-1" }),
        text));
};

/**
 * A checkbox button
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const CheckboxButton = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    const { text, onChanged, ariaLabel, title, checked, id, className, noMarginOnRight, checkedVariant = Variant$1.Secondary, uncheckedVariant = Variant$1.Light, small, dashed, } = props;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                Main UI                 */
    /*----------------------------------------*/
    // Determine the icon
    let icon;
    if (checked) {
        icon = freeSolidSvgIcons.faCheckSquare;
    }
    else {
        icon = (dashed
            ? freeRegularSvgIcons.faSquareMinus
            : freeRegularSvgIcons.faSquare);
    }
    // Create the button
    return (React__default["default"].createElement("button", { type: "button", id: id, title: title, className: `CheckboxButton-status-${checked ? 'checked' : 'unchecked'} ${dashed ? 'CheckboxButton-dashed ' : ''}btn btn-${checked ? checkedVariant : uncheckedVariant}${checked ? ' selected' : ''}${small ? ' btn-sm' : ''} m-0${noMarginOnRight ? '' : ' me-1'} ${className !== null && className !== void 0 ? className : ''}`, "aria-label": `${ariaLabel}${checked ? ': currently checked' : ''}`, onClick: () => {
            onChanged(!checked);
        } },
        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: icon, className: "me-1" }),
        text));
};

/**
 * Input group with a title and space for buttons
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const ButtonInputGroup = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { label, minLabelWidth, children, className, } = props;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: `input-group ${className !== null && className !== void 0 ? className : ''}` },
        React__default["default"].createElement("div", { className: "input-group-prepend d-flex w-100" },
            React__default["default"].createElement("span", { className: "input-group-text", style: {
                    minWidth: (minLabelWidth !== null && minLabelWidth !== void 0 ? minLabelWidth : undefined),
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                } }, label),
            React__default["default"].createElement("span", { className: "input-group-text flex-grow-1 rounded-right", style: {
                    backgroundColor: 'white',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderLeftWidth: 0,
                } }, children))));
};

const monthNames = [
    { short: 'Jan', full: 'January' },
    { short: 'Feb', full: 'February' },
    { short: 'Mar', full: 'March' },
    { short: 'Apr', full: 'April' },
    { short: 'May', full: 'May' },
    { short: 'Jun', full: 'June' },
    { short: 'Jul', full: 'July' },
    { short: 'Aug', full: 'August' },
    { short: 'Sep', full: 'September' },
    { short: 'Oct', full: 'October' },
    { short: 'Nov', full: 'November' },
    { short: 'Dec', full: 'December' },
];
/**
 * Get the name of a month given the month number (1 = January, etc.)
 *   If an invalid number is provided, we will treat it like January
 * @author Gabe Abrams
 * @param month the number of the month
 * @returns object containing multiple month name formats:
 *   { short, full } where short will look like "Jan" and full will look like
 *   "January"
 */
const getMonthName = (month) => {
    var _a;
    return ((_a = monthNames[month - 1]) !== null && _a !== void 0 ? _a : monthNames[0]);
};

const ORDINALS = ['th', 'st', 'nd', 'rd'];
/**
 * Get a number's ordinal
 * @author Gabe Abrams
 * @param num the number being analyzed
 * @returns ordinal
 */
const getOrdinal = (num) => {
    var _a, _b;
    return ((_b = (_a = ORDINALS[(num - 20) % 10]) !== null && _a !== void 0 ? _a : ORDINALS[num]) !== null && _b !== void 0 ? _b : ORDINALS[0]);
};

/**
 * Get current time info in US Boston Eastern Time, independent of machine
 *   timezone
 * @author Gabe Abrams
 * @param [date=now] the date to get info on or a ms since epoch timestamp
 * @returns object with timestamp (ms since epoch) and numbers
 *   corresponding to ET time values for year, month, day, hour, minute
 */
const getTimeInfoInET = (dateOrTimestamp) => {
    // Create a time string
    let d;
    if (!dateOrTimestamp) {
        // Use now
        d = new Date();
    }
    else if (typeof dateOrTimestamp === 'number') {
        // Convert to date
        d = new Date(dateOrTimestamp);
    }
    else {
        // Already a date
        d = dateOrTimestamp;
    }
    const str = d.toLocaleString('en-US', // Using US encoding (it's the only one installed on containers)
    { timeZone: 'America/New_York' } // Force EST timezone
    );
    // Parse the string for the date/time info
    const [dateStr, timeStr] = str.split(', '); // Format: MM/DD/YYYY, HH:MM:SS AM
    const [monthStr, dayStr, yearStr] = dateStr.split('/'); // Format: MM/DD/YYYY
    const [hourStr, minStr, ending] = timeStr.split(':'); // Format: HH:MM:SS AM
    // Create all time numbers
    const timestamp = d.getTime();
    const year = Number.parseInt(yearStr, 10);
    const month = Number.parseInt(monthStr, 10);
    const day = Number.parseInt(dayStr, 10);
    const minute = Number.parseInt(minStr, 10);
    let hour = Number.parseInt(hourStr, 10);
    // Convert from am/pm to 24hr
    const isAM = ending.toLowerCase().includes('am');
    const isPM = !isAM;
    if (isPM && hour !== 12) {
        hour += 12;
    }
    else if (isAM && hour === 12) {
        hour = 0;
    }
    // Return
    return {
        timestamp,
        year,
        month,
        day,
        hour,
        minute,
    };
};

/**
 * Force a number to stay within specific bounds
 * @author Gabe Abrams
 * @param num the number to move into the bounds
 * @param min the minimum number in the bound
 * @param max the maximum number in the bound
 * @returns bounded number
 */
const forceNumIntoBounds = (num, min, max) => {
    return Math.max(min, Math.min(max, num));
};

/**
 * A very simple, lightweight date chooser
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const SimpleDateChooser = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    var _a;
    /* -------------- Props ------------- */
    const { ariaLabel, name, month, day, year, onChange, chooseFromPast, } = props;
    let numMonthsToShow = forceNumIntoBounds(((_a = props.numMonthsToShow) !== null && _a !== void 0 ? _a : 6), 1, 12);
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                Main UI                 */
    /*----------------------------------------*/
    // Determine the set of choices allowed
    const today = getTimeInfoInET();
    const choices = [];
    let startYear = today.year;
    let startMonth = today.month;
    if (chooseFromPast) {
        startMonth -= Math.max(0, numMonthsToShow - 1);
        if (startMonth <= 0) {
            startMonth += 12;
            startYear -= 1;
        }
    }
    for (let i = 0; i < numMonthsToShow; i++) {
        // Get month and year info
        const unmoddedMonth = (startMonth + i);
        const month = (unmoddedMonth > 12
            ? unmoddedMonth - 12
            : unmoddedMonth);
        const monthName = getMonthName(month).full;
        const year = (unmoddedMonth > 12
            ? startYear + 1
            : startYear);
        // Figure out which days are allowed
        const days = [];
        const numDaysInMonth = (new Date(year, month, 0)).getDate();
        const firstDay = (month === today.month
            ? today.day // Current month: start at current date
            : 1 // Future month: start at beginning of month
        );
        for (let day = firstDay; day <= numDaysInMonth; day++) {
            days.push(day);
        }
        choices.push({
            choiceName: `${monthName} ${year}`,
            month,
            year,
            days,
        });
    }
    // Create choice options
    const monthOptions = [];
    const dayOptions = [];
    choices.forEach((choice) => {
        // Create month option
        monthOptions.push(React__default["default"].createElement("option", { key: choice.month, value: choice.month, "aria-label": `choose ${choice.choiceName}`, onSelect: () => {
                onChange(choice.month, choice.days[0], choice.year);
            } }, choice.choiceName));
        if (month === choice.month) {
            // This is the currently selected month
            // Create day options
            choice.days.forEach((dayChoice) => {
                const ordinal = getOrdinal(dayChoice);
                dayOptions.push(React__default["default"].createElement("option", { key: dayChoice, value: dayChoice, "aria-label": `choose date ${dayChoice}` },
                    dayChoice,
                    ordinal));
            });
        }
    });
    return (React__default["default"].createElement("div", { className: "SimpleDateChooser d-inline-block", "aria-label": `date chooser with selected date: ${month} ${day}, ${year}` },
        React__default["default"].createElement("select", { "aria-label": `month for ${ariaLabel}`, className: "custom-select d-inline-block mr-1", style: { width: 'auto' }, id: `SimpleDateChooser-${name}-month`, value: month, onChange: (e) => {
                const choice = choices[e.target.selectedIndex];
                // Change day, month, and year
                onChange(choice.month, choice.days[0], choice.year);
            } }, monthOptions),
        React__default["default"].createElement("select", { "aria-label": `day for ${ariaLabel}`, className: "custom-select d-inline-block", style: { width: 'auto' }, id: `SimpleDateChooser-${name}-day`, value: day, onChange: (e) => {
                // Only change the day
                onChange(month, Number.parseInt(e.target.value, 10), year);
            } }, dayOptions)));
};

/**
 * Drawer container
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/
const style$4 = `
  .Drawer-container {
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 0;
    margin-bottom: 1rem;
    padding: 0.75rem;
    border-left: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    border-bottom-left-radius: .25rem;
    border-bottom-right-radius: .25rem;
    box-shadow: inset 0 0 0.5rem 0 rgba(0, 0, 0, 0.05);
  }
`;
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const Drawer = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { children, } = props;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: "Drawer-container" },
        React__default["default"].createElement("style", null, style$4),
        children));
};

/**
 * Success checkmark that pops into view
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/
const style$3 = `
  .PopSuccessMark-outer-container {
    position: relative;
    display: inline-block;
    border-radius: 50%;

    animation-name: PopSuccessMark-outer-container;
    animation-duration: 0.8s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  @keyframes PopSuccessMark-outer-container {
    0% {
      opacity: 0;
      transform: scale(1.5);
      filter: saturate(0);
    }
    80.7% {
      opacity: 1;
      transform: scale(1);
      filter: saturate(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
      filter: saturate(1);
    }
  }

  .PopSuccessMark-check-stroke-1 {
    position: absolute;
    left: 20%;
    top: 36%;

    display: inline-block;
    height: 16%;
    width: 35%;

    transform-origin: left;

    animation-name: PopSuccessMark-check-stroke-1;
    animation-duration: 0.3s;
    animation-delay: 0.3s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
  }
  @keyframes PopSuccessMark-check-stroke-1 {
    0% {
      transform: rotate(45deg) scaleX(0);
    }
    100% {
      transform: rotate(45deg) scaleX(1);
    }
  }


  .PopSuccessMark-check-stroke-2 {
    position: absolute;
    left: 35%;
    top: 63%;

    display: inline-block;
    height: 16%;
    width: 60%;

    transform-origin: left;

    animation-name: PopSuccessMark-check-stroke-2;
    animation-duration: 0.3s;
    animation-delay: 0.6s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  @keyframes PopSuccessMark-check-stroke-2 {
    0% {
      transform: rotate(-40deg) scaleX(0);
    }
    100% {
      transform: rotate(-40deg) scaleX(1);
    }
  }
`;
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const PopSuccessMark = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { sizeRem = 3, circleVariant = 'success', checkVariant = 'white', } = props;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: `PopSuccessMark-outer-container bg-${circleVariant}`, style: {
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
        }, "aria-label": "checkmark indicating success" },
        React__default["default"].createElement("style", null, style$3),
        React__default["default"].createElement("div", { className: `PopSuccessMark-check-stroke-1 bg-${checkVariant}`, style: {
                borderRadius: `${sizeRem / 5}rem`,
            } }),
        React__default["default"].createElement("div", { className: `PopSuccessMark-check-stroke-2 bg-${checkVariant}`, style: {
                borderRadius: `${sizeRem / 5}rem`,
            } })));
};

/**
 * Failure x mark that pops into view
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/
const style$2 = `
  .PopFailureMark-outer-container {
    position: relative;
    display: inline-block;
    border-radius: 50%;

    animation-name: PopFailureMark-outer-container;
    animation-duration: 0.8s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  @keyframes PopFailureMark-outer-container {
    0% {
      opacity: 0;
      transform: scale(1.5);
      filter: saturate(0);
    }
    80.7% {
      opacity: 1;
      transform: scale(1);
      filter: saturate(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
      filter: saturate(1);
    }
  }

  .PopFailureMark-x-stroke-1 {
    position: absolute;
    left: 25%;
    top: 19%;

    display: inline-block;
    height: 16%;
    width: 70%;

    transform-origin: left;

    animation-name: PopFailureMark-x-stroke-1;
    animation-duration: 0.3s;
    animation-delay: 0.3s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
  }
  @keyframes PopFailureMark-x-stroke-1 {
    0% {
      transform: rotate(45deg) scaleX(0);
    }
    100% {
      transform: rotate(45deg) scaleX(1);
    }
  }

  .PopFailureMark-x-stroke-2 {
    position: absolute;
    left: 75%;
    top: 19%;

    display: inline-block;
    height: 16%;
    width: 70%;

    transform-origin: left;

    animation-name: PopFailureMark-x-stroke-2;
    animation-duration: 0.3s;
    animation-delay: 0.6s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  @keyframes PopFailureMark-x-stroke-2 {
    0% {
      transform: rotate(135deg) scaleX(0);
    }
    100% {
      transform: rotate(135deg) scaleX(1);
    }
  }
`;
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const PopFailureMark = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { sizeRem = 3, circleVariant = 'danger', xVariant = 'white', } = props;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: `PopFailureMark-outer-container bg-${circleVariant}`, style: {
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
        }, "aria-label": "mark indicating failure" },
        React__default["default"].createElement("style", null, style$2),
        React__default["default"].createElement("div", { className: `PopFailureMark-x-stroke-1 bg-${xVariant}`, style: {
                borderRadius: `${sizeRem / 5}rem`,
            } }),
        React__default["default"].createElement("div", { className: `PopFailureMark-x-stroke-2 bg-${xVariant}`, style: {
                borderRadius: `${sizeRem / 5}rem`,
            } })));
};

/**
 * Failure pending that pops into view
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/
const style$1 = `
  .PopPendingMark-outer-container {
    position: relative;
    display: inline-block;
    border-radius: 50%;

    animation-name: PopPendingMark-outer-container;
    animation-duration: 0.8s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  @keyframes PopPendingMark-outer-container {
    0% {
      opacity: 0;
      transform: scale(1.5);
      filter: saturate(0);
    }
    80.7% {
      opacity: 1;
      transform: scale(1);
      filter: saturate(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
      filter: saturate(1);
    }
  }

  .PopPendingMark-hourglass {
    position: absolute;
    left: 28%;
    top: 21%;

    animation-name: PopPendingMark-pending;
    animation-duration: 0.3s;
    animation-delay: 0.3s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
  }
  @keyframes PopPendingMark-pending {
    0% {
      transform: scale(0.7) rotate(30deg);
      opacity: 0;
    }
    100% {
      transform: scale(1) rotate(0);
      opacity: 1;
    }
  }
`;
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const PopPendingMark = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { sizeRem = 3, circleVariant = 'warning', hourglassVariant = 'white', } = props;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: `PopPendingMark-outer-container bg-${circleVariant}`, style: {
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
        }, "aria-label": "mark indicating that the item is pending" },
        React__default["default"].createElement("style", null, style$1),
        React__default["default"].createElement("div", null,
            React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faHourglass, className: `PopPendingMark-hourglass text-${hourglassVariant}`, style: {
                    fontSize: `${sizeRem * 0.6}rem`,
                } }))));
};

/**
 * Copiable text box
 * @author Gabe Abrams
 */
/* ------------- Actions ------------ */
// Types of actions
var ActionType$3;
(function (ActionType) {
    // Indicate that the text was recently copied
    ActionType["IndicateRecentlyCopied"] = "indicate-recently-copied";
    // Clear the status
    ActionType["ClearRecentlyCopiedStatus"] = "clear-recently-copied-status";
})(ActionType$3 || (ActionType$3 = {}));
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer$3 = (state, action) => {
    switch (action.type) {
        case ActionType$3.IndicateRecentlyCopied: {
            return {
                recentlyCopied: true,
            };
        }
        case ActionType$3.ClearRecentlyCopiedStatus: {
            return {
                recentlyCopied: false,
            };
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const CopiableBox = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { text, maxTextWidthRem, label, labelIcon, minLabelWidthRem, multiline, numVisibleLines = 10, onClick, textAreaId, copyButtonId, } = props;
    /* -------------- State ------------- */
    // Initial state
    const initialState = {
        recentlyCopied: false,
    };
    // Initialize state
    const [state, dispatch] = React.useReducer(reducer$3, initialState);
    // Destructure common state
    const { recentlyCopied, } = state;
    /*------------------------------------------------------------------------*/
    /*                           Component Functions                          */
    /*------------------------------------------------------------------------*/
    /**
     * Perform a copy
     * @author Gabe Abrams
     */
    const performCopy = () => __awaiter(void 0, void 0, void 0, function* () {
        // Write to clipboard
        try {
            yield navigator.clipboard.writeText(text);
        }
        catch (err) {
            return alert$1('Unable to copy', 'Oops! We couldn\'t copy that to the clipboard. Please copy the text manually.');
        }
        // Show copied notice
        dispatch({
            type: ActionType$3.IndicateRecentlyCopied,
        });
        // Wait a moment
        yield waitMs(4000);
        // Hide copied notice
        dispatch({
            type: ActionType$3.ClearRecentlyCopiedStatus,
        });
    });
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: "input-group mb-2" },
        (label || labelIcon) && (React__default["default"].createElement("span", { className: "input-group-text", style: {
                minWidth: (minLabelWidthRem
                    ? `${minLabelWidthRem}rem`
                    : undefined),
            } },
            labelIcon && (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: labelIcon, className: label ? 'me-1' : undefined })),
            label)),
        multiline
            ? (React__default["default"].createElement("textarea", { id: textAreaId, className: "CopiableBox-text CopiableBox-text-multiline form-control bg-white text-dark", value: text, "aria-label": `${label} text`, rows: numVisibleLines, onClick: onClick, style: {
                    cursor: (onClick
                        ? 'pointer'
                        : 'default'),
                    textDecoration: (onClick
                        ? 'underline'
                        : undefined),
                    maxWidth: (maxTextWidthRem
                        ? `${maxTextWidthRem}rem`
                        : undefined),
                }, readOnly: true }))
            : (React__default["default"].createElement("input", { id: textAreaId, type: "text", className: "CopiableBox-text CopiableBox-text-single-line form-control bg-white text-dark", value: text, "aria-label": `${label} text`, onClick: onClick, style: {
                    cursor: (onClick
                        ? 'pointer'
                        : 'default'),
                    textDecoration: (onClick
                        ? 'underline'
                        : undefined),
                    maxWidth: (maxTextWidthRem
                        ? `${maxTextWidthRem}rem`
                        : undefined),
                }, readOnly: true })),
        React__default["default"].createElement("button", { id: copyButtonId, className: "btn btn-secondary", type: "button", "aria-label": `copy ${label} to the clipboard`, disabled: recentlyCopied, style: {
                minWidth: '5.2rem',
            }, onClick: performCopy }, recentlyCopied
            ? 'Copied!'
            : (React__default["default"].createElement("span", null,
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faClipboard, className: "me-1" }),
                "Copy")))));
};

/**
 * Reusable nested item picker
 * @author Yuen Ler Chow
 */
/* ------------- Actions ------------ */
// Types of actions
var ActionType$2;
(function (ActionType) {
    // Toggle whether the children are being shown
    ActionType["ToggleItems"] = "toggle-items";
})(ActionType$2 || (ActionType$2 = {}));
/**
 * Reducer that executes actions
 * @author Yuen Ler Chow
 * @param state current state
 * @param action action to execute
 */
const reducer$2 = (state, action) => {
    switch (action.type) {
        case ActionType$2.ToggleItems: {
            return { isShowingItems: !state.isShowingItems };
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const NestableItemList = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { items, onChanged, } = props;
    /* -------------- State ------------- */
    // Initial state
    const initialState = {
        isShowingItems: false,
    };
    // Initialize state
    const [state, dispatch] = React.useReducer(reducer$2, initialState);
    // Destructure common state
    const { isShowingItems, } = state;
    /*------------------------------------------------------------------------*/
    /*                           Component Functions                          */
    /*------------------------------------------------------------------------*/
    /**
     * Checks if all items in a list are checked
     * @author Yuen Ler Chow
     * @param pickableItems a list of items
     * @returns true if all items are checked. If any item is a group,
     *   we recursively check its children
     */
    const allChecked = (pickableItems) => {
        return pickableItems.every((item) => {
            if (item.isGroup) {
                return allChecked(item.children);
            }
            return item.checked;
        });
    };
    /**
     * Checks if none of the items in a list are checked
     * @author Yuen Ler Chow
     * @param pickableItems a list of items
     * @returns true if all items are unchecked. If any item is a group, we
     *   recursively check its children
     */
    const noneChecked = (pickableItems) => {
        return pickableItems.every((item) => {
            if (item.isGroup) {
                return noneChecked(item.children);
            }
            return !item.checked;
        });
    };
    /**
     * Change whether specific items are checked
     * @author Yuen Ler Chow
     * @param id the id of the item we want to check or uncheck OR true if
     *   we are checking/unchecking all items, independent of their id
     * @param checked if true, the item will be checked.
     * @param pickableItems the list of items we iterate through to find the item
     *   we want to check/uncheck
     * @returns a list of items with the item now checked/unchecked.
     *   If it is a group, its children will also become checked/unchecked
     */
    const changeChecked = (id, checked, pickableItems) => {
        const updatedItems = pickableItems.map((item) => {
            if (item.id === id || id === true) {
                if (item.isGroup) {
                    return Object.assign(Object.assign({}, item), { children: changeChecked(true, checked, item.children) });
                }
                return Object.assign(Object.assign({}, item), { checked });
            }
            if (item.isGroup) {
                return Object.assign(Object.assign({}, item), { children: changeChecked(id, checked, item.children) });
            }
            return item;
        });
        return updatedItems;
    };
    /**
     * Within a tree of items, swap in the list of updated items into the spot
     *   indicated by the id
     * @author Yuen Ler Chow
     * @param id the id of the item group we want to change
     * @param updatedItems the list of items we want to change the items in the group to
     * @returns a list of all items containing the updated items
     */
    const changeItems = (id, updatedItems) => {
        return items.map((item) => {
            if (item.id === id) {
                return Object.assign(Object.assign({}, item), { children: updatedItems });
            }
            return item;
        });
    };
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    return (React__default["default"].createElement("div", null, items.map((item) => {
        return (React__default["default"].createElement("div", { key: item.id },
            React__default["default"].createElement("span", { className: "NestableItemList-dropdown-button-container d-inline-block", style: {
                    minWidth: '2rem',
                } }, item.isGroup && (React__default["default"].createElement("button", { className: `NestableItemList-dropdown-button NestableItemList-dropdown-button-${item.id}`, style: {
                    border: 0,
                    backgroundColor: 'transparent',
                }, type: "button", onClick: () => {
                    dispatch({
                        type: ActionType$2.ToggleItems,
                    });
                }, "aria-label": `${isShowingItems ? 'Hide' : 'Show'} items in ${item.name}` },
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: isShowingItems ? freeSolidSvgIcons.faChevronDown : freeSolidSvgIcons.faChevronRight })))),
            React__default["default"].createElement(CheckboxButton, { className: `NestableItemList-CheckboxButton-${item.id}`, text: item.name, checked: item.isGroup ? allChecked(item.children) : item.checked, dashed: item.isGroup ? !noneChecked(item.children) : false, onChanged: (checked) => {
                    onChanged(changeChecked(item.id, checked, items));
                }, ariaLabel: `Select ${item.name}`, checkedVariant: Variant$1.Light }),
            item.isGroup && isShowingItems && (React__default["default"].createElement("div", { className: "NestableItemList-children-container", style: {
                    paddingLeft: '2.2rem',
                } },
                React__default["default"].createElement(NestableItemList, { items: item.children, onChanged: (updatedItems) => {
                        onChanged(changeItems(item.id, updatedItems));
                    } })))));
    })));
};

/**
 * Reusable nested item picker
 * @author Yuen Ler Chow
 */
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const ItemPicker = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { title, items, onChanged, noBottomMargin, } = props;
    /*------------------------------------------------------------------------*/
    /*                           Component Functions                          */
    /*------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    return (React__default["default"].createElement(TabBox, { title: title, noBottomMargin: noBottomMargin },
        React__default["default"].createElement("div", { style: { overflowX: 'auto' } },
            React__default["default"].createElement(NestableItemList, { items: items, onChanged: onChanged }))));
};

/**
 * Path of the route for storing client-side logs
 * @author Gabe Abrams
 */
const LOG_REVIEW_ROUTE_PATH_PREFIX = `/admin${ROUTE_PATH_PREFIX}/logs`;

/**
 * Source of a log event
 * @author Gabe Abrams
 */
var LogSource;
(function (LogSource) {
    // Client
    LogSource["Client"] = "client";
    // Server
    LogSource["Server"] = "server";
})(LogSource || (LogSource = {}));
var LogSource$1 = LogSource;

/**
 * Type of a log event
 * @author Gabe Abrams
 */
var LogType;
(function (LogType) {
    // User action
    LogType["Action"] = "action";
    // Error
    LogType["Error"] = "error";
})(LogType || (LogType = {}));
var LogType$1 = LogType;

/**
 * Types of actions
 * @author Gabe Abrams
 */
var LogAction;
(function (LogAction) {
    // Target was opened by the user (it was not on screen, but now it is)
    LogAction["Open"] = "open";
    // Target was closed by the user (it was on screen, but now it is not)
    LogAction["Close"] = "close";
    // Target was cancelled by the user (it was on closed without saving)
    LogAction["Cancel"] = "cancel";
    // Target was expanded by the user (it always remains on screen, but size was changed)
    LogAction["Expand"] = "expand";
    // Target was collapsed by the user (it always remains on screen, but size was changed)
    LogAction["Collapse"] = "collapse";
    // Target was viewed by the user (only for items that are not opened or closed, those must use Open/Close actions)
    LogAction["View"] = "view";
    // Target interrupted the user (popup, dialog, validation message, etc. appeared without user prompting)
    LogAction["Interrupt"] = "interrupt";
    // Target was created by the user (it did not exist before)
    LogAction["Create"] = "create";
    // Target was edited by the user (it existed and was changed)
    LogAction["Edit"] = "edit";
    // Target was deleted by the user (it existed and now it doesn't)
    LogAction["Delete"] = "delete";
    // Target was added by the user (it already existed and was added to another place)
    LogAction["Add"] = "add";
    // Target was removed by the user (it was removed from something but still exists)
    LogAction["Remove"] = "remove";
    // Target was activated by the user (click, check, tap, keypress, etc.)
    LogAction["Activate"] = "activate";
    // Target was deactivated by the user (click away, uncheck, tap outside of, tab away, etc.)
    LogAction["Deactivate"] = "deactivate";
    // User showed interest in a target (hover, peek, etc.)
    LogAction["Peek"] = "peek";
    // Unknown action
    LogAction["Unknown"] = "unknown";
})(LogAction || (LogAction = {}));
var LogAction$1 = LogAction;

/**
 * Server-side API param types
 * @author Gabe Abrams
 */
var ParamType;
(function (ParamType) {
    ParamType["Boolean"] = "boolean";
    ParamType["BooleanOptional"] = "boolean-optional";
    ParamType["Float"] = "float";
    ParamType["FloatOptional"] = "float-optional";
    ParamType["Int"] = "int";
    ParamType["IntOptional"] = "int-optional";
    ParamType["JSON"] = "json";
    ParamType["JSONOptional"] = "json-optional";
    ParamType["String"] = "string";
    ParamType["StringOptional"] = "string-optional";
})(ParamType || (ParamType = {}));
var ParamType$1 = ParamType;

/**
 * Round a number to a certain number of decimals
 * @author Gabe Abrams
 * @param num the number to round
 * @param numDecimals the number of decimals to round to
 * @returns rounded number
 */
const roundToNumDecimals = (num, numDecimals) => {
    const rounder = 10 ** numDecimals;
    return (Math.round(num * rounder) / rounder);
};

/**
 * Escape a CSV cell if needed
 * @author Gabe Abrams
 * @param text the cell contents
 * @returns escaped cell text
 */
const escapeCellText = (text) => {
    if (!text.includes(',')) {
        // No need to escape
        return text;
    }
    // Perform escape
    return `"${text.replace(/"/g, '""')}`;
};
/**
 * Generate a CSV file
 * @author Gabe Abrams
 * @param data list of row data in the form of json objects
 * @param columns list of columns to include in the csv
 * @returns multiline csv string
 */
const genCSV = (data, columns) => {
    let csv = '';
    // Add header
    csv += (columns
        .map((column) => {
        return escapeCellText(column.title);
    })
        .join(','));
    // Add each row
    data.forEach((datum) => {
        csv += (columns
            .map((column) => {
            return escapeCellText(datum[column.param]);
        })
            .join(','));
    });
    // Return
    return csv;
};

/**
 * Button for downloading a csv file
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const CSVDownloadButton = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { filename, csv, id, className, ariaLabel, style, onClick, children, } = props;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    // Render the button
    return (React__default["default"].createElement("a", { id: id, download: filename, href: `data:application/octet-stream,${csv}`, className: `CSVDownloadButton-button ${className !== null && className !== void 0 ? className : 'btn btn-secondary'}`, "aria-label": (ariaLabel
            ? `Click to download ${filename}`
            : ariaLabel), style: style, onClick: onClick },
        !children && (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCloudDownloadAlt, className: "mr-2" }),
            "Download CSV")),
        children));
};

/**
 * Intelligent table
 * @author Gabe Abrams
 */
// Sort types
var SortType;
(function (SortType) {
    // Ascending
    SortType["Ascending"] = "ascending";
    // Descending
    SortType["Descending"] = "descending";
})(SortType || (SortType = {}));
/* ------------- Actions ------------ */
// Types of actions
var ActionType$1;
(function (ActionType) {
    // Toggle sort column param
    ActionType["ToggleSortColumn"] = "toggle-sort-column";
    // Toggle the visibility of a column
    ActionType["ToggleColumnVisibility"] = "toggle-column-visibility";
    // Toggle the column visibility customization modal
    ActionType["ToggleColVisCusModalVisibility"] = "toggle-col-vis-cus-modal-visibility";
})(ActionType$1 || (ActionType$1 = {}));
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer$1 = (state, action) => {
    switch (action.type) {
        case ActionType$1.ToggleSortColumn: {
            if (action.param !== state.sortColumnParam) {
                // Different column param
                return Object.assign(Object.assign({}, state), { sortColumnParam: action.param, sortType: SortType.Ascending });
            }
            if (state.sortType === SortType.Ascending) {
                // Switch to descending
                return Object.assign(Object.assign({}, state), { sortType: SortType.Descending });
            }
            // Stop sorting by column
            return Object.assign(Object.assign({}, state), { sortColumnParam: undefined, sortType: SortType.Ascending });
        }
        case ActionType$1.ToggleColumnVisibility: {
            const { columnVisibilityMap } = state;
            columnVisibilityMap[action.param] = !columnVisibilityMap[action.param];
            return Object.assign(Object.assign({}, state), { columnVisibilityMap });
        }
        case ActionType$1.ToggleColVisCusModalVisibility: {
            return Object.assign(Object.assign({}, state), { columnVisibilityCustomizationModalVisible: !state.columnVisibilityCustomizationModalVisible });
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const IntelliTable = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    var _a;
    /* -------------- Props ------------- */
    // Destructure all props
    const { title, id, data, columns, } = props;
    /* -------------- State ------------- */
    // Initial state
    const initColumnVisibilityMap = {};
    columns.forEach((column) => {
        initColumnVisibilityMap[column.param] = !column.startsHidden;
    });
    const initialState = {
        sortColumnParam: undefined,
        sortType: SortType.Descending,
        columnVisibilityMap: initColumnVisibilityMap,
        columnVisibilityCustomizationModalVisible: false,
    };
    // Initialize state
    const [state, dispatch] = React.useReducer(reducer$1, initialState);
    // Destructure common state
    const { sortColumnParam, sortType, columnVisibilityMap, columnVisibilityCustomizationModalVisible, } = state;
    /* ------- Col Vis Customization Modal ------ */
    if (columnVisibilityCustomizationModalVisible) {
        // Create modal
        (React__default["default"].createElement(Modal, { type: ModalType$1.Okay, title: "Choose columns to show:", onClose: () => {
                dispatch({
                    type: ActionType$1.ToggleColVisCusModalVisibility,
                });
            } }, columns.map((column) => {
            return (React__default["default"].createElement(CheckboxButton, { key: column.param, id: `IntelliTable-${id}-toggle-visibility-${column.param}`, text: column.title, onChanged: () => {
                    dispatch({
                        type: ActionType$1.ToggleColumnVisibility,
                        param: column.param,
                    });
                }, checked: columnVisibilityMap[column.param], ariaLabel: `show "${column.title}" column` }));
        })));
    }
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    // Table header
    const headerCells = (columns
        .filter((column) => {
        return columnVisibilityMap[column.param];
    })
        .map((column) => {
        // Custom info based on current sort type
        let sortButtonAriaLabel;
        let sortIcon = freeSolidSvgIcons.faSort;
        if (!sortColumnParam) {
            // Not being sorted yet
            sortButtonAriaLabel = `sort ascending by ${column.title}`;
            sortIcon = freeSolidSvgIcons.faSort;
        }
        else if (column.param === sortColumnParam) {
            // Already sorted by this column
            if (sortType === SortType.Ascending) {
                // Sorted ascending
                sortButtonAriaLabel = `sort descending by ${column.title}`;
                sortIcon = freeSolidSvgIcons.faSortDown;
            }
            else {
                // Sorted descending
                sortButtonAriaLabel = `stop sorting by ${column.title}`;
                sortIcon = freeSolidSvgIcons.faSortUp;
            }
        }
        else {
            // Sorted by a different column
            sortButtonAriaLabel = `sort ascending by ${column.title}`;
            sortIcon = freeSolidSvgIcons.faSort;
        }
        // Create the cell UI
        return (React__default["default"].createElement("th", { key: column.param, scope: "col", id: `IntelliTable-${id}-header-${column.param}` },
            React__default["default"].createElement("div", { className: "d-flex align-items-center justify-content-center flex-row h-100" },
                React__default["default"].createElement("span", { className: "text-nowrap" }, column.title),
                React__default["default"].createElement("div", null,
                    React__default["default"].createElement("button", { type: "button", className: "btn btn-light btn-sm ms-1", "aria-label": sortButtonAriaLabel, onClick: () => {
                            dispatch({
                                type: ActionType$1.ToggleSortColumn,
                                param: column.param,
                            });
                        } },
                        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: sortIcon }))))));
    }));
    const tableHeader = (React__default["default"].createElement("thead", null,
        React__default["default"].createElement("tr", null, headerCells)));
    // Sort data
    let sortedData = [...data];
    const paramType = (_a = columns.find((column) => {
        return (column.param === sortColumnParam);
    })) === null || _a === void 0 ? void 0 : _a.type;
    const descending = (sortType === SortType.Descending);
    if (sortColumnParam) {
        sortedData.sort((a, b) => {
            const aVal = a[sortColumnParam];
            const bVal = b[sortColumnParam];
            // Sort differently based on the data type
            // > Boolean
            if (paramType === ParamType$1.Boolean) {
                if (aVal && !bVal) {
                    return (descending ? -1 : 1);
                }
                if (!aVal && bVal) {
                    return (descending ? 1 : -1);
                }
                return 0;
            }
            // > Number
            if (paramType === ParamType$1.Int
                || paramType === ParamType$1.Float) {
                return (descending
                    ? (bVal - aVal)
                    : (aVal - bVal));
            }
            // > String
            if (paramType === ParamType$1.String) {
                if (aVal < bVal) {
                    return (descending ? -1 : 1);
                }
                if (aVal > bVal) {
                    return (descending ? 1 : -1);
                }
                return 0;
            }
            // > JSON
            if (paramType === ParamType$1.JSON) {
                const aSize = (Array.isArray(aVal)
                    ? aVal.length
                    : Object.keys(aVal).length);
                const bSize = (Array.isArray(bVal)
                    ? bVal.length
                    : Object.keys(bVal).length);
                return (descending
                    ? (bSize - aSize)
                    : (aSize - bSize));
            }
            // No sort
            return 0;
        });
    }
    // Table body
    const rows = sortedData.map((datum) => {
        // Build cells
        const cells = (columns
            .filter((column) => {
            return columnVisibilityMap[column.param];
        })
            .map((column) => {
            // Get value
            let value = datum;
            const paramParts = column.param.split('.');
            paramParts.forEach((paramPart) => {
                value = (value !== null && value !== void 0 ? value : {})[paramPart];
            });
            let fullValue;
            let visibleValue;
            let title = '';
            if (column.type === ParamType$1.Boolean) {
                fullValue = !!(value);
                const noValue = (value === undefined
                    || value === null);
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCheckCircle }))
                    : (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faXmarkCircle })));
                title = (fullValue ? 'True' : 'False');
            }
            else if (column.type === ParamType$1.Int) {
                fullValue = Number.parseInt(value, 10);
                const noValue = Number.isNaN(fullValue);
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faMinus }))
                    : fullValue);
                title = String(fullValue);
            }
            else if (column.type === ParamType$1.Float) {
                fullValue = Number.parseFloat(value);
                const noValue = Number.isNaN(fullValue);
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faMinus }))
                    : roundToNumDecimals(fullValue, 2));
                title = String(fullValue);
            }
            else if (column.type === ParamType$1.String) {
                fullValue = String(value).trim();
                const noValue = (value.trim().length) === 0;
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faMinus }))
                    : fullValue);
                title = `"${value}"`;
            }
            else if (column.type === ParamType$1.JSON) {
                fullValue = JSON.stringify(value);
                const noValue = (Array.isArray(value)
                    ? (!value || value.length === 0)
                    : Object.keys(value !== null && value !== void 0 ? value : {}).length === 0);
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faMinus }))
                    : fullValue);
            }
            // Create UI
            return (React__default["default"].createElement("td", { key: `${datum.id}-${column.param}`, title: title }, visibleValue));
        }));
        // Add cells to a row
        return (React__default["default"].createElement("tr", { key: datum.id }, cells));
    });
    const tableBody = (React__default["default"].createElement("tbody", null, rows));
    // Build table
    const table = (React__default["default"].createElement("table", { className: "table table-dark table-striped" },
        tableHeader,
        tableBody));
    // Count the number of hidden columns
    const numHiddenCols = (Object.values(columnVisibilityMap)
        .filter((isVisible) => {
        return !isVisible;
    })
        .length);
    // Build CSV
    const csv = genCSV(data, columns);
    // Build main UI
    return (React__default["default"].createElement("div", { className: `IntelliTable-container-${id}` },
        React__default["default"].createElement("div", { className: "d-flex align-items-center justify-content-center" },
            React__default["default"].createElement("h3", { className: "m-0" }, title),
            React__default["default"].createElement("div", { className: "flex-grow-1 text-end" },
                React__default["default"].createElement(CSVDownloadButton, { "aria-label": `download data as csv for ${title}`, id: `IntelliTable-${id}-download-as-csv`, filename: `${title}.csv`, csv: csv }),
                React__default["default"].createElement("button", { type: "button", className: "btn btn-secondary ms-2", "aria-label": `show panel for customizing which columns show in table ${title}`, id: `IntelliTable-${id}-show-column-customization-modal`, onClick: () => {
                        dispatch({
                            type: ActionType$1.ToggleColVisCusModalVisibility,
                        });
                    } },
                    "Show/Hide Cols",
                    numHiddenCols > 0 && (React__default["default"].createElement(React__default["default"].Fragment, null,
                        ' ',
                        "(",
                        numHiddenCols,
                        ' ',
                        "hidden)"))))),
        React__default["default"].createElement("div", { className: `IntelliTable-table-${id}`, style: {
                overflowX: 'auto',
            } }, table)));
};

/**
 * Log reviewer panel that allows users (must be approved admins) to
 *   review logs written by dce-reactkit
 * @author Gabe Abrams
 */
// Types of filter drawers
var FilterDrawer;
(function (FilterDrawer) {
    FilterDrawer["Date"] = "date";
    FilterDrawer["Context"] = "context";
    FilterDrawer["Tag"] = "tag";
    FilterDrawer["Action"] = "action";
    FilterDrawer["Advanced"] = "advanced";
})(FilterDrawer || (FilterDrawer = {}));
/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/
const style = `
  .LogReviewer-outer-container {
    /* Full Screen */
    display: inline-block;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    
    /* On Top and Fixed */
    position: fixed;
    z-index: 90000;

    /* Space around contents */
    padding: 0.5rem;

    /* Dark Background */
    background-color: rgba(0, 0, 0, 0.7);

    /* No Clickthrough */
    pointer-events: none;
  }
  
  .LogReviewer-inner-container {
    /* Full screen, rounded modal-like look */
    display: flex;
    height: 100%;
    border: 0.05rem solid black;
    border-radius: 0.5rem;
    overflow: hidden;
    padding: 0.7rem;

    /* Solid background */
    background-color: white;
    color: black;

    /* Place contents in flex column */
    flex-direction: column;

    /* Re-allow interaction */
    pointer-events: all;
  }

  .LogReviewer-header {
    /* Elements in flex row */
    display: flex;
    flex-direction: row;
  }

  .LogReviewer-header-title {
    /* Take up remaining width */
    flex-grow: 1;
  }

  .LogReviewer-contents {
    /* Take up remaining height */
    flex-grow: 1;

    /* Vertical scroll */
    overflow-y: auto;
  }

  .LogReviewer-header-close-button {
    border: 0 !important;
    background-color: transparent !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin: 0 !important;
    color: #333 !important;
  }
  .LogReviewer-header-close-button:hover {
    border: 0 !important;
    background-color: transparent !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin: 0 !important;
    color: #000 !important;
  }
`;
/*------------------------------------------------------------------------*/
/*                            Static Functions                            */
/*------------------------------------------------------------------------*/
/**
 * Turn a machine-readable name into a human-readable name
 * @author Gabe Abrams
 * @param name machine-readable name
 * @returns human-readable name
 */
const genHumanReadableName = (machineReadableName) => {
    let humanReadableName = '';
    // Add chars and spaces
    const chars = machineReadableName.split('');
    chars.forEach((char) => {
        if (/[A-Z]/.test(char)) {
            // Uppercase! Add a space before
            humanReadableName += ' ';
        }
        humanReadableName += char;
    });
    // Trim and return
    return humanReadableName.trim();
};
/* ------------- Actions ------------ */
// Types of actions
var ActionType;
(function (ActionType) {
    // Show the loading bar
    ActionType["StartLoading"] = "start-loading";
    // Finish loading one or more months of logs
    ActionType["FinishLoading"] = "finish-loading";
    // Reset filters to initial values
    ActionType["ResetFilters"] = "reset-filters";
    // Choose a filter drawer to toggle
    ActionType["ToggleFilterDrawer"] = "toggle-filter-drawer";
    // Hide filter drawer
    ActionType["HideFilterDrawer"] = "hide-filter-drawer";
    // Handle the date filter state
    ActionType["UpdateDateFilterState"] = "update-date-filter-state";
    // Update the context filter state
    ActionType["UpdateContextFilterState"] = "update-context-filter-state";
    // Update the tag filter state
    ActionType["UpdateTagFilterState"] = "update-tag-filter-state";
    // Update the action and error filter state
    ActionType["UpdateActionErrorFilterState"] = "update-action-error-filter-state";
    // Update the advanced filter state
    ActionType["UpdateAdvancedFilterState"] = "update-advanced-filter-state";
})(ActionType || (ActionType = {}));
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer = (state, action) => {
    switch (action.type) {
        case ActionType.StartLoading: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case ActionType.FinishLoading: {
            return Object.assign(Object.assign({}, state), { loading: false, logMap: action.logMap });
        }
        case ActionType.ToggleFilterDrawer: {
            return Object.assign(Object.assign({}, state), { expandedFilterDrawer: (state.expandedFilterDrawer === action.filterDrawer
                    ? undefined // hide
                    : action.filterDrawer) });
        }
        case ActionType.HideFilterDrawer: {
            return Object.assign(Object.assign({}, state), { expandedFilterDrawer: undefined });
        }
        case ActionType.ResetFilters: {
            return Object.assign(Object.assign({}, state), { dateFilterState: action.initDateFilterState, contextFilterState: action.initContextFilterState, tagFilterState: action.initTagFilterState, actionErrorFilterState: action.initActionErrorFilterState, advancedFilterState: action.initAdvancedFilterState });
        }
        case ActionType.UpdateDateFilterState: {
            return Object.assign(Object.assign({}, state), { dateFilterState: action.dateFilterState });
        }
        case ActionType.UpdateContextFilterState: {
            return Object.assign(Object.assign({}, state), { contextFilterState: action.contextFilterState });
        }
        case ActionType.UpdateTagFilterState: {
            return Object.assign(Object.assign({}, state), { tagFilterState: action.tagFilterState });
        }
        case ActionType.UpdateActionErrorFilterState: {
            return Object.assign(Object.assign({}, state), { actionErrorFilterState: action.actionErrorFilterState });
        }
        case ActionType.UpdateAdvancedFilterState: {
            return Object.assign(Object.assign({}, state), { advancedFilterState: action.advancedFilterState });
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const LogReviewer = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    var _a, _b, _c, _d, _e, _f;
    /* -------------- Props ------------- */
    // Destructure props
    const { LogMetadata, onClose, } = props;
    /* -------------- State ------------- */
    // Create initial date filter state
    const today = getTimeInfoInET();
    const initStartDate = {
        year: today.year,
        month: today.month,
        day: 1,
    };
    const initEndDate = {
        year: today.year,
        month: today.month,
        day: today.day,
    };
    const initDateFilterState = {
        startDate: initStartDate,
        endDate: initEndDate,
    };
    // Create initial context filter state
    const initContextFilterState = {};
    Object.keys((_a = LogMetadata.Context) !== null && _a !== void 0 ? _a : {}).forEach((context) => {
        var _a, _b;
        const contextValue = ((_a = LogMetadata.Context) !== null && _a !== void 0 ? _a : {})[context];
        if (typeof contextValue === 'string') {
            // Case: no subcontexts
            initContextFilterState[contextValue] = true;
        }
        else {
            // Case: subcontexts exist
            initContextFilterState[contextValue._] = {};
            Object.values(((_b = LogMetadata.Context) !== null && _b !== void 0 ? _b : {})[context]).forEach((subcontext) => {
                const subcontextValue = contextValue[subcontext];
                initContextFilterState[contextValue._][subcontextValue] = true;
            });
        }
    });
    // Create initial tag filter state
    const initTagFilterState = {};
    Object.values((_b = LogMetadata.Tag) !== null && _b !== void 0 ? _b : {}).forEach((tagValue) => {
        initTagFilterState[tagValue] = true;
    });
    // Create advanced filter state
    const initAdvancedFilterState = {
        userFirstName: '',
        userLastName: '',
        userEmail: '',
        userId: '',
        includeLearners: true,
        includeTTMs: true,
        includeAdmins: true,
        courseId: '',
        courseName: '',
        isMobile: undefined,
        source: undefined,
        routePath: '',
        routeTemplate: '',
    };
    // Create action and error filter state
    const initActionErrorFilterState = {
        type: undefined,
        errorMessage: '',
        errorCode: '',
        target: {},
        action: {},
    };
    Object.values((_c = LogMetadata.Target) !== null && _c !== void 0 ? _c : {}).forEach((target) => {
        initActionErrorFilterState.target[target] = true;
    });
    Object.values(LogAction$1).forEach((action) => {
        initActionErrorFilterState.action[action] = true;
    });
    // Initial state
    const initialState = {
        loading: true,
        logMap: {},
        expandedFilterDrawer: undefined,
        dateFilterState: initDateFilterState,
        contextFilterState: initContextFilterState,
        tagFilterState: initTagFilterState,
        actionErrorFilterState: initActionErrorFilterState,
        advancedFilterState: initAdvancedFilterState,
    };
    // Initialize state
    const [state, dispatch] = React.useReducer(reducer, initialState);
    // Destructure common state
    const { loading, logMap, expandedFilterDrawer, dateFilterState, contextFilterState, tagFilterState, actionErrorFilterState, advancedFilterState, } = state;
    /*------------------------------------------------------------------------*/
    /*                           Component Functions                          */
    /*------------------------------------------------------------------------*/
    /**
     * Get the list of year/month combos that need to be loaded given a new
     *   start or end date and the existing logMap
     * @author Gabe Abrams
     * @param newDateFilterState the new date filter state
     * @returns list of year/month combos that need to be loaded
     */
    const listMonthsToLoad = (newDateFilterState) => {
        // List of year/month combos that need to be loaded
        const toLoad = [];
        // Loop through dates
        let year = newDateFilterState.startDate.year;
        let month = newDateFilterState.startDate.month;
        while (
        // Earlier year
        (year <= newDateFilterState.endDate.year)
            // Current year but included month
            || (year === newDateFilterState.endDate.year
                && month <= newDateFilterState.endDate.month)) {
            // Add to list
            toLoad.push({
                year,
                month,
            });
            // Increment
            month += 1;
            if (month > 12) {
                month -= 12;
                year += 1;
            }
        }
        // Return
        return toLoad;
    };
    /**
     * Handle updated start/end dates (updates state, loads if necessary)
     * @author Gabe Abrams
     * @param newDateFilterState the new date filter state
     */
    const handleDateRangeUpdated = (newDateFilterState) => __awaiter(void 0, void 0, void 0, function* () {
        // Update state
        dispatch({
            type: ActionType.UpdateDateFilterState,
            dateFilterState: newDateFilterState,
        });
        // Check which year/month combos we need to load
        const toLoad = listMonthsToLoad(newDateFilterState);
        // If nothing to load, finished
        if (toLoad.length === 0) {
            return;
        }
        // Start loading
        dispatch({
            type: ActionType.StartLoading,
        });
        // Load required months
        try {
            for (let i = 0; i < toLoad.length; i++) {
                // Destructure
                const { year, month } = toLoad[i];
                // Load
                const logs = yield visitServerEndpoint({
                    path: `${LOG_REVIEW_ROUTE_PATH_PREFIX}/years/${year}/months/${month}`,
                    method: 'GET',
                });
                // Add to map
                if (!logMap[year]) {
                    logMap[year] = {};
                }
                logMap[year][month] = logs;
            }
        }
        catch (err) {
            return showFatalError(err);
        }
        // Finish loading
        dispatch({
            type: ActionType.FinishLoading,
            logMap,
        });
    });
    /*------------------------------------------------------------------------*/
    /*                           Lifecycle Functions                          */
    /*------------------------------------------------------------------------*/
    /**
     * Mount
     * @author Gabe Abrams
     */
    React.useEffect(() => {
        // Perform initial load
        handleDateRangeUpdated(dateFilterState);
    }, []);
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    // Body that will be filled with the contents of the panel
    let body;
    /* ------------- Loading ------------ */
    if (loading) {
        body = (React__default["default"].createElement("div", { className: "text-center p-5" },
            React__default["default"].createElement(LoadingSpinner, null)));
    }
    /* ------------ Review UI ----------- */
    if (!loading) {
        /*----------------------------------------*/
        /*                 Filters                */
        /*----------------------------------------*/
        // Filter toggle
        const filterToggles = (React__default["default"].createElement("div", { className: "LogReviewer-filter-toggles" },
            React__default["default"].createElement("h3", { className: "m-0" }, "Filters:"),
            React__default["default"].createElement("div", { className: "LogReviewer-filter-toggle-buttons alert alert-secondary p-2 m-0" },
                React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-date-filter-drawer", className: `btn btn-${FilterDrawer.Date === expandedFilterDrawer ? 'warning' : 'light'} me-2`, "aria-label": "toggle date filter drawer", onClick: () => {
                        dispatch({
                            type: ActionType.ToggleFilterDrawer,
                            filterDrawer: FilterDrawer.Date,
                        });
                    } },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCalendar, className: "me-2" }),
                    "Date"),
                React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-context-filter-drawer", className: `btn btn-${FilterDrawer.Context === expandedFilterDrawer ? 'warning' : 'light'} me-2`, "aria-label": "toggle context filter drawer", onClick: () => {
                        dispatch({
                            type: ActionType.ToggleFilterDrawer,
                            filterDrawer: FilterDrawer.Context,
                        });
                    } },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCircle, className: "me-2" }),
                    "Context"),
                (LogMetadata.Tag && Object.keys(LogMetadata.Tag).length > 0) && (React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-tag-filter-drawer", className: `btn btn-${FilterDrawer.Tag === expandedFilterDrawer ? 'warning' : 'light'} me-2`, "aria-label": "toggle tag filter drawer", onClick: () => {
                        dispatch({
                            type: ActionType.ToggleFilterDrawer,
                            filterDrawer: FilterDrawer.Tag,
                        });
                    } },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faTag, className: "me-2" }),
                    "Tag")),
                React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-action-filter-drawer", className: `btn btn-${FilterDrawer.Action === expandedFilterDrawer ? 'warning' : 'light'} me-2`, "aria-label": "toggle action and error filter drawer", onClick: () => {
                        dispatch({
                            type: ActionType.ToggleFilterDrawer,
                            filterDrawer: FilterDrawer.Action,
                        });
                    } },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faHammer, className: "me-2" }),
                    "Action"),
                React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-advanced-filter-drawer", className: `btn btn-${FilterDrawer.Advanced === expandedFilterDrawer ? 'warning' : 'light'}`, "aria-label": "toggle advanced filter drawer", onClick: () => {
                        dispatch({
                            type: ActionType.ToggleFilterDrawer,
                            filterDrawer: FilterDrawer.Advanced,
                        });
                    } },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faList, className: "me-2" }),
                    "Advanced"))));
        // Filter drawer
        let filterDrawer;
        if (expandedFilterDrawer) {
            if (expandedFilterDrawer === FilterDrawer.Date) {
                filterDrawer = (React__default["default"].createElement(TabBox, { title: "Date" },
                    React__default["default"].createElement(SimpleDateChooser, { ariaLabel: "filter start date", name: "filter-start-date", year: dateFilterState.startDate.year, month: dateFilterState.startDate.month, day: dateFilterState.startDate.day, onChange: (month, day, year) => {
                            dispatch({
                                type: ActionType.UpdateDateFilterState,
                                dateFilterState: Object.assign(Object.assign({}, dateFilterState), { startDate: { month, day, year } }),
                            });
                        } }),
                    ' ',
                    "to",
                    ' ',
                    React__default["default"].createElement(SimpleDateChooser, { ariaLabel: "filter end date", name: "filter-end-date", year: dateFilterState.endDate.year, month: dateFilterState.endDate.month, day: dateFilterState.endDate.day, onChange: (month, day, year) => {
                            dispatch({
                                type: ActionType.UpdateDateFilterState,
                                dateFilterState: Object.assign(Object.assign({}, dateFilterState), { endDate: { month, day, year } }),
                            });
                        } })));
            }
            else if (expandedFilterDrawer === FilterDrawer.Context) {
                // Create item picker items
                const pickableItems = (Object.keys((_d = LogMetadata.Context) !== null && _d !== void 0 ? _d : {})
                    .map((context) => {
                    var _a;
                    const value = ((_a = LogMetadata.Context) !== null && _a !== void 0 ? _a : {})[context];
                    if (typeof value === 'string') {
                        // No subcategories
                        const item = {
                            id: context,
                            name: genHumanReadableName(context),
                            isGroup: false,
                            checked: !!contextFilterState[context],
                        };
                        return item;
                    }
                    // Has subcategories
                    const children = (Object.keys(value)
                        .filter((subcontext) => {
                        return subcontext !== '_';
                    })
                        .map((subcontext) => {
                        return {
                            id: `${context}-${subcontext}`,
                            name: genHumanReadableName(subcontext),
                            isGroup: false,
                            checked: !!value[subcontext],
                        };
                    }));
                    const item = {
                        id: context,
                        name: context,
                        isGroup: true,
                        children,
                    };
                    return item;
                }));
                // Create filter UI
                filterDrawer = (React__default["default"].createElement(ItemPicker, { title: "Context", items: pickableItems, onChanged: (updatedItems) => {
                        // Update our state
                        updatedItems.forEach((pickableItem) => {
                            if (pickableItem.isGroup) {
                                // Has subcontexts
                                pickableItem.children.forEach((subcontextItem) => {
                                    contextFilterState[pickableItem.id][subcontextItem.id] = (subcontextItem.checked);
                                });
                            }
                            else {
                                // No subcontexts
                                contextFilterState[pickableItem.id] = (pickableItem.checked);
                            }
                        });
                        dispatch({
                            type: ActionType.UpdateContextFilterState,
                            contextFilterState,
                        });
                    } }));
            }
            else if (expandedFilterDrawer === FilterDrawer.Tag) {
                // Create filter UI
                filterDrawer = (React__default["default"].createElement(TabBox, { title: "Tags" }, Object.keys(tagFilterState)
                    .map((tag, i) => {
                    const description = genHumanReadableName(tag);
                    return (React__default["default"].createElement(CheckboxButton, { id: `LogReviewer-tag-${tag}-checkbox`, text: description, ariaLabel: `include logs tagged with "${description}" in results`, noMarginOnRight: i === Object.keys(tagFilterState).length - 1, onChanged: (checked) => {
                            tagFilterState[tag] = checked;
                        } }));
                })));
            }
            else if (expandedFilterDrawer === FilterDrawer.Action) {
                // Create filter UI
                filterDrawer = (React__default["default"].createElement(React__default["default"].Fragment, null,
                    React__default["default"].createElement(TabBox, { title: "Log Type" },
                        React__default["default"].createElement(RadioButton, { id: "LogReviewer-type-all", text: "All Logs", onSelected: () => {
                                actionErrorFilterState.type = undefined;
                                dispatch({
                                    type: ActionType.UpdateActionErrorFilterState,
                                    actionErrorFilterState,
                                });
                            }, ariaLabel: "show logs of all types", selected: actionErrorFilterState.type === undefined }),
                        React__default["default"].createElement(RadioButton, { id: "LogReviewer-type-action-only", text: "Action Logs Only", onSelected: () => {
                                actionErrorFilterState.type = LogType$1.Action;
                                dispatch({
                                    type: ActionType.UpdateActionErrorFilterState,
                                    actionErrorFilterState,
                                });
                            }, ariaLabel: "only show action logs", selected: actionErrorFilterState.type === LogType$1.Action }),
                        React__default["default"].createElement(RadioButton, { id: "LogReviewer-type-error-only", text: "Action Error Only", onSelected: () => {
                                actionErrorFilterState.type = LogType$1.Error;
                                dispatch({
                                    type: ActionType.UpdateActionErrorFilterState,
                                    actionErrorFilterState,
                                });
                            }, ariaLabel: "only show error logs", selected: actionErrorFilterState.type === LogType$1.Error, noMarginOnRight: true })),
                    (actionErrorFilterState.type === undefined
                        || actionErrorFilterState.type === LogType$1.Action) && (React__default["default"].createElement(TabBox, { title: "Action Log Details" },
                        React__default["default"].createElement(ButtonInputGroup, { label: "Action", className: "mb-2" }, Object.keys(LogAction$1)
                            .map((action, i) => {
                            const description = genHumanReadableName(action);
                            return (React__default["default"].createElement(CheckboxButton, { id: `LogReviewer-action-${action}-checkbox`, text: description, ariaLabel: `include logs with action type "${description}" in results`, noMarginOnRight: i === Object.keys(LogAction$1).length - 1, onChanged: (checked) => {
                                    actionErrorFilterState.action[action] = checked;
                                    dispatch({
                                        type: ActionType.UpdateActionErrorFilterState,
                                        actionErrorFilterState,
                                    });
                                } }));
                        })),
                        React__default["default"].createElement(ButtonInputGroup, { label: "Target" },
                            (Object.keys((_e = LogMetadata.Target) !== null && _e !== void 0 ? _e : {}).length === 0) && (React__default["default"].createElement("div", null, "This app does not have any targets yet.")),
                            Object.keys((_f = LogMetadata.Target) !== null && _f !== void 0 ? _f : {})
                                .map((target, i) => {
                                var _a;
                                const description = genHumanReadableName(target);
                                return (React__default["default"].createElement(CheckboxButton, { id: `LogReviewer-target-${target}-checkbox`, text: description, ariaLabel: `include logs with target "${description}" in results`, onChanged: (checked) => {
                                        actionErrorFilterState.target[target] = checked;
                                        dispatch({
                                            type: ActionType.UpdateActionErrorFilterState,
                                            actionErrorFilterState,
                                        });
                                    }, noMarginOnRight: i === Object.keys((_a = LogMetadata.Target) !== null && _a !== void 0 ? _a : {}).length - 1 }));
                            })))),
                    (actionErrorFilterState.type === undefined
                        || actionErrorFilterState.type === LogType$1.Error) && (React__default["default"].createElement(TabBox, { title: "Error Log Details" },
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "Error Message"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for error message", value: actionErrorFilterState.errorMessage, onChange: (e) => {
                                    actionErrorFilterState.errorMessage = e.target.value;
                                    dispatch({
                                        type: ActionType.UpdateActionErrorFilterState,
                                        actionErrorFilterState,
                                    });
                                } })),
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "Error Code"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for error code", value: actionErrorFilterState.errorMessage, onChange: (e) => {
                                    actionErrorFilterState.errorCode = ((e.target.value)
                                        .trim()
                                        .toUpperCase());
                                    dispatch({
                                        type: ActionType.UpdateActionErrorFilterState,
                                        actionErrorFilterState,
                                    });
                                } }))))));
            }
            else if (expandedFilterDrawer === FilterDrawer.Advanced) {
                // Create advanced filter ui
                filterDrawer = (React__default["default"].createElement(React__default["default"].Fragment, null,
                    React__default["default"].createElement(TabBox, { title: "User Info" },
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "User First Name"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for user first name", value: advancedFilterState.userFirstName, onChange: (e) => {
                                    advancedFilterState.userFirstName = e.target.value;
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } })),
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "User Last Name"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for user last name", value: advancedFilterState.userLastName, onChange: (e) => {
                                    advancedFilterState.userLastName = e.target.value;
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } })),
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "User Email"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for user email", value: advancedFilterState.userEmail, onChange: (e) => {
                                    advancedFilterState.userEmail = ((e.target.value)
                                        .trim());
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } })),
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "User Canvas Id"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for user canvas id", value: advancedFilterState.userId, onChange: (e) => {
                                    const { value } = e.target;
                                    // Only update if value contains only numbers  
                                    if (/^\d+$/.test(value)) {
                                        advancedFilterState.userId = ((e.target.value)
                                            .trim());
                                    }
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } })),
                        React__default["default"].createElement(ButtonInputGroup, { label: "Role" },
                            React__default["default"].createElement(CheckboxButton, { text: "Students", onChanged: (checked) => {
                                    advancedFilterState.includeLearners = checked;
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                }, checked: advancedFilterState.includeLearners, ariaLabel: "show logs from students" }),
                            React__default["default"].createElement(CheckboxButton, { text: "Teaching Team Members", onChanged: (checked) => {
                                    advancedFilterState.includeTTMs = checked;
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                }, checked: advancedFilterState.includeTTMs, ariaLabel: "show logs from teaching team members" }),
                            React__default["default"].createElement(CheckboxButton, { text: "Admins", onChanged: (checked) => {
                                    advancedFilterState.includeAdmins = checked;
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                }, checked: advancedFilterState.includeAdmins, ariaLabel: "show logs from admins" }))),
                    React__default["default"].createElement(TabBox, { title: "Course Info" },
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "Course Name"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for course name", value: advancedFilterState.courseName, onChange: (e) => {
                                    advancedFilterState.courseName = e.target.value;
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } })),
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "Course Canvas Id"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for course canvas id", value: advancedFilterState.courseId, onChange: (e) => {
                                    const { value } = e.target;
                                    // Only update if value contains only numbers  
                                    if (/^\d+$/.test(value)) {
                                        advancedFilterState.courseId = ((e.target.value)
                                            .trim());
                                    }
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } }))),
                    React__default["default"].createElement(TabBox, { title: "Device Info" },
                        React__default["default"].createElement(ButtonInputGroup, { label: "Device Type" },
                            React__default["default"].createElement(RadioButton, { text: "All Devices", ariaLabel: "show logs from all devices", selected: advancedFilterState.isMobile === undefined, onSelected: () => {
                                    advancedFilterState.isMobile = undefined;
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } }),
                            React__default["default"].createElement(RadioButton, { text: "Mobile Only", ariaLabel: "show logs from mobile devices", selected: advancedFilterState.isMobile === true, onSelected: () => {
                                    advancedFilterState.isMobile = true;
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } }),
                            React__default["default"].createElement(RadioButton, { text: "Desktop Only", ariaLabel: "show logs from desktop devices", selected: advancedFilterState.isMobile === false, onSelected: () => {
                                    advancedFilterState.isMobile = false;
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                }, noMarginOnRight: true }))),
                    React__default["default"].createElement(TabBox, { title: "Source" },
                        React__default["default"].createElement(ButtonInputGroup, { label: "Source Type" },
                            React__default["default"].createElement(RadioButton, { text: "Both", ariaLabel: "show logs from all sources", selected: advancedFilterState.source === undefined, onSelected: () => {
                                    advancedFilterState.source = undefined;
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } }),
                            React__default["default"].createElement(RadioButton, { text: "Client Only", ariaLabel: "show logs from client source", selected: advancedFilterState.source === LogSource$1.Client, onSelected: () => {
                                    advancedFilterState.source = LogSource$1.Client;
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } }),
                            React__default["default"].createElement(RadioButton, { text: "Server Only", ariaLabel: "show logs from server source", selected: advancedFilterState.source === LogSource$1.Server, onSelected: () => {
                                    advancedFilterState.source = LogSource$1.Server;
                                    dispatch({
                                        type: ActionType.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                }, noMarginOnRight: true })),
                        advancedFilterState.source !== LogSource$1.Client && (React__default["default"].createElement("div", { className: "mt-2" },
                            React__default["default"].createElement("div", { className: "input-group mb-2" },
                                React__default["default"].createElement("span", { className: "input-group-text" }, "Server Route Path"),
                                React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for server route path", placeholder: "e.g. /api/ttm/courses/12345", value: advancedFilterState.routePath, onChange: (e) => {
                                        advancedFilterState.courseName = ((e.target.value)
                                            .trim());
                                        dispatch({
                                            type: ActionType.UpdateAdvancedFilterState,
                                            advancedFilterState,
                                        });
                                    } })),
                            React__default["default"].createElement("div", { className: "input-group mb-2" },
                                React__default["default"].createElement("span", { className: "input-group-text" }, "Server Route Template"),
                                React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for server route template", value: advancedFilterState.routeTemplate, placeholder: "e.g. /api/ttm/courses/:courseId", onChange: (e) => {
                                        advancedFilterState.courseName = ((e.target.value)
                                            .trim());
                                        dispatch({
                                            type: ActionType.UpdateAdvancedFilterState,
                                            advancedFilterState,
                                        });
                                    } })))))));
            }
        }
        // Filters UI
        const filters = (React__default["default"].createElement(React__default["default"].Fragment, null,
            filterToggles,
            filterDrawer && (React__default["default"].createElement(Drawer, null, filterDrawer))));
        // Actually filter the logs
        // > Perform filters
        const logs = [];
        Object.keys(logMap).forEach((year) => {
            Object.keys(logMap[year]).forEach((month) => {
                logMap[year][month].forEach((log) => {
                    /* ----------- Date Filter ---------- */
                    var _a;
                    // Before start date
                    if (
                    // Previous year
                    log.year < dateFilterState.startDate.year
                        // Same year, earlier month
                        || ((log.year === dateFilterState.startDate.year)
                            && (log.month < dateFilterState.startDate.month))
                        // Same year, same month, earlier day
                        || ((log.year === dateFilterState.startDate.year)
                            && (log.month === dateFilterState.startDate.month)
                            && (log.day < dateFilterState.startDate.day))) {
                        return;
                    }
                    // After end date
                    if (
                    // Later year
                    log.year > dateFilterState.endDate.year
                        // Same year, later month
                        || ((log.year === dateFilterState.endDate.year)
                            && (log.month > dateFilterState.endDate.month))
                        // Same year, same month, later day
                        || ((log.year === dateFilterState.endDate.year)
                            && (log.month === dateFilterState.endDate.month)
                            && (log.day > dateFilterState.endDate.day))) {
                        return;
                    }
                    /* --------- Context Filter --------- */
                    // Context doesn't match
                    if (
                    // Whole context is deselected
                    contextFilterState[log.context] === false
                        // None of the subcontexts are selected
                        || (Object.values((_a = contextFilterState[log.context]) !== null && _a !== void 0 ? _a : {})
                            .every((isSelected) => {
                            return !isSelected;
                        }))) {
                        return;
                    }
                    // Subcontext doesn't match
                    if (
                    // Log has a subcontext
                    log.subcontext
                        // Context has subcontexts
                        && (contextFilterState[log.context]
                            && contextFilterState[log.context] !== false
                            && contextFilterState[log.context] !== true)
                        // Subcontext is not selected
                        && !contextFilterState[log.context][log.subcontext]) {
                        return;
                    }
                    /* -------------- Tags -------------- */
                    // No tags match
                    if (
                    // Log has at least one tag
                    log.tags.length > 0
                        // No tags match
                        && (log.tags.every((tag) => {
                            return !tagFilterState[tag];
                        }))) {
                        return;
                    }
                    /* ------- Actions and Errors ------- */
                    // Log type doesn't match
                    if (
                    // Filter won't allow all types
                    actionErrorFilterState.type !== undefined
                        // Log type doesn't match
                        && actionErrorFilterState.type !== log.type) {
                        return;
                    }
                    // Filter errors
                    if (log.type === LogType$1.Error) {
                        // Message doesn't match
                        if (
                        // Message exists
                        log.errorMessage
                            // Message filter exists
                            && actionErrorFilterState.errorMessage.trim().length > 0
                            // Message doesn't match
                            && log.errorMessage.toLowerCase().includes(actionErrorFilterState.errorMessage.trim().toLowerCase())) {
                            return;
                        }
                        // Code doesn't match
                        if (
                        // Code exists
                        log.errorCode
                            // Code filter exists
                            && actionErrorFilterState.errorCode.trim().length > 0
                            // Code doesn't match
                            && log.errorCode.toUpperCase().includes(actionErrorFilterState.errorCode.trim().toUpperCase())) {
                            return;
                        }
                    }
                    // Filter actions
                    if (log.type === LogType$1.Action) {
                        // Target isn't selected
                        if (
                        // Target exists
                        log.target
                            // Target isn't selected
                            && !actionErrorFilterState.target[log.target]) {
                            return;
                        }
                        // Action
                        if (
                        // Action exists
                        log.action
                            // Action isn't selected
                            && !actionErrorFilterState.action[log.action]) {
                            return;
                        }
                    }
                    /* --------- Advanced Filter -------- */
                    // First name doesn't match
                    if (
                    // First name exists
                    log.userFirstName
                        // First name query doesn't match
                        && !log.userFirstName.toLowerCase().includes(advancedFilterState.userFirstName.toLowerCase().trim())) {
                        return;
                    }
                    // Last name doesn't match
                    if (
                    // Last name exists
                    log.userLastName
                        // Last name query doesn't match
                        && !log.userLastName.toLowerCase().includes(advancedFilterState.userLastName.toLowerCase().trim())) {
                        return;
                    }
                    // Email doesn't match
                    if (
                    // Email exists
                    log.userEmail
                        // Email query doesn't match
                        && !log.userEmail.toLowerCase().includes(advancedFilterState.userEmail.toLowerCase().trim())) {
                        return;
                    }
                    // User id doesn't match
                    if (
                    // User id exists
                    log.userId
                        // User id doesn't match
                        && !String(log.userId).includes(advancedFilterState.userId.trim())) {
                        return;
                    }
                    // Learner not allowed
                    if (
                    // User is a learner
                    log.isLearner
                        // Learners aren't included
                        && !advancedFilterState.includeLearners) {
                        return;
                    }
                    // TTM not allowed
                    if (
                    // User is a ttm
                    log.isTTM
                        // TTMs aren't included
                        && !advancedFilterState.includeTTMs) {
                        return;
                    }
                    // Admin not allowed
                    if (
                    // User is an admin
                    log.isAdmin
                        // Admins aren't included
                        && !advancedFilterState.includeAdmins) {
                        return;
                    }
                    // Course Id doesn't match
                    if (
                    // Course Id exists
                    log.courseId
                        // Course Id doesn't match
                        && !String(log.courseId).includes(advancedFilterState.courseId.trim())) {
                        return;
                    }
                    // Course name doesn't match
                    if (
                    // Course name exists
                    log.courseName
                        // Course name doesn't match
                        && !String(log.courseName).includes(advancedFilterState.courseName.trim())) {
                        return;
                    }
                    // Mobile filter doesn't match
                    if (
                    // Mobile filter exists
                    advancedFilterState.isMobile !== undefined
                        // Device info exists
                        && log.device
                        // Mobile filter doesn't match
                        && (advancedFilterState.isMobile === log.device.isMobile)) {
                        return;
                    }
                    // Log source doesn't match
                    if (
                    // Source filter exists
                    advancedFilterState.source !== undefined
                        // Source info exists
                        && log.source
                        // Source filter doesn't match
                        && (advancedFilterState.source !== log.source)) {
                        return;
                    }
                    // Route path doesn't match (Only for server source)
                    if (
                    // Source is server
                    (log.source === LogSource$1.Server)
                        // Route path is being filtered
                        && (advancedFilterState.routePath.trim().length)
                        // Route path doesn't match
                        && !(log.routePath.includes(advancedFilterState.routePath.trim()))) {
                        return;
                    }
                    // Route template doesn't match (Only for server source)
                    if (
                    // Source is server
                    (log.source === LogSource$1.Server)
                        // Route template is being filtered
                        && (advancedFilterState.routeTemplate.trim().length)
                        // Route template doesn't match
                        && !(log.routeTemplate.includes(advancedFilterState.routeTemplate.trim()))) {
                        return;
                    }
                    /* -------------- Done -------------- */
                    // Made it past all filters. Add to the list
                    logs.push(log);
                });
            });
        });
        /*----------------------------------------*/
        /*                  Data                  */
        /*----------------------------------------*/
        // Create data table
        const columns = [
            {
                title: 'First Name',
                param: 'userFirstName',
                type: ParamType$1.String,
            },
            {
                title: 'Last Name',
                param: 'userLastName',
                type: ParamType$1.String,
            },
            {
                title: 'Email',
                param: 'userEmail',
                type: ParamType$1.String,
            },
            {
                title: 'Canvas Id',
                param: 'userId',
                type: ParamType$1.Int,
            },
            {
                title: 'Student',
                param: 'isLearner',
                type: ParamType$1.Boolean,
            },
            {
                title: 'Teaching Staff',
                param: 'isTTM',
                type: ParamType$1.Boolean,
                startsHidden: true,
            },
            {
                title: 'Admin',
                param: 'isAdmin',
                type: ParamType$1.Boolean,
                startsHidden: true,
            },
            {
                title: 'Course Canvas Id',
                param: 'courseId',
                type: ParamType$1.Int,
                startsHidden: true,
            },
            {
                title: 'Course Name',
                param: 'courseName',
                type: ParamType$1.String,
            },
            {
                title: 'Browser Name',
                param: 'browser.name',
                type: ParamType$1.String,
                startsHidden: true,
            },
            {
                title: 'Browser Version',
                param: 'browser.version',
                type: ParamType$1.String,
                startsHidden: true,
            },
            {
                title: 'OS',
                param: 'device.os',
                type: ParamType$1.String,
                startsHidden: true,
            },
            {
                title: 'Mobile',
                param: 'device.isMobile',
                type: ParamType$1.Boolean,
                startsHidden: true,
            },
            {
                title: 'Year',
                param: 'year',
                type: ParamType$1.Int,
            },
            {
                title: 'Month',
                param: 'month',
                type: ParamType$1.Int,
            },
            {
                title: 'Day',
                param: 'day',
                type: ParamType$1.Int,
            },
            {
                title: 'Hour',
                param: 'hour',
                type: ParamType$1.Int,
            },
            {
                title: 'Minute',
                param: 'minute',
                type: ParamType$1.Int,
                startsHidden: true,
            },
            {
                title: 'Timestamp',
                param: 'timestamp',
                type: ParamType$1.Int,
                startsHidden: true,
            },
            {
                title: 'Context',
                param: 'context',
                type: ParamType$1.String,
            },
            {
                title: 'Subcontext',
                param: 'subcontext',
                type: ParamType$1.String,
            },
            {
                title: 'Tags',
                param: 'tags',
                type: ParamType$1.JSON,
                startsHidden: true,
            },
            {
                title: 'Log Level',
                param: 'level',
                type: ParamType$1.String,
                startsHidden: true,
            },
            {
                title: 'Metadata',
                param: 'metadata',
                type: ParamType$1.JSON,
                startsHidden: true,
            },
            {
                title: 'Source',
                param: 'source',
                type: ParamType$1.String,
            },
            {
                title: 'Server Route Path',
                param: 'routePath',
                type: ParamType$1.String,
                startsHidden: true,
            },
            {
                title: 'Server Route Template',
                param: 'routeTemplate',
                type: ParamType$1.String,
                startsHidden: true,
            },
            {
                title: 'Type',
                param: 'type',
                type: ParamType$1.String,
            },
            {
                title: 'Error Message',
                param: 'errorMessage',
                type: ParamType$1.String,
                startsHidden: true,
            },
            {
                title: 'Error Code',
                param: 'errorCode',
                type: ParamType$1.String,
                startsHidden: true,
            },
            {
                title: 'Error Stack',
                param: 'errorStack',
                type: ParamType$1.String,
                startsHidden: true,
            },
            {
                title: 'Action Target',
                param: 'target',
                type: ParamType$1.String,
                startsHidden: true,
            },
            {
                title: 'Action Type',
                param: 'action',
                type: ParamType$1.String,
                startsHidden: true,
            },
        ];
        // Create intelliTable
        const dataTable = (logs.length === 0
            ? (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement("h3", { className: "m-0" }, "Matching Logs:"),
                React__default["default"].createElement("div", { className: "alert alert-warning text-center" },
                    React__default["default"].createElement("h4", { className: "m-1" }, "No Logs to Show"),
                    React__default["default"].createElement("div", null, "Either your filters are too strict or no matching logs have been created yet."))))
            : (React__default["default"].createElement(IntelliTable, { title: "Matching Logs:", id: "logs", data: logs, columns: columns })));
        // Main body
        body = (React__default["default"].createElement(React__default["default"].Fragment, null,
            filters,
            dataTable));
    }
    /* ---------- Wrap in Modal --------- */
    return (React__default["default"].createElement("div", { className: "LogReviewer-outer-container" },
        React__default["default"].createElement("style", null, style),
        React__default["default"].createElement("div", { className: "LogReviewer-inner-container" },
            React__default["default"].createElement("div", { className: "LogReviewer-header" },
                React__default["default"].createElement("div", { className: "LogReviewer-header-title" },
                    React__default["default"].createElement("h3", { className: "text-center m-0" }, "Log Review Dashboard")),
                React__default["default"].createElement("button", { type: "button", className: "LogReviewer-header-close-button btn btn-dark btn-lg", "aria-label": "close log reviewer panel", onClick: onClose },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faTimes }))),
            React__default["default"].createElement("div", { className: "LogReviewer-contents" }, body))));
};

/**
 * One minute in ms
 * @author Gabe Abrams
 */
const MINUTE_IN_MS = 60000;

/**
 * One hour in ms
 * @author Gabe Abrams
 */
const HOUR_IN_MS = 3600000;

/**
 * One day in ms
 * @author Gabe Abrams
 */
const DAY_IN_MS = 86400000;

/**
 * Shorten text so it fits into a certain number of chars
 * @author Gabe Abrams
 * @param text the text to abbreviate
 * @param maxChars the maximum number of chars to include
 * @returns abbreviated text with length no greater than maxChars
 *   (including ellipses if applicable)
 */
const abbreviate = (text, maxChars) => {
    // Check if already short enough
    if (text.trim().length < maxChars) {
        return text.trim();
    }
    // Abbreviate
    const shortenedText = (text
        .trim()
        .substring(0, maxChars - 3)
        .trim());
    return `${shortenedText}...`;
};

/**
 * Sum the numbers in an array
 * @author Gabe Abrams
 * @param nums the numbers to sum
 * @returns the sum of the numbers
 */
const sum = (nums) => {
    return nums.reduce((a, b) => {
        return (a + b);
    }, 0);
};

/**
 * Get the average of a set of numbers
 * @author Gabe Abrams
 * @param nums the numbers to average
 * @returns average value or 0 if no numbers
 */
const avg = (nums) => {
    // Handle empty array case
    if (nums.length === 0) {
        return 0;
    }
    // Get the total value
    const total = sum(nums);
    // Get average
    return (total / nums.length);
};

/**
 * Round a number (ceiling) to a certain number of decimals
 * @author Gabe Abrams
 * @param num the number to round
 * @param numDecimals the number of decimals to round to
 * @returns rounded number
 */
const ceilToNumDecimals = (num, numDecimals) => {
    const rounder = 10 ** numDecimals;
    return (Math.ceil(num * rounder) / rounder);
};

/**
 * Round a number (floor) to a certain number of decimals
 * @author Gabe Abrams
 * @param num the number to round
 * @param numDecimals the number of decimals to round to
 * @returns rounded number
 */
const floorToNumDecimals = (num, numDecimals) => {
    const rounder = 10 ** numDecimals;
    return (Math.floor(num * rounder) / rounder);
};

/**
 * Pad a number's decimal with zeros on the right
 *   (e.g. 5.2 becomes 5.20 with 2 digit padding)
 * @author Gabe Abrams
 * @param num the number to pad
 * @param numDigits the minimum number of digits after the decimal
 * @returns padded number
 */
const padDecimalZeros = (num, numDigits) => {
    // Skip if nothing to do
    if (numDigits < 1) {
        return String(num);
    }
    // Convert to string
    let out = String(num);
    // Add a decimal point if there isn't one
    if (!out.includes('.')) {
        out += '.';
    }
    // Add zeros
    while (out.split('.')[1].length < numDigits) {
        out = `${out}0`;
    }
    // Return
    return out;
};

/**
 * Pad a number with zeros on the left (e.g. 5 becomes 05 with 2 digit padding)
 * @author Gabe Abrams
 * @param num the number to pad
 * @param numDigits the minimum number of digits before the decimal
 * @returns padded number
 */
const padZerosLeft = (num, numDigits) => {
    // Convert to string
    let out = String(num);
    // Add zeros
    while (out.split('.')[0].length < numDigits) {
        out = `0${out}`;
    }
    // Return
    return out;
};

/**
 * Route for checking the status of the current user's
 *   access to log review
 * @author Gabe Abrams
 */
const LOG_REVIEW_STATUS_ROUTE = `${ROUTE_PATH_PREFIX}/logs/access_allowed`;

// Stored copy of caccl functions
let _cacclGetLaunchInfo;
// Stored copy of dce-mango log collection
let _logCollection;
/*------------------------------------------------------------------------*/
/*                                 Helpers                                */
/*------------------------------------------------------------------------*/
/**
 * Get launch info via CACCL
 * @author Gabe Abrams
 * @param req express request object
 * @returns object { launched, launchInfo }
 */
const cacclGetLaunchInfo = (req) => {
    if (!_cacclGetLaunchInfo) {
        throw new ErrorWithCode('Could not get launch info because server was not initialized with dce-reactkit\'s initServer function', ReactKitErrorCode$1.NoCACCLGetLaunchInfoFunction);
    }
    return _cacclGetLaunchInfo(req);
};
/**
 * Get log collection
 * @author Gabe Abrams
 * @returns log collection if one was included during launch or null if we don't
 *   have a log collection (yet)
 */
const internalGetLogCollection = () => {
    return _logCollection !== null && _logCollection !== void 0 ? _logCollection : null;
};
/*------------------------------------------------------------------------*/
/*                                  Main                                  */
/*------------------------------------------------------------------------*/
/**
 * Prepare dce-reactkit to run on the server
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.app express app from inside of the postprocessor function that
 *   we will add routes to
 * @param opts.getLaunchInfo CACCL LTI's get launch info function
 * @param [opts.logCollection] mongo collection from dce-mango to use for
 *   storing logs. If none is included, logs are written to the console
 * @param [opts.logReviewAdmins=all] info on which admins can review
 *   logs from the client. If not included, all Canvas admins are allowed to
 *   review logs. If null, no Canvas admins are allowed to review logs.
 *   If an array of Canvas userIds (numbers), only Canvas admins with those
 *   userIds are allowed to review logs. If a dce-mango collection, only
 *   Canvas admins with entries in that collection ({ userId, ...}) are allowed
 *   to review logs
 */
const initServer = (opts) => {
    _cacclGetLaunchInfo = opts.getLaunchInfo;
    _logCollection = opts.logCollection;
    /*----------------------------------------*/
    /*                Logging                 */
    /*----------------------------------------*/
    /**
     * Log an event
     * @author Gabe Abrams
     * @param {string} context Context of the event (each app determines how to
     *   organize its contexts)
     * @param {string} subcontext Subcontext of the event (each app determines
     *   how to organize its subcontexts)
     * @param {string} tags stringified list of tags that apply to this action
     *   (each app determines tag usage)
     * @param {string} metadata stringified object containing optional custom metadata
     * @param {string} level log level
     * @param {string} [errorMessage] error message if type is an error
     * @param {string} [errorCode] error code if type is an error
     * @param {string} [errorStack] error stack if type is an error
     * @param {string} [target] Target of the action (each app determines the list
     *   of targets) These are usually buttons, panels, elements, etc.
     * @param {LogAction} [action] the type of action performed on the target
     * @returns {Log}
     */
    opts.app.post(LOG_ROUTE_PATH, genRouteHandler({
        paramTypes: {
            context: ParamType$1.String,
            subcontext: ParamType$1.String,
            tags: ParamType$1.JSON,
            level: ParamType$1.String,
            metadata: ParamType$1.JSON,
            errorMessage: ParamType$1.StringOptional,
            errorCode: ParamType$1.StringOptional,
            errorStack: ParamType$1.StringOptional,
            target: ParamType$1.StringOptional,
            action: ParamType$1.StringOptional,
        },
        handler: ({ params, logServerEvent }) => {
            // Create log info
            const logInfo = ((params.errorMessage || params.errorCode || params.errorStack)
                // Error
                ? {
                    context: params.context,
                    subcontext: params.subcontext,
                    tags: params.tags,
                    level: params.level,
                    metadata: params.metadata,
                    error: {
                        message: params.errorMessage,
                        code: params.errorCode,
                        stack: params.errorStack,
                    },
                }
                // Action
                : {
                    context: params.context,
                    subcontext: params.subcontext,
                    tags: params.tags,
                    level: params.level,
                    metadata: params.metadata,
                    target: params.target,
                    action: params.action,
                });
            // Add hidden boolean to change source to "client"
            const logInfoForcedFromClient = Object.assign(Object.assign({}, logInfo), { overrideAsClientEvent: true });
            // Write the log
            const log = logServerEvent(logInfoForcedFromClient);
            // Return
            return log;
        },
    }));
    /*----------------------------------------*/
    /*              Log Reviewer              */
    /*----------------------------------------*/
    /**
     * Check if a given user is allowed to review logs
     * @author Gabe Abrams
     * @param userId the id of the user
     * @param isAdmin if true, the user is an admin
     * @returns true if the user can review logs
     */
    const canReviewLogs = (userId, isAdmin) => __awaiter(void 0, void 0, void 0, function* () {
        // Immediately deny access if user is not an admin
        if (!isAdmin) {
            return false;
        }
        // If all admins are allowed, we're done
        if (!opts.logReviewAdmins) {
            return true;
        }
        // Do a dynamic check
        try {
            // Array of userIds
            if (Array.isArray(opts.logReviewAdmins)) {
                return opts.logReviewAdmins.some((allowedId) => {
                    return (userId === allowedId);
                });
            }
            // Must be a collection
            const matches = yield opts.logReviewAdmins.find({ userId });
            // Make sure at least one entry matches
            return matches.length > 0;
        }
        catch (err) {
            // If an error occurred, simply return false
            return false;
        }
    });
    /**
     * Check if the current user has access to logs
     * @author Gabe Abrams
     * @returns {boolean} true if user has access
     */
    opts.app.get(LOG_REVIEW_STATUS_ROUTE, genRouteHandler({
        handler: ({ params }) => __awaiter(void 0, void 0, void 0, function* () {
            const { userId, isAdmin } = params;
            const canReview = yield canReviewLogs(userId, isAdmin);
            return canReview;
        }),
    }));
    /**
     * Get all logs for a certain month
     * @author Gabe Abrams
     * @param {number} year the year to query (e.g. 2022)
     * @param {number} month the month to query (e.g. 1 = January)
     * @returns {Log[]} list of logs from the given month
     */
    opts.app.get(`${LOG_REVIEW_ROUTE_PATH_PREFIX}/years/:year/months/:month`, genRouteHandler({
        paramTypes: {
            year: ParamType$1.Int,
            month: ParamType$1.Int,
        },
        handler: ({ params }) => __awaiter(void 0, void 0, void 0, function* () {
            // Get user info
            const { year, month, userId, isAdmin, } = params;
            // Validate user
            const canReview = yield canReviewLogs(userId, isAdmin);
            if (!canReview) {
                throw new ErrorWithCode('You cannot access this resource because you do not have the appropriate permissions.', ReactKitErrorCode$1.NotAllowedToReviewLogs);
            }
            // Query for logs
            const logs = yield _logCollection.find({
                year,
                month,
            });
            // Return logs
            return logs;
        }),
    }));
};

// Import shared types
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
const handleError = (res, error) => {
    // Get the error message
    let message;
    if (error && error.message) {
        message = (error.message || 'An unknown error occurred.');
    }
    else if (typeof error === 'string') {
        message = (error.trim().length > 0
            ? error
            : 'An unknown error occurred.');
    }
    else {
        message = 'An unknown error occurred.';
    }
    // Get the error code
    const code = (error.code || ReactKitErrorCode$1.NoCode);
    // Get the status code
    const status = (error.status || 500);
    // Respond to user
    res
        // Set the http status code
        .status(status)
        // Send a JSON response
        .json({
        // Error message
        message,
        // Error code
        code,
        // Success = false flag so client can detect server-side errors
        success: false,
    });
    return undefined;
};

/**
 * Send successful API response
 * @author Gabe Abrams
 * @param res express response
 * @param body the body of the response to send to the client
 */
const handleSuccess = (res, body) => {
    // Send a http 200 json response
    res.json({
        // Include the body as a parameter
        body,
        // Success = true flag so client can detect successful responses
        success: true,
    });
    return undefined;
};

// Import shared types
/**
 * Generate a static error page
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param [opts.title=An Error Occurred] title of the error box
 * @param [opts.description=An unknown server error occurred. Please contact support.]
 *   a human-readable description of the error
 * @param [opts.code=ReactKitErrorCode.NoCode] error code to show
 * @param [opts.pageTitle=opts.title] title of the page/tab if it differs from
 *   the title of the error
 * @returns html of the page
 */
const genErrorPage = (opts = {}) => {
    var _a, _b, _c, _d;
    const title = ((_a = opts.title) !== null && _a !== void 0 ? _a : 'An Error Occurred');
    const pageTitle = ((_b = opts.pageTitle) !== null && _b !== void 0 ? _b : title);
    const description = ((_c = opts.description) !== null && _c !== void 0 ? _c : 'An unknown server error occurred. Please contact support.');
    const code = ((_d = opts.code) !== null && _d !== void 0 ? _d : ReactKitErrorCode$1.NoCode);
    return `
<head>
  <!-- Metadata -->
  <meta
    name="viewport"
    content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
  >

  <!-- Title -->
  <title>${pageTitle}</title>

  <!-- Bootstrap -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.1/css/bootstrap.min.css"
    integrity="sha512-siwe/oXMhSjGCwLn+scraPOWrJxHlUgMBMZXdPe2Tnk3I0x3ESCoLz7WZ5NTH6SZrywMY+PB1cjyqJ5jAluCOg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.1/js/bootstrap.min.js"
    integrity="sha512-vyRAVI0IEm6LI/fVSv/Wq/d0KUfrg3hJq2Qz5FlfER69sf3ZHlOrsLriNm49FxnpUGmhx+TaJKwJ+ByTLKT+Yg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  ></script>

  <!-- FontAwesome -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
    integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />

  <!-- Style -->
  <style>
    .DCEReactKit-pop-in {
      animation-name: DCEReactKit-pop-in;
      animation-duration: 0.5s;
      animation-iteration-count: 1;
      animation-timing-function: ease-out;
      animation-fill-mode: both;

      transform-origin: center;
    }

    @keyframes DCEReactKit-pop-in {
      0% {
        opacity: 0;
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    .DCEReactKit-slide-in {
      animation-name: DCEReactKit-slide-in;
      animation-duration: 1s;
      animation-iteration-count: 1;
      animation-timing-function: ease-out;
      animation-fill-mode: both;
      animation-delay: 0.2s;
    }

    @keyframes DCEReactKit-slide-in {
      0% {
        opacity: 0;
        transform: translate(0, 0.3em);
      }
      100% {
        opacity: 1;
        transform: translate(0, 0);
      }
    }
  </style>
</head>

<!-- Body -->
<body class="bg-dark text-center pt-3 ps-3 pe-3">
  <!-- Alert -->
  <div
    class="DCEReactKit-pop-in alert alert-warning d-inline-block"
    style="width: 50em; max-width: 100%"
  >
    <!-- Title -->
    <h2>
      <i class="me-1 fa-solid fa-triangle-exclamation"></i>
      ${title}
    </h2>
    <!-- Description -->
    <div>
      ${description}
    </div>
  </div>

  <!-- Error Code -->
  <div class="DCEReactKit-slide-in text-light">
    <strong>
      Error Code:
    </strong>
    ${code}
  </div>
</body>
  `;
};

/**
 * Perform a rudimentary parsing of the user's browser agent string
 * @author Gabe Abrams
 * @param userAgent the user's browser agent
 * @returns user info
 */
const parseUserAgent = (userAgent) => {
    /* ------------- Browser ------------ */
    let browser = {
        name: 'Unknown',
        version: 'Unknown',
    };
    // Parse user agent
    let verOffset;
    let nameOffset;
    if ((verOffset = userAgent.indexOf('Opera')) !== -1) {
        // In Opera, the true version is after 'Opera' or after 'Version'
        browser = {
            name: 'Opera',
            version: userAgent.substring(verOffset + 6),
        };
        if ((verOffset = userAgent.indexOf('Version')) !== -1) {
            browser.version = userAgent.substring(verOffset + 8);
        }
    }
    else if ((verOffset = userAgent.indexOf('MSIE')) !== -1) {
        // In MSIE, the true version is after 'MSIE' in userAgent
        browser = {
            name: 'Internet Explorer',
            version: userAgent.substring(verOffset + 5),
        };
    }
    else if ((verOffset = userAgent.indexOf('Chrome')) !== -1) {
        // In Chrome, the true version is after 'Chrome'
        browser = {
            name: 'Chrome',
            version: userAgent.substring(verOffset + 7),
        };
    }
    else if ((verOffset = userAgent.indexOf('Safari')) !== -1) {
        // In Safari, the true version is after 'Safari' or after 'Version'
        browser = {
            name: 'Safari',
            version: userAgent.substring(verOffset + 7),
        };
        if ((verOffset = userAgent.indexOf('Version')) !== -1) {
            browser.version = userAgent.substring(verOffset + 8);
        }
    }
    else if ((verOffset = userAgent.indexOf('Firefox')) != -1) {
        // In Firefox, the true version is after 'Firefox'
        browser = {
            name: 'Firefox',
            version: userAgent.substring(verOffset + 8),
        };
    }
    else if ((nameOffset = userAgent.lastIndexOf(' ') + 1)
        < (verOffset = userAgent.lastIndexOf('/'))) {
        browser = {
            name: userAgent.substring(nameOffset, verOffset),
            version: userAgent.substring(verOffset + 1),
        };
    }
    // Postprocess version
    // trim the fullVersion string at semicolon/space if present
    let ix;
    if ((ix = browser.version.indexOf(';')) !== -1) {
        browser.version = browser.version.substring(0, ix);
    }
    if ((ix = browser.version.indexOf(' ')) !== -1) {
        browser.version = browser.version.substring(0, ix);
    }
    /* ------------- Device ------------- */
    // Detect os
    let os = 'Unknown';
    if (userAgent.includes('Linux')) {
        os = 'Linux';
    }
    else if (userAgent.includes('like Mac')) {
        os = 'iOS';
    }
    else if (userAgent.includes('Mac')) {
        os = 'Mac';
    }
    else if (userAgent.includes('Android')) {
        os = 'Android';
    }
    else if (userAgent.includes('Win')) {
        os = 'Win';
    }
    // Check if mobile
    const isMobile = !!userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
    // Device
    const device = {
        isMobile,
        os,
    };
    /* ------------- Finish ------------- */
    // Return info
    return {
        browser,
        device,
    };
};

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
const genRouteHandler = (opts) => {
    // Return a route handler
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        // Output params
        const output = {};
        /*----------------------------------------*/
        /*              Parse Params              */
        /*----------------------------------------*/
        // Process items one by one
        const paramList = Object.entries((_a = opts.paramTypes) !== null && _a !== void 0 ? _a : {});
        for (let i = 0; i < paramList.length; i++) {
            const [name, type] = paramList[i];
            // Find the value as a string
            const value = (req.params[name]
                || req.query[name]
                || req.body[name]);
            // Parse
            if (type === ParamType$1.Boolean || type === ParamType$1.BooleanOptional) {
                // Boolean
                // Handle case where value doesn't exist
                if (value === undefined) {
                    if (type === ParamType$1.BooleanOptional) {
                        output[name] = undefined;
                    }
                    else {
                        return handleError(res, {
                            message: `Parameter ${name} is required, but it was not included.`,
                            code: ReactKitErrorCode$1.MissingParameter,
                            status: 422,
                        });
                    }
                }
                else {
                    // Value exists
                    // Simplify value
                    const simpleVal = (String(value)
                        .trim()
                        .toLowerCase());
                    // Parse
                    output[name] = ([
                        'true',
                        'yes',
                        'y',
                        '1',
                        't',
                    ].indexOf(simpleVal) >= 0);
                }
            }
            else if (type === ParamType$1.Float || type === ParamType$1.FloatOptional) {
                // Float
                // Handle case where value doesn't exist
                if (value === undefined) {
                    if (type === ParamType$1.FloatOptional) {
                        output[name] = undefined;
                    }
                    else {
                        return handleError(res, {
                            message: `Parameter ${name} is required, but it was not included.`,
                            code: ReactKitErrorCode$1.MissingParameter,
                            status: 422,
                        });
                    }
                }
                else if (!Number.isNaN(Number.parseFloat(String(value)))) {
                    // Value is a number
                    output[name] = Number.parseFloat(String(value));
                }
                else {
                    // Issue!
                    return handleError(res, {
                        message: `Request data was malformed: ${name} was not a valid float.`,
                        code: ReactKitErrorCode$1.InvalidParameter,
                        status: 422,
                    });
                }
            }
            else if (type === ParamType$1.Int || type === ParamType$1.IntOptional) {
                // Int
                // Handle case where value doesn't exist
                if (value === undefined) {
                    if (type === ParamType$1.IntOptional) {
                        output[name] = undefined;
                    }
                    else {
                        return handleError(res, {
                            message: `Parameter ${name} is required, but it was not included.`,
                            code: ReactKitErrorCode$1.MissingParameter,
                            status: 422,
                        });
                    }
                }
                else if (!Number.isNaN(Number.parseInt(String(value), 10))) {
                    // Value is a number
                    output[name] = Number.parseInt(String(value), 10);
                }
                else {
                    // Issue!
                    return handleError(res, {
                        message: `Request data was malformed: ${name} was not a valid int.`,
                        code: ReactKitErrorCode$1.InvalidParameter,
                        status: 422,
                    });
                }
            }
            else if (type === ParamType$1.JSON || type === ParamType$1.JSONOptional) {
                // Stringified JSON
                // Handle case where value doesn't exist
                if (value === undefined) {
                    if (type === ParamType$1.JSONOptional) {
                        output[name] = undefined;
                    }
                    else {
                        return handleError(res, {
                            message: `Parameter ${name} is required, but it was not included.`,
                            code: ReactKitErrorCode$1.MissingParameter,
                            status: 422,
                        });
                    }
                }
                else {
                    // Value exists
                    // Parse
                    try {
                        output[name] = JSON.parse(String(value));
                    }
                    catch (err) {
                        return handleError(res, {
                            message: `Request data was malformed: ${name} was not a valid JSON payload.`,
                            code: ReactKitErrorCode$1.InvalidParameter,
                            status: 422,
                        });
                    }
                }
            }
            else if (type === ParamType$1.String || type === ParamType$1.StringOptional) {
                // String
                // Handle case where value doesn't exist
                if (value === undefined) {
                    if (type === ParamType$1.StringOptional) {
                        output[name] = undefined;
                    }
                    else {
                        return handleError(res, {
                            message: `Parameter ${name} is required, but it was not included.`,
                            code: ReactKitErrorCode$1.MissingParameter,
                            status: 422,
                        });
                    }
                }
                else {
                    // Value exists
                    // Leave as is
                    output[name] = value;
                }
            }
            else {
                // No valid data type
                return handleError(res, {
                    message: `An internal error occurred: we could not determine the type of ${name}.`,
                    code: ReactKitErrorCode$1.InvalidParameter,
                    status: 422,
                });
            }
        }
        /*----------------------------------------*/
        /*               Launch Info              */
        /*----------------------------------------*/
        // Get launch info
        const { launched, launchInfo } = cacclGetLaunchInfo(req);
        if (
        // Not launched
        (!launched || !launchInfo)
            // Not skipping the session check
            && !opts.skipSessionCheck) {
            return handleError(res, {
                message: 'Your session has expired. Please refresh the page and try again.',
                code: ReactKitErrorCode$1.SessionExpired,
                status: 401,
            });
        }
        // Error if user info cannot be found
        if (
        // User information is incomplete
        (!launchInfo
            || !launchInfo.userId
            || !launchInfo.userFirstName
            || !launchInfo.userLastName
            || (launchInfo.notInCourse
                && !launchInfo.isAdmin)
            || (!launchInfo.isTTM
                && !launchInfo.isLearner
                && !launchInfo.isAdmin))
            // Not skipping the session check
            && !opts.skipSessionCheck) {
            return handleError(res, {
                message: 'Your session was invalid. Please refresh the page and try again.',
                code: ReactKitErrorCode$1.SessionExpired,
                status: 401,
            });
        }
        // Add launch info to output
        output.userId = (launchInfo
            ? launchInfo.userId
            : undefined);
        output.userFirstName = (launchInfo
            ? launchInfo.userFirstName
            : undefined);
        output.userLastName = (launchInfo
            ? launchInfo.userLastName
            : undefined);
        output.userEmail = (launchInfo
            ? launchInfo.userEmail
            : undefined);
        output.isLearner = (launchInfo
            ? !!launchInfo.isLearner
            : undefined);
        output.isTTM = (launchInfo
            ? !!launchInfo.isTTM
            : undefined);
        output.isAdmin = (launchInfo
            ? !!launchInfo.isAdmin
            : undefined);
        output.courseId = (launchInfo
            ? ((_b = output.courseId) !== null && _b !== void 0 ? _b : launchInfo.courseId)
            : undefined);
        output.courseName = (launchInfo
            ? launchInfo.contextLabel
            : undefined);
        // Add other session variables
        Object.keys(req.session).forEach((propName) => {
            // Skip if prop already in output
            if (output[propName] !== undefined) {
                return;
            }
            // Add to output
            const value = req.session[propName];
            if (typeof value === 'string'
                || typeof value === 'boolean'
                || typeof value === 'number') {
                output[propName] = value;
            }
        });
        /*----------------------------------------*/
        /*       Require Course Consistency       */
        /*----------------------------------------*/
        // Make sure the user actually launched from the appropriate course
        if (output.courseId
            && launchInfo
            && launchInfo.courseId
            && output.courseId !== launchInfo.courseId
            && !output.isTTM
            && !output.isAdmin) {
            // Course of interest is not the launch course
            return handleError(res, {
                message: 'You switched sessions by opening this app in another tab. Please refresh the page and try again.',
                code: ReactKitErrorCode$1.WrongCourse,
                status: 401,
            });
        }
        /*----------------------------------------*/
        /*       Require Proper Permissions       */
        /*----------------------------------------*/
        // Add TTM endpoint security
        if (
        // This is a TTM endpoint
        req.path.startsWith('/api/ttm')
            // User is not a TTM
            && (
            // User is not a TTM
            !output.isTTM
                // User is not an admin
                && !output.isAdmin)) {
            // User does not have access
            return handleError(res, {
                message: 'This action is only allowed if you are a teaching team member for the course. Please go back to Canvas, log in as a teaching team member, and try again.',
                code: ReactKitErrorCode$1.NotTTM,
                status: 401,
            });
        }
        // Add Admin endpoint security
        if (
        // This is an admin endpoint
        req.path.startsWith('/api/admin')
            // User is not an admin
            && !output.isAdmin) {
            // User does not have access
            return handleError(res, {
                message: 'This action is only allowed if you are a Canvas admin. Please go back to Canvas, log in as an admin, and try again.',
                code: ReactKitErrorCode$1.NotAdmin,
                status: 401,
            });
        }
        /*----------------------------------------*/
        /*               Log Handler              */
        /*----------------------------------------*/
        // Create a log handler function
        /**
         * Log an event on the server
         * @author Gabe Abrams
         */
        const logServerEvent = (opts) => __awaiter(void 0, void 0, void 0, function* () {
            var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
            // NOTE: internally, we slip through an opts.overrideAsClientEvent boolean
            // that indicates that this is actually a client event, but we don't
            // include that in the LogFunction type because this is internal and
            // hidden from users
            try {
                // Parse user agent
                const { browser, device, } = parseUserAgent(req.headers['user-agent']);
                // Get time info in ET
                const { timestamp, year, month, day, hour, minute, } = getTimeInfoInET();
                // Main log info
                const mainLogInfo = {
                    id: `${launchInfo.userId}-${Date.now()}-${Math.floor(Math.random() * 100000)}-${Math.floor(Math.random() * 100000)}`,
                    userFirstName: launchInfo.userFirstName,
                    userLastName: launchInfo.userLastName,
                    userEmail: launchInfo.userEmail,
                    userId: launchInfo.userId,
                    isLearner: !!launchInfo.isLearner,
                    isAdmin: !!launchInfo.isAdmin,
                    isTTM: !!launchInfo.isTTM,
                    courseId: launchInfo.courseId,
                    courseName: launchInfo.courseName,
                    browser,
                    device,
                    year,
                    month,
                    day,
                    hour,
                    minute,
                    timestamp,
                    context: (typeof opts.context === 'string'
                        ? opts.context
                        : ((_d = ((_c = opts.context) !== null && _c !== void 0 ? _c : {})._) !== null && _d !== void 0 ? _d : LogBuiltInMetadata.Context.Uncategorized)),
                    subcontext: ((_e = opts.subcontext) !== null && _e !== void 0 ? _e : LogBuiltInMetadata.Context.Uncategorized),
                    tags: ((_f = opts.tags) !== null && _f !== void 0 ? _f : []),
                    level: ((_g = opts.level) !== null && _g !== void 0 ? _g : LogLevel$1.Info),
                    metadata: ((_h = opts.metadata) !== null && _h !== void 0 ? _h : {}),
                };
                // Type-specific info
                const typeSpecificInfo = (('error' in opts && opts.error)
                    ? {
                        type: LogType$1.Error,
                        errorMessage: (_j = opts.error.message) !== null && _j !== void 0 ? _j : 'Unknown message',
                        errorCode: (_k = opts.error.code) !== null && _k !== void 0 ? _k : ReactKitErrorCode$1.NoCode,
                        errorStack: (_l = opts.error.stack) !== null && _l !== void 0 ? _l : 'No stack',
                    }
                    : {
                        type: LogType$1.Action,
                        target: ((_m = opts.target) !== null && _m !== void 0 ? _m : LogBuiltInMetadata.Target.NoSpecificTarget),
                        action: ((_o = opts.action) !== null && _o !== void 0 ? _o : LogAction$1.Unknown),
                    });
                // Source-specific info
                const sourceSpecificInfo = (opts.overrideAsClientEvent
                    ? {
                        source: LogSource$1.Client,
                    }
                    : {
                        source: LogSource$1.Server,
                        routePath: req.path,
                        routeTemplate: req.route.path,
                    });
                // Build log event
                const log = Object.assign(Object.assign(Object.assign({}, mainLogInfo), typeSpecificInfo), sourceSpecificInfo);
                // Either print to console or save to db
                const logCollection = internalGetLogCollection();
                if (logCollection) {
                    // Store to the log collection
                    yield logCollection.insert(log);
                }
                else {
                    // Print to console
                    if (log.type === LogType$1.Error) {
                        console.error('dce-reactkit error log:', log);
                    }
                    else {
                        console.log('dce-reactkit action log:', log);
                    }
                }
                // Return log entry
                return log;
            }
            catch (err) {
                // Print because we cannot store the error
                console.error('Could not log the following:', opts);
                // Create a dummy log to return
                const dummyMainInfo = {
                    id: '-1',
                    userFirstName: 'Unknown',
                    userLastName: 'Unknown',
                    userEmail: 'unknown@harvard.edu',
                    userId: 1,
                    isLearner: false,
                    isAdmin: false,
                    isTTM: false,
                    courseId: 1,
                    courseName: 'Unknown',
                    browser: {
                        name: 'Unknown',
                        version: 'Unknown',
                    },
                    device: {
                        isMobile: false,
                        os: 'Unknown',
                    },
                    year: 1,
                    month: 1,
                    day: 1,
                    hour: 1,
                    minute: 1,
                    timestamp: Date.now(),
                    tags: [],
                    level: LogLevel$1.Warn,
                    metadata: {},
                    context: LogBuiltInMetadata.Context.Uncategorized,
                    subcontext: LogBuiltInMetadata.Context.Uncategorized,
                };
                const dummyTypeSpecificInfo = {
                    type: LogType$1.Error,
                    errorMessage: 'Unknown',
                    errorCode: 'Unknown',
                    errorStack: 'No Stack',
                };
                const dummySourceSpecificInfo = {
                    source: LogSource$1.Server,
                    routePath: req.path,
                    routeTemplate: req.route.path,
                };
                const log = Object.assign(Object.assign(Object.assign({}, dummyMainInfo), dummyTypeSpecificInfo), dummySourceSpecificInfo);
                return log;
            }
        });
        /*------------------------------------------------------------------------*/
        /*                              Call handler                              */
        /*------------------------------------------------------------------------*/
        // Keep track of whether a response was already sent
        let responseSent = false;
        /**
         * Redirect the user to another path or url
         * @author Gabe Abrams
         * @param pathOrURL the path or url to redirect to
         */
        const redirect = (pathOrURL) => {
            responseSent = true;
            res.redirect(pathOrURL);
        };
        /**
         * Send text to the client (with an optional status code)
         * @author Gabe Abrams
         * @param text the text to send to the client
         * @parm [status=200] the http status code to send
         */
        const send = (text, status = 200) => {
            responseSent = true;
            res.status(status).send(text);
        };
        /**
         * Render an error page
         * @author Gabe Abrams
         * @param opts object containing all arguments
         * @param [opts.title=An Error Occurred] title of the error box
         * @param [opts.description=An unknown server error occurred. Please contact support.]
         *   a human-readable description of the error
         * @param [opts.code=ReactKitErrorCode.NoCode] error code to show
         * @param [opts.pageTitle=opts.title] title of the page/tab if it differs from
         *   the title of the error
         * @param [opts.status=500] http status code
         */
        const renderErrorPage = (opts = {}) => {
            var _a, _b;
            const html = genErrorPage(opts);
            send(html, (_a = opts.status) !== null && _a !== void 0 ? _a : 500);
            // Log
            logServerEvent({
                context: LogBuiltInMetadata.Context.ServerRenderedErrorPage,
                error: {
                    message: `${opts.title}: ${opts.description}`,
                    code: opts.code,
                },
                metadata: {
                    title: opts.title,
                    description: opts.description,
                    code: opts.code,
                    pageTitle: opts.pageTitle,
                    status: (_b = opts.status) !== null && _b !== void 0 ? _b : 500,
                },
            });
        };
        // Call the handler
        try {
            const results = yield opts.handler({
                params: output,
                req,
                send,
                next: () => {
                    responseSent = true;
                    next();
                },
                redirect,
                renderErrorPage,
                logServerEvent,
            });
            // Send results to client (only if next wasn't called)
            if (!responseSent) {
                return handleSuccess(res, results !== null && results !== void 0 ? results : undefined);
            }
        }
        catch (err) {
            // Send error to client (only if next wasn't called)
            if (!responseSent) {
                handleError(res, err);
                // Log server-side error
                logServerEvent({
                    context: LogBuiltInMetadata.Context.ServerEndpointError,
                    error: err,
                });
                return;
            }
            // Log error that was not responded with
            console.log('Error occurred but could not be sent to client because a response was already sent:', err);
        }
    });
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
const stubServerEndpoint = _setStubResponse;

/**
 * Start a dynamic wait, call the function once the operation has completed and
 *   the dynamic wait will continue waiting for the rest of the minimum time
 * @author Gabe Abrams
 * @param minWaitMs the minimum number of ms to wait
 * @returns async function to call to finish the wait
 */
const startMinWait = (minWaitMs) => {
    const startTimestamp = Date.now();
    /**
     * Finish the remaining time to wait
     * @author Gabe Abrams
     */
    return () => __awaiter(void 0, void 0, void 0, function* () {
        const endTimestamp = Date.now();
        // Calculate remaining time to wait
        const elapsedTimeMs = (endTimestamp - startTimestamp);
        const remainingTimeToWaitMs = minWaitMs - elapsedTimeMs;
        if (remainingTimeToWaitMs <= 0) {
            return;
        }
        // Perform wait
        yield waitMs(remainingTimeToWaitMs);
    });
};

// Import shared helpers
/**
 * Get a human-readable description of a date (all in ET)
 * @author Gabe Abrams
 * @param [dateOrTimestamp=today] the date or timestamp for the date to describe
 * @returns human-readable description of the date
 */
const getHumanReadableDate = (dateOrTimestamp) => {
    // Get the date info
    const { month, day, year, } = getTimeInfoInET(dateOrTimestamp);
    const currYear = getTimeInfoInET().year;
    // Get the short month description
    const monthName = getMonthName(month).short;
    // Create start of description
    let description = `${monthName} ${day}${getOrdinal(day)}`;
    // Add on year if it's different
    if (year !== currYear) {
        description += ` ${year}`;
    }
    // Return description
    return description;
};

/**
 * Get the current part of day (morning, evening, etc.)
 * @author Gabe Abrams
 */
const getPartOfDay = () => {
    // Setup the post-it time of day
    let partOfDay = 'day';
    let hours = new Date().getHours();
    if (hours < 12) {
        partOfDay = 'morning';
    }
    else if (hours >= 12 && hours <= 16) {
        partOfDay = 'afternoon';
    }
    else if (hours > 16 && hours <= 24) {
        partOfDay = 'evening';
    }
    return partOfDay;
};

/**
 * Create a human readable list from an array of strings.
 *   For example, ['apple', 'orange'] becomes "apple and orange"
 *   and ['apple', 'orange', 'mango'] becomes "apple, orange, and mango"
 * @author Gabe Abrams
 * @param items list of items in the list
 * @returns human-readable list
 */
const stringsToHumanReadableList = (items) => {
    // Handle 0-item case
    if (items.length === 0) {
        return '';
    }
    // Handle 1-item case
    if (items.length === 1) {
        return items[0];
    }
    // Handle 2-item case
    if (items.length === 2) {
        return `${items[0]} and ${items[1]}`;
    }
    // Handle 3+ item case
    let list = '';
    items.forEach((item, i) => {
        if (i === items.length - 1) {
            // Last item
            list += `, and ${item}`;
        }
        // Previous items
        list += `, ${item}`;
    });
    return list;
};

/**
 * Given a string, only keep the letters inside it
 * @author Gabe Abrams
 * @param str the string to parse
 * @returns only the letters inside of the string
 */
const onlyKeepLetters = (str) => {
    return str.replace(/[^a-zA-Z]+/g, '');
};

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
const parallelLimit = (taskFunctions, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    // Wait until finished with all tasks
    yield new Promise((resolve) => {
        /* ------------- Helpers ------------ */
        let nextTaskIndex = 0;
        let numFinishedTasks = 0;
        /**
         * Start the next task
         * @author Gabe Abrams
         */
        const startTask = () => __awaiter(void 0, void 0, void 0, function* () {
            const taskIndex = nextTaskIndex++;
            // Get the task
            const taskFunction = taskFunctions[taskIndex];
            if (!taskFunction) {
                return;
            }
            // Execute task
            const result = yield taskFunction();
            // Add results
            results[taskIndex] = result;
            // Tally and finish
            if (++numFinishedTasks === taskFunctions.length) {
                return resolve();
            }
            // Not finished! Start another task
            startTask();
        });
        /* ----------- Start Tasks ---------- */
        // If no limit, start all tasks. At least start 1 task
        const numTasks = Math.max((limit || taskFunctions.length), 1);
        for (let i = 0; i < numTasks; i++) {
            startTask();
        }
    });
    return results;
});

/**
 * Initialize a log collection given the dce-mango Collection class
 * @author Gabe Abrams
 * @param Collection the Collection class from dce-mango
 * @returns initialized logCollection
 */
const initLogCollection = (Collection) => {
    return new Collection('Log', {
        uniqueIndexKey: 'id',
        indexKeys: [
            'courseId',
            'context',
            'subcontext',
            'tags',
        ],
    });
};

// Cache user's ability
let canReview = undefined;
/**
 * Check if the current user can review logs
 * @author Gabe Abrams
 * @returns true if current user can review logs
 */
const canReviewLogs = () => __awaiter(void 0, void 0, void 0, function* () {
    // If cached, use that value
    if (canReview !== undefined) {
        return canReview;
    }
    // Ask on server
    try {
        canReview = !!(yield visitServerEndpoint({
            path: LOG_REVIEW_STATUS_ROUTE,
            method: 'GET',
        }));
    }
    catch (err) {
        canReview = false;
    }
    return canReview;
});

/**
 * Days of the week
 * @author Gabe Abrams
 */
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["Monday"] = "m";
    DayOfWeek["Tuesday"] = "t";
    DayOfWeek["Wednesday"] = "w";
    DayOfWeek["Thursday"] = "r";
    DayOfWeek["Friday"] = "f";
    DayOfWeek["Saturday"] = "s";
    DayOfWeek["Sunday"] = "u";
})(DayOfWeek || (DayOfWeek = {}));
var DayOfWeek$1 = DayOfWeek;

exports.AppWrapper = AppWrapper;
exports.ButtonInputGroup = ButtonInputGroup;
exports.CSVDownloadButton = CSVDownloadButton;
exports.CheckboxButton = CheckboxButton;
exports.CopiableBox = CopiableBox;
exports.DAY_IN_MS = DAY_IN_MS;
exports.DayOfWeek = DayOfWeek$1;
exports.Drawer = Drawer;
exports.ErrorBox = ErrorBox;
exports.ErrorWithCode = ErrorWithCode;
exports.HOUR_IN_MS = HOUR_IN_MS;
exports.IntelliTable = IntelliTable;
exports.ItemPicker = ItemPicker;
exports.LoadingSpinner = LoadingSpinner;
exports.LogAction = LogAction$1;
exports.LogBuiltInMetadata = LogBuiltInMetadata;
exports.LogReviewer = LogReviewer;
exports.LogSource = LogSource$1;
exports.LogType = LogType$1;
exports.MINUTE_IN_MS = MINUTE_IN_MS;
exports.Modal = Modal;
exports.ModalButtonType = ModalButtonType$1;
exports.ModalSize = ModalSize$1;
exports.ModalType = ModalType$1;
exports.ParamType = ParamType$1;
exports.PopFailureMark = PopFailureMark;
exports.PopPendingMark = PopPendingMark;
exports.PopSuccessMark = PopSuccessMark;
exports.RadioButton = RadioButton;
exports.ReactKitErrorCode = ReactKitErrorCode$1;
exports.SimpleDateChooser = SimpleDateChooser;
exports.TabBox = TabBox;
exports.Variant = Variant$1;
exports.abbreviate = abbreviate;
exports.alert = alert$1;
exports.avg = avg;
exports.canReviewLogs = canReviewLogs;
exports.ceilToNumDecimals = ceilToNumDecimals;
exports.confirm = confirm;
exports.floorToNumDecimals = floorToNumDecimals;
exports.forceNumIntoBounds = forceNumIntoBounds;
exports.genCSV = genCSV;
exports.genRouteHandler = genRouteHandler;
exports.getHumanReadableDate = getHumanReadableDate;
exports.getMonthName = getMonthName;
exports.getOrdinal = getOrdinal;
exports.getPartOfDay = getPartOfDay;
exports.getTimeInfoInET = getTimeInfoInET;
exports.handleError = handleError;
exports.handleSuccess = handleSuccess;
exports.initLogCollection = initLogCollection;
exports.initServer = initServer;
exports.logClientEvent = logClientEvent;
exports.onlyKeepLetters = onlyKeepLetters;
exports.padDecimalZeros = padDecimalZeros;
exports.padZerosLeft = padZerosLeft;
exports.parallelLimit = parallelLimit;
exports.roundToNumDecimals = roundToNumDecimals;
exports.showFatalError = showFatalError;
exports.startMinWait = startMinWait;
exports.stringsToHumanReadableList = stringsToHumanReadableList;
exports.stubServerEndpoint = stubServerEndpoint;
exports.sum = sum;
exports.visitServerEndpoint = visitServerEndpoint;
exports.waitMs = waitMs;
//# sourceMappingURL=index.js.map
