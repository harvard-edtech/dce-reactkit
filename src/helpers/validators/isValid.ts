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
    if (!['https:', 'http:', 'file:', 'ftp:'].includes(parsed.protocol)) {
      return false;
    }

    // Checks that the hostname is not empty and doesn't start with a dot
    if (!parsed.hostname || parsed.hostname.startsWith('.')) {
      return false;
    }

    // Checks that the hostname is not empty and doesn't end with a dot
    if (!parsed.hostname || parsed.hostname.endsWith('.')) {
      return false;
    }

    // Checks that the URL doesn't have consecutive periods in the hostname
    if (/(\.\.)/.test(parsed.hostname)) {
      return false;
    }

    // Checks that the hostname is not just numbers
    if (!parsed.hostname || parsed.hostname.endsWith('.') || /^\d+$/.test(parsed.hostname)) {
      return false;
    }

    // Checks that if the port is given, it is a valid number
    if (parsed.port && !/^\d+$/.test(parsed.port)) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

export default isValid;
