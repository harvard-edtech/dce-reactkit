import React from 'react';
/**
 * Given some text, make the links clickable
 * @author Gabe Abrams
 * @param text the text to process
 * @param [opts] options to customize behavior
 * @param [opts.newTab] if true, links will open in a new tab
 * @param [opts.preventPropagation] if true, clicks to link will prevent default
 *   and propagation
 * @returns the processed text
 */
declare const makeLinksClickable: (text: string, opts?: {
    newTab?: boolean;
    preventPropagation?: boolean;
}) => React.ReactNode;
export default makeLinksClickable;
