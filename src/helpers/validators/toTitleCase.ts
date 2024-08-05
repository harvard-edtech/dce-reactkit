/**
 * Converts a string to title case based on Chicago Title Case Style rules.
 * @author Leisha Bhandari
 * @param input The string that needs to be converted to Chicago title case.
 * @returns Input string converted to title case
 */

const toTitleCase = (input: any): string => {
  if (input === undefined) throw new Error('Input is undefined');
  if (input === null) throw new Error('Input is null');
  if (typeof input !== 'string') throw new Error('Input is a number. It must be a string');

  const lowerCaseWords: string[] = [
    'in', 'nor', 'of', 'on', 'or', 'as', 'at', 'but', 'by',
    'for', 'if', 'so', 'the', 'a', 'an', 'and', 'to', 'up',
    'yet'
  ];

  return input
    .toLowerCase()
    .split(' ')
    .map((word, index, words) => {
      return (index === 0 || index === words.length - 1 || !lowerCaseWords.includes(word)
        ? `${word.charAt(0).toUpperCase()}${word.slice(1)}`
        : word);
    })
    .join(' ');
};

export default toTitleCase;
