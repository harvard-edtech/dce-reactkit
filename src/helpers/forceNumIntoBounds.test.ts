/**
 * Test file for the forceNumIntoBounds helper
 * @author Gabe Abrams
 */

// Import main helper
import forceNumIntoBounds from './forceNumIntoBounds';

describe('forceNumIntoBounds', () => {
  it('should return the number if it is within the bounds', () => {
    const result = forceNumIntoBounds(5, 0, 10);
    expect(result).toEqual(5);
  });

  it('should return the minimum bound if the number is less than the minimum', () => {
    const result = forceNumIntoBounds(-5, 0, 10);
    expect(result).toEqual(0);
  });

  it('should return the maximum bound if the number is greater than the maximum', () => {
    const result = forceNumIntoBounds(15, 0, 10);
    expect(result).toEqual(10);
  });

  it('should return the minimum bound if the number is equal to the minimum', () => {
    const result = forceNumIntoBounds(0, 0, 10);
    expect(result).toEqual(0);
  });

  it('should return the maximum bound if the number is equal to the maximum', () => {
    const result = forceNumIntoBounds(10, 0, 10);
    expect(result).toEqual(10);
  });
});
