/**
 * Shorten text so it fits into a certain number of chars
 * @author Gabe Abrams
 * @param text the text to abbreviate
 * @param maxChars the maximum number of chars to include
 * @returns abbreviated text with length no greater than maxChars
 *   (including ellipses if applicable)
 */
const abbreviate = (text: string, maxChars: number): string => {
  // Check if already short enough
  if (text.trim().length < maxChars) {
    return text.trim();
  }

  // Abbreviate
  const shortenedText = (
    text
      .trim()
      .substring(0, maxChars - 3)
      .trim()
  );
  return `${shortenedText}...`;
};

export default abbreviate;
