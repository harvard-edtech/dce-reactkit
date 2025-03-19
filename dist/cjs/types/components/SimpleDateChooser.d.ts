/**
 * A very simple, lightweight date chooser
 * @author Gabe Abrams
 * @author Gardeniu Liu
 */
import React from 'react';
type Props = {
    ariaLabel: string;
    name: string;
    month: number;
    day: number;
    year: number;
    /**
     * Handler for when date changes
     * @param month new 1-indexed month number
     * @param day new 1-indexed day number
     * @param year new full year number
     */
    onChange: (month: number, day: number, year: number) => void;
    numMonthsToShow?: number;
    dontAllowPast?: boolean;
    dontAllowFuture?: boolean;
};
declare const SimpleDateChooser: React.FC<Props>;
export default SimpleDateChooser;
