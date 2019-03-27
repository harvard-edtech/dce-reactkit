import isFloat from './isFloat';

export default (str) => {
  const matchSucceeded = String(str).match(/^-{0,1}\d+$/);
  if (matchSucceeded) {
    return true;
  }
  // If no match, check if string represents an integer with decimals but all
  // of which are zeroes
  if (isFloat(str)) {
    return (parseFloat(str) % 1) === 0;
  }
  return false;
};
