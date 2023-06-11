// Import types
import ValidationResult from '../shared/types/ValidationResult';
import StringValidationRequirements from '../validateString/StringValidationRequirements';

// Import function
import validateString from '../validateString';

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

/*------------------------------------------------------------------------*/
/* ---------------------------- Invalid Tests --------------------------- */
/*------------------------------------------------------------------------*/

const invalidStrings: { input: string, reqs: StringValidationRequirements, error: string }[] = [
  {
    input: 'ûšër',
    reqs: {
      minLen: 5,
      lettersOnly: true,
    },
    error: 'The following error(s) occurred: Input must not be under 5 character(s).',
  },
  {
    input: '123456789',
    reqs: {
      minLen: 10,
      maxLen: 5,
      lettersOnly: true,
    },
    error: 'The following error(s) occurred: Input must not be under 10 character(s), Input must not be over 5 character(s), Input must only contain letters.',
  },
  {
    input: 'String with non-letters!!',
    reqs: {
      lettersOnly: true,
      numbersOnly: true,
      ignoreWhitespace: true,
    },
    error: 'The following error(s) occurred: Input must only contain letters, Input must only contain numbers.',
  },
  {
    input: '12345678',
    reqs: {
      lettersOnly: true,
      regexTest: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      regexDescription: 'Should be a phone number',
    },
    error: 'The following error(s) occurred: Input must only contain letters, Input does not follow the requested format: Should be a phone number.',
  },
];

test(
  'Returns false for a given invalid string.',
  async () => {
    invalidStrings.forEach((triple) => {
      const invalidResponse: ValidationResult = {
        isValid: false,
        errorMessage: triple.error,
      };

      expect(validateString(triple.input, triple.reqs)).toStrictEqual(invalidResponse);
    });
  },
);
