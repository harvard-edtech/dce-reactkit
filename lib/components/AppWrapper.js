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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showFatalError = exports.confirm = exports.alert = void 0;
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
// Import shared components
var Modal_1 = __importDefault(require("./Modal"));
// Import custom errors
var ErrorWithCode_1 = __importDefault(require("../errors/ErrorWithCode"));
/*------------------------------------------------------------------------*/
/*                             Static Helpers                             */
/*------------------------------------------------------------------------*/
/*----------------------------------------*/
/*                  Alert                 */
/*----------------------------------------*/
// Stored copies of setters
var setAlertInfo;
var onAlertClosed;
/**
 * Show an alert modal with an "Okay" button
 * @author Gabe Abrams
 * @param title the title text to display at the top of the alert
 * @param text the text to display in the alert
 */
var alert = function (title, text) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Fallback if alert not available
        if (!setAlertInfo) {
            return [2 /*return*/, window.alert("".concat(title, "\n\n").concat(text))];
        }
        // Return promise that resolves when alert is closed
        return [2 /*return*/, new Promise(function (resolve) {
                // Setup handler
                onAlertClosed = function () {
                    resolve(null);
                };
                // Show the alert
                setAlertInfo({
                    title: title,
                    text: text,
                });
            })];
    });
}); };
exports.alert = alert;
/*----------------------------------------*/
/*                 Confirm                */
/*----------------------------------------*/
// Stored copies of setters
var setConfirmInfo;
var onConfirmClosed;
/**
 * Show a confirmation modal with an "Okay" and a "Cancel" button
 * @author Gabe Abrams
 * @param title the title text to display at the top of the alert
 * @param text the text to display in the alert
 * @returns true if the user confirmed
 */
var confirm = function (title, text) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Fallback if confirm is not available
        if (!setConfirmInfo) {
            return [2 /*return*/, window.confirm("".concat(title, "\n\n").concat(text))];
        }
        // Return promise that resolves with result of confirmation
        return [2 /*return*/, new Promise(function (resolve) {
                // Setup handler
                onConfirmClosed = function (confirmed) {
                    resolve(confirmed);
                };
                // Show the confirm
                setConfirmInfo({
                    title: title,
                    text: text,
                });
            })];
    });
}); };
exports.confirm = confirm;
/*----------------------------------------*/
/*               Fatal Error              */
/*----------------------------------------*/
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
        return (0, exports.alert)(errorTitle, "".concat(message, " (code: ").concat(code, "). Please contact support."));
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
    var _b = (0, react_1.useState)(), fatalErrorMessage = _b[0], setFatalErrorMessageInner = _b[1];
    setFatalErrorMessage = setFatalErrorMessageInner;
    var _c = (0, react_1.useState)(), fatalErrorCode = _c[0], setFatalErrorCodeInner = _c[1];
    setFatalErrorCode = setFatalErrorCodeInner;
    var _d = (0, react_1.useState)(), fatalErrorTitle = _d[0], setFatalErrorTitleInner = _d[1];
    setFatalErrorTitle = setFatalErrorTitleInner;
    // Alert
    var _e = (0, react_1.useState)(), alertInfo = _e[0], setAlertInfoInner = _e[1];
    setAlertInfo = setAlertInfoInner;
    // Confirm
    var _f = (0, react_1.useState)(), confirmInfo = _f[0], setConfirmInfoInner = _f[1];
    setConfirmInfo = setConfirmInfoInner;
    // Session expired
    var _g = (0, react_1.useState)(false), sessionHasExpired = _g[0], setSessionHasExpired = _g[1];
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
    /*                  Modal                 */
    /*----------------------------------------*/
    // Modal that may be defined
    var modal;
    /* -------------- Alert ------------- */
    if (alertInfo) {
        modal = ((0, jsx_runtime_1.jsx)(Modal_1.default, __assign({ title: alertInfo.title, type: Modal_1.default.ModalType.Okay, onClose: function () {
                // Alert closed
                if (onAlertClosed) {
                    onAlertClosed();
                }
            }, onTopOfOtherModals: true }, { children: alertInfo.text })));
    }
    /* ------------- Confirm ------------ */
    if (confirmInfo) {
        modal = ((0, jsx_runtime_1.jsx)(Modal_1.default, { title: confirmInfo.title, type: Modal_1.default.ModalType.OkayCancel, onClose: function (buttonType) {
                if (onConfirmClosed) {
                    onConfirmClosed(buttonType === Modal_1.default.ButtonType.Okay);
                }
            }, dontAllowBackdropExit: true }));
    }
    /*----------------------------------------*/
    /*                  Views                 */
    /*----------------------------------------*/
    // Body that will be filled with the current view
    var body;
    /* ----------- Fatal Error ---------- */
    if (fatalErrorMessage || fatalErrorCode || sessionHasExpired) {
        // Re-encapsulate in an error
        var error = (sessionHasExpired
            ? new ErrorWithCode_1.default(fatalErrorMessage, fatalErrorCode)
            : new ErrorWithCode_1.default(sessionExpiredMessage, ReactKitErrorCode_1.default.SessionExpired));
        // Build error screen
        body = ((0, jsx_runtime_1.jsx)("div", __assign({ style: {
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
    /* --------------- App -------------- */
    if (!body) {
        body = ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }));
    }
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [modal, body] }));
};
/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/
// Export component
exports.default = AppWrapper;
//# sourceMappingURL=AppWrapper.js.map