/**
 * Result of a validation function.
 * @author Austen Money
 */
type ValidationResult = (
  | {
    isValid: true, // if true, the validation was successful
    cleanedValue: string, // the cleaned version of the value
  }
  | {
    isValid: false, // if false, the validation was not successful
    errorMessage: string, // describes why the validation failed
  }
);

export default ValidationResult;
