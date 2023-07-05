/**
 * Round a number (ceiling) to a certain number of decimals
 * @author Gabe Abrams
 * @param num the number to round
 * @param numDecimals the number of decimals to round to
 * @returns rounded number
 */
const ceilToNumDecimals = (num: number, numDecimals: number): number => {
  const rounder = 10 ** numDecimals;
  return (Math.ceil(num * rounder) / rounder);
};

export default ceilToNumDecimals;
