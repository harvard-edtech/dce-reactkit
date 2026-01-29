// Import commonkit
import {
  SELECT_ADMIN_CHECK_ROUTE,
} from 'dce-commonkit';

// Import shared helpers
import visitServerEndpoint from './visitServerEndpoint';

/*------------------------------------------------------------------------*/
/* ------------------------------- Caching ------------------------------ */
/*------------------------------------------------------------------------*/

// If true, user is a select admin
let cachedUserIsSelectAdmin: boolean | undefined;

/*------------------------------------------------------------------------*/
/* -------------------------------- Main -------------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Checks if the current user is a select admin
 * @author Gardenia Liu
 * @returns true if the user is a select admin, false otherwise
 */
const isSelectAdmin = async (): Promise<boolean> => {
  // Use cached version if we have one
  if (cachedUserIsSelectAdmin !== undefined) {
    return cachedUserIsSelectAdmin;
  }

  // Check if the user is a select admin
  try {
    const userIsSelectAdmin: boolean = await visitServerEndpoint({
      path: SELECT_ADMIN_CHECK_ROUTE,
      method: 'GET',
    });

    // Cache the result
    cachedUserIsSelectAdmin = !!userIsSelectAdmin;

    // Return the result
    return userIsSelectAdmin;
  } catch (err) {
    // Error means the user isn't a select admin
    cachedUserIsSelectAdmin = false;
    return false;
  }
};

export default isSelectAdmin;
