import SELECT_ADMIN_CHECK_ROUTE from '../constants/SELECT_ADMIN_CHECK_ROUTE';
import visitServerEndpoint from './visitServerEndpoint';

/*------------------------------------------------------------------------*/
/* ------------------------------- Caching ------------------------------ */
/*------------------------------------------------------------------------*/

// True if user is a select admin
let cachedResult: boolean | undefined;

/*------------------------------------------------------------------------*/
/* -------------------------------- Main -------------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Checks if the current user is a select admin
 * @author Gardenia Liu
 * @returns true if the user is a select admin, false otherwise
 */
const isSelectAdmin = async (): Promise<boolean> => {
  if (cachedResult !== undefined) {
    return cachedResult;
  }

  try {
    let check = false;
    check = await visitServerEndpoint({
      path: SELECT_ADMIN_CHECK_ROUTE,
      method: 'GET',
    });
    cachedResult = check;
    return check;
  } catch (err) {
    cachedResult = false;
    return false;
  }
};

export default isSelectAdmin;
