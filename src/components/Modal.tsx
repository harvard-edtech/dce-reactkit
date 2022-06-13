/**
 * A generic popup modal
 * @author Gabe Abrams
 */

// Import React
import React, { useState, useEffect, useRef } from 'react';

// Import other components
import waitMs from '../helpers/waitMs';

// Import types
import Variant from '../types/Variant';
import ModalButtonType from '../types/ModalButtonType';
import ModalSize from '../types/ModalSize';
import ModalType from '../types/ModalType';

/*------------------------------------------------------------------------*/
/*                                Constants                               */
/*------------------------------------------------------------------------*/

// Constants
const MS_TO_ANIMATE = 200; // Animation duration

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

// Button type styling and labels
const ModalButtonTypeToLabelAndVariant = {
  [ModalButtonType.Okay]: {
    label: 'Okay',
    variant: Variant.Dark,
  },
  [ModalButtonType.Cancel]: {
    label: 'Cancel',
    variant: Variant.Secondary,
  },
  [ModalButtonType.Yes]: {
    label: 'Yes',
    variant: Variant.Dark,
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
    variant: Variant.Dark,
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
    variant: Variant.Dark,
  },
};

/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/

const style = `
  .Modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vw;
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
/*                                  Types                                 */
/*------------------------------------------------------------------------*/

type Props = {
  // Type of the modal
  type?: ModalType,
  // Size of the modal
  size?: ModalSize,
  // Title of the modal (if excluded, no header)
  title?: React.ReactNode,
  // The body of the modal
  children?: React.ReactNode,
  // Handler to call when modal is closed (if excluded, not closable)
  onClose?: (type: ModalButtonType) => void,
  // If true, don't allow the user to click the backdrop to exit
  dontAllowBackdropExit?: boolean,
  // Custom label for "okay" button
  okayLabel?: string,
  // Custom variant for "okay" button
  okayVariant?: Variant,
  // Custom label for "cancel" button
  cancelLabel?: string,
  // Custom variant for "cancel" button
  cancelVariant?: Variant,
  // Custom label for "yes" button
  yesLabel?: string,
  // Custom variant for "yes" button
  yesVariant?: Variant,
  // Custom label for "no" button
  noLabel?: string,
  // Custom variant for "no" button
  noVariant?: Variant,
  // Custom label for "abandon" button
  abandonLabel?: string,
  // Custom variant for "abandon" button
  abandonVariant?: Variant,
  // Custom label for "goBack" button
  goBackLabel?: string,
  // Custom variant for "goBack" button
  goBackVariant?: Variant,
  // Custom label for "continue" button
  continueLabel?: string,
  // Custom variant for "continue" button
  continueVariant?: Variant,
  // Custom label for "imSure" button
  imSureLabel?: string,
  // Custom variant for "imSure" button
  imSureVariant?: Variant,
  // Custom label for "delete" button
  deleteLabel?: string,
  // Custom variant for "delete" button
  deleteVariant?: Variant,
  // Custom label for "confirm" button
  confirmLabel?: string,
  // Custom variant for "confirm" button
  confirmVariant?: Variant,
  // True if modal should be on top of other modals
  onTopOfOtherModals?: boolean,
};

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const Modal: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /*                                  Setup                                 */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    type = ModalType.NoButtons,
    size = ModalSize.Large,
    title,
    children,
    onClose,
    dontAllowBackdropExit,
    onTopOfOtherModals,
  } = props;

  /* -------------- State ------------- */

  // If true, the modal is shown
  const [visible, setVisible] = useState(false);

  // True if animation is in use
  const [animatingIn, setAnimatingIn] = useState(true);
  const [animatingPop, setAnimatingPop] = useState(false);

  // Keep track of whether modal is still mounted
  const mounted = useRef(false);

  /*------------------------------------------------------------------------*/
  /*                           Lifecycle Functions                          */
  /*------------------------------------------------------------------------*/

  /**
   * Mount
   * @author Gabe Abrams
   */
  useEffect(
    () => {
      (async () => {
        // Set defaults
        setVisible(false);
        setAnimatingIn(true);
        setAnimatingPop(false);
        // Wait for animation
        await waitMs(MS_TO_ANIMATE);
        // Update to state after animated in
        if (mounted.current) {
          setVisible(true);
          setAnimatingIn(false);
        }
      })();

      return () => {
        mounted.current = false;
      };
    },
    [],
  );

  /*------------------------------------------------------------------------*/
  /*                           Component Functions                          */
  /*------------------------------------------------------------------------*/

  /**
   * Handles the closing of the modal
   * @author Gabe Abrams
   * @param ModalButtonType the button that was clicked when closing the
   *   modal
   */
  const handleClose = async (ModalButtonType: ModalButtonType) => {
    // Don't close if no handler
    if (!onClose) {
      return;
    }

    onClose(ModalButtonType);
  };

  /*------------------------------------------------------------------------*/
  /*                                 Render                                 */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /*                 Footer                 */
  /*----------------------------------------*/

  // Get list of buttons for this modal type
  const ModalButtonTypes: ModalButtonType[] = modalTypeToModalButtonTypes[type] ?? [];

  // Create buttons
  const buttons = ModalButtonTypes.map((ModalButtonType: ModalButtonType, i) => {
    // Get default style
    let {
      label,
      variant,
    } = ModalButtonTypeToLabelAndVariant[ModalButtonType];

    // Override with customizations
    const newLabel = props[`${ModalButtonType}Label`];
    if (newLabel) {
      label = newLabel;
    }
    const newVariant = props[`${ModalButtonType}Variant`];
    if (newVariant) {
      variant = newVariant;
    }

    // Check if this button is last
    const last = (i === ModalButtonTypes.length - 1);

    // Create the button
    return (
      <button
        key={ModalButtonType}
        type="button"
        className={`Modal-${ModalButtonType}-button btn btn-${variant} ${last ? '' : 'me-1'}`}
        onClick={() => {
          handleClose(ModalButtonType);
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
  return (
    <div
      className={`modal show modal-dialog-scrollable modal-dialog-centered`}
      tabIndex={-1}
      style={{
        zIndex: (
          onTopOfOtherModals
            ? 5000000001
            : 5000000000
        ),
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
          zIndex: 5000000003,
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
      <div
        className={`modal-dialog modal-${size} ${animationClass}`}
        style={{
          zIndex: 5000000002,
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title"
              style={{
                fontWeight: 'bold',
              }}
            >
              {title}
            </h5>

            {onClose && (
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                  // Handle close
                  handleClose(ModalButtonType.Cancel);
                }}
              />
            )}
          </div>
          {children && (
            <div className="modal-body">
              {children}
            </div>
          )}
          {footer && (
            <div className="modal-footer pt-1 pb-1">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/

export default Modal;
