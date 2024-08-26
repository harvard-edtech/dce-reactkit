// List of lowercase words that must not be capitalized unless they're the
// first or last word of the input string
const lowerCaseWords: string[] = [
  'in', 'nor', 'of', 'on', 'or', 'as', 'at', 'but', 'by',
  'for', 'if', 'so', 'the', 'a', 'an', 'and', 'to', 'up',
  'yet',
];
/**
 * Converts a string to title case based on Chicago Title Case Style rules.
 * @author Leisha Bhandari
 * @param input The string that needs to be converted to Chicago title case.
 * @returns Input string converted to title case
 */
const toTitleCase = (input: string) => {
  return (
    input
      // The entire input string is converted to lowercase
      .toLowerCase()
      // Splits string into separate words
      .split(' ')
      .map((word, index, words) => {
        // Capitalize the first and last word, and any word that is not in the lowerCaseWords list
        return (
          (index === 0 || index === words.length - 1 || !lowerCaseWords.includes(word))
            ? `${word.charAt(0).toUpperCase()}${word.slice(1)}`
            : word
        );
      })
      // Join the words back
      .join(' ')
  );
};

export default toTitleCase;
