/**
 * This function finds URLs within a given string and returns an array of
 * their locations.
 * @author Leisha Bhandari
 * @param block The block of text to search for URLs
 * @returns Arrays where each of them contain the start and end index of the URL
 */
const findURL = (block: string) => {
  const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*[^\s.,]/gi;
  // Array containing start and end indices of URLs
  const matches = [];
  let match;
  // Finds URLs in the block of texts using the URL regex constant
  // eslint-disable-next-line no-cond-assign
  while ((match = urlRegex.exec(block)) !== null) {
    // With every match, an object with the start and end index of the matched URL is pushed
    matches.push({
      startIndice: match.index,
      endIndice: match.index + match[0].length - 1,
    });
  }
  return matches;
};

export default findURL;
