// Import helpers
import validateRegex from './shared/helpers/validateRegex';
import genCommaList from '../genCommaList';

// Import constants
import { INVALID_STRING_ERRORS } from './shared/constants/ERROR_MESSAGES';

// Import types
import ValidationResult from './shared/types/ValidationResult';

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

/*------------------------------------------------------------------------*/
/* ---------------------------- Main Function --------------------------- */
/*------------------------------------------------------------------------*/

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
const validateString = (
  input: string,
  opts: {
    // whitespace is removed from input before checking and returning
    ignoreWhitespace?: boolean,
    // input length must be at least minLen
    minLen?: number,
    // input length must be at most maxLen
    maxLen?: number,
    // input must only contain letters
    // (future TODO: add option for passing in an array of permitted chars)
    lettersOnly?: boolean,
    // input must only contain numbers
    numbersOnly?: boolean,
    // input must match given regExp
    regexTest?: RegExp,
    // description of regExp test, used to customize error messages
    regexDescription?: string,
  },
): ValidationResult<string> => {
  // stores all invalid input errors
  const errorMessages: string[] = [];

  // contains version of input that will be returned
  let cleanedValue: string = input;

  // remove whitespace if required
  if (opts.ignoreWhitespace) {
    cleanedValue = input.replace(/\s+/g, '');
  }

  // apply max char requirement
  if (opts.minLen) {
    if (cleanedValue.length < opts.minLen) {
      errorMessages.push(INVALID_STRING_ERRORS.MIN_LEN(opts.minLen));
    }
  }

  // apply max char requirement
  if (opts.maxLen) {
    if (cleanedValue.length > opts.maxLen) {
      errorMessages.push(INVALID_STRING_ERRORS.MAX_LEN(opts.maxLen));
    }
  }

  // apply alphabetical requirement
  if (opts.lettersOnly) {
    // remove diacritics
    cleanedValue = cleanedValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const containsNonLetters = (
      cleanedValue
        // split into characters
        .split('')
        // convert into character codes
        .map((curr) => {
          return curr.charCodeAt(0);
        })
        // check for non-letters
        .some((currCode) => {
          return (
            !(currCode >= LOWERCASE_MIN && currCode <= LOWERCASE_MAX)
            && !(currCode >= UPPERCASE_MIN && currCode <= UPPERCASE_MAX)
          );
        })
    );

    if (containsNonLetters) {
      errorMessages.push(INVALID_STRING_ERRORS.LETTERS_ONLY);
    }
  }

  // apply numerical requirement
  if (opts.numbersOnly) {
    const containsNonNumbers = (
      cleanedValue
        // split into characters
        .split('')
        // convert into character codes
        .map((curr) => {
          return curr.charCodeAt(0);
        })
        // check for non-numbers
        .some((currCode) => {
          return (
            !(currCode >= DIGIT_MIN && currCode <= DIGIT_MAX)
          );
        })
    );

    if (containsNonNumbers) {
      errorMessages.push(INVALID_STRING_ERRORS.NUMBERS_ONLY);
    }
  }

  // apply regex requirement
  if (opts.regexTest) {
    const regex = opts.regexTest;

    // validate and create customized error message if description is provided
    const result = validateRegex({
      input: cleanedValue,
      regex,
      regexDescription: opts.regexDescription,
    });

    // if string did not pass regex validation, add error message
    if (result.isValid === false) {
      errorMessages.push(result.errorMessage);
    }
  }

  // combine all error messages into one string to return
  const errorMessage = `${INVALID_STRING_ERRORS.MESSAGE_INTRO}${genCommaList(errorMessages)}.`;

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
