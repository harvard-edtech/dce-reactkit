'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var ReactDOM = require('react-dom');
var freeRegularSvgIcons = require('@fortawesome/free-regular-svg-icons');
var qs = require('qs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
var qs__default = /*#__PURE__*/_interopDefaultLegacy(qs);

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

// Highest error code = DRK18
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
    ReactKitErrorCode["HostNotAllowed"] = "DRK17";
    ReactKitErrorCode["HostBanned"] = "DRK18";
    ReactKitErrorCode["WrongCourse"] = "DRK6";
    ReactKitErrorCode["NoCACCLSendRequestFunction"] = "DRK7";
    ReactKitErrorCode["NoCACCLGetLaunchInfoFunction"] = "DRK8";
    ReactKitErrorCode["NotTTM"] = "DRK9";
    ReactKitErrorCode["NotAdmin"] = "DRK10";
    ReactKitErrorCode["NotAllowedToReviewLogs"] = "DRK11";
    ReactKitErrorCode["ThemeCheckedBeforeReactKitReady"] = "DRK12";
    ReactKitErrorCode["SessionExpiredMessageGottenBeforeReactKitReady"] = "DRK13";
    // Server-to-server requests
    ReactKitErrorCode["NotConnected"] = "DRK14";
    ReactKitErrorCode["SelfSigned"] = "DRK15";
    ReactKitErrorCode["ResponseParseError"] = "DRK16";
})(ReactKitErrorCode || (ReactKitErrorCode = {}));
var ReactKitErrorCode$1 = ReactKitErrorCode;

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
 * Displays an error
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const ErrorBox = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    var _a;
    /* -------------- Props ------------- */
    const { error, title = 'An Error Occurred', onClose, variant = Variant$1.Danger, icon = freeSolidSvgIcons.faExclamationTriangle, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
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
    return (React__default["default"].createElement("div", { className: `alert alert-${variant} text-center`, style: {
            maxWidth: '40rem',
            margin: 'auto',
        } },
        React__default["default"].createElement("h4", { className: "mb-1" },
            React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: icon, className: "me-2" }),
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
    ModalType["Cancel"] = "cancel";
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
 * Built-in metadata for logs
 * @author Gabe Abrams
 */
const LogBuiltInMetadata = {
    // Contexts
    Context: {
        Uncategorized: 'Uncategorized',
        ServerRenderedErrorPage: 'ServerRenderedErrorPage',
        ServerEndpointError: 'ServerEndpointError',
        ClientFatalError: 'ClientFatalError',
    },
    // Targets
    Target: {
        NoTarget: 'NoTarget',
    },
};

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
 * The number of modal portals that can be rendered at once.
 * @author Gabe Abrams
 */
const NUM_MODAL_PORTALS = 50;

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

/*----------------------------------------*/
/* ---- Static Variables and Getters ---- */
/*----------------------------------------*/
/* ----------- Initialized ---------- */
let onInitialized;
const initialized = new Promise((resolve) => {
    onInitialized = resolve;
});
/* ---------- Send Request ---------- */
let storedSendRequest;
/**
 * Get the send request function
 * @author Gabe Abrams
 * @returns sendRequest function
 */
const getSendRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    // Show timeout error if too much time passes
    let successful = false;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield waitMs(5000);
        if (!successful) {
            showFatalError(new ErrorWithCode('Could not send a request because the request needed to be sent before dce-reactkit was properly initialized. Perhaps dce-reactkit was not initialized with initClient.', ReactKitErrorCode$1.NoCACCLSendRequestFunction));
        }
    }))();
    // Wait for initialization
    yield initialized;
    successful = true;
    // Return
    return storedSendRequest;
});
/* ----- Session Expired Message ---- */
let sessionExpiredMessage;
/**
 * Get the custom session expired message
 * @author Gabe Abrams
 * @returns session expired message
 */
const getSessionExpiredMessage = () => {
    // Return
    return (sessionExpiredMessage !== null && sessionExpiredMessage !== void 0 ? sessionExpiredMessage : 'Your session has expired. Please go back to Canvas and start over.');
};
/* ------------ Dark Mode ----------- */
let darkModeOn = false;
/**
 * Get whether dark mode is enabled or not
 * @returns true if dark mode is enabled
 */
const isDarkModeOn = () => {
    return darkModeOn;
};
/*----------------------------------------*/
/* ---------------- Init ---------------- */
/*----------------------------------------*/
/**
 * Initialize the client-side version of reactkit
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.sendRequest caccl send request functions
 * @param [opts.sessionExpiredMessage] a custom session expired message
 */
const initClient = (opts) => {
    // Store values
    storedSendRequest = opts.sendRequest;
    sessionExpiredMessage = opts.sessionExpiredMessage;
    darkModeOn = !!opts.darkModeOn;
    // Mark as initialized
    onInitialized(null);
};

/* eslint-disable react/no-unused-prop-types */
/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/
// Base level of z-index
const BASE_Z_INDEX = 1000000000;
const BASE_Z_INDEX_ON_TOP = 2000000000;
// Constants
const MS_TO_ANIMATE = 200; // Animation duration
// Modal type to list of buttons
const modalTypeToModalButtonTypes = {
    [ModalType$1.Okay]: [
        ModalButtonType$1.Okay,
    ],
    [ModalType$1.Cancel]: [
        ModalButtonType$1.Cancel,
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
/**
 * Get button type styling and labels
 * @author Gabe Abrams
 * @returns map of button type to label and variant
 */
const getModalButtonTypeToLabelAndVariant = () => {
    const dark = isDarkModeOn();
    return {
        [ModalButtonType$1.Okay]: {
            label: 'Okay',
            variant: (dark
                ? Variant$1.Light
                : Variant$1.Dark),
        },
        [ModalButtonType$1.Cancel]: {
            label: 'Cancel',
            variant: Variant$1.Secondary,
        },
        [ModalButtonType$1.Yes]: {
            label: 'Yes',
            variant: (dark
                ? Variant$1.Light
                : Variant$1.Dark),
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
            variant: (dark
                ? Variant$1.Light
                : Variant$1.Dark),
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
            variant: (dark
                ? Variant$1.Light
                : Variant$1.Dark),
        },
    };
};
/*------------------------------------------------------------------------*/
/* --------------------------- Static Helpers --------------------------- */
/*------------------------------------------------------------------------*/
// Next unique id
let nextUniqueId = 0;
/**
 * Get a new unique id for this modal
 * @author Gabe Abrams
 * @returns new unique id
 */
const getNextUniqueId = () => {
    // eslint-disable-next-line no-plusplus
    return nextUniqueId++;
};
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$a = `
  .Modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 200vh;
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const Modal = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    var _a;
    /* -------------- Props ------------- */
    const { type = ModalType$1.NoButtons, size = ModalSize$1.Large, title, largeTitle, children, onClose, dontAllowBackdropExit, dontShowXButton, onTopOfOtherModals, } = props;
    // Determine if no header either
    const noHeader = (!title && type === ModalType$1.NoButtons);
    /* -------------- State ------------- */
    // True if animation is in use
    const [animatingIn, setAnimatingIn] = React.useState(true);
    const [animatingPop, setAnimatingPop] = React.useState(false);
    /* -------------- Refs -------------- */
    // Keep track of whether modal is still mounted
    const mounted = React.useRef(false);
    // Keep track of unique modal id
    const id = React.useRef(0);
    if (!id.current) {
        id.current = getNextUniqueId();
    }
    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Mount
     * @author Gabe Abrams
     */
    React.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            // Set defaults
            setAnimatingIn(true);
            setAnimatingPop(false);
            // Wait for animation
            yield waitMs(MS_TO_ANIMATE);
            // Update to state after animated in
            if (mounted.current) {
                setAnimatingIn(false);
            }
        }))();
        return () => {
            mounted.current = false;
        };
    }, []);
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Handles the closing of the modal
     * @author Gabe Abrams
     * @param modalButtonType the button that was clicked when closing the
     *   modal
     */
    const handleClose = (modalButtonType) => __awaiter(void 0, void 0, void 0, function* () {
        // Don't close if no handler
        if (!onClose) {
            return;
        }
        onClose(modalButtonType);
    });
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    // Calculate Z-index
    const baseZIndex = (onTopOfOtherModals
        ? BASE_Z_INDEX_ON_TOP
        : BASE_Z_INDEX);
    // Get list of buttons for this modal type
    const ModalButtonTypes = (_a = modalTypeToModalButtonTypes[type]) !== null && _a !== void 0 ? _a : [];
    // Get map of button type to label and variant
    const ModalButtonTypeToLabelAndVariant = getModalButtonTypeToLabelAndVariant();
    // Create buttons
    const buttons = ModalButtonTypes.map((modalButtonType, i) => {
        // Get default style
        let { label, variant, } = ModalButtonTypeToLabelAndVariant[modalButtonType];
        // Override with customizations
        const newLabel = props[`${modalButtonType}Label`];
        if (newLabel) {
            label = newLabel;
        }
        const newVariant = props[`${modalButtonType}Variant`];
        if (newVariant) {
            variant = newVariant;
        }
        // Check if this button is last
        const last = (i === ModalButtonTypes.length - 1);
        // Create the button
        return (React__default["default"].createElement("button", { key: modalButtonType, type: "button", className: `Modal-${modalButtonType}-button btn btn-${variant} ${last ? '' : 'me-1'}`, onClick: () => {
                handleClose(modalButtonType);
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
    const contentToRender = (React__default["default"].createElement("div", { className: "modal show", tabIndex: -1, style: {
            zIndex: baseZIndex,
            display: 'block',
            margin: 'auto',
            left: 0,
            right: 0,
        } },
        React__default["default"].createElement("style", null, style$a),
        React__default["default"].createElement("div", { className: `Modal-backdrop ${backdropAnimationClass}`, style: {
                zIndex: baseZIndex + 1,
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
        React__default["default"].createElement("div", { className: `modal-dialog modal-${size} ${animationClass} modal-dialog-scrollable modal-dialog-centered`, style: {
                zIndex: baseZIndex + 2,
                // Override sizes for even larger for XL
                width: (size === ModalSize$1.ExtraLarge
                    ? 'calc(100vw - 1rem)'
                    : undefined),
                maxWidth: (size === ModalSize$1.ExtraLarge
                    ? '80rem'
                    : undefined),
            } },
            React__default["default"].createElement("div", { className: "modal-content", style: {
                    borderColor: (isDarkModeOn()
                        ? 'gray'
                        : undefined),
                } },
                !noHeader && (React__default["default"].createElement("div", { className: "modal-header", style: {
                        color: (isDarkModeOn()
                            ? 'white'
                            : undefined),
                        backgroundColor: (isDarkModeOn()
                            ? '#444'
                            : undefined),
                        borderBottom: (isDarkModeOn()
                            ? '0.1rem solid gray'
                            : undefined),
                    } },
                    React__default["default"].createElement("h5", { className: "modal-title", style: {
                            fontWeight: 'bold',
                            fontSize: (largeTitle
                                ? '1.6rem'
                                : undefined),
                        } }, title),
                    (onClose && !dontShowXButton) && (React__default["default"].createElement("button", { type: "button", className: "Modal-x-button btn-close", "aria-label": "Close", style: {
                            backgroundColor: (isDarkModeOn()
                                ? 'white'
                                : undefined),
                        }, onClick: () => {
                            // Handle close
                            handleClose(ModalButtonType$1.Cancel);
                        } })))),
                children && (React__default["default"].createElement("div", { className: "modal-body", style: {
                        color: (isDarkModeOn()
                            ? 'white'
                            : undefined),
                        backgroundColor: (isDarkModeOn()
                            ? '#444'
                            : undefined),
                    } }, children)),
                footer && (React__default["default"].createElement("div", { className: "modal-footer pt-1 pb-1", style: {
                        color: (isDarkModeOn()
                            ? 'white'
                            : undefined),
                        backgroundColor: (isDarkModeOn()
                            ? '#444'
                            : undefined),
                        borderTop: (isDarkModeOn()
                            ? '0.1rem solid gray'
                            : undefined),
                    } }, footer))))));
    // Determine which portal to use
    const portalNumber = id.current % NUM_MODAL_PORTALS;
    // Render in a portal
    return ReactDOM__default["default"].createPortal(contentToRender, document.getElementById(`modal-portal-${portalNumber}`));
};

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
    // Remove properties with undefined values
    let params;
    if (opts.params) {
        params = Object.fromEntries(Object
            .entries(opts.params)
            .filter(([, value]) => {
            return value !== undefined;
        }));
    }
    // Automatically JSONify arrays and objects
    if (params) {
        params = Object.fromEntries(Object
            .entries(params)
            .map(([key, value]) => {
            if (Array.isArray(value) || typeof value === 'object') {
                return [key, JSON.stringify(value)];
            }
            return [key, value];
        }));
    }
    // Send the request
    const sendRequest = yield getSendRequest();
    const response = yield sendRequest({
        path: opts.path,
        method: (_c = opts.method) !== null && _c !== void 0 ? _c : 'GET',
        params,
    });
    // Check for failure
    if (!response || !response.body) {
        throw new ErrorWithCode('We didn\'t get a response from the server. Please check your internet connection.', ReactKitErrorCode$1.NoResponse);
    }
    if (!response.body.success) {
        // Session expired
        if (response.body.code === ReactKitErrorCode$1.SessionExpired) {
            showSessionExpiredMessage();
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

// Current metadata populator function
let metadataPopulator;
/**
 * Set the metadata populator function that will be called before every client
 *   event is logged. The function should return a set of metadata values that
 *   will be added to all client events
 * @author Gabe Abrams
 * @param metadataPopulator function to call that will return a set of metadata
 *   values that will be added to all client events
 */
const setClientEventMetadataPopulator = (newMetadataPopulator) => {
    metadataPopulator = newMetadataPopulator;
};
/* -------------- Main -------------- */
/**
 * Log a user action on the client (cannot be used on the server)
 * @author Gabe Abrams
 */
const logClientEvent = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    // Populate metadata
    let metadata = ((_a = opts.metadata) !== null && _a !== void 0 ? _a : {});
    if (metadataPopulator) {
        try {
            const autoPopulatedMetadata = yield metadataPopulator();
            metadata = Object.assign(Object.assign({}, autoPopulatedMetadata), metadata);
        }
        catch (err) {
            // Add error to metadata
            metadata = Object.assign({ autoPopulatedMetadataNotAvailable: true }, metadata);
        }
    }
    // Send to server
    return visitServerEndpoint({
        path: LOG_ROUTE_PATH,
        method: 'POST',
        params: {
            context: (typeof opts.context === 'string'
                ? opts.context
                : ((_c = ((_b = opts.context) !== null && _b !== void 0 ? _b : {})._) !== null && _c !== void 0 ? _c : LogBuiltInMetadata.Context.Uncategorized)),
            subcontext: ((_d = opts.subcontext) !== null && _d !== void 0 ? _d : LogBuiltInMetadata.Context.Uncategorized),
            level: ((_e = opts.level) !== null && _e !== void 0 ? _e : LogLevel$1.Info),
            tags: JSON.stringify((_f = opts.tags) !== null && _f !== void 0 ? _f : []),
            metadata: JSON.stringify(metadata),
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
                ? ((_g = opts.target) !== null && _g !== void 0 ? _g : LogBuiltInMetadata.Target.NoTarget)
                : undefined),
            action: (opts.action
                ? opts.action
                : undefined),
        },
    });
});

/**
 * Universal stylesheet
 * @author Gabe Abrams
 */
const shared = `
/* Button with no style */
.btn-nostyle {
  border: 0 !important;
  background: transparent !important;
  outline: 0 !important;
  font-size: inherit !important;
  color: inherit !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* Tooltip on Very Top */
.tooltip {
  z-index: 9000000000 !important;
}

/* Tooltip White Text */
.tooltip .tooltip-inner {
  color: white !important;
}
`;

/**
 * A wrapper for the entire React app that adds global functionality like
 *   handling for fatal error messages, adds bootstrap support
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* --------------------------- Static Helpers --------------------------- */
/*------------------------------------------------------------------------*/
// Timestamp after initialization when helpers should be available
const timestampWhenHelpersShouldBeAvailable = Date.now() + 2000;
/**
 * Wait for a little while for a helper to exist
 * @author Gabe Abrams
 * @param checkForHelper a function that returns true if the helper exists
 * @returns true if the helper exists, false if the process timed out
 */
const waitForHelper = (checkForHelper) => __awaiter(void 0, void 0, void 0, function* () {
    // Wait for helper to exist
    while (!checkForHelper()) {
        // Check if we should stop waiting
        if (Date.now() > timestampWhenHelpersShouldBeAvailable) {
            // Stop waiting
            return false;
        }
        // Wait a little while
        yield waitMs(10);
    }
    // Helper exists
    return true;
});
/*----------------------------------------*/
/* ----------- Redirect/Leave ----------- */
/*----------------------------------------*/
// Stored copy of setter for url to leave to
let setURLToLeaveTo;
/**
 * Redirect to a new page
 * @author Gabe Abrams
 * @param url the url to redirect to
 * @param destination the destination of the redirect, for example "YouTube"
 *   and will be used in the following text: `Redirecting to ${destination}...`
 */
const leaveToURL = (url, destination) => __awaiter(void 0, void 0, void 0, function* () {
    if (setURLToLeaveTo) {
        // Beautiful redirect
        setURLToLeaveTo({ url, destination });
    }
    else {
        // Overwrite page in a janky way
        window.document.body.innerHTML = `
      <div>
        <h1>
          Redirecting to ${destination}...
        </h1>
        <p>
          If you are not redirected in 5 seconds, please <a href="${url}">click here</a>.
        </p>
      </div>
    `;
    }
    // Redirect to location
    window.location.href = url;
});
/*----------------------------------------*/
/* ---------------- Alert --------------- */
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
const alert = (title, text) => __awaiter(void 0, void 0, void 0, function* () {
    // Wait for helper to exist
    yield waitForHelper(() => {
        return !!setAlertInfo;
    });
    // Fallback if alert not available
    if (!setAlertInfo) {
        // eslint-disable-next-line no-alert
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
/* --------------- Confirm -------------- */
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
    // Wait for helper to exist
    yield waitForHelper(() => {
        return !!setConfirmInfo;
    });
    // Fallback if confirm is not available
    if (!setConfirmInfo) {
        // eslint-disable-next-line no-alert
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
/* --------------- Prompt -------------- */
/*----------------------------------------*/
// Stored copies of setters
let setPromptInfo;
// Function to call when prompt is closed
let onPromptClosed;
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
const prompt = (title, opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Wait for helper to exist
    yield waitForHelper(() => {
        return !!setPromptInfo;
    });
    // Fallback if prompt is not available
    if (!setPromptInfo) {
        const resultPassesValidation = false;
        while (!resultPassesValidation) {
            // eslint-disable-next-line no-alert
            const result = window.prompt(`${title}\n\n${(_a = opts === null || opts === void 0 ? void 0 : opts.textAboveInputField) !== null && _a !== void 0 ? _a : ''}`, (_b = opts === null || opts === void 0 ? void 0 : opts.defaultText) !== null && _b !== void 0 ? _b : '');
            // Exit loop if user cancels
            if (result === null) {
                return null;
            }
            // Validate min num chars
            const minNumCharsValidationError = (((opts === null || opts === void 0 ? void 0 : opts.minNumChars) && result.length < opts.minNumChars)
                ? `Please enter at least ${opts.minNumChars} characters.`
                : undefined);
            // Run custom validation
            const customValidationError = ((opts === null || opts === void 0 ? void 0 : opts.findValidationError)
                && opts.findValidationError(result));
            // Show validation issue
            if (minNumCharsValidationError || customValidationError) {
                // Create error message
                const errorMessage = ([
                    minNumCharsValidationError,
                    customValidationError,
                ]
                    // Filter out undefined messages
                    .filter((msg) => {
                    return !!msg;
                })
                    // Join messages with newlines
                    .join('\n'));
                // Show alert
                alert('Invalid Input', errorMessage);
            }
            else {
                return result;
            }
        }
    }
    // Return promise that resolves with result of prompt
    return new Promise((resolve) => {
        var _a;
        // Setup handler
        onPromptClosed = (result) => {
            resolve(result);
        };
        // Show the prompt
        setPromptInfo({
            title,
            currentInputFieldText: ((_a = opts === null || opts === void 0 ? void 0 : opts.defaultText) !== null && _a !== void 0 ? _a : ''),
            opts: (opts !== null && opts !== void 0 ? opts : {}),
        });
    });
});
/*----------------------------------------*/
/* ------------- Fatal Error ------------ */
/*----------------------------------------*/
// Stored copies of setters
let setFatalErrorMessage;
let setFatalErrorCode;
let setFatalErrorTitle;
// Fatal error listeners
const fatalErrorHandlers = [];
/**
 * Show a fatal error message
 * @author Gabe Abrams
 * @param error the error to show
 * @param [errorTitle] title of the error box
 */
const showFatalError = (error, errorTitle = 'An Error Occurred') => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    // Determine message and code
    const message = (typeof error === 'string'
        ? error.trim()
        : String((_c = error.message) !== null && _c !== void 0 ? _c : 'An unknown error occurred.'));
    const code = (typeof error === 'string'
        ? ReactKitErrorCode$1.NoCode
        : String((_d = error.code) !== null && _d !== void 0 ? _d : ReactKitErrorCode$1.NoCode));
    // Call all fatal error listeners
    try {
        fatalErrorHandlers.forEach((handler) => {
            handler();
        });
    }
    catch (err) {
        // Ignore listener errors
    }
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
    // Wait for helper to exist
    yield waitForHelper(() => {
        return (!!setFatalErrorMessage
            && !!setFatalErrorCode);
    });
    // Handle case where app hasn't loaded
    if (!setFatalErrorMessage || !setFatalErrorCode) {
        alert(errorTitle, `${message} (code: ${code}). Please contact support.`);
        return;
    }
    // Use setters
    setFatalErrorMessage(message);
    setFatalErrorCode(code);
    setFatalErrorTitle(errorTitle);
});
/**
 * Add a handler for when a fatal error occurs (or when a session expiry occurs)
 * @author Gabe Abrams
 */
const addFatalErrorHandler = (handler) => {
    fatalErrorHandlers.push(handler);
};
/*----------------------------------------*/
/* ----------- Session Expired ---------- */
/*----------------------------------------*/
// Stored copies of setters
let setSessionHasExpired;
/**
 * Show the "session expired" message
 * @author Gabe Abrams
 */
const showSessionExpiredMessage = () => __awaiter(void 0, void 0, void 0, function* () {
    // Call all fatal error listeners
    try {
        fatalErrorHandlers.forEach((handler) => {
            handler();
        });
    }
    catch (err) {
        // Ignore listener errors
    }
    // Wait for helper to exist
    yield waitForHelper(() => {
        return !!setSessionHasExpired;
    });
    // Show session expired message
    if (setSessionHasExpired) {
        setSessionHasExpired(true);
    }
    else {
        showFatalError('Your session has expired. Please start over.', 'Session Expired');
    }
});
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$9 = `
  .AppWrapper-leave-to-url-notice {
    opacity: 0;

    animation-name: AppWrapper-leave-to-url-notice-appear;
    animation-duration: 0.5s;
    animation-delay: 1s;
    animation-fill-mode: both;
    animation-timing-function: ease-out;
    animation-iteration-count: 1;
  }

  @keyframes AppWrapper-leave-to-url-notice-appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  ${shared}
`;
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const AppWrapper = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    const { children, } = props;
    /* -------------- State ------------- */
    // Leave to URL
    const [urlToLeaveTo, setURLToLeaveToInner,] = React.useState();
    setURLToLeaveTo = setURLToLeaveToInner;
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
    // Prompt
    const [promptInfo, setPromptInfoInner] = React.useState(undefined);
    setPromptInfo = setPromptInfoInner;
    // Session expired
    const [sessionHasExpired, setSessionHasExpiredInner,] = React.useState(false);
    setSessionHasExpired = setSessionHasExpiredInner;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* ---------------- Modal --------------- */
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
            }, onTopOfOtherModals: true, dontAllowBackdropExit: true }, confirmInfo.text));
    }
    /* ------------- Prompt ------------ */
    if (promptInfo) {
        // Run min char validation
        const minNumCharsValidationError = ((promptInfo.opts.minNumChars
            && promptInfo.currentInputFieldText.length < promptInfo.opts.minNumChars)
            ? `Please enter at least ${promptInfo.opts.minNumChars} characters.`
            : undefined);
        // Run custom validation
        const customValidationError = (promptInfo.opts.findValidationError
            && promptInfo.opts.findValidationError(promptInfo.currentInputFieldText));
        modal = (React__default["default"].createElement(Modal, { key: `prompt-${promptInfo.title}`, title: promptInfo.title, 
            // Don't show ok button if there is a validation error
            type: ((customValidationError || minNumCharsValidationError)
                ? ModalType$1.Cancel
                : ModalType$1.OkayCancel), okayLabel: promptInfo.opts.confirmButtonText, okayVariant: promptInfo.opts.confirmButtonVariant, cancelLabel: promptInfo.opts.cancelButtonText, cancelVariant: promptInfo.opts.cancelButtonVariant, onClose: (buttonType) => {
                // Get result
                const result = (buttonType === ModalButtonType$1.Okay
                    ? promptInfo.currentInputFieldText
                    : null);
                // Close prompt
                setPromptInfo(undefined);
                // Call handler
                if (onPromptClosed) {
                    onPromptClosed(result);
                }
            }, onTopOfOtherModals: true, dontAllowBackdropExit: true },
            React__default["default"].createElement("div", null,
                promptInfo.opts.textAboveInputField && (React__default["default"].createElement("div", null, promptInfo.opts.textAboveInputField)),
                React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": promptInfo.opts.ariaLabel, placeholder: promptInfo.opts.placeholder, value: promptInfo.currentInputFieldText, onChange: (e) => {
                        return setPromptInfo(Object.assign(Object.assign({}, promptInfo), { currentInputFieldText: e.target.value }));
                    }, 
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus: true }),
                minNumCharsValidationError && (React__default["default"].createElement("div", { className: "text-danger fw-bold mt-2" }, minNumCharsValidationError)),
                customValidationError && (React__default["default"].createElement("div", { className: "text-danger fw-bold mt-2" }, customValidationError)))));
    }
    /* ------ Custom Modal Portals ------ */
    // Custom modal portals
    const customModalPortals = [];
    for (let i = 0; i < NUM_MODAL_PORTALS; i++) {
        const portalId = `modal-portal-${i}`;
        customModalPortals.push(React__default["default"].createElement("div", { key: portalId, id: portalId }));
    }
    /*----------------------------------------*/
    /* ---------------- Views --------------- */
    /*----------------------------------------*/
    // Body that will be filled with the current view
    let body;
    /* ---------- Leave to URL ---------- */
    if (!body && urlToLeaveTo) {
        // Destructure url info
        const { url, destination, } = urlToLeaveTo;
        // Show pretty redirect screen
        body = (React__default["default"].createElement("div", { className: "AppWrapper-leave-to-url-container p-5 text-center" },
            React__default["default"].createElement("div", { className: "AppWrapper-leave-to-url-notice d-inline-block" },
                React__default["default"].createElement("h3", { className: "text-start m-0" },
                    "Redirecting to",
                    ' ',
                    destination,
                    "..."),
                React__default["default"].createElement("div", { className: "text-start" },
                    "If you are not automatically redirected in 5 seconds, please",
                    ' ',
                    React__default["default"].createElement("a", { href: url, "aria-label": `Click here to leave to ${destination}` }, "click here"),
                    "."))));
    }
    /* ----------- Fatal Error ---------- */
    if (!body
        && (fatalErrorMessage || fatalErrorCode || sessionHasExpired)) {
        // Re-encapsulate in an error
        const error = (sessionHasExpired
            ? new ErrorWithCode(getSessionExpiredMessage(), ReactKitErrorCode$1.SessionExpired)
            : new ErrorWithCode((fatalErrorMessage !== null && fatalErrorMessage !== void 0 ? fatalErrorMessage : 'An unknown error has occurred. Please contact support.'), (fatalErrorCode !== null && fatalErrorCode !== void 0 ? fatalErrorCode : ReactKitErrorCode$1.NoCode)));
        // Choose error box variant
        let errorBoxVariant = Variant$1.Danger;
        if (sessionHasExpired) {
            errorBoxVariant = (isDarkModeOn()
                ? Variant$1.Light
                : Variant$1.Secondary);
        }
        // Build error screen
        body = (React__default["default"].createElement("div", { style: {
                display: 'block',
                width: '100vw',
                minHeight: '100vh',
                paddingTop: '2rem',
                backgroundColor: (isDarkModeOn()
                    ? '#222'
                    : '#fff'),
            } },
            React__default["default"].createElement(ErrorBox, { title: (sessionHasExpired
                    ? 'Session Expired'
                    : fatalErrorTitle), error: error, variant: errorBoxVariant, icon: (sessionHasExpired
                    ? freeSolidSvgIcons.faHourglassEnd
                    : undefined) })));
    }
    /* --------------- App -------------- */
    if (!body) {
        body = children;
    }
    /* ------------- Tooltip ------------ */
    const tooltipStyle = (isDarkModeOn()
        ? `
        .tooltip-inner {
          background-color: white;
          color: black;
          border: 0.1rem solid black;
          pointer-events: none;
        }
        div[data-popper-placement="top"] .tooltip-arrow::before {
          border-top-color: white !important;
          transform: translate(0, -0.05rem);
          pointer-events: none;
        }
      `
        : `
        .tooltip-inner {
          background-color: black;
          color: white;
          border: 0.1rem solid white;
          pointer-events: none;
        }
        div[data-popper-placement="top"] .tooltip-arrow::before {
          border-top-color: black !important;
          transform: translate(0, -0.05rem);
          pointer-events: none;
        }
      `);
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement("style", null, style$9),
        React__default["default"].createElement("style", null, tooltipStyle),
        modal,
        customModalPortals,
        body));
};

/**
 * Loading spinner/indicator
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$8 = `
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const LoadingSpinner = () => {
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    // Add all four blips to a container
    return (React__default["default"].createElement("div", { className: "text-center LoadingSpinner LoadingSpinner-container" },
        React__default["default"].createElement("style", null, style$8),
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
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$7 = `
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const TabBox = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    const { title, children, noBottomPadding, noBottomMargin, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    // Full UI
    return (React__default["default"].createElement("div", { className: `TabBox-container ${noBottomMargin ? '' : 'mb-2'}` },
        React__default["default"].createElement("style", null, style$7),
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const RadioButton = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    const { text, onSelected, ariaLabel, title, selected, id, noMarginOnRight, selectedVariant = (isDarkModeOn()
        ? Variant$1.Light
        : Variant$1.Secondary), unselectedVariant = (isDarkModeOn()
        ? Variant$1.Secondary
        : Variant$1.Light), small, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const CheckboxButton = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    const { text, onChanged, ariaLabel, title, checked, id, className, noMarginOnRight, checkedVariant = (isDarkModeOn()
        ? Variant$1.Light
        : Variant$1.Secondary), uncheckedVariant = (isDarkModeOn()
        ? Variant$1.Secondary
        : Variant$1.Light), small, dashed, useComplexFormatting, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
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
        React__default["default"].createElement("div", { className: "d-flex" },
            React__default["default"].createElement("div", { className: "align-items-center" },
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: icon, className: "me-1" })),
            useComplexFormatting
                ? (React__default["default"].createElement("pre", { className: "ps-2 text-start text-break", style: {
                        whiteSpace: 'pre-wrap',
                    } }, text))
                : (React__default["default"].createElement("div", { className: "flex-grow-1 text-start text-break ps-2" }, text)))));
};

/**
 * Input group with a title and space for buttons
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const ButtonInputGroup = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { label, minLabelWidth, children, className, wrapButtonsAndAddGaps, isAdminFeature, noMarginOnBottom, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: `input-group ${className !== null && className !== void 0 ? className : ''} ${noMarginOnBottom ? '' : 'mb-2'}` },
        React__default["default"].createElement("div", { className: "input-group-prepend d-flex w-100" },
            React__default["default"].createElement("span", { className: `input-group-text ${isAdminFeature ? 'border border-success progress-bar-striped bg-success text-white fw-bold' : ''}`, style: {
                    minWidth: (minLabelWidth !== null && minLabelWidth !== void 0 ? minLabelWidth : undefined),
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                } }, label),
            React__default["default"].createElement("span", { className: `input-group-text flex-grow-1 ${isAdminFeature ? 'border-success ' : ''}rounded-right d-flex flex-wrap`, style: {
                    backgroundColor: 'white',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderLeftWidth: 0,
                } }, wrapButtonsAndAddGaps
                ? (React__default["default"].createElement("div", { className: "d-flex gap-1 flex-wrap" }, children))
                : children))));
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

// Constants
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
 * @param [dateOrTimestamp=now] the date to get info on or a ms since epoch timestamp
 * @returns object with timestamp (ms since epoch) and numbers
 *   corresponding to ET time values for year, month, day, hour, hour12, minute, isPM
 *   where hour is in 24hr time and hour12 is in 12hr time.
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
    { timeZone: 'America/New_York' });
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
    const hour12 = Number.parseInt(hourStr, 10);
    // Convert from am/pm to 24hr
    const isAM = ending.toLowerCase().includes('am');
    const isPM = !isAM;
    let hour = hour12;
    if (isPM && hour12 !== 12) {
        hour += 12;
    }
    else if (isAM && hour12 === 12) {
        hour = 0;
    }
    // Return
    return {
        timestamp,
        year,
        month,
        day,
        hour,
        hour12,
        isPM,
        minute,
    };
};

/**
 * A very simple, lightweight date chooser
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const SimpleDateChooser = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    const { ariaLabel, name, onChange, chooseFromPast, numMonthsToShow = 6, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    // Determine the set of choices allowed
    const today = getTimeInfoInET();
    const choices = [];
    let startYear = today.year;
    let startMonth = today.month;
    if (chooseFromPast) {
        startMonth -= Math.max(0, numMonthsToShow - 1);
        while (startMonth <= 0) {
            startMonth += 12;
            startYear -= 1;
        }
    }
    for (let i = 0; i < numMonthsToShow; i++) {
        // Get month and year info
        const unmoddedMonth = (startMonth + i);
        let month = unmoddedMonth;
        while (month > 12) {
            month -= 12;
        }
        const monthName = getMonthName(month).full;
        // Year is start year +1 for each 12 months
        let yearsToAdd = 0;
        let monthsOfYearsToAdd = unmoddedMonth;
        while (monthsOfYearsToAdd > 12) {
            monthsOfYearsToAdd -= 12;
            yearsToAdd += 1;
        }
        const year = startYear + yearsToAdd;
        // Figure out which days are allowed
        const days = [];
        const numDaysInMonth = (new Date(year, month, 0)).getDate();
        if (chooseFromPast) {
            // Past selection
            const numDaysToAdd = ((month === today.month)
                ? today.day // Current month, only add up to today
                : numDaysInMonth // Past month, add all days
            );
            for (let day = 1; day <= numDaysToAdd; day++) {
                days.push(day);
            }
        }
        else {
            // Future selection: add all remaining days of the month
            const firstDay = (month === today.month
                ? today.day // Current month: start at current date
                : 1 // Future month: start at beginning of month
            );
            for (let day = firstDay; day <= numDaysInMonth; day++) {
                days.push(day);
            }
        }
        choices.push({
            choiceName: `${monthName} ${year}`,
            month,
            year,
            days,
        });
    }
    // Create choice options
    const { month, day, year, } = props;
    const monthOptions = [];
    const dayOptions = [];
    choices.forEach((choice) => {
        // Create month option
        monthOptions.push(React__default["default"].createElement("option", { key: `${choice.year}-${choice.month}`, value: `${choice.month}-${choice.year}`, "aria-label": `choose ${choice.choiceName}`, onSelect: () => {
                onChange(choice.month, choice.days[0], choice.year);
            } }, choice.choiceName));
        if (month === choice.month) {
            // This is the currently selected month
            // Create day options
            choice.days.forEach((dayChoice) => {
                const ordinal = getOrdinal(dayChoice);
                dayOptions.push(React__default["default"].createElement("option", { key: `${choice.year}-${choice.month}-${dayChoice}`, value: dayChoice, "aria-label": `choose date ${dayChoice}` },
                    dayChoice,
                    ordinal));
            });
        }
    });
    return (React__default["default"].createElement("div", { className: "SimpleDateChooser d-inline-block", "aria-label": `date chooser with selected date: ${month}/${day}/${year}` },
        React__default["default"].createElement("select", { "aria-label": `month for ${ariaLabel}`, className: "custom-select d-inline-block mr-1", style: { width: 'auto' }, id: `SimpleDateChooser-${name}-month`, value: `${month}-${year}`, onChange: (e) => {
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
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$6 = `
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const Drawer = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { grayBackground, customBackgroundColor, children, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: "Drawer-container", style: {
            backgroundColor: (grayBackground
                ? '#E2E3E5'
                : (customBackgroundColor !== null && customBackgroundColor !== void 0 ? customBackgroundColor : undefined)),
        } },
        React__default["default"].createElement("style", null, style$6),
        children));
};

/**
 * Success checkmark that pops into view
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$5 = `
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const PopSuccessMark = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { sizeRem = 3, circleVariant = 'success', checkVariant = 'white', } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: `PopSuccessMark-outer-container bg-${circleVariant}`, style: {
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
        }, "aria-label": "checkmark indicating success" },
        React__default["default"].createElement("style", null, style$5),
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
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$4 = `
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const PopFailureMark = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { sizeRem = 3, circleVariant = 'danger', xVariant = 'white', } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: `PopFailureMark-outer-container bg-${circleVariant}`, style: {
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
        }, "aria-label": "mark indicating failure" },
        React__default["default"].createElement("style", null, style$4),
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
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$3 = `
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const PopPendingMark = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { sizeRem = 3, circleVariant = 'warning', hourglassVariant = 'white', } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: `PopPendingMark-outer-container bg-${circleVariant}`, style: {
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
        }, "aria-label": "mark indicating that the item is pending" },
        React__default["default"].createElement("style", null, style$3),
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
var ActionType$9;
(function (ActionType) {
    // Indicate that the text was recently copied
    ActionType["IndicateRecentlyCopied"] = "indicate-recently-copied";
    // Clear the status
    ActionType["ClearRecentlyCopiedStatus"] = "clear-recently-copied-status";
})(ActionType$9 || (ActionType$9 = {}));
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer$a = (state, action) => {
    switch (action.type) {
        case ActionType$9.IndicateRecentlyCopied: {
            return {
                recentlyCopied: true,
            };
        }
        case ActionType$9.ClearRecentlyCopiedStatus: {
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const CopiableBox = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
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
    const [state, dispatch] = React.useReducer(reducer$a, initialState);
    // Destructure common state
    const { recentlyCopied, } = state;
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
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
            return alert('Unable to copy', 'Oops! We couldn\'t copy that to the clipboard. Please copy the text manually.');
        }
        // Show copied notice
        dispatch({
            type: ActionType$9.IndicateRecentlyCopied,
        });
        // Wait a moment
        yield waitMs(4000);
        // Hide copied notice
        dispatch({
            type: ActionType$9.ClearRecentlyCopiedStatus,
        });
    });
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: "input-group" },
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
 * @author Gabe Abrams
 */
/* ------------- Actions ------------ */
// Types of actions
var ActionType$8;
(function (ActionType) {
    // Toggle whether a child are being shown
    ActionType["ToggleChild"] = "toggle-child";
})(ActionType$8 || (ActionType$8 = {}));
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer$9 = (state, action) => {
    switch (action.type) {
        case ActionType$8.ToggleChild: {
            return Object.assign(Object.assign({}, state), { childExpanded: Object.assign(Object.assign({}, state.childExpanded), { [String(action.id)]: !state.childExpanded[String(action.id)] }) });
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const NestableItemList = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { items, onChanged, } = props;
    /* -------------- State ------------- */
    // Create initial map of child expanded booleans
    const initChildExpanded = {};
    items.forEach((item) => {
        initChildExpanded[String(item.id)] = false;
    });
    // Initial state
    const initialState = {
        childExpanded: initChildExpanded,
    };
    // Initialize state
    const [state, dispatch] = React.useReducer(reducer$9, initialState);
    // Destructure common state
    const { childExpanded, } = state;
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
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
    /* ------------------------------- Render ------------------------------- */
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
                        type: ActionType$8.ToggleChild,
                        id: item.id,
                    });
                }, "aria-label": `${childExpanded[item.id] ? 'Hide' : 'Show'} items in ${item.name}` },
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: childExpanded[item.id] ? freeSolidSvgIcons.faChevronDown : freeSolidSvgIcons.faChevronRight })))),
            React__default["default"].createElement(CheckboxButton, { className: `NestableItemList-CheckboxButton-${item.id}`, text: item.name, checked: item.isGroup ? allChecked(item.children) : item.checked, dashed: item.isGroup ? !noneChecked(item.children) : false, onChanged: (checked) => {
                    onChanged(changeChecked(item.id, checked, items));
                }, ariaLabel: `Select ${item.name}`, checkedVariant: Variant$1.Light }),
            (item.isGroup && childExpanded[item.id]) && (React__default["default"].createElement("div", { className: "NestableItemList-children-container", style: {
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const ItemPicker = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { title, items, onChanged, noBottomMargin, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement(TabBox, { title: title, noBottomMargin: noBottomMargin },
        React__default["default"].createElement("div", { style: { overflowX: 'auto' } },
            React__default["default"].createElement(NestableItemList, { items: items, onChanged: onChanged }))));
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
    LogAction["Open"] = "Open";
    // Target was closed by the user (it was on screen, but now it is not)
    LogAction["Close"] = "Close";
    // Target was cancelled by the user (it was on closed without saving)
    LogAction["Cancel"] = "Cancel";
    // Target was expanded by the user (it always remains on screen, but size was changed)
    LogAction["Expand"] = "Expand";
    // Target was collapsed by the user (it always remains on screen, but size was changed)
    LogAction["Collapse"] = "Collapse";
    // Target was viewed by the user (only for items that are not opened or closed, those must use Open/Close actions)
    LogAction["View"] = "View";
    // Target interrupted the user (popup, dialog, validation message, etc. appeared without user prompting)
    LogAction["Interrupt"] = "Interrupt";
    // Target was created by the user (it did not exist before)
    LogAction["Create"] = "Create";
    // Target was modified by the user (it existed and was changed)
    LogAction["Modify"] = "Modify";
    // Target was deleted by the user (it existed and now it doesn't)
    LogAction["Delete"] = "Delete";
    // Target was added by the user (it already existed and was added to another place)
    LogAction["Add"] = "Add";
    // Target was removed by the user (it was removed from something but still exists)
    LogAction["Remove"] = "Remove";
    // Target was activated by the user (click, check, tap, keypress, etc.)
    LogAction["Activate"] = "Activate";
    // Target was deactivated by the user (click away, uncheck, tap outside of, tab away, etc.)
    LogAction["Deactivate"] = "Deactivate";
    // User showed interest in a target (hover, peek, etc.)
    LogAction["Peek"] = "Peek";
    // Halt a process (pause, etc.)
    LogAction["Halt"] = "Halt";
    // Resume a process (resume a halted process)
    LogAction["Resume"] = "Resume";
    // Jump to/seek to/reveal/go to/navigate to a target
    LogAction["Jump"] = "Jump";
    // Post a submission/message/etc. into the target
    LogAction["Post"] = "Post";
    // Unknown action
    LogAction["Unknown"] = "Unknown";
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
    if (!String(text).includes(',')
        && !String(text).includes('"')) {
        // No need to escape
        return String(text);
    }
    // Perform escape
    return `"${String(text).replace(/"/g, '""')}"`;
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
        csv += '\n';
        csv += (columns
            .map((column) => {
            let contents;
            const cell = datum[column.param];
            if (typeof cell === 'string'
                || typeof cell === 'number') {
                contents = String(cell);
            }
            else if (typeof cell === 'undefined'
                || cell === null) {
                contents = '';
            }
            else if (typeof cell === 'object') {
                contents = JSON.stringify(cell);
            }
            else {
                contents = '';
            }
            return escapeCellText(contents);
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const CSVDownloadButton = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { filename, csv, id, className, ariaLabel, style, onClick, children, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    // Render the button
    return (React__default["default"].createElement("a", { id: id, download: filename, href: `data:application/octet-stream,${encodeURIComponent(csv)}`, className: `CSVDownloadButton-button ${className !== null && className !== void 0 ? className : 'btn btn-secondary'}`, "aria-label": (ariaLabel
            ? `Click to download ${filename}`
            : ariaLabel), style: style, onClick: onClick },
        !children && (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCloudDownloadAlt }),
            ' ',
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
var ActionType$7;
(function (ActionType) {
    // Toggle sort column param
    ActionType["ToggleSortColumn"] = "toggle-sort-column";
    // Toggle the visibility of a column
    ActionType["UpdateColumnVisibility"] = "update-column-visibility";
    // Toggle the column visibility customization modal
    ActionType["ToggleColVisCusModalVisibility"] = "toggle-col-vis-cus-modal-visibility";
    // Show all columns
    ActionType["ShowAllColumns"] = "show-all-columns";
    // Hide all columns
    ActionType["HideAllColumns"] = "hide-all-columns";
})(ActionType$7 || (ActionType$7 = {}));
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer$8 = (state, action) => {
    switch (action.type) {
        case ActionType$7.ToggleSortColumn: {
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
        case ActionType$7.UpdateColumnVisibility: {
            const { columnVisibilityMap } = state;
            columnVisibilityMap[action.param] = action.visible;
            return Object.assign(Object.assign({}, state), { columnVisibilityMap });
        }
        case ActionType$7.ToggleColVisCusModalVisibility: {
            return Object.assign(Object.assign({}, state), { columnVisibilityCustomizationModalVisible: !state.columnVisibilityCustomizationModalVisible });
        }
        case ActionType$7.ShowAllColumns: {
            const { columnVisibilityMap } = state;
            Object.keys(columnVisibilityMap).forEach((param) => {
                columnVisibilityMap[param] = true;
            });
            return Object.assign(Object.assign({}, state), { columnVisibilityMap });
        }
        case ActionType$7.HideAllColumns: {
            const { columnVisibilityMap } = state;
            Object.keys(columnVisibilityMap).forEach((param) => {
                columnVisibilityMap[param] = false;
            });
            return Object.assign(Object.assign({}, state), { columnVisibilityMap });
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const IntelliTable = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    var _a;
    /* -------------- Props ------------- */
    // Destructure all props
    const { title, id, columns, csvName, data = [], } = props;
    // Get data, show empty row if none
    if (data.length === 0) {
        data.push({ id: 'empty-row' });
    }
    // Get CSV filename
    let filename = `${title}.csv`;
    if (csvName) {
        filename = (csvName.endsWith('.csv')
            ? csvName
            : `${csvName}.csv`);
    }
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
    const [state, dispatch] = React.useReducer(reducer$8, initialState);
    // Destructure common state
    const { sortColumnParam, sortType, columnVisibilityMap, columnVisibilityCustomizationModalVisible, } = state;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* ---------------- Modal --------------- */
    /*----------------------------------------*/
    // Modal that may be defined
    let modal;
    /* ------- Col Vis Customization Modal ------ */
    if (columnVisibilityCustomizationModalVisible) {
        // Create modal
        modal = (React__default["default"].createElement(Modal, { type: ModalType$1.Okay, title: "Choose columns to show:", onClose: () => {
                const noColumnsSelected = (Object.values(columnVisibilityMap)
                    .every((isSelected) => {
                    return !isSelected;
                }));
                if (noColumnsSelected) {
                    return alert('Choose at least one column', 'To continue, you have to choose at least one column to show');
                }
                dispatch({
                    type: ActionType$7.ToggleColVisCusModalVisibility,
                });
            }, okayVariant: Variant$1.Light },
            columns.map((column) => {
                return (React__default["default"].createElement(CheckboxButton, { key: column.param, id: `IntelliTable-${id}-toggle-visibility-${column.param}`, className: "mb-2", text: column.title, onChanged: (checked) => {
                        dispatch({
                            type: ActionType$7.UpdateColumnVisibility,
                            param: column.param,
                            visible: checked,
                        });
                    }, checked: columnVisibilityMap[column.param], ariaLabel: `show "${column.title}" column in the ${title} table`, checkedVariant: Variant$1.Light, uncheckedVariant: Variant$1.Secondary }));
            }),
            React__default["default"].createElement("div", { className: "mt-3" }, "Or you can:"),
            React__default["default"].createElement("button", { type: "button", id: `IntelliTable-${id}-select-all-columns`, className: "btn btn-secondary me-2", "aria-label": `show all columns in the ${title} table`, onClick: () => {
                    dispatch({
                        type: ActionType$7.ShowAllColumns,
                    });
                } }, "Select All"),
            React__default["default"].createElement("button", { type: "button", id: `IntelliTable-${id}-select-none-columns`, className: "btn btn-secondary", "aria-label": `hide all columns in the ${title} table`, onClick: () => {
                    dispatch({
                        type: ActionType$7.HideAllColumns,
                    });
                } }, "Deselect All")));
    }
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
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
        let sortingByThisColumn = false;
        if (!sortColumnParam) {
            // Not being sorted yet
            sortButtonAriaLabel = `sort ascending by ${column.title}`;
            sortIcon = freeSolidSvgIcons.faSort;
        }
        else if (column.param === sortColumnParam) {
            // Already sorted by this column
            sortingByThisColumn = true;
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
        return (React__default["default"].createElement("th", { key: column.param, scope: "col", id: `IntelliTable-${id}-header-${column.param}`, className: "text-start", style: {
                borderRight: '0.05rem solid #555',
                borderLeft: '0.05rem solid #555',
            } },
            React__default["default"].createElement("div", { className: "d-flex align-items-center justify-content-start flex-row h-100" },
                React__default["default"].createElement("span", { className: "text-nowrap" }, column.title),
                React__default["default"].createElement("div", null,
                    React__default["default"].createElement("button", { type: "button", id: `IntelliTable-${id}-sort-by-${column.param}-button`, className: `btn btn-${sortingByThisColumn ? 'light' : 'secondary'} btn-sm ms-1 ps-1 pe-1 pt-0 pb-0`, "aria-label": sortButtonAriaLabel, onClick: () => {
                            dispatch({
                                type: ActionType$7.ToggleSortColumn,
                                param: column.param,
                            });
                        } },
                        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: sortIcon }))))));
    }));
    const tableHeader = (React__default["default"].createElement("thead", null,
        React__default["default"].createElement("tr", null, headerCells)));
    // Sort data
    const sortedData = [...data];
    const paramType = (_a = columns.find((column) => {
        return (column.param === sortColumnParam);
    })) === null || _a === void 0 ? void 0 : _a.type;
    const descending = (sortType === SortType.Descending);
    if (sortColumnParam) {
        sortedData.sort((a, b) => {
            var _a, _b;
            const aVal = a[sortColumnParam];
            const bVal = b[sortColumnParam];
            // Tiebreaker sort by timestamp, most recent first (used if tied)
            const tiebreaker = (((_a = b.timestamp) !== null && _a !== void 0 ? _a : 0)
                - ((_b = a.timestamp) !== null && _b !== void 0 ? _b : 0));
            // Auto-sort undefined and null to end of list
            if ((aVal === undefined || aVal === null)
                || (bVal === undefined || bVal === null)) {
                // At least one was undefined
                if ((aVal === undefined || aVal === null)
                    && (bVal === undefined || bVal === null)) {
                    // Both undefined
                    return tiebreaker;
                }
                if (aVal === undefined || aVal === null) {
                    // First was undefined
                    return 1;
                }
                // Second was undefined
                return -1;
            }
            // Sort differently based on the data type
            // > Boolean
            if (paramType === ParamType$1.Boolean) {
                if (aVal && !bVal) {
                    return (descending ? -1 : 1);
                }
                if (!aVal && bVal) {
                    return (descending ? 1 : -1);
                }
                return tiebreaker;
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
                    return (descending ? 1 : -1);
                }
                if (aVal > bVal) {
                    return (descending ? -1 : 1);
                }
                return tiebreaker;
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
            return tiebreaker;
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
            let colTitle = '';
            if (column.type === ParamType$1.Boolean) {
                fullValue = !!(value);
                const noValue = (value === undefined
                    || value === null);
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faMinus }))
                    : (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: fullValue ? freeSolidSvgIcons.faCheckCircle : freeSolidSvgIcons.faXmarkCircle })));
                colTitle = (fullValue ? 'True' : 'False');
                if (noValue) {
                    colTitle = 'Empty Cell';
                }
            }
            else if (column.type === ParamType$1.Int) {
                fullValue = Number.parseInt(value, 10);
                const noValue = Number.isNaN(fullValue);
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faMinus }))
                    : fullValue);
                colTitle = String(fullValue);
                if (noValue) {
                    colTitle = 'Empty Cell';
                }
            }
            else if (column.type === ParamType$1.Float) {
                fullValue = Number.parseFloat(value);
                const noValue = Number.isNaN(fullValue);
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faMinus }))
                    : roundToNumDecimals(fullValue, 2));
                colTitle = String(fullValue);
                if (noValue) {
                    colTitle = 'Empty Cell';
                }
            }
            else if (column.type === ParamType$1.String) {
                fullValue = String(value).trim();
                const noValue = (value === undefined
                    || value === null
                    || String(fullValue).trim().length === 0);
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faMinus }))
                    : fullValue);
                colTitle = `"${value}"`;
                if (noValue) {
                    colTitle = 'Empty Cell';
                }
            }
            else if (column.type === ParamType$1.JSON) {
                fullValue = JSON.stringify(value);
                const noValue = (Array.isArray(value)
                    ? (!value || value.length === 0)
                    : Object.keys(value !== null && value !== void 0 ? value : {}).length === 0);
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faMinus }))
                    : fullValue);
                colTitle = 'JSON Object';
            }
            // Create UI
            return (React__default["default"].createElement("td", { key: `${datum.id}-${column.param}`, title: colTitle, style: {
                    borderRight: '0.05rem solid #555',
                    borderLeft: '0.05rem solid #555',
                } }, visibleValue));
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
    const csv = genCSV(data, columns.filter((column) => {
        return columnVisibilityMap[column.param];
    }));
    // Build main UI
    return (React__default["default"].createElement("div", { className: `IntelliTable-container-${id}` },
        modal,
        React__default["default"].createElement("div", { className: "d-flex align-items-center justify-content-start" },
            React__default["default"].createElement("h3", { className: "m-0" }, title),
            React__default["default"].createElement("div", { className: "flex-grow-1 text-end" },
                React__default["default"].createElement(CSVDownloadButton, { "aria-label": `download data as csv for ${title}`, id: `IntelliTable-${id}-download-as-csv`, filename: filename, csv: csv }),
                React__default["default"].createElement("button", { type: "button", className: "btn btn-secondary ms-2", "aria-label": `show panel for customizing which columns show in table ${title}`, id: `IntelliTable-${id}-show-column-customization-modal`, onClick: () => {
                        dispatch({
                            type: ActionType$7.ToggleColVisCusModalVisibility,
                        });
                    } },
                    "Show/Hide Cols",
                    numHiddenCols > 0 && (React__default["default"].createElement(React__default["default"].Fragment, null,
                        ' ',
                        "(",
                        numHiddenCols,
                        ' ',
                        "hidden)"))))),
        React__default["default"].createElement("div", { className: `IntelliTable-table-${id} mt-2`, style: {
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
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$2 = `
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
    padding-right: 1em !important;
    margin: 0 !important;
    color: #444 !important;

    right: 0 !important;
    position: absolute !important;
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
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/
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
        title: 'Student?',
        param: 'isLearner',
        type: ParamType$1.Boolean,
    },
    {
        title: 'Teaching Staff?',
        param: 'isTTM',
        type: ParamType$1.Boolean,
        startsHidden: true,
    },
    {
        title: 'Admin?',
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
        title: 'Mobile?',
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
/*------------------------------------------------------------------------*/
/* -------------------------- Static Functions -------------------------- */
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
    const words = (humanReadableName
        .trim()
        // Split into words
        .split(' ')
        // Filter out whitespace
        .filter((word) => {
        return (word.length > 0);
    })
        // Capitalize first letter
        .map((word) => {
        if (word.length <= 1) {
            return word;
        }
        return `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`;
    }));
    // Handle acronyms by piling words together
    const consolidatedWords = [];
    let acronym = '';
    words.forEach((word) => {
        if (word.length === 1) {
            // Add on to acronym
            acronym += word;
        }
        else {
            // Wrap up acronym
            if (acronym.length > 0) {
                consolidatedWords.push(acronym);
                acronym = '';
            }
            // Full word. Just add it
            consolidatedWords.push(word);
        }
    });
    // Add trailing acronym
    if (acronym.length > 0) {
        consolidatedWords.push(acronym);
    }
    // Return
    return consolidatedWords.join(' ');
};
/* ------------- Actions ------------ */
// Types of actions
var ActionType$6;
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
})(ActionType$6 || (ActionType$6 = {}));
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer$7 = (state, action) => {
    switch (action.type) {
        case ActionType$6.StartLoading: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case ActionType$6.FinishLoading: {
            return Object.assign(Object.assign({}, state), { loading: false, logMap: action.logMap });
        }
        case ActionType$6.ToggleFilterDrawer: {
            return Object.assign(Object.assign({}, state), { expandedFilterDrawer: (state.expandedFilterDrawer === action.filterDrawer
                    ? undefined // hide
                    : action.filterDrawer) });
        }
        case ActionType$6.HideFilterDrawer: {
            return Object.assign(Object.assign({}, state), { expandedFilterDrawer: undefined });
        }
        case ActionType$6.ResetFilters: {
            return Object.assign(Object.assign({}, state), { dateFilterState: action.initDateFilterState, contextFilterState: action.initContextFilterState, tagFilterState: action.initTagFilterState, actionErrorFilterState: action.initActionErrorFilterState, advancedFilterState: action.initAdvancedFilterState });
        }
        case ActionType$6.UpdateDateFilterState: {
            return Object.assign(Object.assign({}, state), { dateFilterState: action.dateFilterState });
        }
        case ActionType$6.UpdateContextFilterState: {
            return Object.assign(Object.assign({}, state), { contextFilterState: action.contextFilterState });
        }
        case ActionType$6.UpdateTagFilterState: {
            return Object.assign(Object.assign({}, state), { tagFilterState: action.tagFilterState });
        }
        case ActionType$6.UpdateActionErrorFilterState: {
            return Object.assign(Object.assign({}, state), { actionErrorFilterState: action.actionErrorFilterState });
        }
        case ActionType$6.UpdateAdvancedFilterState: {
            return Object.assign(Object.assign({}, state), { advancedFilterState: action.advancedFilterState });
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const LogReviewer = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    var _a, _b, _c, _d;
    /* -------------- Props ------------- */
    // Destructure props
    const { LogMetadata, onClose, } = props;
    // Create complete map of contexts
    const contextMap = {};
    [
        ((_a = LogMetadata.Context) !== null && _a !== void 0 ? _a : {}),
        LogBuiltInMetadata.Context,
    ].forEach((partialContextMap) => {
        Object.keys(partialContextMap).forEach((context) => {
            // Add context
            contextMap[context] = partialContextMap[context];
            // If context has children, add an "uncategorized" subcontext
            if (typeof contextMap[context] !== 'string') {
                contextMap[context][LogBuiltInMetadata.Context.Uncategorized] = (LogBuiltInMetadata.Context.Uncategorized);
            }
        });
    });
    // Create complete map of targets
    const targetMap = {};
    [
        ((_b = LogMetadata.Target) !== null && _b !== void 0 ? _b : {}),
        LogBuiltInMetadata.Target,
    ].forEach((partialTargetMap) => {
        Object.keys(partialTargetMap).forEach((target) => {
            targetMap[target] = partialTargetMap[target];
        });
    });
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
    Object.keys(contextMap).forEach((context) => {
        const contextValue = contextMap[context];
        if (typeof contextValue === 'string') {
            // Case: no subcontexts, init as checked
            initContextFilterState[contextValue] = true;
        }
        else {
            // Case: subcontexts exist
            initContextFilterState[context] = {};
            Object.values(contextMap[context]).forEach((subcontext) => {
                // Skip self ("_")
                if (subcontext === '_') {
                    return;
                }
                // Initialize as checked
                initContextFilterState[context][subcontext] = true;
            });
        }
    });
    // Create initial tag filter state
    const initTagFilterState = {};
    Object.keys((_c = LogMetadata.Tag) !== null && _c !== void 0 ? _c : {}).forEach((tag) => {
        initTagFilterState[tag] = false;
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
    Object.values(targetMap).forEach((target) => {
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
    const [state, dispatch] = React.useReducer(reducer$7, initialState);
    // Destructure common state
    const { loading, logMap, expandedFilterDrawer, dateFilterState, contextFilterState, tagFilterState, actionErrorFilterState, advancedFilterState, } = state;
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
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
        let { year, month } = newDateFilterState.startDate;
        while (
        // Earlier year
        (year < newDateFilterState.endDate.year)
            // Current year but included month
            || (year === newDateFilterState.endDate.year
                && month <= newDateFilterState.endDate.month)) {
            // Add to list if not already loaded
            if (!logMap[year]
                || !logMap[year][month]) {
                toLoad.push({
                    year,
                    month,
                });
            }
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
            type: ActionType$6.UpdateDateFilterState,
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
            type: ActionType$6.StartLoading,
        });
        // Load required months
        try {
            for (let i = 0; i < toLoad.length; i++) {
                // Destructure
                const { year, month } = toLoad[i];
                // Load
                let logs = [];
                let pageNumber = 1;
                let hasAnotherPage = true;
                while (hasAnotherPage) {
                    const response = yield visitServerEndpoint({
                        path: `${LOG_REVIEW_ROUTE_PATH_PREFIX}/years/${year}/months/${month}`,
                        method: 'GET',
                        params: {
                            pageNumber,
                        },
                    });
                    logs = logs.concat(response.items);
                    hasAnotherPage = response.hasAnotherPage;
                    pageNumber += 1;
                }
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
            type: ActionType$6.FinishLoading,
            logMap,
        });
    });
    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
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
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
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
        /* --------------- Filters -------------- */
        /*----------------------------------------*/
        // Filter toggle
        const filterToggles = (React__default["default"].createElement("div", { className: "LogReviewer-filter-toggles" },
            React__default["default"].createElement("h3", { className: "m-0" }, "Filters:"),
            React__default["default"].createElement("div", { className: "LogReviewer-filter-toggle-buttons alert alert-secondary p-2 m-0" },
                React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-date-filter-drawer", className: `btn btn-${FilterDrawer.Date === expandedFilterDrawer ? 'warning' : 'light'} me-2`, "aria-label": "toggle date filter drawer", onClick: () => {
                        dispatch({
                            type: ActionType$6.ToggleFilterDrawer,
                            filterDrawer: FilterDrawer.Date,
                        });
                    } },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCalendar, className: "me-2" }),
                    "Date"),
                React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-context-filter-drawer", className: `btn btn-${FilterDrawer.Context === expandedFilterDrawer ? 'warning' : 'light'} me-2`, "aria-label": "toggle context filter drawer", onClick: () => {
                        dispatch({
                            type: ActionType$6.ToggleFilterDrawer,
                            filterDrawer: FilterDrawer.Context,
                        });
                    } },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCircle, className: "me-2" }),
                    "Context"),
                (LogMetadata.Tag && Object.keys(LogMetadata.Tag).length > 0) && (React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-tag-filter-drawer", className: `btn btn-${FilterDrawer.Tag === expandedFilterDrawer ? 'warning' : 'light'} me-2`, "aria-label": "toggle tag filter drawer", onClick: () => {
                        dispatch({
                            type: ActionType$6.ToggleFilterDrawer,
                            filterDrawer: FilterDrawer.Tag,
                        });
                    } },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faTag, className: "me-2" }),
                    "Tag")),
                React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-action-filter-drawer", className: `btn btn-${FilterDrawer.Action === expandedFilterDrawer ? 'warning' : 'light'} me-2`, "aria-label": "toggle action and error filter drawer", onClick: () => {
                        dispatch({
                            type: ActionType$6.ToggleFilterDrawer,
                            filterDrawer: FilterDrawer.Action,
                        });
                    } },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faHammer, className: "me-2" }),
                    "Action"),
                React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-advanced-filter-drawer", className: `btn btn-${FilterDrawer.Advanced === expandedFilterDrawer ? 'warning' : 'light'} me-2`, "aria-label": "toggle advanced filter drawer", onClick: () => {
                        dispatch({
                            type: ActionType$6.ToggleFilterDrawer,
                            filterDrawer: FilterDrawer.Advanced,
                        });
                    } },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faList, className: "me-2" }),
                    "Advanced"),
                React__default["default"].createElement("button", { type: "button", id: "LogReviewer-reset-filters-button", className: "btn btn-light", "aria-label": "reset filters", onClick: () => {
                        dispatch({
                            type: ActionType$6.ResetFilters,
                            initActionErrorFilterState,
                            initAdvancedFilterState,
                            initContextFilterState,
                            initDateFilterState,
                            initTagFilterState,
                        });
                    } },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faTimes }),
                    ' ',
                    "Reset"))));
        // Filter drawer
        let filterDrawer;
        if (expandedFilterDrawer) {
            if (expandedFilterDrawer === FilterDrawer.Date) {
                filterDrawer = (React__default["default"].createElement(TabBox, { title: "Date" },
                    React__default["default"].createElement(SimpleDateChooser, { ariaLabel: "filter start date", name: "filter-start-date", year: dateFilterState.startDate.year, month: dateFilterState.startDate.month, day: dateFilterState.startDate.day, chooseFromPast: true, numMonthsToShow: 36, onChange: (month, day, year) => {
                            dateFilterState.startDate = { month, day, year };
                            handleDateRangeUpdated(dateFilterState);
                        } }),
                    ' ',
                    "to",
                    ' ',
                    React__default["default"].createElement(SimpleDateChooser, { ariaLabel: "filter end date", name: "filter-end-date", year: dateFilterState.endDate.year, month: dateFilterState.endDate.month, day: dateFilterState.endDate.day, chooseFromPast: true, numMonthsToShow: 12, onChange: (month, day, year) => {
                            if (year < dateFilterState.startDate.year
                                || (year === dateFilterState.startDate.year
                                    && month < dateFilterState.startDate.month)
                                || (year === dateFilterState.startDate.year
                                    && month === dateFilterState.startDate.month
                                    && day < dateFilterState.startDate.day)) {
                                return alert('Invalid Start Date', 'The start date cannot be before the end date.');
                            }
                            dateFilterState.endDate = { month, day, year };
                            handleDateRangeUpdated(dateFilterState);
                        } })));
            }
            else if (expandedFilterDrawer === FilterDrawer.Context) {
                // Create item picker items
                const builtInPickableItem = {
                    id: 'built-in-contexts',
                    name: 'Auto-logged',
                    isGroup: true,
                    children: [],
                };
                const pickableItems = [];
                Object.keys(contextMap)
                    .forEach((context) => {
                    const value = contextMap[context];
                    if (typeof value === 'string') {
                        // No subcategories
                        const item = {
                            id: context,
                            name: genHumanReadableName(context),
                            isGroup: false,
                            checked: !!contextFilterState[context],
                        };
                        // Add built-in items to its own folder
                        const isBuiltIn = context in LogBuiltInMetadata.Context;
                        if (isBuiltIn) {
                            // Add to built-in pickable item
                            builtInPickableItem.children.push(item);
                        }
                        else {
                            // Add to pickable items list
                            pickableItems.push(item);
                        }
                        return;
                    }
                    // Has subcategories
                    const children = (Object.keys(value)
                        // Remove parent name
                        .filter((subcontext) => {
                        return subcontext !== '_';
                    })
                        // Create child pickable items
                        .map((subcontext) => {
                        return {
                            id: subcontext,
                            name: genHumanReadableName(subcontext),
                            isGroup: false,
                            checked: contextFilterState[context][subcontext],
                        };
                    }));
                    const item = {
                        id: context,
                        name: genHumanReadableName(context),
                        isGroup: true,
                        children,
                    };
                    pickableItems.push(item);
                });
                // Add built-in contexts to end ofl ist
                pickableItems.push(builtInPickableItem);
                // Create filter UI
                filterDrawer = (React__default["default"].createElement(ItemPicker, { title: "Context", items: pickableItems, onChanged: (updatedItems) => {
                        // Update our state
                        updatedItems.forEach((pickableItem) => {
                            if (pickableItem.isGroup) {
                                // Has subcontexts
                                if (pickableItem.id === 'built-in-contexts') {
                                    // Built-in
                                    // Treat as if these were top-level contexts
                                    pickableItem.children.forEach((subcontextItem) => {
                                        contextFilterState[subcontextItem.id] = ('checked' in subcontextItem
                                            && subcontextItem.checked);
                                    });
                                }
                                else {
                                    // Not built-in
                                    pickableItem.children.forEach((subcontextItem) => {
                                        if (!subcontextItem.isGroup) {
                                            contextFilterState[pickableItem.id][subcontextItem.id] = (subcontextItem.checked);
                                        }
                                    });
                                }
                            }
                            else {
                                // No subcontexts
                                contextFilterState[pickableItem.id] = (pickableItem.checked);
                            }
                        });
                        dispatch({
                            type: ActionType$6.UpdateContextFilterState,
                            contextFilterState,
                        });
                    } }));
            }
            else if (expandedFilterDrawer === FilterDrawer.Tag) {
                // Create filter UI
                filterDrawer = (React__default["default"].createElement(TabBox, { title: "Tags" },
                    React__default["default"].createElement("div", null, "If any tags are selected, logs must contain at least one (but not necessarily all) of the selected tags."),
                    React__default["default"].createElement("div", { className: "d-flex gap-1 flex-wrap" }, Object.keys((_d = LogMetadata.Tag) !== null && _d !== void 0 ? _d : {})
                        .map((tag) => {
                        const description = genHumanReadableName(tag);
                        return (React__default["default"].createElement(CheckboxButton, { key: tag, id: `LogReviewer-tag-${tag}-checkbox`, text: description, ariaLabel: `require that logs be tagged with "${description}" or any other selected tag`, checked: tagFilterState[tag], onChanged: (checked) => {
                                tagFilterState[tag] = checked;
                                dispatch({
                                    type: ActionType$6.UpdateTagFilterState,
                                    tagFilterState,
                                });
                            } }));
                    }))));
            }
            else if (expandedFilterDrawer === FilterDrawer.Action) {
                // Create filter UI
                filterDrawer = (React__default["default"].createElement(React__default["default"].Fragment, null,
                    React__default["default"].createElement(TabBox, { title: "Log Type" },
                        React__default["default"].createElement(RadioButton, { id: "LogReviewer-type-all", text: "All Logs", onSelected: () => {
                                actionErrorFilterState.type = undefined;
                                dispatch({
                                    type: ActionType$6.UpdateActionErrorFilterState,
                                    actionErrorFilterState,
                                });
                            }, ariaLabel: "show logs of all types", selected: actionErrorFilterState.type === undefined }),
                        React__default["default"].createElement(RadioButton, { id: "LogReviewer-type-action-only", text: "Action Logs Only", onSelected: () => {
                                actionErrorFilterState.type = LogType$1.Action;
                                dispatch({
                                    type: ActionType$6.UpdateActionErrorFilterState,
                                    actionErrorFilterState,
                                });
                            }, ariaLabel: "only show action logs", selected: actionErrorFilterState.type === LogType$1.Action }),
                        React__default["default"].createElement(RadioButton, { id: "LogReviewer-type-error-only", text: "Action Error Only", onSelected: () => {
                                actionErrorFilterState.type = LogType$1.Error;
                                dispatch({
                                    type: ActionType$6.UpdateActionErrorFilterState,
                                    actionErrorFilterState,
                                });
                            }, ariaLabel: "only show error logs", selected: actionErrorFilterState.type === LogType$1.Error, noMarginOnRight: true })),
                    (actionErrorFilterState.type === undefined
                        || actionErrorFilterState.type === LogType$1.Action) && (React__default["default"].createElement(TabBox, { title: "Action Log Details" },
                        React__default["default"].createElement(ButtonInputGroup, { label: "Action", className: "mb-2", wrapButtonsAndAddGaps: true }, Object.keys(LogAction$1)
                            .map((action) => {
                            const description = genHumanReadableName(action);
                            return (React__default["default"].createElement(CheckboxButton, { key: action, id: `LogReviewer-action-${action}-checkbox`, text: description, ariaLabel: `include logs with action type "${description}" in results`, noMarginOnRight: true, checked: actionErrorFilterState.action[action], onChanged: (checked) => {
                                    actionErrorFilterState.action[action] = checked;
                                    dispatch({
                                        type: ActionType$6.UpdateActionErrorFilterState,
                                        actionErrorFilterState,
                                    });
                                } }));
                        })),
                        React__default["default"].createElement(ButtonInputGroup, { label: "Target", wrapButtonsAndAddGaps: true }, Object.keys(targetMap)
                            .map((target) => {
                            const description = genHumanReadableName(target);
                            return (React__default["default"].createElement(CheckboxButton, { key: target, id: `LogReviewer-target-${target}-checkbox`, text: description, ariaLabel: `include logs with target "${description}" in results`, checked: actionErrorFilterState.target[target], noMarginOnRight: true, onChanged: (checked) => {
                                    actionErrorFilterState.target[target] = checked;
                                    dispatch({
                                        type: ActionType$6.UpdateActionErrorFilterState,
                                        actionErrorFilterState,
                                    });
                                } }));
                        })))),
                    (actionErrorFilterState.type === undefined
                        || actionErrorFilterState.type === LogType$1.Error) && (React__default["default"].createElement(TabBox, { title: "Error Log Details" },
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "Error Message"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for error message", value: actionErrorFilterState.errorMessage, placeholder: "e.g. undefined is not a function", onChange: (e) => {
                                    actionErrorFilterState.errorMessage = e.target.value;
                                    dispatch({
                                        type: ActionType$6.UpdateActionErrorFilterState,
                                        actionErrorFilterState,
                                    });
                                } })),
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "Error Code"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for error code", value: actionErrorFilterState.errorCode, placeholder: "e.g. GC22", onChange: (e) => {
                                    actionErrorFilterState.errorCode = ((e.target.value)
                                        .trim()
                                        .toUpperCase());
                                    dispatch({
                                        type: ActionType$6.UpdateActionErrorFilterState,
                                        actionErrorFilterState,
                                    });
                                } }))))));
            }
            else if (expandedFilterDrawer === FilterDrawer.Advanced) {
                // Create advanced filter ui
                filterDrawer = (React__default["default"].createElement(React__default["default"].Fragment, null,
                    React__default["default"].createElement(TabBox, { title: "User" },
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "User First Name"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for user first name", value: advancedFilterState.userFirstName, placeholder: "e.g. Divardo", onChange: (e) => {
                                    advancedFilterState.userFirstName = e.target.value;
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } })),
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "User Last Name"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for user last name", value: advancedFilterState.userLastName, placeholder: "e.g. Calicci", onChange: (e) => {
                                    advancedFilterState.userLastName = e.target.value;
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } })),
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "User Email"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for user email", value: advancedFilterState.userEmail, placeholder: "e.g. calicci@fas.harvard.edu", onChange: (e) => {
                                    advancedFilterState.userEmail = ((e.target.value)
                                        .trim());
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } })),
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "User Canvas Id"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for user canvas id", value: advancedFilterState.userId, placeholder: "e.g. 104985", onChange: (e) => {
                                    const { value } = e.target;
                                    // Only update if value contains only numbers
                                    if (/^\d+$/.test(value)) {
                                        advancedFilterState.userId = ((e.target.value)
                                            .trim());
                                    }
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } })),
                        React__default["default"].createElement(ButtonInputGroup, { label: "Role" },
                            React__default["default"].createElement(CheckboxButton, { text: "Students", onChanged: (checked) => {
                                    advancedFilterState.includeLearners = checked;
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                }, checked: advancedFilterState.includeLearners, ariaLabel: "show logs from students" }),
                            React__default["default"].createElement(CheckboxButton, { text: "Teaching Team Members", onChanged: (checked) => {
                                    advancedFilterState.includeTTMs = checked;
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                }, checked: advancedFilterState.includeTTMs, ariaLabel: "show logs from teaching team members" }),
                            React__default["default"].createElement(CheckboxButton, { text: "Admins", onChanged: (checked) => {
                                    advancedFilterState.includeAdmins = checked;
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                }, checked: advancedFilterState.includeAdmins, ariaLabel: "show logs from admins" }))),
                    React__default["default"].createElement(TabBox, { title: "Course" },
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "Course Name"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for course name", value: advancedFilterState.courseName, placeholder: "e.g. GLC 200", onChange: (e) => {
                                    advancedFilterState.courseName = e.target.value;
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } })),
                        React__default["default"].createElement("div", { className: "input-group mb-2" },
                            React__default["default"].createElement("span", { className: "input-group-text" }, "Course Canvas Id"),
                            React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for course canvas id", value: advancedFilterState.courseId, placeholder: "e.g. 15948", onChange: (e) => {
                                    const { value } = e.target;
                                    // Only update if value contains only numbers
                                    if (/^\d+$/.test(value)) {
                                        advancedFilterState.courseId = ((e.target.value)
                                            .trim());
                                    }
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } }))),
                    React__default["default"].createElement(TabBox, { title: "Device" },
                        React__default["default"].createElement(ButtonInputGroup, { label: "Device Type" },
                            React__default["default"].createElement(RadioButton, { text: "All Devices", ariaLabel: "show logs from all devices", selected: advancedFilterState.isMobile === undefined, onSelected: () => {
                                    advancedFilterState.isMobile = undefined;
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } }),
                            React__default["default"].createElement(RadioButton, { text: "Mobile Only", ariaLabel: "show logs from mobile devices", selected: advancedFilterState.isMobile === true, onSelected: () => {
                                    advancedFilterState.isMobile = true;
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } }),
                            React__default["default"].createElement(RadioButton, { text: "Desktop Only", ariaLabel: "show logs from desktop devices", selected: advancedFilterState.isMobile === false, onSelected: () => {
                                    advancedFilterState.isMobile = false;
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                }, noMarginOnRight: true }))),
                    React__default["default"].createElement(TabBox, { title: "Source" },
                        React__default["default"].createElement(ButtonInputGroup, { label: "Source Type" },
                            React__default["default"].createElement(RadioButton, { text: "Both", ariaLabel: "show logs from all sources", selected: advancedFilterState.source === undefined, onSelected: () => {
                                    advancedFilterState.source = undefined;
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } }),
                            React__default["default"].createElement(RadioButton, { text: "Client Only", ariaLabel: "show logs from client source", selected: advancedFilterState.source === LogSource$1.Client, onSelected: () => {
                                    advancedFilterState.source = LogSource$1.Client;
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                } }),
                            React__default["default"].createElement(RadioButton, { text: "Server Only", ariaLabel: "show logs from server source", selected: advancedFilterState.source === LogSource$1.Server, onSelected: () => {
                                    advancedFilterState.source = LogSource$1.Server;
                                    dispatch({
                                        type: ActionType$6.UpdateAdvancedFilterState,
                                        advancedFilterState,
                                    });
                                }, noMarginOnRight: true })),
                        advancedFilterState.source !== LogSource$1.Client && (React__default["default"].createElement("div", { className: "mt-2" },
                            React__default["default"].createElement("div", { className: "input-group mb-2" },
                                React__default["default"].createElement("span", { className: "input-group-text" }, "Server Route Path"),
                                React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for server route path", value: advancedFilterState.routePath, placeholder: "e.g. /api/ttm/courses/12345", onChange: (e) => {
                                        advancedFilterState.courseName = ((e.target.value)
                                            .trim());
                                        dispatch({
                                            type: ActionType$6.UpdateAdvancedFilterState,
                                            advancedFilterState,
                                        });
                                    } })),
                            React__default["default"].createElement("div", { className: "input-group mb-2" },
                                React__default["default"].createElement("span", { className: "input-group-text" }, "Server Route Template"),
                                React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": "query for server route template", value: advancedFilterState.routeTemplate, placeholder: "e.g. /api/ttm/courses/:courseId", onChange: (e) => {
                                        advancedFilterState.courseName = ((e.target.value)
                                            .trim());
                                        dispatch({
                                            type: ActionType$6.UpdateAdvancedFilterState,
                                            advancedFilterState,
                                        });
                                    } })))))));
            }
        }
        // Filters UI
        const filters = (React__default["default"].createElement(React__default["default"].Fragment, null,
            filterToggles,
            filterDrawer && (React__default["default"].createElement(Drawer, { customBackgroundColor: "#eee" }, filterDrawer))));
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
                        || (
                        // Has subcontexts
                        typeof contextFilterState[log.context] !== 'boolean'
                            // None of the subcontexts are selected
                            && Object.values((_a = contextFilterState[log.context]) !== null && _a !== void 0 ? _a : {})
                                .every((isSelected) => {
                                return !isSelected;
                            }))) {
                        return;
                    }
                    // Subcontext doesn't match
                    if (
                    // Log context is not "uncategorized" (no point in further filters)
                    log.context !== LogBuiltInMetadata.Context.Uncategorized
                        // Log has a subcontext
                        && log.subcontext
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
                    // At least one tag is required
                    Object.values(tagFilterState)
                        .filter((isSelected) => {
                        return isSelected;
                    })
                        .length > 0
                        // No tags match
                        && log.tags.every((tag) => {
                            return !tagFilterState[tag];
                        })) {
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
                        && (advancedFilterState.isMobile !== log.device.isMobile)) {
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
        /* ---------------- Data ---------------- */
        /*----------------------------------------*/
        // Nothing to show notice
        const noLogsNotice = (logs.length === 0
            ? (React__default["default"].createElement("div", { className: "alert alert-warning text-center mt-2" },
                React__default["default"].createElement("h4", { className: "m-1" }, "No Logs to Show"),
                React__default["default"].createElement("div", null, "Either your filters are too strict or no matching logs have been created yet.")))
            : undefined);
        // Create intelliTable
        const dataTable = (React__default["default"].createElement(IntelliTable, { title: "Matching Logs:", csvName: `Logs from ${getHumanReadableDate()}`, id: "logs", data: logs, columns: columns }));
        // Main body
        body = (React__default["default"].createElement(React__default["default"].Fragment, null,
            filters,
            React__default["default"].createElement("div", { className: "mt-2" },
                dataTable,
                noLogsNotice)));
    }
    /* ---------- Wrap in Modal --------- */
    return (React__default["default"].createElement("div", { className: "LogReviewer-outer-container" },
        React__default["default"].createElement("style", null, style$2),
        React__default["default"].createElement("div", { className: "LogReviewer-inner-container" },
            React__default["default"].createElement("div", { className: "LogReviewer-header" },
                React__default["default"].createElement("div", { className: "LogReviewer-header-title" },
                    React__default["default"].createElement("h3", { className: "text-center m-0" }, "Log Review Dashboard")),
                React__default["default"].createElement("div", { style: { width: 0 } },
                    React__default["default"].createElement("button", { type: "button", className: "LogReviewer-header-close-button btn btn-dark btn-lg pe-0", "aria-label": "close log reviewer panel", onClick: onClose },
                        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faTimes })))),
            React__default["default"].createElement("div", { className: "LogReviewer-contents" }, body))));
};

/**
 * Options for field types
 * @author Yuen Ler Chow
 */
var DBEntryFieldType;
(function (DBEntryFieldType) {
    // A string input field
    DBEntryFieldType["String"] = "String";
    // A number input field
    DBEntryFieldType["Number"] = "Number";
    // input field with subfields that are also DBEntryFields
    DBEntryFieldType["Object"] = "Object";
    // list of strings input field
    DBEntryFieldType["StringArray"] = "StringArray";
    // list of numbers input field
    DBEntryFieldType["NumberArray"] = "NumberArray";
})(DBEntryFieldType || (DBEntryFieldType = {}));
var DBEntryFieldType$1 = DBEntryFieldType;

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? process.env.NODE_ENV === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (process.env.NODE_ENV !== 'production') {
      var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;

      if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) {
        // this would only cause problem in speedy mode
        // but we don't want enabling speedy to affect the observable behavior
        // so we report this error at all times
        console.error("You're attempting to insert the following rule:\n" + rule + '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.');
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
    }

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (process.env.NODE_ENV !== 'production' && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(rule)) {
          console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;

    if (process.env.NODE_ENV !== 'production') {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };

  return StyleSheet;
}();

var MS = '-ms-';
var MOZ = '-moz-';
var WEBKIT = '-webkit-';

var COMMENT = 'comm';
var RULESET = 'rule';
var DECLARATION = 'decl';
var IMPORT = '@import';
var KEYFRAMES = '@keyframes';
var LAYER = '@layer';

/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs;

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode;

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign;

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return charat(value, 0) ^ 45 ? (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3) : 0
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}

var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = '';

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return assign(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? charat(characters, --position) : 0;

	if (column--, character === 10)
		column = 1, line--;

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? charat(characters, position++) : 0;

	if (column++, character === 10)
		column = 1, line++;

	return character
}

/**
 * @return {number}
 */
function peek () {
	return charat(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return substr(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = strlen(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next();
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character);
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type);
				break
			// \
			case 92:
				next();
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + from(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next();

	return slice(index, position)
}

/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return dealloc(parse('', null, null, null, [''], value = alloc(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character = 0;
	var type = '';
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters = type;

	while (scanning)
		switch (previous = character, character = next()) {
			// (
			case 40:
				if (previous != 108 && charat(characters, length - 1) == 58) {
					if (indexof(characters += replace(delimit(character), '&', '&\f'), '&\f') != -1)
						ampersand = -1;
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += delimit(character);
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += whitespace(previous);
				break
			// \
			case 92:
				characters += escaping(caret() - 1, 7);
				continue
			// /
			case 47:
				switch (peek()) {
					case 42: case 47:
						append(comment(commenter(next(), caret()), root, parent), declarations);
						break
					default:
						characters += '/';
				}
				break
			// {
			case 123 * variable:
				points[index++] = strlen(characters) * ampersand;
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0;
					// ;
					case 59 + offset: if (ampersand == -1) characters = replace(characters, /\f/g, '');
						if (property > 0 && (strlen(characters) - length))
							append(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration(replace(characters, ' ', '') + ';', rule, parent, length - 2), declarations);
						break
					// @ ;
					case 59: characters += ';';
					// { rule/at-rule
					default:
						append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets);

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children);
							else
								switch (atrule === 99 && charat(characters, 3) === 110 ? 100 : atrule) {
									// d l m s
									case 100: case 108: case 109: case 115:
										parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children);
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children);
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo;
				break
			// :
			case 58:
				length = 1 + strlen(characters), property = previous;
			default:
				if (variable < 1)
					if (character == 123)
						--variable;
					else if (character == 125 && variable++ == 0 && prev() == 125)
						continue

				switch (characters += from(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1);
						break
					// ,
					case 44:
						points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
						break
					// @
					case 64:
						// -
						if (peek() === 45)
							characters += delimit(next());

						atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
						break
					// -
					case 45:
						if (previous === 45 && strlen(characters) == 2)
							variable = 0;
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [''];
	var size = sizeof(rule);

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
			if (z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x])))
				props[k++] = z;

	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length)
}

/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = '';
	var length = sizeof(children);

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || '';

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break
		case IMPORT: case DECLARATION: return element.return = element.return || element.value
		case COMMENT: return ''
		case KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case RULESET: element.value = element.props.join(',');
	}

	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}

/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = sizeof(collection);

	return function (element, index, children, callback) {
		var output = '';

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || '';

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element);
	}
}

var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = peek(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if (token(character)) {
      break;
    }

    next();
  }

  return slice(begin, position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch (token(character)) {
      case 0:
        // &\f
        if (character === 38 && peek() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;

      case 2:
        parsed[index] += delimit(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = peek() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += from(character);
    }
  } while (character = next());

  return parsed;
};

var getRules = function getRules(value, points) {
  return dealloc(toRules(alloc(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};
var ignoreFlag = 'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason';

var isIgnoringComment = function isIgnoringComment(element) {
  return element.type === 'comm' && element.children.indexOf(ignoreFlag) > -1;
};

var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
  return function (element, index, children) {
    if (element.type !== 'rule' || cache.compat) return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);

    if (unsafePseudoClasses) {
      var isNested = !!element.parent; // in nested rules comments become children of the "auto-inserted" rule and that's always the `element.parent`
      //
      // considering this input:
      // .a {
      //   .b /* comm */ {}
      //   color: hotpink;
      // }
      // we get output corresponding to this:
      // .a {
      //   & {
      //     /* comm */
      //     color: hotpink;
      //   }
      //   .b {}
      // }

      var commentContainer = isNested ? element.parent.children : // global rule at the root level
      children;

      for (var i = commentContainer.length - 1; i >= 0; i--) {
        var node = commentContainer[i];

        if (node.line < element.line) {
          break;
        } // it is quite weird but comments are *usually* put at `column: element.column - 1`
        // so we seek *from the end* for the node that is earlier than the rule's `element` and check that
        // this will also match inputs like this:
        // .a {
        //   /* comm */
        //   .b {}
        // }
        //
        // but that is fine
        //
        // it would be the easiest to change the placement of the comment to be the first child of the rule:
        // .a {
        //   .b { /* comm */ }
        // }
        // with such inputs we wouldn't have to search for the comment at all
        // TODO: consider changing this comment placement in the next major version


        if (node.column < element.column) {
          if (isIgnoringComment(node)) {
            return;
          }

          break;
        }
      }

      unsafePseudoClasses.forEach(function (unsafePseudoClass) {
        console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split('-child')[0] + "-of-type\".");
      });
    }
  };
};

var isImportRule = function isImportRule(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};

var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }

  return false;
}; // use this to remove incorrect elements from further processing
// so they don't get handed to the `sheet` (or anything else)
// as that could potentially lead to additional logs which in turn could be overhelming to the user


var nullifyElement = function nullifyElement(element) {
  element.type = '';
  element.value = '';
  element["return"] = '';
  element.children = '';
  element.props = '';
};

var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }

  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};

/* eslint-disable no-fallthrough */

function prefix(value, length) {
  switch (hash(value, length)) {
    // color-adjust
    case 5103:
      return WEBKIT + 'print-' + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust

    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    // flex, flex-direction

    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    // order

    case 6165:
      return WEBKIT + value + MS + 'flex-' + value + value;
    // align-items

    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value;
    // align-self

    case 5443:
      return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/, '') + value;
    // align-content

    case 4675:
      return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/, '') + value;
    // flex-shrink

    case 5548:
      return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value;
    // flex-basis

    case 5292:
      return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value;
    // flex-grow

    case 6060:
      return WEBKIT + 'box-' + replace(value, '-grow', '') + WEBKIT + value + MS + replace(value, 'grow', 'positive') + value;
    // transition

    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value;
    // cursor

    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value;
    // background, background-image

    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1');
    // justify-content

    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)

    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value;
    // (min|max)?(width|height|inline-size|block-size)

    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if (strlen(value) - 1 - length > 6) switch (charat(value, length + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          // -
          if (charat(value, length + 4) !== 45) break;
        // (f)ill-available, (f)it-content

        case 102:
          return replace(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
        // (s)tretch

        case 115:
          return ~indexof(value, 'stretch') ? prefix(replace(value, 'stretch', 'fill-available'), length) + value : value;
      }
      break;
    // position: sticky

    case 4949:
      // (s)ticky?
      if (charat(value, length + 1) !== 115) break;
    // display: (flex|inline-flex)

    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, '!important') && 10))) {
        // stic(k)y
        case 107:
          return replace(value, ':', ':' + WEBKIT) + value;
        // (inline-)?fl(e)x

        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + WEBKIT + (charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value;
      }

      break;
    // writing-mode

    case 5936:
      switch (charat(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
        // vertical-r(l)

        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
        // horizontal(-)tb

        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
      }

      return WEBKIT + value + MS + value + value;
  }

  return value;
}

var prefixer = function prefixer(element, index, children, callback) {
  if (element.length > -1) if (!element["return"]) switch (element.type) {
    case DECLARATION:
      element["return"] = prefix(element.value, element.length);
      break;

    case KEYFRAMES:
      return serialize([copy(element, {
        value: replace(element.value, '@', '@' + WEBKIT)
      })], callback);

    case RULESET:
      if (element.length) return combine(element.props, function (value) {
        switch (match(value, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ':read-only':
          case ':read-write':
            return serialize([copy(element, {
              props: [replace(value, /:(read-\w+)/, ':' + MOZ + '$1')]
            })], callback);
          // :placeholder

          case '::placeholder':
            return serialize([copy(element, {
              props: [replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1')]
            }), copy(element, {
              props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')]
            }), copy(element, {
              props: [replace(value, /:(plac\w+)/, MS + 'input-$1')]
            })], callback);
        }

        return '';
      });
  }
};

var isBrowser$4 = typeof document !== 'undefined';
var getServerStylisCache = isBrowser$4 ? undefined : weakMemoize(function () {
  return memoize(function () {
    var cache = {};
    return function (name) {
      return cache[name];
    };
  });
});
var defaultStylisPlugins = [prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if (process.env.NODE_ENV !== 'production' && !key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\n" + "If multiple caches share the same key they might \"fight\" for each other's style elements.");
  }

  if (isBrowser$4 && key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe
    if (/[^a-z-]/.test(key)) {
      throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
    }
  }

  var inserted = {};
  var container;
  var nodesToHydrate = [];

  if (isBrowser$4) {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if (process.env.NODE_ENV !== 'production') {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }

    }), incorrectImportAlarm);
  }

  if (isBrowser$4) {
    var currentSheet;
    var finalizingPlugins = [stringify, process.env.NODE_ENV !== 'production' ? function (element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== COMMENT) {
          // insert empty rule in non-production environments
          // so @emotion/jest can grab `key` from the (JS)DOM for caches without any rules inserted yet
          currentSheet.insert(element.value + "{}");
        }
      }
    } : rulesheet(function (rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return serialize(compile(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      if (process.env.NODE_ENV !== 'production' && serialized.map !== undefined) {
        currentSheet = {
          insert: function insert(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  } else {
    var _finalizingPlugins = [stringify];

    var _serializer = middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));

    var _stylis = function _stylis(styles) {
      return serialize(compile(styles), _serializer);
    }; // $FlowFixMe


    var serverStylisCache = getServerStylisCache(stylisPlugins)(key);

    var getRules = function getRules(selector, serialized) {
      var name = serialized.name;

      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      }

      return serverStylisCache[name];
    };

    _insert = function _insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      var rules = getRules(selector, serialized);

      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true;
        }

        if ( // using === development instead of !== production
        // because if people do ssr in tests, the source maps showing up would be annoying
        process.env.NODE_ENV === 'development' && serialized.map !== undefined) {
          return rules + serialized.map;
        }

        return rules;
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

var reactIs$1 = {exports: {}};

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_production_min;

function requireReactIs_production_min () {
	if (hasRequiredReactIs_production_min) return reactIs_production_min;
	hasRequiredReactIs_production_min = 1;
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
	Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
	function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}reactIs_production_min.AsyncMode=l;reactIs_production_min.ConcurrentMode=m;reactIs_production_min.ContextConsumer=k;reactIs_production_min.ContextProvider=h;reactIs_production_min.Element=c;reactIs_production_min.ForwardRef=n;reactIs_production_min.Fragment=e;reactIs_production_min.Lazy=t;reactIs_production_min.Memo=r;reactIs_production_min.Portal=d;
	reactIs_production_min.Profiler=g;reactIs_production_min.StrictMode=f;reactIs_production_min.Suspense=p;reactIs_production_min.isAsyncMode=function(a){return A(a)||z(a)===l};reactIs_production_min.isConcurrentMode=A;reactIs_production_min.isContextConsumer=function(a){return z(a)===k};reactIs_production_min.isContextProvider=function(a){return z(a)===h};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min.isForwardRef=function(a){return z(a)===n};reactIs_production_min.isFragment=function(a){return z(a)===e};reactIs_production_min.isLazy=function(a){return z(a)===t};
	reactIs_production_min.isMemo=function(a){return z(a)===r};reactIs_production_min.isPortal=function(a){return z(a)===d};reactIs_production_min.isProfiler=function(a){return z(a)===g};reactIs_production_min.isStrictMode=function(a){return z(a)===f};reactIs_production_min.isSuspense=function(a){return z(a)===p};
	reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};reactIs_production_min.typeOf=z;
	return reactIs_production_min;
}

var reactIs_development = {};

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactIs_development;

function requireReactIs_development () {
	if (hasRequiredReactIs_development) return reactIs_development;
	hasRequiredReactIs_development = 1;



	if (process.env.NODE_ENV !== "production") {
	  (function() {

	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
	// (unstable) APIs that have been removed. Can we remove the symbols?

	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
	var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
	var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
	var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
	var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
	}

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;

	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_CONCURRENT_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	            return type;

	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_LAZY_TYPE:
	              case REACT_MEMO_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;

	              default:
	                return $$typeof;
	            }

	        }

	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	} // AsyncMode is deprecated along with isAsyncMode

	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;
	var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

	      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	    }
	  }

	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isConcurrentMode(object) {
	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}

	reactIs_development.AsyncMode = AsyncMode;
	reactIs_development.ConcurrentMode = ConcurrentMode;
	reactIs_development.ContextConsumer = ContextConsumer;
	reactIs_development.ContextProvider = ContextProvider;
	reactIs_development.Element = Element;
	reactIs_development.ForwardRef = ForwardRef;
	reactIs_development.Fragment = Fragment;
	reactIs_development.Lazy = Lazy;
	reactIs_development.Memo = Memo;
	reactIs_development.Portal = Portal;
	reactIs_development.Profiler = Profiler;
	reactIs_development.StrictMode = StrictMode;
	reactIs_development.Suspense = Suspense;
	reactIs_development.isAsyncMode = isAsyncMode;
	reactIs_development.isConcurrentMode = isConcurrentMode;
	reactIs_development.isContextConsumer = isContextConsumer;
	reactIs_development.isContextProvider = isContextProvider;
	reactIs_development.isElement = isElement;
	reactIs_development.isForwardRef = isForwardRef;
	reactIs_development.isFragment = isFragment;
	reactIs_development.isLazy = isLazy;
	reactIs_development.isMemo = isMemo;
	reactIs_development.isPortal = isPortal;
	reactIs_development.isProfiler = isProfiler;
	reactIs_development.isStrictMode = isStrictMode;
	reactIs_development.isSuspense = isSuspense;
	reactIs_development.isValidElementType = isValidElementType;
	reactIs_development.typeOf = typeOf;
	  })();
	}
	return reactIs_development;
}

(function (module) {

	if (process.env.NODE_ENV === 'production') {
	  module.exports = requireReactIs_production_min();
	} else {
	  module.exports = requireReactIs_development();
	}
} (reactIs$1));

var reactIs = reactIs$1.exports;
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

var isBrowser$3 = typeof document !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser$3 === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var stylesForSSR = '';
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      if (!isBrowser$3 && maybeStyles !== undefined) {
        stylesForSSR += maybeStyles;
      }

      current = current.next;
    } while (current !== undefined);

    if (!isBrowser$3 && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

if (process.env.NODE_ENV !== 'production') {
  var contentValuePattern = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  var contentValues = ['normal', 'none', 'initial', 'inherit', 'unset'];
  var oldProcessStyleValue = processStyleValue;
  var msPattern = /^-ms-/;
  var hyphenPattern = /-(.)/g;
  var hyphenatedCache = {};

  processStyleValue = function processStyleValue(key, value) {
    if (key === 'content') {
      if (typeof value !== 'string' || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }

    var processed = oldProcessStyleValue(key, value);

    if (processed !== '' && !isCustomProperty(key) && key.indexOf('-') !== -1 && hyphenatedCache[key] === undefined) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, 'ms-').replace(hyphenPattern, function (str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }

    return processed;
  };
}

var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {
    if (process.env.NODE_ENV !== 'production' && interpolation.toString() === 'NO_COMPONENT_SELECTOR') {
      throw new Error(noComponentSelectorMessage);
    }

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          if (process.env.NODE_ENV !== 'production' && interpolation.map !== undefined) {
            styles += interpolation.map;
          }

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        } else if (process.env.NODE_ENV !== 'production') {
          console.error('Functions that are interpolated in css calls will be stringified.\n' + 'If you want to have a css call based on props, create a function that returns a css call like this\n' + 'let dynamicStyle = (props) => css`color: ${props.color}`\n' + 'It can be called directly with props or interpolated in a styled call like this\n' + "let SomeComponent = styled('div')`${dynamicStyle}`");
        }

        break;
      }

    case 'string':
      if (process.env.NODE_ENV !== 'production') {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function (match, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, '') + "`");
          return "${" + fakeVarName + "}";
        });

        if (matched.length) {
          console.error('`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\n' + 'Instead of doing this:\n\n' + [].concat(matched, ["`" + replaced + "`"]).join('\n') + '\n\nYou should wrap it with `css` like this:\n\n' + ("css`" + replaced + "`"));
        }
      }

      break;
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && process.env.NODE_ENV !== 'production') {
          throw new Error(noComponentSelectorMessage);
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                if (process.env.NODE_ENV !== 'production' && _key === 'undefined') {
                  console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
                }

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;

if (process.env.NODE_ENV !== 'production') {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
} // this is the cursor for keyframes
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if (process.env.NODE_ENV !== 'production' && strings[0] === undefined) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {
      if (process.env.NODE_ENV !== 'production' && strings[i] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }

      styles += strings[i];
    }
  }

  var sourceMap;

  if (process.env.NODE_ENV !== 'production') {
    styles = styles.replace(sourceMapPattern, function (match) {
      sourceMap = match;
      return '';
    });
  } // using a global regex with .exec is stateful so lastIndex has to be reset each time


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  if (process.env.NODE_ENV !== 'production') {
    // $FlowFixMe SerializedStyles type doesn't have toString property (and we don't want to add it)
    return {
      name: name,
      styles: styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};

var isBrowser$2 = typeof document !== 'undefined';

var syncFallback = function syncFallback(create) {
  return create();
};

var useInsertionEffect = React__namespace['useInsertion' + 'Effect'] ? React__namespace['useInsertion' + 'Effect'] : false;
var useInsertionEffectAlwaysWithSyncFallback = !isBrowser$2 ? syncFallback : useInsertionEffect || syncFallback;
var useInsertionEffectWithLayoutFallback = useInsertionEffect || React__namespace.useLayoutEffect;

var isBrowser$1 = typeof document !== 'undefined';
var hasOwnProperty = {}.hasOwnProperty;

var EmotionCacheContext = /* #__PURE__ */React__namespace.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */createCache({
  key: 'css'
}) : null);

if (process.env.NODE_ENV !== 'production') {
  EmotionCacheContext.displayName = 'EmotionCacheContext';
}

EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/React.forwardRef(function (props, ref) {
    // the cache will never be null in the browser
    var cache = React.useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

if (!isBrowser$1) {
  withEmotionCache = function withEmotionCache(func) {
    return function (props) {
      var cache = React.useContext(EmotionCacheContext);

      if (cache === null) {
        // yes, we're potentially creating this on every render
        // it doesn't actually matter though since it's only on the server
        // so there will only every be a single render
        // that could change in the future because of suspense and etc. but for now,
        // this works and i don't want to optimise for a future thing that we aren't sure about
        cache = createCache({
          key: 'css'
        });
        return /*#__PURE__*/React__namespace.createElement(EmotionCacheContext.Provider, {
          value: cache
        }, func(props, cache));
      } else {
        return func(props, cache);
      }
    };
  };
}

var ThemeContext = /* #__PURE__ */React__namespace.createContext({});

if (process.env.NODE_ENV !== 'production') {
  ThemeContext.displayName = 'EmotionThemeContext';
}

var getLastPart = function getLastPart(functionName) {
  // The match may be something like 'Object.createEmotionProps' or
  // 'Loader.prototype.render'
  var parts = functionName.split('.');
  return parts[parts.length - 1];
};

var getFunctionNameFromStackTraceLine = function getFunctionNameFromStackTraceLine(line) {
  // V8
  var match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line);
  if (match) return getLastPart(match[1]); // Safari / Firefox

  match = /^([A-Za-z0-9$.]+)@/.exec(line);
  if (match) return getLastPart(match[1]);
  return undefined;
};

var internalReactFunctionNames = /* #__PURE__ */new Set(['renderWithHooks', 'processChild', 'finishClassComponent', 'renderToString']); // These identifiers come from error stacks, so they have to be valid JS
// identifiers, thus we only need to replace what is a valid character for JS,
// but not for CSS.

var sanitizeIdentifier = function sanitizeIdentifier(identifier) {
  return identifier.replace(/\$/g, '-');
};

var getLabelFromStackTrace = function getLabelFromStackTrace(stackTrace) {
  if (!stackTrace) return undefined;
  var lines = stackTrace.split('\n');

  for (var i = 0; i < lines.length; i++) {
    var functionName = getFunctionNameFromStackTraceLine(lines[i]); // The first line of V8 stack traces is just "Error"

    if (!functionName) continue; // If we reach one of these, we have gone too far and should quit

    if (internalReactFunctionNames.has(functionName)) break; // The component name is the first function in the stack that starts with an
    // uppercase letter

    if (/^[A-Z]/.test(functionName)) return sanitizeIdentifier(functionName);
  }

  return undefined;
};

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';
var createEmotionProps = function createEmotionProps(type, props) {
  if (process.env.NODE_ENV !== 'production' && typeof props.css === 'string' && // check if there is a css declaration
  props.css.indexOf(':') !== -1) {
    throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
  }

  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type; // For performance, only call getLabelFromStackTrace in development and when
  // the label hasn't already been computed

  if (process.env.NODE_ENV !== 'production' && !!props.css && (typeof props.css !== 'object' || typeof props.css.name !== 'string' || props.css.name.indexOf('-') === -1)) {
    var label = getLabelFromStackTrace(new Error().stack);
    if (label) newProps[labelPropName] = label;
  }

  return newProps;
};

var Insertion$1 = function Insertion(_ref) {
  var cache = _ref.cache,
      serialized = _ref.serialized,
      isStringTag = _ref.isStringTag;
  registerStyles(cache, serialized, isStringTag);
  var rules = useInsertionEffectAlwaysWithSyncFallback(function () {
    return insertStyles(cache, serialized, isStringTag);
  });

  if (!isBrowser$1 && rules !== undefined) {
    var _ref2;

    var serializedNames = serialized.name;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      next = next.next;
    }

    return /*#__PURE__*/React__namespace.createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedNames, _ref2.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref2.nonce = cache.sheet.nonce, _ref2));
  }

  return null;
};

var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
  var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = '';

  if (typeof props.className === 'string') {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }

  var serialized = serializeStyles(registeredStyles, undefined, React__namespace.useContext(ThemeContext));

  if (process.env.NODE_ENV !== 'production' && serialized.name.indexOf('-') === -1) {
    var labelFromStack = props[labelPropName];

    if (labelFromStack) {
      serialized = serializeStyles([serialized, 'label:' + labelFromStack + ';']);
    }
  }

  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && (process.env.NODE_ENV === 'production' || key !== labelPropName)) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Insertion$1, {
    cache: cache,
    serialized: serialized,
    isStringTag: typeof WrappedComponent === 'string'
  }), /*#__PURE__*/React__namespace.createElement(WrappedComponent, newProps));
});

if (process.env.NODE_ENV !== 'production') {
  Emotion.displayName = 'EmotionCssPropInternal';
}

var Emotion$1 = Emotion;

var pkg = {
	name: "@emotion/react",
	version: "11.11.0",
	main: "dist/emotion-react.cjs.js",
	module: "dist/emotion-react.esm.js",
	browser: {
		"./dist/emotion-react.esm.js": "./dist/emotion-react.browser.esm.js"
	},
	exports: {
		".": {
			module: {
				worker: "./dist/emotion-react.worker.esm.js",
				browser: "./dist/emotion-react.browser.esm.js",
				"default": "./dist/emotion-react.esm.js"
			},
			"import": "./dist/emotion-react.cjs.mjs",
			"default": "./dist/emotion-react.cjs.js"
		},
		"./jsx-runtime": {
			module: {
				worker: "./jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js",
				browser: "./jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js",
				"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"
			},
			"import": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.mjs",
			"default": "./jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js"
		},
		"./_isolated-hnrs": {
			module: {
				worker: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js",
				browser: "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js",
				"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js"
			},
			"import": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.mjs",
			"default": "./_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js"
		},
		"./jsx-dev-runtime": {
			module: {
				worker: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js",
				browser: "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js",
				"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js"
			},
			"import": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.mjs",
			"default": "./jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js"
		},
		"./package.json": "./package.json",
		"./types/css-prop": "./types/css-prop.d.ts",
		"./macro": {
			types: {
				"import": "./macro.d.mts",
				"default": "./macro.d.ts"
			},
			"default": "./macro.js"
		}
	},
	types: "types/index.d.ts",
	files: [
		"src",
		"dist",
		"jsx-runtime",
		"jsx-dev-runtime",
		"_isolated-hnrs",
		"types/*.d.ts",
		"macro.*"
	],
	sideEffects: false,
	author: "Emotion Contributors",
	license: "MIT",
	scripts: {
		"test:typescript": "dtslint types"
	},
	dependencies: {
		"@babel/runtime": "^7.18.3",
		"@emotion/babel-plugin": "^11.11.0",
		"@emotion/cache": "^11.11.0",
		"@emotion/serialize": "^1.1.2",
		"@emotion/use-insertion-effect-with-fallbacks": "^1.0.1",
		"@emotion/utils": "^1.2.1",
		"@emotion/weak-memoize": "^0.3.1",
		"hoist-non-react-statics": "^3.3.1"
	},
	peerDependencies: {
		react: ">=16.8.0"
	},
	peerDependenciesMeta: {
		"@types/react": {
			optional: true
		}
	},
	devDependencies: {
		"@definitelytyped/dtslint": "0.0.112",
		"@emotion/css": "11.11.0",
		"@emotion/css-prettifier": "1.1.3",
		"@emotion/server": "11.11.0",
		"@emotion/styled": "11.11.0",
		"html-tag-names": "^1.1.2",
		react: "16.14.0",
		"svg-tag-names": "^1.1.1",
		typescript: "^4.5.5"
	},
	repository: "https://github.com/emotion-js/emotion/tree/main/packages/react",
	publishConfig: {
		access: "public"
	},
	"umd:main": "dist/emotion-react.umd.min.js",
	preconstruct: {
		entrypoints: [
			"./index.js",
			"./jsx-runtime.js",
			"./jsx-dev-runtime.js",
			"./_isolated-hnrs.js"
		],
		umdName: "emotionReact",
		exports: {
			envConditions: [
				"browser",
				"worker"
			],
			extra: {
				"./types/css-prop": "./types/css-prop.d.ts",
				"./macro": {
					types: {
						"import": "./macro.d.mts",
						"default": "./macro.d.ts"
					},
					"default": "./macro.js"
				}
			}
		}
	}
};

var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !hasOwnProperty.call(props, 'css')) {
    // $FlowFixMe
    return React__namespace.createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion$1;
  createElementArgArray[1] = createEmotionProps(type, props);

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return React__namespace.createElement.apply(null, createElementArgArray);
};

var warnedAboutCssPropForGlobal = false; // maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */withEmotionCache(function (props, cache) {
  if (process.env.NODE_ENV !== 'production' && !warnedAboutCssPropForGlobal && ( // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }

  var styles = props.styles;
  var serialized = serializeStyles([styles], undefined, React__namespace.useContext(ThemeContext));

  if (!isBrowser$1) {
    var _ref;

    var serializedNames = serialized.name;
    var serializedStyles = serialized.styles;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      serializedStyles += next.styles;
      next = next.next;
    }

    var shouldCache = cache.compat === true;
    var rules = cache.insert("", {
      name: serializedNames,
      styles: serializedStyles
    }, cache.sheet, shouldCache);

    if (shouldCache) {
      return null;
    }

    return /*#__PURE__*/React__namespace.createElement("style", (_ref = {}, _ref["data-emotion"] = cache.key + "-global " + serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref));
  } // yes, i know these hooks are used conditionally
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = React__namespace.useRef();
  useInsertionEffectWithLayoutFallback(function () {
    var key = cache.key + "-global"; // use case of https://github.com/emotion-js/emotion/issues/2675

    var sheet = new cache.sheet.constructor({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false; // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  useInsertionEffectWithLayoutFallback(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      insertStyles(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

if (process.env.NODE_ENV !== 'production') {
  Global.displayName = 'EmotionGlobal';
}

function css$2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serializeStyles(args);
}

var keyframes = function keyframes() {
  var insertable = css$2.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            if (process.env.NODE_ENV !== 'production' && arg.styles !== undefined && arg.name !== undefined) {
              console.error('You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n' + '`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.');
            }

            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var Insertion = function Insertion(_ref) {
  var cache = _ref.cache,
      serializedArr = _ref.serializedArr;
  var rules = useInsertionEffectAlwaysWithSyncFallback(function () {
    var rules = '';

    for (var i = 0; i < serializedArr.length; i++) {
      var res = insertStyles(cache, serializedArr[i], false);

      if (!isBrowser$1 && res !== undefined) {
        rules += res;
      }
    }

    if (!isBrowser$1) {
      return rules;
    }
  });

  if (!isBrowser$1 && rules.length !== 0) {
    var _ref2;

    return /*#__PURE__*/React__namespace.createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedArr.map(function (serialized) {
      return serialized.name;
    }).join(' '), _ref2.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref2.nonce = cache.sheet.nonce, _ref2));
  }

  return null;
};

var ClassNames = /* #__PURE__ */withEmotionCache(function (props, cache) {
  var hasRendered = false;
  var serializedArr = [];

  var css = function css() {
    if (hasRendered && process.env.NODE_ENV !== 'production') {
      throw new Error('css can only be used during render');
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serialized = serializeStyles(args, cache.registered);
    serializedArr.push(serialized); // registration has to happen here as the result of this might get consumed by `cx`

    registerStyles(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };

  var cx = function cx() {
    if (hasRendered && process.env.NODE_ENV !== 'production') {
      throw new Error('cx can only be used during render');
    }

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return merge(cache.registered, css, classnames(args));
  };

  var content = {
    css: css,
    cx: cx,
    theme: React__namespace.useContext(ThemeContext)
  };
  var ele = props.children(content);
  hasRendered = true;
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Insertion, {
    cache: cache,
    serializedArr: serializedArr
  }), ele);
});

if (process.env.NODE_ENV !== 'production') {
  ClassNames.displayName = 'EmotionClassNames';
}

if (process.env.NODE_ENV !== 'production') {
  var isBrowser = typeof document !== 'undefined'; // #1727, #2905 for some reason Jest and Vitest evaluate modules twice if some consuming module gets mocked

  var isTestEnv = typeof jest !== 'undefined' || typeof vi !== 'undefined';

  if (isBrowser && !isTestEnv) {
    // globalThis has wide browser support - https://caniuse.com/?search=globalThis, Node.js 12 and later
    var globalContext = // $FlowIgnore
    typeof globalThis !== 'undefined' ? globalThis // eslint-disable-line no-undef
    : isBrowser ? window : global;
    var globalKey = "__EMOTION_REACT_" + pkg.version.split('.')[0] + "__";

    if (globalContext[globalKey]) {
      console.warn('You are loading @emotion/react when it is already loaded. Running ' + 'multiple instances may cause problems. This can happen if multiple ' + 'versions are used, or if multiple builds of the same version are ' + 'used.');
    }

    globalContext[globalKey] = true;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}

function getWindow(node) {
  var _node$ownerDocument;
  return ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}

function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}

function isNode(value) {
  return value instanceof getWindow(value).Node;
}
function getNodeName(node) {
  return isNode(node) ? (node.nodeName || '').toLowerCase() : '';
}

let uaString;
function getUAString() {
  if (uaString) {
    return uaString;
  }
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    uaString = uaData.brands.map(item => item.brand + "/" + item.version).join(' ');
    return uaString;
  }
  return navigator.userAgent;
}

function isHTMLElement(value) {
  return value instanceof getWindow(value).HTMLElement;
}
function isElement(value) {
  return value instanceof getWindow(value).Element;
}
function isShadowRoot(node) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  const OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}

/**
 * Determines whether or not `.getBoundingClientRect()` is affected by visual
 * viewport offsets. In Safari, the `x`/`y` offsets are values relative to the
 * visual viewport, while in other engines, they are values relative to the
 * layout viewport.
 */
function isClientRectVisualViewportBased() {
  // TODO: Try to use feature detection here instead. Feature detection for
  // this can fail in various ways, making the userAgent check the most
  // reliable:
  // • Always-visible scrollbar or not
  // • Width of <html>

  // Is Safari.
  return /^((?!chrome|android).)*safari/i.test(getUAString());
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
const round = Math.round;

function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    fallback: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

const FALLBACK_SCALE = {
  x: 1,
  y: 1
};
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return FALLBACK_SCALE;
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    fallback
  } = getCssDimensions(domElement);
  let x = (fallback ? round(rect.width) : rect.width) / width;
  let y = (fallback ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  var _win$visualViewport, _win$visualViewport2;
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = FALLBACK_SCALE;
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const win = domElement ? getWindow(domElement) : window;
  const addVisualOffsets = isClientRectVisualViewportBased() && isFixedStrategy;
  let x = (clientRect.left + (addVisualOffsets ? ((_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) || 0 : 0)) / scale.x;
  let y = (clientRect.top + (addVisualOffsets ? ((_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) || 0 : 0)) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      iframeRect.x += (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      iframeRect.y += (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += iframeRect.x;
      y += iframeRect.y;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}

function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}

function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    // `getParentNode` will never return a `Document` due to the fallback
    // check, so it's either the <html> or <body> element.
    return parentNode.ownerDocument.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}

function getOverflowAncestors(node, list) {
  var _node$ownerDocument;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = true,
    animationFrame = false
  } = options;
  const ancestors = ancestorScroll || ancestorResize ? [...(isElement(reference) ? getOverflowAncestors(reference) : reference.contextElement ? getOverflowAncestors(reference.contextElement) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    // ignores Window, checks for [object VisualViewport]
    const isVisualViewport = !isElement(ancestor) && ancestor.toString().includes('V');
    if (ancestorScroll && (animationFrame ? isVisualViewport : true)) {
      ancestor.addEventListener('scroll', update, {
        passive: true
      });
    }
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  let observer = null;
  if (elementResize) {
    observer = new ResizeObserver(() => {
      update();
    });
    isElement(reference) && !animationFrame && observer.observe(reference);
    if (!isElement(reference) && reference.contextElement && !animationFrame) {
      observer.observe(reference.contextElement);
    }
    observer.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _observer;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    (_observer = observer) == null ? void 0 : _observer.disconnect();
    observer = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

var index = typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;

var _excluded$3 = ["className", "clearValue", "cx", "getStyles", "getClassNames", "getValue", "hasValue", "isMulti", "isRtl", "options", "selectOption", "selectProps", "setValue", "theme"];
// ==============================
// NO OP
// ==============================

var noop = function noop() {};

// ==============================
// Class Name Prefixer
// ==============================

/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/
function applyPrefixToName(prefix, name) {
  if (!name) {
    return prefix;
  } else if (name[0] === '-') {
    return prefix + name;
  } else {
    return prefix + '__' + name;
  }
}
function classNames(prefix, state) {
  for (var _len = arguments.length, classNameList = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    classNameList[_key - 2] = arguments[_key];
  }
  var arr = [].concat(classNameList);
  if (state && prefix) {
    for (var key in state) {
      if (state.hasOwnProperty(key) && state[key]) {
        arr.push("".concat(applyPrefixToName(prefix, key)));
      }
    }
  }
  return arr.filter(function (i) {
    return i;
  }).map(function (i) {
    return String(i).trim();
  }).join(' ');
}
// ==============================
// Clean Value
// ==============================

var cleanValue = function cleanValue(value) {
  if (isArray(value)) return value.filter(Boolean);
  if (_typeof(value) === 'object' && value !== null) return [value];
  return [];
};

// ==============================
// Clean Common Props
// ==============================

var cleanCommonProps = function cleanCommonProps(props) {
  //className
  props.className;
    props.clearValue;
    props.cx;
    props.getStyles;
    props.getClassNames;
    props.getValue;
    props.hasValue;
    props.isMulti;
    props.isRtl;
    props.options;
    props.selectOption;
    props.selectProps;
    props.setValue;
    props.theme;
    var innerProps = _objectWithoutProperties(props, _excluded$3);
  return _objectSpread2({}, innerProps);
};

// ==============================
// Get Style Props
// ==============================

var getStyleProps = function getStyleProps(props, name, classNamesState) {
  var cx = props.cx,
    getStyles = props.getStyles,
    getClassNames = props.getClassNames,
    className = props.className;
  return {
    css: getStyles(name, props),
    className: cx(classNamesState !== null && classNamesState !== void 0 ? classNamesState : {}, getClassNames(name, props), className)
  };
};

// ==============================
// Scroll Helpers
// ==============================

function isDocumentElement(el) {
  return [document.documentElement, document.body, window].indexOf(el) > -1;
}

// Normalized Scroll Top
// ------------------------------

function normalizedHeight(el) {
  if (isDocumentElement(el)) {
    return window.innerHeight;
  }
  return el.clientHeight;
}

// Normalized scrollTo & scrollTop
// ------------------------------

function getScrollTop(el) {
  if (isDocumentElement(el)) {
    return window.pageYOffset;
  }
  return el.scrollTop;
}
function scrollTo(el, top) {
  // with a scroll distance, we perform scroll on the element
  if (isDocumentElement(el)) {
    window.scrollTo(0, top);
    return;
  }
  el.scrollTop = top;
}

// Get Scroll Parent
// ------------------------------

function getScrollParent(element) {
  var style = getComputedStyle(element);
  var excludeStaticParent = style.position === 'absolute';
  var overflowRx = /(auto|scroll)/;
  if (style.position === 'fixed') return document.documentElement;
  for (var parent = element; parent = parent.parentElement;) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      continue;
    }
    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }
  return document.documentElement;
}

// Animated Scroll To
// ------------------------------

/**
  @param t: time (elapsed)
  @param b: initial value
  @param c: amount of change
  @param d: duration
*/
function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}
function animatedScrollTo(element, to) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
  var start = getScrollTop(element);
  var change = to - start;
  var increment = 10;
  var currentTime = 0;
  function animateScroll() {
    currentTime += increment;
    var val = easeOutCubic(currentTime, start, change, duration);
    scrollTo(element, val);
    if (currentTime < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      callback(element);
    }
  }
  animateScroll();
}

// Scroll Into View
// ------------------------------

function scrollIntoView(menuEl, focusedEl) {
  var menuRect = menuEl.getBoundingClientRect();
  var focusedRect = focusedEl.getBoundingClientRect();
  var overScroll = focusedEl.offsetHeight / 3;
  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
  } else if (focusedRect.top - overScroll < menuRect.top) {
    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
  }
}

// ==============================
// Get bounding client object
// ==============================

// cannot get keys using array notation with DOMRect
function getBoundingClientObj(element) {
  var rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  };
}

// ==============================
// Touch Capability Detector
// ==============================

function isTouchCapable() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}

// ==============================
// Mobile Device Detector
// ==============================

function isMobileDevice() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  } catch (e) {
    return false;
  }
}

// ==============================
// Passive Event Detector
// ==============================

// https://github.com/rafgraph/detect-it/blob/main/src/index.ts#L19-L36
var passiveOptionAccessed = false;
var options = {
  get passive() {
    return passiveOptionAccessed = true;
  }
};
// check for SSR
var w = typeof window !== 'undefined' ? window : {};
if (w.addEventListener && w.removeEventListener) {
  w.addEventListener('p', noop, options);
  w.removeEventListener('p', noop, false);
}
var supportsPassiveEvents = passiveOptionAccessed;
function notNullish(item) {
  return item != null;
}
function isArray(arg) {
  return Array.isArray(arg);
}
function valueTernary(isMulti, multiValue, singleValue) {
  return isMulti ? multiValue : singleValue;
}
function singleValueAsValue(singleValue) {
  return singleValue;
}
function multiValueAsValue(multiValue) {
  return multiValue;
}
var removeProps = function removeProps(propsObj) {
  for (var _len2 = arguments.length, properties = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    properties[_key2 - 1] = arguments[_key2];
  }
  var propsMap = Object.entries(propsObj).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
      key = _ref2[0];
    return !properties.includes(key);
  });
  return propsMap.reduce(function (newProps, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      key = _ref4[0],
      val = _ref4[1];
    newProps[key] = val;
    return newProps;
  }, {});
};

function getMenuPlacement(_ref) {
  var preferredMaxHeight = _ref.maxHeight,
    menuEl = _ref.menuEl,
    minHeight = _ref.minHeight,
    preferredPlacement = _ref.placement,
    shouldScroll = _ref.shouldScroll,
    isFixedPosition = _ref.isFixedPosition,
    controlHeight = _ref.controlHeight;
  var scrollParent = getScrollParent(menuEl);
  var defaultState = {
    placement: 'bottom',
    maxHeight: preferredMaxHeight
  };

  // something went wrong, return default state
  if (!menuEl || !menuEl.offsetParent) return defaultState;

  // we can't trust `scrollParent.scrollHeight` --> it may increase when
  // the menu is rendered
  var _scrollParent$getBoun = scrollParent.getBoundingClientRect(),
    scrollHeight = _scrollParent$getBoun.height;
  var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(),
    menuBottom = _menuEl$getBoundingCl.bottom,
    menuHeight = _menuEl$getBoundingCl.height,
    menuTop = _menuEl$getBoundingCl.top;
  var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(),
    containerTop = _menuEl$offsetParent$.top;
  var viewHeight = isFixedPosition ? window.innerHeight : normalizedHeight(scrollParent);
  var scrollTop = getScrollTop(scrollParent);
  var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
  var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
  var viewSpaceAbove = containerTop - marginTop;
  var viewSpaceBelow = viewHeight - menuTop;
  var scrollSpaceAbove = viewSpaceAbove + scrollTop;
  var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
  var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
  var scrollUp = scrollTop + menuTop - marginTop;
  var scrollDuration = 160;
  switch (preferredPlacement) {
    case 'auto':
    case 'bottom':
      // 1: the menu will fit, do nothing
      if (viewSpaceBelow >= menuHeight) {
        return {
          placement: 'bottom',
          maxHeight: preferredMaxHeight
        };
      }

      // 2: the menu will fit, if scrolled
      if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }
        return {
          placement: 'bottom',
          maxHeight: preferredMaxHeight
        };
      }

      // 3: the menu will fit, if constrained
      if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }

        // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.
        var constrainedHeight = isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom;
        return {
          placement: 'bottom',
          maxHeight: constrainedHeight
        };
      }

      // 4. Forked beviour when there isn't enough space below

      // AUTO: flip the menu, render above
      if (preferredPlacement === 'auto' || isFixedPosition) {
        // may need to be constrained after flipping
        var _constrainedHeight = preferredMaxHeight;
        var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;
        if (spaceAbove >= minHeight) {
          _constrainedHeight = Math.min(spaceAbove - marginBottom - controlHeight, preferredMaxHeight);
        }
        return {
          placement: 'top',
          maxHeight: _constrainedHeight
        };
      }

      // BOTTOM: allow browser to increase scrollable area and immediately set scroll
      if (preferredPlacement === 'bottom') {
        if (shouldScroll) {
          scrollTo(scrollParent, scrollDown);
        }
        return {
          placement: 'bottom',
          maxHeight: preferredMaxHeight
        };
      }
      break;
    case 'top':
      // 1: the menu will fit, do nothing
      if (viewSpaceAbove >= menuHeight) {
        return {
          placement: 'top',
          maxHeight: preferredMaxHeight
        };
      }

      // 2: the menu will fit, if scrolled
      if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }
        return {
          placement: 'top',
          maxHeight: preferredMaxHeight
        };
      }

      // 3: the menu will fit, if constrained
      if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
        var _constrainedHeight2 = preferredMaxHeight;

        // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.
        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
          _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
        }
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }
        return {
          placement: 'top',
          maxHeight: _constrainedHeight2
        };
      }

      // 4. not enough space, the browser WILL NOT increase scrollable area when
      // absolutely positioned element rendered above the viewport (only below).
      // Flip the menu, render below
      return {
        placement: 'bottom',
        maxHeight: preferredMaxHeight
      };
    default:
      throw new Error("Invalid placement provided \"".concat(preferredPlacement, "\"."));
  }
  return defaultState;
}

// Menu Component
// ------------------------------

function alignToControl(placement) {
  var placementToCSSProp = {
    bottom: 'top',
    top: 'bottom'
  };
  return placement ? placementToCSSProp[placement] : 'bottom';
}
var coercePlacement = function coercePlacement(p) {
  return p === 'auto' ? 'bottom' : p;
};
var menuCSS = function menuCSS(_ref2, unstyled) {
  var _objectSpread2$1;
  var placement = _ref2.placement,
    _ref2$theme = _ref2.theme,
    borderRadius = _ref2$theme.borderRadius,
    spacing = _ref2$theme.spacing,
    colors = _ref2$theme.colors;
  return _objectSpread2((_objectSpread2$1 = {
    label: 'menu'
  }, _defineProperty(_objectSpread2$1, alignToControl(placement), '100%'), _defineProperty(_objectSpread2$1, "position", 'absolute'), _defineProperty(_objectSpread2$1, "width", '100%'), _defineProperty(_objectSpread2$1, "zIndex", 1), _objectSpread2$1), unstyled ? {} : {
    backgroundColor: colors.neutral0,
    borderRadius: borderRadius,
    boxShadow: '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
    marginBottom: spacing.menuGutter,
    marginTop: spacing.menuGutter
  });
};
var PortalPlacementContext = /*#__PURE__*/React.createContext(null);

// NOTE: internal only
var MenuPlacer = function MenuPlacer(props) {
  var children = props.children,
    minMenuHeight = props.minMenuHeight,
    maxMenuHeight = props.maxMenuHeight,
    menuPlacement = props.menuPlacement,
    menuPosition = props.menuPosition,
    menuShouldScrollIntoView = props.menuShouldScrollIntoView,
    theme = props.theme;
  var _ref3 = React.useContext(PortalPlacementContext) || {},
    setPortalPlacement = _ref3.setPortalPlacement;
  var ref = React.useRef(null);
  var _useState = React.useState(maxMenuHeight),
    _useState2 = _slicedToArray(_useState, 2),
    maxHeight = _useState2[0],
    setMaxHeight = _useState2[1];
  var _useState3 = React.useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    placement = _useState4[0],
    setPlacement = _useState4[1];
  var controlHeight = theme.spacing.controlHeight;
  index(function () {
    var menuEl = ref.current;
    if (!menuEl) return;

    // DO NOT scroll if position is fixed
    var isFixedPosition = menuPosition === 'fixed';
    var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;
    var state = getMenuPlacement({
      maxHeight: maxMenuHeight,
      menuEl: menuEl,
      minHeight: minMenuHeight,
      placement: menuPlacement,
      shouldScroll: shouldScroll,
      isFixedPosition: isFixedPosition,
      controlHeight: controlHeight
    });
    setMaxHeight(state.maxHeight);
    setPlacement(state.placement);
    setPortalPlacement === null || setPortalPlacement === void 0 ? void 0 : setPortalPlacement(state.placement);
  }, [maxMenuHeight, menuPlacement, menuPosition, menuShouldScrollIntoView, minMenuHeight, setPortalPlacement, controlHeight]);
  return children({
    ref: ref,
    placerProps: _objectSpread2(_objectSpread2({}, props), {}, {
      placement: placement || coercePlacement(menuPlacement),
      maxHeight: maxHeight
    })
  });
};
var Menu = function Menu(props) {
  var children = props.children,
    innerRef = props.innerRef,
    innerProps = props.innerProps;
  return jsx("div", _extends({}, getStyleProps(props, 'menu', {
    menu: true
  }), {
    ref: innerRef
  }, innerProps), children);
};
var Menu$1 = Menu;

// ==============================
// Menu List
// ==============================

var menuListCSS = function menuListCSS(_ref4, unstyled) {
  var maxHeight = _ref4.maxHeight,
    baseUnit = _ref4.theme.spacing.baseUnit;
  return _objectSpread2({
    maxHeight: maxHeight,
    overflowY: 'auto',
    position: 'relative',
    // required for offset[Height, Top] > keyboard scroll
    WebkitOverflowScrolling: 'touch'
  }, unstyled ? {} : {
    paddingBottom: baseUnit,
    paddingTop: baseUnit
  });
};
var MenuList = function MenuList(props) {
  var children = props.children,
    innerProps = props.innerProps,
    innerRef = props.innerRef,
    isMulti = props.isMulti;
  return jsx("div", _extends({}, getStyleProps(props, 'menuList', {
    'menu-list': true,
    'menu-list--is-multi': isMulti
  }), {
    ref: innerRef
  }, innerProps), children);
};

// ==============================
// Menu Notices
// ==============================

var noticeCSS = function noticeCSS(_ref5, unstyled) {
  var _ref5$theme = _ref5.theme,
    baseUnit = _ref5$theme.spacing.baseUnit,
    colors = _ref5$theme.colors;
  return _objectSpread2({
    textAlign: 'center'
  }, unstyled ? {} : {
    color: colors.neutral40,
    padding: "".concat(baseUnit * 2, "px ").concat(baseUnit * 3, "px")
  });
};
var noOptionsMessageCSS = noticeCSS;
var loadingMessageCSS = noticeCSS;
var NoOptionsMessage = function NoOptionsMessage(props) {
  var children = props.children,
    innerProps = props.innerProps;
  return jsx("div", _extends({}, getStyleProps(props, 'noOptionsMessage', {
    'menu-notice': true,
    'menu-notice--no-options': true
  }), innerProps), children);
};
NoOptionsMessage.defaultProps = {
  children: 'No options'
};
var LoadingMessage = function LoadingMessage(props) {
  var children = props.children,
    innerProps = props.innerProps;
  return jsx("div", _extends({}, getStyleProps(props, 'loadingMessage', {
    'menu-notice': true,
    'menu-notice--loading': true
  }), innerProps), children);
};
LoadingMessage.defaultProps = {
  children: 'Loading...'
};

// ==============================
// Menu Portal
// ==============================

var menuPortalCSS = function menuPortalCSS(_ref6) {
  var rect = _ref6.rect,
    offset = _ref6.offset,
    position = _ref6.position;
  return {
    left: rect.left,
    position: position,
    top: offset,
    width: rect.width,
    zIndex: 1
  };
};
var MenuPortal = function MenuPortal(props) {
  var appendTo = props.appendTo,
    children = props.children,
    controlElement = props.controlElement,
    innerProps = props.innerProps,
    menuPlacement = props.menuPlacement,
    menuPosition = props.menuPosition;
  var menuPortalRef = React.useRef(null);
  var cleanupRef = React.useRef(null);
  var _useState5 = React.useState(coercePlacement(menuPlacement)),
    _useState6 = _slicedToArray(_useState5, 2),
    placement = _useState6[0],
    setPortalPlacement = _useState6[1];
  var portalPlacementContext = React.useMemo(function () {
    return {
      setPortalPlacement: setPortalPlacement
    };
  }, []);
  var _useState7 = React.useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    computedPosition = _useState8[0],
    setComputedPosition = _useState8[1];
  var updateComputedPosition = React.useCallback(function () {
    if (!controlElement) return;
    var rect = getBoundingClientObj(controlElement);
    var scrollDistance = menuPosition === 'fixed' ? 0 : window.pageYOffset;
    var offset = rect[placement] + scrollDistance;
    if (offset !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.offset) || rect.left !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.left) || rect.width !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.width)) {
      setComputedPosition({
        offset: offset,
        rect: rect
      });
    }
  }, [controlElement, menuPosition, placement, computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.offset, computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.left, computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.width]);
  index(function () {
    updateComputedPosition();
  }, [updateComputedPosition]);
  var runAutoUpdate = React.useCallback(function () {
    if (typeof cleanupRef.current === 'function') {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    if (controlElement && menuPortalRef.current) {
      cleanupRef.current = autoUpdate(controlElement, menuPortalRef.current, updateComputedPosition, {
        elementResize: 'ResizeObserver' in window
      });
    }
  }, [controlElement, updateComputedPosition]);
  index(function () {
    runAutoUpdate();
  }, [runAutoUpdate]);
  var setMenuPortalElement = React.useCallback(function (menuPortalElement) {
    menuPortalRef.current = menuPortalElement;
    runAutoUpdate();
  }, [runAutoUpdate]);

  // bail early if required elements aren't present
  if (!appendTo && menuPosition !== 'fixed' || !computedPosition) return null;

  // same wrapper element whether fixed or portalled
  var menuWrapper = jsx("div", _extends({
    ref: setMenuPortalElement
  }, getStyleProps(_objectSpread2(_objectSpread2({}, props), {}, {
    offset: computedPosition.offset,
    position: menuPosition,
    rect: computedPosition.rect
  }), 'menuPortal', {
    'menu-portal': true
  }), innerProps), children);
  return jsx(PortalPlacementContext.Provider, {
    value: portalPlacementContext
  }, appendTo ? /*#__PURE__*/ReactDOM.createPortal(menuWrapper, appendTo) : menuWrapper);
};

// ==============================
// Root Container
// ==============================

var containerCSS = function containerCSS(_ref) {
  var isDisabled = _ref.isDisabled,
    isRtl = _ref.isRtl;
  return {
    label: 'container',
    direction: isRtl ? 'rtl' : undefined,
    pointerEvents: isDisabled ? 'none' : undefined,
    // cancel mouse events when disabled
    position: 'relative'
  };
};
var SelectContainer = function SelectContainer(props) {
  var children = props.children,
    innerProps = props.innerProps,
    isDisabled = props.isDisabled,
    isRtl = props.isRtl;
  return jsx("div", _extends({}, getStyleProps(props, 'container', {
    '--is-disabled': isDisabled,
    '--is-rtl': isRtl
  }), innerProps), children);
};

// ==============================
// Value Container
// ==============================

var valueContainerCSS = function valueContainerCSS(_ref2, unstyled) {
  var spacing = _ref2.theme.spacing,
    isMulti = _ref2.isMulti,
    hasValue = _ref2.hasValue,
    controlShouldRenderValue = _ref2.selectProps.controlShouldRenderValue;
  return _objectSpread2({
    alignItems: 'center',
    display: isMulti && hasValue && controlShouldRenderValue ? 'flex' : 'grid',
    flex: 1,
    flexWrap: 'wrap',
    WebkitOverflowScrolling: 'touch',
    position: 'relative',
    overflow: 'hidden'
  }, unstyled ? {} : {
    padding: "".concat(spacing.baseUnit / 2, "px ").concat(spacing.baseUnit * 2, "px")
  });
};
var ValueContainer = function ValueContainer(props) {
  var children = props.children,
    innerProps = props.innerProps,
    isMulti = props.isMulti,
    hasValue = props.hasValue;
  return jsx("div", _extends({}, getStyleProps(props, 'valueContainer', {
    'value-container': true,
    'value-container--is-multi': isMulti,
    'value-container--has-value': hasValue
  }), innerProps), children);
};

// ==============================
// Indicator Container
// ==============================

var indicatorsContainerCSS = function indicatorsContainerCSS() {
  return {
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    flexShrink: 0
  };
};
var IndicatorsContainer = function IndicatorsContainer(props) {
  var children = props.children,
    innerProps = props.innerProps;
  return jsx("div", _extends({}, getStyleProps(props, 'indicatorsContainer', {
    indicators: true
  }), innerProps), children);
};

var _templateObject;
var _excluded$2$1 = ["size"];
function _EMOTION_STRINGIFIED_CSS_ERROR__$3() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

// ==============================
// Dropdown & Clear Icons
// ==============================
var _ref2$2 = process.env.NODE_ENV === "production" ? {
  name: "8mmkcg",
  styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0"
} : {
  name: "tj5bde-Svg",
  styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0;label:Svg;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4LCBrZXlmcmFtZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmltcG9ydCB7XG4gIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lLFxuICBDU1NPYmplY3RXaXRoTGFiZWwsXG4gIEdyb3VwQmFzZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3R5bGVQcm9wcyB9IGZyb20gJy4uL3V0aWxzJztcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEljb25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgU3ZnID0gKHtcbiAgc2l6ZSxcbiAgLi4ucHJvcHNcbn06IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU6IG51bWJlciB9KSA9PiAoXG4gIDxzdmdcbiAgICBoZWlnaHQ9e3NpemV9XG4gICAgd2lkdGg9e3NpemV9XG4gICAgdmlld0JveD1cIjAgMCAyMCAyMFwiXG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICBmb2N1c2FibGU9XCJmYWxzZVwiXG4gICAgY3NzPXt7XG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGZpbGw6ICdjdXJyZW50Q29sb3InLFxuICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgIHN0cm9rZTogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBzdHJva2VXaWR0aDogMCxcbiAgICB9fVxuICAgIHsuLi5wcm9wc31cbiAgLz5cbik7XG5cbmV4cG9ydCB0eXBlIENyb3NzSWNvblByb3BzID0gSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZT86IG51bWJlciB9O1xuZXhwb3J0IGNvbnN0IENyb3NzSWNvbiA9IChwcm9wczogQ3Jvc3NJY29uUHJvcHMpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTE0LjM0OCAxNC44NDljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDBsLTIuNjUxLTMuMDMwLTIuNjUxIDMuMDI5Yy0wLjQ2OSAwLjQ2OS0xLjIyOSAwLjQ2OS0xLjY5NyAwLTAuNDY5LTAuNDY5LTAuNDY5LTEuMjI5IDAtMS42OTdsMi43NTgtMy4xNS0yLjc1OS0zLjE1MmMtMC40NjktMC40NjktMC40NjktMS4yMjggMC0xLjY5N3MxLjIyOC0wLjQ2OSAxLjY5NyAwbDIuNjUyIDMuMDMxIDIuNjUxLTMuMDMxYzAuNDY5LTAuNDY5IDEuMjI4LTAuNDY5IDEuNjk3IDBzMC40NjkgMS4yMjkgMCAxLjY5N2wtMi43NTggMy4xNTIgMi43NTggMy4xNWMwLjQ2OSAwLjQ2OSAwLjQ2OSAxLjIyOSAwIDEuNjk4elwiIC8+XG4gIDwvU3ZnPlxuKTtcbmV4cG9ydCB0eXBlIERvd25DaGV2cm9uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgRG93bkNoZXZyb24gPSAocHJvcHM6IERvd25DaGV2cm9uUHJvcHMpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTQuNTE2IDcuNTQ4YzAuNDM2LTAuNDQ2IDEuMDQzLTAuNDgxIDEuNTc2IDBsMy45MDggMy43NDcgMy45MDgtMy43NDdjMC41MzMtMC40ODEgMS4xNDEtMC40NDYgMS41NzQgMCAwLjQzNiAwLjQ0NSAwLjQwOCAxLjE5NyAwIDEuNjE1LTAuNDA2IDAuNDE4LTQuNjk1IDQuNTAyLTQuNjk1IDQuNTAyLTAuMjE3IDAuMjIzLTAuNTAyIDAuMzM1LTAuNzg3IDAuMzM1cy0wLjU3LTAuMTEyLTAuNzg5LTAuMzM1YzAgMC00LjI4Ny00LjA4NC00LjY5NS00LjUwMnMtMC40MzYtMS4xNyAwLTEuNjE1elwiIC8+XG4gIDwvU3ZnPlxuKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEJ1dHRvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8XG4gIE9wdGlvbiA9IHVua25vd24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuID0gYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPiA9IEdyb3VwQmFzZTxPcHRpb24+XG4+IGV4dGVuZHMgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWU8T3B0aW9uLCBJc011bHRpLCBHcm91cD4ge1xuICAvKiogVGhlIGNoaWxkcmVuIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGUgaW5kaWNhdG9yLiAqL1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xufVxuXG5jb25zdCBiYXNlQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNGb2N1c2VkLFxuICAgIHRoZW1lOiB7XG4gICAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgICBjb2xvcnMsXG4gICAgfSxcbiAgfTpcbiAgICB8IERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbiAgICB8IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JDb250YWluZXInLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBwYWRkaW5nOiBiYXNlVW5pdCAqIDIsXG4gICAgICAgICc6aG92ZXInOiB7XG4gICAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsODAgOiBjb2xvcnMubmV1dHJhbDQwLFxuICAgICAgICB9LFxuICAgICAgfSksXG59KTtcblxuZXhwb3J0IGNvbnN0IGRyb3Bkb3duSW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBEcm9wZG93bkluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uZ2V0U3R5bGVQcm9wcyhwcm9wcywgJ2Ryb3Bkb3duSW5kaWNhdG9yJywge1xuICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICdkcm9wZG93bi1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPERvd25DaGV2cm9uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBDbGVhckluZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFySW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBDbGVhckluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uZ2V0U3R5bGVQcm9wcyhwcm9wcywgJ2NsZWFySW5kaWNhdG9yJywge1xuICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICdjbGVhci1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPENyb3NzSWNvbiAvPn1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU2VwYXJhdG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGludGVyZmFjZSBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbiAgaW5uZXJQcm9wcz86IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3BhbiddO1xufVxuXG5leHBvcnQgY29uc3QgaW5kaWNhdG9yU2VwYXJhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNEaXNhYmxlZCxcbiAgICB0aGVtZToge1xuICAgICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgICAgY29sb3JzLFxuICAgIH0sXG4gIH06IEluZGljYXRvclNlcGFyYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+LFxuICB1bnN0eWxlZDogYm9vbGVhblxuKTogQ1NTT2JqZWN0V2l0aExhYmVsID0+ICh7XG4gIGxhYmVsOiAnaW5kaWNhdG9yU2VwYXJhdG9yJyxcbiAgYWxpZ25TZWxmOiAnc3RyZXRjaCcsXG4gIHdpZHRoOiAxLFxuICAuLi4odW5zdHlsZWRcbiAgICA/IHt9XG4gICAgOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogaXNEaXNhYmxlZCA/IGNvbG9ycy5uZXV0cmFsMTAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBtYXJnaW5Cb3R0b206IGJhc2VVbml0ICogMixcbiAgICAgICAgbWFyZ2luVG9wOiBiYXNlVW5pdCAqIDIsXG4gICAgICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxzcGFuXG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnaW5kaWNhdG9yU2VwYXJhdG9yJywge1xuICAgICAgICAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNGb2N1c2VkLFxuICAgIHNpemUsXG4gICAgdGhlbWU6IHtcbiAgICAgIGNvbG9ycyxcbiAgICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICB9LFxuICB9OiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdsb2FkaW5nSW5kaWNhdG9yJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICBmb250U2l6ZTogc2l6ZSxcbiAgbGluZUhlaWdodDogMSxcbiAgbWFyZ2luUmlnaHQ6IHNpemUsXG4gIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAuLi4odW5zdHlsZWRcbiAgICA/IHt9XG4gICAgOiB7XG4gICAgICAgIGNvbG9yOiBpc0ZvY3VzZWQgPyBjb2xvcnMubmV1dHJhbDYwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgICAgICAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICAgICAgfSksXG59KTtcblxuaW50ZXJmYWNlIExvYWRpbmdEb3RQcm9wcyB7XG4gIGRlbGF5OiBudW1iZXI7XG4gIG9mZnNldDogYm9vbGVhbjtcbn1cbmNvbnN0IExvYWRpbmdEb3QgPSAoeyBkZWxheSwgb2Zmc2V0IH06IExvYWRpbmdEb3RQcm9wcykgPT4gKFxuICA8c3BhblxuICAgIGNzcz17e1xuICAgICAgYW5pbWF0aW9uOiBgJHtsb2FkaW5nRG90QW5pbWF0aW9uc30gMXMgZWFzZS1pbi1vdXQgJHtkZWxheX1tcyBpbmZpbml0ZTtgLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnY3VycmVudENvbG9yJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzFlbScsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIG1hcmdpbkxlZnQ6IG9mZnNldCA/ICcxZW0nIDogdW5kZWZpbmVkLFxuICAgICAgaGVpZ2h0OiAnMWVtJyxcbiAgICAgIHZlcnRpY2FsQWxpZ246ICd0b3AnLFxuICAgICAgd2lkdGg6ICcxZW0nLFxuICAgIH19XG4gIC8+XG4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRpbmdJbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgLyoqIFNldCBzaXplIG9mIHRoZSBjb250YWluZXIuICovXG4gIHNpemU6IG51bWJlcjtcbn1cbmV4cG9ydCBjb25zdCBMb2FkaW5nSW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogTG9hZGluZ0luZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+XG4pID0+IHtcbiAgY29uc3QgeyBpbm5lclByb3BzLCBpc1J0bCB9ID0gcHJvcHM7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uZ2V0U3R5bGVQcm9wcyhwcm9wcywgJ2xvYWRpbmdJbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2xvYWRpbmctaW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgIH0pfVxuICAgICAgey4uLmlubmVyUHJvcHN9XG4gICAgPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezB9IG9mZnNldD17aXNSdGx9IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MTYwfSBvZmZzZXQgLz5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXszMjB9IG9mZnNldD17IWlzUnRsfSAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcbkxvYWRpbmdJbmRpY2F0b3IuZGVmYXVsdFByb3BzID0geyBzaXplOiA0IH07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$3
};
var Svg = function Svg(_ref) {
  var size = _ref.size,
    props = _objectWithoutProperties(_ref, _excluded$2$1);
  return jsx("svg", _extends({
    height: size,
    width: size,
    viewBox: "0 0 20 20",
    "aria-hidden": "true",
    focusable: "false",
    css: _ref2$2
  }, props));
};
var CrossIcon = function CrossIcon(props) {
  return jsx(Svg, _extends({
    size: 20
  }, props), jsx("path", {
    d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
  }));
};
var DownChevron = function DownChevron(props) {
  return jsx(Svg, _extends({
    size: 20
  }, props), jsx("path", {
    d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
  }));
};

// ==============================
// Dropdown & Clear Buttons
// ==============================

var baseCSS = function baseCSS(_ref3, unstyled) {
  var isFocused = _ref3.isFocused,
    _ref3$theme = _ref3.theme,
    baseUnit = _ref3$theme.spacing.baseUnit,
    colors = _ref3$theme.colors;
  return _objectSpread2({
    label: 'indicatorContainer',
    display: 'flex',
    transition: 'color 150ms'
  }, unstyled ? {} : {
    color: isFocused ? colors.neutral60 : colors.neutral20,
    padding: baseUnit * 2,
    ':hover': {
      color: isFocused ? colors.neutral80 : colors.neutral40
    }
  });
};
var dropdownIndicatorCSS = baseCSS;
var DropdownIndicator = function DropdownIndicator(props) {
  var children = props.children,
    innerProps = props.innerProps;
  return jsx("div", _extends({}, getStyleProps(props, 'dropdownIndicator', {
    indicator: true,
    'dropdown-indicator': true
  }), innerProps), children || jsx(DownChevron, null));
};
var clearIndicatorCSS = baseCSS;
var ClearIndicator = function ClearIndicator(props) {
  var children = props.children,
    innerProps = props.innerProps;
  return jsx("div", _extends({}, getStyleProps(props, 'clearIndicator', {
    indicator: true,
    'clear-indicator': true
  }), innerProps), children || jsx(CrossIcon, null));
};

// ==============================
// Separator
// ==============================

var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref4, unstyled) {
  var isDisabled = _ref4.isDisabled,
    _ref4$theme = _ref4.theme,
    baseUnit = _ref4$theme.spacing.baseUnit,
    colors = _ref4$theme.colors;
  return _objectSpread2({
    label: 'indicatorSeparator',
    alignSelf: 'stretch',
    width: 1
  }, unstyled ? {} : {
    backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
    marginBottom: baseUnit * 2,
    marginTop: baseUnit * 2
  });
};
var IndicatorSeparator = function IndicatorSeparator(props) {
  var innerProps = props.innerProps;
  return jsx("span", _extends({}, innerProps, getStyleProps(props, 'indicatorSeparator', {
    'indicator-separator': true
  })));
};

// ==============================
// Loading
// ==============================

var loadingDotAnimations = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  0%, 80%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n"])));
var loadingIndicatorCSS = function loadingIndicatorCSS(_ref5, unstyled) {
  var isFocused = _ref5.isFocused,
    size = _ref5.size,
    _ref5$theme = _ref5.theme,
    colors = _ref5$theme.colors,
    baseUnit = _ref5$theme.spacing.baseUnit;
  return _objectSpread2({
    label: 'loadingIndicator',
    display: 'flex',
    transition: 'color 150ms',
    alignSelf: 'center',
    fontSize: size,
    lineHeight: 1,
    marginRight: size,
    textAlign: 'center',
    verticalAlign: 'middle'
  }, unstyled ? {} : {
    color: isFocused ? colors.neutral60 : colors.neutral20,
    padding: baseUnit * 2
  });
};
var LoadingDot = function LoadingDot(_ref6) {
  var delay = _ref6.delay,
    offset = _ref6.offset;
  return jsx("span", {
    css: /*#__PURE__*/css$2({
      animation: "".concat(loadingDotAnimations, " 1s ease-in-out ").concat(delay, "ms infinite;"),
      backgroundColor: 'currentColor',
      borderRadius: '1em',
      display: 'inline-block',
      marginLeft: offset ? '1em' : undefined,
      height: '1em',
      verticalAlign: 'top',
      width: '1em'
    }, process.env.NODE_ENV === "production" ? "" : ";label:LoadingDot;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGljYXRvcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1RSSIsImZpbGUiOiJpbmRpY2F0b3JzLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4LCBrZXlmcmFtZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmltcG9ydCB7XG4gIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lLFxuICBDU1NPYmplY3RXaXRoTGFiZWwsXG4gIEdyb3VwQmFzZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U3R5bGVQcm9wcyB9IGZyb20gJy4uL3V0aWxzJztcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEljb25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgU3ZnID0gKHtcbiAgc2l6ZSxcbiAgLi4ucHJvcHNcbn06IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3ZnJ10gJiB7IHNpemU6IG51bWJlciB9KSA9PiAoXG4gIDxzdmdcbiAgICBoZWlnaHQ9e3NpemV9XG4gICAgd2lkdGg9e3NpemV9XG4gICAgdmlld0JveD1cIjAgMCAyMCAyMFwiXG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICBmb2N1c2FibGU9XCJmYWxzZVwiXG4gICAgY3NzPXt7XG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGZpbGw6ICdjdXJyZW50Q29sb3InLFxuICAgICAgbGluZUhlaWdodDogMSxcbiAgICAgIHN0cm9rZTogJ2N1cnJlbnRDb2xvcicsXG4gICAgICBzdHJva2VXaWR0aDogMCxcbiAgICB9fVxuICAgIHsuLi5wcm9wc31cbiAgLz5cbik7XG5cbmV4cG9ydCB0eXBlIENyb3NzSWNvblByb3BzID0gSlNYLkludHJpbnNpY0VsZW1lbnRzWydzdmcnXSAmIHsgc2l6ZT86IG51bWJlciB9O1xuZXhwb3J0IGNvbnN0IENyb3NzSWNvbiA9IChwcm9wczogQ3Jvc3NJY29uUHJvcHMpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTE0LjM0OCAxNC44NDljLTAuNDY5IDAuNDY5LTEuMjI5IDAuNDY5LTEuNjk3IDBsLTIuNjUxLTMuMDMwLTIuNjUxIDMuMDI5Yy0wLjQ2OSAwLjQ2OS0xLjIyOSAwLjQ2OS0xLjY5NyAwLTAuNDY5LTAuNDY5LTAuNDY5LTEuMjI5IDAtMS42OTdsMi43NTgtMy4xNS0yLjc1OS0zLjE1MmMtMC40NjktMC40NjktMC40NjktMS4yMjggMC0xLjY5N3MxLjIyOC0wLjQ2OSAxLjY5NyAwbDIuNjUyIDMuMDMxIDIuNjUxLTMuMDMxYzAuNDY5LTAuNDY5IDEuMjI4LTAuNDY5IDEuNjk3IDBzMC40NjkgMS4yMjkgMCAxLjY5N2wtMi43NTggMy4xNTIgMi43NTggMy4xNWMwLjQ2OSAwLjQ2OSAwLjQ2OSAxLjIyOSAwIDEuNjk4elwiIC8+XG4gIDwvU3ZnPlxuKTtcbmV4cG9ydCB0eXBlIERvd25DaGV2cm9uUHJvcHMgPSBKU1guSW50cmluc2ljRWxlbWVudHNbJ3N2ZyddICYgeyBzaXplPzogbnVtYmVyIH07XG5leHBvcnQgY29uc3QgRG93bkNoZXZyb24gPSAocHJvcHM6IERvd25DaGV2cm9uUHJvcHMpID0+IChcbiAgPFN2ZyBzaXplPXsyMH0gey4uLnByb3BzfT5cbiAgICA8cGF0aCBkPVwiTTQuNTE2IDcuNTQ4YzAuNDM2LTAuNDQ2IDEuMDQzLTAuNDgxIDEuNTc2IDBsMy45MDggMy43NDcgMy45MDgtMy43NDdjMC41MzMtMC40ODEgMS4xNDEtMC40NDYgMS41NzQgMCAwLjQzNiAwLjQ0NSAwLjQwOCAxLjE5NyAwIDEuNjE1LTAuNDA2IDAuNDE4LTQuNjk1IDQuNTAyLTQuNjk1IDQuNTAyLTAuMjE3IDAuMjIzLTAuNTAyIDAuMzM1LTAuNzg3IDAuMzM1cy0wLjU3LTAuMTEyLTAuNzg5LTAuMzM1YzAgMC00LjI4Ny00LjA4NC00LjY5NS00LjUwMnMtMC40MzYtMS4xNyAwLTEuNjE1elwiIC8+XG4gIDwvU3ZnPlxuKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBEcm9wZG93biAmIENsZWFyIEJ1dHRvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgaW50ZXJmYWNlIERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8XG4gIE9wdGlvbiA9IHVua25vd24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuID0gYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPiA9IEdyb3VwQmFzZTxPcHRpb24+XG4+IGV4dGVuZHMgQ29tbW9uUHJvcHNBbmRDbGFzc05hbWU8T3B0aW9uLCBJc011bHRpLCBHcm91cD4ge1xuICAvKiogVGhlIGNoaWxkcmVuIHRvIGJlIHJlbmRlcmVkIGluc2lkZSB0aGUgaW5kaWNhdG9yLiAqL1xuICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgLyoqIFByb3BzIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gdG8gdGhlIGNoaWxkcmVuLiAqL1xuICBpbm5lclByb3BzOiBKU1guSW50cmluc2ljRWxlbWVudHNbJ2RpdiddO1xuICAvKiogVGhlIGZvY3VzZWQgc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgaXNGb2N1c2VkOiBib29sZWFuO1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xufVxuXG5jb25zdCBiYXNlQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNGb2N1c2VkLFxuICAgIHRoZW1lOiB7XG4gICAgICBzcGFjaW5nOiB7IGJhc2VVbml0IH0sXG4gICAgICBjb2xvcnMsXG4gICAgfSxcbiAgfTpcbiAgICB8IERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbiAgICB8IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdpbmRpY2F0b3JDb250YWluZXInLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIHRyYW5zaXRpb246ICdjb2xvciAxNTBtcycsXG4gIC4uLih1bnN0eWxlZFxuICAgID8ge31cbiAgICA6IHtcbiAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsNjAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBwYWRkaW5nOiBiYXNlVW5pdCAqIDIsXG4gICAgICAgICc6aG92ZXInOiB7XG4gICAgICAgICAgY29sb3I6IGlzRm9jdXNlZCA/IGNvbG9ycy5uZXV0cmFsODAgOiBjb2xvcnMubmV1dHJhbDQwLFxuICAgICAgICB9LFxuICAgICAgfSksXG59KTtcblxuZXhwb3J0IGNvbnN0IGRyb3Bkb3duSW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBEcm9wZG93bkluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IERyb3Bkb3duSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uZ2V0U3R5bGVQcm9wcyhwcm9wcywgJ2Ryb3Bkb3duSW5kaWNhdG9yJywge1xuICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICdkcm9wZG93bi1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPERvd25DaGV2cm9uIC8+fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGludGVyZmFjZSBDbGVhckluZGljYXRvclByb3BzPFxuICBPcHRpb24gPSB1bmtub3duLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbiA9IGJvb2xlYW4sXG4gIEdyb3VwIGV4dGVuZHMgR3JvdXBCYXNlPE9wdGlvbj4gPSBHcm91cEJhc2U8T3B0aW9uPlxuPiBleHRlbmRzIENvbW1vblByb3BzQW5kQ2xhc3NOYW1lPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+IHtcbiAgLyoqIFRoZSBjaGlsZHJlbiB0byBiZSByZW5kZXJlZCBpbnNpZGUgdGhlIGluZGljYXRvci4gKi9cbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IGNsZWFySW5kaWNhdG9yQ1NTID0gYmFzZUNTUztcbmV4cG9ydCBjb25zdCBDbGVhckluZGljYXRvciA9IDxcbiAgT3B0aW9uLFxuICBJc011bHRpIGV4dGVuZHMgYm9vbGVhbixcbiAgR3JvdXAgZXh0ZW5kcyBHcm91cEJhc2U8T3B0aW9uPlxuPihcbiAgcHJvcHM6IENsZWFySW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGNoaWxkcmVuLCBpbm5lclByb3BzIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uZ2V0U3R5bGVQcm9wcyhwcm9wcywgJ2NsZWFySW5kaWNhdG9yJywge1xuICAgICAgICBpbmRpY2F0b3I6IHRydWUsXG4gICAgICAgICdjbGVhci1pbmRpY2F0b3InOiB0cnVlLFxuICAgICAgfSl9XG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICA+XG4gICAgICB7Y2hpbGRyZW4gfHwgPENyb3NzSWNvbiAvPn1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gU2VwYXJhdG9yXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGludGVyZmFjZSBJbmRpY2F0b3JTZXBhcmF0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW47XG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbiAgaW5uZXJQcm9wcz86IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snc3BhbiddO1xufVxuXG5leHBvcnQgY29uc3QgaW5kaWNhdG9yU2VwYXJhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNEaXNhYmxlZCxcbiAgICB0aGVtZToge1xuICAgICAgc3BhY2luZzogeyBiYXNlVW5pdCB9LFxuICAgICAgY29sb3JzLFxuICAgIH0sXG4gIH06IEluZGljYXRvclNlcGFyYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+LFxuICB1bnN0eWxlZDogYm9vbGVhblxuKTogQ1NTT2JqZWN0V2l0aExhYmVsID0+ICh7XG4gIGxhYmVsOiAnaW5kaWNhdG9yU2VwYXJhdG9yJyxcbiAgYWxpZ25TZWxmOiAnc3RyZXRjaCcsXG4gIHdpZHRoOiAxLFxuICAuLi4odW5zdHlsZWRcbiAgICA/IHt9XG4gICAgOiB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogaXNEaXNhYmxlZCA/IGNvbG9ycy5uZXV0cmFsMTAgOiBjb2xvcnMubmV1dHJhbDIwLFxuICAgICAgICBtYXJnaW5Cb3R0b206IGJhc2VVbml0ICogMixcbiAgICAgICAgbWFyZ2luVG9wOiBiYXNlVW5pdCAqIDIsXG4gICAgICB9KSxcbn0pO1xuXG5leHBvcnQgY29uc3QgSW5kaWNhdG9yU2VwYXJhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogSW5kaWNhdG9yU2VwYXJhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD5cbikgPT4ge1xuICBjb25zdCB7IGlubmVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxzcGFuXG4gICAgICB7Li4uaW5uZXJQcm9wc31cbiAgICAgIHsuLi5nZXRTdHlsZVByb3BzKHByb3BzLCAnaW5kaWNhdG9yU2VwYXJhdG9yJywge1xuICAgICAgICAnaW5kaWNhdG9yLXNlcGFyYXRvcic6IHRydWUsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBMb2FkaW5nXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgbG9hZGluZ0RvdEFuaW1hdGlvbnMgPSBrZXlmcmFtZXNgXG4gIDAlLCA4MCUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gIDQwJSB7IG9wYWNpdHk6IDE7IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBsb2FkaW5nSW5kaWNhdG9yQ1NTID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICB7XG4gICAgaXNGb2N1c2VkLFxuICAgIHNpemUsXG4gICAgdGhlbWU6IHtcbiAgICAgIGNvbG9ycyxcbiAgICAgIHNwYWNpbmc6IHsgYmFzZVVuaXQgfSxcbiAgICB9LFxuICB9OiBMb2FkaW5nSW5kaWNhdG9yUHJvcHM8T3B0aW9uLCBJc011bHRpLCBHcm91cD4sXG4gIHVuc3R5bGVkOiBib29sZWFuXG4pOiBDU1NPYmplY3RXaXRoTGFiZWwgPT4gKHtcbiAgbGFiZWw6ICdsb2FkaW5nSW5kaWNhdG9yJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICB0cmFuc2l0aW9uOiAnY29sb3IgMTUwbXMnLFxuICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICBmb250U2l6ZTogc2l6ZSxcbiAgbGluZUhlaWdodDogMSxcbiAgbWFyZ2luUmlnaHQ6IHNpemUsXG4gIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAuLi4odW5zdHlsZWRcbiAgICA/IHt9XG4gICAgOiB7XG4gICAgICAgIGNvbG9yOiBpc0ZvY3VzZWQgPyBjb2xvcnMubmV1dHJhbDYwIDogY29sb3JzLm5ldXRyYWwyMCxcbiAgICAgICAgcGFkZGluZzogYmFzZVVuaXQgKiAyLFxuICAgICAgfSksXG59KTtcblxuaW50ZXJmYWNlIExvYWRpbmdEb3RQcm9wcyB7XG4gIGRlbGF5OiBudW1iZXI7XG4gIG9mZnNldDogYm9vbGVhbjtcbn1cbmNvbnN0IExvYWRpbmdEb3QgPSAoeyBkZWxheSwgb2Zmc2V0IH06IExvYWRpbmdEb3RQcm9wcykgPT4gKFxuICA8c3BhblxuICAgIGNzcz17e1xuICAgICAgYW5pbWF0aW9uOiBgJHtsb2FkaW5nRG90QW5pbWF0aW9uc30gMXMgZWFzZS1pbi1vdXQgJHtkZWxheX1tcyBpbmZpbml0ZTtgLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnY3VycmVudENvbG9yJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzFlbScsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIG1hcmdpbkxlZnQ6IG9mZnNldCA/ICcxZW0nIDogdW5kZWZpbmVkLFxuICAgICAgaGVpZ2h0OiAnMWVtJyxcbiAgICAgIHZlcnRpY2FsQWxpZ246ICd0b3AnLFxuICAgICAgd2lkdGg6ICcxZW0nLFxuICAgIH19XG4gIC8+XG4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRpbmdJbmRpY2F0b3JQcm9wczxcbiAgT3B0aW9uID0gdW5rbm93bixcbiAgSXNNdWx0aSBleHRlbmRzIGJvb2xlYW4gPSBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+ID0gR3JvdXBCYXNlPE9wdGlvbj5cbj4gZXh0ZW5kcyBDb21tb25Qcm9wc0FuZENsYXNzTmFtZTxPcHRpb24sIElzTXVsdGksIEdyb3VwPiB7XG4gIC8qKiBQcm9wcyB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIHRvIHRoZSBjaGlsZHJlbi4gKi9cbiAgaW5uZXJQcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydkaXYnXTtcbiAgLyoqIFRoZSBmb2N1c2VkIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gIGlzRm9jdXNlZDogYm9vbGVhbjtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbjtcbiAgLyoqIFNldCBzaXplIG9mIHRoZSBjb250YWluZXIuICovXG4gIHNpemU6IG51bWJlcjtcbn1cbmV4cG9ydCBjb25zdCBMb2FkaW5nSW5kaWNhdG9yID0gPFxuICBPcHRpb24sXG4gIElzTXVsdGkgZXh0ZW5kcyBib29sZWFuLFxuICBHcm91cCBleHRlbmRzIEdyb3VwQmFzZTxPcHRpb24+XG4+KFxuICBwcm9wczogTG9hZGluZ0luZGljYXRvclByb3BzPE9wdGlvbiwgSXNNdWx0aSwgR3JvdXA+XG4pID0+IHtcbiAgY29uc3QgeyBpbm5lclByb3BzLCBpc1J0bCB9ID0gcHJvcHM7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICB7Li4uZ2V0U3R5bGVQcm9wcyhwcm9wcywgJ2xvYWRpbmdJbmRpY2F0b3InLCB7XG4gICAgICAgIGluZGljYXRvcjogdHJ1ZSxcbiAgICAgICAgJ2xvYWRpbmctaW5kaWNhdG9yJzogdHJ1ZSxcbiAgICAgIH0pfVxuICAgICAgey4uLmlubmVyUHJvcHN9XG4gICAgPlxuICAgICAgPExvYWRpbmdEb3QgZGVsYXk9ezB9IG9mZnNldD17aXNSdGx9IC8+XG4gICAgICA8TG9hZGluZ0RvdCBkZWxheT17MTYwfSBvZmZzZXQgLz5cbiAgICAgIDxMb2FkaW5nRG90IGRlbGF5PXszMjB9IG9mZnNldD17IWlzUnRsfSAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcbkxvYWRpbmdJbmRpY2F0b3IuZGVmYXVsdFByb3BzID0geyBzaXplOiA0IH07XG4iXX0= */")
  });
};
var LoadingIndicator = function LoadingIndicator(props) {
  var innerProps = props.innerProps,
    isRtl = props.isRtl;
  return jsx("div", _extends({}, getStyleProps(props, 'loadingIndicator', {
    indicator: true,
    'loading-indicator': true
  }), innerProps), jsx(LoadingDot, {
    delay: 0,
    offset: isRtl
  }), jsx(LoadingDot, {
    delay: 160,
    offset: true
  }), jsx(LoadingDot, {
    delay: 320,
    offset: !isRtl
  }));
};
LoadingIndicator.defaultProps = {
  size: 4
};

var css$1 = function css(_ref, unstyled) {
  var isDisabled = _ref.isDisabled,
    isFocused = _ref.isFocused,
    _ref$theme = _ref.theme,
    colors = _ref$theme.colors,
    borderRadius = _ref$theme.borderRadius,
    spacing = _ref$theme.spacing;
  return _objectSpread2({
    label: 'control',
    alignItems: 'center',
    cursor: 'default',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    minHeight: spacing.controlHeight,
    outline: '0 !important',
    position: 'relative',
    transition: 'all 100ms'
  }, unstyled ? {} : {
    backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
    borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
    borderRadius: borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: isFocused ? "0 0 0 1px ".concat(colors.primary) : undefined,
    '&:hover': {
      borderColor: isFocused ? colors.primary : colors.neutral30
    }
  });
};
var Control = function Control(props) {
  var children = props.children,
    isDisabled = props.isDisabled,
    isFocused = props.isFocused,
    innerRef = props.innerRef,
    innerProps = props.innerProps,
    menuIsOpen = props.menuIsOpen;
  return jsx("div", _extends({
    ref: innerRef
  }, getStyleProps(props, 'control', {
    control: true,
    'control--is-disabled': isDisabled,
    'control--is-focused': isFocused,
    'control--menu-is-open': menuIsOpen
  }), innerProps), children);
};
var Control$1 = Control;

var _excluded$1$1 = ["data"];
var groupCSS = function groupCSS(_ref, unstyled) {
  var spacing = _ref.theme.spacing;
  return unstyled ? {} : {
    paddingBottom: spacing.baseUnit * 2,
    paddingTop: spacing.baseUnit * 2
  };
};
var Group = function Group(props) {
  var children = props.children,
    cx = props.cx,
    getStyles = props.getStyles,
    getClassNames = props.getClassNames,
    Heading = props.Heading,
    headingProps = props.headingProps,
    innerProps = props.innerProps,
    label = props.label,
    theme = props.theme,
    selectProps = props.selectProps;
  return jsx("div", _extends({}, getStyleProps(props, 'group', {
    group: true
  }), innerProps), jsx(Heading, _extends({}, headingProps, {
    selectProps: selectProps,
    theme: theme,
    getStyles: getStyles,
    getClassNames: getClassNames,
    cx: cx
  }), label), jsx("div", null, children));
};
var groupHeadingCSS = function groupHeadingCSS(_ref2, unstyled) {
  var _ref2$theme = _ref2.theme,
    colors = _ref2$theme.colors,
    spacing = _ref2$theme.spacing;
  return _objectSpread2({
    label: 'group',
    cursor: 'default',
    display: 'block'
  }, unstyled ? {} : {
    color: colors.neutral40,
    fontSize: '75%',
    fontWeight: 500,
    marginBottom: '0.25em',
    paddingLeft: spacing.baseUnit * 3,
    paddingRight: spacing.baseUnit * 3,
    textTransform: 'uppercase'
  });
};
var GroupHeading = function GroupHeading(props) {
  var _cleanCommonProps = cleanCommonProps(props);
    _cleanCommonProps.data;
    var innerProps = _objectWithoutProperties(_cleanCommonProps, _excluded$1$1);
  return jsx("div", _extends({}, getStyleProps(props, 'groupHeading', {
    'group-heading': true
  }), innerProps));
};
var Group$1 = Group;

var _excluded$4 = ["innerRef", "isDisabled", "isHidden", "inputClassName"];
var inputCSS = function inputCSS(_ref, unstyled) {
  var isDisabled = _ref.isDisabled,
    value = _ref.value,
    _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    colors = _ref$theme.colors;
  return _objectSpread2(_objectSpread2({
    visibility: isDisabled ? 'hidden' : 'visible',
    // force css to recompute when value change due to @emotion bug.
    // We can remove it whenever the bug is fixed.
    transform: value ? 'translateZ(0)' : ''
  }, containerStyle), unstyled ? {} : {
    margin: spacing.baseUnit / 2,
    paddingBottom: spacing.baseUnit / 2,
    paddingTop: spacing.baseUnit / 2,
    color: colors.neutral80
  });
};
var spacingStyle = {
  gridArea: '1 / 2',
  font: 'inherit',
  minWidth: '2px',
  border: 0,
  margin: 0,
  outline: 0,
  padding: 0
};
var containerStyle = {
  flex: '1 1 auto',
  display: 'inline-grid',
  gridArea: '1 / 1 / 2 / 3',
  gridTemplateColumns: '0 min-content',
  '&:after': _objectSpread2({
    content: 'attr(data-value) " "',
    visibility: 'hidden',
    whiteSpace: 'pre'
  }, spacingStyle)
};
var inputStyle = function inputStyle(isHidden) {
  return _objectSpread2({
    label: 'input',
    color: 'inherit',
    background: 0,
    opacity: isHidden ? 0 : 1,
    width: '100%'
  }, spacingStyle);
};
var Input = function Input(props) {
  var cx = props.cx,
    value = props.value;
  var _cleanCommonProps = cleanCommonProps(props),
    innerRef = _cleanCommonProps.innerRef,
    isDisabled = _cleanCommonProps.isDisabled,
    isHidden = _cleanCommonProps.isHidden,
    inputClassName = _cleanCommonProps.inputClassName,
    innerProps = _objectWithoutProperties(_cleanCommonProps, _excluded$4);
  return jsx("div", _extends({}, getStyleProps(props, 'input', {
    'input-container': true
  }), {
    "data-value": value || ''
  }), jsx("input", _extends({
    className: cx({
      input: true
    }, inputClassName),
    ref: innerRef,
    style: inputStyle(isHidden),
    disabled: isDisabled
  }, innerProps)));
};
var Input$1 = Input;

var multiValueCSS = function multiValueCSS(_ref, unstyled) {
  var _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    borderRadius = _ref$theme.borderRadius,
    colors = _ref$theme.colors;
  return _objectSpread2({
    label: 'multiValue',
    display: 'flex',
    minWidth: 0
  }, unstyled ? {} : {
    backgroundColor: colors.neutral10,
    borderRadius: borderRadius / 2,
    margin: spacing.baseUnit / 2
  });
};
var multiValueLabelCSS = function multiValueLabelCSS(_ref2, unstyled) {
  var _ref2$theme = _ref2.theme,
    borderRadius = _ref2$theme.borderRadius,
    colors = _ref2$theme.colors,
    cropWithEllipsis = _ref2.cropWithEllipsis;
  return _objectSpread2({
    overflow: 'hidden',
    textOverflow: cropWithEllipsis || cropWithEllipsis === undefined ? 'ellipsis' : undefined,
    whiteSpace: 'nowrap'
  }, unstyled ? {} : {
    borderRadius: borderRadius / 2,
    color: colors.neutral80,
    fontSize: '85%',
    padding: 3,
    paddingLeft: 6
  });
};
var multiValueRemoveCSS = function multiValueRemoveCSS(_ref3, unstyled) {
  var _ref3$theme = _ref3.theme,
    spacing = _ref3$theme.spacing,
    borderRadius = _ref3$theme.borderRadius,
    colors = _ref3$theme.colors,
    isFocused = _ref3.isFocused;
  return _objectSpread2({
    alignItems: 'center',
    display: 'flex'
  }, unstyled ? {} : {
    borderRadius: borderRadius / 2,
    backgroundColor: isFocused ? colors.dangerLight : undefined,
    paddingLeft: spacing.baseUnit,
    paddingRight: spacing.baseUnit,
    ':hover': {
      backgroundColor: colors.dangerLight,
      color: colors.danger
    }
  });
};
var MultiValueGeneric = function MultiValueGeneric(_ref4) {
  var children = _ref4.children,
    innerProps = _ref4.innerProps;
  return jsx("div", innerProps, children);
};
var MultiValueContainer = MultiValueGeneric;
var MultiValueLabel = MultiValueGeneric;
function MultiValueRemove(_ref5) {
  var children = _ref5.children,
    innerProps = _ref5.innerProps;
  return jsx("div", _extends({
    role: "button"
  }, innerProps), children || jsx(CrossIcon, {
    size: 14
  }));
}
var MultiValue = function MultiValue(props) {
  var children = props.children,
    components = props.components,
    data = props.data,
    innerProps = props.innerProps,
    isDisabled = props.isDisabled,
    removeProps = props.removeProps,
    selectProps = props.selectProps;
  var Container = components.Container,
    Label = components.Label,
    Remove = components.Remove;
  return jsx(Container, {
    data: data,
    innerProps: _objectSpread2(_objectSpread2({}, getStyleProps(props, 'multiValue', {
      'multi-value': true,
      'multi-value--is-disabled': isDisabled
    })), innerProps),
    selectProps: selectProps
  }, jsx(Label, {
    data: data,
    innerProps: _objectSpread2({}, getStyleProps(props, 'multiValueLabel', {
      'multi-value__label': true
    })),
    selectProps: selectProps
  }, children), jsx(Remove, {
    data: data,
    innerProps: _objectSpread2(_objectSpread2({}, getStyleProps(props, 'multiValueRemove', {
      'multi-value__remove': true
    })), {}, {
      'aria-label': "Remove ".concat(children || 'option')
    }, removeProps),
    selectProps: selectProps
  }));
};
var MultiValue$1 = MultiValue;

var optionCSS = function optionCSS(_ref, unstyled) {
  var isDisabled = _ref.isDisabled,
    isFocused = _ref.isFocused,
    isSelected = _ref.isSelected,
    _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    colors = _ref$theme.colors;
  return _objectSpread2({
    label: 'option',
    cursor: 'default',
    display: 'block',
    fontSize: 'inherit',
    width: '100%',
    userSelect: 'none',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
  }, unstyled ? {} : {
    backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
    color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
    padding: "".concat(spacing.baseUnit * 2, "px ").concat(spacing.baseUnit * 3, "px"),
    // provide some affordance on touch devices
    ':active': {
      backgroundColor: !isDisabled ? isSelected ? colors.primary : colors.primary50 : undefined
    }
  });
};
var Option = function Option(props) {
  var children = props.children,
    isDisabled = props.isDisabled,
    isFocused = props.isFocused,
    isSelected = props.isSelected,
    innerRef = props.innerRef,
    innerProps = props.innerProps;
  return jsx("div", _extends({}, getStyleProps(props, 'option', {
    option: true,
    'option--is-disabled': isDisabled,
    'option--is-focused': isFocused,
    'option--is-selected': isSelected
  }), {
    ref: innerRef,
    "aria-disabled": isDisabled
  }, innerProps), children);
};
var Option$1 = Option;

var placeholderCSS = function placeholderCSS(_ref, unstyled) {
  var _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    colors = _ref$theme.colors;
  return _objectSpread2({
    label: 'placeholder',
    gridArea: '1 / 1 / 2 / 3'
  }, unstyled ? {} : {
    color: colors.neutral50,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2
  });
};
var Placeholder = function Placeholder(props) {
  var children = props.children,
    innerProps = props.innerProps;
  return jsx("div", _extends({}, getStyleProps(props, 'placeholder', {
    placeholder: true
  }), innerProps), children);
};
var Placeholder$1 = Placeholder;

var css = function css(_ref, unstyled) {
  var isDisabled = _ref.isDisabled,
    _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    colors = _ref$theme.colors;
  return _objectSpread2({
    label: 'singleValue',
    gridArea: '1 / 1 / 2 / 3',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }, unstyled ? {} : {
    color: isDisabled ? colors.neutral40 : colors.neutral80,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2
  });
};
var SingleValue = function SingleValue(props) {
  var children = props.children,
    isDisabled = props.isDisabled,
    innerProps = props.innerProps;
  return jsx("div", _extends({}, getStyleProps(props, 'singleValue', {
    'single-value': true,
    'single-value--is-disabled': isDisabled
  }), innerProps), children);
};
var SingleValue$1 = SingleValue;

var components = {
  ClearIndicator: ClearIndicator,
  Control: Control$1,
  DropdownIndicator: DropdownIndicator,
  DownChevron: DownChevron,
  CrossIcon: CrossIcon,
  Group: Group$1,
  GroupHeading: GroupHeading,
  IndicatorsContainer: IndicatorsContainer,
  IndicatorSeparator: IndicatorSeparator,
  Input: Input$1,
  LoadingIndicator: LoadingIndicator,
  Menu: Menu$1,
  MenuList: MenuList,
  MenuPortal: MenuPortal,
  LoadingMessage: LoadingMessage,
  NoOptionsMessage: NoOptionsMessage,
  MultiValue: MultiValue$1,
  MultiValueContainer: MultiValueContainer,
  MultiValueLabel: MultiValueLabel,
  MultiValueRemove: MultiValueRemove,
  Option: Option$1,
  Placeholder: Placeholder$1,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue$1,
  ValueContainer: ValueContainer
};
var defaultComponents = function defaultComponents(props) {
  return _objectSpread2(_objectSpread2({}, components), props.components);
};

var safeIsNaN = Number.isNaN ||
    function ponyfill(value) {
        return typeof value === 'number' && value !== value;
    };
function isEqual(first, second) {
    if (first === second) {
        return true;
    }
    if (safeIsNaN(first) && safeIsNaN(second)) {
        return true;
    }
    return false;
}
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (!isEqual(newInputs[i], lastInputs[i])) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var cache = null;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
            return cache.lastResult;
        }
        var lastResult = resultFn.apply(this, newArgs);
        cache = {
            lastResult: lastResult,
            lastArgs: newArgs,
            lastThis: this,
        };
        return lastResult;
    }
    memoized.clear = function clear() {
        cache = null;
    };
    return memoized;
}

function _EMOTION_STRINGIFIED_CSS_ERROR__$2() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

// Assistive text to describe visual elements. Hidden for sighted users.
var _ref = process.env.NODE_ENV === "production" ? {
  name: "7pg0cj-a11yText",
  styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap"
} : {
  name: "1f43avz-a11yText-A11yText",
  styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap;label:A11yText;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkExMXlUZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNSSIsImZpbGUiOiJBMTF5VGV4dC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLy8gQXNzaXN0aXZlIHRleHQgdG8gZGVzY3JpYmUgdmlzdWFsIGVsZW1lbnRzLiBIaWRkZW4gZm9yIHNpZ2h0ZWQgdXNlcnMuXG5jb25zdCBBMTF5VGV4dCA9IChwcm9wczogSlNYLkludHJpbnNpY0VsZW1lbnRzWydzcGFuJ10pID0+IChcbiAgPHNwYW5cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAnYTExeVRleHQnLFxuICAgICAgekluZGV4OiA5OTk5LFxuICAgICAgYm9yZGVyOiAwLFxuICAgICAgY2xpcDogJ3JlY3QoMXB4LCAxcHgsIDFweCwgMXB4KScsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICB3aWR0aDogMSxcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIH19XG4gICAgey4uLnByb3BzfVxuICAvPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQTExeVRleHQ7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$2
};
var A11yText = function A11yText(props) {
  return jsx("span", _extends({
    css: _ref
  }, props));
};
var A11yText$1 = A11yText;

var defaultAriaLiveMessages = {
  guidance: function guidance(props) {
    var isSearchable = props.isSearchable,
      isMulti = props.isMulti,
      isDisabled = props.isDisabled,
      tabSelectsValue = props.tabSelectsValue,
      context = props.context;
    switch (context) {
      case 'menu':
        return "Use Up and Down to choose options".concat(isDisabled ? '' : ', press Enter to select the currently focused option', ", press Escape to exit the menu").concat(tabSelectsValue ? ', press Tab to select the option and exit the menu' : '', ".");
      case 'input':
        return "".concat(props['aria-label'] || 'Select', " is focused ").concat(isSearchable ? ',type to refine list' : '', ", press Down to open the menu, ").concat(isMulti ? ' press left to focus selected values' : '');
      case 'value':
        return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
      default:
        return '';
    }
  },
  onChange: function onChange(props) {
    var action = props.action,
      _props$label = props.label,
      label = _props$label === void 0 ? '' : _props$label,
      labels = props.labels,
      isDisabled = props.isDisabled;
    switch (action) {
      case 'deselect-option':
      case 'pop-value':
      case 'remove-value':
        return "option ".concat(label, ", deselected.");
      case 'clear':
        return 'All selected options have been cleared.';
      case 'initial-input-focus':
        return "option".concat(labels.length > 1 ? 's' : '', " ").concat(labels.join(','), ", selected.");
      case 'select-option':
        return isDisabled ? "option ".concat(label, " is disabled. Select another option.") : "option ".concat(label, ", selected.");
      default:
        return '';
    }
  },
  onFocus: function onFocus(props) {
    var context = props.context,
      focused = props.focused,
      options = props.options,
      _props$label2 = props.label,
      label = _props$label2 === void 0 ? '' : _props$label2,
      selectValue = props.selectValue,
      isDisabled = props.isDisabled,
      isSelected = props.isSelected;
    var getArrayIndex = function getArrayIndex(arr, item) {
      return arr && arr.length ? "".concat(arr.indexOf(item) + 1, " of ").concat(arr.length) : '';
    };
    if (context === 'value' && selectValue) {
      return "value ".concat(label, " focused, ").concat(getArrayIndex(selectValue, focused), ".");
    }
    if (context === 'menu') {
      var disabled = isDisabled ? ' disabled' : '';
      var status = "".concat(isSelected ? 'selected' : 'focused').concat(disabled);
      return "option ".concat(label, " ").concat(status, ", ").concat(getArrayIndex(options, focused), ".");
    }
    return '';
  },
  onFilter: function onFilter(props) {
    var inputValue = props.inputValue,
      resultsMessage = props.resultsMessage;
    return "".concat(resultsMessage).concat(inputValue ? ' for search term ' + inputValue : '', ".");
  }
};

var LiveRegion = function LiveRegion(props) {
  var ariaSelection = props.ariaSelection,
    focusedOption = props.focusedOption,
    focusedValue = props.focusedValue,
    focusableOptions = props.focusableOptions,
    isFocused = props.isFocused,
    selectValue = props.selectValue,
    selectProps = props.selectProps,
    id = props.id;
  var ariaLiveMessages = selectProps.ariaLiveMessages,
    getOptionLabel = selectProps.getOptionLabel,
    inputValue = selectProps.inputValue,
    isMulti = selectProps.isMulti,
    isOptionDisabled = selectProps.isOptionDisabled,
    isSearchable = selectProps.isSearchable,
    menuIsOpen = selectProps.menuIsOpen,
    options = selectProps.options,
    screenReaderStatus = selectProps.screenReaderStatus,
    tabSelectsValue = selectProps.tabSelectsValue;
  var ariaLabel = selectProps['aria-label'];
  var ariaLive = selectProps['aria-live'];

  // Update aria live message configuration when prop changes
  var messages = React.useMemo(function () {
    return _objectSpread2(_objectSpread2({}, defaultAriaLiveMessages), ariaLiveMessages || {});
  }, [ariaLiveMessages]);

  // Update aria live selected option when prop changes
  var ariaSelected = React.useMemo(function () {
    var message = '';
    if (ariaSelection && messages.onChange) {
      var option = ariaSelection.option,
        selectedOptions = ariaSelection.options,
        removedValue = ariaSelection.removedValue,
        removedValues = ariaSelection.removedValues,
        value = ariaSelection.value;
      // select-option when !isMulti does not return option so we assume selected option is value
      var asOption = function asOption(val) {
        return !Array.isArray(val) ? val : null;
      };

      // If there is just one item from the action then get its label
      var selected = removedValue || option || asOption(value);
      var label = selected ? getOptionLabel(selected) : '';

      // If there are multiple items from the action then return an array of labels
      var multiSelected = selectedOptions || removedValues || undefined;
      var labels = multiSelected ? multiSelected.map(getOptionLabel) : [];
      var onChangeProps = _objectSpread2({
        // multiSelected items are usually items that have already been selected
        // or set by the user as a default value so we assume they are not disabled
        isDisabled: selected && isOptionDisabled(selected, selectValue),
        label: label,
        labels: labels
      }, ariaSelection);
      message = messages.onChange(onChangeProps);
    }
    return message;
  }, [ariaSelection, messages, isOptionDisabled, selectValue, getOptionLabel]);
  var ariaFocused = React.useMemo(function () {
    var focusMsg = '';
    var focused = focusedOption || focusedValue;
    var isSelected = !!(focusedOption && selectValue && selectValue.includes(focusedOption));
    if (focused && messages.onFocus) {
      var onFocusProps = {
        focused: focused,
        label: getOptionLabel(focused),
        isDisabled: isOptionDisabled(focused, selectValue),
        isSelected: isSelected,
        options: focusableOptions,
        context: focused === focusedOption ? 'menu' : 'value',
        selectValue: selectValue
      };
      focusMsg = messages.onFocus(onFocusProps);
    }
    return focusMsg;
  }, [focusedOption, focusedValue, getOptionLabel, isOptionDisabled, messages, focusableOptions, selectValue]);
  var ariaResults = React.useMemo(function () {
    var resultsMsg = '';
    if (menuIsOpen && options.length && messages.onFilter) {
      var resultsMessage = screenReaderStatus({
        count: focusableOptions.length
      });
      resultsMsg = messages.onFilter({
        inputValue: inputValue,
        resultsMessage: resultsMessage
      });
    }
    return resultsMsg;
  }, [focusableOptions, inputValue, menuIsOpen, messages, options, screenReaderStatus]);
  var ariaGuidance = React.useMemo(function () {
    var guidanceMsg = '';
    if (messages.guidance) {
      var context = focusedValue ? 'value' : menuIsOpen ? 'menu' : 'input';
      guidanceMsg = messages.guidance({
        'aria-label': ariaLabel,
        context: context,
        isDisabled: focusedOption && isOptionDisabled(focusedOption, selectValue),
        isMulti: isMulti,
        isSearchable: isSearchable,
        tabSelectsValue: tabSelectsValue
      });
    }
    return guidanceMsg;
  }, [ariaLabel, focusedOption, focusedValue, isMulti, isOptionDisabled, isSearchable, menuIsOpen, messages, selectValue, tabSelectsValue]);
  var ariaContext = "".concat(ariaFocused, " ").concat(ariaResults, " ").concat(ariaGuidance);
  var ScreenReaderText = jsx(React.Fragment, null, jsx("span", {
    id: "aria-selection"
  }, ariaSelected), jsx("span", {
    id: "aria-context"
  }, ariaContext));
  var isInitialFocus = (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus';
  return jsx(React.Fragment, null, jsx(A11yText$1, {
    id: id
  }, isInitialFocus && ScreenReaderText), jsx(A11yText$1, {
    "aria-live": ariaLive,
    "aria-atomic": "false",
    "aria-relevant": "additions text"
  }, isFocused && !isInitialFocus && ScreenReaderText));
};
var LiveRegion$1 = LiveRegion;

var diacritics = [{
  base: 'A',
  letters: "A\u24B6\uFF21\xC0\xC1\xC2\u1EA6\u1EA4\u1EAA\u1EA8\xC3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\xC4\u01DE\u1EA2\xC5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F"
}, {
  base: 'AA',
  letters: "\uA732"
}, {
  base: 'AE',
  letters: "\xC6\u01FC\u01E2"
}, {
  base: 'AO',
  letters: "\uA734"
}, {
  base: 'AU',
  letters: "\uA736"
}, {
  base: 'AV',
  letters: "\uA738\uA73A"
}, {
  base: 'AY',
  letters: "\uA73C"
}, {
  base: 'B',
  letters: "B\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181"
}, {
  base: 'C',
  letters: "C\u24B8\uFF23\u0106\u0108\u010A\u010C\xC7\u1E08\u0187\u023B\uA73E"
}, {
  base: 'D',
  letters: "D\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779"
}, {
  base: 'DZ',
  letters: "\u01F1\u01C4"
}, {
  base: 'Dz',
  letters: "\u01F2\u01C5"
}, {
  base: 'E',
  letters: "E\u24BA\uFF25\xC8\xC9\xCA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\xCB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E"
}, {
  base: 'F',
  letters: "F\u24BB\uFF26\u1E1E\u0191\uA77B"
}, {
  base: 'G',
  letters: "G\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E"
}, {
  base: 'H',
  letters: "H\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D"
}, {
  base: 'I',
  letters: "I\u24BE\uFF29\xCC\xCD\xCE\u0128\u012A\u012C\u0130\xCF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197"
}, {
  base: 'J',
  letters: "J\u24BF\uFF2A\u0134\u0248"
}, {
  base: 'K',
  letters: "K\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2"
}, {
  base: 'L',
  letters: "L\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780"
}, {
  base: 'LJ',
  letters: "\u01C7"
}, {
  base: 'Lj',
  letters: "\u01C8"
}, {
  base: 'M',
  letters: "M\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C"
}, {
  base: 'N',
  letters: "N\u24C3\uFF2E\u01F8\u0143\xD1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4"
}, {
  base: 'NJ',
  letters: "\u01CA"
}, {
  base: 'Nj',
  letters: "\u01CB"
}, {
  base: 'O',
  letters: "O\u24C4\uFF2F\xD2\xD3\xD4\u1ED2\u1ED0\u1ED6\u1ED4\xD5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\xD6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\xD8\u01FE\u0186\u019F\uA74A\uA74C"
}, {
  base: 'OI',
  letters: "\u01A2"
}, {
  base: 'OO',
  letters: "\uA74E"
}, {
  base: 'OU',
  letters: "\u0222"
}, {
  base: 'P',
  letters: "P\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754"
}, {
  base: 'Q',
  letters: "Q\u24C6\uFF31\uA756\uA758\u024A"
}, {
  base: 'R',
  letters: "R\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782"
}, {
  base: 'S',
  letters: "S\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784"
}, {
  base: 'T',
  letters: "T\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786"
}, {
  base: 'TZ',
  letters: "\uA728"
}, {
  base: 'U',
  letters: "U\u24CA\uFF35\xD9\xDA\xDB\u0168\u1E78\u016A\u1E7A\u016C\xDC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244"
}, {
  base: 'V',
  letters: "V\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245"
}, {
  base: 'VY',
  letters: "\uA760"
}, {
  base: 'W',
  letters: "W\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72"
}, {
  base: 'X',
  letters: "X\u24CD\uFF38\u1E8A\u1E8C"
}, {
  base: 'Y',
  letters: "Y\u24CE\uFF39\u1EF2\xDD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE"
}, {
  base: 'Z',
  letters: "Z\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762"
}, {
  base: 'a',
  letters: "a\u24D0\uFF41\u1E9A\xE0\xE1\xE2\u1EA7\u1EA5\u1EAB\u1EA9\xE3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\xE4\u01DF\u1EA3\xE5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250"
}, {
  base: 'aa',
  letters: "\uA733"
}, {
  base: 'ae',
  letters: "\xE6\u01FD\u01E3"
}, {
  base: 'ao',
  letters: "\uA735"
}, {
  base: 'au',
  letters: "\uA737"
}, {
  base: 'av',
  letters: "\uA739\uA73B"
}, {
  base: 'ay',
  letters: "\uA73D"
}, {
  base: 'b',
  letters: "b\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253"
}, {
  base: 'c',
  letters: "c\u24D2\uFF43\u0107\u0109\u010B\u010D\xE7\u1E09\u0188\u023C\uA73F\u2184"
}, {
  base: 'd',
  letters: "d\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A"
}, {
  base: 'dz',
  letters: "\u01F3\u01C6"
}, {
  base: 'e',
  letters: "e\u24D4\uFF45\xE8\xE9\xEA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\xEB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD"
}, {
  base: 'f',
  letters: "f\u24D5\uFF46\u1E1F\u0192\uA77C"
}, {
  base: 'g',
  letters: "g\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F"
}, {
  base: 'h',
  letters: "h\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265"
}, {
  base: 'hv',
  letters: "\u0195"
}, {
  base: 'i',
  letters: "i\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131"
}, {
  base: 'j',
  letters: "j\u24D9\uFF4A\u0135\u01F0\u0249"
}, {
  base: 'k',
  letters: "k\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3"
}, {
  base: 'l',
  letters: "l\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747"
}, {
  base: 'lj',
  letters: "\u01C9"
}, {
  base: 'm',
  letters: "m\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F"
}, {
  base: 'n',
  letters: "n\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5"
}, {
  base: 'nj',
  letters: "\u01CC"
}, {
  base: 'o',
  letters: "o\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\u0254\uA74B\uA74D\u0275"
}, {
  base: 'oi',
  letters: "\u01A3"
}, {
  base: 'ou',
  letters: "\u0223"
}, {
  base: 'oo',
  letters: "\uA74F"
}, {
  base: 'p',
  letters: "p\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755"
}, {
  base: 'q',
  letters: "q\u24E0\uFF51\u024B\uA757\uA759"
}, {
  base: 'r',
  letters: "r\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783"
}, {
  base: 's',
  letters: "s\u24E2\uFF53\xDF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B"
}, {
  base: 't',
  letters: "t\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787"
}, {
  base: 'tz',
  letters: "\uA729"
}, {
  base: 'u',
  letters: "u\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289"
}, {
  base: 'v',
  letters: "v\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C"
}, {
  base: 'vy',
  letters: "\uA761"
}, {
  base: 'w',
  letters: "w\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73"
}, {
  base: 'x',
  letters: "x\u24E7\uFF58\u1E8B\u1E8D"
}, {
  base: 'y',
  letters: "y\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF"
}, {
  base: 'z',
  letters: "z\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763"
}];
var anyDiacritic = new RegExp('[' + diacritics.map(function (d) {
  return d.letters;
}).join('') + ']', 'g');
var diacriticToBase = {};
for (var i = 0; i < diacritics.length; i++) {
  var diacritic = diacritics[i];
  for (var j = 0; j < diacritic.letters.length; j++) {
    diacriticToBase[diacritic.letters[j]] = diacritic.base;
  }
}
var stripDiacritics = function stripDiacritics(str) {
  return str.replace(anyDiacritic, function (match) {
    return diacriticToBase[match];
  });
};

var memoizedStripDiacriticsForInput = memoizeOne(stripDiacritics);
var trimString = function trimString(str) {
  return str.replace(/^\s+|\s+$/g, '');
};
var defaultStringify = function defaultStringify(option) {
  return "".concat(option.label, " ").concat(option.value);
};
var createFilter = function createFilter(config) {
  return function (option, rawInput) {
    // eslint-disable-next-line no-underscore-dangle
    if (option.data.__isNew__) return true;
    var _ignoreCase$ignoreAcc = _objectSpread2({
        ignoreCase: true,
        ignoreAccents: true,
        stringify: defaultStringify,
        trim: true,
        matchFrom: 'any'
      }, config),
      ignoreCase = _ignoreCase$ignoreAcc.ignoreCase,
      ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents,
      stringify = _ignoreCase$ignoreAcc.stringify,
      trim = _ignoreCase$ignoreAcc.trim,
      matchFrom = _ignoreCase$ignoreAcc.matchFrom;
    var input = trim ? trimString(rawInput) : rawInput;
    var candidate = trim ? trimString(stringify(option)) : stringify(option);
    if (ignoreCase) {
      input = input.toLowerCase();
      candidate = candidate.toLowerCase();
    }
    if (ignoreAccents) {
      input = memoizedStripDiacriticsForInput(input);
      candidate = stripDiacritics(candidate);
    }
    return matchFrom === 'start' ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
  };
};

var _excluded$2 = ["innerRef"];
function DummyInput(_ref) {
  var innerRef = _ref.innerRef,
    props = _objectWithoutProperties(_ref, _excluded$2);
  // Remove animation props not meant for HTML elements
  var filteredProps = removeProps(props, 'onExited', 'in', 'enter', 'exit', 'appear');
  return jsx("input", _extends({
    ref: innerRef
  }, filteredProps, {
    css: /*#__PURE__*/css$2({
      label: 'dummyInput',
      // get rid of any default styles
      background: 0,
      border: 0,
      // important! this hides the flashing cursor
      caretColor: 'transparent',
      fontSize: 'inherit',
      gridArea: '1 / 1 / 2 / 3',
      outline: 0,
      padding: 0,
      // important! without `width` browsers won't allow focus
      width: 1,
      // remove cursor on desktop
      color: 'transparent',
      // remove cursor on mobile whilst maintaining "scroll into view" behaviour
      left: -100,
      opacity: 0,
      position: 'relative',
      transform: 'scale(.01)'
    }, process.env.NODE_ENV === "production" ? "" : ";label:DummyInput;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkR1bW15SW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCTSIsImZpbGUiOiJEdW1teUlucHV0LnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsgUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgcmVtb3ZlUHJvcHMgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIER1bW15SW5wdXQoe1xuICBpbm5lclJlZixcbiAgLi4ucHJvcHNcbn06IEpTWC5JbnRyaW5zaWNFbGVtZW50c1snaW5wdXQnXSAmIHtcbiAgcmVhZG9ubHkgaW5uZXJSZWY6IFJlZjxIVE1MSW5wdXRFbGVtZW50Pjtcbn0pIHtcbiAgLy8gUmVtb3ZlIGFuaW1hdGlvbiBwcm9wcyBub3QgbWVhbnQgZm9yIEhUTUwgZWxlbWVudHNcbiAgY29uc3QgZmlsdGVyZWRQcm9wcyA9IHJlbW92ZVByb3BzKFxuICAgIHByb3BzLFxuICAgICdvbkV4aXRlZCcsXG4gICAgJ2luJyxcbiAgICAnZW50ZXInLFxuICAgICdleGl0JyxcbiAgICAnYXBwZWFyJ1xuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGlucHV0XG4gICAgICByZWY9e2lubmVyUmVmfVxuICAgICAgey4uLmZpbHRlcmVkUHJvcHN9XG4gICAgICBjc3M9e3tcbiAgICAgICAgbGFiZWw6ICdkdW1teUlucHV0JyxcbiAgICAgICAgLy8gZ2V0IHJpZCBvZiBhbnkgZGVmYXVsdCBzdHlsZXNcbiAgICAgICAgYmFja2dyb3VuZDogMCxcbiAgICAgICAgYm9yZGVyOiAwLFxuICAgICAgICAvLyBpbXBvcnRhbnQhIHRoaXMgaGlkZXMgdGhlIGZsYXNoaW5nIGN1cnNvclxuICAgICAgICBjYXJldENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgICAgICBncmlkQXJlYTogJzEgLyAxIC8gMiAvIDMnLFxuICAgICAgICBvdXRsaW5lOiAwLFxuICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAvLyBpbXBvcnRhbnQhIHdpdGhvdXQgYHdpZHRoYCBicm93c2VycyB3b24ndCBhbGxvdyBmb2N1c1xuICAgICAgICB3aWR0aDogMSxcblxuICAgICAgICAvLyByZW1vdmUgY3Vyc29yIG9uIGRlc2t0b3BcbiAgICAgICAgY29sb3I6ICd0cmFuc3BhcmVudCcsXG5cbiAgICAgICAgLy8gcmVtb3ZlIGN1cnNvciBvbiBtb2JpbGUgd2hpbHN0IG1haW50YWluaW5nIFwic2Nyb2xsIGludG8gdmlld1wiIGJlaGF2aW91clxuICAgICAgICBsZWZ0OiAtMTAwLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoLjAxKScsXG4gICAgICB9fVxuICAgIC8+XG4gICk7XG59XG4iXX0= */")
  }));
}

var cancelScroll = function cancelScroll(event) {
  event.preventDefault();
  event.stopPropagation();
};
function useScrollCapture(_ref) {
  var isEnabled = _ref.isEnabled,
    onBottomArrive = _ref.onBottomArrive,
    onBottomLeave = _ref.onBottomLeave,
    onTopArrive = _ref.onTopArrive,
    onTopLeave = _ref.onTopLeave;
  var isBottom = React.useRef(false);
  var isTop = React.useRef(false);
  var touchStart = React.useRef(0);
  var scrollTarget = React.useRef(null);
  var handleEventDelta = React.useCallback(function (event, delta) {
    if (scrollTarget.current === null) return;
    var _scrollTarget$current = scrollTarget.current,
      scrollTop = _scrollTarget$current.scrollTop,
      scrollHeight = _scrollTarget$current.scrollHeight,
      clientHeight = _scrollTarget$current.clientHeight;
    var target = scrollTarget.current;
    var isDeltaPositive = delta > 0;
    var availableScroll = scrollHeight - clientHeight - scrollTop;
    var shouldCancelScroll = false;

    // reset bottom/top flags
    if (availableScroll > delta && isBottom.current) {
      if (onBottomLeave) onBottomLeave(event);
      isBottom.current = false;
    }
    if (isDeltaPositive && isTop.current) {
      if (onTopLeave) onTopLeave(event);
      isTop.current = false;
    }

    // bottom limit
    if (isDeltaPositive && delta > availableScroll) {
      if (onBottomArrive && !isBottom.current) {
        onBottomArrive(event);
      }
      target.scrollTop = scrollHeight;
      shouldCancelScroll = true;
      isBottom.current = true;

      // top limit
    } else if (!isDeltaPositive && -delta > scrollTop) {
      if (onTopArrive && !isTop.current) {
        onTopArrive(event);
      }
      target.scrollTop = 0;
      shouldCancelScroll = true;
      isTop.current = true;
    }

    // cancel scroll
    if (shouldCancelScroll) {
      cancelScroll(event);
    }
  }, [onBottomArrive, onBottomLeave, onTopArrive, onTopLeave]);
  var onWheel = React.useCallback(function (event) {
    handleEventDelta(event, event.deltaY);
  }, [handleEventDelta]);
  var onTouchStart = React.useCallback(function (event) {
    // set touch start so we can calculate touchmove delta
    touchStart.current = event.changedTouches[0].clientY;
  }, []);
  var onTouchMove = React.useCallback(function (event) {
    var deltaY = touchStart.current - event.changedTouches[0].clientY;
    handleEventDelta(event, deltaY);
  }, [handleEventDelta]);
  var startListening = React.useCallback(function (el) {
    // bail early if no element is available to attach to
    if (!el) return;
    var notPassive = supportsPassiveEvents ? {
      passive: false
    } : false;
    el.addEventListener('wheel', onWheel, notPassive);
    el.addEventListener('touchstart', onTouchStart, notPassive);
    el.addEventListener('touchmove', onTouchMove, notPassive);
  }, [onTouchMove, onTouchStart, onWheel]);
  var stopListening = React.useCallback(function (el) {
    // bail early if no element is available to detach from
    if (!el) return;
    el.removeEventListener('wheel', onWheel, false);
    el.removeEventListener('touchstart', onTouchStart, false);
    el.removeEventListener('touchmove', onTouchMove, false);
  }, [onTouchMove, onTouchStart, onWheel]);
  React.useEffect(function () {
    if (!isEnabled) return;
    var element = scrollTarget.current;
    startListening(element);
    return function () {
      stopListening(element);
    };
  }, [isEnabled, startListening, stopListening]);
  return function (element) {
    scrollTarget.current = element;
  };
}

var STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
var LOCK_STYLES = {
  boxSizing: 'border-box',
  // account for possible declaration `width: 100%;` on body
  overflow: 'hidden',
  position: 'relative',
  height: '100%'
};
function preventTouchMove(e) {
  e.preventDefault();
}
function allowTouchMove(e) {
  e.stopPropagation();
}
function preventInertiaScroll() {
  var top = this.scrollTop;
  var totalScroll = this.scrollHeight;
  var currentScroll = top + this.offsetHeight;
  if (top === 0) {
    this.scrollTop = 1;
  } else if (currentScroll === totalScroll) {
    this.scrollTop = top - 1;
  }
}

// `ontouchstart` check works on most browsers
// `maxTouchPoints` works on IE10/11 and Surface
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
var activeScrollLocks = 0;
var listenerOptions = {
  capture: false,
  passive: false
};
function useScrollLock(_ref) {
  var isEnabled = _ref.isEnabled,
    _ref$accountForScroll = _ref.accountForScrollbars,
    accountForScrollbars = _ref$accountForScroll === void 0 ? true : _ref$accountForScroll;
  var originalStyles = React.useRef({});
  var scrollTarget = React.useRef(null);
  var addScrollLock = React.useCallback(function (touchScrollTarget) {
    if (!canUseDOM) return;
    var target = document.body;
    var targetStyle = target && target.style;
    if (accountForScrollbars) {
      // store any styles already applied to the body
      STYLE_KEYS.forEach(function (key) {
        var val = targetStyle && targetStyle[key];
        originalStyles.current[key] = val;
      });
    }

    // apply the lock styles and padding if this is the first scroll lock
    if (accountForScrollbars && activeScrollLocks < 1) {
      var currentPadding = parseInt(originalStyles.current.paddingRight, 10) || 0;
      var clientWidth = document.body ? document.body.clientWidth : 0;
      var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
      Object.keys(LOCK_STYLES).forEach(function (key) {
        var val = LOCK_STYLES[key];
        if (targetStyle) {
          targetStyle[key] = val;
        }
      });
      if (targetStyle) {
        targetStyle.paddingRight = "".concat(adjustedPadding, "px");
      }
    }

    // account for touch devices
    if (target && isTouchDevice()) {
      // Mobile Safari ignores { overflow: hidden } declaration on the body.
      target.addEventListener('touchmove', preventTouchMove, listenerOptions);

      // Allow scroll on provided target
      if (touchScrollTarget) {
        touchScrollTarget.addEventListener('touchstart', preventInertiaScroll, listenerOptions);
        touchScrollTarget.addEventListener('touchmove', allowTouchMove, listenerOptions);
      }
    }

    // increment active scroll locks
    activeScrollLocks += 1;
  }, [accountForScrollbars]);
  var removeScrollLock = React.useCallback(function (touchScrollTarget) {
    if (!canUseDOM) return;
    var target = document.body;
    var targetStyle = target && target.style;

    // safely decrement active scroll locks
    activeScrollLocks = Math.max(activeScrollLocks - 1, 0);

    // reapply original body styles, if any
    if (accountForScrollbars && activeScrollLocks < 1) {
      STYLE_KEYS.forEach(function (key) {
        var val = originalStyles.current[key];
        if (targetStyle) {
          targetStyle[key] = val;
        }
      });
    }

    // remove touch listeners
    if (target && isTouchDevice()) {
      target.removeEventListener('touchmove', preventTouchMove, listenerOptions);
      if (touchScrollTarget) {
        touchScrollTarget.removeEventListener('touchstart', preventInertiaScroll, listenerOptions);
        touchScrollTarget.removeEventListener('touchmove', allowTouchMove, listenerOptions);
      }
    }
  }, [accountForScrollbars]);
  React.useEffect(function () {
    if (!isEnabled) return;
    var element = scrollTarget.current;
    addScrollLock(element);
    return function () {
      removeScrollLock(element);
    };
  }, [isEnabled, addScrollLock, removeScrollLock]);
  return function (element) {
    scrollTarget.current = element;
  };
}

function _EMOTION_STRINGIFIED_CSS_ERROR__$1() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
var blurSelectInput = function blurSelectInput() {
  return document.activeElement && document.activeElement.blur();
};
var _ref2$1 = process.env.NODE_ENV === "production" ? {
  name: "1kfdb0e",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0"
} : {
  name: "bp8cua-ScrollManager",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0;label:ScrollManager;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcm9sbE1hbmFnZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStDVSIsImZpbGUiOiJTY3JvbGxNYW5hZ2VyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGpzeCAqL1xuaW1wb3J0IHsganN4IH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgRnJhZ21lbnQsIFJlYWN0RWxlbWVudCwgUmVmQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXNlU2Nyb2xsQ2FwdHVyZSBmcm9tICcuL3VzZVNjcm9sbENhcHR1cmUnO1xuaW1wb3J0IHVzZVNjcm9sbExvY2sgZnJvbSAnLi91c2VTY3JvbGxMb2NrJztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgcmVhZG9ubHkgY2hpbGRyZW46IChyZWY6IFJlZkNhbGxiYWNrPEhUTUxFbGVtZW50PikgPT4gUmVhY3RFbGVtZW50O1xuICByZWFkb25seSBsb2NrRW5hYmxlZDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY2FwdHVyZUVuYWJsZWQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IG9uQm90dG9tQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Cb3R0b21MZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG4gIHJlYWRvbmx5IG9uVG9wQXJyaXZlPzogKGV2ZW50OiBXaGVlbEV2ZW50IHwgVG91Y2hFdmVudCkgPT4gdm9pZDtcbiAgcmVhZG9ubHkgb25Ub3BMZWF2ZT86IChldmVudDogV2hlZWxFdmVudCB8IFRvdWNoRXZlbnQpID0+IHZvaWQ7XG59XG5cbmNvbnN0IGJsdXJTZWxlY3RJbnB1dCA9ICgpID0+XG4gIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmJsdXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2Nyb2xsTWFuYWdlcih7XG4gIGNoaWxkcmVuLFxuICBsb2NrRW5hYmxlZCxcbiAgY2FwdHVyZUVuYWJsZWQgPSB0cnVlLFxuICBvbkJvdHRvbUFycml2ZSxcbiAgb25Cb3R0b21MZWF2ZSxcbiAgb25Ub3BBcnJpdmUsXG4gIG9uVG9wTGVhdmUsXG59OiBQcm9wcykge1xuICBjb25zdCBzZXRTY3JvbGxDYXB0dXJlVGFyZ2V0ID0gdXNlU2Nyb2xsQ2FwdHVyZSh7XG4gICAgaXNFbmFibGVkOiBjYXB0dXJlRW5hYmxlZCxcbiAgICBvbkJvdHRvbUFycml2ZSxcbiAgICBvbkJvdHRvbUxlYXZlLFxuICAgIG9uVG9wQXJyaXZlLFxuICAgIG9uVG9wTGVhdmUsXG4gIH0pO1xuICBjb25zdCBzZXRTY3JvbGxMb2NrVGFyZ2V0ID0gdXNlU2Nyb2xsTG9jayh7IGlzRW5hYmxlZDogbG9ja0VuYWJsZWQgfSk7XG5cbiAgY29uc3QgdGFyZ2V0UmVmOiBSZWZDYWxsYmFjazxIVE1MRWxlbWVudD4gPSAoZWxlbWVudCkgPT4ge1xuICAgIHNldFNjcm9sbENhcHR1cmVUYXJnZXQoZWxlbWVudCk7XG4gICAgc2V0U2Nyb2xsTG9ja1RhcmdldChlbGVtZW50KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIHtsb2NrRW5hYmxlZCAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBvbkNsaWNrPXtibHVyU2VsZWN0SW5wdXR9XG4gICAgICAgICAgY3NzPXt7IHBvc2l0aW9uOiAnZml4ZWQnLCBsZWZ0OiAwLCBib3R0b206IDAsIHJpZ2h0OiAwLCB0b3A6IDAgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgICB7Y2hpbGRyZW4odGFyZ2V0UmVmKX1cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufVxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$1
};
function ScrollManager(_ref) {
  var children = _ref.children,
    lockEnabled = _ref.lockEnabled,
    _ref$captureEnabled = _ref.captureEnabled,
    captureEnabled = _ref$captureEnabled === void 0 ? true : _ref$captureEnabled,
    onBottomArrive = _ref.onBottomArrive,
    onBottomLeave = _ref.onBottomLeave,
    onTopArrive = _ref.onTopArrive,
    onTopLeave = _ref.onTopLeave;
  var setScrollCaptureTarget = useScrollCapture({
    isEnabled: captureEnabled,
    onBottomArrive: onBottomArrive,
    onBottomLeave: onBottomLeave,
    onTopArrive: onTopArrive,
    onTopLeave: onTopLeave
  });
  var setScrollLockTarget = useScrollLock({
    isEnabled: lockEnabled
  });
  var targetRef = function targetRef(element) {
    setScrollCaptureTarget(element);
    setScrollLockTarget(element);
  };
  return jsx(React.Fragment, null, lockEnabled && jsx("div", {
    onClick: blurSelectInput,
    css: _ref2$1
  }), children(targetRef));
}

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
var _ref2 = process.env.NODE_ENV === "production" ? {
  name: "1a0ro4n-requiredInput",
  styles: "label:requiredInput;opacity:0;pointer-events:none;position:absolute;bottom:0;left:0;right:0;width:100%"
} : {
  name: "5kkxb2-requiredInput-RequiredInput",
  styles: "label:requiredInput;opacity:0;pointer-events:none;position:absolute;bottom:0;left:0;right:0;width:100%;label:RequiredInput;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVpcmVkSW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWNJIiwiZmlsZSI6IlJlcXVpcmVkSW5wdXQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBGb2N1c0V2ZW50SGFuZGxlciwgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBqc3ggfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmNvbnN0IFJlcXVpcmVkSW5wdXQ6IEZ1bmN0aW9uQ29tcG9uZW50PHtcbiAgcmVhZG9ubHkgbmFtZT86IHN0cmluZztcbiAgcmVhZG9ubHkgb25Gb2N1czogRm9jdXNFdmVudEhhbmRsZXI8SFRNTElucHV0RWxlbWVudD47XG59PiA9ICh7IG5hbWUsIG9uRm9jdXMgfSkgPT4gKFxuICA8aW5wdXRcbiAgICByZXF1aXJlZFxuICAgIG5hbWU9e25hbWV9XG4gICAgdGFiSW5kZXg9ey0xfVxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICBjc3M9e3tcbiAgICAgIGxhYmVsOiAncmVxdWlyZWRJbnB1dCcsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBib3R0b206IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IDAsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgIH19XG4gICAgLy8gUHJldmVudCBgU3dpdGNoaW5nIGZyb20gdW5jb250cm9sbGVkIHRvIGNvbnRyb2xsZWRgIGVycm9yXG4gICAgdmFsdWU9XCJcIlxuICAgIG9uQ2hhbmdlPXsoKSA9PiB7fX1cbiAgLz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVpcmVkSW5wdXQ7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var RequiredInput = function RequiredInput(_ref) {
  var name = _ref.name,
    onFocus = _ref.onFocus;
  return jsx("input", {
    required: true,
    name: name,
    tabIndex: -1,
    "aria-hidden": "true",
    onFocus: onFocus,
    css: _ref2
    // Prevent `Switching from uncontrolled to controlled` error
    ,
    value: "",
    onChange: function onChange() {}
  });
};
var RequiredInput$1 = RequiredInput;

var formatGroupLabel = function formatGroupLabel(group) {
  return group.label;
};
var getOptionLabel$1 = function getOptionLabel(option) {
  return option.label;
};
var getOptionValue$1 = function getOptionValue(option) {
  return option.value;
};
var isOptionDisabled = function isOptionDisabled(option) {
  return !!option.isDisabled;
};

var defaultStyles = {
  clearIndicator: clearIndicatorCSS,
  container: containerCSS,
  control: css$1,
  dropdownIndicator: dropdownIndicatorCSS,
  group: groupCSS,
  groupHeading: groupHeadingCSS,
  indicatorsContainer: indicatorsContainerCSS,
  indicatorSeparator: indicatorSeparatorCSS,
  input: inputCSS,
  loadingIndicator: loadingIndicatorCSS,
  loadingMessage: loadingMessageCSS,
  menu: menuCSS,
  menuList: menuListCSS,
  menuPortal: menuPortalCSS,
  multiValue: multiValueCSS,
  multiValueLabel: multiValueLabelCSS,
  multiValueRemove: multiValueRemoveCSS,
  noOptionsMessage: noOptionsMessageCSS,
  option: optionCSS,
  placeholder: placeholderCSS,
  singleValue: css,
  valueContainer: valueContainerCSS
};

var colors = {
  primary: '#2684FF',
  primary75: '#4C9AFF',
  primary50: '#B2D4FF',
  primary25: '#DEEBFF',
  danger: '#DE350B',
  dangerLight: '#FFBDAD',
  neutral0: 'hsl(0, 0%, 100%)',
  neutral5: 'hsl(0, 0%, 95%)',
  neutral10: 'hsl(0, 0%, 90%)',
  neutral20: 'hsl(0, 0%, 80%)',
  neutral30: 'hsl(0, 0%, 70%)',
  neutral40: 'hsl(0, 0%, 60%)',
  neutral50: 'hsl(0, 0%, 50%)',
  neutral60: 'hsl(0, 0%, 40%)',
  neutral70: 'hsl(0, 0%, 30%)',
  neutral80: 'hsl(0, 0%, 20%)',
  neutral90: 'hsl(0, 0%, 10%)'
};
var borderRadius = 4;
// Used to calculate consistent margin/padding on elements
var baseUnit = 4;
// The minimum height of the control
var controlHeight = 38;
// The amount of space between the control and menu */
var menuGutter = baseUnit * 2;
var spacing = {
  baseUnit: baseUnit,
  controlHeight: controlHeight,
  menuGutter: menuGutter
};
var defaultTheme = {
  borderRadius: borderRadius,
  colors: colors,
  spacing: spacing
};

var defaultProps = {
  'aria-live': 'polite',
  backspaceRemovesValue: true,
  blurInputOnSelect: isTouchCapable(),
  captureMenuScroll: !isTouchCapable(),
  classNames: {},
  closeMenuOnSelect: true,
  closeMenuOnScroll: false,
  components: {},
  controlShouldRenderValue: true,
  escapeClearsValue: false,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabel,
  getOptionLabel: getOptionLabel$1,
  getOptionValue: getOptionValue$1,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRtl: false,
  isSearchable: true,
  isOptionDisabled: isOptionDisabled,
  loadingMessage: function loadingMessage() {
    return 'Loading...';
  },
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: false,
  menuPlacement: 'bottom',
  menuPosition: 'absolute',
  menuShouldBlockScroll: false,
  menuShouldScrollIntoView: !isMobileDevice(),
  noOptionsMessage: function noOptionsMessage() {
    return 'No options';
  },
  openMenuOnFocus: false,
  openMenuOnClick: true,
  options: [],
  pageSize: 5,
  placeholder: 'Select...',
  screenReaderStatus: function screenReaderStatus(_ref) {
    var count = _ref.count;
    return "".concat(count, " result").concat(count !== 1 ? 's' : '', " available");
  },
  styles: {},
  tabIndex: 0,
  tabSelectsValue: true,
  unstyled: false
};
function toCategorizedOption(props, option, selectValue, index) {
  var isDisabled = _isOptionDisabled(props, option, selectValue);
  var isSelected = _isOptionSelected(props, option, selectValue);
  var label = getOptionLabel(props, option);
  var value = getOptionValue(props, option);
  return {
    type: 'option',
    data: option,
    isDisabled: isDisabled,
    isSelected: isSelected,
    label: label,
    value: value,
    index: index
  };
}
function buildCategorizedOptions(props, selectValue) {
  return props.options.map(function (groupOrOption, groupOrOptionIndex) {
    if ('options' in groupOrOption) {
      var categorizedOptions = groupOrOption.options.map(function (option, optionIndex) {
        return toCategorizedOption(props, option, selectValue, optionIndex);
      }).filter(function (categorizedOption) {
        return isFocusable(props, categorizedOption);
      });
      return categorizedOptions.length > 0 ? {
        type: 'group',
        data: groupOrOption,
        options: categorizedOptions,
        index: groupOrOptionIndex
      } : undefined;
    }
    var categorizedOption = toCategorizedOption(props, groupOrOption, selectValue, groupOrOptionIndex);
    return isFocusable(props, categorizedOption) ? categorizedOption : undefined;
  }).filter(notNullish);
}
function buildFocusableOptionsFromCategorizedOptions(categorizedOptions) {
  return categorizedOptions.reduce(function (optionsAccumulator, categorizedOption) {
    if (categorizedOption.type === 'group') {
      optionsAccumulator.push.apply(optionsAccumulator, _toConsumableArray(categorizedOption.options.map(function (option) {
        return option.data;
      })));
    } else {
      optionsAccumulator.push(categorizedOption.data);
    }
    return optionsAccumulator;
  }, []);
}
function buildFocusableOptions(props, selectValue) {
  return buildFocusableOptionsFromCategorizedOptions(buildCategorizedOptions(props, selectValue));
}
function isFocusable(props, categorizedOption) {
  var _props$inputValue = props.inputValue,
    inputValue = _props$inputValue === void 0 ? '' : _props$inputValue;
  var data = categorizedOption.data,
    isSelected = categorizedOption.isSelected,
    label = categorizedOption.label,
    value = categorizedOption.value;
  return (!shouldHideSelectedOptions(props) || !isSelected) && _filterOption(props, {
    label: label,
    value: value,
    data: data
  }, inputValue);
}
function getNextFocusedValue(state, nextSelectValue) {
  var focusedValue = state.focusedValue,
    lastSelectValue = state.selectValue;
  var lastFocusedIndex = lastSelectValue.indexOf(focusedValue);
  if (lastFocusedIndex > -1) {
    var nextFocusedIndex = nextSelectValue.indexOf(focusedValue);
    if (nextFocusedIndex > -1) {
      // the focused value is still in the selectValue, return it
      return focusedValue;
    } else if (lastFocusedIndex < nextSelectValue.length) {
      // the focusedValue is not present in the next selectValue array by
      // reference, so return the new value at the same index
      return nextSelectValue[lastFocusedIndex];
    }
  }
  return null;
}
function getNextFocusedOption(state, options) {
  var lastFocusedOption = state.focusedOption;
  return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
}
var getOptionLabel = function getOptionLabel(props, data) {
  return props.getOptionLabel(data);
};
var getOptionValue = function getOptionValue(props, data) {
  return props.getOptionValue(data);
};
function _isOptionDisabled(props, option, selectValue) {
  return typeof props.isOptionDisabled === 'function' ? props.isOptionDisabled(option, selectValue) : false;
}
function _isOptionSelected(props, option, selectValue) {
  if (selectValue.indexOf(option) > -1) return true;
  if (typeof props.isOptionSelected === 'function') {
    return props.isOptionSelected(option, selectValue);
  }
  var candidate = getOptionValue(props, option);
  return selectValue.some(function (i) {
    return getOptionValue(props, i) === candidate;
  });
}
function _filterOption(props, option, inputValue) {
  return props.filterOption ? props.filterOption(option, inputValue) : true;
}
var shouldHideSelectedOptions = function shouldHideSelectedOptions(props) {
  var hideSelectedOptions = props.hideSelectedOptions,
    isMulti = props.isMulti;
  if (hideSelectedOptions === undefined) return isMulti;
  return hideSelectedOptions;
};
var instanceId = 1;
var Select = /*#__PURE__*/function (_Component) {
  _inherits(Select, _Component);
  var _super = _createSuper(Select);
  // Misc. Instance Properties
  // ------------------------------

  // TODO

  // Refs
  // ------------------------------

  // Lifecycle
  // ------------------------------

  function Select(_props) {
    var _this;
    _classCallCheck(this, Select);
    _this = _super.call(this, _props);
    _this.state = {
      ariaSelection: null,
      focusedOption: null,
      focusedValue: null,
      inputIsHidden: false,
      isFocused: false,
      selectValue: [],
      clearFocusValueOnUpdate: false,
      prevWasFocused: false,
      inputIsHiddenAfterUpdate: undefined,
      prevProps: undefined
    };
    _this.blockOptionHover = false;
    _this.isComposing = false;
    _this.commonProps = void 0;
    _this.initialTouchX = 0;
    _this.initialTouchY = 0;
    _this.instancePrefix = '';
    _this.openAfterFocus = false;
    _this.scrollToFocusedOptionOnUpdate = false;
    _this.userIsDragging = void 0;
    _this.controlRef = null;
    _this.getControlRef = function (ref) {
      _this.controlRef = ref;
    };
    _this.focusedOptionRef = null;
    _this.getFocusedOptionRef = function (ref) {
      _this.focusedOptionRef = ref;
    };
    _this.menuListRef = null;
    _this.getMenuListRef = function (ref) {
      _this.menuListRef = ref;
    };
    _this.inputRef = null;
    _this.getInputRef = function (ref) {
      _this.inputRef = ref;
    };
    _this.focus = _this.focusInput;
    _this.blur = _this.blurInput;
    _this.onChange = function (newValue, actionMeta) {
      var _this$props = _this.props,
        onChange = _this$props.onChange,
        name = _this$props.name;
      actionMeta.name = name;
      _this.ariaOnChange(newValue, actionMeta);
      onChange(newValue, actionMeta);
    };
    _this.setValue = function (newValue, action, option) {
      var _this$props2 = _this.props,
        closeMenuOnSelect = _this$props2.closeMenuOnSelect,
        isMulti = _this$props2.isMulti,
        inputValue = _this$props2.inputValue;
      _this.onInputChange('', {
        action: 'set-value',
        prevInputValue: inputValue
      });
      if (closeMenuOnSelect) {
        _this.setState({
          inputIsHiddenAfterUpdate: !isMulti
        });
        _this.onMenuClose();
      }
      // when the select value should change, we should reset focusedValue
      _this.setState({
        clearFocusValueOnUpdate: true
      });
      _this.onChange(newValue, {
        action: action,
        option: option
      });
    };
    _this.selectOption = function (newValue) {
      var _this$props3 = _this.props,
        blurInputOnSelect = _this$props3.blurInputOnSelect,
        isMulti = _this$props3.isMulti,
        name = _this$props3.name;
      var selectValue = _this.state.selectValue;
      var deselected = isMulti && _this.isOptionSelected(newValue, selectValue);
      var isDisabled = _this.isOptionDisabled(newValue, selectValue);
      if (deselected) {
        var candidate = _this.getOptionValue(newValue);
        _this.setValue(multiValueAsValue(selectValue.filter(function (i) {
          return _this.getOptionValue(i) !== candidate;
        })), 'deselect-option', newValue);
      } else if (!isDisabled) {
        // Select option if option is not disabled
        if (isMulti) {
          _this.setValue(multiValueAsValue([].concat(_toConsumableArray(selectValue), [newValue])), 'select-option', newValue);
        } else {
          _this.setValue(singleValueAsValue(newValue), 'select-option');
        }
      } else {
        _this.ariaOnChange(singleValueAsValue(newValue), {
          action: 'select-option',
          option: newValue,
          name: name
        });
        return;
      }
      if (blurInputOnSelect) {
        _this.blurInput();
      }
    };
    _this.removeValue = function (removedValue) {
      var isMulti = _this.props.isMulti;
      var selectValue = _this.state.selectValue;
      var candidate = _this.getOptionValue(removedValue);
      var newValueArray = selectValue.filter(function (i) {
        return _this.getOptionValue(i) !== candidate;
      });
      var newValue = valueTernary(isMulti, newValueArray, newValueArray[0] || null);
      _this.onChange(newValue, {
        action: 'remove-value',
        removedValue: removedValue
      });
      _this.focusInput();
    };
    _this.clearValue = function () {
      var selectValue = _this.state.selectValue;
      _this.onChange(valueTernary(_this.props.isMulti, [], null), {
        action: 'clear',
        removedValues: selectValue
      });
    };
    _this.popValue = function () {
      var isMulti = _this.props.isMulti;
      var selectValue = _this.state.selectValue;
      var lastSelectedValue = selectValue[selectValue.length - 1];
      var newValueArray = selectValue.slice(0, selectValue.length - 1);
      var newValue = valueTernary(isMulti, newValueArray, newValueArray[0] || null);
      _this.onChange(newValue, {
        action: 'pop-value',
        removedValue: lastSelectedValue
      });
    };
    _this.getValue = function () {
      return _this.state.selectValue;
    };
    _this.cx = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return classNames.apply(void 0, [_this.props.classNamePrefix].concat(args));
    };
    _this.getOptionLabel = function (data) {
      return getOptionLabel(_this.props, data);
    };
    _this.getOptionValue = function (data) {
      return getOptionValue(_this.props, data);
    };
    _this.getStyles = function (key, props) {
      var unstyled = _this.props.unstyled;
      var base = defaultStyles[key](props, unstyled);
      base.boxSizing = 'border-box';
      var custom = _this.props.styles[key];
      return custom ? custom(base, props) : base;
    };
    _this.getClassNames = function (key, props) {
      var _this$props$className, _this$props$className2;
      return (_this$props$className = (_this$props$className2 = _this.props.classNames)[key]) === null || _this$props$className === void 0 ? void 0 : _this$props$className.call(_this$props$className2, props);
    };
    _this.getElementId = function (element) {
      return "".concat(_this.instancePrefix, "-").concat(element);
    };
    _this.getComponents = function () {
      return defaultComponents(_this.props);
    };
    _this.buildCategorizedOptions = function () {
      return buildCategorizedOptions(_this.props, _this.state.selectValue);
    };
    _this.getCategorizedOptions = function () {
      return _this.props.menuIsOpen ? _this.buildCategorizedOptions() : [];
    };
    _this.buildFocusableOptions = function () {
      return buildFocusableOptionsFromCategorizedOptions(_this.buildCategorizedOptions());
    };
    _this.getFocusableOptions = function () {
      return _this.props.menuIsOpen ? _this.buildFocusableOptions() : [];
    };
    _this.ariaOnChange = function (value, actionMeta) {
      _this.setState({
        ariaSelection: _objectSpread2({
          value: value
        }, actionMeta)
      });
    };
    _this.onMenuMouseDown = function (event) {
      if (event.button !== 0) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      _this.focusInput();
    };
    _this.onMenuMouseMove = function (event) {
      _this.blockOptionHover = false;
    };
    _this.onControlMouseDown = function (event) {
      // Event captured by dropdown indicator
      if (event.defaultPrevented) {
        return;
      }
      var openMenuOnClick = _this.props.openMenuOnClick;
      if (!_this.state.isFocused) {
        if (openMenuOnClick) {
          _this.openAfterFocus = true;
        }
        _this.focusInput();
      } else if (!_this.props.menuIsOpen) {
        if (openMenuOnClick) {
          _this.openMenu('first');
        }
      } else {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
          _this.onMenuClose();
        }
      }
      if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault();
      }
    };
    _this.onDropdownIndicatorMouseDown = function (event) {
      // ignore mouse events that weren't triggered by the primary button
      if (event && event.type === 'mousedown' && event.button !== 0) {
        return;
      }
      if (_this.props.isDisabled) return;
      var _this$props4 = _this.props,
        isMulti = _this$props4.isMulti,
        menuIsOpen = _this$props4.menuIsOpen;
      _this.focusInput();
      if (menuIsOpen) {
        _this.setState({
          inputIsHiddenAfterUpdate: !isMulti
        });
        _this.onMenuClose();
      } else {
        _this.openMenu('first');
      }
      event.preventDefault();
    };
    _this.onClearIndicatorMouseDown = function (event) {
      // ignore mouse events that weren't triggered by the primary button
      if (event && event.type === 'mousedown' && event.button !== 0) {
        return;
      }
      _this.clearValue();
      event.preventDefault();
      _this.openAfterFocus = false;
      if (event.type === 'touchend') {
        _this.focusInput();
      } else {
        setTimeout(function () {
          return _this.focusInput();
        });
      }
    };
    _this.onScroll = function (event) {
      if (typeof _this.props.closeMenuOnScroll === 'boolean') {
        if (event.target instanceof HTMLElement && isDocumentElement(event.target)) {
          _this.props.onMenuClose();
        }
      } else if (typeof _this.props.closeMenuOnScroll === 'function') {
        if (_this.props.closeMenuOnScroll(event)) {
          _this.props.onMenuClose();
        }
      }
    };
    _this.onCompositionStart = function () {
      _this.isComposing = true;
    };
    _this.onCompositionEnd = function () {
      _this.isComposing = false;
    };
    _this.onTouchStart = function (_ref2) {
      var touches = _ref2.touches;
      var touch = touches && touches.item(0);
      if (!touch) {
        return;
      }
      _this.initialTouchX = touch.clientX;
      _this.initialTouchY = touch.clientY;
      _this.userIsDragging = false;
    };
    _this.onTouchMove = function (_ref3) {
      var touches = _ref3.touches;
      var touch = touches && touches.item(0);
      if (!touch) {
        return;
      }
      var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
      var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
      var moveThreshold = 5;
      _this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
    };
    _this.onTouchEnd = function (event) {
      if (_this.userIsDragging) return;

      // close the menu if the user taps outside
      // we're checking on event.target here instead of event.currentTarget, because we want to assert information
      // on events on child elements, not the document (which we've attached this handler to).
      if (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target)) {
        _this.blurInput();
      }

      // reset move vars
      _this.initialTouchX = 0;
      _this.initialTouchY = 0;
    };
    _this.onControlTouchEnd = function (event) {
      if (_this.userIsDragging) return;
      _this.onControlMouseDown(event);
    };
    _this.onClearIndicatorTouchEnd = function (event) {
      if (_this.userIsDragging) return;
      _this.onClearIndicatorMouseDown(event);
    };
    _this.onDropdownIndicatorTouchEnd = function (event) {
      if (_this.userIsDragging) return;
      _this.onDropdownIndicatorMouseDown(event);
    };
    _this.handleInputChange = function (event) {
      var prevInputValue = _this.props.inputValue;
      var inputValue = event.currentTarget.value;
      _this.setState({
        inputIsHiddenAfterUpdate: false
      });
      _this.onInputChange(inputValue, {
        action: 'input-change',
        prevInputValue: prevInputValue
      });
      if (!_this.props.menuIsOpen) {
        _this.onMenuOpen();
      }
    };
    _this.onInputFocus = function (event) {
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
      _this.setState({
        inputIsHiddenAfterUpdate: false,
        isFocused: true
      });
      if (_this.openAfterFocus || _this.props.openMenuOnFocus) {
        _this.openMenu('first');
      }
      _this.openAfterFocus = false;
    };
    _this.onInputBlur = function (event) {
      var prevInputValue = _this.props.inputValue;
      if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
        _this.inputRef.focus();
        return;
      }
      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
      _this.onInputChange('', {
        action: 'input-blur',
        prevInputValue: prevInputValue
      });
      _this.onMenuClose();
      _this.setState({
        focusedValue: null,
        isFocused: false
      });
    };
    _this.onOptionHover = function (focusedOption) {
      if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) {
        return;
      }
      _this.setState({
        focusedOption: focusedOption
      });
    };
    _this.shouldHideSelectedOptions = function () {
      return shouldHideSelectedOptions(_this.props);
    };
    _this.onValueInputFocus = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.focus();
    };
    _this.onKeyDown = function (event) {
      var _this$props5 = _this.props,
        isMulti = _this$props5.isMulti,
        backspaceRemovesValue = _this$props5.backspaceRemovesValue,
        escapeClearsValue = _this$props5.escapeClearsValue,
        inputValue = _this$props5.inputValue,
        isClearable = _this$props5.isClearable,
        isDisabled = _this$props5.isDisabled,
        menuIsOpen = _this$props5.menuIsOpen,
        onKeyDown = _this$props5.onKeyDown,
        tabSelectsValue = _this$props5.tabSelectsValue,
        openMenuOnFocus = _this$props5.openMenuOnFocus;
      var _this$state = _this.state,
        focusedOption = _this$state.focusedOption,
        focusedValue = _this$state.focusedValue,
        selectValue = _this$state.selectValue;
      if (isDisabled) return;
      if (typeof onKeyDown === 'function') {
        onKeyDown(event);
        if (event.defaultPrevented) {
          return;
        }
      }

      // Block option hover events when the user has just pressed a key
      _this.blockOptionHover = true;
      switch (event.key) {
        case 'ArrowLeft':
          if (!isMulti || inputValue) return;
          _this.focusValue('previous');
          break;
        case 'ArrowRight':
          if (!isMulti || inputValue) return;
          _this.focusValue('next');
          break;
        case 'Delete':
        case 'Backspace':
          if (inputValue) return;
          if (focusedValue) {
            _this.removeValue(focusedValue);
          } else {
            if (!backspaceRemovesValue) return;
            if (isMulti) {
              _this.popValue();
            } else if (isClearable) {
              _this.clearValue();
            }
          }
          break;
        case 'Tab':
          if (_this.isComposing) return;
          if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption ||
          // don't capture the event if the menu opens on focus and the focused
          // option is already selected; it breaks the flow of navigation
          openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) {
            return;
          }
          _this.selectOption(focusedOption);
          break;
        case 'Enter':
          if (event.keyCode === 229) {
            // ignore the keydown event from an Input Method Editor(IME)
            // ref. https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
            break;
          }
          if (menuIsOpen) {
            if (!focusedOption) return;
            if (_this.isComposing) return;
            _this.selectOption(focusedOption);
            break;
          }
          return;
        case 'Escape':
          if (menuIsOpen) {
            _this.setState({
              inputIsHiddenAfterUpdate: false
            });
            _this.onInputChange('', {
              action: 'menu-close',
              prevInputValue: inputValue
            });
            _this.onMenuClose();
          } else if (isClearable && escapeClearsValue) {
            _this.clearValue();
          }
          break;
        case ' ':
          // space
          if (inputValue) {
            return;
          }
          if (!menuIsOpen) {
            _this.openMenu('first');
            break;
          }
          if (!focusedOption) return;
          _this.selectOption(focusedOption);
          break;
        case 'ArrowUp':
          if (menuIsOpen) {
            _this.focusOption('up');
          } else {
            _this.openMenu('last');
          }
          break;
        case 'ArrowDown':
          if (menuIsOpen) {
            _this.focusOption('down');
          } else {
            _this.openMenu('first');
          }
          break;
        case 'PageUp':
          if (!menuIsOpen) return;
          _this.focusOption('pageup');
          break;
        case 'PageDown':
          if (!menuIsOpen) return;
          _this.focusOption('pagedown');
          break;
        case 'Home':
          if (!menuIsOpen) return;
          _this.focusOption('first');
          break;
        case 'End':
          if (!menuIsOpen) return;
          _this.focusOption('last');
          break;
        default:
          return;
      }
      event.preventDefault();
    };
    _this.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId);
    _this.state.selectValue = cleanValue(_props.value);

    // Set focusedOption if menuIsOpen is set on init (e.g. defaultMenuIsOpen)
    if (_props.menuIsOpen && _this.state.selectValue.length) {
      var focusableOptions = _this.buildFocusableOptions();
      var optionIndex = focusableOptions.indexOf(_this.state.selectValue[0]);
      _this.state.focusedOption = focusableOptions[optionIndex];
    }
    return _this;
  }
  _createClass(Select, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startListeningComposition();
      this.startListeningToTouch();
      if (this.props.closeMenuOnScroll && document && document.addEventListener) {
        // Listen to all scroll events, and filter them out inside of 'onScroll'
        document.addEventListener('scroll', this.onScroll, true);
      }
      if (this.props.autoFocus) {
        this.focusInput();
      }

      // Scroll focusedOption into view if menuIsOpen is set on mount (e.g. defaultMenuIsOpen)
      if (this.props.menuIsOpen && this.state.focusedOption && this.menuListRef && this.focusedOptionRef) {
        scrollIntoView(this.menuListRef, this.focusedOptionRef);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props6 = this.props,
        isDisabled = _this$props6.isDisabled,
        menuIsOpen = _this$props6.menuIsOpen;
      var isFocused = this.state.isFocused;
      if (
      // ensure focus is restored correctly when the control becomes enabled
      isFocused && !isDisabled && prevProps.isDisabled ||
      // ensure focus is on the Input when the menu opens
      isFocused && menuIsOpen && !prevProps.menuIsOpen) {
        this.focusInput();
      }
      if (isFocused && isDisabled && !prevProps.isDisabled) {
        // ensure select state gets blurred in case Select is programmatically disabled while focused
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          isFocused: false
        }, this.onMenuClose);
      } else if (!isFocused && !isDisabled && prevProps.isDisabled && this.inputRef === document.activeElement) {
        // ensure select state gets focused in case Select is programatically re-enabled while focused (Firefox)
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          isFocused: true
        });
      }

      // scroll the focused option into view if necessary
      if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
        scrollIntoView(this.menuListRef, this.focusedOptionRef);
        this.scrollToFocusedOptionOnUpdate = false;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopListeningComposition();
      this.stopListeningToTouch();
      document.removeEventListener('scroll', this.onScroll, true);
    }

    // ==============================
    // Consumer Handlers
    // ==============================
  }, {
    key: "onMenuOpen",
    value: function onMenuOpen() {
      this.props.onMenuOpen();
    }
  }, {
    key: "onMenuClose",
    value: function onMenuClose() {
      this.onInputChange('', {
        action: 'menu-close',
        prevInputValue: this.props.inputValue
      });
      this.props.onMenuClose();
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(newValue, actionMeta) {
      this.props.onInputChange(newValue, actionMeta);
    }

    // ==============================
    // Methods
    // ==============================
  }, {
    key: "focusInput",
    value: function focusInput() {
      if (!this.inputRef) return;
      this.inputRef.focus();
    }
  }, {
    key: "blurInput",
    value: function blurInput() {
      if (!this.inputRef) return;
      this.inputRef.blur();
    }

    // aliased for consumers
  }, {
    key: "openMenu",
    value: function openMenu(focusOption) {
      var _this2 = this;
      var _this$state2 = this.state,
        selectValue = _this$state2.selectValue,
        isFocused = _this$state2.isFocused;
      var focusableOptions = this.buildFocusableOptions();
      var openAtIndex = focusOption === 'first' ? 0 : focusableOptions.length - 1;
      if (!this.props.isMulti) {
        var selectedIndex = focusableOptions.indexOf(selectValue[0]);
        if (selectedIndex > -1) {
          openAtIndex = selectedIndex;
        }
      }

      // only scroll if the menu isn't already open
      this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
      this.setState({
        inputIsHiddenAfterUpdate: false,
        focusedValue: null,
        focusedOption: focusableOptions[openAtIndex]
      }, function () {
        return _this2.onMenuOpen();
      });
    }
  }, {
    key: "focusValue",
    value: function focusValue(direction) {
      var _this$state3 = this.state,
        selectValue = _this$state3.selectValue,
        focusedValue = _this$state3.focusedValue;

      // Only multiselects support value focusing
      if (!this.props.isMulti) return;
      this.setState({
        focusedOption: null
      });
      var focusedIndex = selectValue.indexOf(focusedValue);
      if (!focusedValue) {
        focusedIndex = -1;
      }
      var lastIndex = selectValue.length - 1;
      var nextFocus = -1;
      if (!selectValue.length) return;
      switch (direction) {
        case 'previous':
          if (focusedIndex === 0) {
            // don't cycle from the start to the end
            nextFocus = 0;
          } else if (focusedIndex === -1) {
            // if nothing is focused, focus the last value first
            nextFocus = lastIndex;
          } else {
            nextFocus = focusedIndex - 1;
          }
          break;
        case 'next':
          if (focusedIndex > -1 && focusedIndex < lastIndex) {
            nextFocus = focusedIndex + 1;
          }
          break;
      }
      this.setState({
        inputIsHidden: nextFocus !== -1,
        focusedValue: selectValue[nextFocus]
      });
    }
  }, {
    key: "focusOption",
    value: function focusOption() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'first';
      var pageSize = this.props.pageSize;
      var focusedOption = this.state.focusedOption;
      var options = this.getFocusableOptions();
      if (!options.length) return;
      var nextFocus = 0; // handles 'first'
      var focusedIndex = options.indexOf(focusedOption);
      if (!focusedOption) {
        focusedIndex = -1;
      }
      if (direction === 'up') {
        nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
      } else if (direction === 'down') {
        nextFocus = (focusedIndex + 1) % options.length;
      } else if (direction === 'pageup') {
        nextFocus = focusedIndex - pageSize;
        if (nextFocus < 0) nextFocus = 0;
      } else if (direction === 'pagedown') {
        nextFocus = focusedIndex + pageSize;
        if (nextFocus > options.length - 1) nextFocus = options.length - 1;
      } else if (direction === 'last') {
        nextFocus = options.length - 1;
      }
      this.scrollToFocusedOptionOnUpdate = true;
      this.setState({
        focusedOption: options[nextFocus],
        focusedValue: null
      });
    }
  }, {
    key: "getTheme",
    value:
    // ==============================
    // Getters
    // ==============================

    function getTheme() {
      // Use the default theme if there are no customisations.
      if (!this.props.theme) {
        return defaultTheme;
      }
      // If the theme prop is a function, assume the function
      // knows how to merge the passed-in default theme with
      // its own modifications.
      if (typeof this.props.theme === 'function') {
        return this.props.theme(defaultTheme);
      }
      // Otherwise, if a plain theme object was passed in,
      // overlay it with the default theme.
      return _objectSpread2(_objectSpread2({}, defaultTheme), this.props.theme);
    }
  }, {
    key: "getCommonProps",
    value: function getCommonProps() {
      var clearValue = this.clearValue,
        cx = this.cx,
        getStyles = this.getStyles,
        getClassNames = this.getClassNames,
        getValue = this.getValue,
        selectOption = this.selectOption,
        setValue = this.setValue,
        props = this.props;
      var isMulti = props.isMulti,
        isRtl = props.isRtl,
        options = props.options;
      var hasValue = this.hasValue();
      return {
        clearValue: clearValue,
        cx: cx,
        getStyles: getStyles,
        getClassNames: getClassNames,
        getValue: getValue,
        hasValue: hasValue,
        isMulti: isMulti,
        isRtl: isRtl,
        options: options,
        selectOption: selectOption,
        selectProps: props,
        setValue: setValue,
        theme: this.getTheme()
      };
    }
  }, {
    key: "hasValue",
    value: function hasValue() {
      var selectValue = this.state.selectValue;
      return selectValue.length > 0;
    }
  }, {
    key: "hasOptions",
    value: function hasOptions() {
      return !!this.getFocusableOptions().length;
    }
  }, {
    key: "isClearable",
    value: function isClearable() {
      var _this$props7 = this.props,
        isClearable = _this$props7.isClearable,
        isMulti = _this$props7.isMulti;

      // single select, by default, IS NOT clearable
      // multi select, by default, IS clearable
      if (isClearable === undefined) return isMulti;
      return isClearable;
    }
  }, {
    key: "isOptionDisabled",
    value: function isOptionDisabled(option, selectValue) {
      return _isOptionDisabled(this.props, option, selectValue);
    }
  }, {
    key: "isOptionSelected",
    value: function isOptionSelected(option, selectValue) {
      return _isOptionSelected(this.props, option, selectValue);
    }
  }, {
    key: "filterOption",
    value: function filterOption(option, inputValue) {
      return _filterOption(this.props, option, inputValue);
    }
  }, {
    key: "formatOptionLabel",
    value: function formatOptionLabel(data, context) {
      if (typeof this.props.formatOptionLabel === 'function') {
        var _inputValue = this.props.inputValue;
        var _selectValue = this.state.selectValue;
        return this.props.formatOptionLabel(data, {
          context: context,
          inputValue: _inputValue,
          selectValue: _selectValue
        });
      } else {
        return this.getOptionLabel(data);
      }
    }
  }, {
    key: "formatGroupLabel",
    value: function formatGroupLabel(data) {
      return this.props.formatGroupLabel(data);
    }

    // ==============================
    // Mouse Handlers
    // ==============================
  }, {
    key: "startListeningComposition",
    value:
    // ==============================
    // Composition Handlers
    // ==============================

    function startListeningComposition() {
      if (document && document.addEventListener) {
        document.addEventListener('compositionstart', this.onCompositionStart, false);
        document.addEventListener('compositionend', this.onCompositionEnd, false);
      }
    }
  }, {
    key: "stopListeningComposition",
    value: function stopListeningComposition() {
      if (document && document.removeEventListener) {
        document.removeEventListener('compositionstart', this.onCompositionStart);
        document.removeEventListener('compositionend', this.onCompositionEnd);
      }
    }
  }, {
    key: "startListeningToTouch",
    value:
    // ==============================
    // Touch Handlers
    // ==============================

    function startListeningToTouch() {
      if (document && document.addEventListener) {
        document.addEventListener('touchstart', this.onTouchStart, false);
        document.addEventListener('touchmove', this.onTouchMove, false);
        document.addEventListener('touchend', this.onTouchEnd, false);
      }
    }
  }, {
    key: "stopListeningToTouch",
    value: function stopListeningToTouch() {
      if (document && document.removeEventListener) {
        document.removeEventListener('touchstart', this.onTouchStart);
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
      }
    }
  }, {
    key: "renderInput",
    value:
    // ==============================
    // Renderers
    // ==============================
    function renderInput() {
      var _this$props8 = this.props,
        isDisabled = _this$props8.isDisabled,
        isSearchable = _this$props8.isSearchable,
        inputId = _this$props8.inputId,
        inputValue = _this$props8.inputValue,
        tabIndex = _this$props8.tabIndex,
        form = _this$props8.form,
        menuIsOpen = _this$props8.menuIsOpen,
        required = _this$props8.required;
      var _this$getComponents = this.getComponents(),
        Input = _this$getComponents.Input;
      var _this$state4 = this.state,
        inputIsHidden = _this$state4.inputIsHidden,
        ariaSelection = _this$state4.ariaSelection;
      var commonProps = this.commonProps;
      var id = inputId || this.getElementId('input');

      // aria attributes makes the JSX "noisy", separated for clarity
      var ariaAttributes = _objectSpread2(_objectSpread2(_objectSpread2({
        'aria-autocomplete': 'list',
        'aria-expanded': menuIsOpen,
        'aria-haspopup': true,
        'aria-errormessage': this.props['aria-errormessage'],
        'aria-invalid': this.props['aria-invalid'],
        'aria-label': this.props['aria-label'],
        'aria-labelledby': this.props['aria-labelledby'],
        'aria-required': required,
        role: 'combobox'
      }, menuIsOpen && {
        'aria-controls': this.getElementId('listbox'),
        'aria-owns': this.getElementId('listbox')
      }), !isSearchable && {
        'aria-readonly': true
      }), this.hasValue() ? (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus' && {
        'aria-describedby': this.getElementId('live-region')
      } : {
        'aria-describedby': this.getElementId('placeholder')
      });
      if (!isSearchable) {
        // use a dummy input to maintain focus/blur functionality
        return /*#__PURE__*/React__namespace.createElement(DummyInput, _extends({
          id: id,
          innerRef: this.getInputRef,
          onBlur: this.onInputBlur,
          onChange: noop,
          onFocus: this.onInputFocus,
          disabled: isDisabled,
          tabIndex: tabIndex,
          inputMode: "none",
          form: form,
          value: ""
        }, ariaAttributes));
      }
      return /*#__PURE__*/React__namespace.createElement(Input, _extends({}, commonProps, {
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        id: id,
        innerRef: this.getInputRef,
        isDisabled: isDisabled,
        isHidden: inputIsHidden,
        onBlur: this.onInputBlur,
        onChange: this.handleInputChange,
        onFocus: this.onInputFocus,
        spellCheck: "false",
        tabIndex: tabIndex,
        form: form,
        type: "text",
        value: inputValue
      }, ariaAttributes));
    }
  }, {
    key: "renderPlaceholderOrValue",
    value: function renderPlaceholderOrValue() {
      var _this3 = this;
      var _this$getComponents2 = this.getComponents(),
        MultiValue = _this$getComponents2.MultiValue,
        MultiValueContainer = _this$getComponents2.MultiValueContainer,
        MultiValueLabel = _this$getComponents2.MultiValueLabel,
        MultiValueRemove = _this$getComponents2.MultiValueRemove,
        SingleValue = _this$getComponents2.SingleValue,
        Placeholder = _this$getComponents2.Placeholder;
      var commonProps = this.commonProps;
      var _this$props9 = this.props,
        controlShouldRenderValue = _this$props9.controlShouldRenderValue,
        isDisabled = _this$props9.isDisabled,
        isMulti = _this$props9.isMulti,
        inputValue = _this$props9.inputValue,
        placeholder = _this$props9.placeholder;
      var _this$state5 = this.state,
        selectValue = _this$state5.selectValue,
        focusedValue = _this$state5.focusedValue,
        isFocused = _this$state5.isFocused;
      if (!this.hasValue() || !controlShouldRenderValue) {
        return inputValue ? null : /*#__PURE__*/React__namespace.createElement(Placeholder, _extends({}, commonProps, {
          key: "placeholder",
          isDisabled: isDisabled,
          isFocused: isFocused,
          innerProps: {
            id: this.getElementId('placeholder')
          }
        }), placeholder);
      }
      if (isMulti) {
        return selectValue.map(function (opt, index) {
          var isOptionFocused = opt === focusedValue;
          var key = "".concat(_this3.getOptionLabel(opt), "-").concat(_this3.getOptionValue(opt));
          return /*#__PURE__*/React__namespace.createElement(MultiValue, _extends({}, commonProps, {
            components: {
              Container: MultiValueContainer,
              Label: MultiValueLabel,
              Remove: MultiValueRemove
            },
            isFocused: isOptionFocused,
            isDisabled: isDisabled,
            key: key,
            index: index,
            removeProps: {
              onClick: function onClick() {
                return _this3.removeValue(opt);
              },
              onTouchEnd: function onTouchEnd() {
                return _this3.removeValue(opt);
              },
              onMouseDown: function onMouseDown(e) {
                e.preventDefault();
              }
            },
            data: opt
          }), _this3.formatOptionLabel(opt, 'value'));
        });
      }
      if (inputValue) {
        return null;
      }
      var singleValue = selectValue[0];
      return /*#__PURE__*/React__namespace.createElement(SingleValue, _extends({}, commonProps, {
        data: singleValue,
        isDisabled: isDisabled
      }), this.formatOptionLabel(singleValue, 'value'));
    }
  }, {
    key: "renderClearIndicator",
    value: function renderClearIndicator() {
      var _this$getComponents3 = this.getComponents(),
        ClearIndicator = _this$getComponents3.ClearIndicator;
      var commonProps = this.commonProps;
      var _this$props10 = this.props,
        isDisabled = _this$props10.isDisabled,
        isLoading = _this$props10.isLoading;
      var isFocused = this.state.isFocused;
      if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
        return null;
      }
      var innerProps = {
        onMouseDown: this.onClearIndicatorMouseDown,
        onTouchEnd: this.onClearIndicatorTouchEnd,
        'aria-hidden': 'true'
      };
      return /*#__PURE__*/React__namespace.createElement(ClearIndicator, _extends({}, commonProps, {
        innerProps: innerProps,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderLoadingIndicator",
    value: function renderLoadingIndicator() {
      var _this$getComponents4 = this.getComponents(),
        LoadingIndicator = _this$getComponents4.LoadingIndicator;
      var commonProps = this.commonProps;
      var _this$props11 = this.props,
        isDisabled = _this$props11.isDisabled,
        isLoading = _this$props11.isLoading;
      var isFocused = this.state.isFocused;
      if (!LoadingIndicator || !isLoading) return null;
      var innerProps = {
        'aria-hidden': 'true'
      };
      return /*#__PURE__*/React__namespace.createElement(LoadingIndicator, _extends({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderIndicatorSeparator",
    value: function renderIndicatorSeparator() {
      var _this$getComponents5 = this.getComponents(),
        DropdownIndicator = _this$getComponents5.DropdownIndicator,
        IndicatorSeparator = _this$getComponents5.IndicatorSeparator;

      // separator doesn't make sense without the dropdown indicator
      if (!DropdownIndicator || !IndicatorSeparator) return null;
      var commonProps = this.commonProps;
      var isDisabled = this.props.isDisabled;
      var isFocused = this.state.isFocused;
      return /*#__PURE__*/React__namespace.createElement(IndicatorSeparator, _extends({}, commonProps, {
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderDropdownIndicator",
    value: function renderDropdownIndicator() {
      var _this$getComponents6 = this.getComponents(),
        DropdownIndicator = _this$getComponents6.DropdownIndicator;
      if (!DropdownIndicator) return null;
      var commonProps = this.commonProps;
      var isDisabled = this.props.isDisabled;
      var isFocused = this.state.isFocused;
      var innerProps = {
        onMouseDown: this.onDropdownIndicatorMouseDown,
        onTouchEnd: this.onDropdownIndicatorTouchEnd,
        'aria-hidden': 'true'
      };
      return /*#__PURE__*/React__namespace.createElement(DropdownIndicator, _extends({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this4 = this;
      var _this$getComponents7 = this.getComponents(),
        Group = _this$getComponents7.Group,
        GroupHeading = _this$getComponents7.GroupHeading,
        Menu = _this$getComponents7.Menu,
        MenuList = _this$getComponents7.MenuList,
        MenuPortal = _this$getComponents7.MenuPortal,
        LoadingMessage = _this$getComponents7.LoadingMessage,
        NoOptionsMessage = _this$getComponents7.NoOptionsMessage,
        Option = _this$getComponents7.Option;
      var commonProps = this.commonProps;
      var focusedOption = this.state.focusedOption;
      var _this$props12 = this.props,
        captureMenuScroll = _this$props12.captureMenuScroll,
        inputValue = _this$props12.inputValue,
        isLoading = _this$props12.isLoading,
        loadingMessage = _this$props12.loadingMessage,
        minMenuHeight = _this$props12.minMenuHeight,
        maxMenuHeight = _this$props12.maxMenuHeight,
        menuIsOpen = _this$props12.menuIsOpen,
        menuPlacement = _this$props12.menuPlacement,
        menuPosition = _this$props12.menuPosition,
        menuPortalTarget = _this$props12.menuPortalTarget,
        menuShouldBlockScroll = _this$props12.menuShouldBlockScroll,
        menuShouldScrollIntoView = _this$props12.menuShouldScrollIntoView,
        noOptionsMessage = _this$props12.noOptionsMessage,
        onMenuScrollToTop = _this$props12.onMenuScrollToTop,
        onMenuScrollToBottom = _this$props12.onMenuScrollToBottom;
      if (!menuIsOpen) return null;

      // TODO: Internal Option Type here
      var render = function render(props, id) {
        var type = props.type,
          data = props.data,
          isDisabled = props.isDisabled,
          isSelected = props.isSelected,
          label = props.label,
          value = props.value;
        var isFocused = focusedOption === data;
        var onHover = isDisabled ? undefined : function () {
          return _this4.onOptionHover(data);
        };
        var onSelect = isDisabled ? undefined : function () {
          return _this4.selectOption(data);
        };
        var optionId = "".concat(_this4.getElementId('option'), "-").concat(id);
        var innerProps = {
          id: optionId,
          onClick: onSelect,
          onMouseMove: onHover,
          onMouseOver: onHover,
          tabIndex: -1
        };
        return /*#__PURE__*/React__namespace.createElement(Option, _extends({}, commonProps, {
          innerProps: innerProps,
          data: data,
          isDisabled: isDisabled,
          isSelected: isSelected,
          key: optionId,
          label: label,
          type: type,
          value: value,
          isFocused: isFocused,
          innerRef: isFocused ? _this4.getFocusedOptionRef : undefined
        }), _this4.formatOptionLabel(props.data, 'menu'));
      };
      var menuUI;
      if (this.hasOptions()) {
        menuUI = this.getCategorizedOptions().map(function (item) {
          if (item.type === 'group') {
            var _data = item.data,
              options = item.options,
              groupIndex = item.index;
            var groupId = "".concat(_this4.getElementId('group'), "-").concat(groupIndex);
            var headingId = "".concat(groupId, "-heading");
            return /*#__PURE__*/React__namespace.createElement(Group, _extends({}, commonProps, {
              key: groupId,
              data: _data,
              options: options,
              Heading: GroupHeading,
              headingProps: {
                id: headingId,
                data: item.data
              },
              label: _this4.formatGroupLabel(item.data)
            }), item.options.map(function (option) {
              return render(option, "".concat(groupIndex, "-").concat(option.index));
            }));
          } else if (item.type === 'option') {
            return render(item, "".concat(item.index));
          }
        });
      } else if (isLoading) {
        var message = loadingMessage({
          inputValue: inputValue
        });
        if (message === null) return null;
        menuUI = /*#__PURE__*/React__namespace.createElement(LoadingMessage, commonProps, message);
      } else {
        var _message = noOptionsMessage({
          inputValue: inputValue
        });
        if (_message === null) return null;
        menuUI = /*#__PURE__*/React__namespace.createElement(NoOptionsMessage, commonProps, _message);
      }
      var menuPlacementProps = {
        minMenuHeight: minMenuHeight,
        maxMenuHeight: maxMenuHeight,
        menuPlacement: menuPlacement,
        menuPosition: menuPosition,
        menuShouldScrollIntoView: menuShouldScrollIntoView
      };
      var menuElement = /*#__PURE__*/React__namespace.createElement(MenuPlacer, _extends({}, commonProps, menuPlacementProps), function (_ref4) {
        var ref = _ref4.ref,
          _ref4$placerProps = _ref4.placerProps,
          placement = _ref4$placerProps.placement,
          maxHeight = _ref4$placerProps.maxHeight;
        return /*#__PURE__*/React__namespace.createElement(Menu, _extends({}, commonProps, menuPlacementProps, {
          innerRef: ref,
          innerProps: {
            onMouseDown: _this4.onMenuMouseDown,
            onMouseMove: _this4.onMenuMouseMove,
            id: _this4.getElementId('listbox')
          },
          isLoading: isLoading,
          placement: placement
        }), /*#__PURE__*/React__namespace.createElement(ScrollManager, {
          captureEnabled: captureMenuScroll,
          onTopArrive: onMenuScrollToTop,
          onBottomArrive: onMenuScrollToBottom,
          lockEnabled: menuShouldBlockScroll
        }, function (scrollTargetRef) {
          return /*#__PURE__*/React__namespace.createElement(MenuList, _extends({}, commonProps, {
            innerRef: function innerRef(instance) {
              _this4.getMenuListRef(instance);
              scrollTargetRef(instance);
            },
            isLoading: isLoading,
            maxHeight: maxHeight,
            focusedOption: focusedOption
          }), menuUI);
        }));
      });

      // positioning behaviour is almost identical for portalled and fixed,
      // so we use the same component. the actual portalling logic is forked
      // within the component based on `menuPosition`
      return menuPortalTarget || menuPosition === 'fixed' ? /*#__PURE__*/React__namespace.createElement(MenuPortal, _extends({}, commonProps, {
        appendTo: menuPortalTarget,
        controlElement: this.controlRef,
        menuPlacement: menuPlacement,
        menuPosition: menuPosition
      }), menuElement) : menuElement;
    }
  }, {
    key: "renderFormField",
    value: function renderFormField() {
      var _this5 = this;
      var _this$props13 = this.props,
        delimiter = _this$props13.delimiter,
        isDisabled = _this$props13.isDisabled,
        isMulti = _this$props13.isMulti,
        name = _this$props13.name,
        required = _this$props13.required;
      var selectValue = this.state.selectValue;
      if (required && !this.hasValue() && !isDisabled) {
        return /*#__PURE__*/React__namespace.createElement(RequiredInput$1, {
          name: name,
          onFocus: this.onValueInputFocus
        });
      }
      if (!name || isDisabled) return;
      if (isMulti) {
        if (delimiter) {
          var value = selectValue.map(function (opt) {
            return _this5.getOptionValue(opt);
          }).join(delimiter);
          return /*#__PURE__*/React__namespace.createElement("input", {
            name: name,
            type: "hidden",
            value: value
          });
        } else {
          var input = selectValue.length > 0 ? selectValue.map(function (opt, i) {
            return /*#__PURE__*/React__namespace.createElement("input", {
              key: "i-".concat(i),
              name: name,
              type: "hidden",
              value: _this5.getOptionValue(opt)
            });
          }) : /*#__PURE__*/React__namespace.createElement("input", {
            name: name,
            type: "hidden",
            value: ""
          });
          return /*#__PURE__*/React__namespace.createElement("div", null, input);
        }
      } else {
        var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';
        return /*#__PURE__*/React__namespace.createElement("input", {
          name: name,
          type: "hidden",
          value: _value
        });
      }
    }
  }, {
    key: "renderLiveRegion",
    value: function renderLiveRegion() {
      var commonProps = this.commonProps;
      var _this$state6 = this.state,
        ariaSelection = _this$state6.ariaSelection,
        focusedOption = _this$state6.focusedOption,
        focusedValue = _this$state6.focusedValue,
        isFocused = _this$state6.isFocused,
        selectValue = _this$state6.selectValue;
      var focusableOptions = this.getFocusableOptions();
      return /*#__PURE__*/React__namespace.createElement(LiveRegion$1, _extends({}, commonProps, {
        id: this.getElementId('live-region'),
        ariaSelection: ariaSelection,
        focusedOption: focusedOption,
        focusedValue: focusedValue,
        isFocused: isFocused,
        selectValue: selectValue,
        focusableOptions: focusableOptions
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$getComponents8 = this.getComponents(),
        Control = _this$getComponents8.Control,
        IndicatorsContainer = _this$getComponents8.IndicatorsContainer,
        SelectContainer = _this$getComponents8.SelectContainer,
        ValueContainer = _this$getComponents8.ValueContainer;
      var _this$props14 = this.props,
        className = _this$props14.className,
        id = _this$props14.id,
        isDisabled = _this$props14.isDisabled,
        menuIsOpen = _this$props14.menuIsOpen;
      var isFocused = this.state.isFocused;
      var commonProps = this.commonProps = this.getCommonProps();
      return /*#__PURE__*/React__namespace.createElement(SelectContainer, _extends({}, commonProps, {
        className: className,
        innerProps: {
          id: id,
          onKeyDown: this.onKeyDown
        },
        isDisabled: isDisabled,
        isFocused: isFocused
      }), this.renderLiveRegion(), /*#__PURE__*/React__namespace.createElement(Control, _extends({}, commonProps, {
        innerRef: this.getControlRef,
        innerProps: {
          onMouseDown: this.onControlMouseDown,
          onTouchEnd: this.onControlTouchEnd
        },
        isDisabled: isDisabled,
        isFocused: isFocused,
        menuIsOpen: menuIsOpen
      }), /*#__PURE__*/React__namespace.createElement(ValueContainer, _extends({}, commonProps, {
        isDisabled: isDisabled
      }), this.renderPlaceholderOrValue(), this.renderInput()), /*#__PURE__*/React__namespace.createElement(IndicatorsContainer, _extends({}, commonProps, {
        isDisabled: isDisabled
      }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var prevProps = state.prevProps,
        clearFocusValueOnUpdate = state.clearFocusValueOnUpdate,
        inputIsHiddenAfterUpdate = state.inputIsHiddenAfterUpdate,
        ariaSelection = state.ariaSelection,
        isFocused = state.isFocused,
        prevWasFocused = state.prevWasFocused;
      var options = props.options,
        value = props.value,
        menuIsOpen = props.menuIsOpen,
        inputValue = props.inputValue,
        isMulti = props.isMulti;
      var selectValue = cleanValue(value);
      var newMenuOptionsState = {};
      if (prevProps && (value !== prevProps.value || options !== prevProps.options || menuIsOpen !== prevProps.menuIsOpen || inputValue !== prevProps.inputValue)) {
        var focusableOptions = menuIsOpen ? buildFocusableOptions(props, selectValue) : [];
        var focusedValue = clearFocusValueOnUpdate ? getNextFocusedValue(state, selectValue) : null;
        var focusedOption = getNextFocusedOption(state, focusableOptions);
        newMenuOptionsState = {
          selectValue: selectValue,
          focusedOption: focusedOption,
          focusedValue: focusedValue,
          clearFocusValueOnUpdate: false
        };
      }
      // some updates should toggle the state of the input visibility
      var newInputIsHiddenState = inputIsHiddenAfterUpdate != null && props !== prevProps ? {
        inputIsHidden: inputIsHiddenAfterUpdate,
        inputIsHiddenAfterUpdate: undefined
      } : {};
      var newAriaSelection = ariaSelection;
      var hasKeptFocus = isFocused && prevWasFocused;
      if (isFocused && !hasKeptFocus) {
        // If `value` or `defaultValue` props are not empty then announce them
        // when the Select is initially focused
        newAriaSelection = {
          value: valueTernary(isMulti, selectValue, selectValue[0] || null),
          options: selectValue,
          action: 'initial-input-focus'
        };
        hasKeptFocus = !prevWasFocused;
      }

      // If the 'initial-input-focus' action has been set already
      // then reset the ariaSelection to null
      if ((ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus') {
        newAriaSelection = null;
      }
      return _objectSpread2(_objectSpread2(_objectSpread2({}, newMenuOptionsState), newInputIsHiddenState), {}, {
        prevProps: props,
        ariaSelection: newAriaSelection,
        prevWasFocused: hasKeptFocus
      });
    }
  }]);
  return Select;
}(React.Component);
Select.defaultProps = defaultProps;

var _excluded$1 = ["defaultInputValue", "defaultMenuIsOpen", "defaultValue", "inputValue", "menuIsOpen", "onChange", "onInputChange", "onMenuClose", "onMenuOpen", "value"];
function useStateManager(_ref) {
  var _ref$defaultInputValu = _ref.defaultInputValue,
    defaultInputValue = _ref$defaultInputValu === void 0 ? '' : _ref$defaultInputValu,
    _ref$defaultMenuIsOpe = _ref.defaultMenuIsOpen,
    defaultMenuIsOpen = _ref$defaultMenuIsOpe === void 0 ? false : _ref$defaultMenuIsOpe,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue,
    propsInputValue = _ref.inputValue,
    propsMenuIsOpen = _ref.menuIsOpen,
    propsOnChange = _ref.onChange,
    propsOnInputChange = _ref.onInputChange,
    propsOnMenuClose = _ref.onMenuClose,
    propsOnMenuOpen = _ref.onMenuOpen,
    propsValue = _ref.value,
    restSelectProps = _objectWithoutProperties(_ref, _excluded$1);
  var _useState = React.useState(propsInputValue !== undefined ? propsInputValue : defaultInputValue),
    _useState2 = _slicedToArray(_useState, 2),
    stateInputValue = _useState2[0],
    setStateInputValue = _useState2[1];
  var _useState3 = React.useState(propsMenuIsOpen !== undefined ? propsMenuIsOpen : defaultMenuIsOpen),
    _useState4 = _slicedToArray(_useState3, 2),
    stateMenuIsOpen = _useState4[0],
    setStateMenuIsOpen = _useState4[1];
  var _useState5 = React.useState(propsValue !== undefined ? propsValue : defaultValue),
    _useState6 = _slicedToArray(_useState5, 2),
    stateValue = _useState6[0],
    setStateValue = _useState6[1];
  var onChange = React.useCallback(function (value, actionMeta) {
    if (typeof propsOnChange === 'function') {
      propsOnChange(value, actionMeta);
    }
    setStateValue(value);
  }, [propsOnChange]);
  var onInputChange = React.useCallback(function (value, actionMeta) {
    var newValue;
    if (typeof propsOnInputChange === 'function') {
      newValue = propsOnInputChange(value, actionMeta);
    }
    setStateInputValue(newValue !== undefined ? newValue : value);
  }, [propsOnInputChange]);
  var onMenuOpen = React.useCallback(function () {
    if (typeof propsOnMenuOpen === 'function') {
      propsOnMenuOpen();
    }
    setStateMenuIsOpen(true);
  }, [propsOnMenuOpen]);
  var onMenuClose = React.useCallback(function () {
    if (typeof propsOnMenuClose === 'function') {
      propsOnMenuClose();
    }
    setStateMenuIsOpen(false);
  }, [propsOnMenuClose]);
  var inputValue = propsInputValue !== undefined ? propsInputValue : stateInputValue;
  var menuIsOpen = propsMenuIsOpen !== undefined ? propsMenuIsOpen : stateMenuIsOpen;
  var value = propsValue !== undefined ? propsValue : stateValue;
  return _objectSpread2(_objectSpread2({}, restSelectProps), {}, {
    inputValue: inputValue,
    menuIsOpen: menuIsOpen,
    onChange: onChange,
    onInputChange: onInputChange,
    onMenuClose: onMenuClose,
    onMenuOpen: onMenuOpen,
    value: value
  });
}

var _excluded = ["allowCreateWhileLoading", "createOptionPosition", "formatCreateLabel", "isValidNewOption", "getNewOptionData", "onCreateOption", "options", "onChange"];
var compareOption = function compareOption() {
  var inputValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var option = arguments.length > 1 ? arguments[1] : undefined;
  var accessors = arguments.length > 2 ? arguments[2] : undefined;
  var candidate = String(inputValue).toLowerCase();
  var optionValue = String(accessors.getOptionValue(option)).toLowerCase();
  var optionLabel = String(accessors.getOptionLabel(option)).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};
var builtins = {
  formatCreateLabel: function formatCreateLabel(inputValue) {
    return "Create \"".concat(inputValue, "\"");
  },
  isValidNewOption: function isValidNewOption(inputValue, selectValue, selectOptions, accessors) {
    return !(!inputValue || selectValue.some(function (option) {
      return compareOption(inputValue, option, accessors);
    }) || selectOptions.some(function (option) {
      return compareOption(inputValue, option, accessors);
    }));
  },
  getNewOptionData: function getNewOptionData(inputValue, optionLabel) {
    return {
      label: optionLabel,
      value: inputValue,
      __isNew__: true
    };
  }
};
function useCreatable(_ref) {
  var _ref$allowCreateWhile = _ref.allowCreateWhileLoading,
    allowCreateWhileLoading = _ref$allowCreateWhile === void 0 ? false : _ref$allowCreateWhile,
    _ref$createOptionPosi = _ref.createOptionPosition,
    createOptionPosition = _ref$createOptionPosi === void 0 ? 'last' : _ref$createOptionPosi,
    _ref$formatCreateLabe = _ref.formatCreateLabel,
    formatCreateLabel = _ref$formatCreateLabe === void 0 ? builtins.formatCreateLabel : _ref$formatCreateLabe,
    _ref$isValidNewOption = _ref.isValidNewOption,
    isValidNewOption = _ref$isValidNewOption === void 0 ? builtins.isValidNewOption : _ref$isValidNewOption,
    _ref$getNewOptionData = _ref.getNewOptionData,
    getNewOptionData = _ref$getNewOptionData === void 0 ? builtins.getNewOptionData : _ref$getNewOptionData,
    onCreateOption = _ref.onCreateOption,
    _ref$options = _ref.options,
    propsOptions = _ref$options === void 0 ? [] : _ref$options,
    propsOnChange = _ref.onChange,
    restSelectProps = _objectWithoutProperties(_ref, _excluded);
  var _restSelectProps$getO = restSelectProps.getOptionValue,
    getOptionValue$1$1 = _restSelectProps$getO === void 0 ? getOptionValue$1 : _restSelectProps$getO,
    _restSelectProps$getO2 = restSelectProps.getOptionLabel,
    getOptionLabel$1$1 = _restSelectProps$getO2 === void 0 ? getOptionLabel$1 : _restSelectProps$getO2,
    inputValue = restSelectProps.inputValue,
    isLoading = restSelectProps.isLoading,
    isMulti = restSelectProps.isMulti,
    value = restSelectProps.value,
    name = restSelectProps.name;
  var newOption = React.useMemo(function () {
    return isValidNewOption(inputValue, cleanValue(value), propsOptions, {
      getOptionValue: getOptionValue$1$1,
      getOptionLabel: getOptionLabel$1$1
    }) ? getNewOptionData(inputValue, formatCreateLabel(inputValue)) : undefined;
  }, [formatCreateLabel, getNewOptionData, getOptionLabel$1$1, getOptionValue$1$1, inputValue, isValidNewOption, propsOptions, value]);
  var options = React.useMemo(function () {
    return (allowCreateWhileLoading || !isLoading) && newOption ? createOptionPosition === 'first' ? [newOption].concat(_toConsumableArray(propsOptions)) : [].concat(_toConsumableArray(propsOptions), [newOption]) : propsOptions;
  }, [allowCreateWhileLoading, createOptionPosition, isLoading, newOption, propsOptions]);
  var onChange = React.useCallback(function (newValue, actionMeta) {
    if (actionMeta.action !== 'select-option') {
      return propsOnChange(newValue, actionMeta);
    }
    var valueArray = Array.isArray(newValue) ? newValue : [newValue];
    if (valueArray[valueArray.length - 1] === newOption) {
      if (onCreateOption) onCreateOption(inputValue);else {
        var newOptionData = getNewOptionData(inputValue, inputValue);
        var newActionMeta = {
          action: 'create-option',
          name: name,
          option: newOptionData
        };
        propsOnChange(valueTernary(isMulti, [].concat(_toConsumableArray(cleanValue(value)), [newOptionData]), newOptionData), newActionMeta);
      }
      return;
    }
    propsOnChange(newValue, actionMeta);
  }, [getNewOptionData, inputValue, isMulti, name, newOption, onCreateOption, propsOnChange, value]);
  return _objectSpread2(_objectSpread2({}, restSelectProps), {}, {
    options: options,
    onChange: onChange
  });
}

var CreatableSelect = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var creatableProps = useStateManager(props);
  var selectProps = useCreatable(creatableProps);
  return /*#__PURE__*/React__namespace.createElement(Select, _extends({
    ref: ref
  }, selectProps));
});
var CreatableSelect$1 = CreatableSelect;

/**
 * Multiselect component that allows the user to type in values and add them to
 *   the multiselect component
 * @author Yuen Ler Chow
 * @author Gabe Abrams
 */
/* ------------- Actions ------------ */
// Types of actions
var ActionType$5;
(function (ActionType) {
    // Update the input value
    ActionType["SetInputValue"] = "SetInputValue";
})(ActionType$5 || (ActionType$5 = {}));
/**
 * Reducer that executes actions
 * @author Yuen Ler Chow
 * @param state current state
 * @param action action to execute
 * @returns updated state
 */
const reducer$6 = (state, action) => {
    switch (action.type) {
        case ActionType$5.SetInputValue: {
            return Object.assign(Object.assign({}, state), { inputValue: action.value });
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/
const CreatableMultiselect = (props) => {
    // Destructure all props
    const { type, values, onChange, disabled, } = props;
    /* -------------- State ------------- */
    // Initial state
    const initialState = {
        inputValue: '',
    };
    // Initialize state
    const [state, dispatch] = React.useReducer(reducer$6, initialState);
    // Destructure common state
    const { inputValue } = state;
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Creates an option for the multiselect component
     * @author Yuen Ler Chow
     * @param label label of the option
     * @returns the new option
     */
    const createOption = (label) => {
        // set the value to the label without special characters and spaces, and lowercase
        return {
            label,
            value: (label
                // Make lowercase
                .toLowerCase()
                // Replace special characters with nothing
                .replace(/\W/g, '')
                // Replace spaces with dashes
                .replace(' ', '-')),
        };
    };
    /**
     * Adds the values to the multiselect component
     * @author Yuen Ler Chow
     * @param newValue new value to add
     */
    const addValues = (newValue) => {
        if (type === DBEntryFieldType$1.NumberArray) {
            const newValues = (newValue
                // Split into items
                .split(',')
                // Trim strings
                .map((val) => {
                return val.trim();
            })
                // Filter zero length
                .filter((trimmedVal) => {
                return trimmedVal.length > 0;
            })
                // Parse to number
                .map(Number.parseFloat)
                // Filter out existing values
                .filter((numberVal) => {
                return !values.some((value) => {
                    return value === numberVal;
                });
            }));
            // Notify parent of new values
            onChange([...values, ...newValues]);
        }
        else {
            const newValues = (newValue
                // Split into items
                .split(',')
                // Trim strings
                .map((val) => {
                return val.trim();
            })
                // Filter zero length
                .filter((trimmedVal) => {
                return (trimmedVal.length > 0);
            })
                // Filter out existing values
                .filter((val) => {
                return !values.some((value) => {
                    return value === val;
                });
            }));
            // Notify parent of new values
            onChange([...values, ...newValues]);
        }
        // Reset text field to empty because the values have been added
        dispatch({
            type: ActionType$5.SetInputValue,
            value: '',
        });
    };
    /**
     * Adds the values to the multiselect component when enter or tab is pressed
     * @author Yuen Ler Chow
     * @param event keyboard event
     */
    const handleKeyDown = (event) => {
        // Skip if no input value
        if (!inputValue) {
            return;
        }
        // Add values if enter or tab is pressed
        if (['Enter', 'Tab'].includes(event.key)) {
            event.preventDefault();
            addValues(inputValue);
        }
    };
    /**
     * Handles the input change of the multiselect component
     * @author Yuen Ler Chow
     * @param input input value
     */
    const handleInputChange = (input) => {
        // Create copy of input value so we can modify it
        let newValue = input;
        // Don't allow user to type in non numbers
        if (type === DBEntryFieldType$1.NumberArray) {
            newValue = input.replace(/[^0-9,]/g, '');
        }
        if (input.includes(',')) {
            // if the input has a comma, add the values separated by commas
            addValues(newValue);
        }
        else {
            // simply update the input value to the new input value
            dispatch({
                type: ActionType$5.SetInputValue,
                value: newValue,
            });
        }
    };
    /**
     * Handles the value change of the multiselect component
     * @author Yuen Ler Chow
     * @param newValue new values
     */
    const handleValueChange = (newValues) => {
        // Skip if no new values
        if (!newValues) {
            return;
        }
        // Update values based on type
        if (type === DBEntryFieldType$1.NumberArray) {
            const numberValues = newValues.map((val) => {
                return Number.parseFloat(val.value);
            });
            onChange(numberValues);
        }
        else {
            const stringValues = newValues.map((val) => {
                return val.value;
            });
            onChange(stringValues);
        }
    };
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement(CreatableSelect$1, { isDisabled: !!disabled, components: { DropdownIndicator: null }, inputValue: inputValue, isClearable: true, isMulti: true, menuIsOpen: false, onChange: handleValueChange, onInputChange: handleInputChange, onKeyDown: handleKeyDown, placeholder: "Type/paste value and press enter...", value: values.map((val) => {
            return createOption(String(val));
        }) }));
};

/**
 * Panel for adding a DBEntry to the database
 * @author Yuen Ler Chow
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$1 = `
  .AddOrEditDBEntry-input-label {
    min-width: 7rem;
  }
`;
/* ------------- Actions ------------ */
// Types of actions
var ActionType$4;
(function (ActionType) {
    // Update the DBEntry
    ActionType["UpdateDBEntry"] = "UpdateDBEntry";
    // Start the save spinner
    ActionType["StartSave"] = "StartSave";
})(ActionType$4 || (ActionType$4 = {}));
/**
 * Reducer that executes actions
 * @author Yuen Ler Chow
 * @param state current state
 * @param action action to execute
 * @returns updated state
 */
const reducer$5 = (state, action) => {
    switch (action.type) {
        case ActionType$4.UpdateDBEntry: {
            return Object.assign(Object.assign({}, state), { entry: action.dbEntry });
        }
        case ActionType$4.StartSave: {
            return Object.assign(Object.assign({}, state), { saving: true });
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const AddOrEditDBEntry = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { onFinished, entryFields, dbEntryToEdit, validateEntry, modifyEntry, idPropName, saveEndpointPath, entries, itemName, } = props;
    /* -------------- State ------------- */
    // Initial state
    const initialState = {
        entry: dbEntryToEdit || {},
        saving: false,
    };
    // Initialize state
    const [state, dispatch] = React.useReducer(reducer$5, initialState);
    // Destructure common state
    const { entry, saving, } = state;
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Save changes to the DBEntry and then finish
     * @author Yuen Ler Chow
     */
    const save = () => __awaiter(void 0, void 0, void 0, function* () {
        // Start the save loading indicator
        dispatch({ type: ActionType$4.StartSave });
        // add all default values to the entry
        entryFields.forEach((field) => {
            if (field.defaultValue && !entry[field.objectKey]) {
                entry[field.objectKey] = field.defaultValue;
            }
        });
        // Modify entry if needed
        const modifiedEntry = (modifyEntry
            ? yield modifyEntry(entry)
            : entry);
        // add id key to entry so that when we delete the item, the key will always be "id"
        modifiedEntry.id = modifiedEntry[idPropName];
        // Send to server
        try {
            yield visitServerEndpoint({
                path: saveEndpointPath,
                method: 'POST',
                params: {
                    item: JSON.stringify(modifiedEntry),
                },
            });
            // Finish
            onFinished(entry);
        }
        catch (err) {
            return showFatalError(err);
        }
    });
    /**
     * Cancel and return without saving
     * @author Gabe Abrams
     */
    const cancel = () => {
        onFinished(undefined);
    };
    /**
     * Create validation error message for the DBEntry
     * @author Yuen Ler Chow
     * @param fields the fields to validate
     * @returns the validation error message, or an empty string if no error
     */
    const validate = (fields) => {
        let validationError = '';
        for (let i = 0; i < fields.length; i += 1) {
            const field = fields[i];
            const value = entry[field.objectKey];
            // Check if required field is empty. Field is automatically required if
            // it is the idPropName
            if ((field.required || (field.objectKey === idPropName)) && !value) {
                validationError = `Please fill in the ${field.label} field`;
                return validationError;
            }
            // Check if unique field is unique
            if (field.objectKey === idPropName && !dbEntryToEdit) {
                const notUnique = entries.find((e) => {
                    return e[idPropName] === value;
                });
                if (notUnique) {
                    validationError = `An item with the ${field.label} ${value} already exists. ${field.label} must be unique.`;
                    return validationError;
                }
            }
            // If they have entered a value for the field, check if it is valid
            if (value || field.type === DBEntryFieldType$1.Object) {
                // String validation
                if (field.type === DBEntryFieldType$1.String) {
                    if (
                    // Minimum length requirement is defined
                    field.minNumChars
                        // Value is too short
                        && value.length < field.minNumChars) {
                        validationError = `${field.label} must be at least ${field.minNumChars} character${field.minNumChars === 1 ? '' : 's'} long`;
                    }
                    else if (
                    // Maximum length requirement is defined
                    field.maxNumChars
                        // Value is too long
                        && value.length > field.maxNumChars) {
                        validationError = `${field.label} must be at most ${field.maxNumChars} character${field.maxNumChars === 1 ? '' : 's'} long`;
                    }
                    // Number validation
                }
                else if (field.type === DBEntryFieldType$1.Number) {
                    if (
                    // Minimum value requirement is defined
                    field.minNumber
                        // Value is too small
                        && value < field.minNumber) {
                        validationError = `${field.label} must be at least ${field.minNumber}`;
                    }
                    else if (
                    // Maximum value requirement is defined
                    field.maxNumber
                        // Value is too large
                        && value > field.maxNumber) {
                        validationError = `${field.label} must be at most ${field.maxNumber}`;
                    }
                }
                else if (field.type === DBEntryFieldType$1.StringArray
                    || field.type === DBEntryFieldType$1.NumberArray) {
                    // String and Number Array validation
                    if (
                    // Minimum number of elements requirement is defined
                    field.minNumElements
                        // Value has too few elements
                        && value.length < field.minNumElements) {
                        validationError = `${field.label} must have at least ${field.minNumElements} value${field.minNumElements === 1 ? '' : 's'}`;
                    }
                    else if (
                    // Maximum number of elements requirement is defined
                    field.maxNumElements
                        // Value has too many elements
                        && value.length > field.maxNumElements) {
                        validationError = `${field.label} must have at most ${field.maxNumElements} value${field.maxNumElements === 1 ? '' : 's'}`;
                    }
                    else if (field.type === DBEntryFieldType$1.NumberArray) {
                        // Number Array validation
                        for (let j = 0; j < value.length; j += 1) {
                            if (
                            // Minimum value requirement is defined
                            field.minNumber
                                // Value is too small
                                && value[j] < field.minNumber) {
                                validationError = `${field.label} values must be at least ${field.minNumber}`;
                                return validationError;
                            }
                            if (
                            // Maximum value requirement is defined
                            field.maxNumber
                                // Value is too large
                                && value[j] > field.maxNumber) {
                                validationError = `${field.label} values must be at most ${field.maxNumber}`;
                                return validationError;
                            }
                        }
                    }
                }
                else if (field.type === DBEntryFieldType$1.Object) {
                    validationError = validate(field.subfields);
                }
            }
            if (validationError) {
                return validationError;
            }
        }
        return validationError;
    };
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* ---------------- Views --------------- */
    /*----------------------------------------*/
    // Body
    let body;
    /* ------------- Loading ------------ */
    if (saving) {
        body = (React__default["default"].createElement(LoadingSpinner, null));
    }
    /* -------------- Form -------------- */
    // If not saving, validate what the user has entered
    if (!saving) {
        // Validation error if there is one
        const validationError = validate(entryFields);
        /**
         * Render a single entry field
         * @author Yuen Ler Chow
         * @param field the entry field to render
         * @param disabled true if the field should be disabled
         * @returns rendered entry field
         */
        const renderEntryField = (field, disabled) => {
            if (field.type === DBEntryFieldType$1.String) {
                if (field.choices) {
                    return (React__default["default"].createElement("div", { key: field.objectKey, className: "mb-2" },
                        React__default["default"].createElement("div", { className: "input-group", style: {
                                pointerEvents: (disabled ? 'none' : 'auto'),
                            } },
                            React__default["default"].createElement(ButtonInputGroup, { label: field.label }, field.choices.map((choice) => {
                                return (React__default["default"].createElement(RadioButton, { key: choice.value, text: choice.title, selected: entry[field.objectKey] === choice.value, onSelected: () => {
                                        entry[field.objectKey] = choice.value;
                                        dispatch({
                                            type: ActionType$4.UpdateDBEntry,
                                            dbEntry: entry,
                                        });
                                    }, ariaLabel: choice.title }));
                            })))));
                }
                return (React__default["default"].createElement("div", { className: "mb-2", key: field.objectKey },
                    React__default["default"].createElement("div", { className: "input-group" },
                        React__default["default"].createElement("span", { className: "AddOrEditDBEntry-input-label input-group-text" }, field.label),
                        React__default["default"].createElement("input", { disabled: disabled, type: "text", className: "form-control", placeholder: field.placeholder, "aria-describedby": "AddOrEditDBEntry-form-name-label", value: entry[field.objectKey] || '', onChange: (e) => {
                                entry[field.objectKey] = (e.target.value);
                                dispatch({
                                    type: ActionType$4.UpdateDBEntry,
                                    dbEntry: entry,
                                });
                            } }))));
            }
            if (field.type === DBEntryFieldType$1.Number) {
                return (React__default["default"].createElement("div", { key: field.objectKey, className: "mb-2" },
                    React__default["default"].createElement("div", { className: "input-group" },
                        React__default["default"].createElement("span", { className: "AddOrEditDBEntry-input-label input-group-text" }, field.label),
                        React__default["default"].createElement("input", { type: "text", className: "form-control", placeholder: field.placeholder, "aria-describedby": "AddOrEditDBEntry-form-name-label", value: entry[field.objectKey] || '', disabled: disabled, onChange: (e) => {
                                entry[field.objectKey] = (e.target.value
                                    .replace(/[^0-9]/g, ''));
                                dispatch({
                                    type: ActionType$4.UpdateDBEntry,
                                    dbEntry: entry,
                                });
                            } }))));
            }
            if (field.type === DBEntryFieldType$1.StringArray) {
                if (field.choices) {
                    return (React__default["default"].createElement("div", { key: field.objectKey, className: "mb-2" },
                        React__default["default"].createElement("div", { className: "input-group", style: {
                                pointerEvents: (disabled ? 'none' : 'auto'),
                            } },
                            React__default["default"].createElement(ButtonInputGroup, { label: field.label }, field.choices.map((choice) => {
                                return (React__default["default"].createElement(CheckboxButton, { key: choice.value, text: choice.title, checked: entry[field.objectKey] && entry[field.objectKey].includes(choice.value), onChanged: (checked) => {
                                        if (checked) {
                                            // Initialize array if it doesn't exist
                                            if (!entry[field.objectKey]) {
                                                entry[field.objectKey] = [];
                                            }
                                            // Add value to array
                                            entry[field.objectKey].push(choice.value);
                                        }
                                        else {
                                            // Remove value from array
                                            entry[field.objectKey] = (entry[field.objectKey]
                                                .filter((val) => {
                                                return val !== choice.value;
                                            }));
                                        }
                                        // Save
                                        dispatch({
                                            type: ActionType$4.UpdateDBEntry,
                                            dbEntry: entry,
                                        });
                                    }, ariaLabel: choice.title }));
                            })))));
                }
                // Flexible (no specific choices for this field)
                return (React__default["default"].createElement("div", { key: field.objectKey, className: "mb-2" },
                    React__default["default"].createElement("div", { className: "input-group" },
                        React__default["default"].createElement("span", { className: "AddOrEditDBEntry-input-label input-group-text" }, field.label),
                        React__default["default"].createElement("div", { className: "flex-grow-1" },
                            React__default["default"].createElement(CreatableMultiselect, { disabled: disabled, type: DBEntryFieldType$1.StringArray, values: entry[field.objectKey] || [], onChange: (values) => {
                                    // Update entry and save
                                    entry[field.objectKey] = values;
                                    dispatch({
                                        type: ActionType$4.UpdateDBEntry,
                                        dbEntry: entry,
                                    });
                                } })))));
            }
            if (field.type === DBEntryFieldType$1.NumberArray) {
                return (React__default["default"].createElement("div", { key: field.objectKey, className: "mb-2" },
                    React__default["default"].createElement("div", { className: "input-group" },
                        React__default["default"].createElement("span", { className: "AddOrEditDBEntry-input-label input-group-text" }, field.label),
                        React__default["default"].createElement("div", { className: "flex-grow-1" },
                            React__default["default"].createElement(CreatableMultiselect, { disabled: disabled, type: DBEntryFieldType$1.NumberArray, values: entry[field.objectKey] || [], onChange: (values) => {
                                    entry[field.objectKey] = values;
                                    dispatch({
                                        type: ActionType$4.UpdateDBEntry,
                                        dbEntry: entry,
                                    });
                                } })))));
            }
            if (field.type === DBEntryFieldType$1.Object) {
                return (React__default["default"].createElement("div", { key: field.objectKey, className: "mb-2" },
                    React__default["default"].createElement("div", { className: "input-group" },
                        React__default["default"].createElement("span", { className: "AddOrEditDBEntry-input-label input-group-text" }, field.label),
                        React__default["default"].createElement("div", { className: "flex-grow-1 ps-2 pe-2 pt-2 pb-0 form-control" }, field.subfields.map((subfield) => {
                            return React__default["default"].createElement("div", null, renderEntryField(subfield, disabled));
                        })))));
            }
            // This should never happen
            return null;
        };
        // UI
        body = (React__default["default"].createElement("div", null,
            React__default["default"].createElement("h3", { className: "text-center" }, dbEntryToEdit ? `Edit ${itemName}` : `Create ${itemName}`),
            entryFields.map((field) => {
                const disabled = (idPropName === field.objectKey && dbEntryToEdit !== undefined)
                    || (field.lockAfterCreation !== undefined && dbEntryToEdit !== undefined);
                return renderEntryField(field, disabled);
            }),
            React__default["default"].createElement("div", { className: "text-center mt-2" },
                React__default["default"].createElement("button", { type: "button", id: "AddOrEditDBEntry-save-changes-button", className: "btn btn-primary btn-lg me-1", "aria-label": "Save changes", onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                        // Show validation errors
                        if (validationError && validationError.length > 0) {
                            return alert('Please fix the following error', validationError);
                        }
                        // Run the included validator if it exists
                        if (validateEntry) {
                            try {
                                yield validateEntry(entry);
                            }
                            catch (error) {
                                return alert('Please fix the following error', String(error));
                            }
                        }
                        save();
                    }) },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faSave, className: "me-1" }),
                    "Save"),
                React__default["default"].createElement("button", { type: "button", id: "AddOrEditDBEntry-cancel-button", className: "btn btn-secondary btn-lg", "aria-label": "save changes", onClick: cancel }, "Cancel"))));
    }
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: "alert alert-light text-black" },
        React__default["default"].createElement("style", null, style$1),
        body));
};

/**
 * Generates the endpoint path for the given collection name
 * @author Yuen Ler Chow
 * @param collectionName the name of the collection
 * @param [adminsOnly] true if the endpoint is for admins only
 * @returns the endpoint path
 */
const generateEndpointPath = (collectionName, adminsOnly) => {
    // Determine prefix based on whether the endpoint is for admins only
    const userPath = adminsOnly ? 'admin' : 'ttm';
    // Return the endpoint path
    return `/api/${userPath}/dce-reactkit/dbeditor/${collectionName}`;
};

/**
 * DB Entry Manager Panel
 * @author Yuen Ler Chow
 * @author Gabe Abrams
 */
/* ------------- Actions ------------ */
// Types of actions
var ActionType$3;
(function (ActionType) {
    // Show adder
    ActionType["ShowAdder"] = "ShowAdder";
    // Show editor
    ActionType["ShowEditor"] = "ShowEditor";
    // Finish adding
    ActionType["FinishAdd"] = "FinishAdd";
    // Finish loading
    ActionType["FinishLoading"] = "FinishLoading";
    // Start deletion process
    ActionType["StartDelete"] = "StartDelete";
    // Finish deletion process
    ActionType["FinishDelete"] = "FinishDelete";
})(ActionType$3 || (ActionType$3 = {}));
/**
 * Reducer that executes actions
 * @author Yuen Ler Chow
 * @param state current state
 * @param action action to execute
 * @returns updated state
 */
const reducer$4 = (state, action) => {
    switch (action.type) {
        case ActionType$3.FinishLoading: {
            return Object.assign(Object.assign({}, state), { loading: false, dbEntries: action.dbEntries });
        }
        case ActionType$3.ShowAdder: {
            return Object.assign(Object.assign({}, state), { adding: true, dbEntryToEdit: undefined });
        }
        case ActionType$3.ShowEditor: {
            return Object.assign(Object.assign({}, state), { adding: false, dbEntryToEdit: action.dbEntry });
        }
        case ActionType$3.FinishAdd: {
            // Handle cancel
            const finishedEntry = action.dbEntry;
            if (!finishedEntry) {
                return Object.assign(Object.assign({}, state), { adding: false, dbEntryToEdit: undefined });
            }
            // Create an updated list of DB entries
            let updatedDbEntries;
            if (state.adding) {
                updatedDbEntries = [...state.dbEntries, finishedEntry];
            }
            else {
                updatedDbEntries = state.dbEntries.map((existingDbEntry) => {
                    if (state.dbEntryToEdit && state.dbEntryToEdit[action.idPropName] === existingDbEntry[action.idPropName]) {
                        // This is the entry being edited! Replace
                        return finishedEntry;
                    }
                    // This is not the entry being edited
                    return existingDbEntry;
                });
            }
            // Update the state
            return Object.assign(Object.assign({}, state), { adding: false, dbEntryToEdit: undefined, dbEntries: updatedDbEntries });
        }
        case ActionType$3.StartDelete: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case ActionType$3.FinishDelete: {
            return Object.assign(Object.assign({}, state), { loading: false, 
                // Remove the deleted entry from the list
                dbEntries: state.dbEntries.filter((entry) => {
                    return (entry[action.idPropName] !== action.dbEntry[action.idPropName]);
                }) });
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const DBEntryManagerPanel = (props) => {
    // Destructure all props
    const { entryFields, titlePropName, descriptionPropName, idPropName, itemListTitle, itemName, validateEntry, modifyEntry, disableEdit, collectionName, adminsOnly, filterQuery, } = props;
    /* -------------- State ------------- */
    // Initial state
    const initialState = {
        dbEntries: [],
        adding: false,
        loading: true,
    };
    // Initialize state
    const [state, dispatch] = React.useReducer(reducer$4, initialState);
    // Destructure common state
    const { adding, dbEntryToEdit, dbEntries, loading, } = state;
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    // Generate the endpoint path
    const endpoint = generateEndpointPath(collectionName, adminsOnly);
    /**
     * Delete a database entry
     * @author Yuen Ler Chow
     * @param entry the database entry to delete
     */
    const deleteEntry = (entry) => __awaiter(void 0, void 0, void 0, function* () {
        // Confirm
        const confirmed = yield confirm('Remove?', `Are you sure you want to remove this ${itemName}?`, {
            confirmButtonText: 'Remove Item',
        });
        // Skip if cancelled
        if (!confirmed) {
            return;
        }
        // Remove the entry
        try {
            // Start loader
            dispatch({
                type: ActionType$3.StartDelete,
            });
            // Perform deletion
            yield visitServerEndpoint({
                path: `${endpoint}/${entry[idPropName]}`,
                method: 'DELETE',
            });
            // Finish loader
            dispatch({
                type: ActionType$3.FinishDelete,
                dbEntry: entry,
                idPropName,
            });
        }
        catch (err) {
            return showFatalError(err);
        }
    });
    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Mount
     * @author Yuen Ler Chow
     */
    React.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            // Load list of database entries
            try {
                const data = yield visitServerEndpoint({
                    path: endpoint,
                    method: 'GET',
                    params: {
                        filterQuery: JSON.stringify(filterQuery),
                    },
                });
                // Save loaded data
                dispatch({
                    type: ActionType$3.FinishLoading,
                    dbEntries: data,
                });
            }
            catch (err) {
                return showFatalError(err);
            }
        }))();
    }, []);
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* ---------------- Views --------------- */
    /*----------------------------------------*/
    let body;
    /* ------------- Loading ------------ */
    if (loading) {
        body = (React__default["default"].createElement(LoadingSpinner, null));
    }
    /* ------------- List of entries ------------ */
    if (!loading && !adding && !dbEntryToEdit) {
        // Create body
        body = (React__default["default"].createElement("div", null,
            React__default["default"].createElement(TabBox, { title: itemListTitle },
                dbEntries.map((entry) => {
                    return (React__default["default"].createElement("div", { key: entry[idPropName], className: "alert alert-secondary p-2 mb-2 d-flex align-items-center justify-content-center mb-1" },
                        React__default["default"].createElement("div", { className: "flex-grow-1" },
                            React__default["default"].createElement("h4", { className: "m-0" },
                                React__default["default"].createElement("span", { className: "fw-bold" }, entry[titlePropName]),
                                React__default["default"].createElement("span", { className: "small" },
                                    ' ',
                                    "(",
                                    entry[descriptionPropName],
                                    ")"))),
                        React__default["default"].createElement("div", { className: "d-flex align-items-center" },
                            React__default["default"].createElement("button", { type: "button", id: `DBEntryManagerPanel-remove-entry-with-id-${entry[idPropName]}`, className: "btn btn-secondary me-1", "aria-label": `remove database entry: ${entry[titlePropName]}`, onClick: () => {
                                    deleteEntry(entry);
                                } },
                                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faTrash }),
                                React__default["default"].createElement("span", { className: "d-none d-md-inline ms-1" }, "Remove")),
                            !disableEdit && (React__default["default"].createElement("button", { type: "button", id: `DBEntryManagerPanel-edit-with-id-${entry[idPropName]}`, className: "btn btn-primary", "aria-label": `edit db entry: ${entry[titlePropName]}`, onClick: () => {
                                    dispatch({
                                        type: ActionType$3.ShowEditor,
                                        dbEntry: entry,
                                    });
                                } },
                                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCog }),
                                React__default["default"].createElement("span", { className: "d-none d-md-inline ms-1" }, "Edit"))))));
                }),
                React__default["default"].createElement("div", { className: "d-grid" },
                    React__default["default"].createElement("button", { type: "button", id: "DBEntryManagerPanel-add-entry", className: "btn btn-lg btn-primary", "aria-label": `add a new ${itemName} entry to the list of entries`, onClick: () => {
                            dispatch({
                                type: ActionType$3.ShowAdder,
                            });
                        } },
                        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faPlus, className: "me-2" }),
                        "Add",
                        ' ',
                        itemName)))));
    }
    /* --------- Create or edit entry -------- */
    if (!loading && (adding || dbEntryToEdit)) {
        body = (React__default["default"].createElement(AddOrEditDBEntry, { saveEndpointPath: endpoint, validateEntry: validateEntry, modifyEntry: modifyEntry, entryFields: entryFields, dbEntryToEdit: dbEntryToEdit, idPropName: idPropName, entries: dbEntries, itemName: itemName, onFinished: (entry) => {
                dispatch({
                    type: ActionType$3.FinishAdd,
                    dbEntry: entry,
                    idPropName,
                });
            } }));
    }
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", null, body));
};

/**
 * Simple tooltip component
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const Tooltip = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { text, children, } = props;
    /* -------------- Refs -------------- */
    // Child ref
    const childRef = React.useRef(undefined);
    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Update (also called on mount)
     * @author Gabe Abrams
     */
    React.useEffect(() => {
        // Skip if no child
        if (!childRef.current) {
            return;
        }
        // Store copy of tooltip
        let t;
        // Initialize tooltip
        (() => __awaiter(void 0, void 0, void 0, function* () {
            // Import bootstrap tooltip
            const BSTooltip = (yield Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('bootstrap')); })).Tooltip;
            // Initialize
            t = new BSTooltip(childRef.current, {
                title: text,
                placement: 'top',
                trigger: 'hover',
            });
        }))();
        // Clean up tooltip
        return () => {
            if (t) {
                t.dispose();
            }
        };
    }, [text]);
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    // Clone child and add ref
    return React__default["default"].cloneElement(children, { ref: childRef });
};

/**
 * A toggle switch that toggles on or off
 * @author Alessandra De Lucas
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const ToggleSwitch = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { isOn, onToggle, id, className, description, backgroundVariantWhenOn = Variant$1.Info, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    const backgroundVariant = (isOn
        ? backgroundVariantWhenOn
        : 'secondary');
    return (React__default["default"].createElement("button", { id: id, "aria-label": `If on, ${description}. Currently ${isOn ? 'on' : 'off'}. Click to turn ${isOn ? 'off' : 'on'}.`, className: `alert alert-${backgroundVariant} bg-${backgroundVariant} mb-0 rounded-pill d-inline-block pt-0 pb-0 px-3 ${className !== null && className !== void 0 ? className : ''}`, onClick: () => {
            onToggle(!isOn);
        }, type: "button" },
        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCircle, className: "text-light", style: {
                transform: `translateX(${isOn ? '' : '-'}0.7rem)`,
                transition: '0.3s transform ease-in-out',
            } })));
};

/**
 * Convert a string to hyphenated lowercase format with no space or
 *   non-alphanumeric characters
 * @author Gabe Abrams
 * @param str the string to convert
 * @returns the idified string
 */
const idify = (str) => {
    return (str
        // Trim whitespace
        .trim()
        // Convert to lowercase
        .toLowerCase()
        // Replace non-alphanumeric characters with hyphens
        .replace(/[^a-z0-9]+/g, '-')
        // Change multiple hyphens in a row for a single hyphen
        .replace(/-+/g, '-')
        // Remove hyphens at the beginning and end of the string
        .replace(/^-+|-+$/g, ''));
};

/**
 * Container that automatically scrolls when new items are added,
 *   lets the user scroll up to see old items, but resumes
 *   autoscroll when the user scrolls back to the bottom.
 *   Note: takes up full height of parent, so parent should
 *   have a determined height for the scroll to work.
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style = `
  .AutoscrollToBottomContainer-outer-container {
    /* Take up all space */
    height: 100%;
    position: relative;
  }

  .AutoscrollToBottomContainer-scrollable-container {
    /* Take up max 100% height, don't take it up if not needed */
    max-height: 100%;
    overflow-y: auto;

    /* Allow children to position */
    position: relative;
  }

  .AutoscrollToBottomContainer-jump-to-bottom-container {
    /* Don't take any space in parent */
    height: 0;
    overflow: visible;

    /* On top of items */
    z-index: 2;

    /* Position in center bottom */
    position: absolute;
    bottom: 2rem;

    /* Center horizontally */
    width: 100%;
    text-align: center;
  }

  .AutoscrollToBottomContainer-item-container {
    /* Normal Height */
    position: relative;
    z-index: 1;
  }
`;
/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/
// Scrolled to bottom threshold
// (how close you have to be to the bottom for it to count as the bottom)
const SCROLLED_TO_BOTTOM_THRESHOLD_REMS = 1.5;
/*------------------------------------------------------------------------*/
/* -------------------------- Static Functions -------------------------- */
/*------------------------------------------------------------------------*/
/**
 * Get ids of items
 * @author Gabe Abrams
 * @param items the items in the container
 * @returns ids of items
 */
const getItemIds = (items) => {
    return Array.from(items).map((child) => {
        return child.id;
    });
};
/* ------------- Actions ------------ */
// Types of actions
var ActionType$2;
(function (ActionType) {
    // Hide the "jump to bottom" button
    ActionType["HideJumpToBottomButton"] = "HideJumpToBottomButton";
    // Show the "jump to bottom" button
    ActionType["ShowJumpToBottomButton"] = "ShowJumpToBottomButton";
})(ActionType$2 || (ActionType$2 = {}));
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer$3 = (state, action) => {
    switch (action.type) {
        case ActionType$2.HideJumpToBottomButton: {
            return Object.assign(Object.assign({}, state), { jumpToBottomButtonVisible: false });
        }
        case ActionType$2.ShowJumpToBottomButton: {
            return Object.assign(Object.assign({}, state), { jumpToBottomButtonVisible: true });
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const AutoscrollToBottomContainer = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { itemsName, items, jumpToBottomButtonVariant = Variant$1.Danger, messageBeforeItems, messageAfterItems, } = props;
    /* -------------- State ------------- */
    // Initial state
    const initialState = {
        jumpToBottomButtonVisible: false,
    };
    // Initialize state
    const [state, dispatch] = React.useReducer(reducer$3, initialState);
    // Destructure common state
    const { jumpToBottomButtonVisible, } = state;
    /* -------------- Refs -------------- */
    // Initialize refs
    const lastItemIds = React.useRef([]);
    const container = React.useRef(null);
    const wasLastScrolledToBottom = React.useRef(true);
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Scroll --------------- */
    /*----------------------------------------*/
    /**
     * Check if the user is scrolled to the bottom
     * @author Gabe Abrams
     * @returns true if scrolled to the bottom
     */
    const isScrolledToBottom = () => {
        // Skip if no container
        if (!container.current) {
            return true;
        }
        // Get info about container
        const { scrollTop, scrollHeight, clientHeight, } = container.current;
        // Distance to bottom
        const rootFontSizePx = Number.parseInt(getComputedStyle(document.documentElement).fontSize, 10);
        const distanceToBottomRems = Math.abs((scrollTop + clientHeight - scrollHeight) / rootFontSizePx);
        // Figure out if we're scrolled to the bottom
        const atBottom = (distanceToBottomRems < SCROLLED_TO_BOTTOM_THRESHOLD_REMS);
        // Remember if we scrolled to the bottom
        wasLastScrolledToBottom.current = atBottom;
        return atBottom;
    };
    /**
     * Scroll the user to the bottom of the container
     * @author Gabe Abrams
     */
    const scrollToBottom = () => {
        // Skip if no container
        if (!container.current) {
            return;
        }
        // Update state
        dispatch({
            type: ActionType$2.HideJumpToBottomButton,
        });
        // Scroll to bottom
        container.current.scrollTop = (container.current.scrollHeight
            - container.current.clientHeight);
        // Remember that we scrolled to the bottom
        wasLastScrolledToBottom.current = true;
    };
    /*----------------------------------------*/
    /* -------------- Handlers -------------- */
    /*----------------------------------------*/
    /**
     * Handle scroll events on the container
     * @author Gabe Abrams
     */
    const handleScroll = () => {
        // Skip if no container
        if (!container.current) {
            return;
        }
        // If scrolled to bottom, hide the button and remember position
        if (isScrolledToBottom()) {
            // Hide button
            dispatch({
                type: ActionType$2.HideJumpToBottomButton,
            });
        }
    };
    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Mount
     * @author Gabe Abrams
     */
    React.useEffect(() => {
        // Scroll to the bottom
        scrollToBottom();
    }, []);
    /**
     * Update (also called on mount): autoscroll
     * @author Gabe Abrams
     */
    React.useEffect(() => {
        // Check if new content appeared
        const currentItemIds = getItemIds(items);
        // Check if new content appeared at bottom
        const newContentAppeared = (
        // There are items
        currentItemIds.length > 0
            // The last item is new
            && !lastItemIds.current.includes(currentItemIds[currentItemIds.length - 1]));
        // Update last item ids
        lastItemIds.current = currentItemIds;
        // Do nothing if no new content
        if (!newContentAppeared) {
            return;
        }
        // Check if used to be scrolled to the bottom
        if (wasLastScrolledToBottom.current) {
            // Was scrolled to the bottom! Autoscroll.
            scrollToBottom();
        }
        else {
            // Not scrolled to bottom. Show "jump to bottom" button.
            dispatch({
                type: ActionType$2.ShowJumpToBottomButton,
            });
        }
    }, [items]);
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    // Jump to Bottom button
    let jumpToBottomButton;
    if (jumpToBottomButtonVisible) {
        jumpToBottomButton = (React__default["default"].createElement("div", { className: `AutoscrollToBottomContainer-jump-to-bottom-container AutoscrollToBottomContainer-for-${idify(itemsName !== null && itemsName !== void 0 ? itemsName : 'items')}` },
            React__default["default"].createElement("button", { type: "button", className: `AutoscrollToBottomContainer-jump-to-bottom-button AutoscrollToBottomContainer-jump-to-bottom-button-for-${idify(itemsName !== null && itemsName !== void 0 ? itemsName : 'items')} btn btn-sm btn-${jumpToBottomButtonVariant} pt-0 pb-0`, onClick: scrollToBottom, "aria-label": "scroll back to bottom and show new content" },
                "New",
                ' ', itemsName !== null && itemsName !== void 0 ? itemsName : 'Content',
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faChevronDown, className: "ms-1" }))));
    }
    // Main UI
    return (React__default["default"].createElement("div", { className: "AutoscrollToBottomContainer-outer-container" },
        React__default["default"].createElement("style", null, style),
        jumpToBottomButton,
        React__default["default"].createElement("div", { className: "AutoscrollToBottomContainer-scrollable-container", onScroll: handleScroll, ref: container },
            messageBeforeItems,
            items
                // Render each item with a key
                .map((item) => {
                return (React__default["default"].createElement("div", { className: "AutoscrollToBottomContainer-item-container", key: item.id }, item.item));
            }),
            messageAfterItems)));
};

/**
 * Merges a list of class names into a class name, intelligently handling spaces
 * @author Gabe Abrams
 * @param classNames the list of class names to merge (or falsey values to
 *   ignore)
 * @returns the merged class name
 */
const combineClassNames = (classNames) => {
    return (classNames
        // Turn falsey values into empty strings
        .map((className) => {
        return className || '';
    })
        // Trim whitespace
        .map((className) => {
        return className.trim();
    })
        // Remove empty class names
        .filter((className) => {
        return className.length > 0;
    })
        // Change multiple spaces for just one space
        .map((className) => {
        return className.replace(/\s+/g, ' ');
    })
        // Join with spaces
        .join(' '));
};

/**
 * A switch with multiple options for selection
 * @author Alessandra De Lucas
 * @author Gabe Abrams
 * @author Austen Money
 */
/* ------------- Actions ------------ */
// Types of actions
var ActionType$1;
(function (ActionType) {
    // Start hovering on an option
    ActionType["StartHover"] = "StartHover";
    // Stop hovering on an option
    ActionType["StopHover"] = "StopHover";
})(ActionType$1 || (ActionType$1 = {}));
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer$2 = (state, action) => {
    switch (action.type) {
        case ActionType$1.StartHover: {
            return Object.assign(Object.assign({}, state), { hoveredOptionId: action.hoveredOptionId });
        }
        case ActionType$1.StopHover: {
            return Object.assign(Object.assign({}, state), { hoveredOptionId: undefined });
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const MultiSwitch = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { options, selectedOptionId, onChange, heightRem = 3, } = props;
    /* -------------- State ------------- */
    // Initial state
    const initialState = {
        hoveredOptionId: undefined,
    };
    // Initialize state
    const [state, dispatch] = React.useReducer(reducer$2, initialState);
    // Destructure common state
    const { hoveredOptionId, } = state;
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Style ------------------------------- */
    /*------------------------------------------------------------------------*/
    // Calculate the index of the selected option
    const selectedOptionIndex = options.findIndex((option) => {
        return (option.id === selectedOptionId);
    });
    // Constants
    const gutterRems = heightRem * 0.1;
    const itemWidthRems = heightRem * 2.2;
    const textFontSize = heightRem / 3.5;
    const iconFontSize = heightRem / 2;
    const borderWidthRems = 0.05;
    // Style
    const style = `
    .MultiSwitch-outer-box {
      display: inline-block !important;
      position: relative;
      border-radius: 0.5rem !important;
      border: ${borderWidthRems}rem solid #666 !important;
      padding: 0 !important;
      height: ${heightRem}rem !important;
      width: ${gutterRems + (2 * borderWidthRems) + options.length * (itemWidthRems + gutterRems)}rem !important;
      overflow: visible !important;
      text-wrap: none !important;
      z-index: 0;
    }

    .MultiSwitch-options-container {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      z-index: 1;
      margin-top: ${gutterRems}rem;
      width: ${gutterRems + options.length * (itemWidthRems + gutterRems)}rem;
      overflow: visible !important;
      text-wrap: none !important;
    }

    .MultiSwitch-icon {
      font-size: ${iconFontSize}rems !important;
      color: white;
    }

    .MultiSwitch-option-button {
      position: relative !important;
      font-size: ${textFontSize}rem !important;
      z-index: 1 !important;
      display: inline-block !important;
      flex-grow: 0 !important;
      border: 0 !important;
      border-radius: 0.5rem !important;
      width: ${itemWidthRems}rem !important;
      height: ${heightRem - (2 * gutterRems)}rem !important;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: ${heightRem / 3}rem !important;
      line-height: 1 !important;
      margin-right: 0 !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      margin-left: ${gutterRems}rem !important;
      color: black !important;
      background-color: transparent !important;
      transition: background-color 0.3s ease-out !important;
    }

    .MultiSwitch-option-button-hovered {
      background-color: #545454 !important;
    }

    .MultiSwitch-option-text {
      display: inline-block;
      font-size: ${textFontSize}rem !important;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      text-align: center !important;

      color: white !important;
    }

    .MultiSwitch-option-text-selected {
      font-weight: bold;
    }

    .MultiSwitch-highlight-container {
      position: absolute;
      z-index: -1;
      left: 0;
      top: 0;
      display: inline-block;
      height: 0;
      width: 0;
      overflow: visible;
    }

    .MultiSwitch-highlight {
      position: absolute;
      border-radius: 0.5rem !important;
      width: ${itemWidthRems}rem;
      height: ${heightRem - (2 * gutterRems)}rem;
      top: ${gutterRems}rem;
      left: ${gutterRems}rem;
      transform: translate(${selectedOptionIndex * (itemWidthRems + gutterRems) + borderWidthRems}rem, -${borderWidthRems * 0.5}rem);
      transition: transform 0.3s ease-in-out;
    }
  `;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    const optionElements = options.map((option) => {
        const isSelected = (option.id === selectedOptionId);
        const isHovered = (option.id === hoveredOptionId);
        return (React__default["default"].createElement("button", { type: "button", key: option.id, className: combineClassNames([
                'MultiSwitch-option-button',
                (isHovered ? 'MultiSwitch-option-button-hovered' : ''),
                `MultiSwitch-option-button-with-id-${idify(option.id)}`,
                `MultiSwitch-option-button-is${isSelected ? '' : '-not'}-selected`,
            ]), "aria-label": (isSelected
                ? `option "${option.label}", currently selected`
                : `click to select option "${option.label}"`), onClick: () => {
                // Remove hover
                dispatch({
                    type: ActionType$1.StopHover,
                });
                // Notify parent
                onChange(option.id);
            }, onMouseEnter: () => {
                dispatch({
                    type: ActionType$1.StartHover,
                    hoveredOptionId: option.id,
                });
            }, onMouseLeave: () => {
                dispatch({
                    type: ActionType$1.StopHover,
                });
            }, onFocus: () => {
                dispatch({
                    type: ActionType$1.StartHover,
                    hoveredOptionId: option.id,
                });
            }, onBlur: () => {
                dispatch({
                    type: ActionType$1.StopHover,
                });
            }, style: {
                pointerEvents: ((option.id === selectedOptionId)
                    ? 'none'
                    : undefined),
            }, disabled: option.id === selectedOptionId },
            React__default["default"].createElement("div", { className: `MultiSwitch-icon MultiSwitch-icon-${isSelected ? 'selected' : ''}` },
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: option.icon })),
            React__default["default"].createElement("div", { className: `MultiSwitch-option-text MultiSwitch-option-text-${isSelected ? 'selected' : ''}` }, option.label)));
    });
    // Highlight behind selected option
    const highlight = (React__default["default"].createElement("div", { className: "MultiSwitch-highlight bg-danger d-inline-block" }));
    return (React__default["default"].createElement("div", { className: "MultiSwitch-outer-box alert alert-dark m-0" },
        React__default["default"].createElement("style", null, style),
        React__default["default"].createElement("div", { className: "MultiSwitch-options-container" }, optionElements),
        React__default["default"].createElement("div", { className: "MultiSwitch-highlight-container" }, highlight)));
};

// Types of dropdown items
var DropdownItemType;
(function (DropdownItemType) {
    // Dropdown header
    DropdownItemType["Header"] = "Header";
    // Dropdown divider
    DropdownItemType["Divider"] = "Divider";
    // Dropdown item
    DropdownItemType["Item"] = "Item";
})(DropdownItemType || (DropdownItemType = {}));
var DropdownItemType$1 = DropdownItemType;

/**
 * A simple dropdown menu
 * @author Alessandra De Lucas
 * @author Yuen Ler Chow
 * @author Gabe Abrams
 */
/* ------------- Actions ------------ */
// Types of actions
var ActionType;
(function (ActionType) {
    // Toggle opening the dropdown menu
    ActionType["ToggleDropdown"] = "ToggleDropdown";
    // Close the dropdown menu
    ActionType["CloseDropdown"] = "CloseDropdown";
})(ActionType || (ActionType = {}));
/**
 * Reducer that executes actions
 * @author Alessandra De Lucas
 * @author Yuen Ler Chow
 * @param state current state
 * @param action action to execute
 */
const reducer$1 = (state, action) => {
    switch (action.type) {
        case ActionType.ToggleDropdown: {
            return Object.assign(Object.assign({}, state), { isDropdownOpen: !state.isDropdownOpen });
        }
        case ActionType.CloseDropdown: {
            return Object.assign(Object.assign({}, state), { isDropdownOpen: false });
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const Dropdown = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { dropdownButton, items, } = props;
    /* -------------- State ------------- */
    // Initial state
    const initialState = {
        isDropdownOpen: false,
    };
    // Initialize state
    const [state, dispatch] = React.useReducer(reducer$1, initialState);
    // Destructure common state
    const { isDropdownOpen, } = state;
    /* -------------- Refs -------------- */
    // Initialize refs
    const dropdownRef = React.useRef(null);
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Handle clicking outside of the dropdown menu to close it
     * @author Yuen Ler Chow
     * @param event the mouse event
     */
    const handleClickOutside = (event) => {
        if (
        // Dropdown has been rendered
        dropdownRef.current
            // Click occurred outside the dropdown
            && !dropdownRef.current.contains(event.target)) {
            dispatch({ type: ActionType.CloseDropdown });
        }
    };
    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Mount
     * @author Yuen Ler Chow
     */
    React.useEffect(() => {
        // Add event listener to close dropdown when clicking outside
        document.addEventListener('mousedown', handleClickOutside);
        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: "dropdown", ref: dropdownRef, "data-bs-theme": isDarkModeOn() ? 'dark' : undefined },
        React__default["default"].createElement("button", { className: combineClassNames([
                'btn dropdown-toggle border',
                isDropdownOpen && 'show',
                `btn-${dropdownButton.variant}`,
                dropdownButton.variant === Variant$1.Light && 'text-dark',
            ]), type: "button", id: dropdownButton.id, "aria-expanded": isDropdownOpen, "aria-label": dropdownButton.ariaLabel, onClick: () => {
                dispatch({
                    type: ActionType.ToggleDropdown,
                });
            } }, dropdownButton.content),
        React__default["default"].createElement("ul", { className: combineClassNames([
                'dropdown-menu',
                isDarkModeOn() && 'dropdown-menu-dark',
                isDropdownOpen && 'show',
            ]) }, Object.values(items).map((item) => {
            if (item.type === DropdownItemType$1.Header) {
                return (
                // TODO: Implement header
                React__default["default"].createElement("span", null));
            }
            if (item.type === DropdownItemType$1.Divider) {
                return (
                // TODO: Implement divider
                React__default["default"].createElement("span", null));
            }
            return (React__default["default"].createElement("li", { key: item.id },
                React__default["default"].createElement("button", { type: "button", "aria-label": item.ariaLabel, className: "dropdown-item", onClick: (e) => {
                        e.preventDefault();
                        dispatch({
                            type: ActionType.CloseDropdown,
                        });
                        item.onClick();
                    } }, item.content)));
        }))));
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

// True if user is on mobile or tablet
let cachedResult = undefined;
/**
 * Check if the user is on a mobile device or tablet
 * from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
 * @returns true if user is on a mobile device
 */
const isMobileOrTablet = () => {
    var _a;
    if (cachedResult !== undefined) {
        return cachedResult;
    }
    try {
        let check = false;
        ((a) => { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true; })((navigator !== null && navigator !== void 0 ? navigator : {}).userAgent || (navigator !== null && navigator !== void 0 ? navigator : {}).vendor || ((_a = window) !== null && _a !== void 0 ? _a : {}).opera);
        cachedResult = check;
        return cachedResult;
    }
    catch (err) {
        // Probably this code is being executed on a server
        cachedResult = false;
        return cachedResult;
    }
};

// Import shared types
// Check if mobile
const isMobile = isMobileOrTablet();
/**
 * Dynamic words determined by the user's platform
 * @author Gabe Abrams
 */
const DynamicWord = {
    Click: (isMobile
        ? 'tap'
        : 'click'),
    ClickCapitalized: (isMobile
        ? 'Tap'
        : 'Click'),
    App: (isMobile
        ? 'app'
        : 'application'),
    AppCapitalized: (isMobile
        ? 'App'
        : 'Application'),
    Device: (isMobile
        ? 'device'
        : 'computer'),
    DeviceCapitalized: (isMobile
        ? 'Device'
        : 'Computer'),
};

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
            pageNumber: ParamType$1.Int,
        },
        handler: ({ params }) => __awaiter(void 0, void 0, void 0, function* () {
            // Get user info
            const { year, month, pageNumber, userId, isAdmin, } = params;
            // Validate user
            const canReview = yield canReviewLogs(userId, isAdmin);
            if (!canReview) {
                throw new ErrorWithCode('You cannot access this resource because you do not have the appropriate permissions.', ReactKitErrorCode$1.NotAllowedToReviewLogs);
            }
            // Query for logs
            const response = yield _logCollection.findPaged({
                query: {
                    year,
                    month,
                },
                perPage: 1000,
                pageNumber,
            });
            // Return response
            return response;
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
 * Generate a static info page
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.title title of the info box
 * @param opts.body a human-readable text body for the info alert
 * @returns the HTML for the info page
 */
const genInfoPage = (opts) => {
    const { title, body, } = opts;
    return `
<head>
  <!-- Metadata -->
  <meta
    name="viewport"
    content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
  >

  <!-- Title -->
  <title>${title}</title>

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
  </style>
</head>

<!-- Body -->
<body class="bg-dark text-center pt-3 ps-3 pe-3">
  <!-- Alert -->
  <div
    class="DCEReactKit-pop-in alert alert-info d-inline-block"
    style="width: 50em; max-width: 100%"
  >
    <!-- Title -->
    <h2>
      <i class="me-1 fa-solid fa-circle-info"></i>
      ${title}
    </h2>
    <!-- Body -->
    <div>
      ${body}
    </div>
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
 * @param [opts.allowedHosts] if included, only allow requests from these hosts
 *   (start a hostname with a "*" to only check the end of the hostname)
 *   you can include just one string instead of an array
 * @param [opts.bannedHosts] if included, do not allow requests from these hosts
 *   (start a hostname with a "*" to only check the end of the hostname)
 *   you can include just one string instead of an array
 * @param [opts.unhandledErrorMessagePrefix] if included, when an error that
 *   is not of type ErrorWithCode is thrown, the client will receive an error
 *   where the error message is prefixed with this string. For example,
 *   if unhandledErrorMessagePrefix is
 *   'While saving progress, we encountered an error:'
 *   and the error is 'progressInfo is not an object',
 *   the client will receive an error with the message
 *   'While saving progress, we encountered an error: progressInfo is not an object'
 * @returns express route handler that takes the following arguments:
 *   params (map: param name => value),
 *   req (express request object),
 *   next (express next function),
 *   send (a function that sends a string to the client),
 *   redirect (takes a url and redirects the user to that url),
 *   renderErrorPage (shows a static error page to the user),
 *   renderInfoPage (shows a static info page to the user),
 *   renderCustomHTML (renders custom html and sends it to the user),
 *   and returns the value to send to the client as a JSON API response, or
 *   calls next() or redirect(...) or send(...) or renderErrorPage(...).
 *   Note: params also has userId, userFirstName,
 *   userLastName, userEmail, userAvatarURL, isLearner, isTTM, isAdmin,
 *   and any other variables that
 *   are directly added to the session, if the user does have a session.
 */
const genRouteHandler = (opts) => {
    // Return a route handler
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        // Output params
        const output = {};
        /*----------------------------------------*/
        /* ----------- Hostname Check ----------- */
        /*----------------------------------------*/
        // Get hostnames
        const originURL = String(req.get('origin')
            || req.headers.origin
            || req.headers.referer);
        const originHostname = (originURL
            // Remove protocol
            .replace(/(^\w+:|^)\/\//, '')
            // Remove port
            .replace(/:\d+$/, ''));
        const serverHostname = String(req.hostname);
        // Check allowed
        if (opts.allowedHosts) {
            // Only accept requests from allowed hosts
            const allowedArray = (Array.isArray(opts.allowedHosts)
                ? opts.allowedHosts
                : [opts.allowedHosts]);
            // Check if server is localhost
            if (serverHostname === 'localhost') {
                // Allow localhost
                allowedArray.push('localhost');
            }
            // Check if current host is allowed
            const allowed = allowedArray.some((allowedHost) => {
                if (allowedHost.startsWith('*')) {
                    // Check end of hostname
                    return originHostname.endsWith(allowedHost.substring(1));
                }
                // Check full hostname
                return originHostname.toLowerCase() === allowedHost.toLowerCase();
            });
            // If not allowed, return error
            if (!allowed) {
                return handleError(res, {
                    message: 'You are not allowed to access this endpoint.',
                    code: ReactKitErrorCode$1.HostNotAllowed,
                    status: 403,
                });
            }
        }
        // Check banned
        if (opts.bannedHosts) {
            // Do not allow requests from banned hosts
            const bannedArray = (Array.isArray(opts.bannedHosts)
                ? opts.bannedHosts
                : [opts.bannedHosts]);
            // Check if current host is banned
            const banned = bannedArray.some((bannedHost) => {
                if (bannedHost.startsWith('*')) {
                    // Check end of hostname
                    return originHostname.endsWith(bannedHost.substring(1));
                }
                // Check full hostname
                return originHostname.toLowerCase() === bannedHost.toLowerCase();
            });
            // If banned, return error
            if (banned) {
                return handleError(res, {
                    message: 'You are not allowed to access this endpoint.',
                    code: ReactKitErrorCode$1.HostBanned,
                    status: 403,
                });
            }
        }
        /*----------------------------------------*/
        /* ------------ Parse Params ------------ */
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
        /* ------------- Launch Info ------------ */
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
            : ((_b = output.userId) !== null && _b !== void 0 ? _b : undefined));
        output.userFirstName = (launchInfo
            ? launchInfo.userFirstName
            : ((_c = output.userFirstName) !== null && _c !== void 0 ? _c : undefined));
        output.userLastName = (launchInfo
            ? launchInfo.userLastName
            : ((_d = output.userLastName) !== null && _d !== void 0 ? _d : undefined));
        output.userEmail = (launchInfo
            ? launchInfo.userEmail
            : ((_e = output.userEmail) !== null && _e !== void 0 ? _e : undefined));
        output.userAvatarURL = (launchInfo
            ? ((_f = launchInfo.userImage) !== null && _f !== void 0 ? _f : 'http://www.gravatar.com/avatar/?d=identicon')
            : ((_g = output.userAvatarURL) !== null && _g !== void 0 ? _g : undefined));
        output.isLearner = (launchInfo
            ? !!launchInfo.isLearner
            : ((_h = output.isLearner) !== null && _h !== void 0 ? _h : undefined));
        output.isTTM = (launchInfo
            ? !!launchInfo.isTTM
            : ((_j = output.isTTM) !== null && _j !== void 0 ? _j : undefined));
        output.isAdmin = (launchInfo
            ? !!launchInfo.isAdmin
            : ((_k = output.isAdmin) !== null && _k !== void 0 ? _k : undefined));
        output.courseId = (launchInfo
            ? ((_l = output.courseId) !== null && _l !== void 0 ? _l : launchInfo.courseId)
            : ((_m = output.courseId) !== null && _m !== void 0 ? _m : undefined));
        output.courseName = (launchInfo
            ? launchInfo.contextLabel
            : ((_o = output.courseName) !== null && _o !== void 0 ? _o : undefined));
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
        /* ----- Require Course Consistency ----- */
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
        /* ------------- Log Handler ------------ */
        /*----------------------------------------*/
        // Create a log handler function
        /**
         * Log an event on the server
         * @author Gabe Abrams
         */
        const logServerEvent = (logOpts) => __awaiter(void 0, void 0, void 0, function* () {
            var _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
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
                    id: `${launchInfo ? 'unknown' : launchInfo.userId}-${Date.now()}-${Math.floor(Math.random() * 100000)}-${Math.floor(Math.random() * 100000)}`,
                    userFirstName: (launchInfo ? 'unknown' : launchInfo.userFirstName),
                    userLastName: (launchInfo ? 'unknown' : launchInfo.userLastName),
                    userEmail: (launchInfo ? 'unknown' : launchInfo.userEmail),
                    userId: (launchInfo ? 'unknown' : launchInfo.userId),
                    isLearner: (launchInfo && !!launchInfo.isLearner),
                    isAdmin: (launchInfo && !!launchInfo.isAdmin),
                    isTTM: (launchInfo && !!launchInfo.isTTM),
                    courseId: (launchInfo ? 'unknown' : launchInfo.courseId),
                    courseName: (launchInfo ? 'unknown' : launchInfo.contextLabel),
                    browser,
                    device,
                    year,
                    month,
                    day,
                    hour,
                    minute,
                    timestamp,
                    context: (typeof logOpts.context === 'string'
                        ? logOpts.context
                        : ((_q = ((_p = logOpts.context) !== null && _p !== void 0 ? _p : {})._) !== null && _q !== void 0 ? _q : LogBuiltInMetadata.Context.Uncategorized)),
                    subcontext: ((_r = logOpts.subcontext) !== null && _r !== void 0 ? _r : LogBuiltInMetadata.Context.Uncategorized),
                    tags: ((_s = logOpts.tags) !== null && _s !== void 0 ? _s : []),
                    level: ((_t = logOpts.level) !== null && _t !== void 0 ? _t : LogLevel$1.Info),
                    metadata: ((_u = logOpts.metadata) !== null && _u !== void 0 ? _u : {}),
                };
                // Type-specific info
                const typeSpecificInfo = (('error' in opts && opts.error)
                    ? {
                        type: LogType$1.Error,
                        errorMessage: (_v = logOpts.error.message) !== null && _v !== void 0 ? _v : 'Unknown message',
                        errorCode: (_w = logOpts.error.code) !== null && _w !== void 0 ? _w : ReactKitErrorCode$1.NoCode,
                        errorStack: (_x = logOpts.error.stack) !== null && _x !== void 0 ? _x : 'No stack',
                    }
                    : {
                        type: LogType$1.Action,
                        target: ((_y = logOpts.target) !== null && _y !== void 0 ? _y : LogBuiltInMetadata.Target.NoTarget),
                        action: ((_z = logOpts.action) !== null && _z !== void 0 ? _z : LogAction$1.Unknown),
                    });
                // Source-specific info
                const sourceSpecificInfo = (logOpts.overrideAsClientEvent
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
                else if (log.type === LogType$1.Error) {
                    // Print to console
                    // eslint-disable-next-line no-console
                    console.error('dce-reactkit error log:', log);
                }
                else {
                    // eslint-disable-next-line no-console
                    console.log('dce-reactkit action log:', log);
                }
                // Return log entry
                return log;
            }
            catch (err) {
                // Print because we cannot store the error
                // eslint-disable-next-line no-console
                console.error('Could not log the following:', logOpts, 'due to this error:', ((_0 = err) !== null && _0 !== void 0 ? _0 : {}).message, ((_1 = err) !== null && _1 !== void 0 ? _1 : {}).stack);
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
         * @param renderOpts object containing all arguments
         * @param [renderOpts.title=An Error Occurred] title of the error box
         * @param [renderOpts.description=An unknown server error occurred. Please contact support.]
         *   a human-readable description of the error
         * @param [renderOpts.code=ReactKitErrorCode.NoCode] error code to show
         * @param [renderOpts.pageTitle=renderOpts.title] title of the page/tab if it differs from
         *   the title of the error
         * @param [renderOpts.status=500] http status code
         */
        const renderErrorPage = (renderOpts = {}) => {
            var _a, _b, _c;
            const html = genErrorPage(renderOpts);
            send(html, (_a = renderOpts.status) !== null && _a !== void 0 ? _a : 500);
            // Log server-side error if not a session expired error or 404
            if (renderOpts.status && renderOpts.status === 404) {
                return;
            }
            if ((_b = renderOpts.title) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes('session expired')) {
                return;
            }
            logServerEvent({
                context: LogBuiltInMetadata.Context.ServerRenderedErrorPage,
                error: {
                    message: `${renderOpts.title}: ${renderOpts.description}`,
                    code: renderOpts.code,
                },
                metadata: {
                    title: renderOpts.title,
                    description: renderOpts.description,
                    code: renderOpts.code,
                    pageTitle: renderOpts.pageTitle,
                    status: (_c = renderOpts.status) !== null && _c !== void 0 ? _c : 500,
                },
            });
        };
        /**
         * Render an info page
         * @author Gabe Abrams
         * @param renderOpts object containing all arguments
         * @param renderOpts.title title of the info box
         * @param renderOpts.body a human-readable text body for the info alert
         */
        const renderInfoPage = (renderOpts) => {
            const html = genInfoPage(renderOpts);
            send(html, 200);
        };
        /**
         * Render custom HTML
         * @author Gabe Abrams
         * @param htmlOpts object containing all arguments
         * @param htmlOpts.html the HTML to send to the client
         * @param [ejsOpts.status=200] the http status code to send
         */
        const renderCustomHTML = (htmlOpts) => {
            var _a;
            send(htmlOpts.html, (_a = htmlOpts.status) !== null && _a !== void 0 ? _a : 200);
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
                renderInfoPage,
                renderCustomHTML,
                logServerEvent,
            });
            // Send results to client (only if next wasn't called)
            if (!responseSent) {
                return handleSuccess(res, results !== null && results !== void 0 ? results : undefined);
            }
        }
        catch (err) {
            // Prefix error message if needed
            if (opts.unhandledErrorMessagePrefix
                && err instanceof Error
                && err.message
                && err.name !== 'ErrorWithCode') {
                err.message = `${opts.unhandledErrorMessagePrefix.trim()} ${err.message.trim()}`;
            }
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
            // eslint-disable-next-line no-console
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

/**
 * Get the current part of day (morning, evening, etc.)
 * @author Gabe Abrams
 * @returns the part of day (morning, evening, etc.)
 */
const getPartOfDay = () => {
    // Setup the post-it time of day
    let partOfDay = 'day';
    const hours = new Date().getHours();
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
            'year',
            'month',
            'day',
            'hour',
            'type',
        ],
    });
};

/*------------------------------------------------------------------------*/
/* -------------------------------- Cache ------------------------------- */
/*------------------------------------------------------------------------*/
// Cache user's ability
let canReview;
/*------------------------------------------------------------------------*/
/* -------------------------------- Main -------------------------------- */
/*------------------------------------------------------------------------*/
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
 * For every element in an array, extract the value of a prop
 *   (e.g. for all user objects, extract their ages and put that into a new
 *   ages array)
 * @author Gabe Abrams
 * @param arr the array of objects to operate on
 * @param prop the property to extract from each object
 * @returns new array containing the corresponding values, in order, of each
 *   object in the original array
 */
const extractProp = (arr, prop) => {
    return arr.map((item) => {
        return item[prop];
    });
};

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
const compareArraysByProp = (a, b, prop) => {
    // Immediately return if size of arrays is different
    if (a.length !== b.length) {
        return false;
    }
    // Get all props
    const props = (Array.isArray(prop) ? prop : [prop]);
    // Clone second array so we can work on it
    const bCloned = [...b];
    // Remove elements from b as we find them in a
    for (let i = 0; i < a.length; i++) {
        // Find matching element in b
        const matchingIndex = bCloned.findIndex((bItem) => {
            // Compare based on all props
            return props.every((propToCompareBy) => {
                var _a;
                const aVal = ((_a = a[i]) !== null && _a !== void 0 ? _a : {})[propToCompareBy];
                const bVal = (bItem !== null && bItem !== void 0 ? bItem : {})[propToCompareBy];
                return aVal === bVal;
            });
        });
        // Check if no match
        const noMatch = (matchingIndex < 0);
        // If no match, there's no corresponding element in b
        if (noMatch) {
            return false;
        }
        // Remove the matching element
        bCloned.splice(matchingIndex, 1);
    }
    // If we made it here, all elements in a have a corresponding element in b
    return true;
};

/**
 * Get current time info in local time
 * @author Gabe Abrams
 * @param [dateOrTimestamp=now] the date to get info on or a ms since epoch timestamp
 * @returns object with timestamp (ms since epoch) and numbers
 *   corresponding to time values for year, month, day, hour, hour12, minute, isPM
 *   where hour is in 24hr time and hour12 is in 12hr time.
 */
const getLocalTimeInfo = (dateOrTimestamp) => {
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
    // Create all time numbers
    const timestamp = d.getTime();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const isPM = hour >= 12;
    let hour12 = hour % 12;
    if (hour12 === 0) {
        hour12 = 12;
    }
    const minute = d.getMinutes();
    // Return
    return {
        timestamp,
        year,
        month,
        day,
        hour,
        hour12,
        isPM,
        minute,
    };
};

/**
 * Add all routes for the DBEditor
 * @author Yuen Ler Chow
 * @param opts object containing all arguments
 * @param opts.app express app to add routes too
 * @param opts.collectionName the name of the collection
 * @param opts.adminsOnly true if the endpoint is for admins only
 * @param opts.collection dce-mango db collection
 */
const addDBEditorEndpoints = (opts) => {
    const { app, collectionName, adminsOnly, collection, } = opts;
    // Generate the endpoint path
    const endpointPath = generateEndpointPath(collectionName, adminsOnly);
    /**
     * List all items in the collection
     * @author Yuen Ler Chow
     * @returns {any[]} the list of items in the collection
     */
    app.get(endpointPath, genRouteHandler({
        paramTypes: {
            filterQuery: ParamType$1.JSONOptional,
        },
        handler: ({ params }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const filterQuery = (_a = params.filterQuery) !== null && _a !== void 0 ? _a : {};
            const categories = yield collection.find(filterQuery);
            return categories;
        }),
    }));
    /**
     * Create a new item in the collection
     * @author Yuen Ler Chow
     * @param {any} item the item to create
     */
    app.post(endpointPath, genRouteHandler({
        paramTypes: {
            item: ParamType$1.JSON,
        },
        handler: ({ params, }) => __awaiter(void 0, void 0, void 0, function* () {
            // Destructure params
            const { item, } = params;
            yield collection.insert(item);
        }),
    }));
    /**
     * Remove an item from the collection by id
     * @author Yuen Ler Chow
     */
    app.delete(`${endpointPath}/:id`, genRouteHandler({
        paramTypes: {
            id: ParamType$1.String,
        },
        handler: ({ params, }) => __awaiter(void 0, void 0, void 0, function* () {
            // Destructure params
            const { id, } = params;
            yield collection.delete({ id });
        }),
    }));
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
const genCommaList = (list) => {
    const { length } = list;
    return (length < 2
        ? list.join('')
        : `${list.slice(0, length - 1).join(', ')}${length < 3 ? ' and ' : ', and '}${list[length - 1]}`);
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/
const INVALID_REGEX_ERROR = 'input does not follow the requested format';
const INVALID_EMAIL_ERROR = 'Please provide a valid email address.';
const INVALID_PHONE_ERROR = 'Please provide a valid phone number.';
const INVALID_STRING_ERRORS = {
    MIN_LEN: (minLen) => {
        return `input must not be under ${minLen} character(s)`;
    },
    MAX_LEN: (maxLen) => {
        return `input must not be over ${maxLen} character(s)`;
    },
    LETTERS_ONLY: 'input must only contain letters',
    NUMBERS_ONLY: 'input must only contain numbers',
    MESSAGE_INTRO: 'The following error(s) occurred: ',
};

// Import constants
/**
 * Determines whether a given input string is considered valid based on
 *   the provided regex.
 * @author Austen Money
 * @param opts object containing all args
 * @param opts.input user-provided input to validate
 * @param opts.regex regular expression to check against input
 * @param [opts.regexDescription] description of what regexString is checking
 *   for, used to customize error message
 * @returns the unchanged input if valid, or a customized error message if
 *   invalid
 */
const validateRegex = (opts) => {
    // customize error message in case of invalid input
    const errorMessage = `${INVALID_REGEX_ERROR}${opts.regexDescription
        ? ': '
        : ''}${opts.regexDescription}`;
    // return error message if test is invalid, or input string if valid
    return (opts.regex.test(opts.input)
        ? {
            isValid: true,
            cleanedValue: opts.input,
        }
        : {
            isValid: false,
            errorMessage,
        });
};

// Import helpers
/**
 * Determines whether a given email address is valid.
 * @author Austen Money
 * @param email email address to validate
 * @returns whether email fulfills proper formatting requirements, includes a
 *   cleaned version of the address without leading or trailing
 *   whitespace if valid or an error message if invalid.
 */
const validateEmail = (email) => {
    // validation regex, sourced from HTML living standard: http://www.whatwg.org/specs/web-apps/current-work/multipage/forms.html#e-mail-state-(type=email)
    // eslint-disable-next-line max-len
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    // remove leading and trailing whitespace
    const cleanedValue = email.replace(/^\s+|\s+$/g, '');
    // validate email with regex, and return error if not valid
    return (validateRegex({
        input: cleanedValue,
        regex: emailRegex,
    }).isValid
        ? {
            isValid: true,
            cleanedValue,
        }
        : {
            isValid: false,
            errorMessage: INVALID_EMAIL_ERROR,
        });
};

// Import helpers
/**
 * Determines whether a given phone number is valid.
 * @author Austen Money
 * @param phoneNumber phone number to validate
 * @returns whether phone number is considered valid - if valid, also returns
 *   a cleaned version of the number without any formatting. If invalid,
 *   returns an error message.
 */
const validatePhoneNumber = (phoneNumber) => {
    // regex to validate phone number
    const validationRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    // validate phone number with regex
    const validationResponse = validateRegex({
        input: phoneNumber,
        regex: validationRegex,
    });
    // remove all non-digits from number
    const cleanedValue = phoneNumber.replace(/\D/g, '');
    // return cleaned value if valid, or error message if invalid
    return (validationResponse.isValid
        ? {
            isValid: true,
            cleanedValue,
        }
        : {
            isValid: false,
            errorMessage: INVALID_PHONE_ERROR,
        });
};

// Import helpers
/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/
// define minimum and maximum range for lowercase ASCII chars
const LOWERCASE_MIN = 65;
const LOWERCASE_MAX = 90;
// define minimum and maximum range for uppercase ASCII chars
const UPPERCASE_MIN = 97;
const UPPERCASE_MAX = 122;
// define minimum and maximum range for ASCII digits
const DIGIT_MIN = 48;
const DIGIT_MAX = 57;
/*------------------------------------------------------------------------*/
/* ---------------------------- Main Function --------------------------- */
/*------------------------------------------------------------------------*/
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
const validateString = (input, opts) => {
    // stores all invalid input errors
    const errorMessages = [];
    // contains version of input that will be returned
    let cleanedValue = input;
    // remove whitespace if required
    if (opts.ignoreWhitespace) {
        cleanedValue = input.replace(/\s+/g, '');
    }
    // apply max char requirement
    if (opts.minLen) {
        if (cleanedValue.length < opts.minLen) {
            errorMessages.push(INVALID_STRING_ERRORS.MIN_LEN(opts.minLen));
        }
    }
    // apply max char requirement
    if (opts.maxLen) {
        if (cleanedValue.length > opts.maxLen) {
            errorMessages.push(INVALID_STRING_ERRORS.MAX_LEN(opts.maxLen));
        }
    }
    // apply alphabetical requirement
    if (opts.lettersOnly) {
        // remove diacritics
        cleanedValue = cleanedValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const containsNonLetters = (cleanedValue
            // split into characters
            .split('')
            // convert into character codes
            .map((curr) => {
            return curr.charCodeAt(0);
        })
            // check for non-letters
            .some((currCode) => {
            return (!(currCode >= LOWERCASE_MIN && currCode <= LOWERCASE_MAX)
                && !(currCode >= UPPERCASE_MIN && currCode <= UPPERCASE_MAX));
        }));
        if (containsNonLetters) {
            errorMessages.push(INVALID_STRING_ERRORS.LETTERS_ONLY);
        }
    }
    // apply numerical requirement
    if (opts.numbersOnly) {
        const containsNonNumbers = (cleanedValue
            // split into characters
            .split('')
            // convert into character codes
            .map((curr) => {
            return curr.charCodeAt(0);
        })
            // check for non-numbers
            .some((currCode) => {
            return (!(currCode >= DIGIT_MIN && currCode <= DIGIT_MAX));
        }));
        if (containsNonNumbers) {
            errorMessages.push(INVALID_STRING_ERRORS.NUMBERS_ONLY);
        }
    }
    // apply regex requirement
    if (opts.regexTest) {
        const regex = opts.regexTest;
        // validate and create customized error message if description is provided
        const result = validateRegex({
            input: cleanedValue,
            regex,
            regexDescription: opts.regexDescription,
        });
        // if string did not pass regex validation, add error message
        if (result.isValid === false) {
            errorMessages.push(result.errorMessage);
        }
    }
    // combine all error messages into one string to return
    const errorMessage = `${INVALID_STRING_ERRORS.MESSAGE_INTRO}${genCommaList(errorMessages)}.`;
    return (
    // if no error messages, string is valid; if not, it is invalid
    errorMessages.length === 0
        ? {
            isValid: true,
            cleanedValue,
        }
        : {
            isValid: false,
            errorMessage,
        });
};

// Import React
// Regular express that matches urls
const urlRegex = /(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,6}(:[0-9]{1,5})?(\/\S*)?/g;
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
const makeLinksClickable = (text, opts) => {
    // Search text for links
    let matches = urlRegex.exec(text);
    // If no matches, just return the text
    if (!matches) {
        return text;
    }
    // Check if using new tab
    const newTab = opts === null || opts === void 0 ? void 0 : opts.newTab;
    // Next element key
    let nextKey = 0;
    // Process each link
    const elements = [];
    let lastIndex = 0;
    while (matches) {
        // Get the link
        const link = matches[0];
        // Get the index of the link
        const { index } = matches;
        // Add the text before the link
        elements.push(React__default["default"].createElement("span", { key: nextKey += 1 }, text.substring(lastIndex, index)));
        // Add the link
        elements.push(React__default["default"].createElement("a", { key: nextKey += 1, href: link, target: newTab ? '_blank' : undefined, rel: newTab ? 'noopener noreferrer' : undefined, style: {
                textDecoration: 'underline',
                color: (opts === null || opts === void 0 ? void 0 : opts.inheritColor) ? 'inherit' : undefined,
            }, onClick: (e) => {
                // Prevent propagation if requested
                if (opts === null || opts === void 0 ? void 0 : opts.preventPropagation) {
                    e.stopPropagation();
                }
            } }, link));
        // Update the last index
        lastIndex = index + link.length;
        // Get the next match
        matches = urlRegex.exec(text);
    }
    // Add the last bit of text
    const remainingText = text.substring(lastIndex);
    if (remainingText && remainingText.length > 0) {
        elements.push(React__default["default"].createElement("span", { key: nextKey += 1 }, remainingText));
    }
    // Return the elements
    return elements;
};

// Constants
const VOWELS = ['a', 'e', 'i', 'o', 'u'];
/**
 * Prefix a word or name with "a" or "an" depending on whether it starts with a
 *   vowel or not
 * @author Gabe Abrams
 * @param text the text to prefix
 * @param capitalize whether to capitalize the "A" or "An"
 * @returns the text prefixed with "a" or "an"
 */
const prefixWithAOrAn = (text, capitalize = false) => {
    // Get the first letter
    const firstLetter = text.charAt(0).toLowerCase();
    // Check if starts with vowel
    const startsWithVowel = VOWELS.includes(firstLetter);
    // Determine prefix
    let prefix = startsWithVowel ? 'an' : 'a';
    if (capitalize) {
        prefix = prefix.charAt(0).toUpperCase() + prefix.substring(1);
    }
    // Return the text prefixed with "a" or "an"
    return `${prefix} ${text}`;
};

/* -------- State Definition -------- */
/* ------------- Reducer ------------ */
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 */
const reducer = (state) => {
    return {
        renderCount: state.renderCount + 1,
    };
};
/* -------------- Main -------------- */
/**
 * Create a function that forces a render of a component. Use this only when
 *   absolutely necessary
 * @author Gabe Abrams
 * @param useReducer the useReducer hook
 * @returns forceRender function
 */
const useForceRender = (useReducer) => {
    // Initial state
    const initialState = {
        renderCount: 0,
    };
    // Initialize state
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, dispatch] = useReducer(reducer, initialState);
    // Create and return the forceRender function
    return () => {
        dispatch();
    };
};

/**
 * Run the operator function on each item in the array, returning true if
 *   the operator function returns true for every item in the array
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply. If it returns true
 *   for every item, this function will return true
 * @returns true if the operator function returns true for every item in the array
 */
const everyAsync = (array, operatorFunction) => __awaiter(void 0, void 0, void 0, function* () {
    // Create break logic
    let done = false;
    /**
     * Break the loop (checking stops here)
     * @author Gabe Abrams
     */
    const breakNow = () => {
        done = true;
    };
    // Loop through each item, checking
    for (let i = 0; i < array.length && !done; i++) {
        const passed = yield operatorFunction(array[i], i, {
            breakNow,
            array,
        });
        // Check if this one failed or if loop was broken
        if (!passed || done) {
            return false;
        }
    }
    // Return true because none returned false
    return true;
});

/**
 * Run the operator function on each item in the array, returning a new array
 *   that only contains the items that pass the filter
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply. If it returns true
 *   for an item, the item will be included in the returned array
 * @returns the filtered array
 */
const filterAsync = (array, operatorFunction) => __awaiter(void 0, void 0, void 0, function* () {
    // Create break logic
    let done = false;
    /**
     * Break the loop (filtering stops here)
     * @author Gabe Abrams
     */
    const breakNow = () => {
        done = true;
    };
    // Loop through each item, filtering
    const output = [];
    for (let i = 0; i < array.length && !done; i++) {
        const included = yield operatorFunction(array[i], i, {
            breakNow,
            array,
        });
        if (included && !done) {
            output.push(array[i]);
        }
    }
    // Return results
    return output;
});

/**
 * Run the operator function on each item in the array
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply
 */
const forEachAsync = (array, operatorFunction) => __awaiter(void 0, void 0, void 0, function* () {
    // Create break logic
    let done = false;
    /**
     * Break the loop
     * @author Gabe Abrams
     */
    const breakNow = () => {
        done = true;
    };
    // Loop through each item
    for (let i = 0; i < array.length && !done; i++) {
        yield operatorFunction(array[i], i, {
            breakNow,
            array,
        });
    }
});

/**
 * Run the operator function on each item in the array, collecting all results
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply
 * @returns the array of results
 */
const mapAsync = (array, operatorFunction) => __awaiter(void 0, void 0, void 0, function* () {
    // Create break logic
    let done = false;
    /**
     * Break the loop
     * @author Gabe Abrams
     */
    const breakNow = () => {
        done = true;
    };
    // Loop through each item, collecting results
    const results = [];
    for (let i = 0; i < array.length && !done; i++) {
        const result = yield operatorFunction(array[i], i, {
            breakNow,
            array,
        });
        results.push(result);
    }
    // Return results
    return results;
});

/**
 * Run the operator function on each item in the array, returning true if
 *   the operator function returns true for any item in the array
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply. If it returns true
 *   for any item, this function will return true
 * @returns true if the operator function returns true for any item in the array
 */
const someAsync = (array, operatorFunction) => __awaiter(void 0, void 0, void 0, function* () {
    // Create break logic
    let done = false;
    /**
     * Break the loop (checking stops here)
     * @author Gabe Abrams
     */
    const breakNow = () => {
        done = true;
    };
    // Loop through each item, checking
    for (let i = 0; i < array.length && !done; i++) {
        const passed = yield operatorFunction(array[i], i, {
            breakNow,
            array,
        });
        if (passed && !done) {
            return true;
        }
    }
    // Return false because none returned true
    return false;
});

/**
 * Capitalize every word in a string (just the first letter)
 * @param str string to capitalize
 * @returns string with every word capitalized
 */
const capitalize = (str) => {
    return (str
        // Split into words
        .split(' ')
        // Capitalize first letter of each word
        .map((word) => {
        return word.charAt(0).toUpperCase() + word.substring(1);
    })
        // Join back together
        .join(' '));
};

/**
 * Shuffle a given array
 * @author Austen Money
 * @param arr the array to shuffle
 * @returns the shuffled array
 */
const shuffleArray = (arr) => {
    const newArr = [...arr];
    // Shuffle using Durstenfeld algorithm
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

/**
 * Sends and retries an http request
 * @author Gabriel Abrams
 * @param opts object containing all arguments
 * @param opts.path path to send request to
 * @param [opts.host] host to send request to
 * @param [opts.method=GET] http method to use
 * @param [opts.params] body/data to include in the request
 * @param [opts.headers] headers to include in the request
 * @param [opts.sendCrossDomainCredentials=true if in development mode] if true,
 *   send cross-domain credentials even if not in dev mode
 * @param [opts.responseType=JSON] expected response type
 * @returns { body, status, headers } on success
 */
const sendServerToServerRequest = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Process method
    const method = (opts.method || 'GET');
    // Encode objects within params
    let params;
    if (opts.params) {
        params = {};
        Object.entries(opts.params).forEach(([key, val]) => {
            if (typeof val === 'object' && !Array.isArray(val)) {
                params[key] = JSON.stringify(val);
            }
            else {
                params[key] = val;
            }
        });
    }
    // Stringify parameters
    const stringifiedParams = qs__default["default"].stringify(params || {}, {
        encodeValuesOnly: true,
        arrayFormat: 'brackets',
    });
    // Create url (include query if GET)
    const query = (method === 'GET' ? `?${stringifiedParams}` : '');
    let url;
    if (!opts.host) {
        // No host included at all. Just send to a path
        url = `${opts.path}${query}`;
    }
    else {
        url = `https://${opts.host}${opts.path}${query}`;
    }
    // Update headers
    const headers = opts.headers || {};
    let data = null;
    if (!headers['Content-Type']) {
        // Form encoded
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        // Add data if applicable
        data = (method !== 'GET' ? stringifiedParams : null);
    }
    else {
        // JSON encode
        data = params;
    }
    // Encode data
    let encodedData;
    if (data) {
        if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            encodedData = new URLSearchParams(params);
        }
        else {
            encodedData = JSON.stringify(data);
        }
    }
    // Send request
    try {
        const response = yield fetch(url, {
            method,
            mode: 'cors',
            headers: headers !== null && headers !== void 0 ? headers : {},
            body: ((method !== 'GET' && encodedData)
                ? encodedData
                : undefined),
            redirect: 'follow',
        });
        // Get headers map
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
        });
        // Process response based on responseType
        try {
            // Parse response
            let responseBody;
            if (opts.responseType
                && opts.responseType === 'Text') {
                // Response type is text
                responseBody = yield response.text();
            }
            else {
                // Response type is JSON
                responseBody = yield response.json();
            }
            // Return response
            return {
                body: responseBody,
                status: response.status,
                headers: responseHeaders,
            };
        }
        catch (err) {
            throw new ErrorWithCode(`Failed to parse response as ${opts.responseType}: ${err === null || err === void 0 ? void 0 : err.message}`, ReactKitErrorCode$1.ResponseParseError);
        }
    }
    catch (err) {
        // Self-signed certificate error:
        if ((_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.includes('self signed certificate')) {
            throw new ErrorWithCode('We refused to send a request because the receiver has self-signed certificates.', ReactKitErrorCode$1.SelfSigned);
        }
        // No tries left
        throw new ErrorWithCode(`We encountered an error when trying to send a network request. If this issue persists, contact an admin. Error: ${err === null || err === void 0 ? void 0 : err.message}`, ReactKitErrorCode$1.NotConnected);
    }
});

/**
 * Send a server-to-server request from this sever to another server that uses
 *   dce-reactkit [for server only]
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.host - the host of the other server
 * @param opts.path - the path of the other server's endpoint
 * @param [opts.method=GET] - the method of the endpoint
 * @param [opts.params] - query/body parameters to include
 * @param [opts.headers] - headers to include
 * @returns response from server
 */
const visitEndpointOnAnotherServer = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Remove properties with undefined values
    let params;
    if (opts.params) {
        params = Object.fromEntries(Object
            .entries(opts.params)
            .filter(([, value]) => {
            return value !== undefined;
        }));
    }
    // Automatically JSONify arrays and objects
    if (params) {
        params = Object.fromEntries(Object
            .entries(params)
            .map(([key, value]) => {
            if (Array.isArray(value) || typeof value === 'object') {
                return [key, JSON.stringify(value)];
            }
            return [key, value];
        }));
    }
    // Send the request
    const response = yield sendServerToServerRequest({
        host: opts.host,
        path: opts.path,
        method: (_a = opts.method) !== null && _a !== void 0 ? _a : 'GET',
        params,
    });
    // Check for failure
    if (!response || !response.body) {
        throw new ErrorWithCode('We didn\'t get a response from the server. Please check your internet connection.', ReactKitErrorCode$1.NoResponse);
    }
    if (!response.body.success) {
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
exports.AutoscrollToBottomContainer = AutoscrollToBottomContainer;
exports.ButtonInputGroup = ButtonInputGroup;
exports.CSVDownloadButton = CSVDownloadButton;
exports.CheckboxButton = CheckboxButton;
exports.CopiableBox = CopiableBox;
exports.DAY_IN_MS = DAY_IN_MS;
exports.DBEntryFieldType = DBEntryFieldType$1;
exports.DBEntryManagerPanel = DBEntryManagerPanel;
exports.DayOfWeek = DayOfWeek$1;
exports.Drawer = Drawer;
exports.Dropdown = Dropdown;
exports.DropdownItemType = DropdownItemType$1;
exports.DynamicWord = DynamicWord;
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
exports.MultiSwitch = MultiSwitch;
exports.ParamType = ParamType$1;
exports.PopFailureMark = PopFailureMark;
exports.PopPendingMark = PopPendingMark;
exports.PopSuccessMark = PopSuccessMark;
exports.RadioButton = RadioButton;
exports.ReactKitErrorCode = ReactKitErrorCode$1;
exports.SimpleDateChooser = SimpleDateChooser;
exports.TabBox = TabBox;
exports.ToggleSwitch = ToggleSwitch;
exports.Tooltip = Tooltip;
exports.Variant = Variant$1;
exports.abbreviate = abbreviate;
exports.addDBEditorEndpoints = addDBEditorEndpoints;
exports.addFatalErrorHandler = addFatalErrorHandler;
exports.alert = alert;
exports.avg = avg;
exports.canReviewLogs = canReviewLogs;
exports.capitalize = capitalize;
exports.ceilToNumDecimals = ceilToNumDecimals;
exports.combineClassNames = combineClassNames;
exports.compareArraysByProp = compareArraysByProp;
exports.confirm = confirm;
exports.everyAsync = everyAsync;
exports.extractProp = extractProp;
exports.filterAsync = filterAsync;
exports.floorToNumDecimals = floorToNumDecimals;
exports.forEachAsync = forEachAsync;
exports.forceNumIntoBounds = forceNumIntoBounds;
exports.genCSV = genCSV;
exports.genCommaList = genCommaList;
exports.genRouteHandler = genRouteHandler;
exports.getHumanReadableDate = getHumanReadableDate;
exports.getLocalTimeInfo = getLocalTimeInfo;
exports.getMonthName = getMonthName;
exports.getOrdinal = getOrdinal;
exports.getPartOfDay = getPartOfDay;
exports.getTimeInfoInET = getTimeInfoInET;
exports.handleError = handleError;
exports.handleSuccess = handleSuccess;
exports.idify = idify;
exports.initClient = initClient;
exports.initLogCollection = initLogCollection;
exports.initServer = initServer;
exports.isMobileOrTablet = isMobileOrTablet;
exports.leaveToURL = leaveToURL;
exports.logClientEvent = logClientEvent;
exports.makeLinksClickable = makeLinksClickable;
exports.mapAsync = mapAsync;
exports.onlyKeepLetters = onlyKeepLetters;
exports.padDecimalZeros = padDecimalZeros;
exports.padZerosLeft = padZerosLeft;
exports.parallelLimit = parallelLimit;
exports.prefixWithAOrAn = prefixWithAOrAn;
exports.prompt = prompt;
exports.roundToNumDecimals = roundToNumDecimals;
exports.setClientEventMetadataPopulator = setClientEventMetadataPopulator;
exports.showFatalError = showFatalError;
exports.shuffleArray = shuffleArray;
exports.someAsync = someAsync;
exports.startMinWait = startMinWait;
exports.stringsToHumanReadableList = stringsToHumanReadableList;
exports.stubServerEndpoint = stubServerEndpoint;
exports.sum = sum;
exports.useForceRender = useForceRender;
exports.validateEmail = validateEmail;
exports.validatePhoneNumber = validatePhoneNumber;
exports.validateString = validateString;
exports.visitEndpointOnAnotherServer = visitEndpointOnAnotherServer;
exports.visitServerEndpoint = visitServerEndpoint;
exports.waitMs = waitMs;
//# sourceMappingURL=index.js.map
