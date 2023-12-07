/**
 * Run the operator function on each item in the array, returning a new array
 *   that only contains the items that pass the filter
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply. If it returns true
 *   for an item, the item will be included in the returned array
 * @returns the filtered array
 */
const filterAsync = async <T>(
  array: T[],
  operatorFunction: (
    item: T,
    index: number,
    opts: {
      breakNow: () => void,
      array: Array<T>,
    },
  ) => Promise<any>,
): Promise<T[]> => {
  // Create break logic
  let done = false;
  /**
   * Break the loop (filtering stops here)
   * @author Gabe Abrams
   */
  const breakNow = () => {
    done = true;
  };

  // Loop through each item, filtering
  const output: T[] = [];
  for (let i = 0; i < array.length && !done; i++) {
    const included = await operatorFunction(
      array[i],
      i,
      {
        breakNow,
        array,
      },
    );
    if (included && !done) {
      output.push(array[i]);
    }
  }

  // Return results
  return output;
};

export default filterAsync;
