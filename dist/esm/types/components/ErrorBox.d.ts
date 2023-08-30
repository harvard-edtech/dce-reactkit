/**
 * Displays an error
 * @author Gabe Abrams
 */
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Variant from '../types/Variant';
type Props = {
    error: any;
    title?: string;
    onClose?: () => void;
    variant?: Variant;
    icon?: IconProp;
};
declare const ErrorBox: React.FC<Props>;
export default ErrorBox;
