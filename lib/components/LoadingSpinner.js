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
/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/
var style = "\n/* Blips */\n.LoadingSpinner-blip-1,\n.LoadingSpinner-blip-2,\n.LoadingSpinner-blip-3,\n.LoadingSpinner-blip-4 {\n  font-size: 25px;\n  opacity: 0.6;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n\n/* First Blip */\n.LoadingSpinner-blip-1 {\n  animation: LoadingSpinner-pop-animation 2s infinite;\n}\n\n/* Second Blip */\n.LoadingSpinner-blip-2 {\n  animation: LoadingSpinner-pop-animation 2s infinite;\n  -webkit-animation-delay: 0.1s;\n  animation-delay: 0.1s;\n}\n\n/* Third Blip */\n.LoadingSpinner-blip-3 {\n  animation: LoadingSpinner-pop-animation 2s infinite;\n  animation-delay: 0.2s;\n}\n\n/* Fourth Blip */\n.LoadingSpinner-blip-4 {\n  animation: LoadingSpinner-pop-animation 2s infinite;\n  animation-delay: 0.3s;\n}\n\n/* Pop Animation for Each Blip */\n@keyframes LoadingSpinner-pop-animation {\n  0%  {\n    transform: scale(1.0);\n  }\n  10% {\n    transform: scale(1.5);\n  }\n  30% {\n    transform: scale(1.0);\n  }\n  100% {\n    transform: scale(1.0);\n  }\n}\n";
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
var LoadingSpinner = function () {
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    // Add all four blips to a container
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-center LoadingSpinner LoadingSpinner-container" }, { children: [(0, jsx_runtime_1.jsx)("style", { children: style }), (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCircle, className: "LoadingSpinner-blip-1 me-1" }), (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCircle, className: "LoadingSpinner-blip-2 me-1" }), (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCircle, className: "LoadingSpinner-blip-3 me-1" }), (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCircle, className: "LoadingSpinner-blip-4" })] })));
};
/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/
// Export component
exports.default = LoadingSpinner;
//# sourceMappingURL=LoadingSpinner.js.map