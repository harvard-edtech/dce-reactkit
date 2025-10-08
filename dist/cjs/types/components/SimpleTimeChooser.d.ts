/**
 * A very simple, lightweight time chooser
 * @author Gardenia Liu
 */
import React from 'react';
type Props = {
    ariaLabel: string;
    name: string;
    hour: number;
    minute: number;
    /**
     * Handler for when time changes
     * @param hour new 24hr hour number
     * @param minute new minute number
     */
    onChange: (hour: number, minute: number) => void;
    intervalMin?: number;
    isDisabled?: boolean;
};
declare const SimpleTimeChooser: React.FC<Props>;
export default SimpleTimeChooser;
