/**
 * For every element in an array, extract the value of a prop
 *   (e.g. for all user objects, extract their ages and put that into a new
 *   ages array)
 * @author Gabe Abrams
 * @param arr the array of objects to operate on
 * @param prop the property to extract from each object
 * @returns new array containing the corresponding values, in order, of each
 *   object in the original array
 */
declare const extractProp: (arr: any[], prop: string) => any[];
export default extractProp;
