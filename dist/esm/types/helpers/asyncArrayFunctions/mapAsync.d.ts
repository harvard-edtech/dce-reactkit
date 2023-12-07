/**
 * Run the operator function on each item in the array, collecting all results
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply
 * @returns the array of results
 */
declare const mapAsync: <T, U>(array: T[], operatorFunction: (item: T, index: number, opts: {
    breakNow: () => void;
    array: T[];
}) => Promise<U>) => Promise<U[]>;
export default mapAsync;
