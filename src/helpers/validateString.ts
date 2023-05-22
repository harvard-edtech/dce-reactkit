type Result = 
  | { isValid: true} 
  | { isValid: false, errorMessages: Array<string> }

type Requirements = {
  minLen?: number 
  maxLen?: number
  lettersOnly?: boolean 
  ignoreWhitespace?: boolean
}

/** 
 * Determines whether a given input string is considered valid based on 
 * the provided requirements.
 * @author Austen Money
 * @param input string containing user input 
 * @param reqs requirements that the provided input should conform to 
 * @returns whether input is considered valid according to the reqs - if 
 *          invalid, an array is also returned containing messages describing
 *          which requirements were not met.
 */
const validateString = (input: string, reqs: Requirements): Result => {

  const inputErrors: Array<string> = []; 
  let parsedInput: string = input;

  if (reqs.ignoreWhitespace) { // remove whitespace if required
    parsedInput = input.replace(/\s+/g, '');
  }

  
  if (reqs.minLen) { // apply max char requirement
    if (parsedInput.length < reqs.minLen) { 
      inputErrors.push(`Input must not be under ${reqs.minLen} character(s).`);
    }
  }

  if (reqs.maxLen) { // apply max char requirement
    if (parsedInput.length > reqs.maxLen) { 
      inputErrors.push(`Input must not be over ${reqs.maxLen} character(s).`);
    }
  }

  if (reqs.lettersOnly) { // apply alphabetical requirement
    for (let i = 0, len = parsedInput.length; i < len; i++) {
      let curr = parsedInput.charCodeAt(i);

      if (!(curr > 64 && curr < 91) && // upper alpha
          !(curr > 96 && curr < 123)) // lower alpha

        inputErrors.push(`Input must not contain non-letters.`);
        break;
      }
    }

  if (inputErrors.length !== 0) { // input is invalid
    return { 
      isValid: false, 
      errorMessages: inputErrors,
    }
  }

  return { // input is valid
    isValid: true,
  }
};

export default validateString;