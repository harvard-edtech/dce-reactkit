import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import rechart components
import { ResponsiveContainer, BarChart as BarChartRechart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Import other components
import Holder from './common/chart/Holder';

// Import default colors
import colors from './common/chart/colors';

// Import helpers
import csvToString from './common/csvToString';

/* Bar Chart Component */
class BarChart extends Component {
  render() {
    // Deconstruct props (see propTypes below for detailed information)
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
      showLegend
    } = this.props;

    // Generate csv contents if they weren't included
    let { csvContents } = this.props;
    if (!noDownload && !csvContents) {
      // Create the name column using the label and unit (if it's included)
      const nameField = `${nameLabel}${nameUnit ? ' (' + nameUnit + ')' : ''}`;
      // Create the value column using the label and unit (if it's included)
      const valueField = `${valueLabel}${valueUnit ? ' (' + valueUnit + ')' : ''}`;
      // Build the csv data object
      const csv = {
        fields: [nameField, valueField],
        data: data.map(datum => {
          return [datum.name, datum.value];
        })
      };
      // Turn the csv object into a string
      csvContents = csvToString(csv);
    }

    // Render the component
    return React.createElement(
      Holder,
      {
        title: title,
        width: width,
        height: height,
        xLabel: horizontal ? valueLabel : nameLabel,
        xUnit: horizontal ? valueUnit : nameUnit,
        yLabel: horizontal ? nameLabel : valueLabel,
        yUnit: horizontal ? nameUnit : valueUnit,
        csvContents: csvContents
      },
      React.createElement(
        ResponsiveContainer,
        {
          width: '100%',
          height: '100%'
        },
        React.createElement(
          BarChartRechart,
          {
            data: data.map(datum => {
              return {
                name: datum.name,
                [valueLabel]: datum.value
              };
            }),
            layout: horizontal ? 'vertical' : 'horizontal'
          },
          React.createElement(CartesianGrid, { strokeDasharray: '3 3' }),
          React.createElement(XAxis, {
            type: horizontal ? 'number' : 'category',
            dataKey: horizontal ? null : 'name'
          }),
          React.createElement(YAxis, {
            type: horizontal ? 'category' : 'number',
            dataKey: horizontal ? 'name' : null
          }),
          !noTooltipOnHover && React.createElement(Tooltip, null),
          showLegend && React.createElement(Legend, null),
          React.createElement(Bar, { dataKey: valueLabel, fill: color })
        )
      )
    );
  }
}

BarChart.propTypes = {
  // Title of the chart
  title: PropTypes.string,
  // Default CSS color (#123456 or 'white') for bars (can be overridden)
  color: PropTypes.string,
  // Width ('100%' or 50)
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // Height ('100%' or 50)
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // Label for the name axis
  nameLabel: PropTypes.string,
  // Unit for the name axis
  nameUnit: PropTypes.string,
  // Label for the value axis
  valueLabel: PropTypes.string,
  // Unit for the value axis
  valueUnit: PropTypes.string,
  // The data/bars
  data: PropTypes.arrayOf(PropTypes.shape({
    // Name of the bar
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // Value of the bar
    value: PropTypes.number.isRequired,
    // Color of the bar (overrides props.color)
    color: PropTypes.string
  })).isRequired,
  // If true, bar chart is a horizontal bar chart
  horizontal: PropTypes.bool,
  // If true, no tooltip is shown on hover
  noTooltipOnHover: PropTypes.bool,
  // If true, legend is included
  showLegend: PropTypes.bool,
  // If true, no download button is shown
  noDownload: PropTypes.bool,
  // The contents of the csv file to download (auto-generated if not included)
  csvContents: PropTypes.string
};

BarChart.defaultProps = {
  // No title for chart by default
  title: null,
  // Bars are a neutral blue by default
  color: colors.defaultBlue,
  // Chart takes up whole parent width by default
  width: '100%',
  // Chart is 500 pixels tall by default
  height: '500px',
  // Name axis is labeled 'Name' by default
  nameLabel: 'Name',
  // Name axis has no label by default
  nameUnit: null,
  // Value axis is labeled 'Value' by default
  valueLabel: 'Value',
  // Value axis has no label by default
  valueUnit: null,
  // The bar chart is a vertical bar chart by default
  horizontal: false,
  // Tooltips are displayed by defaults
  noTooltipOnHover: false,
  // No legend is shown by default
  showLegend: false,
  // A download button is added by default
  noDownload: false,
  // We auto-generate the csv contents by default
  csvContents: null
};

export default BarChart;