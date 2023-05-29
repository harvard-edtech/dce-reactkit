/**
 * Result of a validation function
 * @author Austen Money
 */
type ValidationResult = (
  | {
    // If true, the validation was successful
    isValid: true,
    // The cleaned version of the value
    cleanedValue: string,
  }
  | {
    // If true, the validation was successful
    isValid: false,
    // A pretty error message that describes why the validation failed
    errorMessage: string, // combine arr
  }
);

export default ValidationResult;
