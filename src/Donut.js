import React, { Component } from 'react';
import PropTypes from 'prop-types';
import genUUID from 'uuid/v1';

// Import rechart components
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from 'recharts';

// Import other components
import Holder from './common/chart/Holder';

// Import default colors
import colors from './common/chart/colors';

// Import helpers
import csvToString from './common/csvToString';

/* Donut Chart Component */
class DonutChart extends Component {
  render() {
    // Deconstruct props (see propTypes below for detailed information)
    const {
      title,
      color,
      width,
      height,
      data,
      noTooltipOnHover,
      noDownload,
      showLegend,
    } = this.props;

    // Generate csv contents for the download
    let csvContents;
    if (!noDownload) {
      const csv = {
        fields: ['Name', 'Value'],
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
        csvContents={csvContents}
      >
        {/* a responsive container that fills the whole holder */}
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          {/* add the actual pie chart from recharts */}
          <PieChart>
            {/* add the legend component if it's included */}
            {showLegend && (
              <Legend />
            )}
            {/* add the pie itself (set it up as a donut using radii) */}
            <Pie
              data={data}
              dataKey="value"
              innerRadius="60%"
              outerRadius="100%"
              fill={color}
            >
              {/* add each donut cell dynamically */}
              {
                data.map((item, index) => {
                  // Get the item's default color
                  let itemColor = (
                    item.color
                      ? item.color
                      : color
                  );

                  // If individual item doesn't have an override color and we
                  // are using a color assortment, choose the next color
                  if (itemColor === 'assortment' && !item.color) {
                    itemColor = colors.assortment[
                      index % colors.assortment.length
                    ];
                    // Don't let two adjacent slices have the same color
                    // (this math ensures that if the first and last slice are
                    // not the same color)
                    if (
                      (data.length - 1) % colors.assortment.length === 0
                      && index === data.length - 1
                    ) {
                      itemColor = colors.assortment[
                        (index + Math.floor(colors.assortment.length / 2))
                        % colors.assortment.length
                      ];
                    }
                  }

                  // Return the cell corresponding to this donut slice
                  return (
                    <Cell
                      key={genUUID()}
                      fill={itemColor}
                    />
                  );
                })
              }
            </Pie>
            {/* add the tooltip component if it is included */}
            {!noTooltipOnHover && (
              <Tooltip />
            )}
          </PieChart>
        </ResponsiveContainer>
      </Holder>
    );
  }
}

DonutChart.propTypes = {
  // Title of the chart
  title: PropTypes.string,
  // Default CSS color (#123456 or 'white') for slices (can be overridden)
  // OR 'assortment' for random colors
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
  // The data/slices
  data: PropTypes.arrayOf(
    PropTypes.shape({
      // Name of the slice
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
  // If true, no tooltip is shown on hover
  noTooltipOnHover: PropTypes.bool,
  // If true, legend is included
  showLegend: PropTypes.bool,
  // If true, no download button is shown
  noDownload: PropTypes.bool,
};

DonutChart.defaultProps = {
  // Chart has no title by default
  title: null,
  // Donut slices get an assortment of colors by default
  color: 'assortment',
  // Chart takes up full parent width by default
  width: '100%',
  // Chart's height is 500px by default
  height: '500px',
  // Tooltips are displayed by default
  noTooltipOnHover: false,
  // No legend is included by default
  showLegend: false,
  // A download button is added by default
  noDownload: false,
};

export default DonutChart;
