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
/*                                  Types                                 */
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
/*                                Component                               */
/*------------------------------------------------------------------------*/

const ItemPicker: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /*                                  Setup                                 */
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
  /*                           Component Functions                          */
  /*------------------------------------------------------------------------*/

  /*------------------------------------------------------------------------*/
  /*                                 Render                                 */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /*                 Main UI                */
  /*----------------------------------------*/

  return (
    <TabBox
      title={title}
      noBottomMargin={noBottomMargin}
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
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/

// Export component
export default ItemPicker;
