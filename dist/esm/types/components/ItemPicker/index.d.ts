/**
 * Reusable nested item picker
 * @author Yuen Ler Chow
 */
import React from 'react';
import PickableItem from './types/PickableItem';
type Props = {
    title: string;
    items: PickableItem[];
    /**
     * Handler to call when item selection is changed
     * @param updatedItems an updated copy of the list of items with checked
     *   values updated
     */
    onChanged: (updatedItems: PickableItem[]) => void;
    noBottomMargin?: boolean;
    hideSelectAllOrNoneButtons?: boolean;
};
declare const ItemPicker: React.FC<Props>;
export default ItemPicker;
