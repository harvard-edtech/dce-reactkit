import sum from './sum';

/**
 * Get the average of a set of numbers
 * @author Gabe Abrams
 * @param nums the numbers to average
 * @returns average value or 0 if no numbers
 */
const avg = (nums: number[]) => {
  // Handle empty array case
  if (nums.length === 0) {
    return 0;
  }

  // Get the total value
  const total = sum(nums);

  // Get average
  return (total / nums.length);
};

export default avg;
