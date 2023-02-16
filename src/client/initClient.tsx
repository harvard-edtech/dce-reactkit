// Import other components
import { showFatalError } from '../components/AppWrapper';

// Import shared types
import ErrorWithCode from '../errors/ErrorWithCode';
import ReactKitErrorCode from '../types/ReactKitErrorCode';


/*----------------------------------------*/
/* ---------------- Types --------------- */
/*----------------------------------------*/

/**
 * Type of CACCL's send request function
 * @author Gabe Abrams
 */
type SendRequestFunction = (
  opts: {
    path: string;
    method: ('GET' | 'POST' | 'DELETE' | 'PUT');
    params?: {
      [x: string]: any;
    } | undefined;
    headers?: {
      [x: string]: any;
    } | undefined;
    numRetries?: number | undefined;
  },
) => Promise<{
  body: any;
  status: number;
  headers: {
    [x: string]: any;
  };
}>;

/*----------------------------------------*/
/* ---- Static Variables and Getters ---- */
/*----------------------------------------*/

/* ----------- Initialized ---------- */

let initialized = false;

/* ---------- Send Request ---------- */

let storedSendRequest: SendRequestFunction;

/**
 * Get the send request function
 * @author Gabe Abrams
 * @returns sendRequest function
 */
export const getSendRequest = () => {
  // Error if no send request function
  if (!initialized) {
    showFatalError(
      new ErrorWithCode(
        'Could not send a request because the request needed to be sent before dce-reactkit was properly initialized. Perhaps dce-reactkit was not initialized with initClient.',
        ReactKitErrorCode.NoCACCLSendRequestFunction,
      ),
    );

    // Return dummy function that never resolves
    return (
      () => {
        return new Promise(() => {});
      }
    ) as SendRequestFunction;
  }

  // Return
  return storedSendRequest;
};

/* ------------ Dark Mode ----------- */

let dark: boolean | undefined;

/**
 * Get the current dark/light theme
 * @author Gabe Abrams
 * @returns true if the app has a dark theme
 */
export const darkModeIsOn = () => {
  // Error if not set up yet
  if (!initialized) {
    showFatalError(
      new ErrorWithCode(
        'Could not check theme color because dce-reactkit was properly initialized. Perhaps dce-reactkit was not initialized with initClient.',
        ReactKitErrorCode.ThemeCheckedBeforeReactKitReady,
      ),
    );
    return false;
  }

  // Return
  return !!dark;
};

/* ----- Session Expired Message ---- */

let sessionExpiredMessage: string | undefined;

/**
 * Get the custom session expired message
 * @author Gabe Abrams
 * @returns session expired message
 */
export const getSessionExpiredMessage = () => {
  // Error if not set up yet
  if (!initialized) {
    showFatalError(
      new ErrorWithCode(
        'Could not get the session expired message because dce-reactkit was properly initialized. Perhaps dce-reactkit was not initialized with initClient.',
        ReactKitErrorCode.SessionExpiredMessageGottenBeforeReactKitReady,
      ),
    );
    return '';
  }

  // Return
  return (
    sessionExpiredMessage
    ?? 'Your session has expired. Please go back to Canvas and start over.'
  );
};

/*----------------------------------------*/
/* ---------------- Init ---------------- */
/*----------------------------------------*/

/**
 * Initialize the client-side version of reactkit
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.sendRequest caccl send request functions
 * @param [opts.dark] if true, the app is a dark-themed app
 * @param [opts.sessionExpiredMessage] a custom session expired message
 */
const initClient = (
  opts: {
    // Copy of CACCL's send request function
    sendRequest: SendRequestFunction,
    // True if this app is a dark-themed app
    dark?: boolean,
    // Custom session expired message
    sessionExpiredMessage?: string,
  },
) => {
  // Store values
  storedSendRequest = opts.sendRequest;
  dark = !!opts.dark;
  sessionExpiredMessage = opts.sessionExpiredMessage;

  // Mark as initialized
  initialized = true;
};

export default initClient;
