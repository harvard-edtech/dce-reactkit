import ValidationResult from '../shared/types/ValidationResult';
import validatePhoneNumber from '../validatePhoneNumber';

/*
 * VALID TESTS - should all return isValid === true
 */

const validPhoneNumbers: string[] = [
  '1234567890',
  '(123)-456-7890',
  '123-456-7890',
  '(123)456-7890',
  '(123)4567890',
  '    123456-7890 ',
];

const validPhoneNumbersExt: string[] = [
  '+1 123 456 7890',
  '+1123456 7890',
  '+1(123)456-7890',
];

test(
  'Returns true for a given valid phone number and removes any non-digit characters.',
  async () => {
    validPhoneNumbers.forEach((phoneNumber) => {
      const validResponse: ValidationResult = {
        isValid: true,
        cleanedValue: '1234567890',
      };

      expect(validatePhoneNumber(phoneNumber)).toStrictEqual(validResponse);
    });
    validPhoneNumbersExt.forEach((phoneNumberExt) => {
      const validResponse: ValidationResult = {
        isValid: true,
        cleanedValue: '11234567890',
      };

      expect(validatePhoneNumber(phoneNumberExt)).toStrictEqual(validResponse);
    });
  },
);

/*
 * INVALID TESTS - should all return isValid === false
 */

const invalidPhoneNumbers: string[] = [
  '123456789',
  '1234567894567890',
  '1234-567-890',
  '123456m78',
  '123 4567 890',
];

test(
  'Returns false for a given valid phone number.',
  async () => {
    invalidPhoneNumbers.forEach((phoneNumber) => {
      const invalidResponse: ValidationResult = {
        isValid: false,
        errorMessage: 'Please provide a valid phone number.',
      };

      expect(validatePhoneNumber(phoneNumber)).toStrictEqual(invalidResponse);
    });
  },
);
