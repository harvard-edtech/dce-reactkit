import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSVParser from 'papaparse';
import genUUID from 'uuid/v1';

// Import bootstrap components
import { Label, Input } from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

// Import other components
import CSVPreview from '../../CSV';
import Alert from '../../Alert';
import Button from '../../Button';
import LoadSplash from '../../Splash/Load';
import ErrorSplash from '../../Splash/Error';
import Question from '.';

// Import glyphs
import File from '../../../glyphs/File';
import Chevron from '../../../glyphs/Chevron';
import Check from '../../../glyphs/Check';

const STAGE = {
  CHOOSING_FILE: 1,
  PROCESSING_FILE: 2,
  MATCHING_COLUMNS: 3,
  PREVIEW: 4,
  ERROR: 6,
};

/**
 * onAnswered is called with the following:
 * {
 *   header: list of header column names
 *   data: row object { header: column cell value }
 * }
 */

class CSV extends Component {
  constructor(props) {
    super(props);

    this.id = genUUID();

    // Initialize state
    this.state = {
      stage: STAGE.CHOOSING_FILE,
      csv: [],
    };

    // Bind functions
    this.endChoosingFileStage = this.endChoosingFileStage.bind(this);
  }

  endChoosingFileStage(file) {
    // Deconstruct props
    const {
      noHeader,
      noPreview,
      onAnswered,
      headersToMatch, // [{ key, title, description, required, validator }]
    } = this.props;

    // Determine the next stage
    let nextStage;
    if (headersToMatch) {
      nextStage = STAGE.MATCHING_COLUMNS;
    } else {
      nextStage = STAGE.PREVIEW;
    }

    // Set state
    this.setState({
      stage: STAGE.PROCESSING_FILE,
    });

    // Advance to next stage
    CSVParser.parse(file, {
      header: !noHeader,
      complete: (results) => {
        // CSV processed successfully

        // Deconstruct results from csv parser
        const {
          data,
          errors,
          meta,
        } = results;

        // Check for errors
        let csv;
        if (errors && errors.length > 0) {
          // An error occurred
          nextStage = STAGE.ERROR;
        } else {
          // Build csv file
          csv = {
            data,
            headers: meta.fields,
          };
        }

        // If next stage is preview but noPreview is true, just finish
        if (nextStage === STAGE.PREVIEW && noPreview) {
          // Just finish now
          onAnswered(csv);
          return;
        }

        // Save results and move on to next stage
        this.setState({
          csv,
          stage: nextStage,
        });
      },
    });
  }

  render() {
    // Deconstruct props
    const {
      title,
      subtitle,
      uploadButtonTitle,
      noHeader,
      headersToMatch,
      onAnswered,
    } = this.props;

    // Deconstruct state
    const {
      stage,
      csv,
    } = this.state;

    let body;

    // Error
    if (stage === STAGE.ERROR) {
      body = (
        <ErrorSplash
          title="Invalid CSV"
          body="The CSV you chose could not be processed. Please check your CSV file and try again."
          buttons={[{
            text: 'Try Again',
            onClick: () => {
              this.setState({
                stage: STAGE.CHOOSING_FILE,
              });
            },
          }]}
        />
      );
    }

    // File chooser
    if (stage === STAGE.CHOOSING_FILE) {
      body = (
        <div className="text-center">
          <Label className="btn btn-info btn-lg" for={this.id}>
            <File
              type="csv"
              className="mr-2"
            />
            {uploadButtonTitle}
            <Input
              type="file"
              accept=".csv"
              id={this.id}
              className="d-none"
              onChange={(e) => {
                this.endChoosingFileStage(e.target.files[0]);
              }}
            />
          </Label>
        </div>
      );
    }

    // Processing file
    if (stage === STAGE.PROCESSING_FILE) {
      body = (
        <LoadSplash
          message="Processing CSV"
        />
      );
    }

    // Preview
    if (stage === STAGE.PREVIEW) {
      body = (
        <div>
          <Alert
            color="info"
            className="text-center"
          >
            <h3>
              CSV Preview
            </h3>
            Please double check the preview below before continuing.
            <div
              className="mt-2"
            >
              <Button
                text={(
                  <span>
                    <Chevron direction="left" className="mr-2" />
                    Choose New File
                  </span>
                )}
                onClick={() => {
                  this.setState({
                    stage: STAGE.CHOOSING_FILE,
                  });
                }}
                className="mr-2"
                color="secondary"
                size="lg"
              />
              <Button
                color="success"
                size="lg"
                onClick={() => {
                  onAnswered(csv);
                }}
              >
                <Check
                  className="mr-2"
                />
                Looks Good
              </Button>
            </div>
          </Alert>
          <CSVPreview
            noHeader={noHeader}
            csv={csv}
            numRowsToPreview={4}
            onReupload={() => {
              this.setState({
                stage: STAGE.CHOOSING_FILE,
              });
            }}
          />
        </div>
      );
    }

    // Matching
    if (stage === STAGE.MATCHING_COLUMNS) {
      body = (
        <CSVPreview
          noHeader={noHeader}
          csv={csv}
          numRowsToPreview={4}
          headersToMatch={headersToMatch}
          onReupload={() => {
            this.setState({
              stage: STAGE.CHOOSING_FILE,
            });
          }}
          onFinished={(newCSV) => {
            onAnswered(newCSV);
          }}
        />
      );
    }

    // Render the question with its appropriate body
    return (
      <Question
        title={title}
        subtitle={subtitle}
      >
        {body}
      </Question>
    );
  }
}

CSV.propTypes = {
  /* The title of the question */
  title: PropTypes.string,
  /* The subtitle of the question */
  subtitle: PropTypes.string,
  /* The title of the "upload file" button */
  uploadButtonTitle: PropTypes.string,
  /* If true, we don't use the first row of the csv as a header row  */
  noHeader: PropTypes.bool,
  /* If true and no matching is occurring, no preview will be shown */
  noPreview: PropTypes.bool,
  /* A function to call when the csv is properly uploaded and processed */
  onAnswered: PropTypes.func.isRequired,
  /* For full description of headersToMatch, see /autoMatch.js */
  headersToMatch: PropTypes.arrayOf(PropTypes.object),
};

CSV.defaultProps = {
  title: 'Upload CSV',
  subtitle: null,
  uploadButtonTitle: 'Choose File',
  noHeader: false,
  noPreview: false,
  headersToMatch: null,
};

export default CSV;
