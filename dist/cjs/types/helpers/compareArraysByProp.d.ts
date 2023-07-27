/**
 * Compare two arrays of objects by only comparing the values in a specific
 *  property (e.g. compare user arrays by comparing their user.id values)
 * @author Gabe Abrams
 * @param a the first array
 * @param b the second array
 * @param prop the property to compare with, or an array of props to compare
 *   with (if array, all values associated with those props must match)
 * @returns true if the arrays contain the same objects as determined by
 *   the values associated with each object's prop
 */
declare const compareArraysByProp: (a: any[], b: any[], prop: string | string[]) => boolean;
export default compareArraysByProp;
