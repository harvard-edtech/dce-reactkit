/**
 * Requirements for string validation function.
 * @author Austen Money
 */
type StringValidationRequirements = {
  // string length must be at least minLen
  minLen?: number
  // string length must be at most maxLen
  maxLen?: number
  // string must only contain letters
  lettersOnly?: boolean
  // string must only contain numbers
  numbersOnly?: boolean
  // whitespace is removed from string before checking and returning
  ignoreWhitespace?: boolean
  // string must match given regExp
  regexTest?: RegExp
  // description of regExp test, used to customize error messages
  regexDescription?: string
};

export default StringValidationRequirements;
