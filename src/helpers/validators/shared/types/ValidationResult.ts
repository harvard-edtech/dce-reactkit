/**
 * Result of a validation function.
 * @author Austen Money
 */
type ValidationResult = (
  | {
    // if true, the validation was successful
    isValid: true,
    // the cleaned version of the value
    cleanedValue: string,
  }
  | {
    // if false, the validation was not successful
    isValid: false,
    // describes why the validation failed
    errorMessage: string,
  }
);

export default ValidationResult;
