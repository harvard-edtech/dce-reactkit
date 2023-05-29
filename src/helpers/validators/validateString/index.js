"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import helpers
var validateRegex_1 = require("../shared/helpers/validateRegex");
/**
 * Determines whether a given input string is considered valid based on
 * the provided requirements.
 * @author Austen Money
 * @param input user input string
 * @param reqs requirements that the provided input should conform to
 * @returns whether input is considered valid according to the reqs - if
 *          invalid, an array is also returned containing messages describing
 *          which requirements were not met.
 */
var validateString = function (input, reqs) {
    var errorMessages = [];
    var cleanedValue = input;
    if (reqs.ignoreWhitespace) { // remove whitespace if required
        cleanedValue = input.replace(/\s+/g, '');
    }
    if (reqs.minLen) { // apply max char requirement
        if (cleanedValue.length < reqs.minLen) {
            errorMessages.push("Input must not be under ".concat(reqs.minLen, " character(s)."));
        }
    }
    if (reqs.maxLen) { // apply max char requirement
        if (cleanedValue.length > reqs.maxLen) {
            errorMessages.push("Input must not be over ".concat(reqs.maxLen, " character(s)."));
        }
    }
    if (reqs.lettersOnly) { // apply alphabetical requirement
        for (var i = 0, len = cleanedValue.length; i < len; i++) {
            var curr = cleanedValue.charCodeAt(i);
            if (!(curr > 64 && curr < 91) && // upper alpha
                !(curr > 96 && curr < 123)) { // lower alpha
                errorMessages.push("Input must not contain non-letters.");
                break;
            }
        }
    }
    if (reqs.numbersOnly) { // apply numerical requirement
        for (var i = 0, len = cleanedValue.length; i < len; i++) {
            var curr = cleanedValue.charCodeAt(i);
            if (!(curr > 47 && curr < 58)) { // digits 0-9
                errorMessages.push("Input must not contain non-numbers.");
                break;
            }
        }
    }
    if (reqs.regexTest) { // check against regex requirement
        var regex = new RegExp(reqs.regexTest);
        var result = (0, validateRegex_1.default)(cleanedValue, regex);
        if (result.isValid === false) {
            errorMessages.push(result.errorMessage);
        }
    }
    var errorMessage = "The following errors occurred:";
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessage = "".concat(errorMessage, "\n\t").concat(errorMessages[i]);
    }
    console.log(errorMessage);
    return (errorMessages.length === 0
        ? { isValid: true, cleanedValue: cleanedValue }
        : { isValid: false, errorMessage: errorMessage });
};
exports.default = validateString;
