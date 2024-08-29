// List of lowercase words that must not be capitalized unless they're the
// first or last word of the input string
const lowerCaseWords: string[] = [
  'in', 'nor', 'of', 'on', 'or', 'as', 'at', 'but', 'by',
  'for', 'if', 'so', 'the', 'a', 'an', 'and', 'to', 'up',
  'yet',
];
/**
 * Converts a string to title case based on Chicago Title Case Style rules
 * @author Leisha Bhandari
 * @param input the string that needs to be converted to title case
 * @returns input string converted to title case
 */
const toTitleCase = (input: string) => {
  return (
    input
      // Convert to lowercase
      .toLowerCase()
      // Splits into words
      .split(' ')
      // Capitalize appropriate words
      .map((word, index, words) => {
        return (
          (
            // Capitalize if first word...
            index === 0
            // ...or last word...
            || index === words.length - 1
            // ...or not in list of lowercase words
            || !lowerCaseWords.includes(word)
          )
            ? `${word.charAt(0).toUpperCase()}${word.substring(1)}`
            : word
        );
      })
      // Join the words back
      .join(' ')
  );
};

export default toTitleCase;
