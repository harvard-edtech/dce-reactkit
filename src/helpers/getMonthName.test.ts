/**
 * Test for getMonthName helper
 * @author Gabe Abrams
 */

// Import main helper
import getMonthName from './getMonthName';

describe('getMonthName', () => {
  it('should return January for 1', () => {
    const result = getMonthName(1);
    expect(result).toEqual({ short: 'Jan', full: 'January' });
  });

  it('should return February for 2', () => {
    const result = getMonthName(2);
    expect(result).toEqual({ short: 'Feb', full: 'February' });
  });

  it('should return March for 3', () => {
    const result = getMonthName(3);
    expect(result).toEqual({ short: 'Mar', full: 'March' });
  });

  it('should return April for 4', () => {
    const result = getMonthName(4);
    expect(result).toEqual({ short: 'Apr', full: 'April' });
  });

  it('should return May for 5', () => {
    const result = getMonthName(5);
    expect(result).toEqual({ short: 'May', full: 'May' });
  });

  it('should return June for 6', () => {
    const result = getMonthName(6);
    expect(result).toEqual({ short: 'Jun', full: 'June' });
  });

  it('should return July for 7', () => {
    const result = getMonthName(7);
    expect(result).toEqual({ short: 'Jul', full: 'July' });
  });

  it('should return August for 8', () => {
    const result = getMonthName(8);
    expect(result).toEqual({ short: 'Aug', full: 'August' });
  });

  it('should return September for 9', () => {
    const result = getMonthName(9);
    expect(result).toEqual({ short: 'Sep', full: 'September' });
  });

  it('should return October for 10', () => {
    const result = getMonthName(10);
    expect(result).toEqual({ short: 'Oct', full: 'October' });
  });

  it('should return November for 11', () => {
    const result = getMonthName(11);
    expect(result).toEqual({ short: 'Nov', full: 'November' });
  });

  it('should return December for 12', () => {
    const result = getMonthName(12);
    expect(result).toEqual({ short: 'Dec', full: 'December' });
  });

  it('should return January for 0', () => {
    const result = getMonthName(0);
    expect(result).toEqual({ short: 'Jan', full: 'January' });
  });

  it('should return January for 13', () => {
    const result = getMonthName(13);
    expect(result).toEqual({ short: 'Jan', full: 'January' });
  });
});