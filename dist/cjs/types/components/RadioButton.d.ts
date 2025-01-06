/**
 * A radio selection button
 * @author Gabe Abrams
 */
import React from 'react';
import Variant from '../types/Variant';
type Props = {
    text: React.ReactNode;
    onSelected: () => void;
    ariaLabel: string;
    title?: string;
    selected?: boolean;
    id?: string;
    className?: string;
    noMarginOnRight?: boolean;
    selectedVariant?: Variant;
    unselectedVariant?: Variant;
    small?: boolean;
    useComplexFormatting?: boolean;
};
declare const RadioButton: React.FC<Props>;
export default RadioButton;
