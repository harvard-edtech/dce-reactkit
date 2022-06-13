import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCircle, faDotCircle, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faCircle$1, faSquare } from '@fortawesome/free-regular-svg-icons';

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
const style$3 = `
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
  .Modal-fading-out {
    animation-name: Modal-fading-out;
    animation-duration: ${MS_TO_ANIMATE}ms;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    animation-timing-function: ease-in;
  }
  @keyframes Modal-fading-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
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
  .Modal-animating-out {
    animation-name: Modal-animating-out;
    animation-duration: ${MS_TO_ANIMATE}ms;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    animation-timing-function: ease-in;
  }
  @keyframes Modal-animating-out {
    0% {
      transform: scale(1) translate(0, 0);
      opacity: 1;
    }
    100% {
      transform: scale(1.05) translate(0, -1.5rem);
      opacity: 0;
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
    const [animatingOut, setAnimatingOut] = useState(false);
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
            setAnimatingOut(false);
            // Wait for animation
            yield waitMs(MS_TO_ANIMATE);
            // Update to state after animated in
            setVisible(true);
            setAnimatingIn(false);
        }))();
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
        // Don't close if animating in
        if (animatingIn) {
            return;
        }
        // Don't close if already closed
        if (!visible) {
            return;
        }
        // Update the state
        setVisible(false);
        setAnimatingOut(true);
        // Call the handler after the modal has animated out
        yield waitMs(MS_TO_ANIMATE);
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
    else if (animatingOut) {
        animationClass = 'Modal-animating-out';
        backdropAnimationClass = 'Modal-fading-out';
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
        React.createElement("style", null, style$3),
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
        throw new ErrorWithCode(`The request could not be sent because the AppWrapper component does not have a copy of sendRequest from CACCL.\nIf you are currently writing tests for your app, this means you did not properly stub the server response.\nMethod: ${opts.method}\nPath: ${opts.path}`, ReactKitErrorCode$1.NoCACCLSendRequestFunction);
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
const style$2 = `
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
        React.createElement("style", null, style$2),
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
const style$1 = `
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
    const { title, children, noBottomPadding, } = props;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    // Full UI
    return (React.createElement("div", { className: `TabBox-container ${noBottomPadding ? '' : 'mb-2'}` },
        React.createElement("style", null, style$1),
        React.createElement("div", { className: "TabBox-title-container" },
            React.createElement("div", { className: "TabBox-title" }, title)),
        React.createElement("div", { className: "TabBox-box p-2" },
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
    const { text, onChanged, ariaLabel, title, checked, id, noMarginOnRight, checkedVariant = Variant$1.Secondary, uncheckedVariant = Variant$1.Light, small, } = props;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                Main UI                 */
    /*----------------------------------------*/
    return (React.createElement("button", { type: "button", id: id, title: title, className: `btn btn-${checked ? checkedVariant : uncheckedVariant}${checked ? ' selected' : ''}${small ? ' btn-sm' : ''} m-0${noMarginOnRight ? '' : ' me-1'}`, "aria-label": `${ariaLabel}${checked ? ': currently checked' : ''}`, onClick: () => {
            onChanged(!checked);
        } },
        React.createElement(FontAwesomeIcon, { icon: checked ? faCheckSquare : faSquare, className: "me-1" }),
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
const style = `
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
        React.createElement("style", null, style),
        children));
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
    if (!stubResponses[method][path]) {
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
    }
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
    var _a, _b, _c, _d;
    // Handle stubs
    const stubResponse = (_b = stubResponses[(_a = opts.method) !== null && _a !== void 0 ? _a : 'GET']) === null || _b === void 0 ? void 0 : _b[opts.path];
    if (stubResponse) {
        // Remove stub
        try {
            delete stubResponses[(_c = opts.method) !== null && _c !== void 0 ? _c : 'GET'][opts.path];
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
        method: (_d = opts.method) !== null && _d !== void 0 ? _d : 'GET',
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
 *   req (express request object), res (express response object),
 *   next (express next function). Params also has userId, userFirstName,
 *   userLastName, isLearner, isTTM, isAdmin, and any other variables that
 *   are directly added to the session
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
        if (!launched || !launchInfo) {
            return handleError(res, {
                message: 'Your session has expired. Please refresh the page and try again.',
                code: ReactKitErrorCode$1.SessionExpired,
                status: 440,
            });
        }
        // Error if user info cannot be found
        if (!launchInfo.userId
            || !launchInfo.userFirstName
            || !launchInfo.userLastName
            || (launchInfo.notInCourse
                && !launchInfo.isAdmin)
            || (!launchInfo.isTTM
                && !launchInfo.isLearner
                && !launchInfo.isAdmin)) {
            return handleError(res, {
                message: 'Your session was invalid. Please refresh the page and try again.',
                code: ReactKitErrorCode$1.SessionExpired,
                status: 440,
            });
        }
        // Add launch info to output
        output.userId = launchInfo.userId;
        output.userFirstName = launchInfo.userFirstName;
        output.userLastName = launchInfo.userLastName;
        output.userEmail = launchInfo.userEmail;
        output.isLearner = !!launchInfo.isLearner;
        output.isTTM = !!launchInfo.isTTM;
        output.isAdmin = !!launchInfo.isAdmin;
        output.courseId = ((_b = output.courseId) !== null && _b !== void 0 ? _b : launchInfo.courseId);
        output.courseName = launchInfo.contextLabel;
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
        try {
            const results = yield opts.handler({
                params: output,
                req,
                res,
                next,
            });
            // Send results to client
            handleSuccess(res, results !== null && results !== void 0 ? results : undefined);
        }
        catch (err) {
            // Send error to client
            handleError(res, err);
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

export { AppWrapper, ButtonInputGroup, CheckboxButton, Drawer, ErrorBox, ErrorWithCode, LoadingSpinner, Modal, ModalButtonType$1 as ModalButtonType, ModalSize$1 as ModalSize, ModalType$1 as ModalType, ParamType$1 as ParamType, RadioButton, ReactKitErrorCode$1 as ReactKitErrorCode, SimpleDateChooser, TabBox, Variant$1 as Variant, abbreviate, alert$1 as alert, avg, ceilToNumDecimals, confirm, floorToNumDecimals, forceNumIntoBounds, genRouteHandler, getOrdinal, getTimeInfoInET, handleError, handleSuccess, initServer, padDecimalZeros, padZerosLeft, roundToNumDecimals, showFatalError, stubServerEndpoint, sum, visitServerEndpoint, waitMs };
//# sourceMappingURL=index.js.map
