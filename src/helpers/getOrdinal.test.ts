/**
 * Test file for the getOrdinal helper
 * @author Gabe Abrams
 */

// Import main function
import getOrdinal from './getOrdinal';

describe('getOrdinal', () => {
  it('should return "th" for 0', () => {
    const result = getOrdinal(0);
    expect(result).toEqual('th');
  });

  it('should return "st" for 1', () => {
    const result = getOrdinal(1);
    expect(result).toEqual('st');
  });

  it('should return "nd" for 2', () => {
    const result = getOrdinal(2);
    expect(result).toEqual('nd');
  });

  it('should return "rd" for 3', () => {
    const result = getOrdinal(3);
    expect(result).toEqual('rd');
  });

  it('should return "th" for 4', () => {
    const result = getOrdinal(4);
    expect(result).toEqual('th');
  });

  it('should return "th" for 11', () => {
    const result = getOrdinal(11);
    expect(result).toEqual('th');
  });

  it('should return "st" for 21', () => {
    const result = getOrdinal(21);
    expect(result).toEqual('st');
  });

  it('should return "nd" for 22', () => {
    const result = getOrdinal(22);
    expect(result).toEqual('nd');
  });

  it('should return "rd" for 23', () => {
    const result = getOrdinal(23);
    expect(result).toEqual('rd');
  });

  it('should return "th" for 24', () => {
    const result = getOrdinal(24);
    expect(result).toEqual('th');
  });

  it('should return "th" for 100', () => {
    const result = getOrdinal(100);
    expect(result).toEqual('th');
  });

  it('should return "st" for 101', () => {
    const result = getOrdinal(101);
    expect(result).toEqual('st');
  });

  it('should return "nd" for 102', () => {
    const result = getOrdinal(102);
    expect(result).toEqual('nd');
  });

  it('should return "rd" for 103', () => {
    const result = getOrdinal(103);
    expect(result).toEqual('rd');
  });

  it('should return "th" for 104', () => {
    const result = getOrdinal(104);
    expect(result).toEqual('th');
  });
});