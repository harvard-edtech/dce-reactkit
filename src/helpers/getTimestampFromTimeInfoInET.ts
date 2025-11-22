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

  // Format with leading zeroes
  const mm = padZerosLeft(month, 2);
  const dd = padZerosLeft(day, 2);
  const hh = padZerosLeft(hour, 2);
  const min = padZerosLeft(minute, 2);

  // Use Intl.DateTimeFormat to get the ET offset for the given date
  const dateForET = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  const parts: Intl.DateTimeFormatPart[] = new Intl.DateTimeFormat('en-US', options).formatToParts(dateForET);
  const etYear: string | undefined = parts.find((p: Intl.DateTimeFormatPart) => {
    return p.type === 'year';
  })?.value;
  const etMonth: string | undefined = parts.find((p: Intl.DateTimeFormatPart) => {
    return p.type === 'month';
  })?.value;
  const etDay: string | undefined = parts.find((p: Intl.DateTimeFormatPart) => {
    return p.type === 'day';
  })?.value;
  const etHour: string | undefined = parts.find((p: Intl.DateTimeFormatPart) => {
    return p.type === 'hour';
  })?.value;
  const etMinute: string | undefined = parts.find((p: Intl.DateTimeFormatPart) => {
    return p.type === 'minute';
  })?.value;
  const etSecond: string | undefined = parts.find((p: Intl.DateTimeFormatPart) => {
    return p.type === 'second';
  })?.value;

  // Build ET date string and parse as if local, then get UTC timestamp
  if (!etYear || !etMonth || !etDay || !etHour || !etMinute || !etSecond) {
    throw new ErrorWithCode(
      'Failed to parse date parts from Intl.DateTimeFormat',
      ReactKitErrorCode.ETTimestampInvalid,
    );
  }
  const etDateString: string = `${etYear}-${etMonth}-${etDay}T${etHour}:${etMinute}:${etSecond}`;
  const etDate: Date = new Date(etDateString);
  const timestamp: number = etDate.getTime();

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
