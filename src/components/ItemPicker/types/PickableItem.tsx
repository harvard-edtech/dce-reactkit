/**
 * An item that can be chosen (for use within ItemPicker)
 * @author Gabe Abrams
 */
type PickableItem = (
  {
    // Unique id of the item
    id: number | string,
    // Name of the item (human readable)
    name: React.ReactNode,
    // Accessible label for the item, used for screen readers. Required when
    // "name" is not a plain string (e.g. a custom ReactNode); when "name" is
    // a string, it is used as the label if this is not provided
    ariaLabel?: string,
    // Link to view the item in the browser
    link?: string,
    // If included, show this text in a tooltip when hovering over the item
    tooltip?: string,
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
