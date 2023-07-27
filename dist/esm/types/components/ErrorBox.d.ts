/**
 * Displays an error
 * @author Gabe Abrams
 */
import React from 'react';
type Props = {
    error: any;
    title?: string;
    onClose?: () => void;
};
declare const ErrorBox: React.FC<Props>;
export default ErrorBox;
