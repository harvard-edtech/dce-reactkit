/**
 * Container that automatically scrolls when new items are added,
 *   lets the user scroll up to see old items, but resumes
 *   autoscroll when the user scrolls back to the bottom
 * @author Gabe Abrams
 */
import React from 'react';
import Variant from '../types/Variant';
type Props = {
    itemsName?: string;
    items: AutoScrollItem[];
    jumpToBottomButtonVariant?: Variant;
};
type AutoScrollItem = {
    id: string | number;
    item: React.ReactNode;
};
declare const ScrollLockToBottom: React.FC<Props>;
export default ScrollLockToBottom;
