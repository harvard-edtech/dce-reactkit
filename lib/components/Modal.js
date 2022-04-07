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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/**
 * A generic popup modal
 * @author Gabe Abrams
 */
// Import React
var react_1 = require("react");
// Import other components
var Modal_1 = __importDefault(require("react-bootstrap/Modal"));
var waitMs_1 = __importDefault(require("../helpers/waitMs"));
// Import types
var Variant_1 = __importDefault(require("../types/Variant"));
/*------------------------------------------------------------------------*/
/*                                Constants                               */
/*------------------------------------------------------------------------*/
// Constants
var MS_TO_ANIMATE = 400; // Time to animate in/out (defined by bootstrap)
var MS_ANIMATE_IN_DELAY = 10;
// Time to wait before animating in (must be >0 or animation won't trigger)
// Modal types
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
// Modal sizes
var ModalSize;
(function (ModalSize) {
    ModalSize["Small"] = "sm";
    ModalSize["Medium"] = "md";
    ModalSize["Large"] = "lg";
    ModalSize["ExtraLarge"] = "xl";
})(ModalSize || (ModalSize = {}));
// Button types
var ButtonType;
(function (ButtonType) {
    ButtonType["Okay"] = "okay";
    ButtonType["Cancel"] = "cancel";
    ButtonType["Yes"] = "yes";
    ButtonType["No"] = "no";
    ButtonType["Abandon"] = "abandon";
    ButtonType["GoBack"] = "goBack";
    ButtonType["Continue"] = "continue";
    ButtonType["ImSure"] = "imSure";
    ButtonType["Delete"] = "delete";
    ButtonType["Confirm"] = "confirm";
})(ButtonType || (ButtonType = {}));
// Modal type to list of buttons
var modalTypeToButtonTypes = (_a = {},
    _a[ModalType.Okay] = [
        ButtonType.Okay,
    ],
    _a[ModalType.OkayCancel] = [
        ButtonType.Okay,
        ButtonType.Cancel,
    ],
    _a[ModalType.YesNo] = [
        ButtonType.Yes,
        ButtonType.No,
    ],
    _a[ModalType.YesNoCancel] = [
        ButtonType.Yes,
        ButtonType.No,
        ButtonType.Cancel,
    ],
    _a[ModalType.AbandonGoBack] = [
        ButtonType.Abandon,
        ButtonType.GoBack,
    ],
    _a[ModalType.ImSureCancel] = [
        ButtonType.ImSure,
        ButtonType.Cancel,
    ],
    _a[ModalType.DeleteCancel] = [
        ButtonType.Delete,
        ButtonType.Cancel,
    ],
    _a[ModalType.ConfirmCancel] = [
        ButtonType.Confirm,
        ButtonType.Cancel,
    ],
    _a);
// Button type styling and labels
var buttonTypeToLabelAndVariant = (_b = {},
    _b[ButtonType.Okay] = {
        label: 'Okay',
        variant: Variant_1.default.Dark,
    },
    _b[ButtonType.Cancel] = {
        label: 'Cancel',
        variant: Variant_1.default.Secondary,
    },
    _b[ButtonType.Yes] = {
        label: 'Yes',
        variant: Variant_1.default.Dark,
    },
    _b[ButtonType.No] = {
        label: 'No',
        variant: Variant_1.default.Secondary,
    },
    _b[ButtonType.Abandon] = {
        label: 'Abandon Changes',
        variant: Variant_1.default.Warning,
    },
    _b[ButtonType.GoBack] = {
        label: 'Go Back',
        variant: Variant_1.default.Secondary,
    },
    _b[ButtonType.Continue] = {
        label: 'Continue',
        variant: Variant_1.default.Dark,
    },
    _b[ButtonType.ImSure] = {
        label: 'I am sure',
        variant: Variant_1.default.Warning,
    },
    _b[ButtonType.Delete] = {
        label: 'Yes, Delete',
        variant: Variant_1.default.Danger,
    },
    _b[ButtonType.Confirm] = {
        label: 'Confirm',
        variant: Variant_1.default.Dark,
    },
    _b);
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
var Modal = function (props) {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    var _a;
    /* -------------- Props ------------- */
    var _b = props.type, type = _b === void 0 ? ModalType.NoButtons : _b, _c = props.size, size = _c === void 0 ? ModalSize.Large : _c, title = props.title, children = props.children, onClose = props.onClose;
    /* -------------- State ------------- */
    // If true, the modal is shown
    var _d = (0, react_1.useState)(false), visible = _d[0], setVisible = _d[1];
    // True if currently animating in
    var _e = (0, react_1.useState)(false), animatingIn = _e[0], setAnimatingIn = _e[1];
    /*------------------------------------------------------------------------*/
    /*                           Lifecycle Functions                          */
    /*------------------------------------------------------------------------*/
    /**
     * Mount
     * @author Gabe Abrams
     */
    (0, react_1.useEffect)(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Start the component animating in
                    return [4 /*yield*/, (0, waitMs_1.default)(MS_ANIMATE_IN_DELAY)];
                    case 1:
                        // Start the component animating in
                        _a.sent();
                        setAnimatingIn(true);
                        // Wait and then set visible to true
                        return [4 /*yield*/, (0, waitMs_1.default)(MS_TO_ANIMATE)];
                    case 2:
                        // Wait and then set visible to true
                        _a.sent();
                        setVisible(true);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    /*------------------------------------------------------------------------*/
    /*                           Component Functions                          */
    /*------------------------------------------------------------------------*/
    /**
     * Handles the closing of the modal
     * @author Gabe Abrams
     * @param buttonType the button that was clicked when closing the
     *   modal
     */
    var handleClose = function (buttonType) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Don't close if no handler
                    if (!onClose) {
                        return [2 /*return*/];
                    }
                    // Don't close if animating in
                    if (animatingIn) {
                        return [2 /*return*/];
                    }
                    // Don't close if already closed
                    if (!visible) {
                        return [2 /*return*/];
                    }
                    // Update the state
                    setVisible(false);
                    // Call the handler after the modal has animated out
                    return [4 /*yield*/, (0, waitMs_1.default)(MS_TO_ANIMATE)];
                case 1:
                    // Call the handler after the modal has animated out
                    _a.sent();
                    onClose(buttonType);
                    return [2 /*return*/];
            }
        });
    }); };
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Footer                 */
    /*----------------------------------------*/
    // Get list of buttons for this modal type
    var buttonTypes = (_a = modalTypeToButtonTypes[type]) !== null && _a !== void 0 ? _a : [];
    // Create buttons
    var buttons = buttonTypes.map(function (buttonType, i) {
        // Get default style
        var _a = buttonTypeToLabelAndVariant[buttonType], label = _a.label, variant = _a.variant;
        // Override with customizations
        if (props["".concat(buttonType, "Label")]) {
            label = props["".concat(buttonType, "Label")];
        }
        if (props["".concat(buttonType, "Variant")]) {
            variant = props["".concat(buttonType, "Variant")];
        }
        // Check if this button is last
        var last = (i === buttonTypes.length - 1);
        // Create the button
        return ((0, jsx_runtime_1.jsx)("button", __assign({ type: "button", className: "Modal-".concat(buttonType, "-button btn btn-").concat(variant, " ").concat(last ? '' : 'mr-1'), onClick: function () {
                handleClose(buttonType);
            } }, { children: label })));
    });
    // Put all buttons in a footer
    var footer = ((buttons && buttons.length)
        ? ((0, jsx_runtime_1.jsx)("div", { children: buttons }))
        : undefined);
    // Render the modal
    return ((0, jsx_runtime_1.jsxs)(Modal_1.default, __assign({ show: visible, size: size !== ModalSize.Medium ? size : undefined, onHide: function () {
            handleClose(ButtonType.Cancel);
        }, style: { zIndex: 5000000000 }, backdropClassName: "Modal-backdrop", centered: true }, { children: [title && ((0, jsx_runtime_1.jsx)(Modal_1.default.Header, __assign({ closeButton: !!onClose }, { children: (0, jsx_runtime_1.jsx)(Modal_1.default.Title, { children: title }) }))), children && ((0, jsx_runtime_1.jsx)(Modal_1.default.Body, { children: children })), footer && ((0, jsx_runtime_1.jsx)(Modal_1.default.Footer, { children: footer }))] })));
};
/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/
// Add enums
Modal.ModalType = ModalType;
Modal.ModalSize = ModalSize;
Modal.ButtonType = ButtonType;
Modal.Variant = Variant_1.default;
exports.default = Modal;
//# sourceMappingURL=Modal.js.map