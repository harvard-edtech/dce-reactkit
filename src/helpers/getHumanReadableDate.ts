// Import shared helpers
import getTimeInfoInET from './getTimeInfoInET';
import getOrdinal from './getOrdinal';
import getMonthName from './getMonthName';

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

  // Get the short month description
  const monthName = getMonthName(month).short;

  // Create start of description
  let description = `${monthName} ${day}${getOrdinal(day)}`;

  // Add on year if it's different
  if (year !== currYear) {
    description += ` ${year}`;
  }

  // Return description
  return description;
};

export default getHumanReadableDate;
