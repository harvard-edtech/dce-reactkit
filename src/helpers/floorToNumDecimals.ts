/**
 * Round a number (floor) to a certain number of decimals
 * @author Gabe Abrams
 * @param num the number to round
 * @param numDecimals the number of decimals to round to
 * @returns rounded number
 */
const floorToNumDecimals = (num: number, numDecimals: number): number => {
  const rounder = 10 ** numDecimals;
  return (Math.floor(num * rounder) / rounder);
};

export default floorToNumDecimals;
