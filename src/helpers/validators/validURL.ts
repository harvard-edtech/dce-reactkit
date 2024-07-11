/**
 * This function checks if a given input string is a valid URL.
 * @author Leisha Bhandari
 * @param URL: The input string that needs checked as a URL or not.
 * @returns A true boolean value if the input string is a valid URL, and a false
 *          boolean value if the input string is a invalid URL
 */
function isValid(url: string): boolean {
  // Uses the input URL to create a URL object
  try {
    new URL(url);
    // URL constructor does not throw an error, so input URL is valid
    return true;
  } catch (err) {
    // URL constructor throws an error, so input URL is invalid
    return false;
  }
}