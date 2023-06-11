// Import types
import ValidationResult from '../shared/types/ValidationResult';

// Import function
import validatePhoneNumber from '../validatePhoneNumber';

/*------------------------------------------------------------------------*/
/* ---------------------------- Valid Tests --------------------------- */
/*------------------------------------------------------------------------*/

const cleanedNumber = '1234567890';
const cleanedNumberExt = '11234567890';

const validPhoneNumbers: { input: string, cleaned: string }[] = [
  {
    input: '1234567890',
    cleaned: cleanedNumber,
  },
  {
    input: '(123)-456-7890',
    cleaned: cleanedNumber,
  },
  {
    input: '123-456-7890',
    cleaned: cleanedNumber,
  },
  {
    input: '(123)456-7890',
    cleaned: cleanedNumber,
  },
  {
    input: '(123)4567890',
    cleaned: cleanedNumber,
  },
  {
    input: '    123456-7890 ',
    cleaned: cleanedNumber,
  },
  {
    input: '+1 123 456 7890',
    cleaned: cleanedNumberExt,
  },
  {
    input: '+1123456 7890',
    cleaned: cleanedNumberExt,
  },
  {
    input: '+1(123)456-7890',
    cleaned: cleanedNumberExt,
  },
];

test(
  'Returns true for a given valid phone number and removes any non-digit characters.',
  async () => {
    validPhoneNumbers.forEach((pair) => {
      const validResponse: ValidationResult = {
        isValid: true,
        cleanedValue: pair.cleaned,
      };

      expect(validatePhoneNumber(pair.input)).toStrictEqual(validResponse);
    });
  },
);

/*------------------------------------------------------------------------*/
/* ---------------------------- Invalid Tests --------------------------- */
/*------------------------------------------------------------------------*/

const invalidPhoneNumbers: string[] = [
  '123456789',
  '1234567894567890',
  '1234-567-890',
  '123456m78',
  '123 4567 890',
];

const invalidResponse: ValidationResult = {
  isValid: false,
  errorMessage: 'Please provide a valid phone number.',
};

test(
  'Returns false for a given valid phone number.',
  async () => {
    invalidPhoneNumbers.forEach((phoneNumber) => {
      expect(validatePhoneNumber(phoneNumber)).toStrictEqual(invalidResponse);
    });
  },
);
