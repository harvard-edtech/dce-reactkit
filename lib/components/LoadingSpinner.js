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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Loading spinner/indicator
 * @author Gabe Abrams
 */
// Import FontAwesome Icons
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
// Import style
require("./LoadingSpinner.scss");
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
var LoadingSpinner = function () {
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    // Add all four blips to a container
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-center LoadingSpinner LoadingSpinner-container" }, { children: [(0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCircle, className: "LoadingSpinner-blip-1 me-1" }), (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCircle, className: "LoadingSpinner-blip-2 me-1" }), (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCircle, className: "LoadingSpinner-blip-3 me-1" }), (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCircle, className: "LoadingSpinner-blip-4" })] })));
};
/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/
// Export component
exports.default = LoadingSpinner;
//# sourceMappingURL=LoadingSpinner.js.map