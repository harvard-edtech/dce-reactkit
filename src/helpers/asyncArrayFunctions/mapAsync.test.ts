import waitMs from '../waitMs';
import mapAsync from './mapAsync';

describe('mapAsync', () => {
  it('should return an empty array when given an empty array', async () => {
    const result = await mapAsync([], async () => {
      // Operator function logic goes here
    });

    expect(result).toEqual([]);
  });

  it('should apply the operator function to each item in the array', async () => {
    const array = [1, 2, 3];
    const operatorFunction = jest.fn();

    await mapAsync(array, operatorFunction);

    expect(operatorFunction).toHaveBeenCalledTimes(3);
    expect(operatorFunction).toHaveBeenCalledWith(1, 0, expect.any(Object));
    expect(operatorFunction).toHaveBeenCalledWith(2, 1, expect.any(Object));
    expect(operatorFunction).toHaveBeenCalledWith(3, 2, expect.any(Object));
  });

  it('should collect and return the results of the operator function', async () => {
    const array = [1, 2, 3];
    const operatorFunction = async (item: number) => {
      return item * 2;
    };

    const result = await mapAsync(array, operatorFunction);

    expect(result).toEqual([2, 4, 6]);
  });

  it('should pass the correct index to the operator function', async () => {
    const array = [1, 2, 3];
    const operatorFunction = jest.fn();

    await mapAsync(array, operatorFunction);

    expect(operatorFunction).toHaveBeenCalledWith(expect.anything(), 0, expect.any(Object));
    expect(operatorFunction).toHaveBeenCalledWith(expect.anything(), 1, expect.any(Object));
    expect(operatorFunction).toHaveBeenCalledWith(expect.anything(), 2, expect.any(Object));
  });

  it('should pass the correct options object to the operator function', async () => {
    const array = [1, 2, 3];
    const operatorFunction = jest.fn();

    await mapAsync(array, operatorFunction);

    expect(operatorFunction).toHaveBeenCalledWith(expect.anything(), expect.anything(), {
      breakNow: expect.any(Function),
      array: expect.any(Array),
    });
  });

  it('should allow the operator function to break the loop', async () => {
    const array = [1, 2, 3];

    const result = await mapAsync(
      array,
      async (
        item,
        index,
        { breakNow },
      ) => {
        if (item === 2) {
          breakNow();
        }
        return item;
      },
    );

    expect(result).toEqual([1]);
  });

  it('should handle asynchronous operator function', async () => {
    const array = [1, 2, 3];
    const result = await mapAsync(
      array,
      async (item) => {
        await waitMs(1000);
        return item * 2;
      },
    );

    expect(result).toEqual([2, 4, 6]);
  });

  it('should handle errors thrown by the operator function', async () => {
    const array = [1, 2, 3];

    await expect(
      mapAsync(
        array,
        async (item) => {
          if (item === 2) {
            throw new Error('Error processing item');
          }
          return item * 2;
        },
      ),
    ).rejects.toThrow('Error processing item');
  });

  it('should handle empty array with breakNow called', async () => {
    const array: number[] = [];

    const result = await mapAsync(
      array,
      async (
        item,
        index,
        { breakNow },
      ) => {
        breakNow();
        return item;
      },
    );

    expect(result).toEqual([]);
  });
});
