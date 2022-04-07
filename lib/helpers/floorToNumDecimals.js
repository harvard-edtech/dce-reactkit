"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Round a number (floor) to a certain number of decimals
 * @author Gabe Abrams
 * @param num the number to round
 * @param numDecimals the number of decimals to round to
 * @returns rounded number
 */
var floorToNumDecimals = function (num, numDecimals) {
    var rounder = Math.pow(10, numDecimals);
    return (Math.floor(num * rounder) / rounder);
};
exports.default = floorToNumDecimals;
//# sourceMappingURL=floorToNumDecimals.js.map