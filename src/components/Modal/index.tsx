/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */

/**
 * The displayable modal component (this is the modal that's added to the
 *   wrapper, not the one that the programmer renders)
 * @author Gabe Abrams
 */

// Import React
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

// Import other components
import waitMs from '../../helpers/waitMs';
import LoadingSpinner from '../LoadingSpinner';

// Import types
import Variant from '../../types/Variant';
import ModalButtonType from '../../types/ModalButtonType';
import ModalSize from '../../types/ModalSize';
import ModalType from '../../types/ModalType';
import ModalProps from './ModalProps';

// Import constants
import NUM_MODAL_PORTALS from '../../constants/NUM_MODAL_PORTALS';

// Import shared helpers
// TODO: fix dependency cycle
// eslint-disable-next-line import/no-cycle
import { isDarkModeOn } from '../../client/initClient';

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

// Base level of z-index
const BASE_Z_INDEX = 1000000000;
const BASE_Z_INDEX_ON_TOP = 2000000000;

// Constants
const MS_TO_ANIMATE = 200; // Animation duration
const MS_TO_WAIT_BEFORE_SHOWING_LOADING_INDICATOR = 1000;

// Modal type to list of buttons
const modalTypeToModalButtonTypes: {
  [k: string]: ModalButtonType[]
} = {
  [ModalType.Okay]: [
    ModalButtonType.Okay,
  ],
  [ModalType.OkayCancel]: [
    ModalButtonType.Okay,
    ModalButtonType.Cancel,
  ],
  [ModalType.YesNo]: [
    ModalButtonType.Yes,
    ModalButtonType.No,
  ],
  [ModalType.YesNoCancel]: [
    ModalButtonType.Yes,
    ModalButtonType.No,
    ModalButtonType.Cancel,
  ],
  [ModalType.AbandonGoBack]: [
    ModalButtonType.Abandon,
    ModalButtonType.GoBack,
  ],
  [ModalType.ImSureCancel]: [
    ModalButtonType.ImSure,
    ModalButtonType.Cancel,
  ],
  [ModalType.DeleteCancel]: [
    ModalButtonType.Delete,
    ModalButtonType.Cancel,
  ],
  [ModalType.ConfirmCancel]: [
    ModalButtonType.Confirm,
    ModalButtonType.Cancel,
  ],
};

/**
 * Get button type styling and labels
 * @author Gabe Abrams
 * @returns map of button type to label and variant
 */
const getModalButtonTypeToLabelAndVariant = () => {
  const dark = isDarkModeOn();
  return {
    [ModalButtonType.Okay]: {
      label: 'Okay',
      variant: (
        dark
          ? Variant.Light
          : Variant.Dark
      ),
    },
    [ModalButtonType.Cancel]: {
      label: 'Cancel',
      variant: Variant.Secondary,
    },
    [ModalButtonType.Yes]: {
      label: 'Yes',
      variant: (
        dark
          ? Variant.Light
          : Variant.Dark
      ),
    },
    [ModalButtonType.No]: {
      label: 'No',
      variant: Variant.Secondary,
    },
    [ModalButtonType.Abandon]: {
      label: 'Abandon Changes',
      variant: Variant.Warning,
    },
    [ModalButtonType.GoBack]: {
      label: 'Go Back',
      variant: Variant.Secondary,
    },
    [ModalButtonType.Continue]: {
      label: 'Continue',
      variant: (
        dark
          ? Variant.Light
          : Variant.Dark
      ),
    },
    [ModalButtonType.ImSure]: {
      label: 'I am sure',
      variant: Variant.Warning,
    },
    [ModalButtonType.Delete]: {
      label: 'Yes, Delete',
      variant: Variant.Danger,
    },
    [ModalButtonType.Confirm]: {
      label: 'Confirm',
      variant: (
        dark
          ? Variant.Light
          : Variant.Dark
      ),
    },
  };
};

/*------------------------------------------------------------------------*/
/* --------------------------- Static Helpers --------------------------- */
/*------------------------------------------------------------------------*/

// Next unique id
let nextUniqueId = 0;

/**
 * Get a new unique id for this modal
 * @author Gabe Abrams
 * @returns new unique id
 */
const getNextUniqueId = (): number => {
  // eslint-disable-next-line no-plusplus
  return nextUniqueId++;
};

/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/

const style = `
  .Modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 200vh;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .Modal-fading-in {
    animation-name: Modal-fading-in;
    animation-duration: ${Math.floor(MS_TO_ANIMATE * 2)}ms;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    animation-timing-function: ease-out;
  }
  @keyframes Modal-fading-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .Modal-animating-in {
    animation-name: Modal-animating-in;
    animation-duration: ${MS_TO_ANIMATE}ms;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    animation-timing-function: ease-out;
  }
  @keyframes Modal-animating-in {
    0% {
      transform: scale(1.05) translate(0, -1.5rem);
      opacity: 0;
    }
    100% {
      transform: scale(1) translate(0, 0);
      opacity: 1;
    }
  }
  .Modal-animating-pop {
    animation-name: Modal-animating-pop;
    animation-duration: ${MS_TO_ANIMATE}ms;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    animation-timing-function: ease-in-out;
  }
  @keyframes Modal-animating-pop {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.9;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const Modal: React.FC<ModalProps> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    type = ModalType.NoButtons,
    size = ModalSize.Large,
    title,
    largeTitle,
    children,
    onClose,
    dontAllowBackdropExit,
    dontShowXButton,
    onTopOfOtherModals,
    isLoading,
    isLoadingCancelable,
  } = props;

  // Determine if no header either
  const noHeader = (!title && type === ModalType.NoButtons);

  /* -------------- State ------------- */

  // True if animation is in use
  const [animatingIn, setAnimatingIn] = useState(true);
  const [animatingPop, setAnimatingPop] = useState(false);
  const [showModal, setShowModal] = useState(false);

  /* -------------- Refs -------------- */

  // Keep track of whether modal is still mounted
  const mounted = useRef(false);

  // Keep track of unique modal id
  const id = useRef<number>(0);
  if (!id.current) {
    id.current = getNextUniqueId();
  }

  /*------------------------------------------------------------------------*/
  /* ------------------------- Lifecycle Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Mount
   * @author Gabe Abrams
   */
  useEffect(
    () => {
      (async () => {
        // Set defaults
        setAnimatingIn(true);
        setAnimatingPop(false);
        // Wait for animation
        await waitMs(MS_TO_ANIMATE);
        // Update to state after animated in
        if (mounted.current) {
          setAnimatingIn(false);
        }
        if (isLoading) {
          // wait before showing modal
          await waitMs(MS_TO_WAIT_BEFORE_SHOWING_LOADING_INDICATOR);
          setShowModal(true);
        } else {
          setShowModal(true);
        }
      })();

      return () => {
        mounted.current = false;
      };
    },
    [],
  );

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Handles the closing of the modal
   * @author Gabe Abrams
   * @param modalButtonType the button that was clicked when closing the
   *   modal
   */
  const handleClose = async (modalButtonType: ModalButtonType) => {
    // Don't close if no handler
    if (!onClose) {
      return;
    }

    onClose(modalButtonType);
  };

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  // Calculate Z-index
  const baseZIndex = (
    onTopOfOtherModals
      ? BASE_Z_INDEX_ON_TOP
      : BASE_Z_INDEX
  );

  // Get list of buttons for this modal type
  const ModalButtonTypes: ModalButtonType[] = modalTypeToModalButtonTypes[type] ?? [];

  // Get map of button type to label and variant
  const ModalButtonTypeToLabelAndVariant = getModalButtonTypeToLabelAndVariant();

  // Create buttons
  const buttons = ModalButtonTypes.map((modalButtonType: ModalButtonType, i) => {
    // Get default style
    let {
      label,
      variant,
    } = ModalButtonTypeToLabelAndVariant[modalButtonType];

    // Override with customizations
    const newLabel = props[`${modalButtonType}Label`];
    if (newLabel) {
      label = newLabel;
    }
    const newVariant = props[`${modalButtonType}Variant`];
    if (newVariant) {
      variant = newVariant;
    }

    // Check if this button is last
    const last = (i === ModalButtonTypes.length - 1);

    // Create the button
    return (
      <button
        key={modalButtonType}
        type="button"
        className={`Modal-${modalButtonType}-button btn btn-${variant} ${last ? '' : 'me-1'}`}
        onClick={() => {
          handleClose(modalButtonType);
        }}
      >
        {label}
      </button>
    );
  });

  // Put all buttons in a footer
  const footer = (
    (buttons && buttons.length)
      ? (
        <div>
          {buttons}
        </div>
      )
      : undefined
  );

  // Choose an animation
  let animationClass = '';
  let backdropAnimationClass = '';
  if (animatingIn) {
    animationClass = 'Modal-animating-in';
    backdropAnimationClass = 'Modal-fading-in';
  } else if (animatingPop) {
    animationClass = 'Modal-animating-pop';
  }

  // Render the modal
  const contentToRender = (
    <div
      className="modal show"
      tabIndex={-1}
      style={{
        zIndex: baseZIndex,
        display: 'block',
        margin: 'auto',
        left: 0,
        right: 0,
      }}
    >
      <style>{style}</style>
      <div
        className={`Modal-backdrop ${backdropAnimationClass}`}
        style={{
          zIndex: baseZIndex + 1,
        }}
        onClick={async () => {
          // Skip if exit via backdrop not allowed
          if (dontAllowBackdropExit || !onClose) {
            // Show pop animation
            if (!animatingPop) {
              setAnimatingPop(true);

              // Wait then stop pop animation
              await waitMs(MS_TO_ANIMATE);
              setAnimatingPop(false);
            }
            return;
          }
          // Handle close
          handleClose(ModalButtonType.Cancel);
        }}
      />

      { showModal && (
      <div
        className={`modal-dialog modal-${size} ${animationClass} modal-dialog-scrollable modal-dialog-centered`}
        style={{
          zIndex: baseZIndex + 2,
          // Override sizes for even larger for XL
          width: (
            size === ModalSize.ExtraLarge
              ? 'calc(100vw - 3rem)'
              : undefined
          ),
          maxWidth: (
            size === ModalSize.ExtraLarge
              ? '80rem'
              : undefined
          ),
        }}
      >
        <div
          className="modal-content"
          style={{
            borderColor: (
              isDarkModeOn()
                ? 'gray'
                : undefined
            ),
          }}
        >
          {!noHeader && (
            <div
              className="modal-header"
              style={{
                color: (
                  isDarkModeOn()
                    ? 'white'
                    : undefined
                ),
                backgroundColor: (
                  isDarkModeOn()
                    ? '#444'
                    : undefined
                ),
                borderBottom: (
                  isDarkModeOn()
                    ? '0.1rem solid gray'
                    : undefined
                ),
              }}
            >
              <h5
                className="modal-title"
                style={{
                  fontWeight: 'bold',
                  fontSize: (
                    largeTitle
                      ? '1.6rem'
                      : undefined
                  ),
                }}
              >
                {title}
              </h5>

              {(onClose && !dontShowXButton && !(isLoading && !isLoadingCancelable)) && (
                <button
                  type="button"
                  className="Modal-x-button btn-close"
                  aria-label="Close"
                  style={{
                    backgroundColor: (
                      isDarkModeOn()
                        ? 'white'
                        : undefined
                    ),
                  }}
                  onClick={() => {
                    // Handle close
                    handleClose(ModalButtonType.Cancel);
                  }}
                />
              )}
            </div>
          )}

          {isLoading && (
            <div
              className="modal-body"
              style={{
                color: (
                  isDarkModeOn()
                    ? 'white'
                    : undefined
                ),
                backgroundColor: (
                  isDarkModeOn()
                    ? '#444'
                    : undefined
                ),
              }}
            >
              <LoadingSpinner />
              <span className="sr-only">Content loading</span>
            </div>
          )}

          {children && !isLoading && (
            <div
              className="modal-body"
              style={{
                color: (
                  isDarkModeOn()
                    ? 'white'
                    : undefined
                ),
                backgroundColor: (
                  isDarkModeOn()
                    ? '#444'
                    : undefined
                ),
              }}
            >
              {children}
            </div>
          )}
          {footer && (
            <div
              className="modal-footer pt-1 pb-1"
              style={{
                color: (
                  isDarkModeOn()
                    ? 'white'
                    : undefined
                ),
                backgroundColor: (
                  isDarkModeOn()
                    ? '#444'
                    : undefined
                ),
                borderTop: (
                  isDarkModeOn()
                    ? '0.1rem solid gray'
                    : undefined
                ),
              }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );

  // Determine which portal to use
  const portalNumber = id.current % NUM_MODAL_PORTALS;

  // Render in a portal
  return ReactDOM.createPortal(
    contentToRender,
    document.getElementById(`modal-portal-${portalNumber}`) as HTMLElement,
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

export default Modal;
