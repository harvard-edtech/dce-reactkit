/**
 * Result of a validation function.
 * @author Austen Money
 */
type ValidationResult<CleanedValueType> = ({
    isValid: true;
    cleanedValue: CleanedValueType;
} | {
    isValid: false;
    errorMessage: string;
});
export default ValidationResult;
