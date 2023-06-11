// Import helpers
import validateRegex from '../shared/helpers/validateRegex';

// Import types
import ValidationResult from '../shared/types/ValidationResult';
import StringValidationRequirements from './StringValidationRequirements';

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

// define minimum and maximum range for lowercase ASCII chars
const LOWERCASE_MIN = 65;
const LOWERCASE_MAX = 90;

// define minimum and maximum range for uppercase ASCII chars
const UPPERCASE_MIN = 97;
const UPPERCASE_MAX = 122;

// define minimum and maximum range for ASCII digits
const DIGIT_MIN = 48;
const DIGIT_MAX = 57;

/**
 * Determines whether a given input string is considered valid based on
 *   the provided requirements.
 * @author Austen Money
 * @param input input string
 * @param reqs requirements that the provided string should conform to
 * @returns whether input is considered valid according to reqs - if
 *   valid, returns a cleaned version of input; if invalid, returns
 *   a string containing error messages describing which requirements
 *   were not met.
 */
const validateString = (
  input: string,
  reqs: StringValidationRequirements,
): ValidationResult => {
  // stores all invalid input errors
  const errorMessages: string[] = [];

  // contains version of input that will be returned
  let cleanedValue: string = input;

  // remove whitespace if required
  if (reqs.ignoreWhitespace) {
    cleanedValue = input.replace(/\s+/g, '');
  }

  // apply max char requirement
  if (reqs.minLen) {
    if (cleanedValue.length < reqs.minLen) {
      errorMessages.push(`Input must not be under ${reqs.minLen} character(s)`);
    }
  }

  // apply max char requirement
  if (reqs.maxLen) {
    if (cleanedValue.length > reqs.maxLen) {
      errorMessages.push(`Input must not be over ${reqs.maxLen} character(s)`);
    }
  }

  // apply alphabetical requirement
  if (reqs.lettersOnly) {
    // remove diacritics
    cleanedValue = cleanedValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    for (let i = 0, len = cleanedValue.length; i < len; i++) {
      const curr = cleanedValue.charCodeAt(i);

      // check that char is an upper or lower-case letter
      if (!(curr >= LOWERCASE_MIN && curr <= LOWERCASE_MAX)
        && !(curr >= UPPERCASE_MIN && curr <= UPPERCASE_MAX)) {
        errorMessages.push('Input must only contain letters');
        break;
      }
    }
  }

  // apply numerical requirement
  if (reqs.numbersOnly) {
    for (let i = 0, len = cleanedValue.length; i < len; i++) {
      const curr = cleanedValue.charCodeAt(i);

      // check that char is a digit
      if (!(curr >= DIGIT_MIN && curr <= DIGIT_MAX)) {
        errorMessages.push('Input must only contain numbers');
        break;
      }
    }
  }

  // apply regex requirement
  if (reqs.regexTest) {
    const regex = reqs.regexTest;

    // validate and create customized error message if description is provided
    const result = validateRegex({
      input: cleanedValue,
      regex,
      regexDescription: reqs.regexDescription,
    });

    // if string did not pass regex validation, add error message
    if (result.isValid === false) {
      errorMessages.push(result.errorMessage);
    }
  }

  // combine all error messages into one string to return
  const errorMessage = `The following error(s) occurred: ${errorMessages.join(', ')}.`;

  return (
    // if no error messages, string is valid; if not, it is invalid
    errorMessages.length === 0
      ? {
        isValid: true,
        cleanedValue,
      }
      : {
        isValid: false,
        errorMessage,
      }
  );
};

export default validateString;
