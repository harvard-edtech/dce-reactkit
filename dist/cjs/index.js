'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');

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

// Highest error code = DRK2
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
                    borderRadius: '5px',
                    paddingLeft: '3px',
                    paddingRight: '3px',
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
            maxWidth: '650px',
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
const MS_TO_ANIMATE = 400; // Animation duration
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
const style$2 = `
  .Modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vw;
    background-color: rgba(0, 0, 0, 0.7);

    animation-name: Modal-animating-in;
    animation-duration: ${Math.floor(MS_TO_ANIMATE / 2)}ms;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    animation-timing-function: ease-out;
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
      transform: scale(1.05);
      opacity: 0;
    }
    100% {
      transform: scale(1);
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
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.05);
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
    const [visible, setVisible] = React.useState(false);
    // True if animation is in use
    const [animatingIn, setAnimatingIn] = React.useState(true);
    const [animatingPop, setAnimatingPop] = React.useState(false);
    const [animatingOut, setAnimatingOut] = React.useState(false);
    /*------------------------------------------------------------------------*/
    /*                           Lifecycle Functions                          */
    /*------------------------------------------------------------------------*/
    /**
     * Mount
     * @author Gabe Abrams
     */
    React.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            // Wait and then set visible to true
            yield waitMs(MS_TO_ANIMATE);
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
        return (React__default["default"].createElement("button", { type: "button", className: `Modal-${ModalButtonType}-button btn btn-${variant} ${last ? '' : 'mr-1'}`, onClick: () => {
                handleClose(ModalButtonType);
            } }, label));
    });
    // Put all buttons in a footer
    const footer = ((buttons && buttons.length)
        ? (React__default["default"].createElement("div", null, buttons))
        : undefined);
    // Choose an animation
    let animationClass = '';
    if (animatingIn) {
        animationClass = 'Modal-animating-in';
    }
    else if (animatingOut) {
        animationClass = 'Modal-animating-out';
    }
    else if (animatingPop) {
        animationClass = 'Modal-animating-pop';
    }
    // Render the modal
    return (React__default["default"].createElement("div", { className: `modal show modal-dialog-scrollable modal-dialog-centered modal-${size}`, tabIndex: -1, style: {
            zIndex: (onTopOfOtherModals
                ? 5000000001
                : 5000000000),
            display: 'block',
            margin: 'auto',
            left: 0,
            right: 0,
        } },
        React__default["default"].createElement("style", null, style$2),
        React__default["default"].createElement("div", { className: "Modal-backdrop", style: {
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
        React__default["default"].createElement("div", { className: `modal-dialog ${animationClass}`, style: {
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
 * A wrapper for the entire React app that adds global functionality like
 *   handling for fatal error messages, adds bootstrap support
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/*                             Static Helpers                             */
/*------------------------------------------------------------------------*/
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
const alert = (title, text) => __awaiter(void 0, void 0, void 0, function* () {
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
        alert(errorTitle, `${message} (code: ${code}). Please contact support.`);
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
    const { children, dark, sessionExpiredMessage = 'Your session has expired. Please go back to Canvas and start over.', } = props;
    /* -------------- State ------------- */
    // Fatal error
    const [fatalErrorMessage, setFatalErrorMessageInner,] = React.useState();
    setFatalErrorMessage = setFatalErrorMessageInner;
    const [fatalErrorCode, setFatalErrorCodeInner,] = React.useState();
    setFatalErrorCode = setFatalErrorCodeInner;
    const [fatalErrorTitle, setFatalErrorTitleInner,] = React.useState();
    setFatalErrorTitle = setFatalErrorTitleInner;
    // Alert
    const [alertInfo, setAlertInfoInner,] = React.useState();
    setAlertInfo = setAlertInfoInner;
    // Confirm
    const [confirmInfo, setConfirmInfoInner,] = React.useState();
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
        modal = (React__default["default"].createElement(Modal, { title: alertInfo.title, type: ModalType$1.Okay, onClose: () => {
                // Alert closed
                if (onAlertClosed) {
                    onAlertClosed();
                }
            }, onTopOfOtherModals: true }, alertInfo.text));
    }
    /* ------------- Confirm ------------ */
    if (confirmInfo) {
        modal = (React__default["default"].createElement(Modal, { title: confirmInfo.title, type: ModalType$1.OkayCancel, onClose: (buttonType) => {
                if (onConfirmClosed) {
                    onConfirmClosed(buttonType === ModalButtonType$1.Okay);
                }
            }, dontAllowBackdropExit: true }));
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
            ? new ErrorWithCode((fatalErrorMessage !== null && fatalErrorMessage !== void 0 ? fatalErrorMessage : 'An unknown error has occurred. Please contact support.'), (fatalErrorCode !== null && fatalErrorCode !== void 0 ? fatalErrorCode : ReactKitErrorCode$1.NoCode))
            : new ErrorWithCode(sessionExpiredMessage, ReactKitErrorCode$1.SessionExpired));
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
const style$1 = `
/* Blips */
.LoadingSpinner-blip-1,
.LoadingSpinner-blip-2,
.LoadingSpinner-blip-3,
.LoadingSpinner-blip-4 {
  font-size: 25px;
  opacity: 0.6;
  margin-top: 20px;
  margin-bottom: 20px;
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
        React__default["default"].createElement("style", null, style$1),
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
const style = `
/* Tab Box */
.TabBox-box {
  /* Light Border */
  border: 2px solid #dedede;
  
  /* Rounded Corners (except top-left) */
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;

  /* Very Light Gray Border */
  background: #fdfdfd;

  /* Align Contents on Left */
  text-align: left;
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
  top: 2px; /* Gives Illusion that Border Doesn't Exist Below Tab */

  /* Title-sized Font */
  font-size: 25px;

  /* Add Border on Top and Sides */
  border-top: 2px solid #dedede;
  border-left: 2px solid #dedede;
  border-right: 2px solid #dedede;

  /* Round the Top Corners */
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  /* Add Text Padding */
  padding-left: 12px;
  padding-right: 12px;

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
    const { title, children, } = props;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    // Full UI
    return (React__default["default"].createElement("div", null,
        React__default["default"].createElement("style", null, style),
        React__default["default"].createElement("div", { className: "TabBox-title-container" },
            React__default["default"].createElement("div", { className: "TabBox-title" }, title)),
        React__default["default"].createElement("div", { className: "TabBox-box p-2" },
            React__default["default"].createElement("div", { className: "TabBox-children" }, children))));
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

exports.AppWrapper = AppWrapper;
exports.ErrorBox = ErrorBox;
exports.ErrorWithCode = ErrorWithCode;
exports.LoadingSpinner = LoadingSpinner;
exports.Modal = Modal;
exports.ModalButtonType = ModalButtonType$1;
exports.ModalSize = ModalSize$1;
exports.ModalType = ModalType$1;
exports.ReactKitErrorCode = ReactKitErrorCode$1;
exports.TabBox = TabBox;
exports.Variant = Variant$1;
exports.abbreviate = abbreviate;
exports.alert = alert;
exports.avg = avg;
exports.ceilToNumDecimals = ceilToNumDecimals;
exports.confirm = confirm;
exports.floorToNumDecimals = floorToNumDecimals;
exports.forceNumIntoBounds = forceNumIntoBounds;
exports.padDecimalZeros = padDecimalZeros;
exports.padZerosLeft = padZerosLeft;
exports.roundToNumDecimals = roundToNumDecimals;
exports.showFatalError = showFatalError;
exports.sum = sum;
exports.waitMs = waitMs;
//# sourceMappingURL=index.js.map
