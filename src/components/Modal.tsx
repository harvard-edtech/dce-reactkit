/**
 * A generic popup modal
 * @author Gabe Abrams
 */

// Import React
import React, { useState, useEffect } from 'react';

// Import other components
import waitMs from '../helpers/waitMs';

// Import types
import Variant from '../types/Variant';
import ModalButtonType from '../types/ModalButtonType';
import ModalSize from '../types/ModalSize';
import ModalType from '../types/ModalType';

/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/

const style = `
`;

/*------------------------------------------------------------------------*/
/*                                Constants                               */
/*------------------------------------------------------------------------*/

// Constants
const MS_TO_ANIMATE = 400; // Time to animate in/out (defined by bootstrap)
const MS_ANIMATE_IN_DELAY = 10;
// Time to wait before animating in (must be >0 or animation won't trigger)

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

  // True if currently animating in
  const [animatingIn, setAnimatingIn] = useState(false);

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
        // Start the component animating in
        await waitMs(MS_ANIMATE_IN_DELAY);
        setAnimatingIn(true);

        // Wait and then set visible to true
        await waitMs(MS_TO_ANIMATE);
        setVisible(true);
      })();
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

    // Don't close if animating in
    if (animatingIn) {
      return;
    }

    // Don't close if already closed
    if (!visible) {
      return;
    }

    // Update the state
    setVisible(false);

    // Call the handler after the modal has animated out
    await waitMs(MS_TO_ANIMATE);
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
        type="button"
        className={`Modal-${ModalButtonType}-button btn btn-${variant} ${last ? '' : 'mr-1'}`}
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

  // Render the modal
  return (
    <div
      className={`modal show modal-dialog-scrollable modal-dialog-centered modal-${size}`}
      tabIndex={-1}
      style={{
        zIndex: (
          onTopOfOtherModals
            ? 6000000000
            : 5000000000
        ),
        display: 'block',
        margin: 'auto',
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {title}
            </h5>

            {onClose && (
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
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
            <div className="modal-footer">
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
