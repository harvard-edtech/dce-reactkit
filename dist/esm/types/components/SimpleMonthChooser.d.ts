/**
 * A very simple, lightweight month chooser
 * @author Gabe Abrams
 */
import React from 'react';
type Props = {
    ariaLabel: string;
    name: string;
    month: number;
    year: number;
    /**
     * Handler for when month changes
     * @param month new 1-indexed month number
     * @param year new full year number
     */
    onChange: (month: number, year: number) => void;
    numMonthsToShow?: number;
    dontAllowPast?: boolean;
    dontAllowFuture?: boolean;
    isDisabled?: boolean;
};
declare const SimpleMonthChooser: React.FC<Props>;
export default SimpleMonthChooser;
