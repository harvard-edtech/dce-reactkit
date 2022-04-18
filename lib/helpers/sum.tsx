/**
 * Sum the numbers in an array
 * @author Gabe Abrams
 * @param nums the numbers to sum
 * @returns the sum of the numbers
 */
const sum = (nums: number[]): number => {
  return nums.reduce(
    (a: number, b: number) => {
      return (a + b);
    },
    0,
  );
};

export default sum;
