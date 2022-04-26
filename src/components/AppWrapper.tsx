/**
 * A wrapper for the entire React app that adds global functionality like
 *   handling for fatal error messages, adds bootstrap support
 * @author Gabe Abrams
 */

// Import React
import React, { useState } from 'react';

// Import shared components
import ErrorBox from './ErrorBox';

// Import shared types
import ReactKitErrorCode from '../types/ReactKitErrorCode';
import ModalButtonType from '../types/ModalButtonType';
import ModalType from '../types/ModalType';

// Import shared components
import Modal from './Modal';

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

/*----------------------------------------*/
/*                  Alert                 */
/*----------------------------------------*/

// Stored copies of setters
let setAlertInfo: (info: undefined | { title: string, text: string }) => void;
let onAlertClosed: () => void;

/**
 * Show an alert modal with an "Okay" button
 * @author Gabe Abrams
 * @param title the title text to display at the top of the alert
 * @param text the text to display in the alert
 */
export const alert = async (title: string, text: string): Promise<undefined> => {
  // Fallback if alert not available
  if (!setAlertInfo) {
    window.alert(`${title}\n\n${text}`);
    return undefined;
  }

  // Return promise that resolves when alert is closed
  return new Promise((resolve) => {
    // Setup handler
    onAlertClosed = () => {
      resolve(undefined);
    };

    // Show the alert
    setAlertInfo({
      title,
      text,
    });
  });
};

/*----------------------------------------*/
/*                 Confirm                */
/*----------------------------------------*/

// Stored copies of setters
let setConfirmInfo: (info: undefined | { title: string, text: string }) => void;
let onConfirmClosed: (confirmed: boolean) => void;

/**
 * Show a confirmation modal with an "Okay" and a "Cancel" button
 * @author Gabe Abrams
 * @param title the title text to display at the top of the alert
 * @param text the text to display in the alert
 * @returns true if the user confirmed
 */
export const confirm = async (
  title: string,
  text: string,
): Promise<boolean> => {
  // Fallback if confirm is not available
  if (!setConfirmInfo) {
    return window.confirm(`${title}\n\n${text}`);
  }

  // Return promise that resolves with result of confirmation
  return new Promise((resolve) => {
    // Setup handler
    onConfirmClosed = (confirmed: boolean) => {
      resolve(confirmed)
    };

    // Show the confirm
    setConfirmInfo({
      title,
      text,
    });
  });
};

/*----------------------------------------*/
/*               Fatal Error              */
/*----------------------------------------*/

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
): undefined => {
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
    alert(
      errorTitle,
      `${message} (code: ${code}). Please contact support.`,
    );
    return undefined;
  }

  // Use setters
  setFatalErrorMessage(message);
  setFatalErrorCode(code);
  setFatalErrorTitle(errorTitle);

  return undefined;
};

/*----------------------------------------*/
/*             Session Expired            */
/*----------------------------------------*/

// Stored copies of setters
let setSessionHasExpired: (isExpired: boolean) => void;

/**
 * Show the "session expired" message
 * @author Gabe Abrams
 */
export const showSessionExpiredMessage = (): undefined => {
  setSessionHasExpired(true);
  return undefined;
};

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const AppWrapper: React.FC<Props> = (props: Props): React.ReactElement => {
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
  const [
    fatalErrorMessage,
    setFatalErrorMessageInner,
  ] = useState<string | undefined>();
  setFatalErrorMessage = setFatalErrorMessageInner;
  const [
    fatalErrorCode,
    setFatalErrorCodeInner,
  ] = useState<string | undefined>();
  setFatalErrorCode = setFatalErrorCodeInner;
  const [
    fatalErrorTitle,
    setFatalErrorTitleInner,
  ] = useState<string | undefined>();
  setFatalErrorTitle = setFatalErrorTitleInner;

  // Alert
  const [
    alertInfo,
    setAlertInfoInner,
  ] = useState<
    undefined
    | {
      title: string,
      text: string
    }
  >(undefined);
  setAlertInfo = setAlertInfoInner;

  // Confirm
  const [
    confirmInfo,
    setConfirmInfoInner,
  ] = useState<
    undefined
    | {
      title: string,
      text: string
    }
  >(undefined);
  setConfirmInfo = setConfirmInfoInner;

  // Session expired
  const [
    sessionHasExpired,
    setSessionHasExpiredInner,
  ] = useState<boolean>(false);
  setSessionHasExpired = setSessionHasExpiredInner;

  /*------------------------------------------------------------------------*/
  /*                                 Render                                 */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /*                  Modal                 */
  /*----------------------------------------*/

  // Modal that may be defined
  let modal: React.ReactNode;

  /* -------------- Alert ------------- */

  if (alertInfo) {
    modal = (
      <Modal
        title={alertInfo.title}
        type={ModalType.Okay}
        onClose={() => {
          // Alert closed
          if (onAlertClosed) {
            onAlertClosed();
          }
        }}
        onTopOfOtherModals
      >
        {alertInfo.text}
      </Modal>
    );
  }

  /* ------------- Confirm ------------ */

  if (confirmInfo) {
    modal = (
      <Modal
        title={confirmInfo.title}
        type={ModalType.OkayCancel}
        onClose={(buttonType) => {
          if (onConfirmClosed) {
            onConfirmClosed(buttonType === ModalButtonType.Okay);
          }
          setConfirmInfo(undefined);
        }}
        dontAllowBackdropExit
      >
        {confirmInfo.text}
      </Modal>
    );
  }

  /*----------------------------------------*/
  /*                  Views                 */
  /*----------------------------------------*/

  // Body that will be filled with the current view
  let body: React.ReactNode;

  /* ----------- Fatal Error ---------- */

  if (fatalErrorMessage || fatalErrorCode || sessionHasExpired) {
    // Re-encapsulate in an error
    const error = (
      sessionHasExpired
        ? new ErrorWithCode(
          (fatalErrorMessage ?? 'An unknown error has occurred. Please contact support.'),
          (fatalErrorCode ?? ReactKitErrorCode.NoCode),
        )
        : new ErrorWithCode(
          sessionExpiredMessage,
          ReactKitErrorCode.SessionExpired,
        )
    );

    // Build error screen
    body = (
      <div
        style={{
          display: 'block',
          width: '100vw',
          minHeight: '100vh',
          paddingTop: '2rem',
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

  /* --------------- App -------------- */

  if (!body) {
    body = (
      <>
        {children}
      </>
    );
  }

  /*----------------------------------------*/
  /*                 Main UI                */
  /*----------------------------------------*/

  return (
    <>
      {modal}
      {body}
    </>
  );
};

/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/

// Export component
export default AppWrapper;
