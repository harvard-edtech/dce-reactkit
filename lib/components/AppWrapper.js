"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showFatalError = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
/**
 * A wrapper for the entire React app that adds global functionality like
 *   handling for fatal error messages
 * @author Gabe Abrams
 */
// Import React
var react_1 = require("react");
// Import shared components
var ErrorBox_1 = __importDefault(require("./ErrorBox"));
// Import helpers
var visitServerEndpoint_1 = require("../helpers/visitServerEndpoint");
// Import shared types
var ReactKitErrorCode_1 = __importDefault(require("../types/ReactKitErrorCode"));
// Import custom errors
var ErrorWithCode_1 = __importDefault(require("../errors/ErrorWithCode"));
/*------------------------------------------------------------------------*/
/*                             Static Helpers                             */
/*------------------------------------------------------------------------*/
// Stored copies of setters
var setFatalErrorMessage;
var setFatalErrorCode;
var setFatalErrorTitle;
/**
 * Show a fatal error message
 * @author Gabe Abrams
 * @param error the error to show
 * @param [errorTitle] title of the error box
 */
var showFatalError = function (error, errorTitle) {
    var _a, _b;
    if (errorTitle === void 0) { errorTitle = 'An Error Occurred'; }
    // Determine message and code
    var message = (typeof error === 'string'
        ? error.trim()
        : String((_a = error.message) !== null && _a !== void 0 ? _a : 'An unknown error occurred.'));
    var code = (typeof error === 'string'
        ? ReactKitErrorCode_1.default.NoCode
        : String((_b = error.code) !== null && _b !== void 0 ? _b : ReactKitErrorCode_1.default.NoCode));
    // Handle case where app hasn't loaded
    if (!setFatalErrorMessage || !setFatalErrorCode) {
        return alert("An error has occurred: ".concat(message, " (code: ").concat(code, "). Please contact support."));
    }
    // Use setters
    setFatalErrorMessage(message);
    setFatalErrorCode(code);
    setFatalErrorTitle(errorTitle);
};
exports.showFatalError = showFatalError;
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
var AppWrapper = function (props) {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    var children = props.children, dark = props.dark, _a = props.sessionExpiredMessage, sessionExpiredMessage = _a === void 0 ? 'Your session has expired. Please go back to Canvas and start over.' : _a;
    /* -------------- State ------------- */
    // Fatal error
    var _b = (0, react_1.useState)(null), fatalErrorMessage = _b[0], setFatalErrorMessageInner = _b[1];
    setFatalErrorMessage = setFatalErrorMessageInner;
    var _c = (0, react_1.useState)(null), fatalErrorCode = _c[0], setFatalErrorCodeInner = _c[1];
    setFatalErrorCode = setFatalErrorCodeInner;
    var _d = (0, react_1.useState)(null), fatalErrorTitle = _d[0], setFatalErrorTitleInner = _d[1];
    setFatalErrorTitle = setFatalErrorTitleInner;
    // Session expired
    var _e = (0, react_1.useState)(false), sessionHasExpired = _e[0], setSessionHasExpired = _e[1];
    /*------------------------------------------------------------------------*/
    /*                           Lifecycle Functions                          */
    /*------------------------------------------------------------------------*/
    /**
     * Mount
     * @author Gabe Abrams
     */
    (0, react_1.useEffect)(function () {
        // Add session expired handler
        (0, visitServerEndpoint_1.setSessionExpiryHandler)(function () {
            // Session expired!
            setSessionHasExpired(true);
        });
    }, []);
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    // Show error
    if (fatalErrorMessage || fatalErrorCode || sessionHasExpired) {
        // Re-encapsulate in an error
        var error = (sessionHasExpired
            ? new ErrorWithCode_1.default(fatalErrorMessage, fatalErrorCode)
            : new ErrorWithCode_1.default(sessionExpiredMessage, ReactKitErrorCode_1.default.SessionExpired));
        // Build error screen
        return ((0, jsx_runtime_1.jsx)("div", __assign({ style: {
                display: 'block',
                width: '100vw',
                minHeight: '100vh',
                paddingTop: '10rem',
                backgroundColor: (dark
                    ? '#222'
                    : '#fff'),
            } }, { children: (0, jsx_runtime_1.jsx)(ErrorBox_1.default, { title: (sessionHasExpired
                    ? 'Session Expired'
                    : fatalErrorTitle), error: error }) })));
    }
    // Show the app itself
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }));
};
/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/
// Export component
exports.default = AppWrapper;
//# sourceMappingURL=AppWrapper.js.map