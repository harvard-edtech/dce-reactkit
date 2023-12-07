/**
 * Run the operator function on each item in the array
 * @author Gabe Abrams
 * @param operatorFunction the operator function to apply
 */
const forEachAsync = async <T>(
  array: T[],
  operatorFunction: (
    item: T,
    index: number,
    opts: {
      breakNow: () => void,
      array: Array<T>,
    },
  ) => void,
) => {
  // Create break logic
  let done = false;
  /**
   * Break the loop
   * @author Gabe Abrams
   */
  const breakNow = () => {
    done = true;
  };

  // Loop through each item
  for (let i = 0; i < array.length && !done; i++) {
    await operatorFunction(
      array[i],
      i,
      {
        breakNow,
        array,
      },
    );
  }
};

export default forEachAsync;
