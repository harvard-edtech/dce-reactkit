import ValidationResult from '../shared/types/ValidationResult';
import validateString from '../validateString';
import StringValidationRequirements from '../validateString/StringValidationRequirements';

/*
 * VALID TESTS - should all return isValid === true
 */

const validStrings: string[] = [
  'users',
  'username',
  'MyValidString',
  'HereisAnotherValidString',
  'WoahAnotherValidStringIsHere',
];

const validReqs: StringValidationRequirements[] = [
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
        const validResponse: ValidationResult = {
          isValid: true,
          cleanedValue: validString,
        };

        expect(validateString(validString, validReq)).toStrictEqual(validResponse);
      });
    });

    const validString = 'A string with whitespace!';

    const validResponse: ValidationResult = {
      isValid: true,
      cleanedValue: 'Astringwithwhitespace!',
    };

    const validReq: StringValidationRequirements = {
      maxLen: 22,
      ignoreWhitespace: true,
    };

    expect(validateString(validString, validReq)).toStrictEqual(validResponse);
  },
);

/*
 * INVALID TESTS - should all return isValid === false
 */

const invalidStrings: string[] = [
  'user',
  '123456789',
  'String with non-letters!!',
  '12345678',
];

const invalidReqs: StringValidationRequirements[] = [
  {
    minLen: 5,
  },
  {
    minLen: 10,
    maxLen: 5,
    lettersOnly: true,
  },
  {
    lettersOnly: true,
    numbersOnly: true,
    ignoreWhitespace: true,
  },
  {
    lettersOnly: true,
    regexTest: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    regexDescription: 'Should be a phone number',
  },
];

const invalidErrors: string[] = [
  'The following error(s) occurred: Input must not be under 5 character(s).',
  'The following error(s) occurred: Input must not be under 10 character(s). Input must not be over 5 character(s). Input must not contain non-letters.',
  'The following error(s) occurred: Input must not contain non-letters. Input must not contain non-numbers.',
  'The following error(s) occurred: Input must not contain non-letters. Input does not follow the requested format: Should be a phone number.',
];

test(
  'Returns false for a given invalid string.',
  async () => {
    invalidStrings.forEach((invalidString, idx) => {
      const invalidResponse: ValidationResult = {
        isValid: false,
        errorMessage: invalidErrors[idx],
      };

      expect(validateString(invalidString, invalidReqs[idx])).toStrictEqual(invalidResponse);
    });
  },
);
