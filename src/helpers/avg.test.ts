/**
 * Unit tests for avg helper
 * @author Gabe Abrams
 */

import avg from './avg';

describe('helpers > avg', () => {
  it('should return 0 for an empty array', () => {
    expect(avg([])).toEqual(0);
  });

  it('should return the correct average for an array of numbers', () => {
    expect(avg([1, 2, 3, 4, 5])).toEqual(3);
  });

  it('should handle negative numbers', () => {
    expect(avg([-1, 0, 1])).toEqual(0);
  });

  it('should handle decimal numbers', () => {
    expect(avg([1.5, 2.5, 3.5])).toEqual(2.5);
  });
});