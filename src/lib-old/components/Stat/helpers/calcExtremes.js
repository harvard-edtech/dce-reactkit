export default (data) => {
  let low;
  let lowNonzero;
  let high;
  data.forEach((x) => {
    // Low
    if (low === undefined || x < low) {
      low = x;
    }
    // Low (nonzero)
    if (
      (lowNonzero === undefined || x < lowNonzero)
      && x !== 0
    ) {
      lowNonzero = x;
    }
    // High
    if (high === undefined || x > high) {
      high = x;
    }
  });
  return {
    low,
    lowNonzero,
    high,
  };
};
