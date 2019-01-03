import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import bootstrap components
import { ListGroup, ListGroupItem } from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

// Import other components
import Well from '../Well';
import TwoCol from '../Layout/TwoCol';
import Radio from '../Radio';

// Helpers
import calcAverage from './helpers/calcAverage';
import calcExtremes from './helpers/calcExtremes';
import calcMedian from './helpers/calcMedian';
import calcStdDev from './helpers/calcStdDev';

class General extends Component {
  constructor(props) {
    super(props);

    // Deconstruct props
    const { data } = this.props;

    // Show error if no data
    if (!data || data.length === 0) {
      this.state = {
        error: 'We can\'t calculate these stats because we have no data.',
      };
      return;
    }

    // Calculate stats with and without zeros
    const dataWithoutZeros = data.filter((x) => {
      return x !== 0;
    });
    const showToggle = dataWithoutZeros.length !== data.length;

    const [
      statsWithZeros,
      statsWithoutZeros,
    ] = [data, dataWithoutZeros].map((currentData) => {
      const {
        low,
        high,
      } = calcExtremes(currentData);
      const average = calcAverage(currentData);
      const stdDev = calcStdDev(currentData);
      const median = calcMedian(currentData);

      return {
        low,
        high,
        average,
        stdDev,
        median,
      };
    });

    this.state = {
      statsWithZeros,
      statsWithoutZeros,
      showToggle,
      displayingStatsWithZeros: true,
    };
  }

  render() {
    // Deconstruct props
    const {
      title,
      numDecimals,
    } = this.props;

    // Deconstruct state
    const {
      error,
      showToggle,
      statsWithZeros,
      statsWithoutZeros,
      displayingStatsWithZeros,
    } = this.state;

    // Display error
    if (error) {
      return (
        <Well>
          {title && (
            <h3>{title}</h3>
          )}
          <div>
            {error}
          </div>
        </Well>
      );
    }

    // Create toggle switch
    let toggle;
    if (showToggle) {
      toggle = (
        <div>
          <Radio
            items={[
              'Include Zeros',
              'Exclude Zeros',
            ]}
            initialSelectedIndex={0}
            color="info"
            onChange={(option, index) => {
              this.setState({
                displayingStatsWithZeros: (index === 0),
              });
            }}
          />
        </div>
      );
    }

    // Get current stats
    const {
      low,
      high,
      average,
      median,
      stdDev,
    } = (
      displayingStatsWithZeros
        ? statsWithZeros
        : statsWithoutZeros
    );

    return (
      <Well>
        {title && (
          <h3 className="text-center">
            {title}
          </h3>
        )}
        {toggle}
        <ListGroup>
          <ListGroupItem>
            <TwoCol
              col1Align="right"
              col2Align="left"
            >
              <div>
                <strong>Average:</strong>
              </div>
              <div>
                {average.toFixed(numDecimals)}
              </div>
            </TwoCol>
          </ListGroupItem>
          <ListGroupItem>
            <TwoCol
              col1Align="right"
              col2Align="left"
            >
              <div>
                <strong>Median:</strong>
              </div>
              <div>
                {median.toFixed(numDecimals)}
              </div>
            </TwoCol>
          </ListGroupItem>
          <ListGroupItem>
            <TwoCol
              col1Align="right"
              col2Align="left"
            >
              <div>
                <strong>Standard Dev:</strong>
              </div>
              <div>
                {stdDev.toFixed(numDecimals)}
              </div>
            </TwoCol>
          </ListGroupItem>
          <ListGroupItem>
            <TwoCol
              col1Align="right"
              col2Align="left"
            >
              <div>
                <strong>High:</strong>
              </div>
              <div>
                {high.toFixed(numDecimals)}
              </div>
            </TwoCol>
          </ListGroupItem>
          <ListGroupItem>
            <TwoCol
              col1Align="right"
              col2Align="left"
            >
              <div>
                <strong>
                  Low:
                </strong>
              </div>
              <div>
                {low.toFixed(numDecimals)}
              </div>
            </TwoCol>
          </ListGroupItem>
        </ListGroup>
      </Well>
    );
  }
}

General.propTypes = {
  // Title of the chart
  title: PropTypes.string,
  // The data
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  // The number of decimals
  numDecimals: PropTypes.number,
};

General.defaultProps = {
  title: null,
  numDecimals: 2,
};

export default General;
