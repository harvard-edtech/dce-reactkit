/**
 * A switch with multiple options for selection
 * @author Alessandra De Lucas
 * @author Gabe Abrams
 */
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
type Props = {
    options: Option[];
    selectedOptionId: string;
    /**
     * A handler to call when the switch is changed
     * @param selectedOptionId Updated option when switch is changed
     */
    onChange: (selectedOptionId: string) => void;
    heightRem?: number;
};
type Option = {
    label: string;
    icon: IconProp;
    id: string;
};
declare const MultiSwitch: React.FC<Props>;
export default MultiSwitch;
