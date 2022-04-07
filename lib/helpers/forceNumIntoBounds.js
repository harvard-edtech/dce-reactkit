"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Force a number to stay within specific bounds
 * @author Gabe Abrams
 * @param num the number to move into the bounds
 * @param min the minimum number in the bound
 * @param max the maximum number in the bound
 * @returns bounded number
 */
var forceNumIntoBounds = function (num, min, max) {
    return Math.max(min, Math.min(max, num));
};
exports.default = forceNumIntoBounds;
//# sourceMappingURL=forceNumIntoBounds.js.map