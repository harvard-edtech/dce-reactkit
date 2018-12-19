import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
import Holder from './Holder';

// Import default colors
import colors from './colors';

class DonutChart extends Component {
  render() {
    // Deconstruct props
    const {
      title,
      color,
      width,
      height,
      data,
      noTooltipOnHover,
      showLegend,
    } = this.props;

    return (
      <Holder
        title={title}
        width={width}
        height={height}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            {showLegend && (
              <Legend />
            )}
            <Pie
              data={data}
              innerRadius="60%"
              outerRadius="100%"
              fill={color}
            >
              {
                data.map((item, index) => {
                  let itemColor = (
                    item.color
                      ? item.color
                      : color
                  );
                  if (itemColor === 'assortment') {
                    itemColor = colors.assortment[
                      index % colors.assortment.length
                    ];
                    // Don't let two adjacent slices have the same color
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
                  return (
                    <Cell
                      fill={itemColor}
                    />
                  );
                })
              }
            </Pie>
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
  // OR 'rainbow' for random colors
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
      name: PropTypes.string.isRequired,
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
};

DonutChart.defaultProps = {
  title: null,
  color: 'rainbow',
  width: '100%',
  height: '500px',
  noTooltipOnHover: false,
  showLegend: false,
};

export default DonutChart;
