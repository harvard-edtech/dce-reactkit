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
  // If true, hide select all or none buttons
  hideSelectAllOrNoneButtons?: boolean,
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
    hideSelectAllOrNoneButtons,
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

  // Select all/none
  const selectAllOrNone = (
    !hideSelectAllOrNoneButtons
      ? (
        <div
          className="d-flex h-100 align-items-end flex-row"
        >
          <div className="d-flex justify-content-end">
            {/* Label */}
            <div
              className="me-2"
              style={{ fontSize: '1.2rem' }}
            >
              Select
            </div>
            {/* Buttons */}
            <div className="btn-group" role="group">
              {/* All */}
              <button
                type="button"
                style={{ borderRight: '0.1rem solid white' }}
                aria-label="Select all contexts"
                className="btn btn-secondary py-0"
                onClick={handleSelectAll}
              >
                All
              </button>
              {/* None */}
              <button
                type="button"
                aria-label="Deselect all contexts"
                className="btn btn-secondary py-0"
                onClick={handleDeselectAll}
              >
                None
              </button>
            </div>
          </div>
        </div>
      )
      : undefined
  );

  // Main UI
  return (
    <TabBox
      title={title}
      noBottomMargin={noBottomMargin}
      topRightChildren={selectAllOrNone}
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
