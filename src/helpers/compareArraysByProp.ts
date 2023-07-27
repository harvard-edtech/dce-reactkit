/**
 * Compare two arrays of objects by only comparing the values in a specific
 *  property (e.g. compare user arrays by comparing their user.id values)
 * @author Gabe Abrams
 * @param a the first array
 * @param b the second array
 * @param prop the property to compare with, or an array of props to compare
 *   with (if array, all values associated with those props must match)
 * @returns true if the arrays contain the same objects as determined by
 *   the values associated with each object's prop
 */
const compareArraysByProp = (
  a: any[],
  b: any[],
  prop: string | string[],
): boolean => {
  // Immediately return if size of arrays is different
  if (a.length !== b.length) {
    return false;
  }

  // Get all props
  const props = (Array.isArray(prop) ? prop : [prop]);

  // Clone second array so we can work on it
  const bCloned = [...b];

  // Remove elements from b as we find them in a
  for (let i = 0; i < a.length; i++) {
    // Find matching element in b
    const matchingIndex = bCloned.findIndex((bItem) => {
      // Compare based on all props
      return props.every((propToCompareBy) => {
        const aVal = (a[i] ?? {})[propToCompareBy];
        const bVal = (bItem ?? {})[propToCompareBy];
        return aVal === bVal;
      });
    });

    // Check if no match
    const noMatch = (matchingIndex < 0);

    // If no match, there's no corresponding element in b
    if (noMatch) {
      return false;
    }

    // Remove the matching element
    bCloned.splice(matchingIndex, 1);
  }

  // If we made it here, all elements in a have a corresponding element in b
  return true;
};

export default compareArraysByProp;
