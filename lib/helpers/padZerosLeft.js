"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Pad a number with zeros on the left (e.g. 5 becomes 05 with 2 digit padding)
 * @author Gabe Abrams
 * @param num the number to pad
 * @param numDigits the minimum number of digits before the decimal
 * @returns padded number
 */
var padZerosLeft = function (num, numDigits) {
    // Convert to string
    var out = String(num);
    // Add zeros
    while (out.split('.')[0].length < numDigits) {
        out = "0".concat(out);
    }
    // Return
    return out;
};
exports.default = padZerosLeft;
//# sourceMappingURL=padZerosLeft.js.map