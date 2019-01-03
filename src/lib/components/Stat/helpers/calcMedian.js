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

  const sortedData = data;
  sortedData.sort();

  // Find middle index
  const middleIndex = Math.floor(math.div(data.length, 2));
  const evenNumElems = (data.length % 2 === 0);

  return (
    evenNumElems
      ? sortedData[middleIndex]
      : math.div(
        math.add(sortedData[middleIndex], sortedData[middleIndex - 1]),
        2
      )
  );
};
