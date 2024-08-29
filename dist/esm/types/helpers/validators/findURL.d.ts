/**
 * This function finds URLs within a given string and returns an array of
 * their locations
 * @author Leisha Bhandari
 * @param text text to search for URLs
 * @returns list of found URLs
 */
declare const findURL: (text: string) => {
    startIndex: number;
    endIndex: number;
}[];
export default findURL;
