// Import math
import math from '../../../common/math';

// Import other helpers
import calcAverage from './calcAverage';

export default (data) => {
  // No data
  if (
    !data
    || data.length <= 1
  ) {
    return 0;
  }

  // Get average
  const average = calcAverage(data);

  // Get squared diffs
  const squaredDiffs = data.map((x) => {
    const diff = math.sub(x, average);
    return math.mult(diff, diff);
  });

  // Get average of squared diffs
  const avgSquaredDiff = calcAverage(squaredDiffs);

  // Get square root of squared diff
  return Math.sqrt(avgSquaredDiff);
};
