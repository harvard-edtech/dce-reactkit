/**
 * Get current time info in US Boston Eastern Time, independent of machine
 *   timezone
 * @author Gabe Abrams
 * @param [dateOrTimestamp=now] the date to get info on or a ms since epoch timestamp
 * @returns object with timestamp (ms since epoch) and numbers
 *   corresponding to ET time values for year, month, day, hour, hour12, minute, isPM
 *   where hour is in 24hr time and hour12 is in 12hr time.
 */
const getTimeInfoInET = (dateOrTimestamp?: Date | number): {
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
  const str = d.toLocaleString(
    'en-US', // Using US encoding (it's the only one installed on containers)
    { timeZone: 'America/New_York' }, // Force EST timezone
  );

  // Parse the string for the date/time info
  const [dateStr, timeStr] = str.split(', '); // Format: MM/DD/YYYY, HH:MM:SS AM
  const [monthStr, dayStr, yearStr] = dateStr.split('/'); // Format: MM/DD/YYYY
  const [hourStr, minStr, ending] = timeStr.split(':'); // Format: HH:MM:SS AM

  // Create all time numbers
  const timestamp = d.getTime();
  const year = Number.parseInt(yearStr, 10);
  const month = Number.parseInt(monthStr, 10);
  const day = Number.parseInt(dayStr, 10);
  const minute = Number.parseInt(minStr, 10);
  const hour12 = Number.parseInt(hourStr, 10);
  // Convert from am/pm to 24hr
  const isAM = ending.toLowerCase().includes('am');
  const isPM = !isAM;
  let hour = hour12;
  if (isPM && hour12 !== 12) {
    hour += 12;
  } else if (isAM && hour12 === 12) {
    hour = 0;
  }

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

export default getTimeInfoInET;
