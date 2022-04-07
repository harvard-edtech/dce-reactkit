/**
 * A generic popup modal
 * @author Gabe Abrams
 */

// Import React
import React, { useState, useEffect } from 'react';

// Import other components
import BootstrapModal from 'react-bootstrap/Modal';
import waitMs from '../helpers/waitMs';

// Import types
import Variant from '../types/Variant';

/*------------------------------------------------------------------------*/
/*                                Constants                               */
/*------------------------------------------------------------------------*/

// Constants
const MS_TO_ANIMATE = 400; // Time to animate in/out (defined by bootstrap)
const MS_ANIMATE_IN_DELAY = 10;
// Time to wait before animating in (must be >0 or animation won't trigger)

// Modal types
enum ModalType {
  Okay = 'okay', // [Okay]
  OkayCancel = 'okay-cancel', // [Okay] [Cancel]
  YesNo = 'yes-no', // [Yes] [No]
  YesNoCancel = 'yes-no-cancel', // [Yes] [No] [Cancel]
  AbandonGoBack = 'abandon-goBack', // [Abandon Changes] [Go Back]
  ImSureCancel = 'imSure-cancel', // [I am sure] [Cancel]
  DeleteCancel = 'delete-cancel', // [Yes, Delete] [Cancel]
  ConfirmCancel = 'confirm-cancel', // [Confirm] [Cancel]
  NoButtons = '-', // No buttons
}

// Modal sizes
enum ModalSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

// Button types
enum ButtonType {
  Okay = 'okay',
  Cancel = 'cancel',
  Yes = 'yes',
  No = 'no',
  Abandon = 'abandon',
  GoBack = 'goBack',
  Continue = 'continue',
  ImSure = 'imSure',
  Delete = 'delete',
  Confirm = 'confirm',
}

// Modal type to list of buttons
const modalTypeToButtonTypes: {
  [k: string]: ButtonType[]
} = {
  [ModalType.Okay]: [
    ButtonType.Okay,
  ],
  [ModalType.OkayCancel]: [
    ButtonType.Okay,
    ButtonType.Cancel,
  ],
  [ModalType.YesNo]: [
    ButtonType.Yes,
    ButtonType.No,
  ],
  [ModalType.YesNoCancel]: [
    ButtonType.Yes,
    ButtonType.No,
    ButtonType.Cancel,
  ],
  [ModalType.AbandonGoBack]: [
    ButtonType.Abandon,
    ButtonType.GoBack,
  ],
  [ModalType.ImSureCancel]: [
    ButtonType.ImSure,
    ButtonType.Cancel,
  ],
  [ModalType.DeleteCancel]: [
    ButtonType.Delete,
    ButtonType.Cancel,
  ],
  [ModalType.ConfirmCancel]: [
    ButtonType.Confirm,
    ButtonType.Cancel,
  ],
};

// Button type styling and labels
const buttonTypeToLabelAndVariant = {
  [ButtonType.Okay]: {
    label: 'Okay',
    variant: Variant.Dark,
  },
  [ButtonType.Cancel]: {
    label: 'Cancel',
    variant: Variant.Secondary,
  },
  [ButtonType.Yes]: {
    label: 'Yes',
    variant: Variant.Dark,
  },
  [ButtonType.No]: {
    label: 'No',
    variant: Variant.Secondary,
  },
  [ButtonType.Abandon]: {
    label: 'Abandon Changes',
    variant: Variant.Warning,
  },
  [ButtonType.GoBack]: {
    label: 'Go Back',
    variant: Variant.Secondary,
  },
  [ButtonType.Continue]: {
    label: 'Continue',
    variant: Variant.Dark,
  },
  [ButtonType.ImSure]: {
    label: 'I am sure',
    variant: Variant.Warning,
  },
  [ButtonType.Delete]: {
    label: 'Yes, Delete',
    variant: Variant.Danger,
  },
  [ButtonType.Confirm]: {
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
  onClose?: (type: ButtonType) => void,
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
};

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const Modal: (
  React.FC<Props>
  & {
    ModalType: typeof ModalType,
    ModalSize: typeof ModalSize,
    ButtonType: typeof ButtonType,
    Variant: typeof Variant,
  }
) = (props) => {
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
   * @param buttonType the button that was clicked when closing the
   *   modal
   */
  const handleClose = async (buttonType: ButtonType) => {
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
    onClose(buttonType);
  };

  /*------------------------------------------------------------------------*/
  /*                                 Render                                 */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /*                 Footer                 */
  /*----------------------------------------*/

  // Get list of buttons for this modal type
  const buttonTypes: ButtonType[] = modalTypeToButtonTypes[type] ?? [];

  // Create buttons
  const buttons = buttonTypes.map((buttonType: ButtonType, i) => {
    // Get default style
    let {
      label,
      variant,
    } = buttonTypeToLabelAndVariant[buttonType];

    // Override with customizations
    if (props[`${buttonType}Label`]) {
      label = props[`${buttonType}Label`];
    }
    if (props[`${buttonType}Variant`]) {
      variant = props[`${buttonType}Variant`];
    }

    // Check if this button is last
    const last = (i === buttonTypes.length - 1);

    // Create the button
    return (
      <button
        type="button"
        className={`Modal-${buttonType}-button btn btn-${variant} ${last ? '' : 'mr-1'}`}
        onClick={() => {
          handleClose(buttonType);
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
    <BootstrapModal
      show={visible}
      size={size !== ModalSize.Medium ? size : undefined}
      onHide={() => {
        handleClose(ButtonType.Cancel);
      }}
      style={{ zIndex: 5000000000 }}
      backdropClassName="Modal-backdrop"
      centered
    >
      {title && (
        <BootstrapModal.Header
          closeButton={!!onClose}
        >
          <BootstrapModal.Title>
            {title}
          </BootstrapModal.Title>
        </BootstrapModal.Header>
      )}
      {children && (
        <BootstrapModal.Body>
          {children}
        </BootstrapModal.Body>
      )}
      {footer && (
        <BootstrapModal.Footer>
          {footer}
        </BootstrapModal.Footer>
      )}
    </BootstrapModal>
  );
};

/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/

// Add enums
Modal.ModalType = ModalType;
Modal.ModalSize = ModalSize;
Modal.ButtonType = ButtonType;
Modal.Variant = Variant;

export default Modal;
