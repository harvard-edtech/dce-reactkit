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

class ScatterChart extends Component {
  render() {
    // Deconstruct props
    const {
      width,
      height,
      data,
    } = this.props;

    return (
      <ResponsiveContainer
        width={width}
        height={height}
      >
        <ScatterChartLib>
          <CartesianGrid />
          <XAxis dataKey="x" type="number" name="stature" unit="cm" />
          <YAxis dataKey="y" type="number" name="weight" unit="kg" />
          <Scatter name="A school" data={data} fill="#8884d8" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        </ScatterChartLib>
      </ResponsiveContainer>
    );
  }
}

export default Scatter;
