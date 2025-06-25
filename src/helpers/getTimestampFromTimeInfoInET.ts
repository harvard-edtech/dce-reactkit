// Import shared types
import ErrorWithCode from '../errors/ErrorWithCode';
import ReactKitErrorCode from '../types/ReactKitErrorCode';

// Import shared helpers
import getTimeInfoInET from './getTimeInfoInET';
import padZerosLeft from './padZerosLeft';

/**
 * Get a timestamp (ms since epoch) from time info (year, month, day, hour, minute, etc.) in Eastern Time (ET)
 * @author Gardenia Liu
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.year Year (e.g. 2023)
 * @param opts.month Month (1-12)
 * @param opts.day Day of the month (1-31)
 * @param opts.hour Hour (0-23)
 * @param opts.minute Minute (0-59))
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
  const timestamp = (new Date(etISOString)).getTime();

  // Verify that the timestamp is correct
  const timeInfoInET = getTimeInfoInET(timestamp);
  if (
    timeInfoInET.year !== year
    || timeInfoInET.month !== month
    || timeInfoInET.day !== day
    || timeInfoInET.hour !== hour
    || timeInfoInET.minute !== minute
  ) {
    throw new ErrorWithCode(
      `Timestamp mismatch: expected ${year}-${mm}-${dd} ${hh}:${min}, got ${timeInfoInET.year}-${padZerosLeft(timeInfoInET.month, 2)}-${padZerosLeft(timeInfoInET.day, 2)} ${padZerosLeft(timeInfoInET.hour, 2)}:${padZerosLeft(timeInfoInET.minute, 2)}`,
      ReactKitErrorCode.ETTimestampInvalid,
    );
  }

  // Valid! Return the timestamp
  return timestamp;
};

export default getTimestampFromTimeInfoInET;
