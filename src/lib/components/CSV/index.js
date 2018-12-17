import React, { Component } from 'react';
import PropTypes from 'prop-types';
import genUUID from 'uuid/v1';

// Import file download button
import DownloadLink from 'react-download-link';

// Import bootstrap componenets
import { Table } from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

// Import other components
import Alert from '../Alert';
import LeftAddon from '../Layout/LeftAddon';
import RightAddon from '../Layout/RightAddon';
import Button from '../Button';
import Dropdown from '../Dropdown';

// Import glyphs
import Ellipsis from '../../glyphs/Ellipsis';
import Times from '../../glyphs/Times';
import Chevron from '../../glyphs/Chevron';
import Checkbox from '../../glyphs/Checkbox';
import Check from '../../glyphs/Check';
import Download from '../../glyphs/Download';

// Import helper functions
import autoMatch from './autoMatch';
import getNumCols from './getNumCols';
// Import script for stringifying csv for download
import csvToString from './csvToString';

class CSV extends Component {
  constructor(props) {
    super(props);

    // Pre-process CSV to determine which columns can be matched (use validator)
    const {
      headersToMatch,
      csv,
    } = this.props;

    // Skip processing if we have no work to do
    const noCSV = (
      !csv
      || !csv.data
      || csv.data.length === 0
    );
    if (!headersToMatch || noCSV) {
      this.state = {
        noCSV,
      };
      return;
    }

    // Perform auto-matching
    const {
      allowedHeaders,
      columnMapping,
    } = autoMatch(csv, headersToMatch);
    this.allowedHeaders = allowedHeaders;

    // Save headerKey map for easier lookup
    this.headerKeyToHeader = {};
    headersToMatch.forEach((header) => {
      this.headerKeyToHeader[header.key] = header;
    });

    // Save boolean (auto matching occurred)
    this.autoMatchingOccurred = Object.keys(columnMapping).length > 0;

    // Save state
    this.state = {
      columnMapping,
    };

    // Bind functions
    this.matchSelected = this.matchSelected.bind(this);
    this.onDoneMatchingClicked = this.onDoneMatchingClicked.bind(this);
    this.unmatch = this.unmatch.bind(this);
  }

  onDoneMatchingClicked() {
    // Deconstruct props
    const {
      csv,
      onFinished,
    } = this.props;

    // Skip if no listener
    if (!onFinished) {
      return;
    }

    // Deconstruct state
    const { columnMapping } = this.state;

    // Post-process csv
    const headerKeyToColumnIndex = {};
    Object.keys(columnMapping).forEach((cIndex) => {
      headerKeyToColumnIndex[columnMapping[cIndex]] = cIndex;
    });
    const matchedHeaderKeys = Object.values(columnMapping);
    // Process each row, turning it into an object (with headerKeys as props)
    const rowObjects = csv.data.map((datum) => {
      const rowObject = {};
      matchedHeaderKeys.forEach((headerKey) => {
        const cIndex = headerKeyToColumnIndex[headerKey];
        const datumKey = (
          csv.headers
            ? csv.headers[cIndex]
            : cIndex
        );
        rowObject[headerKey] = datum[datumKey];
      });
      return rowObject;
    });
    const newCSV = {
      headers: matchedHeaderKeys,
      data: rowObjects,
    };

    onFinished(newCSV);
  }

  unmatch(cIndex) {
    // Get previous column mapping
    const { columnMapping } = this.state;

    // Update column mapping
    delete columnMapping[cIndex];

    // Save state
    this.setState({
      columnMapping,
    });
  }

  matchSelected(cIndex, headerKey) {
    // Get previous column mapping
    const { columnMapping } = this.state;

    // Unmatch other column that are matched with this headerKey (if applicable)
    const cIndices = Object.keys(columnMapping);
    for (let i = 0; i < cIndices.length; i++) {
      if (columnMapping[cIndices[i]] === headerKey) {
        // Unmatch this column
        delete columnMapping[cIndices[i]];
        break;
      }
    }

    // Save new mapping
    columnMapping[cIndex] = headerKey;
    this.setState({
      columnMapping,
      changesMade: true,
    });
  }

  render() {
    // Detect "no csv" error
    const { noCSV } = this.state;
    if (noCSV) {
      // No data
      return (
        <Alert
          color="warning"
        >
          <h3>This CSV file is empty</h3>
          Unfortunately, we can&apos;t load this CSV file because it was empty.
        </Alert>
      );
    }

    // Deconstruct properties
    const {
      csv,
      noHeader,
      numRowsToPreview,
      onReupload,
      headersToMatch,
      downloadFilename,
    } = this.props;

    // Get current header mapping
    const {
      columnMapping,
      impossible,
      changesMade,
    } = this.state;

    // Display error if matching is impossible
    if (impossible) {
      const requiredColumns = headersToMatch.map((header) => {
        return (
          <li key={genUUID()}>
            <strong>{header.title}</strong>
            {header.description && (
              <span>
                &nbsp;–&nbsp;
                <em>{header.description}</em>
              </span>
            )}
          </li>
        );
      });
      return (
        <Alert
          color="danger"
          className="text-center"
        >
          <h3>
            This file doesn&apos;t match our requirements
          </h3>
          You need a column for each of the following types of info:
          <div>
            <div className="text-left d-inline-block">
              <ul>
                {requiredColumns}
              </ul>
            </div>
          </div>
          <Button
            text={(
              <span>
                <Chevron direction="left" className="mr-2" />
                Back
              </span>
            )}
            onClick={onReupload}
            color="secondary"
            size="lg"
          />
        </Alert>
      );
    }

    // Determine the number of columns in the csv
    const numCols = getNumCols(csv);

    // Check if CSV has too few cols
    if (numCols === 0) {
      // No data
      return (
        <Alert
          color="warning"
        >
          <h2>This CSV file is empty (no columns).</h2>
        </Alert>
      );
    }

    // Create table header
    let tableHeaderContent = [];

    // > Add header matching selectors
    if (headersToMatch) {
      // Loop through each csv column and create a selector cell
      const selectors = [];
      for (let i = 0; i < numCols; i++) {
        const currentHeaderKey = columnMapping[i];
        const currentHeader = (
          currentHeaderKey
            ? this.headerKeyToHeader[currentHeaderKey]
            : null
        );
        // Create dropdown items
        const items = (
          this.allowedHeaders[i].map((header) => {
            // Skip current header
            if (header === currentHeader) {
              return null;
            }
            return {
              text: header.title,
              onClick: () => {
                this.matchSelected(i, header.key);
              },
            };
          }).filter((x) => { return x; })
        );
        if (currentHeader) {
          // Add "ignore" optiona
          items.splice(0, 0, {
            text: (
              <span>
                <Times className="mr-2" />
                Ignore this Column
              </span>
            ),
            onClick: () => {
              this.unmatch(i);
            },
          });
        }

        selectors.push((
          <th
            key={genUUID()}
          >
            <Dropdown
              title={(
                currentHeader
                  ? currentHeader.title
                  : 'Ignored'
              )}
              items={items}
              color={(
                currentHeader
                  ? 'info'
                  : 'secondary'
              )}
              block
            />
          </th>
        ));
      }
      // Add selectors as another row
      tableHeaderContent.push((
        <tr
          key={genUUID()}
        >
          {selectors}
        </tr>
      ));
    }

    // > Add csv headers
    if (!noHeader && csv.headers) {
      const headerElements = csv.headers.map((title) => {
        return (
          <th
            key={title}
          >
            {title}
          </th>
        );
      });
      tableHeaderContent.push((
        <tr
          key={genUUID()}
        >
          {headerElements}
        </tr>
      ));
    }

    // Create table rows
    let tableRowContent = [];
    for (let i = 0; i < (numRowsToPreview || csv.data.length); i++) {
      // Create cells
      let cells;
      if (csv.headers) {
        // Assume data is in object format
        cells = csv.headers.map((header) => {
          return (
            <td
              key={genUUID()}
            >
              {csv.data[i][header]}
            </td>
          );
        });
      } else {
        // Assume data is in array format
        cells = csv.data[i].map((cellText) => {
          return (
            <td
              key={genUUID()}
            >
              {cellText}
            </td>
          );
        });
      }

      tableRowContent.push((
        <tr
          key={genUUID()}
        >
          {cells}
        </tr>
      ));
    }

    // Add ellipses if preview cut off some rows
    if (numRowsToPreview && numRowsToPreview < csv.data.length) {
      const cells = [];
      for (let i = 0; i < numCols; i++) {
        cells.push((
          <td
            key={genUUID()}
            className="text-center"
          >
            <Ellipsis vertical />
          </td>
        ));
      }
      tableRowContent.push((
        <tr
          key={genUUID()}
        >
          {cells}
        </tr>
      ));
    }

    // Wrap header and row content objects
    tableRowContent = (
      tableRowContent.length > 0
        ? (
          <tbody>
            {tableRowContent}
          </tbody>
        )
        : null
    );
    tableHeaderContent = (
      tableHeaderContent.length > 0
        ? (
          <thead className="text-nowrap">
            {tableHeaderContent}
          </thead>
        )
        : null
    );

    // If performing header matching, create match message
    let matchMessage;
    if (headersToMatch) {
      // Create checklist
      const requiredElements = [];
      const optionalElements = [];
      let requirementsMet = true;
      let optionalColumnsMet = true;
      headersToMatch
        .forEach((header) => {
          const isMatched = (
            Object.values(columnMapping).indexOf(header.key) >= 0
          );
          const element = (
            <LeftAddon
              key={genUUID()}
            >
              <Checkbox
                checked={isMatched}
                className="mr-2"
              />
              <div
                className={(
                  isMatched
                    ? 'text-success'
                    : 'text-danger'
                )}
              >
                {header.title}
                {header.description && (
                  <span>
                    &nbsp;–&nbsp;
                    <em>{header.description}</em>
                  </span>
                )}
              </div>
            </LeftAddon>
          );
          if (header.required) {
            requiredElements.push(element);
            if (!isMatched) {
              requirementsMet = false;
            }
          } else {
            optionalElements.push(element);
            if (!isMatched) {
              optionalColumnsMet = false;
            }
          }
        });

      // Create back button
      const backButton = (
        <Button
          text={(
            <span>
              <Chevron
                direction="left"
                className="mr-2"
              />
              Choose New File
            </span>
          )}
          color="secondary"
          size="lg"
          className="mt-2 mr-2"
          onClick={onReupload}
        />
      );

      // Display "please verify" if all columns are matched and auto-matching
      // occurred (an user hasn't made changes)
      if (
        requirementsMet
        && optionalColumnsMet
        && !changesMade
        && this.autoMatchingOccurred
      ) {
        const dropdownMessage = 'We auto-detected the columns of your CSV file. Verify that each dropdown matches the type of info in the column below it.';
        matchMessage = (
          <Alert
            color="warning"
            className="text-center pb-2"
          >
            <h4>
              Verify Our Matchings
            </h4>
            <div>
              {dropdownMessage}
            </div>
            {backButton}
            <Button
              text={(
                <span>
                  <Check
                    className="mr-2"
                  />
                  Looks Good
                </span>
              )}
              color="success"
              size="lg"
              className="mt-2"
              onClick={this.onDoneMatchingClicked}
            />
          </Alert>
        );
      } else {
        // Divide elements into required and optional
        const requiredChecklist = (
          requiredElements.length > 0
            ? (
              <div>
                <div className="text-dark">
                  <strong>Required columns:</strong>
                </div>
                {requiredElements}
              </div>
            )
            : null
        );
        const optionalChecklist = (
          optionalElements.length > 0
            ? (
              <div>
                <div className="text-dark">
                  <strong>Optional columns:</strong>
                </div>
                {optionalElements}
              </div>
            )
            : null
        );

        // Create done button
        const doneButton = (
          <Button
            text={(
              <span>
                <Check
                  className="mr-2"
                />
                Done Matching
              </span>
            )}
            color="success"
            size="lg"
            className="mt-2"
            onClick={this.onDoneMatchingClicked}
            disabled={!requirementsMet}
          />
        );
        matchMessage = (
          <Alert
            color="warning"
            className="text-center pb-2"
          >
            <h4>
              Match Columns
            </h4>
            Use the dropdowns to tell us where the following columns are:
            {(this.autoMatchingOccurred && !changesMade) && (
              <div>
                (we tried to
                <em> auto-match </em>
                some of the columns for you)
              </div>
            )}
            <Alert
              color="light"
              className="mb-0 text-left"
            >
              {requiredChecklist}
              {optionalChecklist}
            </Alert>
            {backButton}
            {doneButton}
          </Alert>
        );
      }
    }

    // Create the csv preview
    const csvPreview = (
      <div
        style={{
          overflowX: 'scroll',
          backgroundColor: 'white',
        }}
      >
        <Table
          striped
          bordered
          className="mb-0"
        >
          {tableHeaderContent}
          {tableRowContent}
        </Table>
      </div>
    );

    // Download button
    let downloadButton;
    if (downloadFilename) {
      const filename = (
        downloadFilename.endsWith('.csv')
          ? downloadFilename
          : `${downloadFilename}.csv`
      );
      const fileContents = csvToString(csv);
      const downloadMessage = (
        <RightAddon centerVertically>
          <h3 className="mb-0">{filename}</h3>
          <DownloadLink
            filename={filename}
            exportFile={() => { return fileContents; }}
            label={(
              <span>
                <Download className="mr-2" />
                Download
              </span>
            )}
            tagName="div"
            className="btn btn-lg btn-dark text-white"
            style={{
              textDecoration: 'none !important',
            }}
          />
        </RightAddon>
      );
      if (matchMessage) {
        // Performing matching. Add an unobtrusive download button
        downloadButton = (
          <Alert
            color="dark"
            className="mb-0"
          >
            {downloadMessage}
          </Alert>
        );
      } else {
        // Not performing matching. Show the preview inside the download alert
        return (
          <Alert
            color="dark"
            className="mb-0"
          >
            {downloadMessage}
            <div className="mt-2">
              {csvPreview}
            </div>
          </Alert>
        );
      }
    }

    return (
      <div>
        {downloadButton}
        {matchMessage}
        {csvPreview}
      </div>
    );
  }
}

CSV.propTypes = {
  /* The CSV to show. Note: csv.headers and csv.data have different forms,
   * depending upon the value of noHeader */
  csv: PropTypes.shape({
    headers: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  /* Headers to match (matching is performed if headers are included) */
  headersToMatch: PropTypes.arrayOf(
    PropTypes.shape({
      /* A json object key so we can create json objects out of each row */
      key: PropTypes.string,
      /* A human-readable title of what the column must contain */
      title: PropTypes.string,
      /* A human-readable description of what the column must contain */
      description: PropTypes.string,
      /* If true, this header must be matched to continue */
      required: PropTypes.bool,
      /* A function that returns true if a cell in the column is valid, or a
       * string matching our built-in validators (see top of compomnent) */
      validator: PropTypes.func,
      /* A list of guesses for the csv column header. If one of these matches
       * (and the column is valid), this will be automatically matched */
      titleGuesses: PropTypes.arrayOf(PropTypes.string),
      /* If true, cells in this column may be empty */
      allowEmpty: PropTypes.bool,
    })
  ),
  /* If true, the csv is not expected to have any header (and csv.data is
   * expected to be an array of row arrays)
   * example:
   * - csv.headers: null
   * - csv.data: [['Gabe', 'gabe@example.com'], ...]
   * otherwise, csv.headers is read as the list of keys to use in extracting
   * cell data from csv.data
   * example:
   * - csv.headers = ['Full Name', 'email']
   * - csv.data = [{'Full Name': 'Gabe', email: 'gabe@example.com'}, ...])
   */
  noHeader: PropTypes.bool,
  /* The number of rows to show in the csv preview (null to show all) */
  numRowsToPreview: PropTypes.number,
  /* A handler to call when the "choose new file" button is clicked */
  onReupload: PropTypes.func,
  /* A handler to call when matching is finished */
  onFinished: PropTypes.func,
  /* If defined, a download button is shown and the downloaded file has this
   * name */
  downloadFilename: PropTypes.string,
};

CSV.defaultProps = {
  headersToMatch: null,
  noHeader: false,
  numRowsToPreview: null,
  onReupload: null,
  onFinished: null,
  downloadFilename: null,
};

export default CSV;
