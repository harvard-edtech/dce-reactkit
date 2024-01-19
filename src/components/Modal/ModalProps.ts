// Import types
import Variant from '../../types/Variant';
import ModalButtonType from '../../types/ModalButtonType';
import ModalSize from '../../types/ModalSize';
import ModalType from '../../types/ModalType';

/**
 * Props for the Modal component
 * @author Gabe Abrams
 */
type ModalProps = {
  // Key of the modal
  key?: string,
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
  // If true, don't show the "X" close button
  dontShowXButton?: boolean,
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

export default ModalProps;
