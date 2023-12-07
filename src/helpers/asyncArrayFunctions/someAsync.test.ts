import waitMs from '../waitMs';
import someAsync from './someAsync';

describe('someAsync', () => {
  it('should return false if the array is empty', async () => {
    const result = await someAsync([], () => {
      return Promise.resolve(true);
    });
    expect(result).toBe(false);
  });

  it('should return false if the operator function returns false for all items', async () => {
    const array = [1, 2, 3, 4, 5];
    const result = await someAsync(array, () => {
      return Promise.resolve(false);
    });
    expect(result).toBe(false);
  });

  it('should return true if the operator function returns true for any item', async () => {
    const array = [1, 2, 3, 4, 5];
    const result = await someAsync(array, (item) => {
      return Promise.resolve(item === 3);
    });
    expect(result).toBe(true);
  });

  it('should pass the correct index to the operator function', async () => {
    const array = [1, 2, 3, 4, 5];
    const result = await someAsync(array, (item, index) => {
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(array.length);
      return Promise.resolve(false);
    });
    expect(result).toBe(false);
  });

  it('should pass the correct array to the operator function', async () => {
    const array = [1, 2, 3, 4, 5];
    const result = await someAsync(array, (item, index, { array: arr }) => {
      expect(arr).toBe(array);
      return Promise.resolve(false);
    });
    expect(result).toBe(false);
  });

  it('should stop iterating and return true if the operator function returns true for an item and breakNow is called', async () => {
    const array = [1, 2, 3, 4, 5];
    const result = await someAsync(array, (item, index, { breakNow }) => {
      if (item === 3) {
        breakNow();
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    });
    expect(result).toBe(true);
  });

  it('should handle asynchronous operator function', async () => {
    const array = [1, 2, 3, 4, 5];
    const result = await someAsync(array, async (item) => {
      await waitMs(100);
      return Promise.resolve(item === 3);
    });
    expect(result).toBe(true);
  });

  it('should handle rejected promises from the operator function', async () => {
    const array = [1, 2, 3, 4, 5];
    const result = await someAsync(array, () => {
      return Promise.reject(new Error('Test error'));
    });
    expect(result).toBe(false);
  });

  it('should handle thrown errors from the operator function', async () => {
    const array = [1, 2, 3, 4, 5];
    const result = await someAsync(array, () => {
      throw new Error('Test error');
    });
    expect(result).toBe(false);
  });

  it('should handle empty array and asynchronous operator function', async () => {
    const array: number[] = [];
    const result = await someAsync(array, async () => {
      await waitMs(100);
      return Promise.resolve(false);
    });
    expect(result).toBe(false);
  });
});
