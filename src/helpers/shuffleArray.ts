/**
 * Shuffle a given array
 * @author Austen Money
 * @param arr the array to shuffle
 * @returns the shuffled array
 */
const shuffleArray = <T>(arr: T[]): T[] => {
  const newArr = [...arr];

  // Shuffle using Durstenfeld algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
};

export default shuffleArray;
