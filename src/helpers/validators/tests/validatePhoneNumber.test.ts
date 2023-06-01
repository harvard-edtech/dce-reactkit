import ValidationResult from '../shared/types/ValidationResult';
import validatePhoneNumber from '../validatePhoneNumber';

/* 
 * VALID TESTS - should all return isValid === true 
 */

test(
  'Returns true for a given valid phone number: 1234567890',
  async () => {
    const validNumber: string = '1234567890';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: '1234567890',
    }

    expect(validatePhoneNumber(validNumber)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns true for a given valid phone number: (123)-456-7890',
  async () => {
    const validNumber: string = '(123)-456-7890';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: '1234567890',
    }

    expect(validatePhoneNumber(validNumber)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns true for a given valid phone number: 123-456-7890',
  async () => {
    const validNumber: string = '123-456-7890';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: '1234567890',
    }

    expect(validatePhoneNumber(validNumber)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns true for a given valid phone number: (123)456-7890',
  async () => {
    const validNumber: string = '(123)456-7890';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: '1234567890',
    }

    expect(validatePhoneNumber(validNumber)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns true for a given valid phone number: (123)4567890',
  async () => {
    const validNumber: string = '(123)4567890';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: '1234567890',
    }

    expect(validatePhoneNumber(validNumber)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns true for a given valid phone number:    123456-7890 ',
  async () => {
    const validNumber: string = '    123456-7890 ';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: '1234567890',
    }

    expect(validatePhoneNumber(validNumber)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns true for a given valid phone number: +1 123 456 7890',
  async () => {
    const validNumber: string = '+1 123 456 7890';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: '11234567890',
    }

    expect(validatePhoneNumber(validNumber)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns true for a given valid phone number: +1123456 7890',
  async () => {
    const validNumber: string = '+1123456 7890';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: '11234567890',
    }

    expect(validatePhoneNumber(validNumber)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns true for a given valid phone number: +1(123)456-7890',
  async () => {
    const validNumber: string = '+1(123)456-7890';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: '11234567890',
    }

    expect(validatePhoneNumber(validNumber)).toStrictEqual(expectedResponse);
  },
);

/* 
 * INVALID TESTS - should all return isValid === false 
 */

test(
  'Returns false for a given invalid phone number: 123456789',
  async () => {
    const invalidNumber: string = '123456789';
    const expectedResponse: ValidationResult = { 
      isValid: false, 
      errorMessage: 'Please provide a valid phone number.',
    }

    expect(validatePhoneNumber(invalidNumber)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns false for a given invalid phone number: 1234-567-890',
  async () => {
    const invalidNumber: string = '1234-567-890';
    const expectedResponse: ValidationResult = { 
      isValid: false, 
      errorMessage: 'Please provide a valid phone number.',
    }

    expect(validatePhoneNumber(invalidNumber)).toStrictEqual(expectedResponse);
  },
);