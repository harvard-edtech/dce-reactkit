// import types
import ValidationResult from '../types/ValidationResult';

/** 
 * Determines whether a given input string is considered valid based on 
 * the provided regex.
 * @author Austen Money
 * @param input user-provided input to validate 
 * @param regexString regular expression to check against input 
 * @param regexDescription description of what regexString is checking for, 
 *                         used to customize error message
 * @returns the unchanged input if valid, or a customized error message if 
 *          invalid
 */
const validateRegex = (input: string, regex: RegExp, regexDescription?: string)
                      : ValidationResult => {

  let errorMessage: string;

  regexDescription // customize error message in case of invalid input
    ? errorMessage = `Input does not follow the requested format:\n\t\t\
    ${regexDescription}.`
    : errorMessage = `Input does not follow the requested format.`

  return ( 
    regex.test(input) 
      ? { isValid: true, cleanedValue: input } 
      : { isValid: false, errorMessage }
  );
};

export default validateRegex;