/**
 * Shorten text so it fits into a certain number of chars
 * @author Gabe Abrams
 * @param text the text to abbreviate
 * @param maxChars the maximum number of chars to include
 * @returns abbreviated text with length no greater than maxChars
 *   (including ellipses if applicable)
 */
var abbreviate = function (text, maxChars) {
    // Check if already short enough
    if (text.trim().length < maxChars) {
        return text.trim();
    }
    // Abbreviate
    var shortenedText = (text
        .trim()
        .substring(0, maxChars - 3)
        .trim());
    return "".concat(shortenedText, "...");
};
//# sourceMappingURL=abbreviate.js.map