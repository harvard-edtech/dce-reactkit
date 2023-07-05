/**
 * Test file for the extractProp helper
 * @author Gabe Abrams
 */

// Import main helper
import extractProp from './extractProp';

describe('extractProp', () => {
  it('should return an empty array if the input array is empty', () => {
    const result = extractProp([], 'age');
    expect(result).toEqual([]);
  });

  it('should extract the correct property from each object in the array', () => {
    const users = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 35 },
    ];
    const result = extractProp(users, 'age');
    expect(result).toEqual([25, 30, 35]);
  });

  it('should return undefined for objects that do not have the specified property', () => {
    const users = [
      { name: 'Alice', age: 25 },
      { name: 'Bob' },
      { name: 'Charlie', age: 35 },
    ];
    const result = extractProp(users, 'age');
    expect(result).toEqual([25, undefined, 35]);
  });
});