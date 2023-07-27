/**
 * Test file for the getPartOfDay helper
 * @author Gabe Abrams
 */

import getPartOfDay from './getPartOfDay';

describe('getPartOfDay', () => {
  it('should return "morning" if the current hour is less than 12', () => {
    // Mock the current hour to be 9am
    jest.spyOn(Date.prototype, 'getHours').mockReturnValue(9);

    const result = getPartOfDay();
    expect(result).toEqual('morning');
  });

  it('should return "afternoon" if the current hour is between 12 and 16 (inclusive)', () => {
    // Mock the current hour to be 2pm
    jest.spyOn(Date.prototype, 'getHours').mockReturnValue(14);

    const result = getPartOfDay();
    expect(result).toEqual('afternoon');
  });

  it('should return "evening" if the current hour is between 17 and 24 (inclusive)', () => {
    // Mock the current hour to be 8pm
    jest.spyOn(Date.prototype, 'getHours').mockReturnValue(20);

    const result = getPartOfDay();
    expect(result).toEqual('evening');
  });

  it('should return "evening" if the current hour is 17', () => {
    // Mock the current hour to be 5pm
    jest.spyOn(Date.prototype, 'getHours').mockReturnValue(17);

    const result = getPartOfDay();
    expect(result).toEqual('evening');
  });

  it('should return "evening" if the current hour is 24', () => {
    // Mock the current hour to be midnight
    jest.spyOn(Date.prototype, 'getHours').mockReturnValue(24);

    const result = getPartOfDay();
    expect(result).toEqual('evening');
  });

  it('should return "morning" if the current hour is 0', () => {
    // Mock the current hour to be midnight
    jest.spyOn(Date.prototype, 'getHours').mockReturnValue(0);

    const result = getPartOfDay();
    expect(result).toEqual('morning');
  });
});
