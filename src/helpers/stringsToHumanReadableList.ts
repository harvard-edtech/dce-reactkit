/**
 * Create a human readable list from an array of strings.
 *   For example, ['apple', 'orange'] becomes "apple and orange"
 *   and ['apple', 'orange', 'mango'] becomes "apple, orange, and mango"
 * @author Gabe Abrams
 * @param items list of items in the list
 * @returns human-readable list
 */
const stringsToHumanReadableList = (items: string[]): string => {
  // Handle 0-item case
  if (items.length === 0) {
    return '';
  }

  // Handle 1-item case
  if (items.length === 1) {
    return items[0];
  }

  // Handle 2-item case
  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  // Handle 3+ item case
  let list = '';
  items.forEach((item, i) => {
    if (i === items.length - 1) {
      // Last item
      list += `, and ${item}`;
    }

    // Previous items
    list += `, ${item}`;
  });
  return list;
};

export default stringsToHumanReadableList;
