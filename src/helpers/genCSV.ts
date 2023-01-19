/**
 * Escape a CSV cell if needed
 * @author Gabe Abrams
 * @param text the cell contents
 * @returns escaped cell text
 */
const escapeCellText = (text: string): string => {
  if (!text.includes(',')) {
    // No need to escape
    return text;
  }

  // Perform escape
  return `"${text.replace(/"/g, '""')}`;
};

/**
 * Generate a CSV file
 * @author Gabe Abrams
 * @param data list of row data in the form of json objects
 * @param columns list of columns to include in the csv
 * @returns multiline csv string
 */
const genCSV = (
  data: {
    [k: string]: any
  }[],
  columns: {
    title: string,
    param: string,
  }[],
): string => {
  let csv = '';

  // Add header
  csv += (
    columns
      .map((column) => {
        return escapeCellText(column.title);
      })
      .join(',')
  );

  // Add each row
  data.forEach((datum) => {
    csv += (
      columns
        .map((column) => {
          return escapeCellText(datum[column.param]);
        })
        .join(',')
    );
  });

  // Return
  return csv;
};

export default genCSV;
