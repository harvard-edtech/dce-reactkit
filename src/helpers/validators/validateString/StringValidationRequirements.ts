/**
 * Requirements for string validation function.
 * @author Austen Money
 */
type StringValidationRequirements = {
  minLen?: number // string length must be at least minLen
  maxLen?: number // string length must be at most maxLen
  lettersOnly?: boolean // string must only contain letters
  numbersOnly?: boolean // string must only contain numbers
  ignoreWhitespace?: boolean // whitespace is removed from string before 
                             // checking and returning
  regexTest?: string // string must match given regExp 
  regexDescription?: string // description of regExp test, used to customize 
                            // error messages
};

export default StringValidationRequirements;
