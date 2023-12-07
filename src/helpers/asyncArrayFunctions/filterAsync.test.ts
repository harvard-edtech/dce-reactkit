import filterAsync from './filterAsync';

describe('filterAsync', () => {
  it('should return an empty array when given an empty array', async () => {
    const result = await filterAsync(
      [],
      async () => {
        return true;
      },
    );
    expect(result).toEqual([]);
  });

  it('should return the original array when all items pass the filter', async () => {
    const originalArray = [1, 2, 3];
    const result = await filterAsync(
      originalArray,
      async () => {
        return true;
      },
    );
    expect(result).toEqual(originalArray);
  });

  it('should return an empty array when no items pass the filter', async () => {
    const originalArray = [1, 2, 3];
    const result = await filterAsync(
      originalArray,
      async () => {
        return false;
      },
    );
    expect(result).toEqual([]);
  });

  it('should return only the items that pass the filter', async () => {
    const originalArray = [1, 2, 3];
    const result = await filterAsync(
      originalArray,
      async (item) => {
        return item > 1;
      },
    );
    expect(result).toEqual([2, 3]);
  });

  it('should pass the correct index to the operator function', async () => {
    const originalArray = [1, 2, 3];
    const result = await filterAsync(
      originalArray,
      async (_, index) => {
        return index === 1;
      },
    );
    expect(result).toEqual([2]);
  });

  it('should allow breaking out of the loop early', async () => {
    const originalArray = [1, 2, 3];
    const result = await filterAsync(
      originalArray,
      async (_, index, { breakNow }) => {
        if (index === 1) {
          breakNow();
        }
        return true;
      },
    );
    expect(result).toEqual([1]);
  });

  it('should pass the original array to the operator function', async () => {
    const originalArray = [1, 2, 3];
    const result = await filterAsync(
      originalArray,
      async (_, index, { array }) => {
        return array.length === 3;
      },
    );
    expect(result).toEqual(originalArray);
  });

  it('should handle an operator function that returns a non-boolean value', async () => {
    const originalArray = [1, 2, 3];
    const result = await filterAsync(
      originalArray,
      async () => {
        return 'hello';
      },
    );
    expect(result).toEqual(originalArray);
  });

  it('should handle an operator function that throws an error', async () => {
    const originalArray = [1, 2, 3];
    let error: any = null;
    let result: number[] | null = null;
    try {
      result = await filterAsync(
        originalArray,
        async () => {
          throw new Error('Something went wrong');
        },
      );
    } catch (err) {
      error = err;
    }
    expect(result).toEqual(null);
    expect(error).not.toBe(null);
  });

  it('should handle an array of objects', async () => {
    const originalArray = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ];
    const result = await filterAsync(
      originalArray,
      async (item) => {
        return (item.age > 30);
      },
    );
    expect(result).toEqual([{ name: 'Charlie', age: 35 }]);
  });
});
