/**
 * This function finds URLs within a given string and returns an array of
 * their locations
 * @author Leisha Bhandari
 * @param text text to search for URLs
 * @returns list of found URLs
 */
const findURL = (text: string): {
  startIndex: number,
  endIndex: number,
}[] => {
  const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*[^\s.,]/gi;
  // Array containing start and end indices of URLs
  const matches: {
    startIndex: number,
    endIndex: number,
  }[] = [];

  let match: RegExpExecArray | null;
  // Finds URLs in the block of texts using the URL regex constant
  // eslint-disable-next-line no-cond-assign
  while ((match = urlRegex.exec(text)) !== null) {
    // With every match, an object with the start and end index of the matched URL is pushed
    matches.push({
      startIndex: match.index,
      endIndex: match.index + match[0].length - 1,
    });
  }
  return matches;
};

export default findURL;
