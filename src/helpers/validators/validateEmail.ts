// Import helpers
import validateRegex from './shared/helpers/validateRegex';

// Import constants
import { INVALID_EMAIL_ERROR } from './shared/constants/ERROR_MESSAGES';

// Import types
import ValidationResult from './shared/types/ValidationResult';

/**
 * Determines whether a given email address is valid.
 * @author Austen Money
 * @param email email address to validate
 * @returns whether email fulfills proper formatting requirements, includes a
 *   cleaned version of the address without leading or trailing
 *   whitespace if valid or an error message if invalid.
 */
const validateEmail = (
  email: string,
): ValidationResult<string> => {
  // validation regex, sourced from HTML living standard: http://www.whatwg.org/specs/web-apps/current-work/multipage/forms.html#e-mail-state-(type=email)
  // eslint-disable-next-line max-len
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // remove leading and trailing whitespace
  const cleanedValue: string = email.replace(/^\s+|\s+$/g, '');

  // validate email with regex, and return error if not valid
  return (
    validateRegex(
      {
        input: cleanedValue,
        regex: emailRegex,
      },
    ).isValid
      ? {
        isValid: true,
        cleanedValue,
      }
      : {
        isValid: false,
        errorMessage: INVALID_EMAIL_ERROR,
      }
  );
};

export default validateEmail;
