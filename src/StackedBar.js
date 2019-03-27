import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import chart components
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Import other components
import Holder from './common/chart/Holder';

// Import default colors
import colors from './common/chart/colors';

// Import helpers
import csvToString from './common/csvToString';

/* Stacked Bar Chart Component */
class StackedBar extends Component {
  render() {
    // Deconstruct props (see propTypes below for detailed information)
    const {
      title,
      width,
      height,
      valueColors,
      nameLabel,
      nameUnit,
      valuesLabel,
      valuesUnit,
      valueLabels,
      valueUnits,
      data,
      horizontal,
      noTooltipOnHover,
      noDownload,
      showLegend,
    } = this.props;

    // Pre-process the values
    // Collect all the value names
    let valueNames = {}; // valueName => true
    data.forEach((datum) => {
      if (datum.values) {
        Object.keys(datum.values).forEach((valueName) => {
          valueNames[valueName] = true;
        });
      }
    });
    valueNames = Object.keys(valueNames);
    // Put together value objects
    const valueObjects = {}; // valueName => { valueName, label, unit, color }
    let nextAssortmentColorIndex = 0;
    valueNames.forEach((valueName) => {
      // Get the color
      let color;
      if (colors === 'assortment' || !valueColors[valueName]) {
        color = colors.assortment[
          nextAssortmentColorIndex % colors.assortment.length
        ];
        nextAssortmentColorIndex += 1;
      } else {
        color = valueColors[valueName];
      }

      // Create a value object
      const valueObject = {
        valueName,
        color,
        label: valueLabels[valueName] || valueName,
        unit: valueUnits[valueName] || null,
      };

      // Save the value object
      valueObjects[valueName] = valueObject;
    });

    // Pre-process the data
    const newData = []; // Array of { name, valueName: value, ...}
    data.forEach((datum) => {
      const newDatum = {
        name: datum.name,
      };

      // Add all values, set the number to zero if it wasn't defined
      valueNames.forEach((valueName) => {
        newDatum[valueName] = datum.value[valueName] || 0;
      });

      // Save to newData
      newData.push(newDatum);
    });

    // Generate csv contents if they weren't included
    let { csvContents } = this.props;
    if (!noDownload && !csvContents) {
      const fields = [];

      // Create the name column using the label and unit (if it's included)
      fields.push(`${nameLabel}${nameUnit ? ' (' + nameUnit + ')' : ''}`);

      // Create the value columns using the label and unit (if it's included)
      valueNames.forEach((valueName) => {
        const valueObject = valueObjects[valueName];
        fields.push(`${valueObject.label}${valueObject.unit ? ' (' + valueObject.unit + ')' : ''}`);
      });

      // Build the csv data object
      const csv = {
        fields,
        data: newData.map((datum) => {
          return valueNames.map((valueName) => {
            return datum[valueName];
          });
        }),
      };

      // Turn the csv object into a string
      csvContents = csvToString(csv);
    }

    // Create the bars
    const bars = valueNames.map((valueName) => {
      return (
        <Bar
          dataKey={valueName}
          stackId="a"
          fill={valueObjects[valueName].color}
        />
      );
    });

    // Render the component
    return (
      <Holder
        title={title}
        width={width}
        height={height}
        xLabel={horizontal ? valuesLabel : nameLabel}
        xUnit={horizontal ? valuesUnit : nameUnit}
        yLabel={horizontal ? nameLabel : valuesLabel}
        yUnit={horizontal ? nameUnit : valuesUnit}
        csvContents={csvContents}
      >
        {/* a responsive container that expands to the holder size */}
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          {/* display the rechart bar chart */}
          <BarChart
            data={newData}
            layout={horizontal ? 'vertical' : 'horizontal'}
          >
            {/* Add cartesian grid */}
            <CartesianGrid strokeDasharray="3 3" />
            {/* add axes and their types/keys based on if chart is horiz */}
            <XAxis
              type={horizontal ? 'number' : 'category'}
              dataKey={horizontal ? null : 'name'}
            />
            <YAxis
              type={horizontal ? 'category' : 'number'}
              dataKey={horizontal ? 'name' : null}
            />
            {/* add tooltip component if its not excluded */}
            {!noTooltipOnHover && (
              <Tooltip />
            )}
            {/* add legend component if it's included */}
            {showLegend && (
              <Legend />
            )}
            {/* add the actual bars */}
            {bars}
          </BarChart>
        </ResponsiveContainer>
      </Holder>
    );
  }
}

StackedBar.propTypes = {
  // Title of the chart
  title: PropTypes.string,
  // Default CSS colors (#123456 or 'white') for each bar (can be overridden)
  valueColors: PropTypes.objectOf(PropTypes.string),
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
  // The label for the stacked bar axis
  valuesLabel: PropTypes.string,
  // The unit for the stcked bar axis
  valuesUnit: PropTypes.string,
  // Labels for the values
  valueLabels: PropTypes.objectOf(PropTypes.string),
  // Units for the values
  valueUnits: PropTypes.objectOf(PropTypes.string),
  // The data/bars
  data: PropTypes.arrayOf(
    PropTypes.shape({
      // Name of the bar
      name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      // Values of each bar
      values: PropTypes.object,
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

StackedBar.defaultProps = {
  // No title for chart by default
  title: null,
  // By default, we use an assortment of colors, one for each value
  valueColors: 'assorted',
  // Chart takes up whole parent width by default
  width: '100%',
  // Chart is 500 pixels tall by default
  height: '500px',
  // Name axis is labeled 'Name' by default
  nameLabel: 'Name',
  // Name axis has no unit by default
  nameUnit: null,
  // The stacked bar axis is labeled 'Value' by default
  valuesLabel: 'Value',
  // The stacked bar axis has no unit by default
  valuesUnit: null,
  // Values are labeled by their property names by default
  valueLabels: {},
  // Values have no units by default
  valueUnits: {},
  // The bar chart is a vertical bar chart by default
  horizontal: false,
  // Tooltips are displayed by defaults
  noTooltipOnHover: false,
  // No legend is shown by default
  showLegend: false,
  // A download button is added by default
  noDownload: false,
  // We auto-generate the csv contents by default
  csvContents: null,
};

export default StackedBar;
