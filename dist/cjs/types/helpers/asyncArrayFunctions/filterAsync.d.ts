/**
 * Run the operator function on each item in the array, returning a new array
 *   that only contains the items that pass the filter
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply. If it returns true
 *   for an item, the item will be included in the returned array
 * @returns the filtered array
 */
declare const filterAsync: <T>(array: T[], operatorFunction: (item: T, index: number, opts: {
    breakNow: () => void;
    array: T[];
}) => Promise<any>) => Promise<T[]>;
export default filterAsync;
