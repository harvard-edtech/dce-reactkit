// Import shared helpers
import extractProp from './extractProp';

/**
 * Compare two arrays of objects by only comparing the values in a specific
 *  property (e.g. compare user arrays by comparing their user.id values)
 * @author Gabe Abrams
 * @param a the first array
 * @param b the second array
 * @param prop the property to compare with
 * @returns true if the arrays contain the same objects as determined by
 *   the values associated with each object's prop
 */
const compareArraysByProp = (a: any[], b: any[], prop: string): boolean => {
  // Extract values for comparison
  const aVals = new Set(extractProp(a, prop));
  const bVals = new Set(extractProp(b, prop));

  // Compare sizes first
  if (aVals.size !== bVals.size) {
    return false;
  }

  // Same number of items. Make sure every object in aVals appears in bVals
  // (if so, they should be equivalent since the sizes are the same)
  // > Create map of items in bVals
  const inBVals: { [k: string]: boolean } = {}; // item => true if in bVals
  Array.from(bVals.values()).forEach((item) => {
    inBVals[item] = true;
  });
  // > Loop through aVals and make sure every item is in bVals
  return Array.from(aVals.values()).every((item) => {
    return inBVals[item];
  });
};

export default compareArraysByProp;
