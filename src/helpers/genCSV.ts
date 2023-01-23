/**
 * Escape a CSV cell if needed
 * @author Gabe Abrams
 * @param text the cell contents
 * @returns escaped cell text
 */
const escapeCellText = (text: string): string => {
  if (!String(text).includes(',')) {
    // No need to escape
    return String(text);
  }

  // Perform escape
  return `"${String(text).replace(/"/g, '""')}`;
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
    csv += '\n';
    csv += (
      columns
        .map((column) => {
          let contents: string;
          const cell = datum[column.param];
          if (
            typeof cell === 'string'
            || typeof cell === 'number'
          ) {
            contents = String(cell);
          } else if (
            typeof cell === 'undefined'
            || cell === null
          ) {
            contents = '';
          } else if (typeof cell === 'object') {
            contents = JSON.stringify(cell);
          } else {
            contents = '';
          }
          return escapeCellText(contents);
        })
        .join(',')
    );
  });

  // Return
  return csv;
};

export default genCSV;
