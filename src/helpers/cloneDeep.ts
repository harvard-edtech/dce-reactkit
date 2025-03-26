/**
 * Deep clones a JavaScript value, creating a completely new copy with no references
 * to the original object or any nested objects within it.
 *
 * Supports:
 * - Primitive values (number, string, boolean, null, undefined)
 * - Plain objects
 * - Arrays
 * - Dates
 * - Map and Set objects
 * - RegExp objects
 * - Circular references
 *
 * Note: Function properties will maintain their reference to the original function.
 *
 * @param value The value to clone
 * @returns A deep copy of the input value
 */
const cloneDeep = <T>(value: T): T => {
  // Use a WeakMap to track already cloned objects to handle circular references
  const seen = new WeakMap<object, unknown>();

  // Inner recursive function that uses the WeakMap to keep track of circular dependencies
  function cloneInner<U>(item: U): U {
    // Handle null, undefined, and primitives (they are immutable)
    if (item === null || item === undefined || typeof item !== 'object') {
      return item;
    }

    // If we've already cloned this object reference, return the existing clone
    if (seen.has(item as object)) {
      return seen.get(item as object) as U;
    }

    // Handle Date objects
    if (item instanceof Date) {
      return new Date(item.getTime()) as unknown as U;
    }

    // Handle RegExp objects
    if (item instanceof RegExp) {
      return new RegExp(item) as unknown as U;
    }

    // Handle Array objects
    if (Array.isArray(item)) {
      const clonedArray: unknown[] = [];

      // Add to seen map before recursing to handle circular references
      seen.set(item as object, clonedArray);

      // Clone array elements
      item.forEach((element, index) => {
        clonedArray[index] = cloneInner(element);
      });

      return clonedArray as unknown as U;
    }

    // Handle Map objects
    if (item instanceof Map) {
      const clonedMap = new Map();

      // Add to seen map before recursing to handle circular references
      seen.set(item as object, clonedMap);

      item.forEach((val, key) => {
        clonedMap.set(cloneInner(key), cloneInner(val));
      });

      return clonedMap as unknown as U;
    }

    // Handle Set objects
    if (item instanceof Set) {
      const clonedSet = new Set();

      // Add to seen map before recursing to handle circular references
      seen.set(item as object, clonedSet);

      item.forEach((val) => {
        clonedSet.add(cloneInner(val));
      });

      return clonedSet as unknown as U;
    }

    // Handle plain objects
    const clonedObj = Object.create(Object.getPrototypeOf(item));

    // Add to seen map before recursing to handle circular references
    seen.set(item as object, clonedObj);

    // Copy all enumerable own properties
    Object.entries(item as object).forEach(([key, val]) => {
      clonedObj[key] = cloneInner(val);
    });

    return clonedObj;
  }

  // Start the cloning process
  return cloneInner(value);
};

export default cloneDeep;
