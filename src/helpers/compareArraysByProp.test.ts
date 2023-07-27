/**
 * Test file for the compareArraysByProp helper
 * @author Gabe Abrams
 */

// Import main helper
import compareArraysByProp from './compareArraysByProp';

describe('compareArraysByProp', () => {
  it('should return true for two empty arrays', () => {
    const result = compareArraysByProp([], [], 'id');
    expect(result).toEqual(true);
  });

  it('should return true for two arrays with the same objects in the same order', () => {
    const a = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];
    const b = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];
    const result = compareArraysByProp(a, b, 'id');
    expect(result).toEqual(true);
  });

  it('should return true for two arrays with the same objects in a different order', () => {
    const a = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];
    const b = [{ id: 3, name: 'Charlie' }, { id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    const result = compareArraysByProp(a, b, 'id');
    expect(result).toEqual(true);
  });

  it('should return false for two arrays with different objects', () => {
    const a = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];
    const b = [{ id: 4, name: 'Dave' }, { id: 5, name: 'Eve' }, { id: 6, name: 'Frank' }];
    const result = compareArraysByProp(a, b, 'id');
    expect(result).toEqual(false);
  });

  it('should return false for two arrays with different objects and some shared objects', () => {
    const a = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];
    const b = [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }, { id: 4, name: 'Dave' }];
    const result = compareArraysByProp(a, b, 'id');
    expect(result).toEqual(false);
  });

  it('should return true for two arrays with the same objects with multiple properties', () => {
    const a = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ];
    const b = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ];
    const result = compareArraysByProp(a, b, 'id');
    expect(result).toEqual(true);
  });

  it('should return true for two arrays with the same objects with multiple properties in a different order', () => {
    const a = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ];
    const b = [
      { id: 3, name: 'Charlie', age: 35 },
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
    ];
    const result = compareArraysByProp(a, b, 'id');
    expect(result).toEqual(true);
  });

  it('should return false for two arrays with different objects with multiple properties', () => {
    const a = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ];
    const b = [
      { id: 4, name: 'Dave', age: 40 },
      { id: 5, name: 'Eve', age: 45 },
      { id: 6, name: 'Frank', age: 50 },
    ];
    const result = compareArraysByProp(a, b, 'id');
    expect(result).toEqual(false);
  });

  it('should return false for two arrays with different objects with multiple properties and some shared objects', () => {
    const a = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ];
    const b = [
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
      { id: 4, name: 'Dave', age: 40 },
    ];
    const result = compareArraysByProp(a, b, 'id');
    expect(result).toEqual(false);
  });
});
