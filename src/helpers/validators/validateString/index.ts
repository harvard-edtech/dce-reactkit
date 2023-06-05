// import helpers
import validateRegex from '../shared/helpers/validateRegex';
import ValidationResult from '../shared/types/ValidationResult';

// import types
import StringValidationRequirements from './StringValidationRequirements';

/** 
 * Determines whether a given input string is considered valid based on 
 *   the provided requirements.
 * @author Austen Money
 * @param input input string
 * @param reqs requirements that the provided string should conform to 
 * @returns whether input is considered valid according to reqs - if 
 *   valid, returns a cleaned version of input; if invalid, returns 
 *   a string containing error messages describing which requirements 
 *   were not met.
 */
const validateString = (input: string, reqs: StringValidationRequirements): ValidationResult => {

  // stores all invalid input errors
  const errorMessages: Array<string> = []; 
  // contains version of input that will be returned
  let cleanedValue: string = input;

  // remove whitespace if required
  if (reqs.ignoreWhitespace) { 
    cleanedValue = input.replace(/\s+/g, '');
  }
  
   // apply max char requirement
  if (reqs.minLen) {
    if (cleanedValue.length < reqs.minLen) { 
      errorMessages.push(`Input must not be under ${reqs.minLen} character(s).`);
    }
  }

  // apply max char requirement
  if (reqs.maxLen) { 
    if (cleanedValue.length > reqs.maxLen) { 
      errorMessages.push(`Input must not be over ${reqs.maxLen} character(s).`);
    }
  }

  // apply alphabetical requirement
  if (reqs.lettersOnly) { 
    for (let i = 0, len = cleanedValue.length; i < len; i++) {
      let curr = cleanedValue.charCodeAt(i);

      // check that char is an upper or lower-case letter
      if (!(curr > 64 && curr < 91) && 
          !(curr > 96 && curr < 123)) { 

        errorMessages.push(`Input must not contain non-letters.`);
        break;
      }
    }
  }

  // apply numerical requirement
  if (reqs.numbersOnly) { 
    for (let i = 0, len = cleanedValue.length; i < len; i++) {
      let curr = cleanedValue.charCodeAt(i);

      // check that char is a digit
      if (!(curr > 47 && curr < 58)) {
        errorMessages.push(`Input must not contain non-numbers.`);
        break;
      }
    }
  }

  // apply regex requirement
  if (reqs.regexTest) { 
    const regex = new RegExp(reqs.regexTest);
    let result: ValidationResult; 

    // validate and create customized error message if description is provided
    reqs.regexDescription 
      ? result = validateRegex( 
        {
          input: cleanedValue, 
          regex, 
          regexDescription: reqs.regexDescription, 
        }
      )
      : result = validateRegex(
        {
          input: cleanedValue, 
          regex, 
        }
      )

    // if string did not pass regex validation, add error message
    if (result.isValid === false) { 
      errorMessages.push(result.errorMessage);
    }
  }

  // combine all error messages into one string to return
  let errorMessage = "The following errors occurred: ";
  for (let i = 0; i < errorMessages.length; i++) { 
    errorMessage = `${errorMessage}${errorMessages[i]}, `;
  }

  return (
    // if no error messages, string is valid
    errorMessages.length === 0 
      ? { 
          isValid: true, 
          cleanedValue,
        }
      : { 
          isValid: false, 
          errorMessage, 
        }
  );
};

export default validateString;