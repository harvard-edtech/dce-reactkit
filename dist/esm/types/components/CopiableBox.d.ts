/**
 * Copiable text box
 * @author Gabe Abrams
 */
import React from 'react';
declare type Props = {
    text: string;
    label: string;
    labelIcon?: any;
    minLabelWidthRem?: number;
    multiline?: boolean;
    numVisibleLines?: number;
    onClick?: () => void;
    textAreaId?: string;
    copyButtonId?: string;
};
declare const CopiableBox: React.FC<Props>;
export default CopiableBox;
