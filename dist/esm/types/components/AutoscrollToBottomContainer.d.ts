/**
 * Container that automatically scrolls when new items are added,
 *   lets the user scroll up to see old items, but resumes
 *   autoscroll when the user scrolls back to the bottom.
 *   Note: takes up full height of parent, so parent should
 *   have a determined height for the scroll to work.
 * @author Gabe Abrams
 */
import React from 'react';
import Variant from '../types/Variant';
type Props = {
    itemsName?: string;
    items: AutoScrollItem[];
    jumpToBottomButtonVariant?: Variant;
    messageBeforeItems?: React.ReactNode;
    messageAfterItems?: React.ReactNode;
};
type AutoScrollItem = {
    id: string | number;
    item: React.ReactNode;
};
declare const AutoscrollToBottomContainer: React.FC<Props>;
export default AutoscrollToBottomContainer;
