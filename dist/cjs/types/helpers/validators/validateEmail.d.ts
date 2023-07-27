import ValidationResult from './shared/types/ValidationResult';
/**
 * Determines whether a given email address is valid.
 * @author Austen Money
 * @param email email address to validate
 * @returns whether email fulfills proper formatting requirements, includes a
 *   cleaned version of the address without leading or trailing
 *   whitespace if valid or an error message if invalid.
 */
declare const validateEmail: (email: string) => ValidationResult<string>;
export default validateEmail;
