/**
 * Generate a static error page
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param [opts.title=An Error Occurred] title of the error box
 * @param [opts.description=An unknown server error occurred. Please contact support.]
 *   a human-readable description of the error
 * @param [opts.code=ReactKitErrorCode.NoCode] error code to show
 * @param [opts.pageTitle=opts.title] title of the page/tab if it differs from
 *   the title of the error
 * @returns html of the page
 */
declare const genErrorPage: (opts?: {
    title?: string;
    description?: string;
    code?: string;
    pageTitle?: string;
}) => string;
export default genErrorPage;
