// Import other components
import { showFatalError } from '../components/AppWrapper';

// Import shared types
import ErrorWithCode from '../errors/ErrorWithCode';
import waitMs from '../helpers/waitMs';
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

let onInitialized: (a: unknown) => void;
let initialized = new Promise((resolve) => {
  onInitialized = resolve;
});

/* ---------- Send Request ---------- */

let storedSendRequest: SendRequestFunction;

/**
 * Get the send request function
 * @author Gabe Abrams
 * @returns sendRequest function
 */
export const getSendRequest = async () => {
  // Track timeout
  let timedOut = false;
  (async () => {
    await waitMs(5000);
    timedOut = true;
  })(),

  // Wait for initialization
  await initialized;

  // Error if no send request function
  if (timedOut) {
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

/*----------------------------------------*/
/* ---------------- Init ---------------- */
/*----------------------------------------*/

/**
 * Initialize the client-side version of reactkit
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.sendRequest caccl send request functions
 * @param [opts.sessionExpiredMessage] a custom session expired message
 */
const initClient = (
  opts: {
    // Copy of CACCL's send request function
    sendRequest: SendRequestFunction,
    // Custom session expired message
    sessionExpiredMessage?: string,
  },
) => {
  // Store values
  storedSendRequest = opts.sendRequest;
  sessionExpiredMessage = opts.sessionExpiredMessage;

  // Mark as initialized
  onInitialized(null);
};

export default initClient;
