import ValidationResult from './shared/types/ValidationResult';
/**
 * Determines whether a given input string is considered valid based on
 *   the provided requirements.
 * @author Austen Money
 * @param input input string
 * @param opts options for validation
 * @returns whether input is considered valid according to reqs - if
 *   valid, returns a cleaned version of input; if invalid, returns
 *   a string containing error messages describing which requirements
 *   were not met.
 */
declare const validateString: (input: string, opts: {
    ignoreWhitespace?: boolean;
    minLen?: number;
    maxLen?: number;
    lettersOnly?: boolean;
    numbersOnly?: boolean;
    regexTest?: RegExp;
    regexDescription?: string;
}) => ValidationResult<string>;
export default validateString;
