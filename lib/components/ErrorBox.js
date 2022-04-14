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
var jsx_runtime_1 = require("react/jsx-runtime");
// Import FontAwesome Icons
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
// Import shared types
var ReactKitErrorCode_1 = __importDefault(require("../types/ReactKitErrorCode"));
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
var ErrorBox = function (props) {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    var _a;
    /* -------------- Props ------------- */
    var error = props.error, _b = props.title, title = _b === void 0 ? 'An Error Occurred' : _b, onClose = props.onClose;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    // Determine error text
    var errorText = (typeof error === 'string'
        ? error.trim()
        : String(error.message || 'An unknown error occurred. Please contact support.'));
    // Error code box
    var errorCodeBox;
    if (error && error.code) {
        errorCodeBox = ((0, jsx_runtime_1.jsxs)("span", { children: [' ', (0, jsx_runtime_1.jsxs)("span", __assign({ style: {
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        paddingLeft: '3px',
                        paddingRight: '3px',
                        color: '#DC4150',
                        fontVariant: 'small-caps',
                        fontSize: '80%',
                        whiteSpace: 'nowrap',
                    } }, { children: ["code:", ' ', String((_a = error.code) !== null && _a !== void 0 ? _a : ReactKitErrorCode_1.default.NoCode).toUpperCase()] }))] }));
    }
    // Main UI
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "alert alert-danger text-center", style: {
            maxWidth: '650px',
            margin: 'auto',
        } }, { children: [(0, jsx_runtime_1.jsxs)("h4", __assign({ className: "mb-1" }, { children: [(0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faExclamationTriangle, className: "me-2" }), title] })), (0, jsx_runtime_1.jsxs)("div", { children: [errorText, errorCodeBox] }), onClose && ((0, jsx_runtime_1.jsx)("div", __assign({ className: "mt-2" }, { children: (0, jsx_runtime_1.jsx)("button", __assign({ type: "button", className: "btn btn-light", "aria-label": "dismiss error and close this activity or view", onClick: onClose }, { children: "Close" })) })))] })));
};
/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/
// Export component
exports.default = ErrorBox;
//# sourceMappingURL=ErrorBox.js.map