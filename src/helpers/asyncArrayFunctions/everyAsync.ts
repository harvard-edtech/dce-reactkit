/**
 * Run the operator function on each item in the array, returning true if
 *   the operator function returns true for every item in the array
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply. If it returns true
 *   for every item, this function will return true
 * @returns true if the operator function returns true for every item in the array
 */
const everyAsync = async <T>(
  array: T[],
  operatorFunction: (
    item: T,
    index: number,
    opts: {
      breakNow: () => void,
      array: Array<T>,
    },
  ) => Promise<any>,
): Promise<boolean> => {
  // Create break logic
  let done = false;
  /**
   * Break the loop (checking stops here)
   * @author Gabe Abrams
   */
  const breakNow = () => {
    done = true;
  };

  // Loop through each item, checking
  for (let i = 0; i < array.length && !done; i++) {
    const passed = await operatorFunction(
      array[i],
      i,
      {
        breakNow,
        array,
      },
    );

    // Check if this one failed or if loop was broken
    if (!passed || done) {
      return false;
    }
  }

  // Return true because none returned false
  return true;
};

export default everyAsync;
