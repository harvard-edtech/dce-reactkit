import validateString from "./validateString.js";

type phoneNumberResult = 
  | { isValid: true, cleanedNumber: string} 
  | { isValid: false, errorMessage: string }

/** 
 * Determines whether a given phone number is valid. 
 * @author Austen Money
 * @param phoneNumber phone number to validate 
 * @returns whether phone number is considered valid - if valid, also returns 
 *          a cleaned version of the number without any formatting (without
 *          parentheses, dashes, or whitespace); if invalid, also returns an
 *          error message.
 */
const validatePhoneNumber = (phoneNumber: string): phoneNumberResult => {
  
  const phoneNumberReqs = { // require that cleaned number has 10 digits 
    minLen: 10, 
    maxLen: 10,
    numbersOnly: true,
  };

  // remove parentheses, dashes, and whitespace from number 
  const cleanedNumber: string = phoneNumber.replace(/\s+|[()]|-/g, ''); 
  const response = validateString(cleanedNumber, phoneNumberReqs); // validate

  return (
    response.isValid 
      ? { isValid: true, cleanedNumber }
      : { isValid: false, errorMessage: 'Please enter a valid phone number.' }
  );
};

export default validatePhoneNumber;