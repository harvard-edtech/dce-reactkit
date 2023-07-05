/**
 * Get current time info in local time
 * @author Gabe Abrams
 * @param [dateOrTimestamp=now] the date to get info on or a ms since epoch timestamp
 * @returns object with timestamp (ms since epoch) and numbers
 *   corresponding to time values for year, month, day, hour, hour12, minute, isPM
 *   where hour is in 24hr time and hour12 is in 12hr time.
 */
declare const getLocalTimeInfo: (dateOrTimestamp?: number | Date | undefined) => {
    timestamp: number;
    year: number;
    month: number;
    day: number;
    hour: number;
    hour12: number;
    minute: number;
    isPM: boolean;
};
export default getLocalTimeInfo;
