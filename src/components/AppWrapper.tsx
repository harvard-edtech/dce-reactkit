/**
 * A wrapper for the entire React app that adds global functionality like
 *   handling for fatal error messages
 * @author Gabe Abrams
 */

// Import React
import React, { useState, useEffect } from 'react';

// Import shared components
import ErrorBox from './ErrorBox';

// Import helpers
import { setSessionExpiryHandler } from '../helpers/visitServerEndpoint';

// Import shared types
import ReactKitErrorCode from '../types/ReactKitErrorCode';

// Import custom errors
import ErrorWithCode from '../errors/ErrorWithCode';

/*------------------------------------------------------------------------*/
/*                                  Props                                 */
/*------------------------------------------------------------------------*/

type Props = {
  // The entire app
  children: React.ReactNode,
  // True if this app is a dark-themed app
  dark?: boolean,
  // Custom session expired message
  sessionExpiredMessage?: string,
};

/*------------------------------------------------------------------------*/
/*                             Static Helpers                             */
/*------------------------------------------------------------------------*/

// Stored copies of setters
let setFatalErrorMessage: (message: string) => void;
let setFatalErrorCode: (code: string) => void;
let setFatalErrorTitle: (title: string) => void;

/**
 * Show a fatal error message
 * @author Gabe Abrams
 * @param error the error to show
 * @param [errorTitle] title of the error box
 */
export const showFatalError = (
  error: any,
  errorTitle: string = 'An Error Occurred',
) => {
  // Determine message and code
  const message: string = (
    typeof error === 'string'
      ? error.trim()
      : String(error.message ?? 'An unknown error occurred.')
  );
  const code: string = (
    typeof error === 'string'
      ? ReactKitErrorCode.NoCode
      : String(error.code ?? ReactKitErrorCode.NoCode)
  );

  // Handle case where app hasn't loaded
  if (!setFatalErrorMessage || !setFatalErrorCode) {
    return alert(`An error has occurred: ${message} (code: ${code}). Please contact support.`);
  }

  // Use setters
  setFatalErrorMessage(message);
  setFatalErrorCode(code);
  setFatalErrorTitle(errorTitle);
};

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const AppWrapper = (props: Props): React.ReactElement => {
  /*------------------------------------------------------------------------*/
  /*                                  Setup                                 */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    children,
    dark,
    sessionExpiredMessage = 'Your session has expired. Please go back to Canvas and start over.',
  } = props;

  /* -------------- State ------------- */

  // Fatal error
  const [fatalErrorMessage, setFatalErrorMessageInner] = useState(null);
  setFatalErrorMessage = setFatalErrorMessageInner;
  const [fatalErrorCode, setFatalErrorCodeInner] = useState(null);
  setFatalErrorCode = setFatalErrorCodeInner;
  const [fatalErrorTitle, setFatalErrorTitleInner] = useState(null);
  setFatalErrorTitle = setFatalErrorCodeInner;

  // Session expired
  const [sessionHasExpired, setSessionHasExpired] = useState(false);

  /*------------------------------------------------------------------------*/
  /*                           Lifecycle Functions                          */
  /*------------------------------------------------------------------------*/

  /**
   * Mount
   * @author Gabe Abrams
   */
  useEffect(
    () => {
      // Add session expired handler
      setSessionExpiryHandler(() => {
        // Session expired!
        setSessionHasExpired(true);
      });
    },
    [],
  );

  /*------------------------------------------------------------------------*/
  /*                                 Render                                 */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /*                 Main UI                */
  /*----------------------------------------*/

  // Show error
  if (fatalErrorMessage || fatalErrorCode || sessionHasExpired) {
    // Re-encapsulate in an error
    const error = (
      sessionHasExpired
        ? new ErrorWithCode(
          fatalErrorMessage,
          fatalErrorCode,
        )
        : new ErrorWithCode(
          sessionExpiredMessage,
          ReactKitErrorCode.SessionExpired,
        )
    );

    // Build error screen
    return (
      <div
        style={{
          display: 'block',
          width: '100vw',
          minHeight: '100vh',
          paddingTop: '10rem',
          backgroundColor: (
            dark
              ? '#222'
              : '#fff'
          ),
        }}
      >
        <ErrorBox
          title={(
            sessionHasExpired
              ? 'Session Expired'
              : fatalErrorTitle
          )}
          error={error}
        />
      </div>
    );
  }

  // Show the app itself
  return (
    <>
      {children}
    </>
  );
};

/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/

// Export component
export default AppWrapper;
