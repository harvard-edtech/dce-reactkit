import forEachAsync from './forEachAsync';

describe('forEachAsync', () => {
  it('should call the operator function for each item in the array', async () => {
    const array = [1, 2, 3];
    const operatorFunction = jest.fn();

    await forEachAsync(array, operatorFunction);

    expect(operatorFunction).toHaveBeenCalledTimes(3);
    expect(operatorFunction).toHaveBeenCalledWith(1, 0, expect.any(Object));
    expect(operatorFunction).toHaveBeenCalledWith(2, 1, expect.any(Object));
    expect(operatorFunction).toHaveBeenCalledWith(3, 2, expect.any(Object));
  });

  it('should pass the correct arguments to the operator function', async () => {
    const array = ['a', 'b', 'c'];
    const operatorFunction = jest.fn();

    await forEachAsync(array, operatorFunction);

    expect(operatorFunction).toHaveBeenCalledTimes(3);
    expect(operatorFunction).toHaveBeenCalledWith('a', 0, expect.any(Object));
    expect(operatorFunction).toHaveBeenCalledWith('b', 1, expect.any(Object));
    expect(operatorFunction).toHaveBeenCalledWith('c', 2, expect.any(Object));
  });

  it('should allow the operator function to break out of the loop', async () => {
    const array = [1, 2, 3];
    const operatorFunction = jest.fn((item, index, { breakNow }) => {
      if (item === 2) {
        breakNow();
      }
    });

    await forEachAsync(array, operatorFunction);

    expect(operatorFunction).toHaveBeenCalledTimes(2);
    expect(operatorFunction).toHaveBeenCalledWith(1, 0, expect.any(Object));
    expect(operatorFunction).toHaveBeenCalledWith(2, 1, expect.any(Object));
  });

  it('should not call the operator function if the array is empty', async () => {
    const array: string[] = [];
    const operatorFunction = jest.fn();

    await forEachAsync(array, operatorFunction);

    expect(operatorFunction).not.toHaveBeenCalled();
  });

  it('should return undefined', async () => {
    const array = [1, 2, 3];
    const operatorFunction = jest.fn();

    const result = await forEachAsync(array, operatorFunction);

    expect(result).toBeUndefined();
  });

  it('should work with an array of objects', async () => {
    const array = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 40 },
    ];
    const operatorFunction = jest.fn();

    await forEachAsync(array, operatorFunction);

    expect(operatorFunction).toHaveBeenCalledTimes(3);
    expect(operatorFunction).toHaveBeenCalledWith(
      { name: 'Alice', age: 30 },
      0,
      expect.any(Object),
    );
    expect(operatorFunction).toHaveBeenCalledWith(
      { name: 'Bob', age: 25 },
      1,
      expect.any(Object),
    );
    expect(operatorFunction).toHaveBeenCalledWith(
      { name: 'Charlie', age: 40 },
      2,
      expect.any(Object),
    );
  });

  it('should work with an array of mixed types', async () => {
    const array = [1, 'two', { three: 3 }];
    const operatorFunction = jest.fn();

    await forEachAsync(array, operatorFunction);

    expect(operatorFunction).toHaveBeenCalledTimes(3);
    expect(operatorFunction).toHaveBeenCalledWith(1, 0, expect.any(Object));
    expect(operatorFunction).toHaveBeenCalledWith('two', 1, expect.any(Object));
    expect(operatorFunction).toHaveBeenCalledWith(
      { three: 3 },
      2,
      expect.any(Object),
    );
  });

  it('should work with an array of length 1', async () => {
    const array = ['a'];
    const operatorFunction = jest.fn();

    await forEachAsync(array, operatorFunction);

    expect(operatorFunction).toHaveBeenCalledTimes(1);
    expect(operatorFunction).toHaveBeenCalledWith('a', 0, expect.any(Object));
  });

  it('should work with an array of length 100', async () => {
    const array = Array.from({ length: 100 }, (_, i) => i);
    const operatorFunction = jest.fn();

    await forEachAsync(array, operatorFunction);

    expect(operatorFunction).toHaveBeenCalledTimes(100);
    expect(operatorFunction).toHaveBeenCalledWith(0, 0, expect.any(Object));
    expect(operatorFunction).toHaveBeenCalledWith(99, 99, expect.any(Object));
  });

  it('should work with an array of length 1000', async () => {
    const array = Array.from({ length: 1000 }, (_, i) => i);
    const operatorFunction = jest.fn();

    await forEachAsync(array, operatorFunction);

    expect(operatorFunction).toHaveBeenCalledTimes(1000);
    expect(operatorFunction).toHaveBeenCalledWith(0, 0, expect.any(Object));
    expect(operatorFunction).toHaveBeenCalledWith(999, 999, expect.any(Object));
  });
});
