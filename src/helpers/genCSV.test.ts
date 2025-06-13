/**
 * Test file for the genCSV helper
 * @author Gabe Abrams
 */

// Import main helper
import genCSV from './genCSV';

describe('genCSV', () => {
  it('should return an empty string for empty data', () => {
    const result = genCSV([], []);
    expect(result).toEqual('');
  });

  it('should generate a CSV with the correct headers and data', () => {
    const columns = [
      { title: 'Name', param: 'name' },
      { title: 'Age', param: 'age' },
      { title: 'Email', param: 'email' },
    ];
    const data = [
      { name: 'Alice', age: 25, email: 'alice@example.com' },
      { name: 'Bob', age: 30, email: 'bob@example.com' },
      { name: 'Charlie', age: 35, email: 'charlie@example.com' },
    ];
    const expected = 'Name,Age,Email\nAlice,25,alice@example.com\nBob,30,bob@example.com\nCharlie,35,charlie@example.com';
    const result = genCSV(data, columns);
    expect(result).toEqual(expected);
  });

  it('should handle undefined and null values correctly', () => {
    const columns = [
      { title: 'Name', param: 'name' },
      { title: 'Age', param: 'age' },
      { title: 'Email', param: 'email' },
    ];
    const data = [
      { name: 'Alice', age: undefined, email: null },
      { name: 'Bob', age: null, email: 'bob@example.com' },
      { name: 'Charlie', age: 35, email: undefined },
    ];
    const expected = 'Name,Age,Email\nAlice,,\nBob,,bob@example.com\nCharlie,35,';
    const result = genCSV(data, columns);
    expect(result).toEqual(expected);
  });

  it('should handle objects in cells correctly', () => {
    const columns = [
      { title: 'Name', param: 'name' },
      { title: 'Data', param: 'data' },
    ];
    const data = [
      { name: 'Alice', data: { foo: 'bar' } },
      { name: 'Bob', data: [1, 2, 3] },
      { name: 'Charlie', data: null },
    ];
    const expected = 'Name,Data\nAlice,"{""foo"":""bar""}"\nBob,"[1,2,3]"\nCharlie,';
    const result = genCSV(data, columns);
    expect(result).toEqual(expected);
  });

  it('should use textIfUndefined for undefined values', () => {
    const columns = [
      { title: 'Name', param: 'name' },
      { title: 'Age', param: 'age', textIfUndefined: 'N/A' },
    ];
    const data = [
      { name: 'Alice', age: undefined },
      { name: 'Bob', age: 30 },
    ];
    const expected = 'Name,Age\nAlice,N/A\nBob,30';
    const result = genCSV(data, columns);
    expect(result).toEqual(expected);
  });
});
