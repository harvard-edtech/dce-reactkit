/**
 * Get a human-readable description of a date (all in ET)
 * @author Gabe Abrams
 * @param [dateOrTimestamp=today] the date or timestamp for the date to describe
 * @returns human-readable description of the date
 */
declare const getHumanReadableDate: (dateOrTimestamp?: Date | number) => string;
export default getHumanReadableDate;
