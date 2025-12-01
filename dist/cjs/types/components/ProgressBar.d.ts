/**
 * Customizable Progress Bar component using Bootstrap styles
 * @author Allison Zhang
 */
import React from 'react';
import Variant from '../types/Variant';
import ProgressBarSize from '../types/ProgressBarSize';
type Props = (({
    percentProgress: number;
    numDecimalPlaces?: number;
} | {
    numComplete: number;
    total: number;
}) & {
    striped?: boolean;
    variant?: Variant;
    bgVariant?: Variant;
    showOutline?: boolean;
    size?: ProgressBarSize;
});
declare const ProgressBar: React.FC<Props>;
export default ProgressBar;
