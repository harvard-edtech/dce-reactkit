// import types
import ValidationResult from '../types/ValidationResult';

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
): ValidationResult => {
  let errorMessage: string;

  // customize error message in case of invalid input
  opts.regexDescription
    ? errorMessage = `Input does not follow the requested format: ${opts.regexDescription}.`
    : errorMessage = 'Input does not follow the requested format.';

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
