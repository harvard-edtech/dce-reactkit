/**
 * A radio selection button
 * @author Gabe Abrams
 */
import React from 'react';
import Variant from '../types/Variant';
declare type Props = {
    text: string;
    onSelected: () => void;
    ariaLabel: string;
    title?: string;
    selected?: boolean;
    id?: string;
    noMarginOnRight?: boolean;
    selectedVariant?: Variant;
    unselectedVariant?: Variant;
    small?: boolean;
};
declare const RadioButton: React.FC<Props>;
export default RadioButton;
