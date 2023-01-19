/**
 * Generate a CSV file
 * @author Gabe Abrams
 * @param data list of row data in the form of json objects
 * @param columns list of columns to include in the csv
 * @returns multiline csv string
 */
declare const genCSV: (data: {
    [k: string]: any;
}[], columns: {
    title: string;
    param: string;
}[]) => string;
export default genCSV;
