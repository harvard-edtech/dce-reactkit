export default (csv) => {
  let numCols;
  if (csv.headers) {
    numCols = csv.headers.length;
  } else {
    // No headers (assume rows are arrays)
    // Number of columns equals the length of the longest row
    csv.data.forEach((row) => {
      if (!numCols || row.length > numCols) {
        numCols = row.length;
      }
    });
  }
  return numCols;
};
