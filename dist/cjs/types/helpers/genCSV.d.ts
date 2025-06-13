/**
 * Generate a CSV file
 * @author Gabe Abrams
 * @param data list of row data in the form of json objects
 * @param columns list of columns to include in the csv where each column is an object with:
 * - title: the column title
 * - param: the key in the data object to use for this column
 * - textIfUndefined: optional text to use if the value is undefined (defaults to empty string)
 * @returns multiline csv string
 */
declare const genCSV: (data: {
    [k: string]: any;
}[], columns: {
    title: string;
    param: string;
    textIfUndefined?: string;
}[]) => string;
export default genCSV;
