"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sum_1 = __importDefault(require("./sum"));
/**
 * Get the average of a set of numbers
 * @author Gabe Abrams
 * @param nums the numbers to average
 * @returns average value or 0 if no numbers
 */
var avg = function (nums) {
    // Handle empty array case
    if (nums.length === 0) {
        return 0;
    }
    // Get the total value
    var total = (0, sum_1.default)(nums);
    // Get average
    return (total / nums.length);
};
exports.default = avg;
//# sourceMappingURL=avg.js.map