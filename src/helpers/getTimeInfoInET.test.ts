/**
 * Test file for the getTimeInfoInET helper
 * @author Gabe Abrams
 */

// Import main function
import getTimeInfoInET from './getTimeInfoInET';

describe('getTimeInfoInET', () => {
  it('should return the current time info in ET if no argument is passed', () => {
    const result = getTimeInfoInET();
    const now = new Date();
    const expectedTimestamp = now.getTime();
    const expectedYear = now.getFullYear();
    const expectedMonth = now.getMonth() + 1;
    const expectedDay = now.getDate();
    const expectedHour = now.getHours();
    const expectedHour12 = expectedHour % 12 || 12;
    const expectedMinute = now.getMinutes();
    const expectedIsPM = expectedHour >= 12;
    expect(result.timestamp).toBeCloseTo(expectedTimestamp, -2);
    expect(result.year).toEqual(expectedYear);
    expect(result.month).toEqual(expectedMonth);
    expect(result.day).toEqual(expectedDay);
    expect(result.hour).toEqual(expectedHour);
    expect(result.hour12).toEqual(expectedHour12);
    expect(result.minute).toEqual(expectedMinute);
    expect(result.isPM).toEqual(expectedIsPM);
  });

  it('should return the time info in ET for a specified date', () => {
    const date = new Date('2022-01-01T00:00:00Z');
    const result = getTimeInfoInET(date);
    const expectedTimestamp = date.getTime();
    const expectedYear = 2021;
    const expectedMonth = 12;
    const expectedDay = 31;
    const expectedHour = 19;
    const expectedHour12 = 7;
    const expectedMinute = 0;
    const expectedIsPM = false;
    expect(result.timestamp).toEqual(expectedTimestamp);
    expect(result.year).toEqual(expectedYear);
    expect(result.month).toEqual(expectedMonth);
    expect(result.day).toEqual(expectedDay);
    expect(result.hour).toEqual(expectedHour);
    expect(result.hour12).toEqual(expectedHour12);
    expect(result.minute).toEqual(expectedMinute);
    expect(result.isPM).toEqual(expectedIsPM);
  });

  it('should return the time info in ET for a specified timestamp', () => {
    const timestamp = 1640995200000; // 2022-01-01T00:00:00Z
    const result = getTimeInfoInET(timestamp);
    const expectedTimestamp = timestamp;
    const expectedYear = 2021;
    const expectedMonth = 12;
    const expectedDay = 31;
    const expectedHour = 19;
    const expectedHour12 = 7;
    const expectedMinute = 0;
    const expectedIsPM = false;
    expect(result.timestamp).toEqual(expectedTimestamp);
    expect(result.year).toEqual(expectedYear);
    expect(result.month).toEqual(expectedMonth);
    expect(result.day).toEqual(expectedDay);
    expect(result.hour).toEqual(expectedHour);
    expect(result.hour12).toEqual(expectedHour12);
    expect(result.minute).toEqual(expectedMinute);
    expect(result.isPM).toEqual(expectedIsPM);
  });
});
