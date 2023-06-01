import ValidationResult from '../shared/types/ValidationResult';
import validateEmail from '../validateEmail';

test(
  'Returns true for a given valid email.',
  async () => {
    const validEmail: string = 'austen@gmail.com';
    const expectedResponse: ValidationResult = { 
      isValid: true, 
      cleanedValue: 'austen@gmail.com',
    }
    expect(validateEmail(validEmail)).toStrictEqual(expectedResponse);
  },
);