// Import math
import math from '../../../common/math';

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

  // Find middle index
  const middleIndex = Math.floor(math.div(data.length, 2));
  const evenNumElems = (data.length % 2 === 0);

  return (
    evenNumElems
      ? data[middleIndex]
      : math.div(
        math.add(data[middleIndex], data[middleIndex - 1]),
        2
      )
  );
};
