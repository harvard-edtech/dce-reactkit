import ValidationResult from '../shared/types/ValidationResult';
import validatePhoneNumber from '../validatePhoneNumber';

test(
  'Returns true for a given valid phone number.',
  async () => {
    const validNumber: string = '1234567890';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: '1234567890',
    }

    expect(validatePhoneNumber(validNumber)).toStrictEqual(expectedResponse);
  },
);