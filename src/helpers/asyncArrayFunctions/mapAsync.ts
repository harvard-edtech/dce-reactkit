/**
 * Run the operator function on each item in the array, collecting all results
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply
 * @returns the array of results
 */
const mapAsync = async <T, U>(
  array: T[],
  operatorFunction: (
    item: T,
    index: number,
    opts: {
      breakNow: () => void,
      array: Array<T>,
    },
  ) => Promise<U>,
): Promise<U[]> => {
  // Create break logic
  let done = false;
  /**
   * Break the loop
   * @author Gabe Abrams
   */
  const breakNow = () => {
    done = true;
  };

  // Loop through each item, collecting results
  const results: U[] = [];
  for (let i = 0; i < array.length && !done; i++) {
    const result = await operatorFunction(
      array[i],
      i,
      {
        breakNow,
        array,
      },
    );
    results.push(result);
  }

  // Return results
  return results;
};

export default mapAsync;
