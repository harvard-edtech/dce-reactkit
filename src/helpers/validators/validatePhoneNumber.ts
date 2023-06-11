// Import helpers
import validateRegex from './shared/helpers/validateRegex';

// Import types
import ValidationResult from './shared/types/ValidationResult';

/**
 * Determines whether a given phone number is valid.
 * @author Austen Money
 * @param phoneNumber phone number to validate
 * @returns whether phone number is considered valid - if valid, also returns
 *   a cleaned version of the number without any formatting. If invalid,
 *   returns an error message.
 */
const validatePhoneNumber = (phoneNumber: string): ValidationResult => {
  // regex to validate phone number
  const validationRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

  // validate phone number with regex
  const validationResponse = validateRegex(
    {
      input: phoneNumber,
      regex: validationRegex,
    },
  );

  // remove all non-digits from number
  const cleanedValue: string = phoneNumber.replace(/\D/g, '');

  // return cleaned value if valid, or error message if invalid
  return (
    validationResponse.isValid
      ? {
        isValid: true,
        cleanedValue,
      }
      : {
        isValid: false,
        errorMessage: 'Please provide a valid phone number.',
      }
  );
};

export default validatePhoneNumber;
