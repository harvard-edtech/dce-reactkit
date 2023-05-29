"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Determines whether a given input string is considered valid based on
 * the provided regex.
 * @author Austen Money
 * @param input user-provided input to validate
 * @param regexString regular expression to check against input
 * @returns whether input is valid, including an error message if invalid
 */
var validateRegex = function (input, regex) {
    return (regex.test(input)
        ? { isValid: true }
        : { isValid: false, errorMessage: 'Input does not follow requested\
          format.' });
};
exports.default = validateRegex;
