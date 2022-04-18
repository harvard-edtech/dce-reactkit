/**
 * Pad a number's decimal with zeros on the right
 *   (e.g. 5.2 becomes 5.20 with 2 digit padding)
 * @author Gabe Abrams
 * @param num the number to pad
 * @param numDigits the minimum number of digits after the decimal
 * @returns padded number
 */
const padDecimalZeros = (num: number, numDigits: number): string => {
  // Skip if nothing to do
  if (numDigits < 1) {
    return;
  }

  // Convert to string
  let out = String(num);

  // Add a decimal point if there isn't one
  if (!out.includes('.')) {
    out += '.';
  }

  // Add zeros
  while (out.split('.')[1].length < numDigits) {
    out = `${out}0`;
  }

  // Return
  return out;
};

export default padDecimalZeros;
