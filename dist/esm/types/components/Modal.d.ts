/**
 * A generic popup modal
 * @author Gabe Abrams
 */
import React from 'react';
import Variant from '../types/Variant';
import ModalButtonType from '../types/ModalButtonType';
import ModalSize from '../types/ModalSize';
import ModalType from '../types/ModalType';
type Props = {
    type?: ModalType;
    size?: ModalSize;
    title?: React.ReactNode;
    children?: React.ReactNode;
    onClose?: (type: ModalButtonType) => void;
    dontAllowBackdropExit?: boolean;
    okayLabel?: string;
    okayVariant?: Variant;
    cancelLabel?: string;
    cancelVariant?: Variant;
    yesLabel?: string;
    yesVariant?: Variant;
    noLabel?: string;
    noVariant?: Variant;
    abandonLabel?: string;
    abandonVariant?: Variant;
    goBackLabel?: string;
    goBackVariant?: Variant;
    continueLabel?: string;
    continueVariant?: Variant;
    imSureLabel?: string;
    imSureVariant?: Variant;
    deleteLabel?: string;
    deleteVariant?: Variant;
    confirmLabel?: string;
    confirmVariant?: Variant;
    onTopOfOtherModals?: boolean;
};
declare const Modal: React.FC<Props>;
export default Modal;
