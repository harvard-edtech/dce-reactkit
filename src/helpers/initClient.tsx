// Import commonkit
import {
  waitMs,
  ErrorWithCode,
  CommonKitErrorCode,
} from 'dce-commonkit';

// Import other components
// TODO: fix dependency cycle
// eslint-disable-next-line import/no-cycle
import { showFatalError } from '../components/AppWrapper';

/*----------------------------------------*/
/* ---------------- Types --------------- */
/*----------------------------------------*/

/**
 * Type of CACCL's send request function
 * @author Gabe Abrams
 */
type SendRequestFunction = (
  opts: {
    path: string,
    method: ('GET' | 'POST' | 'DELETE' | 'PUT'),
    params?: {
      [x: string]: any
    } | undefined,
    headers?: {
      [x: string]: any,
    } | undefined,
    numRetries?: number | undefined,
  },
) => Promise<{
  body: any,
  status: number,
  headers: {
    [x: string]: any
  },
}>;

/*----------------------------------------*/
/* ---- Static Variables and Getters ---- */
/*----------------------------------------*/

/* ----------- Initialized ---------- */

let onInitialized: (a: unknown) => void;
const initialized = new Promise((resolve) => {
  onInitialized = resolve;
});

/* ------------ No Server ----------- */

let noServer = false;

/**
 * Check if there is no server for this app
 * @author Gabe Abrams
 */
export const appHasNoServer = () => {
  return noServer;
};

/* ---------- Send Request ---------- */

let storedSendRequest: SendRequestFunction;

/**
 * Get the send request function
 * @author Gabe Abrams
 * @returns sendRequest function
 */
export const getSendRequest = async () => {
  // Show timeout error if too much time passes
  let successful = false;
  (async () => {
    await waitMs(5000);

    if (!successful) {
      showFatalError(
        new ErrorWithCode(
          'Could not send a request because the request needed to be sent before dce-reactkit was properly initialized. Perhaps dce-reactkit was not initialized with initClient.',
          CommonKitErrorCode.NoCACCLSendRequestFunction,
        ),
      );
    }
  })();

  // Wait for initialization
  await initialized;
  successful = true;

  // Return
  return storedSendRequest;
};

/* ----- Session Expired Message ---- */

let sessionExpiredMessage: string | undefined;

/**
 * Get the custom session expired message
 * @author Gabe Abrams
 * @returns session expired message
 */
export const getSessionExpiredMessage = () => {
  // Return
  return (
    sessionExpiredMessage
    ?? 'Your session has expired. Please go back to Canvas and start over.'
  );
};

/* ------------ Dark Mode ----------- */

let darkModeOn = false;

/**
 * Get whether dark mode is enabled or not
 * @returns true if dark mode is enabled
 */
export const isDarkModeOn = () => {
  return darkModeOn;
};

/*----------------------------------------*/
/* ---------------- Init ---------------- */
/*----------------------------------------*/

/**
 * Initialize the client-side version of reactkit
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.sendRequest caccl send request functions
 * @param [opts.sessionExpiredMessage] a custom session expired message
 * @param [opts.darkModeOn] if true, dark mode is enabled
 * @param [opts.noServer] if true, there is no server for this app
 */
const initClient = (
  opts: (
    | {
      // Copy of CACCL's send request function
      sendRequest: SendRequestFunction,
      // Custom session expired message
      sessionExpiredMessage?: string,
      // If true, dark mode is enabled
      darkModeOn?: boolean,
      // If true, there is no server for this app
      noServer?: false,
    }
    | {
      // If true, dark mode is enabled
      darkModeOn?: boolean,
      // If true, there is no server for this app
      noServer: true
      // Copy of CACCL's send request function
      sendRequest?: undefined,
      // Custom session expired message
      sessionExpiredMessage?: undefined,
    }
  ),
) => {
  // Handle separately if there is no server
  if (opts.noServer) {
    // Store values
    storedSendRequest = async () => {
      throw new Error('Cannot send requests because there is no server');
    };
    noServer = true;
  } else {
    // Store values
    storedSendRequest = opts.sendRequest;
    sessionExpiredMessage = opts.sessionExpiredMessage;
    noServer = false;
  }

  // Handle universal parts
  darkModeOn = !!opts.darkModeOn;

  // Mark as initialized
  onInitialized(null);
};

export default initClient;
