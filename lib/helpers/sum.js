"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sum the numbers in an array
 * @author Gabe Abrams
 * @param nums the numbers to sum
 * @returns the sum of the numbers
 */
var sum = function (nums) {
    return nums.reduce(function (a, b) {
        return (a + b);
    }, 0);
};
exports.default = sum;
//# sourceMappingURL=sum.js.map