/**
 * Copiable text box
 * @author Gabe Abrams
 */
import React from 'react';
type Props = {
    text: string;
    maxTextWidthRem?: number;
    label?: string;
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
