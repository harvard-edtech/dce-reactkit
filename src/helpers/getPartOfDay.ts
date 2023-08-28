/**
 * Get the current part of day (morning, evening, etc.)
 * @author Gabe Abrams
 * @returns the part of day (morning, evening, etc.)
 */
const getPartOfDay = () => {
  // Setup the post-it time of day
  let partOfDay = 'day';
  const hours = new Date().getHours();
  if (hours < 12) {
    partOfDay = 'morning';
  } else if (hours >= 12 && hours <= 16) {
    partOfDay = 'afternoon';
  } else if (hours > 16 && hours <= 24) {
    partOfDay = 'evening';
  }
  return partOfDay;
};

export default getPartOfDay;
