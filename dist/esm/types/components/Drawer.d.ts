/**
 * Drawer container
 * @author Gabe Abrams
 */
import React from 'react';
type Props = {
    grayBackground?: boolean;
    customBackgroundColor?: string;
    children: React.ReactNode;
};
declare const Drawer: React.FC<Props>;
export default Drawer;
