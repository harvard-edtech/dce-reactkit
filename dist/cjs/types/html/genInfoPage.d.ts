/**
 * Generate a static info page
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.title title of the info box
 * @param opts.body a human-readable text body for the info alert
 * @returns the HTML for the info page
 */
declare const genInfoPage: (opts: {
    title: string;
    body: string;
}) => string;
export default genInfoPage;
