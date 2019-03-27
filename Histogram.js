import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import BarChart from './Bar';

// Import default colors
import colors from './common/chart/colors';

// Import helpers
import csvToString from './common/csvToString';

/* Histogram Chart Component */
class Histogram extends Component {
  render() {
    // Deconstruct props (see propTypes below for detailed information)
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
      showLegend
    } = this.props;

    // Choose end value (if none included, use largest value)
    let { endValue } = this.props;
    if (endValue === undefined || endValue === null) {
      endValue = Math.max(...data);
    }

    // Divide data into buckets
    const buckets = [];
    const epsilon = numDecimals === 0 ? 1 : parseFloat(`0.${'0'.repeat(numDecimals - 1)}1`);
    // Dynamically choose the bucket width
    const bucketWidth = (endValue - startValue) / numBuckets;
    // Set up each bucket
    for (let i = 0; i < numBuckets; i++) {
      // Define bucket start and end
      const bucketStart = startValue + bucketWidth * i; // inclusive
      const bucketEnd = startValue + bucketWidth * (i + 1); // exclusive

      // Generate start/end labels for the bucket
      const lastBucket = i === numBuckets - 1;
      let bucketStartName = bucketStart.toFixed(numDecimals);
      if (bucketStartName === '0.0') {
        bucketStartName = '0';
      } else if (bucketStartName.startsWith('0.')) {
        bucketStartName = bucketStartName.substring(1);
      }
      let bucketEndName = lastBucket ? bucketEnd.toFixed(numDecimals) : (parseFloat(bucketEnd.toFixed(numDecimals)) - epsilon).toFixed(numDecimals);
      if (bucketEndName === '0.0') {
        bucketEndName = '0';
      } else if (bucketEndName.startsWith('0.')) {
        bucketEndName = bucketEndName.substring(1);
      }

      // Create a bucket object {name, start, end}
      buckets.push({
        name: `${bucketStartName}-${bucketEndName}`,
        start: bucketStart,
        end: bucketEnd,
        value: 0
      });
    }

    // Put data into buckets
    data.forEach(value => {
      for (let i = 0; i < buckets.length; i++) {
        // If this is the last bucket, allow value to equal the end value
        // (inclusive)
        const lastBucket = i === buckets.length - 1;

        // Check if this value falls in this bucket
        if (value >= buckets[i].start && (lastBucket ? value <= buckets[i].end : value < buckets[i].end)) {
          // Found the correct bucket! Add another item to this bucket
          buckets[i].value += 1;
          break;
        }
      }
    });

    // Generate the downloadable csv if we have a download button
    let csvContents;
    if (!noDownload) {
      const bucketField = `${bucketLabel}${bucketUnit ? ' (' + bucketUnit + ')' : ''}`;
      const valueField = `${valueLabel}${valueUnit ? ' (' + valueUnit + ')' : ''}`;
      const csv = {
        fields: [bucketField, valueField],
        data: buckets.map(bucket => {
          return [bucket.name, bucket.value];
        })
      };
      csvContents = csvToString(csv);
    }

    // Render the component (it's just a bar chart)
    return React.createElement(BarChart, {
      title: title,
      color: color,
      width: width,
      height: height,
      nameLabel: bucketLabel,
      nameUnit: bucketUnit,
      valueLabel: valueLabel,
      valueUnit: valueUnit,
      noTooltipOnHover: noTooltipOnHover,
      showLegend: showLegend,
      noDownload: noDownload,
      csvContents: csvContents,
      data: buckets
    });
  }
}

Histogram.propTypes = {
  // Title of the chart
  title: PropTypes.string,
  // Default CSS color (#123456 or 'white') for slices (can be overridden)
  color: PropTypes.string,
  // Width ('100%' or 50)
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // Height ('100%' or 50)
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // The lowest value to start at (beginning of first bucket)
  startValue: PropTypes.number,
  // The highest value to count (ending of the last bucket)
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
  noDownload: PropTypes.bool
};

Histogram.defaultProps = {
  // Chart has no title by default
  title: null,
  // Bars are neutral blue by default
  color: colors.defaultBlue,
  // Chart takes up full parent width by default
  width: '100%',
  // Chart's height is 500px by default
  height: '500px',
  // First bucket starts at 0 by default
  startValue: 0,
  // Last bucket takes on the highest value in the dataset by default
  endValue: null,
  // The data is divided into 10 buckets by default
  numBuckets: 10,
  // The bucket labels include one decimal
  numDecimals: 1,
  // The bucket axis is called 'Bucket' by default
  bucketLabel: 'Bucket',
  // The bucket axis has no unit by default
  bucketUnit: null,
  // The value axis is called 'Num in Bucket' by default
  valueLabel: 'Num in Bucket',
  // The value axis has no unit by default
  valueUnit: null,
  // Tooltips are shown by default
  noTooltipOnHover: false,
  // No legend is included by default
  showLegend: false,
  // A download button is included by default
  noDownload: false
};

export default Histogram;