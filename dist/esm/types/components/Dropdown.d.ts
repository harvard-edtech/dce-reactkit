/**
 * A simple dropdown menu
 * @author Alessandra De Lucas
 * @author Yuen Ler Chow
 * @author Gabe Abrams
 */
import React from 'react';
import Variant from '../types/Variant';
import DropdownItemType from '../types/DropdownItemType';
type Props = {
    items: DropdownItem[];
    dropdownButton: {
        ariaLabel: string;
        id: string;
        content?: React.ReactNode;
        variant?: Variant;
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
