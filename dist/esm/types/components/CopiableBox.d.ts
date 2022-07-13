/**
 * Copiable text box
 * @author Gabe Abrams
 */
import React from 'react';
declare type Props = {
    name: string;
    text: string;
    label: string;
    labelIcon?: any;
    minLabelWidthRem: number;
    multiline?: boolean;
    numVisibleLines?: number;
};
declare const CopiableBox: React.FC<Props>;
export default CopiableBox;
