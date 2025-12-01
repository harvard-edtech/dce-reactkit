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
declare const getTimestampFromTimeInfoInET: (opts: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}) => number;
export default getTimestampFromTimeInfoInET;
