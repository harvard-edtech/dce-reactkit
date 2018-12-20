import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import BarChart from './Bar';

// Import default colors
import colors from './colors';

// Import helpers
import csvToString from '../../common/csvToString';

class Histogram extends Component {
  render() {
    // Deconstruct props
    const {
      title,
      color,
      width,
      height,
      startValue,
      numBuckets,
      numDecimals,
      bucketLabel,
      bucketUnit,
      valueLabel,
      valueUnit,
      data,
      noTooltipOnHover,
      noDownload,
      showLegend,
    } = this.props;

    // Choose end value (if none included, use largest value)
    let { endValue } = this.props;
    if (endValue === undefined || endValue === null) {
      endValue = Math.max(...data);
    }

    // Divide data into buckets
    const buckets = [];
    const epsilon = (
      numDecimals === 0
        ? 1
        : parseFloat(`0.${'0'.repeat(numDecimals - 1)}1`)
    );
    const bucketWidth = (endValue - startValue) / numBuckets;
    for (let i = 0; i < numBuckets; i++) {
      const bucketStart = startValue + bucketWidth * i;
      const bucketEnd = startValue + bucketWidth * (i + 1);

      // Generate start/end labels for the bucket
      const lastBucket = (i === numBuckets - 1);
      let bucketStartName = bucketStart.toFixed(numDecimals);
      if (bucketStartName === '0.0') {
        bucketStartName = '0';
      } else if (bucketStartName.startsWith('0.')) {
        bucketStartName = bucketStartName.substring(1);
      }
      let bucketEndName = (
        lastBucket
          ? bucketEnd.toFixed(numDecimals)
          : (
            (parseFloat(bucketEnd.toFixed(numDecimals)) - epsilon)
              .toFixed(numDecimals)
          )
      );
      if (bucketEndName === '0.0') {
        bucketEndName = '0';
      } else if (bucketEndName.startsWith('0.')) {
        bucketEndName = bucketEndName.substring(1);
      }
      buckets.push({
        name: `${bucketStartName}-${bucketEndName}`,
        start: bucketStart,
        end: bucketEnd,
        value: 0,
      });
    }

    // Put data into buckets
    data.forEach((value) => {
      for (let i = 0; i < buckets.length; i++) {
        // If this the last bucket, allow value to equal the end value
        const lastBucket = (i === buckets.length - 1);
        if (
          value >= buckets[i].start
          && (lastBucket ? value <= buckets[i].end : value < buckets[i].end)
        ) {
          // Found the correct bucket!
          buckets[i].value += 1;
          break;
        }
      }
    });

    let csvContents;
    if (!noDownload) {
      const bucketField = `${bucketLabel}${bucketUnit ? ' (' + bucketUnit + ')' : ''}`;
      const valueField = `${valueLabel}${valueUnit ? ' (' + valueUnit + ')' : ''}`;
      const csv = {
        fields: [bucketField, valueField],
        data: buckets.map((bucket) => {
          return [bucket.name, bucket.value];
        }),
      };
      csvContents = csvToString(csv);
    }

    return (
      <BarChart
        title={title}
        color={color}
        width={width}
        height={height}
        nameLabel={bucketLabel}
        nameUnit={bucketUnit}
        valueLabel={valueLabel}
        valueUnit={valueUnit}
        noTooltipOnHover={noTooltipOnHover}
        showLegend={showLegend}
        noDownload={noDownload}
        csvContents={csvContents}
        data={buckets}
      />
    );
  }
}

Histogram.propTypes = {
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
  // The lowest value to start at (beginning of first bucket)
  startValue: PropTypes.number,
  // The highest value to coun (ending of the last bucket)
  endValue: PropTypes.number,
  // The number of buckets
  numBuckets: PropTypes.number,
  // The number of decimals to display on the bucket axis
  numDecimals: PropTypes.number,
  // Label for the bucket axis
  bucketLabel: PropTypes.string,
  // Unit for the bucket axis
  bucketUnit: PropTypes.string,
  // Label for the value axis
  valueLabel: PropTypes.string,
  // Unit for the value axis
  valueUnit: PropTypes.string,
  // The numbers to chart in the histogram
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  // If true, no tooltip is shown on hover
  noTooltipOnHover: PropTypes.bool,
  // If true, legend is included
  showLegend: PropTypes.bool,
  // If true, no download button is shown
  noDownload: PropTypes.bool,
};

Histogram.defaultProps = {
  title: null,
  color: colors.defaultBlue,
  width: '100%',
  height: '500px',
  startValue: 0,
  endValue: null,
  numBuckets: 10,
  numDecimals: 1,
  bucketLabel: 'Bucket',
  bucketUnit: null,
  valueLabel: 'Num in Bucket',
  valueUnit: null,
  noTooltipOnHover: false,
  showLegend: false,
  noDownload: false,
};

export default Histogram;
