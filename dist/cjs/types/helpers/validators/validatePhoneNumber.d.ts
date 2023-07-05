import ValidationResult from './shared/types/ValidationResult';
/**
 * Determines whether a given phone number is valid.
 * @author Austen Money
 * @param phoneNumber phone number to validate
 * @returns whether phone number is considered valid - if valid, also returns
 *   a cleaned version of the number without any formatting. If invalid,
 *   returns an error message.
 */
declare const validatePhoneNumber: (phoneNumber: string) => ValidationResult<string>;
export default validatePhoneNumber;
