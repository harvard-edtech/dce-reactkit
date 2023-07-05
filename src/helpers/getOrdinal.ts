// Constants
const ORDINALS = ['th', 'st', 'nd', 'rd'];

/**
 * Get a number's ordinal
 * @author Gabe Abrams
 * @param num the number being analyzed
 * @returns ordinal
 */
const getOrdinal = (num: number): string => {
  return (ORDINALS[(num - 20) % 10] ?? ORDINALS[num] ?? ORDINALS[0]);
};

export default getOrdinal;
