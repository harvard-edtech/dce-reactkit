/**
 * Capitalize every word in a string (just the first letter)
 * @param str string to capitalize
 * @returns string with every word capitalized
 */
const capitalize = (str: string): string => {
  return (
    str
      // Split into words
      .split(' ')
      // Capitalize first letter of each word
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.substring(1);
      })
      // Join back together
      .join(' ')
  );
};

export default capitalize;
