type StringValidationRequirements = {
  minLen?: number 
  maxLen?: number
  lettersOnly?: boolean 
  numbersOnly?: boolean 
  ignoreWhitespace?: boolean
  regexTest?: string
};

export default StringValidationRequirements;
