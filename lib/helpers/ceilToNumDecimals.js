"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Round a number (ceiling) to a certain number of decimals
 * @author Gabe Abrams
 * @param num the number to round
 * @param numDecimals the number of decimals to round to
 * @returns rounded number
 */
var ceilToNumDecimals = function (num, numDecimals) {
    var rounder = Math.pow(10, numDecimals);
    return (Math.ceil(num * rounder) / rounder);
};
exports.default = ceilToNumDecimals;
//# sourceMappingURL=ceilToNumDecimals.js.map