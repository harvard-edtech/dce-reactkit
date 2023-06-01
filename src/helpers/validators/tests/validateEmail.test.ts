import ValidationResult from '../shared/types/ValidationResult';
import validateEmail from '../validateEmail';

/* 
 * VALID TESTS - should all return isValid === true 
 */

test(
  'Returns true for a given valid email. No change to returned email value.',
  async () => {
    const validEmail: string = 'username@gmail.com';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: 'username@gmail.com',
    }
    expect(validateEmail(validEmail)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns true for a given valid email. No change to returned email value.',
  async () => {
    const validEmail: string = 'u@hotmail.org';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: 'u@hotmail.org',
    }
    expect(validateEmail(validEmail)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns true for a given valid email. Returned email value does not have leading or trailing spaces.',
  async () => {
    const validEmail: string = '   username@gmail.com';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: 'username@gmail.com',
    }
    expect(validateEmail(validEmail)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns true for a given valid email. Returned email value does not have leading or trailing spaces.',
  async () => {
    const validEmail: string = 'username@gmail.com        ';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: 'username@gmail.com',
    }
    expect(validateEmail(validEmail)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns true for a given valid email. Returned email value does not have leading or trailing spaces.',
  async () => {
    const validEmail: string = ' username@gmail.com ';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: 'username@gmail.com',
    }
    expect(validateEmail(validEmail)).toStrictEqual(expectedResponse);
  },
);

/* 
 * INVALID TESTS - should all return isValid === false 
 */

test(
  'Returns false for a given invalid email with no username.',
  async () => {
    const invalidEmail: string = '@gmail.com ';
    const expectedResponse: ValidationResult = { 
      isValid: false, 
      errorMessage: 'Please provide a valid email address.',
    }
    expect(validateEmail(invalidEmail)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns false for a given invalid email that is empty.',
  async () => {
    const invalidEmail: string = '';
    const expectedResponse: ValidationResult = { 
      isValid: false, 
      errorMessage: 'Please provide a valid email address.',
    }
    expect(validateEmail(invalidEmail)).toStrictEqual(expectedResponse);
  },
);

test(
  'Returns false for a given invalid email with no domain.',
  async () => {
    const invalidEmail: string = 'username';
    const expectedResponse: ValidationResult = { 
      isValid: false, 
      errorMessage: 'Please provide a valid email address.',
    }
    expect(validateEmail(invalidEmail)).toStrictEqual(expectedResponse);
  },
);

test(
    'Returns false for a given invalid email with no domain.',
    async () => {
      const invalidEmail: string = 'username@.com';
      const expectedResponse: ValidationResult = { 
        isValid: false, 
        errorMessage: 'Please provide a valid email address.',
      }
      expect(validateEmail(invalidEmail)).toStrictEqual(expectedResponse);
    },
);

test(
  'Returns false for a given invalid email with interior spaces.',
  async () => {
    const invalidEmail: string = 'user name@gmail.com';
    const expectedResponse: ValidationResult = { 
      isValid: false, 
      errorMessage: 'Please provide a valid email address.',
    }
    expect(validateEmail(invalidEmail)).toStrictEqual(expectedResponse);
  },
);