const punctuationRegex = /[!@#$%^&*(),.?\/;:'"\-\[\]]/g;

/**
 * Get number of words in string 
 * @author Gardenia Liu
 * @author Allison Zhang
 * @author Gabe Abrams
 * @param text the string to check
 * @returns number of words in the string
 */
const getWordCount = (text: string): number => {
  const trimmedTextWithoutPunctuation = (
    text
      // Remove leading and trailing whitespace
      .trim()
      // Remove punctuation
      .replace(punctuationRegex, '')
  );
  if (trimmedTextWithoutPunctuation.length === 0) {
    return 0;
  }

  return trimmedTextWithoutPunctuation.split(/\s+/g).length;
};

export default getWordCount;
