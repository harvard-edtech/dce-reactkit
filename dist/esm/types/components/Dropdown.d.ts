/**
 * A simple dropdown menu
 * @author Alessandra De Lucas
 * @author Gabe Abrams
 * @author Yuen Ler Chow
 */
import React from 'react';
import Variant from '../types/Variant';
import DropdownItemType from '../types/DropdownItemType';
type Props = {
    items: DropdownItem[];
    variant?: Variant;
    dropdownButton: {
        ariaLabel: string;
        id: string;
        content?: React.ReactNode;
    };
};
type DropdownItem = ({
    type: DropdownItemType.Header;
    content: React.ReactNode;
} | {
    type: DropdownItemType.Divider;
} | {
    type: DropdownItemType.Item;
    content: React.ReactNode;
    ariaLabel: string;
    id: string;
    onClick: () => void;
});
declare const Dropdown: React.FC<Props>;
export default Dropdown;
