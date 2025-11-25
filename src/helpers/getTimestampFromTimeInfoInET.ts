// Import shared types
import ErrorWithCode from '../errors/ErrorWithCode';
import ReactKitErrorCode from '../types/ReactKitErrorCode';

// Import shared helpers
import getTimeInfoInET from './getTimeInfoInET';
import padZerosLeft from './padZerosLeft';

/*----------------------------------------*/
/* --------------- Helpers -------------- */
/*----------------------------------------*/

/**
 * Check if a timestamp is valid
 * @param opts object containing all arguments
 * @param opts.timestamp Timestamp in milliseconds since epoch
 * @param opts.expectedYear Expected year
 * @param opts.expectedMonth Expected month
 * @param opts.expectedDay Expected day
 * @param opts.expectedHour Expected hour
 * @param opts.expectedMinute Expected minute
 * @returns 1 if the timestamp needs to be increased, -1 if it needs to be decreased, 0 if it is valid
 */
const checkTimestamp = (
  opts: {
    timestamp: number,
    expectedYear: number,
    expectedMonth: number,
    expectedDay: number,
    expectedHour: number,
    expectedMinute: number,
  },
): number => {
  const {
    timestamp,
    expectedYear,
    expectedMonth,
    expectedDay,
    expectedHour,
    expectedMinute,
  } = opts;

  const timeInfoInET = getTimeInfoInET(timestamp);
  if (timeInfoInET.year < expectedYear) {
    return 1;
  }
  if (timeInfoInET.year > expectedYear) {
    return -1;
  }
  if (timeInfoInET.month < expectedMonth) {
    return 1;
  }
  if (timeInfoInET.month > expectedMonth) {
    return -1;
  }
  if (timeInfoInET.day < expectedDay) {
    return 1;
  }
  if (timeInfoInET.day > expectedDay) {
    return -1;
  }
  if (timeInfoInET.hour < expectedHour) {
    return 1;
  }
  if (timeInfoInET.hour > expectedHour) {
    return -1;
  }
  if (timeInfoInET.minute < expectedMinute) {
    return 1;
  }
  if (timeInfoInET.minute > expectedMinute) {
    return -1;
  }
  return 0;
};

/*----------------------------------------*/
/* ---------------- Main ---------------- */
/*----------------------------------------*/

/**
 * Get a timestamp (ms since epoch) from time info (year, month, day, hour, minute, etc.) in Eastern Time (ET)
 * @author Gardenia Liu
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.year Year (e.g. 2023)
 * @param opts.month Month (1-12)
 * @param opts.day Day of the month (1-31)
 * @param opts.hour Hour (0-23)
 * @param opts.minute Minute (0-59)
 * @returns Timestamp in milliseconds since epoch
 */
const getTimestampFromTimeInfoInET = (
  opts: {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
  },
): number => {
  // Destructure opts
  const {
    year,
    month,
    day,
    hour,
    minute,
  } = opts;

  // Determine if the date is in DST in Eastern Time
  const tempDate = new Date(year, month - 1, day);
  const janOffset = new Date(year, 0, 1).getTimezoneOffset();
  const isDST = tempDate.getTimezoneOffset() < janOffset;
  const etOffset = isDST ? '-04:00' : '-05:00';

  // Format with leading zeroes
  const mm = padZerosLeft(month, 2);
  const dd = padZerosLeft(day, 2);
  const hh = padZerosLeft(hour, 2);
  const min = padZerosLeft(minute, 2);

  // Build ET ISO string and convert to UTC timestamp
  const etISOString = `${year}-${mm}-${dd}T${hh}:${min}:00${etOffset}`;
  let timestamp = (new Date(etISOString)).getTime();

  // Heat seek to get the right timestamp
  const maxOffset = 24 * 60; // 24 hours in minutes
  let currentOffset = 0; // minutes
  const offsetIncrement = 15; // minutes
  const offsetDirection = checkTimestamp({
    timestamp,
    expectedYear: year,
    expectedMonth: month,
    expectedDay: day,
    expectedHour: hour,
    expectedMinute: minute,
  });
  if (offsetDirection === 0) {
    // Valid! Return the timestamp
    return timestamp;
  }

  // Heat seek
  while (Math.abs(currentOffset) < maxOffset) {
    // Update offset
    currentOffset += (offsetDirection * offsetIncrement);

    // Update timestamp
    const offsetMs = currentOffset * 60 * 1000;
    timestamp += offsetMs;

    // Check timestamp again
    const newDirection = checkTimestamp({
      timestamp,
      expectedYear: year,
      expectedMonth: month,
      expectedDay: day,
      expectedHour: hour,
      expectedMinute: minute,
    });
    if (newDirection === 0) {
      // Valid! Return the timestamp
      return timestamp;
    }

    // Invalid. Keep looping.
  }

  throw new ErrorWithCode(
    `Timestamp mismatch: expected ${year}-${mm}-${dd} ${hh}:${min}, seeked to offset ${currentOffset} minutes but could not find a valid timestamp.`,
    ReactKitErrorCode.ETTimestampInvalid,
  );
};

export default getTimestampFromTimeInfoInET;
