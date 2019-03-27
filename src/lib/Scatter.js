import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import rechart components
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter as ScatterLib,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Import helpers
import csvToString from './common/csvToString';

// Import other components
import Holder from './common/chart/Holder';

// Import default colors
import colors from './common/chart/colors';

/* Scatter Chart Component */
class Scatter extends Component {
  render() {
    // Deconstruct props (see propTypes below for detailed information)
    const {
      title,
      color,
      width,
      height,
      xLabel,
      xUnit,
      yLabel,
      yUnit,
      data,
      noTooltipOnHover,
      noDownload,
      showLegend,
      seriesName,
    } = this.props;

    // Generate csv contents if we have a download button
    let csvContents;
    if (!noDownload) {
      // Create x and y column labels dynamically
      const xField = `${xLabel}${xUnit ? ' (' + xUnit + ')' : ''}`;
      const yField = `${yLabel}${yUnit ? ' (' + yUnit + ')' : ''}`;
      // Create the csv content object
      const csv = {
        fields: [xField, yField],
        data: data.map((datum) => {
          return [datum.x, datum.y];
        }),
      };
      // Create the csv string
      csvContents = csvToString(csv);
    }

    // Render the component
    return (
      <Holder
        title={title}
        xLabel={xLabel}
        xUnit={xUnit}
        yLabel={yLabel}
        yUnit={yUnit}
        width={width}
        height={height}
        csvContents={csvContents}
      >
        {/* a responsive container that fills the whole holder */}
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          {/* render the scatter chart from recharts */}
          <ScatterChart>
            {/* add the cartesian grid */}
            <CartesianGrid />
            {/* Add the axes */}
            <YAxis
              dataKey="y"
              type="number"
              name={yLabel}
            />
            <XAxis
              dataKey="x"
              type="number"
              name={xLabel}
            />
            {/* add the tooltip component if it's included */}
            {!noTooltipOnHover && (
              <Tooltip
                cursor={{
                  strokeDasharray: '3 3',
                }}
              />
            )}
            {/* add the legend component if it's included */}
            {showLegend && (
              <Legend />
            )}
            {/* add the scatter itself */}
            <ScatterLib
              name={seriesName}
              data={data}
              fill={color}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </Holder>
    );
  }
}

Scatter.propTypes = {
  // Title of the chart
  title: PropTypes.string,
  // CSS color (#123456 or 'white') for the points
  color: PropTypes.string,
  // Width ('100%' or 50)
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // Height ('100%' or 50)
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // Label for the x axis
  xLabel: PropTypes.string,
  // Unit for the x axis
  xUnit: PropTypes.string,
  // Label for the y axis
  yLabel: PropTypes.string,
  // Unit for the y axis
  yUnit: PropTypes.string,
  // Array of data objects
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    })
  ).isRequired,
  // If true, no tooltip is shown when hovering over a point
  noTooltipOnHover: PropTypes.bool,
  // If true, no download button is shown
  noDownload: PropTypes.bool,
  // Name of the series (included and required for legend)
  seriesName: PropTypes.string,
  // If true, legend is included
  showLegend: PropTypes.bool,
};

Scatter.defaultProps = {
  // Chart has no title by default
  title: null,
  // Scatter dots are neutral blue by default
  color: colors.defaultBlue,
  // Chart takes up full width of parent by default
  width: '100%',
  // Chart's height is 500px by default
  height: '500px',
  // Label for x axis is 'x-axis' by default
  xLabel: 'x-axis',
  // X axis has no unit by default
  xUnit: null,
  // Label for y axis is 'y-axis' by default
  yLabel: 'y-axis',
  // Y axis has no unit by default
  yUnit: null,
  // Scatter series is 'Chart' by default (for the legend)
  seriesName: 'Chart',
  // Tooltips are displayed by default
  noTooltipOnHover: false,
  // Download button is added by default
  noDownload: false,
  // No legend is included by default
  showLegend: false,
};

export default Scatter;
