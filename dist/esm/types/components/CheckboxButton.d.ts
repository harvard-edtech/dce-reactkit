/**
 * A checkbox button
 * @author Gabe Abrams
 */
import React from 'react';
import Variant from '../types/Variant';
declare type Props = {
    text: string;
    onChanged: (checked: boolean) => void;
    ariaLabel: string;
    title?: string;
    checked?: boolean;
    id?: string;
    noMarginOnRight?: boolean;
    checkedVariant?: Variant;
    uncheckedVariant?: Variant;
    small?: boolean;
    dashed?: boolean;
};
declare const CheckboxButton: React.FC<Props>;
export default CheckboxButton;
