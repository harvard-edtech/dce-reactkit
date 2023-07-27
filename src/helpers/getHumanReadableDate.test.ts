/**
 * Test file for the getHumanReadableDate helper
 * @author Gabe Abrams
 */

// Import helpers
import getHumanReadableDate from './getHumanReadableDate';
import getOrdinal from './getOrdinal';

describe('getHumanReadableDate', () => {
  it('should return the current date if no argument is passed', () => {
    const result = getHumanReadableDate();
    const now = new Date();
    const expected = `${now.toLocaleString('default', { month: 'short' })} ${now.getDate()}${getOrdinal(now.getDate())}`;
    expect(result).toEqual(expected);
  });

  it('should return the correct date for a given timestamp', () => {
    const timestamp = 1629822000000; // 2021-08-24T12:20:00.000Z
    const result = getHumanReadableDate(timestamp);
    expect(result).toEqual('Aug 24th 2021');
  });

  it('should return the correct date for a given Date object', () => {
    const date = new Date('2021-08-24T12:20:00.000Z');
    const result = getHumanReadableDate(date);
    expect(result).toEqual('Aug 24th 2021');
  });
});