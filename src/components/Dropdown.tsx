/**
 * A simple dropdown menu
 * @author Alessandra De Lucas
 * @author Gabe Abrams
 */

// Import React
import React, { useReducer } from 'react';

// Import FontAwesome
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { IconProp } from '@fortawesome/fontawesome-svg-core';

import Variant from '../types/Variant';
/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // currently selected dropdown item
  selectedItem: DropdownItem,
  // List of items in the dropdown menu
  items: DropdownItem[],
  // on click function for the dropdown button
  onChange: (dropdownItem: DropdownItem) => void,
  // If true, dropdown variant is displayed
  variant?: Variant,
  // If true, dropdown will only render content in the dropdown button
  onlyRenderContentInButton?: boolean,
  // Information about the dropdown button
  // dropdownButton: {
  //   // Text
  //   text: string,
  //   // Aria label for accessibility
  //   ariaLabel: string,
  //   // Unique ID
  //   id: string,
  //   // Element icon
  //   icon?: IconProp,
  // },
  // If true, no arrow shows in dropdown
  // noArrow?: boolean,
  // Size of dropdown
  // size?: DropdownSize,
  // Direction of dropdown
  // direction?: DropdownDirection,
};

// Details about a dropdown item
// type DropdownItem = (
//   | {
//     // Header element
//     type: DropdownItemType.Header,
//     // Header text
//     text: string,
//   }
//   | {
//     // Divider element
//     type: DropdownItemType.Divider,
//   }
//   | {
//     // Item from dropdown menu
//     type: DropdownItemType.Item,
//     // Item text
//     text: string,
//     // Item aria label
//     ariaLabel: string,
//     // Unique item ID
//     id: string,
//     // Item icon
//     icon?: IconProp,
//     // Click function for dropdown item
//     onClick: () => void,
//   }
// );

type DropdownItem = {
  // the text of the item
  label: string,
  // the value of the item (used for comparison)
  value: any,
  // optionally, a React node to render as the content of the item
  // this will be rendered instead of the label, and the
  // label will only be used for the aria-label
  content?: React.ReactNode
};

// Types of dropdown items
// enum DropdownItemType {
//   // Dropdown header
//   Header = 'Header',
//   // Dropdown divider
//   Divider = 'Divider',
//   // Dropdown item
//   Item = 'Item',
// }

// Dropdown menu sizes
// enum DropdownSize {
//   // Small dropdown size
//   Small = 'Small',
//   // Medium dropdown size
//   Medium = 'Medium',
//   // Large dropdown size
//   Large = 'Large',
// }

// Dropdown menu direction
// enum DropdownDirection {
//   // Dropdown menu appears centered
//   Centered = 'Centered',
//   // Dropdown menu appears to right of button
//   Right = 'Right',
//   // Dropdown menu appears to left of button
//   Left = 'Left',
//   // Dropdown menu appears above the button
//   Up = 'Up',
//   // Dropdown menu appears below the button
//   Down = 'Down',
// }

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
  // If true, the dropdown menu is open
  isDropdownOpen: boolean,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Toggle opening the dropdown menu
  ToggleDropdown = 'ToggleDropdown',
}

// Action definitions
type Action = (
  | {
    type: ActionType.ToggleDropdown,
  }
);

/**
 * Reducer that executes actions
 * @author Alessandra De Lucas
 * @param state current state
 * @param action action to execute
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ToggleDropdown: {
      return {
        ...state,
        isDropdownOpen: !state.isDropdownOpen,
      };
    }
    default: {
      return state;
    }
  }
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const Dropdown: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    selectedItem,
    items,
    onChange,
    variant,
    onlyRenderContentInButton,
  } = props;

  /* -------------- State ------------- */

  // Initial state
  const initialState: State = {
    isDropdownOpen: false,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    isDropdownOpen,
  } = state;

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <div className="dropdown">
      <button
        className={`btn dropdown-toggle border 
          ${isDropdownOpen && 'show'}
          ${variant && variant === Variant.Dark && 'btn-dark text-light'} 
          ${variant && variant === Variant.Light && 'btn-light text-dark'}
        `}
        type="button"
        id="dropdownMenuButton"
        aria-expanded={isDropdownOpen}
        aria-label={`${selectedItem.label} currently selected. Click to change`}
        onClick={() => {
          dispatch({
            type: ActionType.ToggleDropdown,
          });
        }}
      >
        {
          selectedItem.content
            ? selectedItem.content
            : selectedItem.label
        }
      </button>
      <ul className={`dropdown-menu ${variant && variant === Variant.Dark ? 'dropdown-menu-dark' : ''} ${isDropdownOpen && 'show'}`} aria-labelledby="dropdownMenuButton">
        {Object.values(items).map((item) => {
          return (
            <li
              key={item.label}
            >
              <button
                type="button"
                aria-label={`Show ${item.label}`}
                className={`dropdown-item ${selectedItem.label === item.label
                  ? 'active-custom'
                  : ''
                } 
                `}
                onClick={(e) => {
                  e.preventDefault();
                  onChange(item);
                  dispatch({
                    type: ActionType.ToggleDropdown,
                  });
                }}
                style={{
                  fontWeight: selectedItem.label === item.label ? 'bold' : 'normal',
                }}
              >
                {
                  item.content && !onlyRenderContentInButton
                    ? item.content
                    : item.label
                }
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default Dropdown;
