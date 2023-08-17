/**
 * A toggle switch that toggles on or off
 * @author Alessandra De Lucas
 * @author Gabe Abrams
 */
import React from 'react';
import Variant from '../types/Variant';
type Props = {
    isOn: boolean;
    /**
     * A handler to call when the switch is toggled
     * @param isOn Updated value for isOn
     */
    onToggle: (isOn: boolean) => void;
    id?: string;
    description: string;
    backgroundVariantWhenOn?: Variant;
};
declare const ToggleSwitch: React.FC<Props>;
export default ToggleSwitch;
