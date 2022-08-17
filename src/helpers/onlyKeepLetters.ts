/**
 * Given a string, only keep the letters inside it
 * @author Gabe Abrams
 * @param str the string to parse
 * @returns only the letters inside of the string
 */
const onlyKeepLetters = (str: string): string => {
  return str.replace(/[^a-zA-Z]+/g, '');
};

export default onlyKeepLetters;
