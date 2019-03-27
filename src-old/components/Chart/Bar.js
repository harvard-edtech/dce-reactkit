import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import rechart components
import {
  ResponsiveContainer,
  BarChart as BarChartRechart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Import other components
import Holder from './Holder';

// Import default colors
import colors from './colors';

// Import helpers
import csvToString from '../../common/csvToString';

class BarChart extends Component {
  render() {
    // Deconstruct props
    const {
      title,
      color,
      width,
      height,
      nameLabel,
      nameUnit,
      valueLabel,
      valueUnit,
      data,
      horizontal,
      noTooltipOnHover,
      noDownload,
      showLegend,
    } = this.props;

    let { csvContents } = this.props;
    if (!noDownload && !csvContents) {
      const nameField = `${nameLabel}${nameUnit ? ' (' + nameUnit + ')' : ''}`;
      const valueField = `${valueLabel}${valueUnit ? ' (' + valueUnit + ')' : ''}`;
      const csv = {
        fields: [nameField, valueField],
        data: data.map((datum) => {
          return [datum.name, datum.value];
        }),
      };
      csvContents = csvToString(csv);
    }

    return (
      <Holder
        title={title}
        width={width}
        height={height}
        xLabel={horizontal ? valueLabel : nameLabel}
        xUnit={horizontal ? valueUnit : nameUnit}
        yLabel={horizontal ? nameLabel : valueLabel}
        yUnit={horizontal ? nameUnit : valueUnit}
        csvContents={csvContents}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChartRechart
            data={data.map((datum) => {
              return {
                name: datum.name,
                [valueLabel]: datum.value,
              };
            })}
            layout={horizontal ? 'vertical' : 'horizontal'}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type={horizontal ? 'number' : 'category'}
              dataKey={horizontal ? null : 'name'}
            />
            <YAxis
              type={horizontal ? 'category' : 'number'}
              dataKey={horizontal ? 'name' : null}
            />
            {!noTooltipOnHover && (
              <Tooltip />
            )}
            {showLegend && (
              <Legend />
            )}
            <Bar dataKey={valueLabel} fill={color} />
          </BarChartRechart>
        </ResponsiveContainer>
      </Holder>
    );
  }
}

BarChart.propTypes = {
  // Title of the chart
  title: PropTypes.string,
  // Default CSS color (#123456 or 'white') for bars (can be overridden)
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
  // Label for the name axis
  nameLabel: PropTypes.string,
  // Unit for the name axis
  nameUnit: PropTypes.string,
  // Label for the value axis
  valueLabel: PropTypes.string,
  // Unit for the value axis
  valueUnit: PropTypes.string,
  // The data/bars
  data: PropTypes.arrayOf(
    PropTypes.shape({
      // Name of the bar
      name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      // Value of the slice (size)
      value: PropTypes.number.isRequired,
      // Color of the slice (overrides props.color)
      color: PropTypes.string,
    })
  ).isRequired,
  // If true, bar chart is a horizontal bar chart
  horizontal: PropTypes.bool,
  // If true, no tooltip is shown on hover
  noTooltipOnHover: PropTypes.bool,
  // If true, legend is included
  showLegend: PropTypes.bool,
  // If true, no download button is shown
  noDownload: PropTypes.bool,
  // The contents of the csv file to download (auto-generated if not included)
  csvContents: PropTypes.string,
};

BarChart.defaultProps = {
  title: null,
  color: colors.defaultBlue,
  width: '100%',
  height: '500px',
  nameLabel: 'Name',
  nameUnit: null,
  valueLabel: 'Value',
  valueUnit: null,
  horizontal: false,
  noTooltipOnHover: false,
  showLegend: false,
  noDownload: false,
  csvContents: null,
};

export default BarChart;
