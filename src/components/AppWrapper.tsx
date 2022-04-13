/**
 * A wrapper for the entire React app that adds global functionality like
 *   handling for fatal error messages
 * @author Gabe Abrams
 */

// Import React
import React, { useState } from 'react';

// Import shared components
import ErrorBox from './ErrorBox';

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
};

/*------------------------------------------------------------------------*/
/*                             Static Helpers                             */
/*------------------------------------------------------------------------*/

// Stored copies of setters
let setFatalErrorMessage: (message: string) => void;
let setFatalErrorCode: (code: string) => void;

/**
 * Show a fatal error message
 * @author Gabe Abrams
 * @param error the error to show
 */
export const showFatalError = (error: any) => {
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
};

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const AppWrapper = (props: Props) => {
  /*------------------------------------------------------------------------*/
  /*                                  Setup                                 */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    children,
    dark,
  } = props;

  /* -------------- State ------------- */

  // Fatal error
  const [fatalErrorMessage, setFatalErrorMessageInner] = useState(null);
  setFatalErrorMessage = setFatalErrorMessageInner;
  const [fatalErrorCode, setFatalErrorCodeInner] = useState(null);
  setFatalErrorCode = setFatalErrorCodeInner;

  /*----------------------------------------*/
  /*                 Main UI                */
  /*----------------------------------------*/

  // Show error
  if (fatalErrorMessage || fatalErrorCode) {
    // Re-encapsulate in an error
    const error = new ErrorWithCode(
      fatalErrorMessage,
      fatalErrorCode,
    );

    return (
      <div
        style={{
          display: 'block',
          width: '100vw',
          minHeight: '100vh',
          paddingTop: '10rem',
        }}
      >
        <ErrorBox
          error={error}
        />
      </div>
    );
  }

  // Show the app itself
  return children;
};

/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/

// Export component
export default AppWrapper;
