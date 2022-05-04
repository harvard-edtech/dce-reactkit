/**
 * Input group with a title and space for buttons
 * @author Gabe Abrams
 */
import React from 'react';
declare type Props = {
    label: string;
    minLabelWidth?: string;
    children: React.ReactNode;
};
declare const ButtonInputGroup: React.FC<Props>;
export default ButtonInputGroup;
