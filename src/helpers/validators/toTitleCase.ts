/**
 * Converts a string to title case based on Chicago Title Case Style rules.
 * @author Leisha Bhandari
 * @param input The string that needs to be converted to Chicago title case.
 * @returns Input string converted to title case
 */

const toTitleCase = (input: any): string => {
  // Check if there input is undefined, if so, throws an error
  if (input === undefined) throw new Error('Input is undefined');
  // Check if there input is null, if so, throws an error
  if (input === null) throw new Error('Input is null');
  // Check if there input is a string, if not, throw an error
  if (typeof input !== 'string') throw new Error('Input is a number. It must be a string');

  // List of lowercase words that must not be capitalized unless they're the
  // first or last word of the input string
  const lowerCaseWords: string[] = [
    'in', 'nor', 'of', 'on', 'or', 'as', 'at', 'but', 'by',
    'for', 'if', 'so', 'the', 'a', 'an', 'and', 'to', 'up',
    'yet',
  ];

  return input
  // The entire input string is converted to lowercase
    .toLowerCase()
    // Splits string into separate words
    .split(' ')
    .map((word, index, words) => {
      // Capitalize the first, last word, and any word in the input that is not a part of the lowercaseWords list
      return (index === 0 || index === words.length - 1 || !lowerCaseWords.includes(word)
        ? `${word.charAt(0).toUpperCase()}${word.slice(1)}`
        : word);
    })
    // Join the words back
    .join(' ');
};
export default toTitleCase;
