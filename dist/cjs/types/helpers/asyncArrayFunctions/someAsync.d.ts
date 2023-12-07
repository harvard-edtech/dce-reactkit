/**
 * Run the operator function on each item in the array, returning true if
 *   the operator function returns true for any item in the array
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply. If it returns true
 *   for any item, this function will return true
 * @returns true if the operator function returns true for any item in the array
 */
declare const someAsync: <T>(array: T[], operatorFunction: (item: T, index: number, opts: {
    breakNow: () => void;
    array: T[];
}) => Promise<any>) => Promise<boolean>;
export default someAsync;
