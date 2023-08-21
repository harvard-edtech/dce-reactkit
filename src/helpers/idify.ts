/**
 * Convert a string to hyphenated lowercase format with no space or
 *   non-alphanumeric characters
 * @author Gabe Abrams
 * @param str the string to convert
 * @returns the idified string
 */
const idify = (str: string): string => {
  return (
    str
      // Trim whitespace
      .trim()
      // Convert to lowercase
      .toLowerCase()
      // Replace non-alphanumeric characters with hyphens
      .replace(/[^a-z0-9]+/g, '-')
      // Change multiple hyphens in a row for a single hyphen
      .replace(/-+/g, '-')
      // Remove hyphens at the beginning and end of the string
      .replace(/^-+|-+$/g, '')
  );
};

export default idify;
