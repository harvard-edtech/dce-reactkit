type Result = 
  | { isValid: true} 
  | { isValid: false, errorMessages: Array<string> }

type Requirements = {
  minLen?: number 
  maxLen?: number
  lettersOnly?: boolean 
  numbersOnly?: boolean 
  ignoreWhitespace?: boolean
}

/** 
 * Determines whether a given input string is considered valid based on 
 * the provided requirements.
 * @author Austen Money
 * @param input user input string
 * @param reqs requirements that the provided input should conform to 
 * @returns whether input is considered valid according to the reqs - if 
 *          invalid, an array is also returned containing messages describing
 *          which requirements were not met.
 */
const validateString = (input: string, reqs: Requirements): Result => {

  const errorMessages: Array<string> = []; 
  let parsedInput: string = input;

  if (reqs.ignoreWhitespace) { // remove whitespace if required
    parsedInput = input.replace(/\s+/g, '');
  }

  
  if (reqs.minLen) { // apply max char requirement
    if (parsedInput.length < reqs.minLen) { 
      errorMessages.push(`Input must not be under ${reqs.minLen} character(s).`);
    }
  }

  if (reqs.maxLen) { // apply max char requirement
    if (parsedInput.length > reqs.maxLen) { 
      errorMessages.push(`Input must not be over ${reqs.maxLen} character(s).`);
    }
  }

  if (reqs.lettersOnly) { // apply alphabetical requirement
    for (let i = 0, len = parsedInput.length; i < len; i++) {
      let curr = parsedInput.charCodeAt(i);

      if (!(curr > 64 && curr < 91) && // upper alpha
          !(curr > 96 && curr < 123)) { // lower alpha

        errorMessages.push(`Input must not contain non-letters.`);
        break;
      }
    }
  }

  if (reqs.numbersOnly) { // apply numerical requirement
    for (let i = 0, len = parsedInput.length; i < len; i++) {
      let curr = parsedInput.charCodeAt(i);

      if (!(curr > 47 && curr < 58)) { // digits 0-9
        errorMessages.push(`Input must not contain non-numbers.`);
        break;
      }
    }
  }

  return (
    errorMessages.length === 0
      ? { isValid: true }
      : { isValid: false, errorMessages }
  );
};

export default validateString;