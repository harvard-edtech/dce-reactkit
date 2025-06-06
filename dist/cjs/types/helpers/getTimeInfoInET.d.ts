/**
 * Get current time info in US Boston Eastern Time, independent of machine
 *   timezone
 * @author Gabe Abrams
 * @param [dateOrTimestamp=now] the date to get info on or a ms since epoch timestamp
 * @returns object with timestamp (ms since epoch) and numbers
 *   corresponding to ET time values for year, month, day, hour, hour12, minute, second, isPM
 *   where hour is in 24hr time and hour12 is in 12hr time.
 */
declare const getTimeInfoInET: (dateOrTimestamp?: Date | number) => {
    timestamp: number;
    year: number;
    month: number;
    day: number;
    hour: number;
    hour12: number;
    minute: number;
    second: number;
    isPM: boolean;
};
export default getTimeInfoInET;
