/**
 * Simple tooltip component
 * @author Gabe Abrams
 */
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
type Props = {
    icon?: IconProp;
    text: string;
    children: React.ReactNode;
    wide?: boolean;
    thin?: boolean;
    containerIsDisplayBlock?: boolean;
};
declare const Tooltip: React.FC<Props>;
export default Tooltip;
