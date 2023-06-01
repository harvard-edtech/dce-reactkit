import validateRegex from "./shared/helpers/validateRegex"
import ValidationResult from './shared/types/ValidationResult';

/** 
 * Determines whether a given phone number is valid. 
 * @author Austen Money
 * @param phoneNumber phone number to validate 
 * @returns whether phone number is considered valid - if valid, also returns 
 *          a cleaned version of the number without any formatting (without
 *          parentheses, dashes, or whitespace); if invalid, returns an
 *          error message.
 */
const validatePhoneNumber = (phoneNumber: string): ValidationResult => {
  
  const validationRegex = new RegExp(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/); // regex to validate phone number
  
  // validate phone number
  const validationResponse = validateRegex(phoneNumber, validationRegex);
  // remove all non-digits from number 
  const cleanedValue: string = phoneNumber.replace(/\D/g,''); 

  return (
    validationResponse.isValid 
      ? { isValid: true, cleanedValue }
      : { isValid: false, errorMessage: 'Please provide a valid phone number.' }
  );
};

export default validatePhoneNumber;