// Given an option to be displayed in a list, infer the title of the option
// Supports course, assignment, quiz, etc. types of Canvas objects
export default (sections) => {
  return sections.map((section) => {
    const newSection = section;

    // Add titles, subtitles
    newSection.items = section.items.map((item) => {
      const newItem = item;

      // Add basic title fields
      newItem.title = (
        item.title
        || item.name
        || item.description
      );

      // Add user-based titles
      if (
        !newItem.title
        && (item.user && item.user.name)
      ) {
        newItem.title = item.user.name;
      }

      // Add default title if no other title is added
      if (!newItem.title) {
        newItem.title = 'Untitled Option';
      }

      return newItem;
    });

    return newSection;
  });
};
