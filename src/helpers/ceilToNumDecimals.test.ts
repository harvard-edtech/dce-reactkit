/**
 * Test file for the ceilToNumDecimals helper
 * @author Gabe Abrams
 */

// Import main function
import ceilToNumDecimals from './ceilToNumDecimals';

describe('ceilToNumDecimals', () => {
  it('should return 0 for 0 with 0 decimals', () => {
    const result = ceilToNumDecimals(0, 0);
    expect(result).toEqual(0);
  });

  it('should return 1 for 1 with 0 decimals', () => {
    const result = ceilToNumDecimals(1, 0);
    expect(result).toEqual(1);
  });

  it('should return 1.24 for 1.234 with 2 decimals', () => {
    const result = ceilToNumDecimals(1.234, 2);
    expect(result).toEqual(1.24);
  });

  it('should return -1.23 for -1.234 with 2 decimals', () => {
    const result = ceilToNumDecimals(-1.234, 2);
    expect(result).toEqual(-1.23);
  });

  it('should return 1234 for 1234 with 0 decimals', () => {
    const result = ceilToNumDecimals(1234, 0);
    expect(result).toEqual(1234);
  });

  it('should return 0.002 for 0.00123 with 3 decimals', () => {
    const result = ceilToNumDecimals(0.00123, 3);
    expect(result).toEqual(0.002);
  });
});
