// Constants
const VOWELS = ['a', 'e', 'i', 'o', 'u'];

/**
 * Prefix a word or name with "a" or "an" depending on whether it starts with a
 *   vowel or not
 * @author Gabe Abrams
 * @param text the text to prefix
 * @param capitalize whether to capitalize the "A" or "An"
 * @returns the text prefixed with "a" or "an"
 */
const prefixWithAOrAn = (text: string, capitalize = false): string => {
  // Get the first letter
  const firstLetter = text.charAt(0).toLowerCase();

  // Check if starts with vowel
  const startsWithVowel = VOWELS.includes(firstLetter);

  // Determine prefix
  let prefix = startsWithVowel ? 'an' : 'a';
  if (capitalize) {
    prefix = prefix.charAt(0).toUpperCase() + prefix.substring(1);
  }

  // Return the text prefixed with "a" or "an"
  return `${prefix} ${text}`;
};

export default prefixWithAOrAn;
