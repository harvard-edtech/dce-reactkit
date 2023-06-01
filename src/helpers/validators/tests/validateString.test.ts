import ValidationResult from '../shared/types/ValidationResult';
import validateString from '../validateString';
import StringValidationRequirements from '../validateString/StringValidationRequirements';

test(
  'Returns true for a given valid string.',
  async () => {
    const validString: string = 'My Valid String!';

    const validReqs: StringValidationRequirements = { 
      minLen: 10, 
      maxLen: 30,
    };

    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: 'My Valid String!',
    };

    expect(validateString(validString, validReqs)).toStrictEqual(expectedResponse);
  },
);