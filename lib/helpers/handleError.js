"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import shared types
var ReactKitErrorCode_1 = __importDefault(require("../types/ReactKitErrorCode"));
/**
 * Handle an error and respond to the client
 * @author Gabe Abrams
 * @param res express response
 * @param error error info
 * @param opts.err the error to send to the client
 *   or the error message
 * @param [opts.code] an error code (only used if err.code is not
 *   included)
 * @param [opts.status=500] the https status code to use
 *   defined)
 */
var handleError = function (res, error) {
    // Get the error message
    var message;
    if (error && error.message) {
        message = (error.message || 'An unknown error occurred.');
    }
    else if (typeof error === 'string') {
        message = (error.trim().length > 0
            ? error
            : 'An unknown error occurred.');
    }
    else {
        message = 'An unknown error occurred.';
    }
    // Get the error code
    var code = (error.code || ReactKitErrorCode_1.default.NoCode);
    // Get the status code
    var status = (error.status || 500);
    // Respond to user
    res
        // Set the http status code
        .status(status)
        // Send a JSON response
        .json({
        // Error message
        message: message,
        // Error code
        code: code,
        // Success = false flag so client can detect server-side errors
        success: false,
    });
    return undefined;
};
exports.default = handleError;
//# sourceMappingURL=handleError.js.map