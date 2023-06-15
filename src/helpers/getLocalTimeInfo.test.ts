/**
 * Test for getLocalTimeInfo helper function
 *   NOTE: only works if this test is run on a machine in ET
 * @author Gabe Abrams
 */

// Import main function
import getLocalTimeInfo from './getLocalTimeInfo';

describe('getLocalTimeInfo', () => {
  it('should return current time info if no argument is passed', () => {
    const result = getLocalTimeInfo();
    const now = new Date();
    expect(result.timestamp).toBeCloseTo(now.getTime(), -3);
    expect(result.year).toEqual(now.getFullYear());
    expect(result.month).toEqual(now.getMonth() + 1);
    expect(result.day).toEqual(now.getDate());
    expect(result.hour).toEqual(now.getHours());
    expect(result.minute).toEqual(now.getMinutes());
    expect(result.isPM).toEqual(now.getHours() >= 12);
  });

  it('should return correct time info for a given timestamp', () => {
    const timestamp = 1629822000000; // 2021-08-24T12:20:00.000Z
    const result = getLocalTimeInfo(timestamp);
    expect(result.timestamp).toEqual(timestamp);
    expect(result.year).toEqual(2021);
    expect(result.month).toEqual(8);
    expect(result.day).toEqual(24);
    expect(result.hour).toEqual(12);
    expect(result.hour12).toEqual(12);
    expect(result.minute).toEqual(20);
    expect(result.isPM).toEqual(true);
  });

  it('should return correct time info for a given Date object', () => {
    const date = new Date('2021-08-24T12:20:00.000Z');
    const result = getLocalTimeInfo(date);
    expect(result.timestamp).toEqual(date.getTime());
    expect(result.year).toEqual(2021);
    expect(result.month).toEqual(8);
    expect(result.day).toEqual(24);
    expect(result.hour).toEqual(8);
    expect(result.hour12).toEqual(8);
    expect(result.minute).toEqual(20);
    expect(result.isPM).toEqual(false);
  });
});
