// Import math
import math from '../../../common/math';

// Import other helpers
import calcSum from './calcSum';

export default (data) => {
  // No data
  if (
    !data
    || data.length === 0
  ) {
    return 0;
  }
  // Only one element
  if (data.length === 1) {
    return data[0];
  }
  return math.div(calcSum(data), data.length);
};
