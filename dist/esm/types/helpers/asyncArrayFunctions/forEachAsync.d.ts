/**
 * Run the operator function on each item in the array
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply
 */
declare const forEachAsync: <T>(array: T[], operatorFunction: (item: T, index: number, opts: {
    breakNow: () => void;
    array: T[];
}) => void) => Promise<void>;
export default forEachAsync;
