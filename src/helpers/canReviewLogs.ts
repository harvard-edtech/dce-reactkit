// Import shared helpers
import visitServerEndpoint from './visitServerEndpoint';

// Import shared constants
import LOG_REVIEW_STATUS_ROUTE from '../constants/LOG_REVIEW_STATUS_ROUTE';

/*------------------------------------------------------------------------*/
/* -------------------------------- Cache ------------------------------- */
/*------------------------------------------------------------------------*/

// Cache user's ability
let canReview: boolean | undefined;

/*------------------------------------------------------------------------*/
/* ---------------------------- Other Helpers --------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Reset the cached version of canReview
 * @author Gabe Abrams
 */
export const resetCanReviewCache = () => {
  canReview = undefined;
};

/*------------------------------------------------------------------------*/
/* -------------------------------- Main -------------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Check if the current user can review logs
 * @author Gabe Abrams
 * @returns true if current user can review logs
 */
const canReviewLogs = async (): Promise<boolean> => {
  // If cached, use that value
  if (canReview !== undefined) {
    return canReview;
  }

  // Ask on server
  try {
    canReview = !!(await visitServerEndpoint({
      path: LOG_REVIEW_STATUS_ROUTE,
      method: 'GET',
    }));
  } catch (err) {
    canReview = false;
  }
  return canReview;
};

export default canReviewLogs;
