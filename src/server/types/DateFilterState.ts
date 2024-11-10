// Date filter state
type DateFilterState = {
  // Current start date
  startDate: {
    // Full year
    year: number,
    // 1-indexed month
    month: number,
    // 1-indexed day
    day: number,
  },
  // Current end date
  endDate: {
    // Full year
    year: number,
    // 1-indexed month
    month: number,
    // 1-indexed day
    day: number,
  },
};

export default DateFilterState;
