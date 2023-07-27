/**
 * Reusable nested item picker
 * @author Yuen Ler Chow
 * @author Gabe Abrams
 */
import React from 'react';
import PickableItem from './types/PickableItem';
type Props = {
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
