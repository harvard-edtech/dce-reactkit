// Sections are defined: [{title, items}]
export default (items) => {
  // Detect sections
  const isDividedIntoSections = (
    items
    && items.length > 0
    && items[0].title
    && items[0].items
    && items[0].items.length > 0
  );
  return (
    isDividedIntoSections
      ? items
      : [{ items }]
  );
};
