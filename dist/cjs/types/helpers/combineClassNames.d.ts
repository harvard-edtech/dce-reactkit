/**
 * Merges a list of class names into a class name, intelligently handling spaces
 * @author Gabe Abrams
 * @param classNames the list of class names to merge (or falsey values to
 *   ignore)
 * @returns the merged class name
 */
declare const combineClassNames: (classNames: (string | undefined | null | false)[]) => string;
export default combineClassNames;
