/**
 * Merges a list of class names into a class name, intelligently handling spaces
 * @author Gabe Abrams
 * @param classNames the list of class names to merge (or falsey values to
 *   ignore)
 * @returns the merged class name
 */
const combineClassNames = (classNames: (string | undefined | null | false)[]): string => {
  return (
    classNames
      // Turn falsey values into empty strings
      .map((className) => {
        return className || '';
      })
      // Trim whitespace
      .map((className) => {
        return className.trim();
      })
      // Remove empty class names
      .filter((className) => {
        return className.length > 0;
      })
      // Change multiple spaces for just one space
      .map((className) => {
        return className.replace(/\s+/g, ' ');
      })
      // Join with spaces
      .join(' ')
  );
};

export default combineClassNames;
