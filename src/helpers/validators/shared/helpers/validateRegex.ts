// Import types
import ValidationResult from '../types/ValidationResult';

// Import constants
import { INVALID_REGEX_ERROR } from '../constants/ERROR_MESSAGES';

/**
 * Determines whether a given input string is considered valid based on
 *   the provided regex.
 * @author Austen Money
 * @param opts object containing all args
 * @param opts.input user-provided input to validate
 * @param opts.regex regular expression to check against input
 * @param [opts.regexDescription] description of what regexString is checking
 *   for, used to customize error message
 * @returns the unchanged input if valid, or a customized error message if
 *   invalid
 */
const validateRegex = (
  opts: {
    input: string,
    regex: RegExp,
    regexDescription?: string,
  },
): ValidationResult<string> => {
  // customize error message in case of invalid input
  const errorMessage = `${INVALID_REGEX_ERROR}${
    opts.regexDescription
      ? ': '
      : ''
  }${opts.regexDescription}`;

  // return error message if test is invalid, or input string if valid
  return (
    opts.regex.test(opts.input)
      ? {
        isValid: true,
        cleanedValue: opts.input,
      }
      : {
        isValid: false,
        errorMessage,
      }
  );
};

export default validateRegex;
