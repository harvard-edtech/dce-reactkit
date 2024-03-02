/**
 * Input group with a title and space for buttons
 * @author Gabe Abrams
 */
import React from 'react';
type Props = {
    label: React.ReactNode;
    minLabelWidth?: string;
    children: React.ReactNode;
    className?: string;
    wrapButtonsAndAddGaps?: boolean;
    isAdminFeature?: boolean;
    noMarginOnBottom?: boolean;
};
declare const ButtonInputGroup: React.FC<Props>;
export default ButtonInputGroup;
