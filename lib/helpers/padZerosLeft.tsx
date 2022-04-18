/**
 * Pad a number with zeros on the left (e.g. 5 becomes 05 with 2 digit padding)
 * @author Gabe Abrams
 * @param num the number to pad
 * @param numDigits the minimum number of digits before the decimal
 * @returns padded number
 */
const padZerosLeft = (num: number, numDigits: number): string => {
  // Convert to string
  let out = String(num);

  // Add zeros
  while (out.split('.')[0].length < numDigits) {
    out = `0${out}`;
  }

  // Return
  return out;
};

export default padZerosLeft;
