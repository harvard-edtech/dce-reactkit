/**
 * An item that can be chosen (for use within ItemPicker)
 * @author Gabe Abrams
 */
type PickableItem = (
  {
    // Unique id of the item
    id: number | string,
    // Name of the item (human readable)
    name: string,
    // Link to view the item in the browser
    link?: string,
  }
  & (
    | {
      // True if this is a group of items
      isGroup: false,
      // True if item is checked
      checked: boolean,
    }
    | {
      // True if this is a group of items
      isGroup: true,
      // List of sub-items
      children: PickableItem[],
    }
  )
);

export default PickableItem;
