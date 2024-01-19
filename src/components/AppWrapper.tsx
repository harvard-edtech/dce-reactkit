/**
 * A wrapper for the entire React app that adds global functionality like
 *   handling for fatal error messages, adds bootstrap support
 * @author Gabe Abrams
 */

// Import React
import React, { useState } from 'react';

// Import FontAwesome
import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons';

// Import shared components
import ErrorBox from './ErrorBox';

// Import shared types
import ReactKitErrorCode from '../types/ReactKitErrorCode';
import ModalButtonType from '../types/ModalButtonType';
import ModalType from '../types/ModalType';
import Variant from '../types/Variant';
import LogBuiltInMetadata from '../types/LogBuiltInMetadata';
import ModalProps from './Modal/ModalProps';

// Import shared components
// TODO: fix dependency cycle
// eslint-disable-next-line import/no-cycle
import ModalForWrapper from './Modal/ModalForWrapper';

// Import custom errors
import ErrorWithCode from '../errors/ErrorWithCode';

// Import other helpers
// TODO: fix dependency cycle
// eslint-disable-next-line import/no-cycle
import logClientEvent from '../helpers/logClientEvent';
import {
  getSessionExpiredMessage,
  isDarkModeOn,
} from '../client/initClient';
import waitMs from '../helpers/waitMs';

/*------------------------------------------------------------------------*/
/* -------------------------------- Props ------------------------------- */
/*------------------------------------------------------------------------*/

type Props = {
  // The entire app
  children: React.ReactNode,
};

/*------------------------------------------------------------------------*/
/* --------------------------- Static Helpers --------------------------- */
/*------------------------------------------------------------------------*/

// Timestamp after initialization when helpers should be available
const timestampWhenHelpersShouldBeAvailable = Date.now() + 2000;

/**
 * Wait for a little while for a helper to exist
 * @author Gabe Abrams
 * @param checkForHelper a function that returns true if the helper exists
 * @returns true if the helper exists, false if the process timed out
 */
const waitForHelper = async (checkForHelper: () => boolean): Promise<boolean> => {
  // Wait for helper to exist
  while (!checkForHelper()) {
    // Check if we should stop waiting
    if (Date.now() > timestampWhenHelpersShouldBeAvailable) {
      // Stop waiting
      return false;
    }

    // Wait a little while
    await waitMs(10);
  }

  // Helper exists
  return true;
};

/*----------------------------------------*/
/* ----------- Redirect/Leave ----------- */
/*----------------------------------------*/

// Stored copy of setter for url to leave to
let setURLToLeaveTo: (
  opts: {
    url: string,
    destination: string,
  },
) => void;

/**
 * Redirect to a new page
 * @author Gabe Abrams
 * @param url the url to redirect to
 * @param destination the destination of the redirect, for example "YouTube"
 *   and will be used in the following text: `Redirecting to ${destination}...`
 */
export const leaveToURL = async (url: string, destination: string) => {
  if (setURLToLeaveTo) {
    // Beautiful redirect
    setURLToLeaveTo({ url, destination });
  } else {
    // Overwrite page in a janky way
    window.document.body.innerHTML = `
      <div>
        <h1>
          Redirecting to ${destination}...
        </h1>
        <p>
          If you are not redirected in 5 seconds, please <a href="${url}">click here</a>.
        </p>
      </div>
    `;
  }

  // Redirect to location
  window.location.href = url;
};

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
  // Wait for helper to exist
  await waitForHelper(() => {
    return !!setAlertInfo;
  });

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
  // Wait for helper to exist
  await waitForHelper(() => {
    return !!setConfirmInfo;
  });

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
export const showFatalError = async (
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

  // Wait for helper to exist
  await waitForHelper(() => {
    return (
      !!setFatalErrorMessage
      && !!setFatalErrorCode
    );
  });

  // Handle case where app hasn't loaded
  if (!setFatalErrorMessage || !setFatalErrorCode) {
    alert(
      errorTitle,
      `${message} (code: ${code}). Please contact support.`,
    );
    return;
  }

  // Use setters
  setFatalErrorMessage(message);
  setFatalErrorCode(code);
  setFatalErrorTitle(errorTitle);
};

/**
 * Add a handler for when a fatal error occurs (or when a session expiry occurs)
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
export const showSessionExpiredMessage = async () => {
  // Call all fatal error listeners
  try {
    fatalErrorHandlers.forEach((handler) => {
      handler();
    });
  } catch (err) {
    // Ignore listener errors
  }

  // Wait for helper to exist
  await waitForHelper(() => {
    return !!setSessionHasExpired;
  });

  // Show session expired message
  if (setSessionHasExpired) {
    setSessionHasExpired(true);
  } else {
    showFatalError(
      'Your session has expired. Please start over.',
      'Session Expired',
    );
  }
};

/*----------------------------------------*/
/* --------------- Modals --------------- */
/*----------------------------------------*/

// Modal tuple with id and props
type ModalTuple = {
  // Unique id
  id: number,
  // Modal props
  props: ModalProps,
};

// Stored copies of setters
let setModals: (modals: ModalTuple[]) => void;

// Stored copies of modals
let modals: ModalTuple[] = [];

/**
 * Add a modal to the screen
 * @author Gabe Abrams
 * @param id the uniqueId of the modal
 * @param props the props for the modal
 */
export const addModal = async (
  id: number,
  props: ModalProps,
) => {
  // Wait for helper to exist
  await waitForHelper(() => {
    return !!setModals;
  });

  // Add modal
  modals.push({
    id,
    props,
  });

  // Update modals
  setModals(modals);
};

/**
 * Update a modal on the screen by id (if it exists) with new props
 * @author Gabe Abrams
 * @param id the uniqueId of the modal
 * @param props the new props for the modal
 */
export const updateModal = async (
  id: number,
  props: ModalProps,
) => {
  // Wait for helper to exist
  await waitForHelper(() => {
    return !!setModals;
  });

  // Update modal
  modals = modals.map((modal) => {
    if (modal.id === id) {
      return {
        id,
        props,
      };
    }
    return modal;
  });

  // Update modals
  setModals(modals);
};

/**
 * Remove a modal from the screen by id (if it exists)
 * @author Gabe Abrams
 * @param id the uniqueId of the modal
 */
export const removeModal = async (id: number) => {
  // Wait for helper to exist
  await waitForHelper(() => {
    return !!setModals;
  });

  // Remove modal
  modals = modals.filter((modal) => {
    return modal.id !== id;
  });

  // Update modals
  setModals(modals);
};

/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/

const style = `
  .AppWrapper-leave-to-url-notice {
    opacity: 0;

    animation-name: AppWrapper-leave-to-url-notice-appear;
    animation-duration: 0.5s;
    animation-delay: 1s;
    animation-fill-mode: both;
    animation-timing-function: ease-out;
    animation-iteration-count: 1;
  }

  @keyframes AppWrapper-leave-to-url-notice-appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

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
  } = props;

  /* -------------- State ------------- */

  // Leave to URL
  const [
    urlToLeaveTo,
    setURLToLeaveToInner,
  ] = useState<{ url: string, destination: string } | undefined>();
  setURLToLeaveTo = setURLToLeaveToInner;

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

  // Modals
  const [
    modalsFromState,
    setModalsInner,
  ] = useState<ModalTuple[]>([]);
  setModals = setModalsInner;

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
      <ModalForWrapper
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
      </ModalForWrapper>
    );
  }

  /* ------------- Confirm ------------ */

  if (confirmInfo) {
    modal = (
      <ModalForWrapper
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
        onTopOfOtherModals
        dontAllowBackdropExit
      >
        {confirmInfo.text}
      </ModalForWrapper>
    );
  }

  /* ---------- Custom Modals --------- */

  // List of modals added outside reactkit via the Modal component
  const customModals: React.ReactNode[] = [];

  // Add custom modals
  modalsFromState.forEach((modalTuple) => {
    customModals.push(
      <ModalForWrapper
        key={String(modalTuple.props.key ?? modalTuple.id)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...modalTuple.props}
      />,
    );
  });

  /*----------------------------------------*/
  /* ---------------- Views --------------- */
  /*----------------------------------------*/

  // Body that will be filled with the current view
  let body: React.ReactNode;

  /* ---------- Leave to URL ---------- */

  if (!body && urlToLeaveTo) {
    // Destructure url info
    const {
      url,
      destination,
    } = urlToLeaveTo;

    // Show pretty redirect screen
    body = (
      <div className="AppWrapper-leave-to-url-container p-5 text-center">
        <div className="AppWrapper-leave-to-url-notice d-inline-block">
          <h3 className="text-start m-0">
            Redirecting to
            {' '}
            {destination}
            ...
          </h3>
          <div className="text-start">
            If you are not automatically redirected in 5 seconds, please
            {' '}
            <a
              href={url}
              aria-label={`Click here to leave to ${destination}`}
            >
              click here
            </a>
            .
          </div>
        </div>
      </div>
    );
  }

  /* ----------- Fatal Error ---------- */

  if (
    !body
    && (fatalErrorMessage || fatalErrorCode || sessionHasExpired)
  ) {
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

    // Choose error box variant
    let errorBoxVariant = Variant.Danger;
    if (sessionHasExpired) {
      errorBoxVariant = (
        isDarkModeOn()
          ? Variant.Light
          : Variant.Secondary
      );
    }

    // Build error screen
    body = (
      <div
        style={{
          display: 'block',
          width: '100vw',
          minHeight: '100vh',
          paddingTop: '2rem',
          backgroundColor: (
            isDarkModeOn()
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
          variant={errorBoxVariant}
          icon={(
            sessionHasExpired
              ? faHourglassEnd
              : undefined
          )}
        />
      </div>
    );
  }

  /* --------------- App -------------- */

  if (!body) {
    body = children;
  }

  /* ------------- Tooltip ------------ */

  const tooltipStyle = (
    isDarkModeOn()
      ? `
        .tooltip-inner {
          background-color: white;
          color: black;
          border: 0.1rem solid black;
          pointer-events: none;
        }
        div[data-popper-placement="top"] .tooltip-arrow::before {
          border-top-color: white !important;
          transform: translate(0, -0.05rem);
          pointer-events: none;
        }
      `
      : `
        .tooltip-inner {
          background-color: black;
          color: black;
          border: 0.1rem solid white;
          pointer-events: none;
        }
        div[data-popper-placement="top"] .tooltip-arrow::before {
          border-top-color: black !important;
          transform: translate(0, -0.05rem);
          pointer-events: none;
        }
      `
  );

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <>
      {/* Style */}
      <style>
        {style}
      </style>

      {/* Tooltip Style */}
      <style>
        {tooltipStyle}
      </style>

      {/* Modal */}
      {modal}

      {/* Custom Modals */}
      {customModals}

      {/* Body */}
      {body}
    </>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default AppWrapper;
