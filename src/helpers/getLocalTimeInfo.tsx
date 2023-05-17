/**
 * Get current time info in local time
 * @author Gabe Abrams
 * @param [dateOrTimestamp=now] the date to get info on or a ms since epoch timestamp
 * @returns object with timestamp (ms since epoch) and numbers
 *   corresponding to time values for year, month, day, hour, hour12, minute, isPM
 *   where hour is in 24hr time and hour12 is in 12hr time.
 */
const getLocalTimeInfo = (dateOrTimestamp?: Date | number): {
  timestamp: number,
  year: number,
  month: number,
  day: number,
  hour: number,
  hour12: number,
  minute: number,
  isPM: boolean,
} => {
  // Create a time string
  let d: Date;
  if (!dateOrTimestamp) {
    // Use now
    d = new Date();
  } else if (typeof dateOrTimestamp === 'number') {
    // Convert to date
    d = new Date(dateOrTimestamp);
  } else {
    // Already a date
    d = dateOrTimestamp;
  }

  // Create all time numbers
  const timestamp = d.getTime();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const isPM = hour >= 12;
  const hour12 = hour % 12;
  const minute = d.getMinutes();

  // Return
  return {
    timestamp,
    year,
    month,
    day,
    hour,
    hour12,
    isPM,
    minute,
  };
};

export default getLocalTimeInfo;
