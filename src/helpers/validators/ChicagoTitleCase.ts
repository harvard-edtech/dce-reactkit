/**
 * This function converts a string to title case based on Chicago Title Case 
 * Style rules.
 * @author Leisha Bhandari
 * @param input: The input string that needs to be converted to Chicago title
 *               case.
 * @returns Input string converted to title case
 */


const chicagoTitleCase = (input: string): string => {
   // List of lowercase words according to Chicago Manual of Style
  const lowerCaseWords: string[] = [
    'in', 'nor', 'of', 'on', 'or', 'as', 'at', 'but', 'by',
    'for', 'if', 'so', 'the', 'a', 'an', 'and', 'to', 'up',
    'yet'
  ];

  return input
    // Converts given input string to lowercase
    .toLowerCase() 
    // Splits the given string into separate words
    .split(' ') 
    .map((word, index, words) => 
      // Capitalize the first word, last word, and the words that aren't
      // in lowerCaseWords
      index === 0 || !lowerCaseWords.includes(word) || index === words.length - 1
        ? `${word.charAt(0).toUpperCase()}${word.slice(1)}` // Capitalize the first letter
        : word // Nothing happens to the word
    )
    .join(' '); // Joins the words back 
};