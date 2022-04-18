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
/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/
var style = "\n/* Tab Box */\n.TabBox-box {\n  /* Light Border */\n  border: 2px solid #dedede;\n  \n  /* Rounded Corners (except top-left) */\n  border-bottom-right-radius: 5px;\n  border-bottom-left-radius: 5px;\n  border-top-right-radius: 5px;\n\n  /* Very Light Gray Border */\n  background: #fdfdfd;\n\n  /* Align Contents on Left */\n  text-align: left;\n}\n\n/* Container for Title */\n.TabBox-title-container {\n  /* Place on Left */\n  position: relative;\n  left: 0;\n  text-align: left;\n}\n\n/* Tab-style Title */\n.TabBox-title {\n  /* Place so it Barely Overlaps the Box Border */\n  display: inline-block;\n  position: relative;\n  top: 2px; /* Gives Illusion that Border Doesn't Exist Below Tab */\n\n  /* Title-sized Font */\n  font-size: 25px;\n\n  /* Add Border on Top and Sides */\n  border-top: 2px solid #dedede;\n  border-left: 2px solid #dedede;\n  border-right: 2px solid #dedede;\n\n  /* Round the Top Corners */\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n\n  /* Add Text Padding */\n  padding-left: 12px;\n  padding-right: 12px;\n\n  /* Match Background Color of Box */\n  background: #fdfdfd;\n}\n\n/* Make the TabBox's Children Appear Above Title if Overlap Occurs */\n.TabBox-children {\n  position: relative;\n  z-index: 1;\n}\n";
/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/
var TabBox = function (props) {
    /*------------------------------------------------------------------------*/
    /*                                  Setup                                 */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    var title = props.title, children = props.children;
    /*------------------------------------------------------------------------*/
    /*                                 Render                                 */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /*                 Main UI                */
    /*----------------------------------------*/
    // Full UI
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("style", { children: style }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "TabBox-title-container" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "TabBox-title" }, { children: title })) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "TabBox-box p-2" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "TabBox-children" }, { children: children })) }))] }));
};
/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/
// Export component
exports.default = TabBox;
//# sourceMappingURL=TabBox.js.map