/**
 * Get current time info in US Boston Eastern Time, independent of machine
 *   timezone
 * @author Gabe Abrams
 * @param {Date} [date=now] the date to get info on
 * @returns object with timestamp (ms since epoch) and numbers
 *   corresponding to ET time values for year, month, day, hour, minute
 */
const getTimeInfoInET = (date?: Date): {
  timestamp: number,
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
} => {
  // Create a time string
  const d = (date || new Date());
  const str = d.toLocaleString(
    'en-US', // Using US encoding (it's the only one installed on containers)
    { timeZone: 'America/New_York' } // Force EST timezone
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
  let hour = Number.parseInt(hourStr, 10);
  // Convert from am/pm to 24hr
  const isAM = ending.toLowerCase().includes('am');
  const isPM = !isAM;
  if (isPM && hour !== 12) {
    hour += 12;
  } else if (isAM && hour === 12) {
    hour = 0;
  }

  // Return
  return {
    timestamp,
    year,
    month,
    day,
    hour,
    minute,
  };
};

export default getTimeInfoInET;
