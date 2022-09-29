import React, { useState, useRef, useEffect, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCircle, faDotCircle, faCheckSquare, faHourglass, faClipboard, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faCircle$1, faSquareMinus, faSquare } from '@fortawesome/free-regular-svg-icons';

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

// Highest error code = DRK10
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
        errorCodeBox = (React.createElement("span", null,
            ' ',
            React.createElement("span", { style: {
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
    return (React.createElement("div", { className: "alert alert-danger text-center", style: {
            maxWidth: '40rem',
            margin: 'auto',
        } },
        React.createElement("h4", { className: "mb-1" },
            React.createElement(FontAwesomeIcon, { icon: faExclamationTriangle, className: "me-2" }),
            title),
        React.createElement("div", null,
            errorText,
            errorCodeBox),
        onClose && (React.createElement("div", { className: "mt-2" },
            React.createElement("button", { type: "button", className: "btn btn-light", "aria-label": "dismiss error and close this activity or view", onClick: onClose }, "Close")))));
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
const style$6 = `
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
    const [visible, setVisible] = useState(false);
    // True if animation is in use
    const [animatingIn, setAnimatingIn] = useState(true);
    const [animatingPop, setAnimatingPop] = useState(false);
    // Keep track of whether modal is still mounted
    const mounted = useRef(false);
    /*------------------------------------------------------------------------*/
    /*                           Lifecycle Functions                          */
    /*------------------------------------------------------------------------*/
    /**
     * Mount
     * @author Gabe Abrams
     */
    useEffect(() => {
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
        return (React.createElement("button", { key: ModalButtonType, type: "button", className: `Modal-${ModalButtonType}-button btn btn-${variant} ${last ? '' : 'me-1'}`, onClick: () => {
                handleClose(ModalButtonType);
            } }, label));
    });
    // Put all buttons in a footer
    const footer = ((buttons && buttons.length)
        ? (React.createElement("div", null, buttons))
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
    return (React.createElement("div", { className: `modal show modal-dialog-scrollable modal-dialog-centered`, tabIndex: -1, style: {
            zIndex: (onTopOfOtherModals
                ? 5000000001
                : 5000000000),
            display: 'block',
            margin: 'auto',
            left: 0,
            right: 0,
        } },
        React.createElement("style", null, style$6),
        React.createElement("div", { className: `Modal-backdrop ${backdropAnimationClass}`, style: {
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
        React.createElement("div", { className: `modal-dialog modal-${size} ${animationClass}`, style: {
                zIndex: 5000000002,
            } },
            React.createElement("div", { className: "modal-content" },
                React.createElement("div", { className: "modal-header" },
                    React.createElement("h5", { className: "modal-title", style: {
                            fontWeight: 'bold',
                        } }, title),
                    onClose && (React.createElement("button", { type: "button", className: "btn-close", "aria-label": "Close", onClick: () => {
                            // Handle close
                            handleClose(ModalButtonType$1.Cancel);
                        } }))),
                children && (React.createElement("div", { className: "modal-body" }, children)),
                footer && (React.createElement("div", { className: "modal-footer pt-1 pb-1" }, footer))))));
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
 * @author Gabe Abrams
 * @param title the title text to display at the top of the alert
 * @param text the text to display in the alert
 * @returns true if the user confirmed
 */
const confirm = (title, text) => __awaiter(void 0, void 0, void 0, function* () {
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
    const [fatalErrorMessage, setFatalErrorMessageInner,] = useState();
    setFatalErrorMessage = setFatalErrorMessageInner;
    const [fatalErrorCode, setFatalErrorCodeInner,] = useState();
    setFatalErrorCode = setFatalErrorCodeInner;
    const [fatalErrorTitle, setFatalErrorTitleInner,] = useState();
    setFatalErrorTitle = setFatalErrorTitleInner;
    // Alert
    const [alertInfo, setAlertInfoInner,] = useState(undefined);
    setAlertInfo = setAlertInfoInner;
    // Confirm
    const [confirmInfo, setConfirmInfoInner,] = useState(undefined);
    setConfirmInfo = setConfirmInfoInner;
    // Session expired
    const [sessionHasExpired, setSessionHasExpiredInner,] = useState(false);
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
        modal = (React.createElement(Modal, { key: `alert-${alertInfo.title}-${alertInfo.text}`, title: alertInfo.title, type: ModalType$1.Okay, onClose: () => {
                // Alert closed
                setAlertInfo(undefined);
                if (onAlertClosed) {
                    onAlertClosed();
                }
            }, onTopOfOtherModals: true }, alertInfo.text));
    }
    /* ------------- Confirm ------------ */
    if (confirmInfo) {
        modal = (React.createElement(Modal, { key: `confirm-${confirmInfo.title}-${confirmInfo.text}`, title: confirmInfo.title, type: ModalType$1.OkayCancel, onClose: (buttonType) => {
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
        body = (React.createElement("div", { style: {
                display: 'block',
                width: '100vw',
                minHeight: '100vh',
                paddingTop: '2rem',
                backgroundColor: (dark
                    ? '#222'
                    : '#fff'),
            } },
            React.createElement(ErrorBox, { title: (sessionHasExpired
                    ? 'Session Expired'
                    : fatalErrorTitle), error: error })));
    }
    /* --------------- App -------------- */
    if (!body) {
        body = (React.createElement(React.Fragment, null, children));
    }
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    return (React.createElement(React.Fragment, null,
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
const style$5 = `
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
    return (React.createElement("div", { className: "text-center LoadingSpinner LoadingSpinner-container" },
        React.createElement("style", null, style$5),
        React.createElement(FontAwesomeIcon, { icon: faCircle, className: "LoadingSpinner-blip-1 me-1" }),
        React.createElement(FontAwesomeIcon, { icon: faCircle, className: "LoadingSpinner-blip-2 me-1" }),
        React.createElement(FontAwesomeIcon, { icon: faCircle, className: "LoadingSpinner-blip-3 me-1" }),
        React.createElement(FontAwesomeIcon, { icon: faCircle, className: "LoadingSpinner-blip-4" })));
};

/**
 * A box with a tab on the top that holds buttons and other content
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/
const style$4 = `
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
    return (React.createElement("div", { className: `TabBox-container ${noBottomMargin ? '' : 'mb-2'}` },
        React.createElement("style", null, style$4),
        React.createElement("div", { className: "TabBox-title-container" },
            React.createElement("div", { className: "TabBox-title" }, title)),
        React.createElement("div", { className: `TabBox-box ps-2 pt-2 pe-2 ${noBottomPadding ? '' : 'pb-2'}` },
            React.createElement("div", { className: "TabBox-children" }, children))));
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
    return (React.createElement("button", { type: "button", id: id, title: title, className: `btn btn-${selected ? selectedVariant : unselectedVariant}${selected ? ' selected' : ''}${small ? ' btn-sm' : ''} m-0${noMarginOnRight ? '' : ' me-1'}`, "aria-label": `${ariaLabel}${selected ? ': currently selected' : ''}`, onClick: () => {
            if (!selected) {
                onSelected();
            }
        } },
        React.createElement(FontAwesomeIcon, { icon: selected ? faDotCircle : faCircle$1, className: "me-1" }),
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
        icon = faCheckSquare;
    }
    else {
        icon = (dashed
            ? faSquareMinus
            : faSquare);
    }
    // Create the button
    return (React.createElement("button", { type: "button", id: id, title: title, className: `CheckboxButton-status-${checked ? 'checked' : 'unchecked'} ${dashed ? 'CheckboxButton-dashed ' : ''}btn btn-${checked ? checkedVariant : uncheckedVariant}${checked ? ' selected' : ''}${small ? ' btn-sm' : ''} m-0${noMarginOnRight ? '' : ' me-1'} ${className !== null && className !== void 0 ? className : ''}`, "aria-label": `${ariaLabel}${checked ? ': currently checked' : ''}`, onClick: () => {
            onChanged(!checked);
        } },
        React.createElement(FontAwesomeIcon, { icon: icon, className: "me-1" }),
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
    const { label, minLabelWidth, children, } = props;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    return (React.createElement("div", { className: "input-group" },
        React.createElement("div", { className: "input-group-prepend d-flex w-100" },
            React.createElement("span", { className: "input-group-text", style: {
                    minWidth: (minLabelWidth !== null && minLabelWidth !== void 0 ? minLabelWidth : undefined),
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                } }, label),
            React.createElement("span", { className: "input-group-text flex-grow-1 rounded-right", style: {
                    backgroundColor: 'white',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderLeftWidth: 0,
                } }, children))));
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
 * A very simple, lightweight date chooser
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                Constants                               */
/*------------------------------------------------------------------------*/
// Constants
const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
const SimpleDateChooser = (props) => {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    var _a;
    /* -------------- Props ------------- */
    const { ariaLabel, name, month, day, year, onChange, } = props;
    const numMonthsToShow = Math.min((_a = props.numMonthsToShow) !== null && _a !== void 0 ? _a : 6, 12);
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                Main UI                 */
    /*----------------------------------------*/
    // Determine the set of choices allowed
    const today = getTimeInfoInET();
    const choices = [];
    for (let i = 0; i < numMonthsToShow; i++) {
        // Get month and year info
        const unmoddedMonth = (today.month + i);
        const month = (unmoddedMonth > 12
            ? unmoddedMonth - 12
            : unmoddedMonth);
        const monthName = MONTH_NAMES[month - 1];
        const year = (unmoddedMonth > 12
            ? today.year + 1
            : today.year);
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
        monthOptions.push(React.createElement("option", { key: choice.month, value: choice.month, "aria-label": `choose ${choice.choiceName}`, onSelect: () => {
                onChange(choice.month, choice.days[0], choice.year);
            } }, choice.choiceName));
        if (month === choice.month) {
            // This is the currently selected month
            // Create day options
            choice.days.forEach((dayChoice) => {
                const ordinal = getOrdinal(dayChoice);
                dayOptions.push(React.createElement("option", { key: dayChoice, value: dayChoice, "aria-label": `choose date ${dayChoice}` },
                    dayChoice,
                    ordinal));
            });
        }
    });
    return (React.createElement("div", { className: "SimpleDateChooser d-inline-block", "aria-label": `date chooser with selected date: ${month} ${day}, ${year}` },
        React.createElement("select", { "aria-label": `month for ${ariaLabel}`, className: "custom-select d-inline-block mr-1", style: { width: 'auto' }, id: `SimpleDateChooser-${name}-month`, value: month, onChange: (e) => {
                const choice = choices[e.target.selectedIndex];
                // Change day, month, and year
                onChange(choice.month, choice.days[0], choice.year);
            } }, monthOptions),
        React.createElement("select", { "aria-label": `day for ${ariaLabel}`, className: "custom-select d-inline-block", style: { width: 'auto' }, id: `SimpleDateChooser-${name}-day`, value: day, onChange: (e) => {
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
const style$3 = `
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
    return (React.createElement("div", { className: "Drawer-container" },
        React.createElement("style", null, style$3),
        children));
};

/**
 * Success checkmark that pops into view
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/
const style$2 = `
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
    return (React.createElement("div", { className: `PopSuccessMark-outer-container bg-${circleVariant}`, style: {
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
        }, "aria-label": "checkmark indicating success" },
        React.createElement("style", null, style$2),
        React.createElement("div", { className: `PopSuccessMark-check-stroke-1 bg-${checkVariant}`, style: {
                borderRadius: `${sizeRem / 5}rem`,
            } }),
        React.createElement("div", { className: `PopSuccessMark-check-stroke-2 bg-${checkVariant}`, style: {
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
const style$1 = `
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
    return (React.createElement("div", { className: `PopFailureMark-outer-container bg-${circleVariant}`, style: {
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
        }, "aria-label": "mark indicating failure" },
        React.createElement("style", null, style$1),
        React.createElement("div", { className: `PopFailureMark-x-stroke-1 bg-${xVariant}`, style: {
                borderRadius: `${sizeRem / 5}rem`,
            } }),
        React.createElement("div", { className: `PopFailureMark-x-stroke-2 bg-${xVariant}`, style: {
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
const style = `
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
    return (React.createElement("div", { className: `PopPendingMark-outer-container bg-${circleVariant}`, style: {
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
        }, "aria-label": "mark indicating that the item is pending" },
        React.createElement("style", null, style),
        React.createElement("div", null,
            React.createElement(FontAwesomeIcon, { icon: faHourglass, className: `PopPendingMark-hourglass text-${hourglassVariant}`, style: {
                    fontSize: `${sizeRem * 0.6}rem`,
                } }))));
};

/**
 * Copiable text box
 * @author Gabe Abrams
 */
/* ------------- Actions ------------ */
// Types of actions
var ActionType$1;
(function (ActionType) {
    // Indicate that the text was recently copied
    ActionType["IndicateRecentlyCopied"] = "indicate-recently-copied";
    // Clear the status
    ActionType["ClearRecentlyCopiedStatus"] = "clear-recently-copied-status";
})(ActionType$1 || (ActionType$1 = {}));
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer$1 = (state, action) => {
    switch (action.type) {
        case ActionType$1.IndicateRecentlyCopied: {
            return {
                recentlyCopied: true,
            };
        }
        case ActionType$1.ClearRecentlyCopiedStatus: {
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
    const [state, dispatch] = useReducer(reducer$1, initialState);
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
            type: ActionType$1.IndicateRecentlyCopied,
        });
        // Wait a moment
        yield waitMs(4000);
        // Hide copied notice
        dispatch({
            type: ActionType$1.ClearRecentlyCopiedStatus,
        });
    });
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    return (React.createElement("div", { className: "input-group mb-2" },
        (label || labelIcon) && (React.createElement("span", { className: "input-group-text", style: {
                minWidth: (minLabelWidthRem
                    ? `${minLabelWidthRem}rem`
                    : undefined),
            } },
            labelIcon && (React.createElement(FontAwesomeIcon, { icon: labelIcon, className: label ? 'me-1' : undefined })),
            label)),
        multiline
            ? (React.createElement("textarea", { id: textAreaId, className: "CopiableBox-text CopiableBox-text-multiline form-control bg-white text-dark", value: text, "aria-label": `${label} text`, rows: numVisibleLines, onClick: onClick, style: {
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
            : (React.createElement("input", { id: textAreaId, type: "text", className: "CopiableBox-text CopiableBox-text-single-line form-control bg-white text-dark", value: text, "aria-label": `${label} text`, onClick: onClick, style: {
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
        React.createElement("button", { id: copyButtonId, className: "btn btn-secondary", type: "button", "aria-label": `copy ${label} to the clipboard`, disabled: recentlyCopied, style: {
                minWidth: '5.2rem',
            }, onClick: performCopy }, recentlyCopied
            ? 'Copied!'
            : (React.createElement("span", null,
                React.createElement(FontAwesomeIcon, { icon: faClipboard, className: "me-1" }),
                "Copy")))));
};

/**
 * Reusable nested item picker
 * @author Yuen Ler Chow
 */
/* ------------- Actions ------------ */
// Types of actions
var ActionType;
(function (ActionType) {
    // Toggle whether the children are being shown
    ActionType["ToggleItems"] = "toggle-items";
})(ActionType || (ActionType = {}));
/**
 * Reducer that executes actions
 * @author Yuen Ler Chow
 * @param state current state
 * @param action action to execute
 */
const reducer = (state, action) => {
    switch (action.type) {
        case ActionType.ToggleItems: {
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
    const [state, dispatch] = useReducer(reducer, initialState);
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
    return (React.createElement("div", null, items.map((item) => {
        return (React.createElement("div", { key: item.id },
            React.createElement("span", { className: "NestableItemList-dropdown-button-container d-inline-block", style: {
                    minWidth: '2rem',
                } }, item.isGroup && (React.createElement("button", { className: `NestableItemList-dropdown-button NestableItemList-dropdown-button-${item.id}`, style: {
                    border: 0,
                    backgroundColor: 'transparent',
                }, type: "button", onClick: () => {
                    dispatch({
                        type: ActionType.ToggleItems,
                    });
                }, "aria-label": `${isShowingItems ? 'Hide' : 'Show'} items in ${item.name}` },
                React.createElement(FontAwesomeIcon, { icon: isShowingItems ? faChevronDown : faChevronRight })))),
            React.createElement(CheckboxButton, { className: `NestableItemList-CheckboxButton-${item.id}`, text: item.name, checked: item.isGroup ? allChecked(item.children) : item.checked, dashed: item.isGroup ? !noneChecked(item.children) : false, onChanged: (checked) => {
                    onChanged(changeChecked(item.id, checked, items));
                }, ariaLabel: `Select ${item.name}`, checkedVariant: Variant$1.Light }),
            item.isGroup && isShowingItems && (React.createElement("div", { className: "NestableItemList-children-container", style: {
                    paddingLeft: '2.2rem',
                } },
                React.createElement(NestableItemList, { items: item.children, onChanged: (updatedItems) => {
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
    const { title, items, onChanged, } = props;
    /*------------------------------------------------------------------------*/
    /*                           Component Functions                          */
    /*------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    return (React.createElement(TabBox, { title: title },
        React.createElement("div", { style: { overflowX: 'auto' } },
            React.createElement(NestableItemList, { items: items, onChanged: onChanged }))));
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

// Import custom error
// Stored copy of caccl functions
let _cacclGetLaunchInfo;
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
/*------------------------------------------------------------------------*/
/*                                  Main                                  */
/*------------------------------------------------------------------------*/
/**
 * Prepare dce-reactkit to run on the server
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.getLaunchInfo CACCL LTI's get launch info function
 */
const initServer = (opts) => {
    _cacclGetLaunchInfo = opts.getLaunchInfo;
};

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
        (!launchInfo.userId
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
            var _a;
            const html = genErrorPage(opts);
            send(html, (_a = opts.status) !== null && _a !== void 0 ? _a : 500);
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
            });
            // Send results to client (only if next wasn't called)
            if (!responseSent) {
                return handleSuccess(res, results !== null && results !== void 0 ? results : undefined);
            }
        }
        catch (err) {
            // Send error to client (only if next wasn't called)
            if (!responseSent) {
                return handleError(res, err);
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

// Map of month to three letter description
const monthMap = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
};
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
    // Create start of description
    let description = `${monthMap[month]} ${day}${getOrdinal(day)}`;
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

export { AppWrapper, ButtonInputGroup, CheckboxButton, CopiableBox, DAY_IN_MS, DayOfWeek$1 as DayOfWeek, Drawer, ErrorBox, ErrorWithCode, HOUR_IN_MS, ItemPicker, LoadingSpinner, MINUTE_IN_MS, Modal, ModalButtonType$1 as ModalButtonType, ModalSize$1 as ModalSize, ModalType$1 as ModalType, ParamType$1 as ParamType, PopFailureMark, PopPendingMark, PopSuccessMark, RadioButton, ReactKitErrorCode$1 as ReactKitErrorCode, SimpleDateChooser, TabBox, Variant$1 as Variant, abbreviate, alert$1 as alert, avg, ceilToNumDecimals, confirm, floorToNumDecimals, forceNumIntoBounds, genRouteHandler, getHumanReadableDate, getOrdinal, getPartOfDay, getTimeInfoInET, handleError, handleSuccess, initServer, onlyKeepLetters, padDecimalZeros, padZerosLeft, parallelLimit, roundToNumDecimals, showFatalError, startMinWait, stringsToHumanReadableList, stubServerEndpoint, sum, visitServerEndpoint, waitMs };
//# sourceMappingURL=index.js.map
