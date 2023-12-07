// Import item to test
import everyAsync from './everyAsync';

describe('everyAsync', () => {
  it('returns true for an empty array', async () => {
    const result = await everyAsync(
      [],
      async () => {
        return true;
      },
    );
    expect(result).toBe(true);
  });

  it('returns true if the operator function returns true for every item in the array', async () => {
    const result = await everyAsync(
      [1, 2, 3],
      async (item) => {
        return item > 0;
      },
    );
    expect(result).toBe(true);
  });

  it('returns false if the operator function returns false for any item in the array', async () => {
    const result = await everyAsync(
      [1, 2, 3],
      async (item) => {
        return item > 1;
      },
    );
    expect(result).toBe(false);
  });

  it('passes the index as the second argument to the operator function', async () => {
    const result = await everyAsync(
      [1, 2, 3],
      async (item, index) => {
        return index === item - 1;
      },
    );
    expect(result).toBe(true);
  });

  it('passes an object with a breakNow function and the array as the third argument to the operator function', async () => {
    const result = await everyAsync(
      [1, 2, 3],
      async (item, index, { breakNow }) => {
        if (item === 2) {
          breakNow();
        }
        return true;
      },
    );
    expect(result).toBe(false);
  });

  it('stops iterating if the operator function calls the breakNow function', async () => {
    const mockOperatorFunction = jest.fn(async (item, index, { breakNow }) => {
      if (item === 2) {
        breakNow();
      }
      return true;
    });
    const result = await everyAsync(
      [1, 2, 3],
      mockOperatorFunction,
    );
    expect(result).toBe(false);
    expect(mockOperatorFunction).toHaveBeenCalledTimes(2);
  });

  it('handles an operator function that returns a promise that resolves to true', async () => {
    const result = await everyAsync(
      [1, 2, 3],
      async (item) => {
        return Promise.resolve(item > 0);
      },
    );
    expect(result).toBe(true);
  });

  it('handles an operator function that returns a promise that resolves to false', async () => {
    const result = await everyAsync(
      [1, 2, 3],
      async (item) => {
        return Promise.resolve(item > 1);
      },
    );
    expect(result).toBe(false);
  });

  it('handles an operator function that throws an error', async () => {
    const mockOperatorFunction = jest.fn(async (item) => {
      if (item === 2) {
        throw new Error('Test error');
      }
      return true;
    });
    let error: any = null;
    let result: boolean | null = null;
    try {
      result = await everyAsync(
        [1, 2, 3],
        mockOperatorFunction,
      );
    } catch (err) {
      error = err;
    }
    expect(result).toBe(null);
    expect(error).not.toBe(null);
    expect(mockOperatorFunction).toHaveBeenCalledTimes(2);
  });
});
