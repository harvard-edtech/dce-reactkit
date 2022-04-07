/**
 * Force a number to stay within specific bounds
 * @author Gabe Abrams
 * @param num the number to move into the bounds
 * @param min the minimum number in the bound
 * @param max the maximum number in the bound
 * @returns bounded number
 */
const forceNumIntoBounds = (num: number, min: number, max: number): number => {
  return Math.max(
    min,
    Math.min(
      max,
      num,
    ),
  );
};

export default forceNumIntoBounds;
