import CSVParser from 'papaparse';

/**
 * Function for turning a csv object into a csv string
 * @param {string[]} [csv.fields] - an array of field names. These will be used
 *   generate the header row of the csv
 * @param {string[][]} [csv.data] - an array of csv rows, where each row is an
 *   array of strings that correspond to the cells of the row
 * @return {string} the csv file contents
 */
export default (csv => {
  return CSVParser.unparse(csv);
});

// Example:
// const fields = ['Name', 'Age'];
// const data = [['Divardo', '19'], ['Calicci', '22']];
// const csv = { fields, data}
//
// Calling csvToString(csv) results in the following csv file:
// Name, Age
// Divardo, 19
// Calicci, 22