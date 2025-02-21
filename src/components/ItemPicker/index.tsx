/**
 * Reusable nested item picker
 * @author Yuen Ler Chow
 */

// Import React
import React from 'react';

// Import shared components
import TabBox from '../TabBox';

// Import types
import PickableItem from './types/PickableItem';

// Import sub-components
import NestableItemList from './NestableItemList';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // Title of the picker
  title: string,
  // List of items to show
  items: PickableItem[],
  /**
   * Handler to call when item selection is changed
   * @param updatedItems an updated copy of the list of items with checked
   *   values updated
   */
  onChanged: (updatedItems: PickableItem[]) => void,
  // If true, don't add margin to bottom of item picker
  noBottomMargin?: boolean,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const ItemPicker: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    title,
    items,
    onChanged,
    noBottomMargin,
  } = props;

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Updates the checked state of an item (including all children)
   * @author Yuen Ler Chow
   * @param item the item to update
   * @param checked the new checked state
   * @returns the updated item
   */
  const updateItemChecked = (
    item: PickableItem,
    checked: boolean,
  ): PickableItem => {
    if (item.isGroup) {
      return {
        ...item,
        children: item.children.map((child) => {
          return updateItemChecked(child, checked);
        }),
      };
    }
    return { ...item, checked };
  };

  /**
   * Selects all items in the list
   * @author Yuen Ler Chow
   */
  const handleSelectAll = () => {
    const updatedItems = items.map(
      (item) => {
        return updateItemChecked(item, true);
      },
    );
    onChanged(updatedItems);
  };

  /**
   * Deselects all items in the list
   * @author Yuen Ler Chow
   */
  const handleDeselectAll = () => {
    const updatedItems = items.map(
      (item) => {
        return updateItemChecked(item, false);
      },
    );
    onChanged(updatedItems);
  };

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <TabBox
      title={title}
      noBottomMargin={noBottomMargin}
      topRightChildren={(
        <div style={{ marginTop: '-1rem' }} className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSelectAll}
          >
            Select All
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={handleDeselectAll}
          >
            Deselect All
          </button>
        </div>
      )}
    >
      <div style={{ overflowX: 'auto' }}>
        <NestableItemList
          items={items}
          onChanged={onChanged}
        />
      </div>
    </TabBox>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default ItemPicker;
