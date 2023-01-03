/**
 * Perform a rudimentary parsing of the user's browser agent string
 * @author Gabe Abrams
 * @param userAgent the user's browser agent
 * @returns user info
 */
declare const parseUserAgent: (userAgent: string) => {
    browser: {
        name: string;
        version: string;
    };
    device: {
        isMobile: boolean;
        os: string;
    };
};
export default parseUserAgent;
