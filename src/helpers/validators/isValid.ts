/**
 * This function checks if a given input string is a valid URL.
 * @author Leisha Bhandari
 * @param URL The input string that needs checked as a URL or not.
 * @returns A true boolean value if the input string is a valid URL, and a false
 *          boolean value if the input string is a invalid URL
 */
const isValid = (url: string): boolean => {
  try {
    const parsed = new URL(url);

    // Checks that the URL's protocol is valid
    if (!['https:', 'http:'].includes(parsed.protocol)) {
      return false;
    }
    // Checks that the hostname is not empty and doesn't start or end with a
    // dot and doesn't contain consecutive dots
    const hostname = parsed.hostname.trim();
    if (hostname.length === 0
      || hostname.startsWith('.')
      || hostname.endsWith('.')
      || hostname.includes('..')) {
      return false;
    }

    // Checks that if the port is given, it is a valid number
    if (parsed.port && Number.isNaN(Number.parseInt(parsed.port, 10))) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};

export default isValid;
