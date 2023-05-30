/**
 * Requirements for string validation function.
 * @author Austen Money
 */
type StringValidationRequirements = {
  minLen?: number 
  maxLen?: number
  lettersOnly?: boolean 
  numbersOnly?: boolean 
  ignoreWhitespace?: boolean
  regexTest?: string
  regexDescription?: string
};

export default StringValidationRequirements;
