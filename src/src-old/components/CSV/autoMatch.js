import validators from '../../common/validators';
import getNumCols from './getNumCols';

/**
 * Performs auto csv header matching and determines the allowed manual matchings
 *   that a user can do (via dropowns)
 * @param {object} csv - the csv object to analyze
 * @param {object} headersToMatch - a list of headers to match against the csv
 *   headers
 * @param {string} headersToMatch[].key - the property name to use for the
 *   parsed version of the csv (for each row object, the value in this column
 *   will be found in row[key]). Example: 'name'
 * @param {string} headersToMatch[].title - a human-readable title of the column
 *   that needs to be matched. Example: 'Student Name'
 * @param {string} headersToMatch[].description - a human-readable description
 *   of the column that needs to be matched. Example: 'the student's full name'
 * @param {boolean} headersToMatch[].required - if true, the header must be
 *   matched before continuing. Otherwise, the header is allowed to remain
 *   unmatched
 * @param {string|function} headersToMatch[].validator - a validator function
 *   that must return true on all cells in a column for the column to be deemed
 *   valid for matching. If validator is a string, it must be a listed validator
 *   in /common/validators
 * @param {boolean} [allowEmpty] - if true, empty cells are not validated (they
 *   are deemed valid)
 * @param {array.<String>} headersToMatch[].titleGuesses - additional guesses
 *   for what the csv might be titling this column. Example:
 *   ['Full Name', 'Given Name'].
 *   We will always use headersToMatch[].title as one of the titleGuesses
 */
export default (csv, headersToMatch) => {
  // > Determine which headers can be matched to each column (use validator)
  const allowedHeaders = {};
  // ^ column index => array of headers that we can match this column with
  const headerToAllowedColumns = [];
  // ^ headerKey => array of column indices that we can match the header with
  const numCols = getNumCols(csv);
  for (let cIndex = 0; cIndex < numCols; cIndex++) {
    // The key to look up the column in csv.data[i]
    const columnHeader = (
      csv.headers
        ? csv.headers[cIndex]
        : cIndex
    );

    // Loop through all headers and determine if it's allowed to be matched
    for (let hIndex = 0; hIndex < headersToMatch.length; hIndex++) {
      const headerToMatch = headersToMatch[hIndex];

      // Check for a validator
      let validationFailed;
      let { validator } = headerToMatch;
      if (typeof validator === 'string') {
        validator = validators[validator];
      }
      if (validator) {
        // Check that all cells in the column are valid
        for (let rIndex = 0; rIndex < csv.data.length; rIndex++) {
          const row = csv.data[rIndex];
          const cell = row[columnHeader];

          // Check for fail due to emptiness
          if (
            !headerToMatch.allowEmpty
            && (!cell || cell.trim().length === 0)
          ) {
            validationFailed = true;
            break;
          }

          // Check for fail due to validator
          if (!validator(cell)) {
            validationFailed = true;
            break;
          }
        }
      }

      // Add to list if validation succeeded
      if (!validationFailed) {
        if (!allowedHeaders[cIndex]) {
          allowedHeaders[cIndex] = [];
        }
        allowedHeaders[cIndex].push(headerToMatch);

        if (!headerToAllowedColumns[headerToMatch.key]) {
          headerToAllowedColumns[headerToMatch.key] = [];
        }
        headerToAllowedColumns[headerToMatch.key].push(cIndex);
      }
    }
  }
  console.log(allowedHeaders);

  // Check that each header can be matched to at least one column
  for (let i = 0; i < headersToMatch.length; i++) {
    const allowedColumns = headerToAllowedColumns[headersToMatch[i].key];
    if (!allowedColumns && headersToMatch[i].required) {
      this.state = {
        impossible: true,
      };
      return;
    }
  }

  // Try to automatically match up columns
  const columnMapping = {}; // column index => headerKey
  const headerIsMatched = {}; // headerKey => true if already matched
  const columnIsMatched = {}; // cIndex => true if already matched
  // > If a column can only be assigned to one column, automatically assign it
  Object.keys(headerToAllowedColumns).forEach((headerKey) => {
    const allowedColumns = headerToAllowedColumns[headerKey];
    if (allowedColumns.length === 1) {
      // Save header mapping
      columnMapping[allowedColumns[0]] = headerKey;
      headerIsMatched[headerKey] = true;
      columnIsMatched[allowedColumns[0]] = true;
    }
  });

  // Match remaining columns by title guesses (if possible)
  if (csv.headers) {
    // We have header names to attempt to match
    const headerToColumnsThatMatchGuesses = {};
    // ^ headerKey => list of columns with title guesses that match
    headersToMatch.forEach((header) => {
      // Skip header if already matched
      if (headerIsMatched[header.key]) {
        return;
      }

      // Compile all title guesses (and add on actual title as a guess)
      const titleGuesses = [header.title].concat(header.titleGuesses || []);

      // Check all allowed columns
      headerToAllowedColumns[header.key].forEach((cIndex) => {
        // Skip column if already matched
        if (columnIsMatched[cIndex]) {
          return;
        }

        // Keep track of guesses that match
        titleGuesses.forEach((titleGuess) => {
          const fixedTitleGuess = titleGuess.trim().toLowerCase();
          const fixedHeaderTitle = csv.headers[cIndex].trim().toLowerCase();
          if (fixedTitleGuess === fixedHeaderTitle) {
            // Found a match
            if (!headerToColumnsThatMatchGuesses[header.key]) {
              headerToColumnsThatMatchGuesses[header.key] = [];
            }
            headerToColumnsThatMatchGuesses[header.key].push(cIndex);
          }
        });
      });
    });

    // If title guesses provide one option for matching, use it!
    Object.keys(headerToColumnsThatMatchGuesses).forEach((headerKey) => {
      const columnsThatMatch = headerToColumnsThatMatchGuesses[headerKey];
      if (columnsThatMatch.length === 1) {
        // Found one match!
        // Save header mapping
        columnMapping[columnsThatMatch[0]] = headerKey;
        headerIsMatched[headerKey] = true;
        columnIsMatched[columnsThatMatch[0]] = true;
      }
    });
  }

  return {
    allowedHeaders,
    columnMapping,
  };
};
