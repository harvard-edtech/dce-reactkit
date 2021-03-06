import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import DownloadButton from '../../../DownloadButton';

// Import custom styles
import './style.css';

/* Holder Component */
class Holder extends Component {
  render() {
    // Deconstruct props (see propTypes below for detailed information)
    const {
      title,
      xLabel,
      xUnit,
      yLabel,
      yUnit,
      width,
      height,
      csvContents,
      children,
    } = this.props;

    // Calculate dimensions of the holder
    // > Chart height depends on if the title is included
    const chartHeight = (
      `calc(${height}${title ? ' - 2.5em' : ''}${xLabel ? ' - 1.5em' : ''})`
    );
    // > Chart width depends on if there is a y axis label
    const chartWidth = `calc(${width}${yLabel ? ' - 1.5em' : ''})`;

    // The many parts of this component look like this:
    // |""""""""""""""""""""""""""""""""""""""""""|
    // |           Chart title [Download]         | <- title content
    // """"""""""""""""""""""""""""""""""""""""""""
    // |"""""|""""""""""""""""""""""""""""""""""""|
    // |  Y  |                                    |
    // |  L  |                                    |
    // |  A  |                                    |
    // |  B  |             Chart Here             | <- top content
    // |  E  |                                    |
    // |  L  |                                    |
    // |     |                                    |
    // """"""""""""""""""""""""""""""""""""""""""""
    // |""""""""""""""""""""""""""""""""""""""""""|
    // |                  X LABEL                 | <- bottom content
    // """"""""""""""""""""""""""""""""""""""""""""

    // Create the title content (if there's a tite)
    const titleContent = (
      title
        ? (
          <div
            style={{
              height: '2.5em',
            }}
          >
            {/* Add the title and the download button */}
            <h4 className="text-center">
              {title}
              {csvContents && (
                <DownloadButton
                  text="CSV"
                  filename={`${title}.csv`}
                  contents={csvContents}
                  marginLeft="5px"
                />
              )}
            </h4>
          </div>
        )
        : null
    );

    // Create the top content
    // (includes the y-axis label and the chart, side by side)
    const topContent = (
      <div>
        {yLabel && (
          <div
            className="y-label-container"
            style={{
              height: chartHeight,
            }}
          >
            <div
              style={{
                width: chartHeight,
              }}
              className="y-label-text label-text"
            >
              {yLabel}
              {yUnit && (
                <span className="unit">
                  (
                  {yUnit}
                  )
                </span>
              )}
            </div>
          </div>
        )}
        <div
          className="d-inline-block"
          style={{
            width: chartWidth,
            height: chartHeight,
          }}
        >
          {children}
        </div>
      </div>
    );

    // Create the bottom if there's an x label
    // (includes the x label below the chart)
    const bottomContent = (
      xLabel
        ? (
          <div className="x-label-text label-text">
            {xLabel}
            {xUnit && (
              <span className="unit">
                (
                {xUnit}
                )
              </span>
            )}
          </div>
        )
        : null
    );

    // Put all the pieces together into one component
    return (
      <div className="mb-4">
        <div
          className="outer-container"
          style={{
            width,
            height,
          }}
        >
          {titleContent}
          {topContent}
          {bottomContent}
        </div>
      </div>
    );
  }
}

Holder.propTypes = {
  // Title of the chart
  title: PropTypes.string,
  // Label of the x axis
  xLabel: PropTypes.string,
  // Units on the x axis
  xUnit: PropTypes.string,
  // Label of the y axis
  yLabel: PropTypes.string,
  // Units on the y axis
  yUnit: PropTypes.string,
  // Width of the chart (does not include the title)
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // Height of the chart (does not include the title)
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // The chart object (should be set to fill 100% width an height)
  children: PropTypes.node.isRequired,
  // File contents to download
  csvContents: PropTypes.string,
};

Holder.defaultProps = {
  title: null,
  xLabel: null,
  xUnit: null,
  yLabel: null,
  yUnit: null,
  width: '100%',
  height: '500px',
  csvContents: null,
};

export default Holder;
