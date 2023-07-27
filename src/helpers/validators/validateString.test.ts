// Import helpers
import genCommaList from '../genCommaList';

// Import types
import ValidationResult from './shared/types/ValidationResult';

// Import constants
import { INVALID_STRING_ERRORS, INVALID_REGEX_ERROR } from './shared/constants/ERROR_MESSAGES';

// Import function
import validateString from './validateString';

/*------------------------------------------------------------------------*/
/* ---------------------------- Valid Tests --------------------------- */
/*------------------------------------------------------------------------*/

const validStrings: string[] = [
  'users',
  'username',
  'MyValidString',
  'HereisAnotherValidString',
  'WoahAnotherValidStringIsHere',
];

const validReqs: {
  // whitespace is removed from input before checking and returning
  ignoreWhitespace?: boolean,
  // input length must be at least minLen
  minLen?: number,
  // input length must be at most maxLen
  maxLen?: number,
  // input must only contain letters
  lettersOnly?: boolean,
  // input must only contain numbers
  numbersOnly?: boolean,
  // input must match given regExp
  regexTest?: RegExp,
  // description of regExp test, used to customize error messages
  regexDescription?: string,
}[] = [
  {
  },
  {
    minLen: 5,
  },
  {
    minLen: 5,
    maxLen: 30,
  },
  {
    minLen: 5,
    maxLen: 30,
    lettersOnly: true,
  },
  {
    minLen: 5,
    maxLen: 30,
    lettersOnly: true,
    numbersOnly: false,
  },
  {
    minLen: 5,
    maxLen: 30,
    lettersOnly: true,
    numbersOnly: false,
    ignoreWhitespace: false,
  },
];

test(
  'Returns true for a given valid string.',
  async () => {
    validStrings.forEach((validString) => {
      validReqs.forEach((validReq) => {
        const validResponse: ValidationResult<string> = {
          isValid: true,
          cleanedValue: validString,
        };

        expect(validateString(validString, validReq)).toStrictEqual(validResponse);
      });
    });

    const validString = 'A string with whitespace!';

    const validResponse: ValidationResult<string> = {
      isValid: true,
      cleanedValue: 'Astringwithwhitespace!',
    };

    const validOpt = {
      maxLen: 22,
      ignoreWhitespace: true,
    };

    expect(validateString(validString, validOpt)).toStrictEqual(validResponse);
  },
);

/*------------------------------------------------------------------------*/
/* ---------------------------- Invalid Tests --------------------------- */
/*------------------------------------------------------------------------*/

const invalidStrings: {
  input: string,
  reqs: {
    // whitespace is removed from input before checking and returning
    ignoreWhitespace?: boolean,
    // input length must be at least minLen
    minLen?: number,
    // input length must be at most maxLen
    maxLen?: number,
    // input must only contain letters
    lettersOnly?: boolean,
    // input must only contain numbers
    numbersOnly?: boolean,
    // input must match given regExp
    regexTest?: RegExp,
    // description of regExp test, used to customize error messages
    regexDescription?: string,
  },
  error: string[]
}[] = [
  {
    input: 'ûšër',
    reqs: {
      minLen: 5,
      lettersOnly: true,
    },
    error: [INVALID_STRING_ERRORS.MIN_LEN(5)],
  },
  {
    input: '123456789',
    reqs: {
      minLen: 10,
      maxLen: 5,
      lettersOnly: true,
    },
    error: [INVALID_STRING_ERRORS.MIN_LEN(10), INVALID_STRING_ERRORS.MAX_LEN(5), INVALID_STRING_ERRORS.LETTERS_ONLY],
  },
  {
    input: 'String with non-letters!!',
    reqs: {
      lettersOnly: true,
      numbersOnly: true,
      ignoreWhitespace: true,
    },
    error: [INVALID_STRING_ERRORS.LETTERS_ONLY, INVALID_STRING_ERRORS.NUMBERS_ONLY],
  },
  {
    input: '12345678',
    reqs: {
      lettersOnly: true,
      regexTest: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      regexDescription: 'should be a phone number',
    },
    error: [INVALID_STRING_ERRORS.LETTERS_ONLY, `${INVALID_REGEX_ERROR}: should be a phone number`],
  },
];

test(
  'Returns false for a given invalid string.',
  async () => {
    invalidStrings.forEach((triple) => {
      const invalidResponse: ValidationResult<string> = {
        isValid: false,
        errorMessage: `${INVALID_STRING_ERRORS.MESSAGE_INTRO}${genCommaList(triple.error)}.`,
      };

      console.log(invalidResponse.errorMessage);

      expect(validateString(triple.input, triple.reqs)).toStrictEqual(invalidResponse);
    });
  },
);
