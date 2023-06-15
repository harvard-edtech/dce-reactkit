/**
 * Reset the cached version of canReview
 * @author Gabe Abrams
 */
export declare const resetCanReviewCache: () => void;
/**
 * Check if the current user can review logs
 * @author Gabe Abrams
 * @returns true if current user can review logs
 */
declare const canReviewLogs: () => Promise<boolean>;
export default canReviewLogs;
