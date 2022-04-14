"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Send successful API response
 * @author Gabe Abrams
 * @param res express response
 * @param body the body of the response to send to the client
 */
var handleSuccess = function (res, body) {
    // Send a http 200 json response
    res.json({
        // Include the body as a parameter
        body: body,
        // Success = true flag so client can detect successful responses
        success: true,
    });
    return undefined;
};
exports.default = handleSuccess;
//# sourceMappingURL=handleSuccess.js.map