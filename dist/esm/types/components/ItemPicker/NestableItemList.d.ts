/**
 * Reusable nested item picker
 * @author Yuen Ler Chow
 */
import React from 'react';
import PickableItem from './types/PickableItem';
declare type Props = {
    items: PickableItem[];
    /**
     * Handler to call when item selection is changed
     * @param updatedItems an updated copy of the list of items with checked
     *   values updated
     */
    onChanged: (updatedItems: PickableItem[]) => void;
};
declare const NestableItemList: React.FC<Props>;
export default NestableItemList;
