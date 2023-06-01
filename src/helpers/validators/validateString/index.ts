// import helpers
import validateRegex from '../shared/helpers/validateRegex';
import ValidationResult from '../shared/types/ValidationResult';

// import types
import StringValidationRequirements from './StringValidationRequirements';

/** 
 * Determines whether a given input string is considered valid based on 
 * the provided requirements.
 * @author Austen Money
 * @param input input string
 * @param reqs requirements that the provided string should conform to 
 * @returns whether input is considered valid according to reqs - if 
 *          valid, returns a cleaned version of input; if invalid, returns 
 *          a string containing error messages describing which requirements 
 *          were not met.
 */
const validateString = (input: string, reqs: StringValidationRequirements): ValidationResult => {

  const errorMessages: Array<string> = []; // stores all invalid input errors
  let cleanedValue: string = input; // version of input that will be returned

  if (reqs.ignoreWhitespace) { // remove whitespace if required
    cleanedValue = input.replace(/\s+/g, '');
  }
  
  if (reqs.minLen) { // apply max char requirement
    if (cleanedValue.length < reqs.minLen) { 
      errorMessages.push(`Input must not be under ${reqs.minLen} character(s).`);
    }
  }

  if (reqs.maxLen) { // apply max char requirement
    if (cleanedValue.length > reqs.maxLen) { 
      errorMessages.push(`Input must not be over ${reqs.maxLen} character(s).`);
    }
  }

  if (reqs.lettersOnly) { // apply alphabetical requirement
    for (let i = 0, len = cleanedValue.length; i < len; i++) {
      let curr = cleanedValue.charCodeAt(i);

      if (!(curr > 64 && curr < 91) && // upper alpha
          !(curr > 96 && curr < 123)) { // lower alpha

        errorMessages.push(`Input must not contain non-letters.`);
        break;
      }
    }
  }

  if (reqs.numbersOnly) { // apply numerical requirement
    for (let i = 0, len = cleanedValue.length; i < len; i++) {
      let curr = cleanedValue.charCodeAt(i);

      if (!(curr > 47 && curr < 58)) { // digits 0-9
        errorMessages.push(`Input must not contain non-numbers.`);
        break;
      }
    }
  }

  if (reqs.regexTest) { // check against regex requirement
    const regex = new RegExp(reqs.regexTest);
    let result: ValidationResult; 

    // validate and create customized error message if description is provided
    reqs.regexDescription 
      ? result = validateRegex(cleanedValue, regex, reqs.regexDescription)
      : result = validateRegex(cleanedValue, regex)

    if (result.isValid === false) { // string did not pass regex validation
      errorMessages.push(result.errorMessage);
    }
  }

  let errorMessage = "The following errors occurred:";
  // combine all error messages into one string to return
  for (let i = 0; i < errorMessages.length; i++) { 
    errorMessage = `${errorMessage}\n\t${errorMessages[i]}`;
  }

  return (
    errorMessages.length === 0 // if no error messages, string is valid
      ? { isValid: true, cleanedValue }
      : { isValid: false, errorMessage }
  );
};

export default validateString;