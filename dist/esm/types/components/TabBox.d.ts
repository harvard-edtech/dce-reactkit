/**
 * A box with a tab on the top that holds buttons and other content
 * @author Gabe Abrams
 */
import React from 'react';
type Props = {
    title: React.ReactNode;
    children: React.ReactNode;
    topRightChildren?: React.ReactNode;
    noBottomMargin?: boolean;
    noBottomPadding?: boolean;
    minTitleWidth?: string;
};
declare const TabBox: React.FC<Props>;
export default TabBox;
