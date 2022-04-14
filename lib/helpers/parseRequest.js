"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import caccl libs
var caccl_lti_1 = require("caccl-lti");
// Import shared types
var ReactKitErrorCode_1 = __importDefault(require("../types/ReactKitErrorCode"));
var ParamType_1 = __importDefault(require("../types/ParamType"));
// Import helpers
var handleError_1 = __importDefault(require("./handleError"));
/**
 * Parse express request params and body
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.req express request instance
 * @param opts.res express response instance
 * @param opts.params map of parameters that should be parsed out of the request
 * @returns parsed params + user info from session (if it exists) or undefined
 *   if an error occurred
 */
var parseRequest = function (opts) {
    // Output
    var output = {};
    /*----------------------------------------*/
    /*              Parse Params              */
    /*----------------------------------------*/
    // Process items one by one
    var paramList = Object.entries(opts.params);
    for (var i = 0; i < paramList.length; i++) {
        var _a = paramList[i], name_1 = _a[0], type = _a[1];
        // Find the value as a string
        var value = (opts.req.params[name_1]
            || opts.req.query[name_1]
            || opts.req.body[name_1]);
        // Parse
        if (type === ParamType_1.default.Boolean || type === ParamType_1.default.BooleanOptional) {
            // Boolean
            // Handle case where value doesn't exist
            if (value === undefined) {
                if (type === ParamType_1.default.BooleanOptional) {
                    output[name_1] = undefined;
                }
                else {
                    return (0, handleError_1.default)(opts.res, {
                        message: "Parameter ".concat(name_1, " is required, but it was not included."),
                        code: ReactKitErrorCode_1.default.MissingParameter,
                        status: 422,
                    });
                }
            }
            else {
                // Value exists
                // Simplify value
                var simpleVal = (String(value)
                    .trim()
                    .toLowerCase());
                // Parse
                output[name_1] = ([
                    'true',
                    'yes',
                    'y',
                    '1',
                    't',
                ].indexOf(simpleVal) >= 0);
            }
        }
        else if (type === ParamType_1.default.Float || type === ParamType_1.default.FloatOptional) {
            // Float
            // Handle case where value doesn't exist
            if (value === undefined) {
                if (type === ParamType_1.default.FloatOptional) {
                    output[name_1] = undefined;
                }
                else {
                    return (0, handleError_1.default)(opts.res, {
                        message: "Parameter ".concat(name_1, " is required, but it was not included."),
                        code: ReactKitErrorCode_1.default.MissingParameter,
                        status: 422,
                    });
                }
            }
            else if (!Number.isNaN(Number.parseFloat(String(value)))) {
                // Value is a number
                output[name_1] = Number.parseFloat(String(value));
            }
            else {
                // Issue!
                return (0, handleError_1.default)(opts.res, {
                    message: "Request data was malformed: ".concat(name_1, " was not a valid float."),
                    code: ReactKitErrorCode_1.default.InvalidParameter,
                    status: 422,
                });
            }
        }
        else if (type === ParamType_1.default.Int || type === ParamType_1.default.IntOptional) {
            // Int
            // Handle case where value doesn't exist
            if (value === undefined) {
                if (type === ParamType_1.default.IntOptional) {
                    output[name_1] = undefined;
                }
                else {
                    return (0, handleError_1.default)(opts.res, {
                        message: "Parameter ".concat(name_1, " is required, but it was not included."),
                        code: ReactKitErrorCode_1.default.MissingParameter,
                        status: 422,
                    });
                }
            }
            else if (!Number.isNaN(Number.parseInt(String(value), 10))) {
                // Value is a number
                output[name_1] = Number.parseInt(String(value), 10);
            }
            else {
                // Issue!
                return (0, handleError_1.default)(opts.res, {
                    message: "Request data was malformed: ".concat(name_1, " was not a valid int."),
                    code: ReactKitErrorCode_1.default.InvalidParameter,
                    status: 422,
                });
            }
        }
        else if (type === ParamType_1.default.JSON || type === ParamType_1.default.JSONOptional) {
            // Stringified JSON
            // Handle case where value doesn't exist
            if (value === undefined) {
                if (type === ParamType_1.default.JSONOptional) {
                    output[name_1] = undefined;
                }
                else {
                    return (0, handleError_1.default)(opts.res, {
                        message: "Parameter ".concat(name_1, " is required, but it was not included."),
                        code: ReactKitErrorCode_1.default.MissingParameter,
                        status: 422,
                    });
                }
            }
            else {
                // Value exists
                // Parse
                try {
                    output[name_1] = JSON.parse(String(value));
                }
                catch (err) {
                    return (0, handleError_1.default)(opts.res, {
                        message: "Request data was malformed: ".concat(name_1, " was not a valid JSON payload."),
                        code: ReactKitErrorCode_1.default.InvalidParameter,
                        status: 422,
                    });
                }
            }
        }
        else if (type === ParamType_1.default.String || type === ParamType_1.default.StringOptional) {
            // String
            // Handle case where value doesn't exist
            if (value === undefined) {
                if (type === ParamType_1.default.StringOptional) {
                    output[name_1] = undefined;
                }
                else {
                    return (0, handleError_1.default)(opts.res, {
                        message: "Parameter ".concat(name_1, " is required, but it was not included."),
                        code: ReactKitErrorCode_1.default.MissingParameter,
                        status: 422,
                    });
                }
            }
            else {
                // Value exists
                // Leave as is
                output[name_1] = value;
            }
        }
        else {
            // No valid data type
            return (0, handleError_1.default)(opts.res, {
                message: "An internal error occurred: we could not determine the type of ".concat(name_1, "."),
                code: ReactKitErrorCode_1.default.InvalidParameter,
                status: 422,
            });
        }
    }
    /*----------------------------------------*/
    /*               Launch Info              */
    /*----------------------------------------*/
    // Get launch info
    var _b = (0, caccl_lti_1.getLaunchInfo)(opts.req), launched = _b.launched, launchInfo = _b.launchInfo;
    if (!launched || !launchInfo) {
        return (0, handleError_1.default)(opts.res, {
            message: 'Your session has expired. Please refresh the page and try again.',
            code: ReactKitErrorCode_1.default.SessionExpired,
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
        return (0, handleError_1.default)(opts.res, {
            message: 'Your session was invalid. Please refresh the page and try again.',
            code: ReactKitErrorCode_1.default.SessionExpired,
            status: 440,
        });
    }
    // Add launch info to output
    output.userId = launchInfo.userId;
    output.userFirstName = launchInfo.userFirstName;
    output.userLastName = launchInfo.userLastName;
    output.isLearner = !!launchInfo.isLearner;
    output.isTTM = !!launchInfo.isTTM;
    output.isAdmin = !!launchInfo.isAdmin;
    output.isWatchingInPrivate = !!(opts.req.session.isWatchingInPrivate);
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
        return (0, handleError_1.default)(opts.res, {
            message: 'You switched sessions by opening Immersive Classroom in another tab. Please refresh the page and try again.',
            code: ReactKitErrorCode_1.default.WrongCourse,
            status: 401,
        });
    }
    // Return processed params
    return output;
};
exports.default = parseRequest;
//# sourceMappingURL=parseRequest.js.map