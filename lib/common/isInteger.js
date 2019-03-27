import isFloat from './isFloat';

/**
 * Returns true if the string is an integer
 * @param {string} str - the string to check
 * @return {boolean} whether or not the string represents an integer
 */
export default (str => {
  // Attempt to match
  const matchSucceeded = String(str).match(/^-{0,1}\d+$/);
  if (matchSucceeded) {
    return true;
  }

  // Allow integers of form '1.'
  const newStr = str.endsWith('.') ? `${str}0` : str;

  // If no match, check if string represents an integer with decimals but all
  // of which are zeroes
  if (isFloat(newStr)) {
    return parseFloat(newStr) % 1 === 0;
  }
  return false;
});