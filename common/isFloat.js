/**
 * Returns true if a string is a float (not an integer)
 * @param {string} str - the string to check
 * @return {boolean} whether or not the string represents a float
 */
export default (str => {
  const match = String(str).match(/^-?\d*(\.\d+)?$/);
  // If no matches at all, this is not a float
  if (!match || match.length < 2) {
    return false;
  }
  // We found a match. Make sure it's a float
  return !!match[1];
});