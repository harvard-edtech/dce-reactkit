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
import Variant from '../types/Variant';
import LogBuiltInMetadata from '../types/LogBuiltInMetadata';

// Import shared components
import Modal from './Modal';

// Import custom errors
import ErrorWithCode from '../errors/ErrorWithCode';

// Import other helpers
import logClientEvent from '../helpers/logClientEvent';
import {
  getSessionExpiredMessage,
} from '../client/initClient';

/*------------------------------------------------------------------------*/
/* -------------------------------- Props ------------------------------- */
/*------------------------------------------------------------------------*/

type Props = {
  // The entire app
  children: React.ReactNode,
  // True if this app is a dark-themed app
  dark?: boolean,
};

/*------------------------------------------------------------------------*/
/* --------------------------- Static Helpers --------------------------- */
/*------------------------------------------------------------------------*/

/*----------------------------------------*/
/* ---------------- Alert --------------- */
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
    // eslint-disable-next-line no-alert
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
/* --------------- Confirm -------------- */
/*----------------------------------------*/

// Stored copies of setters
let setConfirmInfo: (
  info: (
    | undefined
    | {
      title: string,
      text: string,
      opts: {
        confirmButtonText?: string,
        confirmButtonVariant?: Variant,
        cancelButtonText?: string,
        cancelButtonVariant?: Variant,
      },
    }
  ),
) => void;
let onConfirmClosed: (confirmed: boolean) => void;

/**
 * Show a confirmation modal with an "Okay" and a "Cancel" button
 *   (with the option to customize the text of those buttons)
 * @author Gabe Abrams
 * @param title the title text to display at the top of the alert
 * @param text the text to display in the alert
 * @param [opts={}] additional options for the confirmation dialog
 * @param [opts.confirmButtonText=Okay] the text of the confirm button
 * @param [opts.confirmButtonVariant=Variant.Dark] the variant of the confirm
 *   button
 * @param [opts.cancelButtonText=Cancel] the text of the cancel button
 * @param [opts.cancelButtonVariant=Variant.Secondary] the variant of the cancel
 *   button
 * @returns true if the user confirmed
 */
export const confirm = async (
  title: string,
  text: string,
  opts?: {
    confirmButtonText?: string,
    confirmButtonVariant?: Variant,
    cancelButtonText?: string,
    cancelButtonVariant?: Variant,
  },
): Promise<boolean> => {
  // Fallback if confirm is not available
  if (!setConfirmInfo) {
    // eslint-disable-next-line no-alert
    return window.confirm(`${title}\n\n${text}`);
  }

  // Return promise that resolves with result of confirmation
  return new Promise((resolve) => {
    // Setup handler
    onConfirmClosed = (confirmed: boolean) => {
      resolve(confirmed);
    };

    // Show the confirm
    setConfirmInfo({
      title,
      text,
      opts: (opts ?? {}),
    });
  });
};

/*----------------------------------------*/
/* ------------- Fatal Error ------------ */
/*----------------------------------------*/

// Stored copies of setters
let setFatalErrorMessage: (message: string) => void;
let setFatalErrorCode: (code: string) => void;
let setFatalErrorTitle: (title: string) => void;

// Fatal error listeners
const fatalErrorHandlers: (() => void)[] = [];

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

  // Call all fatal error listeners
  try {
    fatalErrorHandlers.forEach((handler) => {
      handler();
    });
  } catch (err) {
    // Ignore listener errors
  }

  // Add log
  logClientEvent({
    context: LogBuiltInMetadata.Context.ClientFatalError,
    error: {
      message,
      code,
      stack: (error ?? {}).stack,
    },
    metadata: {
      errorTitle,
    },
  });

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

/**
 * Add a handler for when a fatal error occurs
 * @author Gabe Abrams
 */
export const addFatalErrorHandler = (handler: () => void) => {
  fatalErrorHandlers.push(handler);
};

/*----------------------------------------*/
/* ----------- Session Expired ---------- */
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const AppWrapper: React.FC<Props> = (props: Props): React.ReactElement => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    children,
    dark,
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
    text: string,
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
    text: string,
    opts: {
      confirmButtonText?: string,
      confirmButtonVariant?: Variant,
      cancelButtonText?: string,
      cancelButtonVariant?: Variant,
    },
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
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* ---------------- Modal --------------- */
  /*----------------------------------------*/

  // Modal that may be defined
  let modal: React.ReactNode;

  /* -------------- Alert ------------- */

  if (alertInfo) {
    modal = (
      <Modal
        key={`alert-${alertInfo.title}-${alertInfo.text}`}
        title={alertInfo.title}
        type={ModalType.Okay}
        onClose={() => {
          // Alert closed
          setAlertInfo(undefined);
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
        key={`confirm-${confirmInfo.title}-${confirmInfo.text}`}
        title={confirmInfo.title}
        type={ModalType.OkayCancel}
        okayLabel={confirmInfo.opts.confirmButtonText}
        okayVariant={confirmInfo.opts.confirmButtonVariant}
        cancelLabel={confirmInfo.opts.cancelButtonText}
        cancelVariant={confirmInfo.opts.cancelButtonVariant}
        onClose={(buttonType) => {
          setConfirmInfo(undefined);
          if (onConfirmClosed) {
            onConfirmClosed(buttonType === ModalButtonType.Okay);
          }
        }}
        dontAllowBackdropExit
      >
        {confirmInfo.text}
      </Modal>
    );
  }

  /*----------------------------------------*/
  /* ---------------- Views --------------- */
  /*----------------------------------------*/

  // Body that will be filled with the current view
  let body: React.ReactNode;

  /* ----------- Fatal Error ---------- */

  if (fatalErrorMessage || fatalErrorCode || sessionHasExpired) {
    // Re-encapsulate in an error
    const error = (
      sessionHasExpired
        ? new ErrorWithCode(
          getSessionExpiredMessage(),
          ReactKitErrorCode.SessionExpired,
        )
        : new ErrorWithCode(
          (fatalErrorMessage ?? 'An unknown error has occurred. Please contact support.'),
          (fatalErrorCode ?? ReactKitErrorCode.NoCode),
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
    body = children;
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
