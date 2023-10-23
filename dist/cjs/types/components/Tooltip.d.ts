/**
 * Simple tooltip component
 * @author Gabe Abrams
 */
import React from 'react';
type Props = {
    text: string;
    children: JSX.Element;
};
declare const Tooltip: React.FC<Props>;
export default Tooltip;
