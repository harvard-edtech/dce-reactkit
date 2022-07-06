import getTimeInfoInET from './getTimeInfoInET';
import getOrdinal from './getOrdinal';

// Map of month to three letter description
const monthMap = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

/**
 * Get a human-readable description of a date (all in ET)
 * @author Gabe Abrams
 * @param [dateOrTimestamp=today] the date or timestamp for the date to describe
 * @returns human-readable description of the date
 */
const getHumanReadableDate = (dateOrTimestamp?: Date | number) => {
  // Get the date info
  const {
    month,
    day,
    year,
  } = getTimeInfoInET(dateOrTimestamp);
  const currYear = getTimeInfoInET().year;

  // Create start of description
  let description = `${monthMap[month as keyof typeof monthMap]} ${day}${getOrdinal(day)}`;

  // Add on year if it's different
  if (year !== currYear) {
    description += ` ${year}`;
  }

  // Return description
  return description;
};

export default getHumanReadableDate;
