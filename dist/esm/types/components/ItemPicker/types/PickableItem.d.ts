/// <reference types="react" />
/**
 * An item that can be chosen (for use within ItemPicker)
 * @author Gabe Abrams
 */
type PickableItem = ({
    id: number | string;
    name: React.ReactNode;
    ariaLabel?: string;
    link?: string;
    tooltip?: string;
} & ({
    isGroup: false;
    checked: boolean;
} | {
    isGroup: true;
    children: PickableItem[];
}));
export default PickableItem;
