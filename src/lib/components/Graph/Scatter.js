import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import rechart components
import {
  ResponsiveContainer,
  ScatterChart as ScatterChartLib,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import Holder from './Holder';

import colors from './colors';

class ScatterChart extends Component {
  render() {
    // Deconstruct props
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
      showLegend,
      seriesName,
    } = this.props;

    return (
      <Holder
        title={title}
        xLabel={xLabel}
        xUnit={xUnit}
        yLabel={yLabel}
        yUnit={yUnit}
        width={width}
        height={height}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <ScatterChartLib>
            <CartesianGrid />
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
            {!noTooltipOnHover && (
              <Tooltip
                cursor={{
                  strokeDasharray: '3 3',
                }}
              />
            )}
            {showLegend && (
              <Legend />
            )}
            <Scatter
              name={seriesName}
              data={data}
              fill={color}
            />
          </ScatterChartLib>
        </ResponsiveContainer>
      </Holder>
    );
  }
}

ScatterChart.propTypes = {
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
  // Name of the series (included and required for legend)
  seriesName: PropTypes.string,
  // If true, legend is included
  showLegend: PropTypes.bool,
};

ScatterChart.defaultProps = {
  title: null,
  color: colors.defaultBlue,
  width: '100%',
  height: '500px',
  xLabel: 'x-axis',
  xUnit: null,
  yLabel: 'y-axis',
  yUnit: null,
  seriesName: 'Chart',
  noTooltipOnHover: false,
  showLegend: false,
};

export default ScatterChart;
