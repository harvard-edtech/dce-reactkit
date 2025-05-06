'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var reactFontawesome = require('@fortawesome/react-fontawesome');
var freeRegularSvgIcons = require('@fortawesome/free-regular-svg-icons');
var clone = require('nanoclone');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var clone__default = /*#__PURE__*/_interopDefaultLegacy(clone);

/*! *****************************************************************************
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

// Highest error code = DRK36
/**
 * List of error codes built into the react kit
 * @author Gabe Abrams
 */
var ReactKitErrorCode;
(function (ReactKitErrorCode) {
    ReactKitErrorCode["NoResponse"] = "DRK1";
    ReactKitErrorCode["NoCode"] = "DRK2";
    ReactKitErrorCode["SessionExpired"] = "DRK3";
    ReactKitErrorCode["NoCACCLSendRequestFunction"] = "DRK7";
    ReactKitErrorCode["SimpleDateChooserInvalidDateRange"] = "DRK35";
    ReactKitErrorCode["SimpleDateChooserInvalidNumMonths"] = "DRK36";
})(ReactKitErrorCode || (ReactKitErrorCode = {}));
var ReactKitErrorCode$1 = ReactKitErrorCode;

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
 * Displays an error
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const ErrorBox = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    var _a;
    /* -------------- Props ------------- */
    const { error, title = 'An Error Occurred', onClose, variant = Variant$1.Danger, icon = freeSolidSvgIcons.faExclamationTriangle, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
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
    return (React__default["default"].createElement("div", { className: `alert alert-${variant} text-center`, style: {
            maxWidth: '40rem',
            margin: 'auto',
        } },
        React__default["default"].createElement("h4", { className: "mb-1" },
            React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: icon, className: "me-2" }),
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
    ModalType["Cancel"] = "cancel";
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
 * Built-in metadata for logs
 * @author Gabe Abrams
 */
const LogBuiltInMetadata = {
    // Contexts
    Context: {
        Uncategorized: 'Uncategorized',
        ServerRenderedErrorPage: 'ServerRenderedErrorPage',
        ServerEndpointError: 'ServerEndpointError',
        ClientFatalError: 'ClientFatalError',
    },
    // Targets
    Target: {
        NoTarget: 'NoTarget',
    },
};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var reactDom = {exports: {}};

var reactDom_production = {};

/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactDom_production;

function requireReactDom_production () {
	if (hasRequiredReactDom_production) return reactDom_production;
	hasRequiredReactDom_production = 1;
	var React = React__default["default"];
	function formatProdErrorMessage(code) {
	  var url = "https://react.dev/errors/" + code;
	  if (1 < arguments.length) {
	    url += "?args[]=" + encodeURIComponent(arguments[1]);
	    for (var i = 2; i < arguments.length; i++)
	      url += "&args[]=" + encodeURIComponent(arguments[i]);
	  }
	  return (
	    "Minified React error #" +
	    code +
	    "; visit " +
	    url +
	    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
	  );
	}
	function noop() {}
	var Internals = {
	    d: {
	      f: noop,
	      r: function () {
	        throw Error(formatProdErrorMessage(522));
	      },
	      D: noop,
	      C: noop,
	      L: noop,
	      m: noop,
	      X: noop,
	      S: noop,
	      M: noop
	    },
	    p: 0,
	    findDOMNode: null
	  },
	  REACT_PORTAL_TYPE = Symbol.for("react.portal");
	function createPortal$1(children, containerInfo, implementation) {
	  var key =
	    3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
	  return {
	    $$typeof: REACT_PORTAL_TYPE,
	    key: null == key ? null : "" + key,
	    children: children,
	    containerInfo: containerInfo,
	    implementation: implementation
	  };
	}
	var ReactSharedInternals =
	  React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function getCrossOriginStringAs(as, input) {
	  if ("font" === as) return "";
	  if ("string" === typeof input)
	    return "use-credentials" === input ? input : "";
	}
	reactDom_production.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
	  Internals;
	reactDom_production.createPortal = function (children, container) {
	  var key =
	    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
	  if (
	    !container ||
	    (1 !== container.nodeType &&
	      9 !== container.nodeType &&
	      11 !== container.nodeType)
	  )
	    throw Error(formatProdErrorMessage(299));
	  return createPortal$1(children, container, null, key);
	};
	reactDom_production.flushSync = function (fn) {
	  var previousTransition = ReactSharedInternals.T,
	    previousUpdatePriority = Internals.p;
	  try {
	    if (((ReactSharedInternals.T = null), (Internals.p = 2), fn)) return fn();
	  } finally {
	    (ReactSharedInternals.T = previousTransition),
	      (Internals.p = previousUpdatePriority),
	      Internals.d.f();
	  }
	};
	reactDom_production.preconnect = function (href, options) {
	  "string" === typeof href &&
	    (options
	      ? ((options = options.crossOrigin),
	        (options =
	          "string" === typeof options
	            ? "use-credentials" === options
	              ? options
	              : ""
	            : void 0))
	      : (options = null),
	    Internals.d.C(href, options));
	};
	reactDom_production.prefetchDNS = function (href) {
	  "string" === typeof href && Internals.d.D(href);
	};
	reactDom_production.preinit = function (href, options) {
	  if ("string" === typeof href && options && "string" === typeof options.as) {
	    var as = options.as,
	      crossOrigin = getCrossOriginStringAs(as, options.crossOrigin),
	      integrity =
	        "string" === typeof options.integrity ? options.integrity : void 0,
	      fetchPriority =
	        "string" === typeof options.fetchPriority
	          ? options.fetchPriority
	          : void 0;
	    "style" === as
	      ? Internals.d.S(
	          href,
	          "string" === typeof options.precedence ? options.precedence : void 0,
	          {
	            crossOrigin: crossOrigin,
	            integrity: integrity,
	            fetchPriority: fetchPriority
	          }
	        )
	      : "script" === as &&
	        Internals.d.X(href, {
	          crossOrigin: crossOrigin,
	          integrity: integrity,
	          fetchPriority: fetchPriority,
	          nonce: "string" === typeof options.nonce ? options.nonce : void 0
	        });
	  }
	};
	reactDom_production.preinitModule = function (href, options) {
	  if ("string" === typeof href)
	    if ("object" === typeof options && null !== options) {
	      if (null == options.as || "script" === options.as) {
	        var crossOrigin = getCrossOriginStringAs(
	          options.as,
	          options.crossOrigin
	        );
	        Internals.d.M(href, {
	          crossOrigin: crossOrigin,
	          integrity:
	            "string" === typeof options.integrity ? options.integrity : void 0,
	          nonce: "string" === typeof options.nonce ? options.nonce : void 0
	        });
	      }
	    } else null == options && Internals.d.M(href);
	};
	reactDom_production.preload = function (href, options) {
	  if (
	    "string" === typeof href &&
	    "object" === typeof options &&
	    null !== options &&
	    "string" === typeof options.as
	  ) {
	    var as = options.as,
	      crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
	    Internals.d.L(href, as, {
	      crossOrigin: crossOrigin,
	      integrity:
	        "string" === typeof options.integrity ? options.integrity : void 0,
	      nonce: "string" === typeof options.nonce ? options.nonce : void 0,
	      type: "string" === typeof options.type ? options.type : void 0,
	      fetchPriority:
	        "string" === typeof options.fetchPriority
	          ? options.fetchPriority
	          : void 0,
	      referrerPolicy:
	        "string" === typeof options.referrerPolicy
	          ? options.referrerPolicy
	          : void 0,
	      imageSrcSet:
	        "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
	      imageSizes:
	        "string" === typeof options.imageSizes ? options.imageSizes : void 0,
	      media: "string" === typeof options.media ? options.media : void 0
	    });
	  }
	};
	reactDom_production.preloadModule = function (href, options) {
	  if ("string" === typeof href)
	    if (options) {
	      var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
	      Internals.d.m(href, {
	        as:
	          "string" === typeof options.as && "script" !== options.as
	            ? options.as
	            : void 0,
	        crossOrigin: crossOrigin,
	        integrity:
	          "string" === typeof options.integrity ? options.integrity : void 0
	      });
	    } else Internals.d.m(href);
	};
	reactDom_production.requestFormReset = function (form) {
	  Internals.d.r(form);
	};
	reactDom_production.unstable_batchedUpdates = function (fn, a) {
	  return fn(a);
	};
	reactDom_production.useFormState = function (action, initialState, permalink) {
	  return ReactSharedInternals.H.useFormState(action, initialState, permalink);
	};
	reactDom_production.useFormStatus = function () {
	  return ReactSharedInternals.H.useHostTransitionStatus();
	};
	reactDom_production.version = "19.0.0";
	return reactDom_production;
}

var reactDom_development = {};

/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactDom_development;

function requireReactDom_development () {
	if (hasRequiredReactDom_development) return reactDom_development;
	hasRequiredReactDom_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function noop() {}
	    function testStringCoercion(value) {
	      return "" + value;
	    }
	    function createPortal$1(children, containerInfo, implementation) {
	      var key =
	        3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
	      try {
	        testStringCoercion(key);
	        var JSCompiler_inline_result = !1;
	      } catch (e) {
	        JSCompiler_inline_result = !0;
	      }
	      JSCompiler_inline_result &&
	        (console.error(
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            key[Symbol.toStringTag]) ||
	            key.constructor.name ||
	            "Object"
	        ),
	        testStringCoercion(key));
	      return {
	        $$typeof: REACT_PORTAL_TYPE,
	        key: null == key ? null : "" + key,
	        children: children,
	        containerInfo: containerInfo,
	        implementation: implementation
	      };
	    }
	    function getCrossOriginStringAs(as, input) {
	      if ("font" === as) return "";
	      if ("string" === typeof input)
	        return "use-credentials" === input ? input : "";
	    }
	    function getValueDescriptorExpectingObjectForWarning(thing) {
	      return null === thing
	        ? "`null`"
	        : void 0 === thing
	          ? "`undefined`"
	          : "" === thing
	            ? "an empty string"
	            : 'something with type "' + typeof thing + '"';
	    }
	    function getValueDescriptorExpectingEnumForWarning(thing) {
	      return null === thing
	        ? "`null`"
	        : void 0 === thing
	          ? "`undefined`"
	          : "" === thing
	            ? "an empty string"
	            : "string" === typeof thing
	              ? JSON.stringify(thing)
	              : "number" === typeof thing
	                ? "`" + thing + "`"
	                : 'something with type "' + typeof thing + '"';
	    }
	    function resolveDispatcher() {
	      var dispatcher = ReactSharedInternals.H;
	      null === dispatcher &&
	        console.error(
	          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
	        );
	      return dispatcher;
	    }
	    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
	      "function" ===
	        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
	      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
	    var React = React__default["default"],
	      Internals = {
	        d: {
	          f: noop,
	          r: function () {
	            throw Error(
	              "Invalid form element. requestFormReset must be passed a form that was rendered by React."
	            );
	          },
	          D: noop,
	          C: noop,
	          L: noop,
	          m: noop,
	          X: noop,
	          S: noop,
	          M: noop
	        },
	        p: 0,
	        findDOMNode: null
	      },
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      ReactSharedInternals =
	        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	    ("function" === typeof Map &&
	      null != Map.prototype &&
	      "function" === typeof Map.prototype.forEach &&
	      "function" === typeof Set &&
	      null != Set.prototype &&
	      "function" === typeof Set.prototype.clear &&
	      "function" === typeof Set.prototype.forEach) ||
	      console.error(
	        "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
	      );
	    reactDom_development.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
	      Internals;
	    reactDom_development.createPortal = function (children, container) {
	      var key =
	        2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
	      if (
	        !container ||
	        (1 !== container.nodeType &&
	          9 !== container.nodeType &&
	          11 !== container.nodeType)
	      )
	        throw Error("Target container is not a DOM element.");
	      return createPortal$1(children, container, null, key);
	    };
	    reactDom_development.flushSync = function (fn) {
	      var previousTransition = ReactSharedInternals.T,
	        previousUpdatePriority = Internals.p;
	      try {
	        if (((ReactSharedInternals.T = null), (Internals.p = 2), fn))
	          return fn();
	      } finally {
	        (ReactSharedInternals.T = previousTransition),
	          (Internals.p = previousUpdatePriority),
	          Internals.d.f() &&
	            console.error(
	              "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."
	            );
	      }
	    };
	    reactDom_development.preconnect = function (href, options) {
	      "string" === typeof href && href
	        ? null != options && "object" !== typeof options
	          ? console.error(
	              "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
	              getValueDescriptorExpectingEnumForWarning(options)
	            )
	          : null != options &&
	            "string" !== typeof options.crossOrigin &&
	            console.error(
	              "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
	              getValueDescriptorExpectingObjectForWarning(options.crossOrigin)
	            )
	        : console.error(
	            "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
	            getValueDescriptorExpectingObjectForWarning(href)
	          );
	      "string" === typeof href &&
	        (options
	          ? ((options = options.crossOrigin),
	            (options =
	              "string" === typeof options
	                ? "use-credentials" === options
	                  ? options
	                  : ""
	                : void 0))
	          : (options = null),
	        Internals.d.C(href, options));
	    };
	    reactDom_development.prefetchDNS = function (href) {
	      if ("string" !== typeof href || !href)
	        console.error(
	          "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
	          getValueDescriptorExpectingObjectForWarning(href)
	        );
	      else if (1 < arguments.length) {
	        var options = arguments[1];
	        "object" === typeof options && options.hasOwnProperty("crossOrigin")
	          ? console.error(
	              "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
	              getValueDescriptorExpectingEnumForWarning(options)
	            )
	          : console.error(
	              "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
	              getValueDescriptorExpectingEnumForWarning(options)
	            );
	      }
	      "string" === typeof href && Internals.d.D(href);
	    };
	    reactDom_development.preinit = function (href, options) {
	      "string" === typeof href && href
	        ? null == options || "object" !== typeof options
	          ? console.error(
	              "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
	              getValueDescriptorExpectingEnumForWarning(options)
	            )
	          : "style" !== options.as &&
	            "script" !== options.as &&
	            console.error(
	              'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
	              getValueDescriptorExpectingEnumForWarning(options.as)
	            )
	        : console.error(
	            "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
	            getValueDescriptorExpectingObjectForWarning(href)
	          );
	      if (
	        "string" === typeof href &&
	        options &&
	        "string" === typeof options.as
	      ) {
	        var as = options.as,
	          crossOrigin = getCrossOriginStringAs(as, options.crossOrigin),
	          integrity =
	            "string" === typeof options.integrity ? options.integrity : void 0,
	          fetchPriority =
	            "string" === typeof options.fetchPriority
	              ? options.fetchPriority
	              : void 0;
	        "style" === as
	          ? Internals.d.S(
	              href,
	              "string" === typeof options.precedence
	                ? options.precedence
	                : void 0,
	              {
	                crossOrigin: crossOrigin,
	                integrity: integrity,
	                fetchPriority: fetchPriority
	              }
	            )
	          : "script" === as &&
	            Internals.d.X(href, {
	              crossOrigin: crossOrigin,
	              integrity: integrity,
	              fetchPriority: fetchPriority,
	              nonce: "string" === typeof options.nonce ? options.nonce : void 0
	            });
	      }
	    };
	    reactDom_development.preinitModule = function (href, options) {
	      var encountered = "";
	      ("string" === typeof href && href) ||
	        (encountered +=
	          " The `href` argument encountered was " +
	          getValueDescriptorExpectingObjectForWarning(href) +
	          ".");
	      void 0 !== options && "object" !== typeof options
	        ? (encountered +=
	            " The `options` argument encountered was " +
	            getValueDescriptorExpectingObjectForWarning(options) +
	            ".")
	        : options &&
	          "as" in options &&
	          "script" !== options.as &&
	          (encountered +=
	            " The `as` option encountered was " +
	            getValueDescriptorExpectingEnumForWarning(options.as) +
	            ".");
	      if (encountered)
	        console.error(
	          "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
	          encountered
	        );
	      else
	        switch (
	          ((encountered =
	            options && "string" === typeof options.as ? options.as : "script"),
	          encountered)
	        ) {
	          case "script":
	            break;
	          default:
	            (encountered =
	              getValueDescriptorExpectingEnumForWarning(encountered)),
	              console.error(
	                'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
	                encountered,
	                href
	              );
	        }
	      if ("string" === typeof href)
	        if ("object" === typeof options && null !== options) {
	          if (null == options.as || "script" === options.as)
	            (encountered = getCrossOriginStringAs(
	              options.as,
	              options.crossOrigin
	            )),
	              Internals.d.M(href, {
	                crossOrigin: encountered,
	                integrity:
	                  "string" === typeof options.integrity
	                    ? options.integrity
	                    : void 0,
	                nonce:
	                  "string" === typeof options.nonce ? options.nonce : void 0
	              });
	        } else null == options && Internals.d.M(href);
	    };
	    reactDom_development.preload = function (href, options) {
	      var encountered = "";
	      ("string" === typeof href && href) ||
	        (encountered +=
	          " The `href` argument encountered was " +
	          getValueDescriptorExpectingObjectForWarning(href) +
	          ".");
	      null == options || "object" !== typeof options
	        ? (encountered +=
	            " The `options` argument encountered was " +
	            getValueDescriptorExpectingObjectForWarning(options) +
	            ".")
	        : ("string" === typeof options.as && options.as) ||
	          (encountered +=
	            " The `as` option encountered was " +
	            getValueDescriptorExpectingObjectForWarning(options.as) +
	            ".");
	      encountered &&
	        console.error(
	          'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
	          encountered
	        );
	      if (
	        "string" === typeof href &&
	        "object" === typeof options &&
	        null !== options &&
	        "string" === typeof options.as
	      ) {
	        encountered = options.as;
	        var crossOrigin = getCrossOriginStringAs(
	          encountered,
	          options.crossOrigin
	        );
	        Internals.d.L(href, encountered, {
	          crossOrigin: crossOrigin,
	          integrity:
	            "string" === typeof options.integrity ? options.integrity : void 0,
	          nonce: "string" === typeof options.nonce ? options.nonce : void 0,
	          type: "string" === typeof options.type ? options.type : void 0,
	          fetchPriority:
	            "string" === typeof options.fetchPriority
	              ? options.fetchPriority
	              : void 0,
	          referrerPolicy:
	            "string" === typeof options.referrerPolicy
	              ? options.referrerPolicy
	              : void 0,
	          imageSrcSet:
	            "string" === typeof options.imageSrcSet
	              ? options.imageSrcSet
	              : void 0,
	          imageSizes:
	            "string" === typeof options.imageSizes
	              ? options.imageSizes
	              : void 0,
	          media: "string" === typeof options.media ? options.media : void 0
	        });
	      }
	    };
	    reactDom_development.preloadModule = function (href, options) {
	      var encountered = "";
	      ("string" === typeof href && href) ||
	        (encountered +=
	          " The `href` argument encountered was " +
	          getValueDescriptorExpectingObjectForWarning(href) +
	          ".");
	      void 0 !== options && "object" !== typeof options
	        ? (encountered +=
	            " The `options` argument encountered was " +
	            getValueDescriptorExpectingObjectForWarning(options) +
	            ".")
	        : options &&
	          "as" in options &&
	          "string" !== typeof options.as &&
	          (encountered +=
	            " The `as` option encountered was " +
	            getValueDescriptorExpectingObjectForWarning(options.as) +
	            ".");
	      encountered &&
	        console.error(
	          'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
	          encountered
	        );
	      "string" === typeof href &&
	        (options
	          ? ((encountered = getCrossOriginStringAs(
	              options.as,
	              options.crossOrigin
	            )),
	            Internals.d.m(href, {
	              as:
	                "string" === typeof options.as && "script" !== options.as
	                  ? options.as
	                  : void 0,
	              crossOrigin: encountered,
	              integrity:
	                "string" === typeof options.integrity
	                  ? options.integrity
	                  : void 0
	            }))
	          : Internals.d.m(href));
	    };
	    reactDom_development.requestFormReset = function (form) {
	      Internals.d.r(form);
	    };
	    reactDom_development.unstable_batchedUpdates = function (fn, a) {
	      return fn(a);
	    };
	    reactDom_development.useFormState = function (action, initialState, permalink) {
	      return resolveDispatcher().useFormState(action, initialState, permalink);
	    };
	    reactDom_development.useFormStatus = function () {
	      return resolveDispatcher().useHostTransitionStatus();
	    };
	    reactDom_development.version = "19.0.0";
	    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
	      "function" ===
	        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
	      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	  })();
	return reactDom_development;
}

(function (module) {

	function checkDCE() {
	  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
	  if (
	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
	  ) {
	    return;
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    // This branch is unreachable because this function is only called
	    // in production, but the condition is true only in development.
	    // Therefore if the branch is still here, dead code elimination wasn't
	    // properly applied.
	    // Don't change the message. React DevTools relies on it. Also make sure
	    // this message doesn't occur elsewhere in this function, or it will cause
	    // a false positive.
	    throw new Error('^_^');
	  }
	  try {
	    // Verify that the code above has been dead code eliminated (DCE'd).
	    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
	  } catch (err) {
	    // DevTools shouldn't crash React, no matter what.
	    // We should still report in case we break this code.
	    console.error(err);
	  }
	}

	if (process.env.NODE_ENV === 'production') {
	  // DCE check should happen before ReactDOM bundle executes so that
	  // DevTools can report bad minification during injection.
	  checkDCE();
	  module.exports = requireReactDom_production();
	} else {
	  module.exports = requireReactDom_development();
	}
} (reactDom));

var ReactDOM = /*@__PURE__*/getDefaultExportFromCjs(reactDom.exports);

/**
 * Loading spinner/indicator
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$a = `
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const LoadingSpinner = () => {
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    // Add all four blips to a container
    return (React__default["default"].createElement("div", { className: "text-center LoadingSpinner LoadingSpinner-container" },
        React__default["default"].createElement("style", null, style$a),
        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCircle, className: "LoadingSpinner-blip-1 me-1" }),
        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCircle, className: "LoadingSpinner-blip-2 me-1" }),
        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCircle, className: "LoadingSpinner-blip-3 me-1" }),
        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCircle, className: "LoadingSpinner-blip-4" })));
};

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
 * The number of modal portals that can be rendered at once.
 * @author Gabe Abrams
 */
const NUM_MODAL_PORTALS = 50;

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

/*----------------------------------------*/
/* ---- Static Variables and Getters ---- */
/*----------------------------------------*/
/* ----------- Initialized ---------- */
let onInitialized;
const initialized = new Promise((resolve) => {
    onInitialized = resolve;
});
/* ------------ No Server ----------- */
let noServer = false;
/**
 * Check if there is no server for this app
 * @author Gabe Abrams
 */
const appHasNoServer = () => {
    return noServer;
};
/* ---------- Send Request ---------- */
let storedSendRequest;
/**
 * Get the send request function
 * @author Gabe Abrams
 * @returns sendRequest function
 */
const getSendRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    // Show timeout error if too much time passes
    let successful = false;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield waitMs(5000);
        if (!successful) {
            showFatalError(new ErrorWithCode('Could not send a request because the request needed to be sent before dce-reactkit was properly initialized. Perhaps dce-reactkit was not initialized with initClient.', ReactKitErrorCode$1.NoCACCLSendRequestFunction));
        }
    }))();
    // Wait for initialization
    yield initialized;
    successful = true;
    // Return
    return storedSendRequest;
});
/* ----- Session Expired Message ---- */
let sessionExpiredMessage;
/**
 * Get the custom session expired message
 * @author Gabe Abrams
 * @returns session expired message
 */
const getSessionExpiredMessage = () => {
    // Return
    return (sessionExpiredMessage !== null && sessionExpiredMessage !== void 0 ? sessionExpiredMessage : 'Your session has expired. Please go back to Canvas and start over.');
};
/* ------------ Dark Mode ----------- */
let darkModeOn = false;
/**
 * Get whether dark mode is enabled or not
 * @returns true if dark mode is enabled
 */
const isDarkModeOn = () => {
    return darkModeOn;
};
/*----------------------------------------*/
/* ---------------- Init ---------------- */
/*----------------------------------------*/
/**
 * Initialize the client-side version of reactkit
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.sendRequest caccl send request functions
 * @param [opts.sessionExpiredMessage] a custom session expired message
 * @param [opts.darkModeOn] if true, dark mode is enabled
 * @param [opts.noServer] if true, there is no server for this app
 */
const initClient = (opts) => {
    // Handle separately if there is no server
    if (opts.noServer) {
        // Store values
        storedSendRequest = () => __awaiter(void 0, void 0, void 0, function* () {
            throw new Error('Cannot send requests because there is no server');
        });
        noServer = true;
    }
    else {
        // Store values
        storedSendRequest = opts.sendRequest;
        sessionExpiredMessage = opts.sessionExpiredMessage;
        noServer = false;
    }
    // Handle universal parts
    darkModeOn = !!opts.darkModeOn;
    // Mark as initialized
    onInitialized(null);
};

/* eslint-disable react/no-unused-prop-types */
/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/
// Base level of z-index
const BASE_Z_INDEX = 1000000000;
const BASE_Z_INDEX_ON_TOP = 2000000000;
// Constants
const MS_TO_ANIMATE = 200; // Animation duration
const MS_TO_WAIT_BEFORE_SHOWING_LOADING_INDICATOR = 1000;
// Modal type to list of buttons
const modalTypeToModalButtonTypes = {
    [ModalType$1.Okay]: [
        ModalButtonType$1.Okay,
    ],
    [ModalType$1.Cancel]: [
        ModalButtonType$1.Cancel,
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
/**
 * Get button type styling and labels
 * @author Gabe Abrams
 * @returns map of button type to label and variant
 */
const getModalButtonTypeToLabelAndVariant = () => {
    const dark = isDarkModeOn();
    return {
        [ModalButtonType$1.Okay]: {
            label: 'Okay',
            variant: (dark
                ? Variant$1.Light
                : Variant$1.Dark),
        },
        [ModalButtonType$1.Cancel]: {
            label: 'Cancel',
            variant: Variant$1.Secondary,
        },
        [ModalButtonType$1.Yes]: {
            label: 'Yes',
            variant: (dark
                ? Variant$1.Light
                : Variant$1.Dark),
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
            variant: (dark
                ? Variant$1.Light
                : Variant$1.Dark),
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
            variant: (dark
                ? Variant$1.Light
                : Variant$1.Dark),
        },
    };
};
/*------------------------------------------------------------------------*/
/* --------------------------- Static Helpers --------------------------- */
/*------------------------------------------------------------------------*/
// Next unique id
let nextUniqueId = 0;
/**
 * Get a new unique id for this modal
 * @author Gabe Abrams
 * @returns new unique id
 */
const getNextUniqueId = () => {
    // eslint-disable-next-line no-plusplus
    return nextUniqueId++;
};
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$9 = `
  .Modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 200vh;
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const Modal = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    var _a;
    /* -------------- Props ------------- */
    const { type = ModalType$1.NoButtons, size = ModalSize$1.Large, title, largeTitle, children, onClose, dontAllowBackdropExit, dontShowXButton, onTopOfOtherModals, isLoading, isLoadingCancelable, } = props;
    // Determine if no header either
    const noHeader = (!title && type === ModalType$1.NoButtons);
    /* -------------- State ------------- */
    // True if animation is in use
    const [animatingIn, setAnimatingIn] = React.useState(true);
    const [animatingPop, setAnimatingPop] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    /* -------------- Refs -------------- */
    // Keep track of whether modal is still mounted
    const mounted = React.useRef(false);
    // Keep track of unique modal id
    const id = React.useRef(0);
    if (!id.current) {
        id.current = getNextUniqueId();
    }
    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Mount
     * @author Gabe Abrams
     */
    React.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            // Set defaults
            setAnimatingIn(true);
            setAnimatingPop(false);
            // Wait for animation
            yield waitMs(MS_TO_ANIMATE);
            // Update to state after animated in
            if (mounted.current) {
                setAnimatingIn(false);
            }
            if (isLoading) {
                // wait before showing modal
                yield waitMs(MS_TO_WAIT_BEFORE_SHOWING_LOADING_INDICATOR);
                if (mounted.current) {
                    setShowModal(true);
                }
            }
            else {
                setShowModal(true);
            }
        }))();
        return () => {
            mounted.current = false;
        };
    }, []);
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Handles the closing of the modal
     * @author Gabe Abrams
     * @param modalButtonType the button that was clicked when closing the
     *   modal
     */
    const handleClose = (modalButtonType) => __awaiter(void 0, void 0, void 0, function* () {
        // Don't close if no handler
        if (!onClose) {
            return;
        }
        onClose(modalButtonType);
    });
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    // Calculate Z-index
    const baseZIndex = (onTopOfOtherModals
        ? BASE_Z_INDEX_ON_TOP
        : BASE_Z_INDEX);
    // Get list of buttons for this modal type
    const ModalButtonTypes = (_a = modalTypeToModalButtonTypes[type]) !== null && _a !== void 0 ? _a : [];
    // Get map of button type to label and variant
    const ModalButtonTypeToLabelAndVariant = getModalButtonTypeToLabelAndVariant();
    // Create buttons
    const buttons = ModalButtonTypes.map((modalButtonType, i) => {
        // Get default style
        let { label, variant, } = ModalButtonTypeToLabelAndVariant[modalButtonType];
        // Override with customizations
        const newLabel = props[`${modalButtonType}Label`];
        if (newLabel) {
            label = newLabel;
        }
        const newVariant = props[`${modalButtonType}Variant`];
        if (newVariant) {
            variant = newVariant;
        }
        // Check if this button is last
        const last = (i === ModalButtonTypes.length - 1);
        // Create the button
        return (React__default["default"].createElement("button", { key: modalButtonType, type: "button", className: `Modal-${modalButtonType}-button btn btn-${variant} ${last ? '' : 'me-1'}`, onClick: () => {
                handleClose(modalButtonType);
            } }, label));
    });
    // Put all buttons in a footer
    const footer = ((buttons && buttons.length)
        ? (React__default["default"].createElement("div", null, buttons))
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
    // default to show close button when not loading and not show close button when loading
    // unless downShowXButton or isLoadingCancelable
    const showCloseButton = (
    // The modal must have an onClose function
    onClose
        // ...and the close button is allowed to be visible
        && !dontShowXButton
        // ...and should not be shown if the modal is loading and not cancelable
        && !(isLoading && !isLoadingCancelable));
    // Render the modal
    const contentToRender = (React__default["default"].createElement("div", { className: "modal show", tabIndex: -1, style: {
            zIndex: baseZIndex,
            display: 'block',
            margin: 'auto',
            left: 0,
            right: 0,
        } },
        React__default["default"].createElement("style", null, style$9),
        React__default["default"].createElement("div", { className: `Modal-backdrop ${backdropAnimationClass}`, style: {
                zIndex: baseZIndex + 1,
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
        showModal && (React__default["default"].createElement("div", { className: `modal-dialog modal-${size} ${animationClass} modal-dialog-scrollable modal-dialog-centered`, style: {
                zIndex: baseZIndex + 2,
                // Override sizes for even larger for XL
                width: (size === ModalSize$1.ExtraLarge
                    ? 'calc(100vw - 1rem)'
                    : undefined),
                maxWidth: (size === ModalSize$1.ExtraLarge
                    ? '80rem'
                    : undefined),
            } },
            React__default["default"].createElement("div", { className: "modal-content", style: {
                    borderColor: (isDarkModeOn()
                        ? 'gray'
                        : undefined),
                } },
                !noHeader && (React__default["default"].createElement("div", { className: "modal-header", style: {
                        color: (isDarkModeOn()
                            ? 'white'
                            : undefined),
                        backgroundColor: (isDarkModeOn()
                            ? '#444'
                            : undefined),
                        borderBottom: (isDarkModeOn()
                            ? '0.1rem solid gray'
                            : undefined),
                    } },
                    React__default["default"].createElement("h5", { className: "modal-title", style: {
                            fontWeight: 'bold',
                            fontSize: (largeTitle
                                ? '1.6rem'
                                : undefined),
                        } }, title),
                    showCloseButton && (React__default["default"].createElement("button", { type: "button", className: "Modal-x-button btn-close", "aria-label": "Close", style: {
                            backgroundColor: (isDarkModeOn()
                                ? 'white'
                                : undefined),
                        }, onClick: () => {
                            // Handle close
                            handleClose(ModalButtonType$1.Cancel);
                        } })))),
                React__default["default"].createElement("div", { className: "modal-body", style: {
                        color: (isDarkModeOn()
                            ? 'white'
                            : undefined),
                        backgroundColor: (isDarkModeOn()
                            ? '#444'
                            : undefined),
                    } }, isLoading
                    ? (React__default["default"].createElement(React__default["default"].Fragment, null,
                        React__default["default"].createElement(LoadingSpinner, null),
                        React__default["default"].createElement("span", { className: "sr-only" }, "Content loading")))
                    : children),
                footer && (React__default["default"].createElement("div", { className: "modal-footer pt-1 pb-1", style: {
                        color: (isDarkModeOn()
                            ? 'white'
                            : undefined),
                        backgroundColor: (isDarkModeOn()
                            ? '#444'
                            : undefined),
                        borderTop: (isDarkModeOn()
                            ? '0.1rem solid gray'
                            : undefined),
                    } }, footer)))))));
    // Determine which portal to use
    const portalNumber = id.current % NUM_MODAL_PORTALS;
    // Render in a portal
    return ReactDOM.createPortal(contentToRender, document.getElementById(`modal-portal-${portalNumber}`));
};

/**
 * Path that all routes start with
 * @author Gabe Abrams
 */
const ROUTE_PATH_PREFIX = '/dce-reactkit';

/**
 * Path of the route for storing client-side logs
 * @author Gabe Abrams
 */
const LOG_ROUTE_PATH = `${ROUTE_PATH_PREFIX}/log`;

/**
 * Allowed log levels
 * @author Gabe Abrams
 */
var LogLevel;
(function (LogLevel) {
    LogLevel["Warn"] = "Warn";
    LogLevel["Info"] = "Info";
    LogLevel["Debug"] = "Debug";
})(LogLevel || (LogLevel = {}));
var LogLevel$1 = LogLevel;

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
    // Set default method
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
    // Remove properties with undefined values
    let params;
    if (opts.params) {
        params = Object.fromEntries(Object
            .entries(opts.params)
            .filter(([, value]) => {
            return value !== undefined;
        }));
    }
    // Automatically JSONify arrays and objects
    if (params) {
        params = Object.fromEntries(Object
            .entries(params)
            .map(([key, value]) => {
            if (Array.isArray(value) || typeof value === 'object') {
                return [key, JSON.stringify(value)];
            }
            return [key, value];
        }));
    }
    // Send the request
    const sendRequest = yield getSendRequest();
    const response = yield sendRequest({
        path: opts.path,
        method: (_c = opts.method) !== null && _c !== void 0 ? _c : 'GET',
        params,
    });
    // Check for failure
    if (!response || !response.body) {
        throw new ErrorWithCode('We didn\'t get a response from the server. Please check your internet connection.', ReactKitErrorCode$1.NoResponse);
    }
    if (!response.body.success) {
        // Session expired
        if (response.body.code === ReactKitErrorCode$1.SessionExpired) {
            showSessionExpiredMessage();
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

// Current metadata populator function
let metadataPopulator;
/**
 * Set the metadata populator function that will be called before every client
 *   event is logged. The function should return a set of metadata values that
 *   will be added to all client events
 * @author Gabe Abrams
 * @param metadataPopulator function to call that will return a set of metadata
 *   values that will be added to all client events
 */
const setClientEventMetadataPopulator = (newMetadataPopulator) => {
    metadataPopulator = newMetadataPopulator;
};
/* -------------- Main -------------- */
/**
 * Log a user action on the client (cannot be used on the server)
 * @author Gabe Abrams
 */
const logClientEvent = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    // Don't write to the server if there is none
    if (appHasNoServer()) {
        return;
    }
    // Populate metadata
    let metadata = ((_a = opts.metadata) !== null && _a !== void 0 ? _a : {});
    if (metadataPopulator) {
        try {
            const autoPopulatedMetadata = yield metadataPopulator();
            metadata = Object.assign(Object.assign({}, autoPopulatedMetadata), metadata);
        }
        catch (err) {
            // Add error to metadata
            metadata = Object.assign({ autoPopulatedMetadataNotAvailable: true }, metadata);
        }
    }
    // Send to server
    return visitServerEndpoint({
        path: LOG_ROUTE_PATH,
        method: 'POST',
        params: {
            context: (typeof opts.context === 'string'
                ? opts.context
                : ((_c = ((_b = opts.context) !== null && _b !== void 0 ? _b : {})._) !== null && _c !== void 0 ? _c : LogBuiltInMetadata.Context.Uncategorized)),
            subcontext: ((_d = opts.subcontext) !== null && _d !== void 0 ? _d : LogBuiltInMetadata.Context.Uncategorized),
            level: ((_e = opts.level) !== null && _e !== void 0 ? _e : LogLevel$1.Info),
            tags: JSON.stringify((_f = opts.tags) !== null && _f !== void 0 ? _f : []),
            metadata: JSON.stringify(metadata),
            errorMessage: (opts.error
                ? opts.error.message
                : undefined),
            errorCode: (opts.error
                ? opts.error.code
                : undefined),
            errorStack: (opts.error
                ? opts.error.stack
                : undefined),
            target: (opts.action
                ? ((_g = opts.target) !== null && _g !== void 0 ? _g : LogBuiltInMetadata.Target.NoTarget)
                : undefined),
            action: (opts.action
                ? opts.action
                : undefined),
        },
    });
});

/**
 * Universal stylesheet
 * @author Gabe Abrams
 */
const shared = `
/* Button with no style */
.btn-nostyle {
  border: 0 !important;
  background: transparent !important;
  outline: 0 !important;
  font-size: inherit !important;
  color: inherit !important;
  padding: 0 !important;
  margin: 0 !important;
}

/* Tooltip on Very Top */
.tooltip {
  z-index: 9000000000 !important;
}
`;

/**
 * A wrapper for the entire React app that adds global functionality like
 *   handling for fatal error messages, adds bootstrap support
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* --------------------------- Static Helpers --------------------------- */
/*------------------------------------------------------------------------*/
// Timestamp after initialization when helpers should be available
const timestampWhenHelpersShouldBeAvailable = Date.now() + 2000;
/**
 * Wait for a little while for a helper to exist
 * @author Gabe Abrams
 * @param checkForHelper a function that returns true if the helper exists
 * @returns true if the helper exists, false if the process timed out
 */
const waitForHelper = (checkForHelper) => __awaiter(void 0, void 0, void 0, function* () {
    // Wait for helper to exist
    while (!checkForHelper()) {
        // Check if we should stop waiting
        if (Date.now() > timestampWhenHelpersShouldBeAvailable) {
            // Stop waiting
            return false;
        }
        // Wait a little while
        yield waitMs(10);
    }
    // Helper exists
    return true;
});
/*----------------------------------------*/
/* ----------- Redirect/Leave ----------- */
/*----------------------------------------*/
// Stored copy of setter for url to leave to
let setURLToLeaveTo;
/**
 * Redirect to a new page
 * @author Gabe Abrams
 * @param url the url to redirect to
 * @param destination the destination of the redirect, for example "YouTube"
 *   and will be used in the following text: `Redirecting to ${destination}...`
 */
const leaveToURL = (url, destination) => __awaiter(void 0, void 0, void 0, function* () {
    if (setURLToLeaveTo) {
        // Beautiful redirect
        setURLToLeaveTo({ url, destination });
    }
    else {
        // Overwrite page in a janky way
        window.document.body.innerHTML = `
      <div>
        <h1>
          Redirecting to ${destination}...
        </h1>
        <p>
          If you are not redirected in 5 seconds, please <a href="${url}">click here</a>.
        </p>
      </div>
    `;
    }
    // Redirect to location
    window.location.href = url;
});
/*----------------------------------------*/
/* ---------------- Alert --------------- */
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
    // Wait for helper to exist
    yield waitForHelper(() => {
        return !!setAlertInfo;
    });
    // Fallback if alert not available
    if (!setAlertInfo) {
        // eslint-disable-next-line no-alert
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
/* --------------- Confirm -------------- */
/*----------------------------------------*/
// Stored copies of setters
let setConfirmInfo;
let onConfirmClosed;
/**
 * Show a confirmation modal with an "Okay" and a "Cancel" button
 *   (with the option to customize the text of those buttons)
 * @author Gabe Abrams
 * @param title the title text to display at the top of the alert
 * @param text the text to display in the alert
 * @param [opts={}] additional options for the confirmation dialog
 * @param [opts.confirmButtonText=Okay] the text of the confirm button
 * @param [opts.confirmButtonVariant=Variant.Dark] the variant of the confirm
 *   button
 * @param [opts.cancelButtonText=Cancel] the text of the cancel button
 * @param [opts.cancelButtonVariant=Variant.Secondary] the variant of the cancel
 *   button
 * @returns true if the user confirmed
 */
const confirm = (title, text, opts) => __awaiter(void 0, void 0, void 0, function* () {
    // Wait for helper to exist
    yield waitForHelper(() => {
        return !!setConfirmInfo;
    });
    // Fallback if confirm is not available
    if (!setConfirmInfo) {
        // eslint-disable-next-line no-alert
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
            opts: (opts !== null && opts !== void 0 ? opts : {}),
        });
    });
});
/*----------------------------------------*/
/* --------------- Prompt -------------- */
/*----------------------------------------*/
// Stored copies of setters
let setPromptInfo;
// Function to call when prompt is closed
let onPromptClosed;
/**
 * Show a prompt modal asking the user for input
 * @author Yuen Ler Chow
 * @param title the title text to display at the top of the prompt
 * @param [opts={}] additional options for the prompt dialog
 * @param [opts.textAboveInputField] the text to display in the prompt
 * @param [opts.defaultText] the default text for the input field
 * @param [opts.placeholder] the placeholder text for the input field
 * @param [opts.confirmButtonText=Okay] the text of the confirm button
 * @param [opts.confirmButtonVariant=Variant.Dark] the variant of the confirm button
 * @param [opts.cancelButtonText=Cancel] the text of the cancel button
 * @param [opts.cancelButtonVariant=Variant.Secondary] the variant of the cancel button
 * @param [opts.minNumChars] the minimum number of characters required for
 *   the input to be valid
 * @param [opts.findValidationError] a function that takes the input text and
 *   returns an error message if the input is invalid, returns undefined if the
 *   input is valid
 * @param [opts.ariaLabel] the aria label for the input field
 * @returns Promise that resolves with the input string or null if canceled
 */
const prompt = (title, opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Wait for helper to exist
    yield waitForHelper(() => {
        return !!setPromptInfo;
    });
    // Fallback if prompt is not available
    if (!setPromptInfo) {
        const resultPassesValidation = false;
        while (!resultPassesValidation) {
            // eslint-disable-next-line no-alert
            const result = window.prompt(`${title}\n\n${(_a = opts === null || opts === void 0 ? void 0 : opts.textAboveInputField) !== null && _a !== void 0 ? _a : ''}`, (_b = opts === null || opts === void 0 ? void 0 : opts.defaultText) !== null && _b !== void 0 ? _b : '');
            // Exit loop if user cancels
            if (result === null) {
                return null;
            }
            // Validate min num chars
            const minNumCharsValidationError = (((opts === null || opts === void 0 ? void 0 : opts.minNumChars) && result.length < opts.minNumChars)
                ? `Please enter at least ${opts.minNumChars} characters.`
                : undefined);
            // Run custom validation
            const customValidationError = ((opts === null || opts === void 0 ? void 0 : opts.findValidationError)
                && opts.findValidationError(result));
            // Show validation issue
            if (minNumCharsValidationError || customValidationError) {
                // Create error message
                const errorMessage = ([
                    minNumCharsValidationError,
                    customValidationError,
                ]
                    // Filter out undefined messages
                    .filter((msg) => {
                    return !!msg;
                })
                    // Join messages with newlines
                    .join('\n'));
                // Show alert
                alert('Invalid Input', errorMessage);
            }
            else {
                return result;
            }
        }
    }
    // Return promise that resolves with result of prompt
    return new Promise((resolve) => {
        var _a;
        // Setup handler
        onPromptClosed = (result) => {
            resolve(result);
        };
        // Show the prompt
        setPromptInfo({
            title,
            currentInputFieldText: ((_a = opts === null || opts === void 0 ? void 0 : opts.defaultText) !== null && _a !== void 0 ? _a : ''),
            opts: (opts !== null && opts !== void 0 ? opts : {}),
        });
    });
});
/*----------------------------------------*/
/* ------------- Fatal Error ------------ */
/*----------------------------------------*/
// Stored copies of setters
let setFatalErrorMessage;
let setFatalErrorCode;
let setFatalErrorTitle;
// Fatal error listeners
const fatalErrorHandlers = [];
/**
 * Show a fatal error message
 * @author Gabe Abrams
 * @param error the error to show
 * @param [errorTitle] title of the error box
 */
const showFatalError = (error, errorTitle = 'An Error Occurred') => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    // Determine message and code
    const message = (typeof error === 'string'
        ? error.trim()
        : String((_c = error.message) !== null && _c !== void 0 ? _c : 'An unknown error occurred.'));
    const code = (typeof error === 'string'
        ? ReactKitErrorCode$1.NoCode
        : String((_d = error.code) !== null && _d !== void 0 ? _d : ReactKitErrorCode$1.NoCode));
    // Call all fatal error listeners
    try {
        fatalErrorHandlers.forEach((handler) => {
            handler();
        });
    }
    catch (err) {
        // Ignore listener errors
    }
    // Add log
    logClientEvent({
        context: LogBuiltInMetadata.Context.ClientFatalError,
        error: {
            message,
            code,
            stack: (error !== null && error !== void 0 ? error : {}).stack,
        },
        metadata: {
            errorTitle,
        },
    });
    // Wait for helper to exist
    yield waitForHelper(() => {
        return (!!setFatalErrorMessage
            && !!setFatalErrorCode);
    });
    // Handle case where app hasn't loaded
    if (!setFatalErrorMessage || !setFatalErrorCode) {
        alert(errorTitle, `${message} (code: ${code}). Please contact support.`);
        return;
    }
    // Use setters
    setFatalErrorMessage(message);
    setFatalErrorCode(code);
    setFatalErrorTitle(errorTitle);
});
/**
 * Add a handler for when a fatal error occurs (or when a session expiry occurs)
 * @author Gabe Abrams
 */
const addFatalErrorHandler = (handler) => {
    fatalErrorHandlers.push(handler);
};
/*----------------------------------------*/
/* ----------- Session Expired ---------- */
/*----------------------------------------*/
// Stored copies of setters
let setSessionHasExpired;
/**
 * Show the "session expired" message
 * @author Gabe Abrams
 */
const showSessionExpiredMessage = () => __awaiter(void 0, void 0, void 0, function* () {
    // Call all fatal error listeners
    try {
        fatalErrorHandlers.forEach((handler) => {
            handler();
        });
    }
    catch (err) {
        // Ignore listener errors
    }
    // Wait for helper to exist
    yield waitForHelper(() => {
        return !!setSessionHasExpired;
    });
    // Show session expired message
    if (setSessionHasExpired) {
        setSessionHasExpired(true);
    }
    else {
        showFatalError('Your session has expired. Please start over.', 'Session Expired');
    }
});
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$8 = `
  .AppWrapper-leave-to-url-notice {
    opacity: 0;

    animation-name: AppWrapper-leave-to-url-notice-appear;
    animation-duration: 0.5s;
    animation-delay: 1s;
    animation-fill-mode: both;
    animation-timing-function: ease-out;
    animation-iteration-count: 1;
  }

  @keyframes AppWrapper-leave-to-url-notice-appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  ${shared}
`;
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const AppWrapper = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    const { children, } = props;
    /* -------------- State ------------- */
    // Leave to URL
    const [urlToLeaveTo, setURLToLeaveToInner,] = React.useState();
    setURLToLeaveTo = setURLToLeaveToInner;
    // Fatal error
    const [fatalErrorMessage, setFatalErrorMessageInner,] = React.useState();
    setFatalErrorMessage = setFatalErrorMessageInner;
    const [fatalErrorCode, setFatalErrorCodeInner,] = React.useState();
    setFatalErrorCode = setFatalErrorCodeInner;
    const [fatalErrorTitle, setFatalErrorTitleInner,] = React.useState();
    setFatalErrorTitle = setFatalErrorTitleInner;
    // Alert
    const [alertInfo, setAlertInfoInner,] = React.useState(undefined);
    setAlertInfo = setAlertInfoInner;
    // Confirm
    const [confirmInfo, setConfirmInfoInner,] = React.useState(undefined);
    setConfirmInfo = setConfirmInfoInner;
    // Prompt
    const [promptInfo, setPromptInfoInner] = React.useState(undefined);
    setPromptInfo = setPromptInfoInner;
    // Session expired
    const [sessionHasExpired, setSessionHasExpiredInner,] = React.useState(false);
    setSessionHasExpired = setSessionHasExpiredInner;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* ---------------- Modal --------------- */
    /*----------------------------------------*/
    // Modal that may be defined
    let modal;
    /* -------------- Alert ------------- */
    if (alertInfo) {
        modal = (React__default["default"].createElement(Modal, { key: `alert-${alertInfo.title}-${alertInfo.text}`, title: alertInfo.title, type: ModalType$1.Okay, onClose: () => {
                // Alert closed
                setAlertInfo(undefined);
                if (onAlertClosed) {
                    onAlertClosed();
                }
            }, onTopOfOtherModals: true }, alertInfo.text));
    }
    /* ------------- Confirm ------------ */
    if (confirmInfo) {
        modal = (React__default["default"].createElement(Modal, { key: `confirm-${confirmInfo.title}-${confirmInfo.text}`, title: confirmInfo.title, type: ModalType$1.OkayCancel, okayLabel: confirmInfo.opts.confirmButtonText, okayVariant: confirmInfo.opts.confirmButtonVariant, cancelLabel: confirmInfo.opts.cancelButtonText, cancelVariant: confirmInfo.opts.cancelButtonVariant, onClose: (buttonType) => {
                setConfirmInfo(undefined);
                if (onConfirmClosed) {
                    onConfirmClosed(buttonType === ModalButtonType$1.Okay);
                }
            }, onTopOfOtherModals: true, dontAllowBackdropExit: true }, confirmInfo.text));
    }
    /* ------------- Prompt ------------ */
    if (promptInfo) {
        // Run min char validation
        const minNumCharsValidationError = ((promptInfo.opts.minNumChars
            && promptInfo.currentInputFieldText.length < promptInfo.opts.minNumChars)
            ? `Please enter at least ${promptInfo.opts.minNumChars} characters.`
            : undefined);
        // Run custom validation
        const customValidationError = (promptInfo.opts.findValidationError
            && promptInfo.opts.findValidationError(promptInfo.currentInputFieldText));
        modal = (React__default["default"].createElement(Modal, { key: `prompt-${promptInfo.title}`, title: promptInfo.title, 
            // Don't show ok button if there is a validation error
            type: ((customValidationError || minNumCharsValidationError)
                ? ModalType$1.Cancel
                : ModalType$1.OkayCancel), okayLabel: promptInfo.opts.confirmButtonText, okayVariant: promptInfo.opts.confirmButtonVariant, cancelLabel: promptInfo.opts.cancelButtonText, cancelVariant: promptInfo.opts.cancelButtonVariant, onClose: (buttonType) => {
                // Get result
                const result = (buttonType === ModalButtonType$1.Okay
                    ? promptInfo.currentInputFieldText
                    : null);
                // Close prompt
                setPromptInfo(undefined);
                // Call handler
                if (onPromptClosed) {
                    onPromptClosed(result);
                }
            }, onTopOfOtherModals: true, dontAllowBackdropExit: true },
            React__default["default"].createElement("div", null,
                promptInfo.opts.textAboveInputField && (React__default["default"].createElement("div", null, promptInfo.opts.textAboveInputField)),
                React__default["default"].createElement("input", { type: "text", className: "form-control", "aria-label": promptInfo.opts.ariaLabel, placeholder: promptInfo.opts.placeholder, value: promptInfo.currentInputFieldText, onChange: (e) => {
                        return setPromptInfo(Object.assign(Object.assign({}, promptInfo), { currentInputFieldText: e.target.value }));
                    }, 
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus: true }),
                minNumCharsValidationError && (React__default["default"].createElement("div", { className: "text-danger fw-bold mt-2" }, minNumCharsValidationError)),
                customValidationError && (React__default["default"].createElement("div", { className: "text-danger fw-bold mt-2" }, customValidationError)))));
    }
    /* ------ Custom Modal Portals ------ */
    // Custom modal portals
    const customModalPortals = [];
    for (let i = 0; i < NUM_MODAL_PORTALS; i++) {
        const portalId = `modal-portal-${i}`;
        customModalPortals.push(React__default["default"].createElement("div", { key: portalId, id: portalId }));
    }
    /*----------------------------------------*/
    /* ---------------- Views --------------- */
    /*----------------------------------------*/
    // Body that will be filled with the current view
    let body;
    /* ---------- Leave to URL ---------- */
    if (!body && urlToLeaveTo) {
        // Destructure url info
        const { url, destination, } = urlToLeaveTo;
        // Show pretty redirect screen
        body = (React__default["default"].createElement("div", { className: "AppWrapper-leave-to-url-container p-5 text-center" },
            React__default["default"].createElement("div", { className: "AppWrapper-leave-to-url-notice d-inline-block" },
                React__default["default"].createElement("h3", { className: "text-start m-0" },
                    "Redirecting to",
                    ' ',
                    destination,
                    "..."),
                React__default["default"].createElement("div", { className: "text-start" },
                    "If you are not automatically redirected in 5 seconds, please",
                    ' ',
                    React__default["default"].createElement("a", { href: url, "aria-label": `Click here to leave to ${destination}` }, "click here"),
                    "."))));
    }
    /* ----------- Fatal Error ---------- */
    if (!body
        && (fatalErrorMessage || fatalErrorCode || sessionHasExpired)) {
        // Re-encapsulate in an error
        const error = (sessionHasExpired
            ? new ErrorWithCode(getSessionExpiredMessage(), ReactKitErrorCode$1.SessionExpired)
            : new ErrorWithCode((fatalErrorMessage !== null && fatalErrorMessage !== void 0 ? fatalErrorMessage : 'An unknown error has occurred. Please contact support.'), (fatalErrorCode !== null && fatalErrorCode !== void 0 ? fatalErrorCode : ReactKitErrorCode$1.NoCode)));
        // Choose error box variant
        let errorBoxVariant = Variant$1.Danger;
        if (sessionHasExpired) {
            errorBoxVariant = (isDarkModeOn()
                ? Variant$1.Light
                : Variant$1.Secondary);
        }
        // Build error screen
        body = (React__default["default"].createElement("div", { style: {
                display: 'block',
                width: '100vw',
                minHeight: '100vh',
                paddingTop: '2rem',
                backgroundColor: (isDarkModeOn()
                    ? '#222'
                    : '#fff'),
            } },
            React__default["default"].createElement(ErrorBox, { title: (sessionHasExpired
                    ? 'Session Expired'
                    : fatalErrorTitle), error: error, variant: errorBoxVariant, icon: (sessionHasExpired
                    ? freeSolidSvgIcons.faHourglassEnd
                    : undefined) })));
    }
    /* --------------- App -------------- */
    if (!body) {
        body = children;
    }
    /* ------------- Tooltip ------------ */
    const tooltipStyle = (isDarkModeOn()
        ? `
        .tooltip-inner {
          background-color: white;
          color: black !important;
          border: 0.1rem solid black;
          pointer-events: none;
        }
        div[data-popper-placement="top"] .tooltip-arrow::before {
          border-top-color: white !important;
          transform: translate(0, -0.05rem);
          pointer-events: none;
        }
      `
        : `
        .tooltip-inner {
          background-color: black;
          color: white !important;
          border: 0.1rem solid white;
          pointer-events: none;
        }
        div[data-popper-placement="top"] .tooltip-arrow::before {
          border-top-color: black !important;
          transform: translate(0, -0.05rem);
          pointer-events: none;
        }
      `);
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement("style", null, style$8),
        React__default["default"].createElement("style", null, tooltipStyle),
        modal,
        customModalPortals,
        body));
};

/**
 * A box with a tab on the top that holds buttons and other content
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$7 = `
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
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  .TabBox-title-right-container {
    display: flex;
    flex-direction: row;
    align-items: bottom;
    height: 2.4rem;
    overflow: visible;
  }

  .TabBox-title-right-contents {
    margin-right: 0.5rem;
    margin-bottom: 0.2rem;
  }

  /* Make the TabBox's Children Appear Above Title if Overlap Occurs */
  .TabBox-children {
    position: relative;
    z-index: 1;
  }
`;
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const TabBox = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    const { title, children, topRightChildren, noBottomPadding, noBottomMargin, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    return (React__default["default"].createElement("div", { className: `TabBox-container ${noBottomMargin ? '' : 'mb-2'}` },
        React__default["default"].createElement("style", null, style$7),
        React__default["default"].createElement("div", { className: "TabBox-title-container" },
            React__default["default"].createElement("div", { className: "TabBox-title" }, title),
            topRightChildren && (React__default["default"].createElement("div", { className: "TabBox-title-right-container" },
                React__default["default"].createElement("div", { className: "TabBox-title-right-contents" }, topRightChildren)))),
        React__default["default"].createElement("div", { className: `TabBox-box ps-2 pt-2 pe-2 ${noBottomPadding ? '' : 'pb-2'}` },
            React__default["default"].createElement("div", { className: "TabBox-children" }, children))));
};

/**
 * A radio selection button
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const RadioButton = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    const { text, onSelected, ariaLabel, title, selected, id, className, noMarginOnRight, selectedVariant = (isDarkModeOn()
        ? Variant$1.Light
        : Variant$1.Secondary), unselectedVariant = (isDarkModeOn()
        ? Variant$1.Secondary
        : Variant$1.Light), small, useComplexFormatting, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("button", { type: "button", id: id, title: title, className: `btn btn-${selected ? selectedVariant : unselectedVariant}${selected ? ' selected' : ''}${small ? ' btn-sm' : ''} m-0${noMarginOnRight ? '' : ' me-1'} ${className !== null && className !== void 0 ? className : ''}`, "aria-label": `${ariaLabel}${selected ? ': currently selected' : ''}`, onClick: () => {
            if (!selected) {
                onSelected();
            }
        } },
        React__default["default"].createElement("div", { className: "d-flex flex-row align-items-center" },
            React__default["default"].createElement("div", { className: "me-1" },
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: selected ? freeSolidSvgIcons.faDotCircle : freeRegularSvgIcons.faCircle })),
            useComplexFormatting
                ? (React__default["default"].createElement("pre", { className: "ps-1 text-start text-break m-0", style: {
                        whiteSpace: 'pre-wrap',
                        tabSize: 2,
                    } }, text))
                : (React__default["default"].createElement("div", { className: "flex-grow-1 text-start text-break" }, text)))));
};

/**
 * A checkbox button
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const CheckboxButton = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    const { text, onChanged, ariaLabel, title, checked, id, className, noMarginOnRight, checkedVariant = (isDarkModeOn()
        ? Variant$1.Light
        : Variant$1.Secondary), uncheckedVariant = (isDarkModeOn()
        ? Variant$1.Secondary
        : Variant$1.Light), small, dashed, useComplexFormatting, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    // Determine the icon
    let icon;
    if (checked) {
        icon = freeSolidSvgIcons.faCheckSquare;
    }
    else {
        icon = (dashed
            ? freeRegularSvgIcons.faSquareMinus
            : freeRegularSvgIcons.faSquare);
    }
    // Create the button
    return (React__default["default"].createElement("button", { type: "button", id: id, title: title, className: `CheckboxButton-status-${checked ? 'checked' : 'unchecked'} ${dashed ? 'CheckboxButton-dashed ' : ''}btn btn-${checked ? checkedVariant : uncheckedVariant}${checked ? ' selected' : ''}${small ? ' btn-sm' : ''} m-0${noMarginOnRight ? '' : ' me-1'} ${className !== null && className !== void 0 ? className : ''}`, "aria-label": `${ariaLabel}${checked ? ': currently checked' : ''}`, onClick: () => {
            onChanged(!checked);
        } },
        React__default["default"].createElement("div", { className: "d-flex align-items-center" },
            React__default["default"].createElement("div", { className: "me-1" },
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: icon })),
            useComplexFormatting
                ? (React__default["default"].createElement("pre", { className: "ps-1 text-start text-break m-0", style: {
                        whiteSpace: 'pre-wrap',
                        tabSize: 2,
                    } }, text))
                : (React__default["default"].createElement("div", { className: "flex-grow-1 text-start text-break" }, text)))));
};

/**
 * Input group with a title and space for buttons
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const ButtonInputGroup = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { label, minLabelWidth, children, className, wrapButtonsAndAddGaps, isAdminFeature, noMarginOnBottom, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: `input-group ${className !== null && className !== void 0 ? className : ''} ${noMarginOnBottom ? '' : 'mb-2'}` },
        React__default["default"].createElement("div", { className: "input-group-prepend d-flex w-100" },
            React__default["default"].createElement("span", { className: `input-group-text ${isAdminFeature ? 'border border-success progress-bar-striped bg-success text-white fw-bold' : ''}`, style: {
                    minWidth: (minLabelWidth !== null && minLabelWidth !== void 0 ? minLabelWidth : undefined),
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                } }, label),
            React__default["default"].createElement("span", { className: `input-group-text flex-grow-1 ${isAdminFeature ? 'border-success ' : ''}rounded-right d-flex flex-wrap`, style: {
                    backgroundColor: 'white',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderLeftWidth: 0,
                } }, wrapButtonsAndAddGaps
                ? (React__default["default"].createElement("div", { className: "d-flex gap-1 flex-wrap" }, children))
                : children))));
};

// Constants
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

const monthNames = [
    { short: 'Jan', full: 'January' },
    { short: 'Feb', full: 'February' },
    { short: 'Mar', full: 'March' },
    { short: 'Apr', full: 'April' },
    { short: 'May', full: 'May' },
    { short: 'Jun', full: 'June' },
    { short: 'Jul', full: 'July' },
    { short: 'Aug', full: 'August' },
    { short: 'Sep', full: 'September' },
    { short: 'Oct', full: 'October' },
    { short: 'Nov', full: 'November' },
    { short: 'Dec', full: 'December' },
];
/**
 * Get the name of a month given the month number (1 = January, etc.)
 *   If an invalid number is provided, we will treat it like January
 * @author Gabe Abrams
 * @param month the number of the month
 * @returns object containing multiple month name formats:
 *   { short, full } where short will look like "Jan" and full will look like
 *   "January"
 */
const getMonthName = (month) => {
    var _a;
    return ((_a = monthNames[month - 1]) !== null && _a !== void 0 ? _a : monthNames[0]);
};

/**
 * Get current time info in US Boston Eastern Time, independent of machine
 *   timezone
 * @author Gabe Abrams
 * @param [dateOrTimestamp=now] the date to get info on or a ms since epoch timestamp
 * @returns object with timestamp (ms since epoch) and numbers
 *   corresponding to ET time values for year, month, day, hour, hour12, minute, isPM
 *   where hour is in 24hr time and hour12 is in 12hr time.
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
    { timeZone: 'America/New_York' });
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
    const hour12 = Number.parseInt(hourStr, 10);
    // Convert from am/pm to 24hr
    const isAM = ending.toLowerCase().includes('am');
    const isPM = !isAM;
    let hour = hour12;
    if (isPM && hour12 !== 12) {
        hour += 12;
    }
    else if (isAM && hour12 === 12) {
        hour = 0;
    }
    // Return
    return {
        timestamp,
        year,
        month,
        day,
        hour,
        hour12,
        isPM,
        minute,
    };
};

/**
 * A very simple, lightweight date chooser
 * @author Gabe Abrams
 * @author Gardenia Liu
 */
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const SimpleDateChooser = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    const { ariaLabel, name, onChange, numMonthsToShow = 6, dontAllowFuture, dontAllowPast, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    // Determine the set of choices allowed
    const today = getTimeInfoInET();
    const choices = [];
    let startYear = today.year;
    let startMonth = today.month;
    // Don't allow past or future dates
    if (dontAllowPast && dontAllowFuture) {
        throw new ErrorWithCode('No past or future dates allowed', ReactKitErrorCode$1.SimpleDateChooserInvalidDateRange);
    }
    // Require numMonthsToShow to be positive
    if (numMonthsToShow <= 0) {
        throw new ErrorWithCode('numMonthsToShow must be positive', ReactKitErrorCode$1.SimpleDateChooserInvalidNumMonths);
    }
    // Recalculate startMonth and startYear when allowing past dates
    if (!dontAllowPast) {
        startMonth -= Math.max(0, numMonthsToShow - 1);
        while (startMonth <= 0) {
            startMonth += 12;
            startYear -= 1;
        }
    }
    // Calculate total number of months to show
    let totalMonthsToShow = numMonthsToShow;
    if (!dontAllowPast && !dontAllowFuture) {
        totalMonthsToShow = totalMonthsToShow * 2 - 1;
    }
    for (let i = 0; i < totalMonthsToShow; i++) {
        // Get month and year info
        const unmoddedMonth = (startMonth + i);
        let month = unmoddedMonth;
        while (month > 12) {
            month -= 12;
        }
        const monthName = getMonthName(month).full;
        // Year is start year +1 for each 12 months
        let yearsToAdd = 0;
        let monthsOfYearsToAdd = unmoddedMonth;
        while (monthsOfYearsToAdd > 12) {
            monthsOfYearsToAdd -= 12;
            yearsToAdd += 1;
        }
        const year = startYear + yearsToAdd;
        // Figure out which days are allowed
        const days = [];
        const numDaysInMonth = (new Date(year, month, 0)).getDate();
        // Current month
        if (month === today.month && year === today.year) {
            // Past selection: add all previous days of the month
            if (!dontAllowPast) {
                for (let day = 1; day < today.day; day++) {
                    days.push(day);
                }
            }
            days.push(today.day); // Add current day
            // Future selection: add all remaining days of the month
            if (!dontAllowFuture) {
                for (let day = today.day + 1; day <= numDaysInMonth; day++) {
                    days.push(day);
                }
            }
        }
        else { // Past or future month
            // Include all days in the month
            for (let day = 1; day <= numDaysInMonth; day++) {
                days.push(day);
            }
        }
        choices.push({
            choiceName: `${monthName} ${year}`,
            month,
            year,
            days,
        });
    }
    // Create choice options
    const { month, day, year, } = props;
    const monthOptions = [];
    const dayOptions = [];
    choices.forEach((choice) => {
        // Create month option
        monthOptions.push(React__default["default"].createElement("option", { key: `${choice.year}-${choice.month}`, value: `${choice.month}-${choice.year}`, "aria-label": `choose ${choice.choiceName}`, onSelect: () => {
                onChange(choice.month, choice.days[0], choice.year);
            } }, choice.choiceName));
        // This is the currently selected month
        if (month === choice.month) {
            // Create day options
            choice.days.forEach((dayChoice) => {
                const ordinal = getOrdinal(dayChoice);
                dayOptions.push(React__default["default"].createElement("option", { key: `${choice.year}-${choice.month}-${dayChoice}`, value: dayChoice, "aria-label": `choose date ${dayChoice}` },
                    dayChoice,
                    ordinal));
            });
        }
    });
    return (React__default["default"].createElement("div", { className: "SimpleDateChooser d-inline-block", "aria-label": `date chooser with selected date: ${month}/${day}/${year}` },
        React__default["default"].createElement("select", { "aria-label": `month for ${ariaLabel}`, className: "custom-select d-inline-block mr-1", style: { width: 'auto' }, id: `SimpleDateChooser-${name}-month`, value: `${month}-${year}`, onChange: (e) => {
                const choice = choices[e.target.selectedIndex];
                // Change day, month, and year
                onChange(choice.month, choice.days[0], choice.year);
            } }, monthOptions),
        React__default["default"].createElement("select", { "aria-label": `day for ${ariaLabel}`, className: "custom-select d-inline-block", style: { width: 'auto' }, id: `SimpleDateChooser-${name}-day`, value: day, onChange: (e) => {
                // Only change the day
                onChange(month, Number.parseInt(e.target.value, 10), year);
            } }, dayOptions)));
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
 * A very simple, lightweight time chooser
 * @author Gardenia Liu
 */
/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/
// Allowed intervals between options
const ALLOWED_INTERVALS = [15, 30, 60]; // min
// Default interval to use if an unsupported interval is passed in
const DEFAULT_INTERVAL = ALLOWED_INTERVALS[0]; // min
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const SimpleTimeChooser = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    const { ariaLabel, name, hour, minute, onChange, } = props;
    let { intervalMin = DEFAULT_INTERVAL, } = props;
    // Use default interval if not supported
    if (!ALLOWED_INTERVALS.includes(intervalMin)) {
        intervalMin = DEFAULT_INTERVAL;
    }
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Convert number of minutes since midnight into 24hour and minute format
     * @author Gabe Abrams
     * @param minSinceMidnight total minutes since midnight
     * @returns hours (24) and minutes
     */
    const convertMinSinceMidnightToHoursAndMin = (minSinceMidnight) => {
        return {
            hours: Math.floor(minSinceMidnight / 60),
            minutes: minSinceMidnight % 60,
        };
    };
    /**
     * Convert time in minutes into HH:MM format
     * @author Gardenia Liu
     * @param totalMinutes total minutes since midnight
     * @returns formatted time string
     */
    const formatTime = (totalMinutes) => {
        // Handle special cases
        if (totalMinutes === 0) {
            return '12:00 Midnight';
        }
        if (totalMinutes === 12 * 60) {
            return '12:00 Noon';
        }
        // All normal cases:
        const timeInfo = convertMinSinceMidnightToHoursAndMin(totalMinutes);
        let { hours } = timeInfo;
        const { minutes } = timeInfo;
        // Process 24hr -> 12hr
        const isAM = (hours < 12);
        if (hours === 0) {
            hours = 12;
        }
        else if (hours > 12) {
            hours %= 12;
        }
        // Pad with zeros
        const paddedMinutes = padZerosLeft(minutes, 2);
        // Assemble time string
        return `${hours}:${paddedMinutes} ${isAM ? 'AM' : 'PM'}`;
    };
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    // Generate list of time options
    const times = [];
    for (let time = 0; time < 24 * 60; time += intervalMin) {
        times.push(formatTime(time));
    }
    // Currently selected time in minutes since midnight
    const selectedTimeMin = hour * 60 + minute;
    // Create choice options
    const timeOptions = times.map((timeString, timeIndex) => {
        const numMinutesForChoice = timeIndex * intervalMin;
        // Render the option
        return (React__default["default"].createElement("option", { key: numMinutesForChoice, value: numMinutesForChoice, "aria-label": `choose ${timeString}` }, timeString));
    });
    return (React__default["default"].createElement("div", { className: "SimpleTimeChooser-container", "aria-label": `time chooser with selected time: ${formatTime(selectedTimeMin)}` },
        React__default["default"].createElement("select", { "aria-label": `time for ${ariaLabel}`, className: "custom-select d-inline-block", style: { width: 'auto' }, id: `SimpleTimeChooser-${name}-time`, value: selectedTimeMin, onChange: (e) => {
                // Parse selector value (string)
                const newTime = Number.parseInt(e.target.value, 10);
                // Convert minutes since midnight to hour and minute
                const timeInfo = convertMinSinceMidnightToHoursAndMin(newTime);
                // Notify parent
                onChange(timeInfo.hours, timeInfo.minutes);
            } }, timeOptions)));
};

/**
 * Drawer container
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$6 = `
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const Drawer = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { grayBackground, customBackgroundColor, children, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: "Drawer-container", style: {
            backgroundColor: (grayBackground
                ? '#E2E3E5'
                : (customBackgroundColor !== null && customBackgroundColor !== void 0 ? customBackgroundColor : undefined)),
        } },
        React__default["default"].createElement("style", null, style$6),
        children));
};

/**
 * Success checkmark that pops into view
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$5 = `
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const PopSuccessMark = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { sizeRem = 3, circleVariant = 'success', checkVariant = 'white', } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: `PopSuccessMark-outer-container bg-${circleVariant}`, style: {
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
        }, "aria-label": "checkmark indicating success" },
        React__default["default"].createElement("style", null, style$5),
        React__default["default"].createElement("div", { className: `PopSuccessMark-check-stroke-1 bg-${checkVariant}`, style: {
                borderRadius: `${sizeRem / 5}rem`,
            } }),
        React__default["default"].createElement("div", { className: `PopSuccessMark-check-stroke-2 bg-${checkVariant}`, style: {
                borderRadius: `${sizeRem / 5}rem`,
            } })));
};

/**
 * Failure x mark that pops into view
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$4 = `
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const PopFailureMark = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { sizeRem = 3, circleVariant = 'danger', xVariant = 'white', } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: `PopFailureMark-outer-container bg-${circleVariant}`, style: {
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
        }, "aria-label": "mark indicating failure" },
        React__default["default"].createElement("style", null, style$4),
        React__default["default"].createElement("div", { className: `PopFailureMark-x-stroke-1 bg-${xVariant}`, style: {
                borderRadius: `${sizeRem / 5}rem`,
            } }),
        React__default["default"].createElement("div", { className: `PopFailureMark-x-stroke-2 bg-${xVariant}`, style: {
                borderRadius: `${sizeRem / 5}rem`,
            } })));
};

/**
 * Failure pending that pops into view
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$3 = `
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const PopPendingMark = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { sizeRem = 3, circleVariant = 'warning', hourglassVariant = 'white', } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: `PopPendingMark-outer-container bg-${circleVariant}`, style: {
            width: `${sizeRem}rem`,
            height: `${sizeRem}rem`,
        }, "aria-label": "mark indicating that the item is pending" },
        React__default["default"].createElement("style", null, style$3),
        React__default["default"].createElement("div", null,
            React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faHourglass, className: `PopPendingMark-hourglass text-${hourglassVariant}`, style: {
                    fontSize: `${sizeRem * 0.6}rem`,
                } }))));
};

/**
 * Copiable text box
 * @author Gabe Abrams
 */
/* ------------- Actions ------------ */
// Types of actions
var ActionType$9;
(function (ActionType) {
    // Indicate that the text was recently copied
    ActionType["IndicateRecentlyCopied"] = "indicate-recently-copied";
    // Clear the status
    ActionType["ClearRecentlyCopiedStatus"] = "clear-recently-copied-status";
})(ActionType$9 || (ActionType$9 = {}));
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer$a = (state, action) => {
    switch (action.type) {
        case ActionType$9.IndicateRecentlyCopied: {
            return {
                recentlyCopied: true,
            };
        }
        case ActionType$9.ClearRecentlyCopiedStatus: {
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const CopiableBox = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
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
    const [state, dispatch] = React.useReducer(reducer$a, initialState);
    // Destructure common state
    const { recentlyCopied, } = state;
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
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
            return alert('Unable to copy', 'Oops! We couldn\'t copy that to the clipboard. Please copy the text manually.');
        }
        // Show copied notice
        dispatch({
            type: ActionType$9.IndicateRecentlyCopied,
        });
        // Wait a moment
        yield waitMs(4000);
        // Hide copied notice
        dispatch({
            type: ActionType$9.ClearRecentlyCopiedStatus,
        });
    });
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (React__default["default"].createElement("div", { className: "input-group" },
        (label || labelIcon) && (React__default["default"].createElement("span", { className: "input-group-text", style: {
                minWidth: (minLabelWidthRem
                    ? `${minLabelWidthRem}rem`
                    : undefined),
            } },
            labelIcon && (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: labelIcon, className: label ? 'me-1' : undefined })),
            label)),
        multiline
            ? (React__default["default"].createElement("textarea", { id: textAreaId, className: "CopiableBox-text CopiableBox-text-multiline form-control bg-white text-dark", value: text, "aria-label": `${label} text`, rows: numVisibleLines, onClick: onClick, style: {
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
            : (React__default["default"].createElement("input", { id: textAreaId, type: "text", className: "CopiableBox-text CopiableBox-text-single-line form-control bg-white text-dark", value: text, "aria-label": `${label} text`, onClick: onClick, style: {
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
        React__default["default"].createElement("button", { id: copyButtonId, className: "btn btn-secondary", type: "button", "aria-label": `copy ${label} to the clipboard`, disabled: recentlyCopied, style: {
                minWidth: '5.2rem',
            }, onClick: performCopy }, recentlyCopied
            ? 'Copied!'
            : (React__default["default"].createElement("span", null,
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faClipboard, className: "me-1" }),
                "Copy")))));
};

/**
 * Reusable nested item picker
 * @author Yuen Ler Chow
 * @author Gabe Abrams
 */
/* ------------- Actions ------------ */
// Types of actions
var ActionType$8;
(function (ActionType) {
    // Toggle whether a child are being shown
    ActionType["ToggleChild"] = "toggle-child";
})(ActionType$8 || (ActionType$8 = {}));
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer$9 = (state, action) => {
    switch (action.type) {
        case ActionType$8.ToggleChild: {
            return Object.assign(Object.assign({}, state), { childExpanded: Object.assign(Object.assign({}, state.childExpanded), { [String(action.id)]: !state.childExpanded[String(action.id)] }) });
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const NestableItemList = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { items, onChanged, } = props;
    /* -------------- State ------------- */
    // Create initial map of child expanded booleans
    const initChildExpanded = {};
    items.forEach((item) => {
        initChildExpanded[String(item.id)] = false;
    });
    // Initial state
    const initialState = {
        childExpanded: initChildExpanded,
    };
    // Initialize state
    const [state, dispatch] = React.useReducer(reducer$9, initialState);
    // Destructure common state
    const { childExpanded, } = state;
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
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
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    return (React__default["default"].createElement("div", null, items.map((item) => {
        return (React__default["default"].createElement("div", { key: item.id },
            React__default["default"].createElement("span", { className: "NestableItemList-dropdown-button-container d-inline-block", style: {
                    minWidth: '2rem',
                } }, item.isGroup && (React__default["default"].createElement("button", { className: `NestableItemList-dropdown-button NestableItemList-dropdown-button-${item.id}`, style: {
                    border: 0,
                    backgroundColor: 'transparent',
                }, type: "button", onClick: () => {
                    dispatch({
                        type: ActionType$8.ToggleChild,
                        id: item.id,
                    });
                }, "aria-label": `${childExpanded[item.id] ? 'Hide' : 'Show'} items in ${item.name}` },
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: childExpanded[item.id] ? freeSolidSvgIcons.faChevronDown : freeSolidSvgIcons.faChevronRight })))),
            React__default["default"].createElement(CheckboxButton, { className: `NestableItemList-CheckboxButton-${item.id}`, text: item.name, checked: item.isGroup ? allChecked(item.children) : item.checked, dashed: item.isGroup ? !noneChecked(item.children) : false, onChanged: (checked) => {
                    onChanged(changeChecked(item.id, checked, items));
                }, ariaLabel: `Select ${item.name}`, checkedVariant: Variant$1.Light, uncheckedVariant: Variant$1.Light }),
            (item.isGroup && childExpanded[item.id]) && (React__default["default"].createElement("div", { className: "NestableItemList-children-container", style: {
                    paddingLeft: '2.2rem',
                } },
                React__default["default"].createElement(NestableItemList, { items: item.children, onChanged: (updatedItems) => {
                        onChanged(changeItems(item.id, updatedItems));
                    } })))));
    })));
};

/**
 * Reusable nested item picker
 * @author Yuen Ler Chow
 */
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const ItemPicker = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { title, items, onChanged, noBottomMargin, hideSelectAllOrNoneButtons, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Updates the checked state of an item (including all children)
     * @author Yuen Ler Chow
     * @param item the item to update
     * @param checked the new checked state
     * @returns the updated item
     */
    const updateItemChecked = (item, checked) => {
        if (item.isGroup) {
            return Object.assign(Object.assign({}, item), { children: item.children.map((child) => {
                    return updateItemChecked(child, checked);
                }) });
        }
        return Object.assign(Object.assign({}, item), { checked });
    };
    /**
     * Selects all items in the list
     * @author Yuen Ler Chow
     */
    const handleSelectAll = () => {
        const updatedItems = items.map((item) => {
            return updateItemChecked(item, true);
        });
        onChanged(updatedItems);
    };
    /**
     * Deselects all items in the list
     * @author Yuen Ler Chow
     */
    const handleDeselectAll = () => {
        const updatedItems = items.map((item) => {
            return updateItemChecked(item, false);
        });
        onChanged(updatedItems);
    };
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    // Select all/none
    const selectAllOrNone = (!hideSelectAllOrNoneButtons
        ? (React__default["default"].createElement("div", { className: "d-flex h-100 align-items-end flex-row" },
            React__default["default"].createElement("div", { className: "d-flex justify-content-end" },
                React__default["default"].createElement("div", { className: "me-2", style: { fontSize: '1.2rem' } }, "Select"),
                React__default["default"].createElement("div", { className: "btn-group", role: "group" },
                    React__default["default"].createElement("button", { type: "button", style: { borderRight: '0.1rem solid white' }, "aria-label": "Select all contexts", className: "btn btn-secondary py-0", onClick: handleSelectAll }, "All"),
                    React__default["default"].createElement("button", { type: "button", "aria-label": "Deselect all contexts", className: "btn btn-secondary py-0", onClick: handleDeselectAll }, "None")))))
        : undefined);
    // Main UI
    return (React__default["default"].createElement(TabBox, { title: title, noBottomMargin: noBottomMargin, topRightChildren: selectAllOrNone },
        React__default["default"].createElement("div", { style: { overflowX: 'auto' } },
            React__default["default"].createElement(NestableItemList, { items: items, onChanged: onChanged }))));
};

// Import shared helpers
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
    // Get the short month description
    const monthName = getMonthName(month).short;
    // Create start of description
    let description = `${monthName} ${day}${getOrdinal(day)}`;
    // Add on year if it's different
    if (year !== currYear) {
        description += ` ${year}`;
    }
    // Return description
    return description;
};

/**
 * Path of the route for getting logs for log review
 * @author Gabe Abrams
 */
const LOG_REVIEW_GET_LOGS_ROUTE = `/admin${ROUTE_PATH_PREFIX}/logs`;

/**
 * Source of a log event
 * @author Gabe Abrams
 */
var LogSource;
(function (LogSource) {
    // Client
    LogSource["Client"] = "client";
    // Server
    LogSource["Server"] = "server";
})(LogSource || (LogSource = {}));
var LogSource$1 = LogSource;

/**
 * Type of a log event
 * @author Gabe Abrams
 */
var LogType;
(function (LogType) {
    // User action
    LogType["Action"] = "action";
    // Error
    LogType["Error"] = "error";
})(LogType || (LogType = {}));
var LogType$1 = LogType;

/**
 * Types of actions
 * @author Gabe Abrams
 */
var LogAction;
(function (LogAction) {
    // Target was opened by the user (it was not on screen, but now it is)
    LogAction["Open"] = "Open";
    // Target was closed by the user (it was on screen, but now it is not)
    LogAction["Close"] = "Close";
    // Target was cancelled by the user (it was on closed without saving)
    LogAction["Cancel"] = "Cancel";
    // Target was expanded by the user (it always remains on screen, but size was changed)
    LogAction["Expand"] = "Expand";
    // Target was collapsed by the user (it always remains on screen, but size was changed)
    LogAction["Collapse"] = "Collapse";
    // Target was viewed by the user (only for items that are not opened or closed, those must use Open/Close actions)
    LogAction["View"] = "View";
    // Target interrupted the user (popup, dialog, validation message, etc. appeared without user prompting)
    LogAction["Interrupt"] = "Interrupt";
    // Target was created by the user (it did not exist before)
    LogAction["Create"] = "Create";
    // Target was modified by the user (it existed and was changed)
    LogAction["Modify"] = "Modify";
    // Target was deleted by the user (it existed and now it doesn't)
    LogAction["Delete"] = "Delete";
    // Target was added by the user (it already existed and was added to another place)
    LogAction["Add"] = "Add";
    // Target was removed by the user (it was removed from something but still exists)
    LogAction["Remove"] = "Remove";
    // Target was activated by the user (click, check, tap, keypress, etc.)
    LogAction["Activate"] = "Activate";
    // Target was deactivated by the user (click away, uncheck, tap outside of, tab away, etc.)
    LogAction["Deactivate"] = "Deactivate";
    // User showed interest in a target (hover, peek, etc.)
    LogAction["Peek"] = "Peek";
    // Halt a process (pause, etc.)
    LogAction["Halt"] = "Halt";
    // Resume a process (resume a halted process)
    LogAction["Resume"] = "Resume";
    // Jump to/seek to/reveal/go to/navigate to a target
    LogAction["Jump"] = "Jump";
    // Post a submission/message/etc. into the target
    LogAction["Post"] = "Post";
    // Unknown action
    LogAction["Unknown"] = "Unknown";
})(LogAction || (LogAction = {}));
var LogAction$1 = LogAction;

/**
 * Server-side API param types
 * @author Gabe Abrams
 */
var ParamType;
(function (ParamType) {
    ParamType["Boolean"] = "Boolean";
    ParamType["BooleanOptional"] = "BooleanOptional";
    ParamType["Float"] = "Float";
    ParamType["FloatOptional"] = "FloatOptional";
    ParamType["Int"] = "Int";
    ParamType["IntOptional"] = "IntOptional";
    ParamType["JSON"] = "JSON";
    ParamType["JSONOptional"] = "JSONOptional";
    ParamType["String"] = "String";
    ParamType["StringOptional"] = "StringOptional";
})(ParamType || (ParamType = {}));
var ParamType$1 = ParamType;

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

/**
 * Escape a CSV cell if needed
 * @author Gabe Abrams
 * @param text the cell contents
 * @returns escaped cell text
 */
const escapeCellText = (text) => {
    if (!String(text).includes(',')
        && !String(text).includes('"')) {
        // No need to escape
        return String(text);
    }
    // Perform escape
    return `"${String(text).replace(/"/g, '""')}"`;
};
/**
 * Generate a CSV file
 * @author Gabe Abrams
 * @param data list of row data in the form of json objects
 * @param columns list of columns to include in the csv
 * @returns multiline csv string
 */
const genCSV = (data, columns) => {
    let csv = '';
    // Add header
    csv += (columns
        .map((column) => {
        return escapeCellText(column.title);
    })
        .join(','));
    // Add each row
    data.forEach((datum) => {
        csv += '\n';
        csv += (columns
            .map((column) => {
            let contents;
            const cell = datum[column.param];
            if (typeof cell === 'string'
                || typeof cell === 'number') {
                contents = String(cell);
            }
            else if (typeof cell === 'undefined'
                || cell === null) {
                contents = '';
            }
            else if (typeof cell === 'object') {
                contents = JSON.stringify(cell);
            }
            else {
                contents = '';
            }
            return escapeCellText(contents);
        })
            .join(','));
    });
    // Return
    return csv;
};

/**
 * Button for downloading a csv file
 * @author Gabe Abrams
 */
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const CSVDownloadButton = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure all props
    const { filename, csv, id, className, ariaLabel, style, onClick, children, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    // Render the button
    return (React__default["default"].createElement("a", { id: id, download: filename, href: `data:application/octet-stream,${encodeURIComponent(csv)}`, className: `CSVDownloadButton-button ${className !== null && className !== void 0 ? className : 'btn btn-secondary'}`, "aria-label": (ariaLabel
            ? `Click to download ${filename}`
            : ariaLabel), style: style, onClick: onClick },
        !children && (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCloudDownloadAlt }),
            ' ',
            "Download CSV")),
        children));
};

/**
 * Intelligent table
 * @author Gabe Abrams
 */
// Sort types
var SortType;
(function (SortType) {
    // Ascending
    SortType["Ascending"] = "ascending";
    // Descending
    SortType["Descending"] = "descending";
})(SortType || (SortType = {}));
/* ------------- Actions ------------ */
// Types of actions
var ActionType$7;
(function (ActionType) {
    // Toggle sort column param
    ActionType["ToggleSortColumn"] = "toggle-sort-column";
    // Toggle the visibility of a column
    ActionType["UpdateColumnVisibility"] = "update-column-visibility";
    // Toggle the column visibility customization modal
    ActionType["ToggleColVisCusModalVisibility"] = "toggle-col-vis-cus-modal-visibility";
    // Show all columns
    ActionType["ShowAllColumns"] = "show-all-columns";
    // Hide all columns
    ActionType["HideAllColumns"] = "hide-all-columns";
})(ActionType$7 || (ActionType$7 = {}));
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer$8 = (state, action) => {
    switch (action.type) {
        case ActionType$7.ToggleSortColumn: {
            if (action.param !== state.sortColumnParam) {
                // Different column param
                return Object.assign(Object.assign({}, state), { sortColumnParam: action.param, sortType: SortType.Ascending });
            }
            if (state.sortType === SortType.Ascending) {
                // Switch to descending
                return Object.assign(Object.assign({}, state), { sortType: SortType.Descending });
            }
            // Stop sorting by column
            return Object.assign(Object.assign({}, state), { sortColumnParam: undefined, sortType: SortType.Ascending });
        }
        case ActionType$7.UpdateColumnVisibility: {
            const { columnVisibilityMap } = state;
            columnVisibilityMap[action.param] = action.visible;
            return Object.assign(Object.assign({}, state), { columnVisibilityMap });
        }
        case ActionType$7.ToggleColVisCusModalVisibility: {
            return Object.assign(Object.assign({}, state), { columnVisibilityCustomizationModalVisible: !state.columnVisibilityCustomizationModalVisible });
        }
        case ActionType$7.ShowAllColumns: {
            const { columnVisibilityMap } = state;
            Object.keys(columnVisibilityMap).forEach((param) => {
                columnVisibilityMap[param] = true;
            });
            return Object.assign(Object.assign({}, state), { columnVisibilityMap });
        }
        case ActionType$7.HideAllColumns: {
            const { columnVisibilityMap } = state;
            Object.keys(columnVisibilityMap).forEach((param) => {
                columnVisibilityMap[param] = false;
            });
            return Object.assign(Object.assign({}, state), { columnVisibilityMap });
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const IntelliTable = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    var _a;
    /* -------------- Props ------------- */
    // Destructure all props
    const { title, id, columns, csvName, data = [], } = props;
    // Get data, show empty row if none
    if (data.length === 0) {
        data.push({ id: 'empty-row' });
    }
    // Get CSV filename
    let filename = `${title}.csv`;
    if (csvName) {
        filename = (csvName.endsWith('.csv')
            ? csvName
            : `${csvName}.csv`);
    }
    /* -------------- State ------------- */
    // Initial state
    const initColumnVisibilityMap = {};
    columns.forEach((column) => {
        initColumnVisibilityMap[column.param] = !column.startsHidden;
    });
    const initialState = {
        sortColumnParam: undefined,
        sortType: SortType.Descending,
        columnVisibilityMap: initColumnVisibilityMap,
        columnVisibilityCustomizationModalVisible: false,
    };
    // Initialize state
    const [state, dispatch] = React.useReducer(reducer$8, initialState);
    // Destructure common state
    const { sortColumnParam, sortType, columnVisibilityMap, columnVisibilityCustomizationModalVisible, } = state;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* ---------------- Modal --------------- */
    /*----------------------------------------*/
    // Modal that may be defined
    let modal;
    /* ------- Col Vis Customization Modal ------ */
    if (columnVisibilityCustomizationModalVisible) {
        // Create modal
        modal = (React__default["default"].createElement(Modal, { type: ModalType$1.Okay, title: "Choose columns to show:", onClose: () => {
                const noColumnsSelected = (Object.values(columnVisibilityMap)
                    .every((isSelected) => {
                    return !isSelected;
                }));
                if (noColumnsSelected) {
                    return alert('Choose at least one column', 'To continue, you have to choose at least one column to show');
                }
                dispatch({
                    type: ActionType$7.ToggleColVisCusModalVisibility,
                });
            }, okayVariant: Variant$1.Light },
            columns.map((column) => {
                return (React__default["default"].createElement(CheckboxButton, { key: column.param, id: `IntelliTable-${id}-toggle-visibility-${column.param}`, className: "mb-2", text: column.title, onChanged: (checked) => {
                        dispatch({
                            type: ActionType$7.UpdateColumnVisibility,
                            param: column.param,
                            visible: checked,
                        });
                    }, checked: columnVisibilityMap[column.param], ariaLabel: `show "${column.title}" column in the ${title} table`, checkedVariant: Variant$1.Light, uncheckedVariant: Variant$1.Light }));
            }),
            React__default["default"].createElement("div", { className: "mt-3" }, "Or you can:"),
            React__default["default"].createElement("button", { type: "button", id: `IntelliTable-${id}-select-all-columns`, className: "btn btn-secondary me-2", "aria-label": `show all columns in the ${title} table`, onClick: () => {
                    dispatch({
                        type: ActionType$7.ShowAllColumns,
                    });
                } }, "Select All"),
            React__default["default"].createElement("button", { type: "button", id: `IntelliTable-${id}-select-none-columns`, className: "btn btn-secondary", "aria-label": `hide all columns in the ${title} table`, onClick: () => {
                    dispatch({
                        type: ActionType$7.HideAllColumns,
                    });
                } }, "Deselect All")));
    }
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    // Table header
    const headerCells = (columns
        .filter((column) => {
        return columnVisibilityMap[column.param];
    })
        .map((column) => {
        // Custom info based on current sort type
        let sortButtonAriaLabel;
        let sortIcon = freeSolidSvgIcons.faSort;
        let sortingByThisColumn = false;
        if (!sortColumnParam) {
            // Not being sorted yet
            sortButtonAriaLabel = `sort ascending by ${column.title}`;
            sortIcon = freeSolidSvgIcons.faSort;
        }
        else if (column.param === sortColumnParam) {
            // Already sorted by this column
            sortingByThisColumn = true;
            if (sortType === SortType.Ascending) {
                // Sorted ascending
                sortButtonAriaLabel = `sort descending by ${column.title}`;
                sortIcon = freeSolidSvgIcons.faSortDown;
            }
            else {
                // Sorted descending
                sortButtonAriaLabel = `stop sorting by ${column.title}`;
                sortIcon = freeSolidSvgIcons.faSortUp;
            }
        }
        else {
            // Sorted by a different column
            sortButtonAriaLabel = `sort ascending by ${column.title}`;
            sortIcon = freeSolidSvgIcons.faSort;
        }
        // Create the cell UI
        return (React__default["default"].createElement("th", { key: column.param, scope: "col", id: `IntelliTable-${id}-header-${column.param}`, className: "text-start", style: {
                borderRight: '0.05rem solid #555',
                borderLeft: '0.05rem solid #555',
            } },
            React__default["default"].createElement("div", { className: "d-flex align-items-center justify-content-start flex-row h-100" },
                React__default["default"].createElement("span", { className: "text-nowrap" }, column.title),
                React__default["default"].createElement("div", null,
                    React__default["default"].createElement("button", { type: "button", id: `IntelliTable-${id}-sort-by-${column.param}-button`, className: `btn btn-${sortingByThisColumn ? 'light' : 'secondary'} btn-sm ms-1 ps-1 pe-1 pt-0 pb-0`, "aria-label": sortButtonAriaLabel, onClick: () => {
                            dispatch({
                                type: ActionType$7.ToggleSortColumn,
                                param: column.param,
                            });
                        } },
                        React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: sortIcon }))))));
    }));
    const tableHeader = (React__default["default"].createElement("thead", null,
        React__default["default"].createElement("tr", null, headerCells)));
    // Sort data
    const sortedData = [...data];
    const paramType = (_a = columns.find((column) => {
        return (column.param === sortColumnParam);
    })) === null || _a === void 0 ? void 0 : _a.type;
    const descending = (sortType === SortType.Descending);
    if (sortColumnParam) {
        sortedData.sort((a, b) => {
            var _a, _b;
            const aVal = a[sortColumnParam];
            const bVal = b[sortColumnParam];
            // Tiebreaker sort by timestamp, most recent first (used if tied)
            const tiebreaker = (((_a = b.timestamp) !== null && _a !== void 0 ? _a : 0)
                - ((_b = a.timestamp) !== null && _b !== void 0 ? _b : 0));
            // Auto-sort undefined and null to end of list
            if ((aVal === undefined || aVal === null)
                || (bVal === undefined || bVal === null)) {
                // At least one was undefined
                if ((aVal === undefined || aVal === null)
                    && (bVal === undefined || bVal === null)) {
                    // Both undefined
                    return tiebreaker;
                }
                if (aVal === undefined || aVal === null) {
                    // First was undefined
                    return 1;
                }
                // Second was undefined
                return -1;
            }
            // Sort differently based on the data type
            // > Boolean
            if (paramType === ParamType$1.Boolean) {
                if (aVal && !bVal) {
                    return (descending ? -1 : 1);
                }
                if (!aVal && bVal) {
                    return (descending ? 1 : -1);
                }
                return tiebreaker;
            }
            // > Number
            if (paramType === ParamType$1.Int
                || paramType === ParamType$1.Float) {
                return (descending
                    ? (bVal - aVal)
                    : (aVal - bVal));
            }
            // > String
            if (paramType === ParamType$1.String) {
                if (aVal < bVal) {
                    return (descending ? 1 : -1);
                }
                if (aVal > bVal) {
                    return (descending ? -1 : 1);
                }
                return tiebreaker;
            }
            // > JSON
            if (paramType === ParamType$1.JSON) {
                const aSize = (Array.isArray(aVal)
                    ? aVal.length
                    : Object.keys(aVal).length);
                const bSize = (Array.isArray(bVal)
                    ? bVal.length
                    : Object.keys(bVal).length);
                return (descending
                    ? (bSize - aSize)
                    : (aSize - bSize));
            }
            // No sort
            return tiebreaker;
        });
    }
    // Table body
    const rows = sortedData.map((datum) => {
        // Build cells
        const cells = (columns
            .filter((column) => {
            return columnVisibilityMap[column.param];
        })
            .map((column) => {
            // Get value
            let value = datum;
            const paramParts = column.param.split('.');
            paramParts.forEach((paramPart) => {
                value = (value !== null && value !== void 0 ? value : {})[paramPart];
            });
            let fullValue;
            let visibleValue;
            let colTitle = '';
            if (column.type === ParamType$1.Boolean) {
                fullValue = !!(value);
                const noValue = (value === undefined
                    || value === null);
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faMinus }))
                    : (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: fullValue ? freeSolidSvgIcons.faCheckCircle : freeSolidSvgIcons.faXmarkCircle })));
                colTitle = (fullValue ? 'True' : 'False');
                if (noValue) {
                    colTitle = 'Empty Cell';
                }
            }
            else if (column.type === ParamType$1.Int) {
                fullValue = Number.parseInt(value, 10);
                const noValue = Number.isNaN(fullValue);
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faMinus }))
                    : fullValue);
                colTitle = String(fullValue);
                if (noValue) {
                    colTitle = 'Empty Cell';
                }
            }
            else if (column.type === ParamType$1.Float) {
                fullValue = Number.parseFloat(value);
                const noValue = Number.isNaN(fullValue);
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faMinus }))
                    : roundToNumDecimals(fullValue, 2));
                colTitle = String(fullValue);
                if (noValue) {
                    colTitle = 'Empty Cell';
                }
            }
            else if (column.type === ParamType$1.String) {
                fullValue = String(value).trim();
                const noValue = (value === undefined
                    || value === null
                    || String(fullValue).trim().length === 0);
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faMinus }))
                    : fullValue);
                colTitle = `"${value}"`;
                if (noValue) {
                    colTitle = 'Empty Cell';
                }
            }
            else if (column.type === ParamType$1.JSON) {
                fullValue = JSON.stringify(value);
                const noValue = (Array.isArray(value)
                    ? (!value || value.length === 0)
                    : Object.keys(value !== null && value !== void 0 ? value : {}).length === 0);
                visibleValue = (noValue
                    ? (React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faMinus }))
                    : fullValue);
                colTitle = 'JSON Object';
            }
            // Create UI
            return (React__default["default"].createElement("td", { key: `${datum.id}-${column.param}`, title: colTitle, style: {
                    borderRight: '0.05rem solid #555',
                    borderLeft: '0.05rem solid #555',
                } }, visibleValue));
        }));
        // Add cells to a row
        return (React__default["default"].createElement("tr", { key: datum.id }, cells));
    });
    const tableBody = (React__default["default"].createElement("tbody", null, rows));
    // Build table
    const table = (React__default["default"].createElement("table", { className: "table table-dark table-striped" },
        tableHeader,
        tableBody));
    // Count the number of hidden columns
    const numHiddenCols = (Object.values(columnVisibilityMap)
        .filter((isVisible) => {
        return !isVisible;
    })
        .length);
    // Build CSV
    const csv = genCSV(data, columns.filter((column) => {
        return columnVisibilityMap[column.param];
    }));
    // Build main UI
    return (React__default["default"].createElement("div", { className: `IntelliTable-container-${id}` },
        modal,
        React__default["default"].createElement("div", { className: "d-flex align-items-center justify-content-start" },
            React__default["default"].createElement("h3", { className: "m-0" }, title),
            React__default["default"].createElement("div", { className: "flex-grow-1 text-end" },
                React__default["default"].createElement(CSVDownloadButton, { "aria-label": `download data as csv for ${title}`, id: `IntelliTable-${id}-download-as-csv`, filename: filename, csv: csv }),
                React__default["default"].createElement("button", { type: "button", className: "btn btn-secondary ms-2", "aria-label": `show panel for customizing which columns show in table ${title}`, id: `IntelliTable-${id}-show-column-customization-modal`, onClick: () => {
                        dispatch({
                            type: ActionType$7.ToggleColVisCusModalVisibility,
                        });
                    } },
                    "Show/Hide Cols",
                    numHiddenCols > 0 && (React__default["default"].createElement(React__default["default"].Fragment, null,
                        ' ',
                        "(",
                        numHiddenCols,
                        ' ',
                        "hidden)"))))),
        React__default["default"].createElement("div", { className: `IntelliTable-table-${id} mt-2`, style: {
                overflowX: 'auto',
            } }, table)));
};

// Import React
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const Pagination = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    /* -------------- Props ------------- */
    // Destructure props
    const { currentPage, numPages, loading = false, onPageChanged, } = props;
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    // Compute pages to display
    const pages = [];
    const delta = 2; // how many pages to show on either side of current
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(numPages, currentPage + delta);
    // If we are too close to the beginning or end, shift the window.
    if (currentPage - delta < 1) {
        end = Math.min(numPages, end + (1 - (currentPage - delta)));
    }
    if (currentPage + delta > numPages) {
        start = Math.max(1, start - ((currentPage + delta) - numPages));
    }
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    // Render
    return (React__default["default"].createElement("nav", { "aria-label": "Page navigation for logs", className: "mt-3" },
        React__default["default"].createElement("ul", { className: "pagination justify-content-center" },
            React__default["default"].createElement("li", { className: `page-item ${(currentPage <= 1 || loading) ? 'disabled' : ''}` },
                React__default["default"].createElement("button", { type: "button", className: "page-link", onClick: () => { return onPageChanged(currentPage - 1); }, disabled: currentPage <= 1 || loading, "aria-label": "Go to previous page" },
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faArrowLeft }),
                    ' ',
                    "Prev")),
            (currentPage > 3 && pages[0] !== 1) && (React__default["default"].createElement("li", { className: "page-item" },
                React__default["default"].createElement("button", { type: "button", className: "page-link", onClick: () => { return onPageChanged(1); }, disabled: loading, "aria-label": "Go to page 1" }, "1"))),
            currentPage > 4 && (React__default["default"].createElement("li", { className: "page-item disabled" },
                React__default["default"].createElement("span", { className: "page-link" }, "..."))),
            pages.map((pageNum) => {
                return (React__default["default"].createElement("li", { key: pageNum, className: `page-item ${pageNum === currentPage ? 'active' : ''}` },
                    React__default["default"].createElement("button", { type: "button", className: "page-link", onClick: () => { return onPageChanged(pageNum); }, disabled: loading, "aria-label": `Go to page ${pageNum}` }, pageNum)));
            }),
            currentPage < numPages - 3 && (React__default["default"].createElement("li", { className: "page-item disabled" },
                React__default["default"].createElement("span", { className: "page-link" }, "..."))),
            (currentPage < numPages - 2
                && pages[pages.length - 1] !== numPages) && (React__default["default"].createElement("li", { className: "page-item" },
                React__default["default"].createElement("button", { type: "button", className: "page-link", onClick: () => { return onPageChanged(numPages); }, disabled: loading, "aria-label": "Go to last page" }, numPages))),
            React__default["default"].createElement("li", { className: `page-item ${(currentPage >= numPages || loading) ? 'disabled' : ''}` },
                React__default["default"].createElement("button", { type: "button", className: "page-link", onClick: () => { return onPageChanged(currentPage + 1); }, disabled: currentPage >= numPages || loading, "aria-label": "Go to next page" },
                    "Next",
                    ' ',
                    React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faArrowRight }))))));
};

/**
 * Deeply clones an object
 * @author Yuen Ler Chow
 * @param obj the object to clone
 * @returns a deep clone of the object
 */
const cloneDeep = clone__default["default"];

/**
 * Log reviewer panel that allows users (must be approved admins) to
 *   review logs written by dce-reactkit
 * @author Gabe Abrams
 */
// Types of filter drawers
var FilterDrawer;
(function (FilterDrawer) {
    FilterDrawer["Date"] = "date";
    FilterDrawer["Context"] = "context";
    FilterDrawer["Tag"] = "tag";
    FilterDrawer["Action"] = "action";
    FilterDrawer["Advanced"] = "advanced";
})(FilterDrawer || (FilterDrawer = {}));
/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style$2 = `
  .LogReviewer-outer-container {
    /* Full Screen */
    display: inline-block;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    
    /* On Top and Fixed */
    position: fixed;
    z-index: 90000;

    /* Space around contents */
    padding: 0.5rem;

    /* Dark Background */
    background-color: rgba(0, 0, 0, 0.7);

    /* No Clickthrough */
    pointer-events: none;
  }
  
  .LogReviewer-inner-container {
    /* Full screen, rounded modal-like look */
    display: flex;
    height: 100%;
    border: 0.05rem solid black;
    border-radius: 0.5rem;
    overflow: hidden;
    padding: 0.7rem;

    /* Solid background */
    background-color: white;
    color: black;

    /* Place contents in flex column */
    flex-direction: column;

    /* Re-allow interaction */
    pointer-events: all;
  }

  .LogReviewer-header {
    /* Elements in flex row */
    display: flex;
    flex-direction: row;
  }

  .LogReviewer-header-title {
    /* Take up remaining width */
    flex-grow: 1;
  }

  .LogReviewer-contents {
    /* Take up remaining height */
    flex-grow: 1;

    /* Vertical scroll */
    overflow-y: auto;
  }

  .LogReviewer-header-close-button {
    border: 0 !important;
    background-color: transparent !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    padding-right: 1em !important;
    margin: 0 !important;
    color: #444 !important;

    right: 0 !important;
    position: absolute !important;
  }
  .LogReviewer-header-close-button:hover {
    border: 0 !important;
    background-color: transparent !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin: 0 !important;
    color: #000 !important;
  }
`;
/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/
const columns = [
    {
        title: 'First Name',
        param: 'userFirstName',
        type: ParamType$1.String,
    },
    {
        title: 'Last Name',
        param: 'userLastName',
        type: ParamType$1.String,
    },
    {
        title: 'Email',
        param: 'userEmail',
        type: ParamType$1.String,
    },
    {
        title: 'Canvas Id',
        param: 'userId',
        type: ParamType$1.Int,
    },
    {
        title: 'Student?',
        param: 'isLearner',
        type: ParamType$1.Boolean,
    },
    {
        title: 'Teaching Staff?',
        param: 'isTTM',
        type: ParamType$1.Boolean,
        startsHidden: true,
    },
    {
        title: 'Admin?',
        param: 'isAdmin',
        type: ParamType$1.Boolean,
        startsHidden: true,
    },
    {
        title: 'Course Canvas Id',
        param: 'courseId',
        type: ParamType$1.Int,
        startsHidden: true,
    },
    {
        title: 'Course Name',
        param: 'courseName',
        type: ParamType$1.String,
    },
    {
        title: 'Browser Name',
        param: 'browser.name',
        type: ParamType$1.String,
        startsHidden: true,
    },
    {
        title: 'Browser Version',
        param: 'browser.version',
        type: ParamType$1.String,
        startsHidden: true,
    },
    {
        title: 'OS',
        param: 'device.os',
        type: ParamType$1.String,
        startsHidden: true,
    },
    {
        title: 'Mobile?',
        param: 'device.isMobile',
        type: ParamType$1.Boolean,
        startsHidden: true,
    },
    {
        title: 'Year',
        param: 'year',
        type: ParamType$1.Int,
    },
    {
        title: 'Month',
        param: 'month',
        type: ParamType$1.Int,
    },
    {
        title: 'Day',
        param: 'day',
        type: ParamType$1.Int,
    },
    {
        title: 'Hour',
        param: 'hour',
        type: ParamType$1.Int,
    },
    {
        title: 'Minute',
        param: 'minute',
        type: ParamType$1.Int,
        startsHidden: true,
    },
    {
        title: 'Timestamp',
        param: 'timestamp',
        type: ParamType$1.Int,
        startsHidden: true,
    },
    {
        title: 'Context',
        param: 'context',
        type: ParamType$1.String,
    },
    {
        title: 'Subcontext',
        param: 'subcontext',
        type: ParamType$1.String,
    },
    {
        title: 'Tags',
        param: 'tags',
        type: ParamType$1.JSON,
        startsHidden: true,
    },
    {
        title: 'Log Level',
        param: 'level',
        type: ParamType$1.String,
        startsHidden: true,
    },
    {
        title: 'Metadata',
        param: 'metadata',
        type: ParamType$1.JSON,
        startsHidden: true,
    },
    {
        title: 'Source',
        param: 'source',
        type: ParamType$1.String,
    },
    {
        title: 'Server Route Path',
        param: 'routePath',
        type: ParamType$1.String,
        startsHidden: true,
    },
    {
        title: 'Server Route Template',
        param: 'routeTemplate',
        type: ParamType$1.String,
        startsHidden: true,
    },
    {
        title: 'Type',
        param: 'type',
        type: ParamType$1.String,
    },
    {
        title: 'Error Message',
        param: 'errorMessage',
        type: ParamType$1.String,
        startsHidden: true,
    },
    {
        title: 'Error Code',
        param: 'errorCode',
        type: ParamType$1.String,
        startsHidden: true,
    },
    {
        title: 'Error Stack',
        param: 'errorStack',
        type: ParamType$1.String,
        startsHidden: true,
    },
    {
        title: 'Action Target',
        param: 'target',
        type: ParamType$1.String,
        startsHidden: true,
    },
    {
        title: 'Action Type',
        param: 'action',
        type: ParamType$1.String,
        startsHidden: true,
    },
];
/*------------------------------------------------------------------------*/
/* -------------------------- Static Functions -------------------------- */
/*------------------------------------------------------------------------*/
/**
 * Turn a machine-readable name into a human-readable name
 * @author Gabe Abrams
 * @param name machine-readable name
 * @returns human-readable name
 */
const genHumanReadableName = (machineReadableName) => {
    let humanReadableName = '';
    // Add chars and spaces
    const chars = machineReadableName.split('');
    chars.forEach((char) => {
        if (/[A-Z]/.test(char)) {
            // Uppercase! Add a space before
            humanReadableName += ' ';
        }
        humanReadableName += char;
    });
    const words = (humanReadableName
        .trim()
        // Split into words
        .split(' ')
        // Filter out whitespace
        .filter((word) => {
        return (word.length > 0);
    })
        // Capitalize first letter
        .map((word) => {
        if (word.length <= 1) {
            return word;
        }
        return `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`;
    }));
    // Handle acronyms by piling words together
    const consolidatedWords = [];
    let acronym = '';
    words.forEach((word) => {
        if (word.length === 1) {
            // Add on to acronym
            acronym += word;
        }
        else {
            // Wrap up acronym
            if (acronym.length > 0) {
                consolidatedWords.push(acronym);
                acronym = '';
            }
            // Full word. Just add it
            consolidatedWords.push(word);
        }
    });
    // Add trailing acronym
    if (acronym.length > 0) {
        consolidatedWords.push(acronym);
    }
    // Return
    return consolidatedWords.join(' ');
};
/* ------------- Actions ------------ */
// Types of actions
var ActionType$6;
(function (ActionType) {
    // Show the loading bar
    ActionType["StartLoading"] = "start-loading";
    // Finish loading logs
    ActionType["FinishLoading"] = "finish-loading";
    // Reset filters to initial values
    ActionType["ResetFilters"] = "reset-filters";
    // Choose a filter drawer to toggle
    ActionType["ToggleFilterDrawer"] = "toggle-filter-drawer";
    // Hide filter drawer
    ActionType["HideFilterDrawer"] = "hide-filter-drawer";
    // Handle the date filter state
    ActionType["UpdateDateFilterState"] = "update-date-filter-state";
    // Update the context filter state
    ActionType["UpdateContextFilterState"] = "update-context-filter-state";
    // Update the tag filter state
    ActionType["UpdateTagFilterState"] = "update-tag-filter-state";
    // Update the action and error filter state
    ActionType["UpdateActionErrorFilterState"] = "update-action-error-filter-state";
    // Update the advanced filter state
    ActionType["UpdateAdvancedFilterState"] = "update-advanced-filter-state";
    // Set has another page
    ActionType["SetHasAnotherPage"] = "set-has-another-page";
    // Set the number of pages
    ActionType["SetNumPages"] = "set-num-pages";
    // Set page number
    ActionType["SetPageNumber"] = "set-page-number";
    // Reset user made filter change indicator
    ActionType["ResetUserMadeFilterChange"] = "reset-user-made-filter-change";
})(ActionType$6 || (ActionType$6 = {}));
/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer$7 = (state, action) => {
    switch (action.type) {
        case ActionType$6.StartLoading: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case ActionType$6.FinishLoading: {
            return Object.assign(Object.assign({}, state), { loading: false, logs: action.logs });
        }
        case ActionType$6.ToggleFilterDrawer: {
            return Object.assign(Object.assign({}, state), { expandedFilterDrawer: (state.expandedFilterDrawer === action.filterDrawer
                    ? undefined // hide
                    : action.filterDrawer) });
        }
        case ActionType$6.HideFilterDrawer: {
            return Object.assign(Object.assign({}, state), { expandedFilterDrawer: undefined });
        }
        case ActionType$6.ResetFilters: {
            return Object.assign(Object.assign({}, state), { pendingDateFilterState: action.initDateFilterState, pendingContextFilterState: action.initContextFilterState, pendingTagFilterState: action.initTagFilterState, pendingActionErrorFilterState: action.initActionErrorFilterState, pendingAdvancedFilterState: action.initAdvancedFilterState, pageNumber: 1 });
        }
        case ActionType$6.UpdateDateFilterState: {
            return Object.assign(Object.assign({}, state), { pendingDateFilterState: action.dateFilterState, userMadeFilterChange: true });
        }
        case ActionType$6.UpdateContextFilterState: {
            return Object.assign(Object.assign({}, state), { pendingContextFilterState: action.contextFilterState, userMadeFilterChange: true });
        }
        case ActionType$6.UpdateTagFilterState: {
            return Object.assign(Object.assign({}, state), { pendingTagFilterState: action.tagFilterState, userMadeFilterChange: true });
        }
        case ActionType$6.UpdateActionErrorFilterState: {
            return Object.assign(Object.assign({}, state), { pendingActionErrorFilterState: action.actionErrorFilterState, userMadeFilterChange: true });
        }
        case ActionType$6.UpdateAdvancedFilterState: {
            return Object.assign(Object.assign({}, state), { pendingAdvancedFilterState: action.advancedFilterState, userMadeFilterChange: true });
        }
        case ActionType$6.SetHasAnotherPage: {
            return Object.assign(Object.assign({}, state), { hasAnotherPage: action.hasAnotherPage });
        }
        case ActionType$6.SetNumPages: {
            return Object.assign(Object.assign({}, state), { numPages: action.numPages });
        }
        case ActionType$6.SetPageNumber: {
            return Object.assign(Object.assign({}, state), { pageNumber: action.pageNumber });
        }
        case ActionType$6.ResetUserMadeFilterChange: {
            return Object.assign(Object.assign({}, state), { userMadeFilterChange: false });
        }
        default: {
            return state;
        }
    }
};
/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/
const LogReviewer = (props) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/
    var _a, _b, _c, _d;
    /* -------------- Props ------------- */
    // Destructure props
    const { LogMetadata, onClose, } = props;
    // Create complete map of contexts
    const contextMap = {};
    [
        ((_a = LogMetadata.Context) !== null && _a !== void 0 ? _a : {}),
        LogBuiltInMetadata.Context,
    ].forEach((partialContextMap) => {
        Object.keys(partialContextMap).forEach((context) => {
            // Add context
            contextMap[context] = partialContextMap[context];
            // If context has children, add an "uncategorized" subcontext
            if (typeof contextMap[context] !== 'string') {
                contextMap[context][LogBuiltInMetadata.Context.Uncategorized] = (LogBuiltInMetadata.Context.Uncategorized);
            }
        });
    });
    // Create complete map of targets
    const targetMap = {};
    [
        ((_b = LogMetadata.Target) !== null && _b !== void 0 ? _b : {}),
        LogBuiltInMetadata.Target,
    ].forEach((partialTargetMap) => {
        Object.keys(partialTargetMap).forEach((target) => {
            targetMap[target] = partialTargetMap[target];
        });
    });
    /* -------------- State ------------- */
    // Create initial date filter state
    const today = getTimeInfoInET();
    const initStartDate = {
        year: today.year,
        month: today.month,
        day: 1,
    };
    const initEndDate = {
        year: today.year,
        month: today.month,
        day: today.day,
    };
    const initDateFilterState = {
        startDate: initStartDate,
        endDate: initEndDate,
    };
    // Create initial context filter state
    const initContextFilterState = {};
    Object.keys(contextMap).forEach((context) => {
        const contextValue = contextMap[context];
        if (typeof contextValue === 'string') {
            // Case: no subcontexts, init as checked
            initContextFilterState[contextValue] = true;
        }
        else {
            // Case: subcontexts exist
            initContextFilterState[context] = {};
            Object.keys(contextMap[context]).forEach((subcontext) => {
                // Skip self ("_")
                if (subcontext === '_') {
                    return;
                }
                // Initialize as checked
                initContextFilterState[context][subcontext] = true;
            });
        }
    });
    // Create initial tag filter state
    const initTagFilterState = {};
    Object.keys((_c = LogMetadata.Tag) !== null && _c !== void 0 ? _c : {}).forEach((tag) => {
        initTagFilterState[tag] = false;
    });
    // Create advanced filter state
    const initAdvancedFilterState = {
        userFirstName: '',
        userLastName: '',
        userEmail: '',
        userId: '',
        includeLearners: true,
        includeTTMs: true,
        includeAdmins: true,
        courseId: '',
        courseName: '',
        isMobile: undefined,
        source: undefined,
        routePath: '',
        routeTemplate: '',
    };
    // Create action and error filter state
    const initActionErrorFilterState = {
        type: undefined,
        errorMessage: '',
        errorCode: '',
        target: {},
        action: {},
    };
    Object.values(targetMap).forEach((target) => {
        initActionErrorFilterState.target[target] = true;
    });
    Object.values(LogAction$1).forEach((action) => {
        initActionErrorFilterState.action[action] = true;
    });
    // Initial state
    const initialState = {
        loading: true,
        logs: [],
        expandedFilterDrawer: undefined,
        pendingDateFilterState: initDateFilterState,
        pendingContextFilterState: initContextFilterState,
        pendingTagFilterState: initTagFilterState,
        pendingActionErrorFilterState: initActionErrorFilterState,
        pendingAdvancedFilterState: initAdvancedFilterState,
        pageNumber: 1,
        hasAnotherPage: false,
        numPages: 1,
        userMadeFilterChange: false,
    };
    // Initialize state
    const [state, dispatch] = React.useReducer(reducer$7, initialState);
    // Destructure common state
    const { loading, logs, expandedFilterDrawer, pendingDateFilterState, pendingContextFilterState, pendingTagFilterState, pendingActionErrorFilterState, pendingAdvancedFilterState, pageNumber, numPages, userMadeFilterChange, } = state;
    /* -------------- Refs -------------- */
    // Initialize refs
    const activeFiltersRef = React.useRef({
        dateFilterState: JSON.parse(JSON.stringify(pendingDateFilterState)),
        contextFilterState: JSON.parse(JSON.stringify(pendingContextFilterState)),
        tagFilterState: JSON.parse(JSON.stringify(pendingTagFilterState)),
        actionErrorFilterState: JSON.parse(JSON.stringify(pendingActionErrorFilterState)),
        advancedFilterState: JSON.parse(JSON.stringify(pendingAdvancedFilterState)),
    });
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Fetch logs from the server based on current filters
     * @author Yuen Ler Chow
     * @param opts object containing all arguments
     * @param opts.filters the filters to apply
     * @param opts.pageNum the page number to fetch
     * @param opts.filtersChanged if true, the filters have changed
     */
    const fetchLogs = (opts) => __awaiter(void 0, void 0, void 0, function* () {
        const { filters, pageNum, filtersChanged, } = opts;
        dispatch({
            type: ActionType$6.StartLoading,
        });
        try {
            // Send filters to the server
            let fetchedLogs = [];
            // Get logs from server
            const response = yield visitServerEndpoint({
                path: LOG_REVIEW_GET_LOGS_ROUTE,
                method: 'GET',
                params: {
                    pageNumber: pageNum,
                    filters,
                    countDocuments: filtersChanged,
                },
            });
            fetchedLogs = fetchedLogs.concat(response.items);
            dispatch({
                type: ActionType$6.SetHasAnotherPage,
                hasAnotherPage: response.hasAnotherPage,
            });
            if (filtersChanged && response.numPages !== undefined) {
                dispatch({
                    type: ActionType$6.SetNumPages,
                    numPages: response.numPages,
                });
            }
            // Update logs in state
            dispatch({
                type: ActionType$6.FinishLoading,
                logs: fetchedLogs,
            });
            // Update page number
            dispatch({
                type: ActionType$6.SetPageNumber,
                pageNumber: pageNum,
            });
        }
        catch (err) {
            return showFatalError(err);
        }
    });
    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    /**
     * Fetch logs on mount
     * @author Yuen Ler Chow
     */
    React.useEffect(() => {
        fetchLogs({
            filters: {
                dateFilterState: pendingDateFilterState,
                contextFilterState: pendingContextFilterState,
                tagFilterState: pendingTagFilterState,
                actionErrorFilterState: pendingActionErrorFilterState,
                advancedFilterState: pendingAdvancedFilterState,
            },
            pageNum: 1,
            filtersChanged: true,
        });
    }, []);
    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    /*----------------------------------------*/
    /* ------------ Pagination -------------- */
    /*----------------------------------------*/
    const paginationControls = logs.length > 0 && (React__default["default"].createElement(Pagination, { currentPage: pageNumber, numPages: numPages, loading: loading, onPageChanged: (targetPage) => {
            const { current: activeFilters } = activeFiltersRef;
            fetchLogs({
                filters: {
                    dateFilterState: activeFilters.dateFilterState,
                    contextFilterState: activeFilters.contextFilterState,
                    tagFilterState: activeFilters.tagFilterState,
                    actionErrorFilterState: activeFilters.actionErrorFilterState,
                    advancedFilterState: activeFilters.advancedFilterState,
                },
                pageNum: targetPage,
                filtersChanged: false,
            });
        } }));
    /*----------------------------------------*/
    /* --------------- Filters -------------- */
    /*----------------------------------------*/
    // Filter toggle
    const filterToggles = (React__default["default"].createElement("div", { className: "LogReviewer-filter-toggles" },
        React__default["default"].createElement("div", { className: "LogReviewer-filter-toggle-buttons alert alert-secondary p-2 m-0" },
            React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-date-filter-drawer", className: `btn btn-${FilterDrawer.Date === expandedFilterDrawer ? 'warning' : 'light'} me-2`, "aria-label": "toggle date filter drawer", onClick: () => {
                    dispatch({
                        type: ActionType$6.ToggleFilterDrawer,
                        filterDrawer: FilterDrawer.Date,
                    });
                } },
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCalendar, className: "me-2" }),
                "Date"),
            React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-context-filter-drawer", className: `btn btn-${FilterDrawer.Context === expandedFilterDrawer ? 'warning' : 'light'} me-2`, "aria-label": "toggle context filter drawer", onClick: () => {
                    dispatch({
                        type: ActionType$6.ToggleFilterDrawer,
                        filterDrawer: FilterDrawer.Context,
                    });
                } },
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faCircle, className: "me-2" }),
                "Context"),
            (LogMetadata.Tag && Object.keys(LogMetadata.Tag).length > 0) && (React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-tag-filter-drawer", className: `btn btn-${FilterDrawer.Tag === expandedFilterDrawer ? 'warning' : 'light'} me-2`, "aria-label": "toggle tag filter drawer", onClick: () => {
                    dispatch({
                        type: ActionType$6.ToggleFilterDrawer,
                        filterDrawer: FilterDrawer.Tag,
                    });
                } },
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faTag, className: "me-2" }),
                "Tag")),
            React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-action-filter-drawer", className: `btn btn-${FilterDrawer.Action === expandedFilterDrawer ? 'warning' : 'light'} me-2`, "aria-label": "toggle action and error filter drawer", onClick: () => {
                    dispatch({
                        type: ActionType$6.ToggleFilterDrawer,
                        filterDrawer: FilterDrawer.Action,
                    });
                } },
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faHammer, className: "me-2" }),
                "Action"),
            React__default["default"].createElement("button", { type: "button", id: "LogReviewer-toggle-advanced-filter-drawer", className: `btn btn-${FilterDrawer.Advanced === expandedFilterDrawer ? 'warning' : 'light'} me-2`, "aria-label": "toggle advanced filter drawer", onClick: () => {
                    dispatch({
                        type: ActionType$6.ToggleFilterDrawer,
                        filterDrawer: FilterDrawer.Advanced,
                    });
                } },
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faList, className: "me-2" }),
                "Advanced"),
            React__default["default"].createElement("button", { type: "button", id: "LogReviewer-reset-filters-button", className: "btn btn-light", "aria-label": "reset filters", onClick: () => {
                    // Save active filters
                    // Deep clone the initial filter states to avoid any reference issues
                    // if the filter states are modified later
                    activeFiltersRef.current = cloneDeep({
                        dateFilterState: initDateFilterState,
                        contextFilterState: initContextFilterState,
                        tagFilterState: initTagFilterState,
                        actionErrorFilterState: initActionErrorFilterState,
                        advancedFilterState: initAdvancedFilterState,
                    });
                    fetchLogs({
                        filters: {
                            dateFilterState: initDateFilterState,
                            contextFilterState: initContextFilterState,
                            tagFilterState: initTagFilterState,
                            actionErrorFilterState: initActionErrorFilterState,
                            advancedFilterState: initAdvancedFilterState,
                        },
                        pageNum: 1,
                        filtersChanged: true,
                    });
                    dispatch({
                        type: ActionType$6.ResetFilters,
                        initActionErrorFilterState,
                        initAdvancedFilterState,
                        initContextFilterState,
                        initDateFilterState,
                        initTagFilterState,
                    });
                    dispatch({
                        type: ActionType$6.HideFilterDrawer,
                    });
                } },
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faTimes }),
                ' ',
                "Reset"),
            userMadeFilterChange && (React__default["default"].createElement("button", { type: "button", id: "LogReviewer-submit-filters-button", className: "btn btn-primary ms-2", "aria-label": "submit filters", onClick: () => {
                    dispatch({
                        type: ActionType$6.HideFilterDrawer,
                    });
                    // Reset user made filter change indicator
                    dispatch({
                        type: ActionType$6.ResetUserMadeFilterChange,
                    });
                    // Save active filters
                    // Deep clone the pending filter states to avoid any reference issues
                    // if the filter states are modified later
                    activeFiltersRef.current = cloneDeep({
                        dateFilterState: pendingDateFilterState,
                        contextFilterState: pendingContextFilterState,
                        tagFilterState: pendingTagFilterState,
                        actionErrorFilterState: pendingActionErrorFilterState,
                        advancedFilterState: pendingAdvancedFilterState,
                    });
                    fetchLogs({
                        filters: {
                            dateFilterState: pendingDateFilterState,
                            contextFilterState: pendingContextFilterState,
                            tagFilterState: pendingTagFilterState,
                            actionErrorFilterState: pendingActionErrorFilterState,
                            advancedFilterState: pendingAdvancedFilterState,
                        },
                        pageNum: 1,
                        filtersChanged: true,
                    });
                } },
                React__default["default"].createElement(reactFontawesome.FontAwesomeIcon, { icon: freeSolidSvgIcons.faSearch }),
                ' ',
                "Apply Filters")))));
    // Filter drawer
    let filterDrawer;
    if (expandedFilterDrawer) {
        if (expandedFilterDrawer === FilterDrawer.Date) {
            filterDrawer = (React__default["default"].createElement(TabBox, { title: "Date" },
                React__default["default"].createElement(SimpleDateChooser, { ariaLabel: "filter start date", name: "filter-start-date", year: pendingDateFilterState.startDate.year, month: pendingDateFilterState.startDate.month, day: pendingDateFilterState.startDate.day, chooseFromPast: true, numMonthsToShow: 36, onChange: (month, day, year) => {
                        const newDateFilterState = Object.assign(Object.assign({}, pendingDateFilterState), { startDate: { month, day, year } });
                        dispatch({
                            type: ActionType$6.UpdateDateFilterState,
                            dateFilterState: newDateFilterState,
                        });
                    } }),
                ' ',
                "to",
                ' ',
                React__default["default"].createElement(SimpleDateChooser, { ariaLabel: "filter end date", name: "filter-end-date", year: pendingDateFilterState.endDate.year, month: pendingDateFilterState.endDate.month, day: pendingDateFilterState.endDate.day, chooseFromPast: true, numMonthsToShow: 12, onChange: (month, day, year) => {
                        if (year < pendingDateFilterState.startDate.year
                            || (year === pendingDateFilterState.startDate.year
                                && month < pendingDateFilterState.startDate.month)
                            || (year === pendingDateFilterState.startDate.year
                                && month === pendingDateFilterState.startDate.month
                                && day < pendingDateFilterState.startDate.day)) {
                            return alert('Invalid End Date', 'The end date cannot be before the start date.');
                        }
                        const newDateFilterState = Object.assign(Object.assign({}, pendingDateFilterState), { endDate: { month, day, year } });
                        dispatch({
                            type: ActionType$6.UpdateDateFilterState,
                            dateFilterState: newDateFilterState,
                        });
