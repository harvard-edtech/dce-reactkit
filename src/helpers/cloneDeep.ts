import clone from 'nanoclone';

/**
 * Deeply clones an object
 * @author Yuen Ler Chow
 * @param obj the object to clone
 * @returns a deep clone of the object
 */
const cloneDeep: <T>(obj: T) => T = clone;

export default cloneDeep;
