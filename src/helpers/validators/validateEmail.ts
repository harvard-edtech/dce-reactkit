import validateRegex from './shared/helpers/validateRegex.js';

type emailResult = 
  | { isValid: true } 
  | { isValid: false, errorMessage: string }

/** 
 * Determines whether a given email address is valid.
 * @author Austen Money
 * @param email email address to validate
 * @returns whether email fulfills proper formatting requirements, including 
 *          an error message if it does not 
 */
const validateEmail = (email: string): emailResult => {
  
  const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) // regex sourced from HTML living standard

  return ( 
    validateRegex(email, emailRegex).isValid 
      ? { isValid: true }
      : { isValid: false, errorMessage: 'Please provide a valid email address.'}
  );
};

export default validateEmail;