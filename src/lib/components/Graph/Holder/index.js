import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import custom styles
import './style.css';

class Holder extends Component {
  render() {
    // Deconstruct props
    const {
      title,
      xLabel,
      xUnit,
      yLabel,
      yUnit,
      width,
      height,
      children,
    } = this.props;

    // Calculate dimensions
    const chartHeight = (
      `calc(${height}${title ? ' - 2.5em' : ''}${xLabel ? ' - 1.5em' : ''})`
    );
    const chartWidth = `calc(${width}${yLabel ? ' - 1.5em' : ''})`;

    const titleContent = (
      title
        ? (
          <div
            style={{
              height: '2.5em',
            }}
          >
            <h4 className="text-center">
              {title}
            </h4>
          </div>
        )
        : null
    );

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

    return (
      <div className="mb-2">
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
};

Holder.defaultProps = {
  title: null,
  xLabel: null,
  xUnit: null,
  yLabel: null,
  yUnit: null,
  width: '100%',
  height: '500px',
};

export default Holder;
