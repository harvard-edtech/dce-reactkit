/**
 * A simple dropdown menu
 * @author Alessandra De Lucas
 * @author Yuen Ler Chow
 * @author Gabe Abrams
 */

// Import React
import React, { useEffect, useReducer, useRef } from 'react';

// Import helpers
import combineClassNames from '../helpers/combineClassNames';

// Import shared types
import Variant from '../types/Variant';
import DropdownItemType from '../types/DropdownItemType';

// Check dark mode
import { isDarkModeOn } from '../client/initClient';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // List of items in the dropdown menu
  items: DropdownItem[],
  // Information about the dropdown button
  dropdownButton: {
    // Aria label for accessibility
    ariaLabel: string,
    // Unique ID
    id: string,
    // Button content
    content?: React.ReactNode,
    // Variant
    variant?: Variant,
  },
  // If true, no arrow shows in dropdown
  // noArrow?: boolean,
  // Size of dropdown
  // size?: DropdownSize,
  // Direction of dropdown
  // direction?: DropdownDirection,
};

// Details about a dropdown item
type DropdownItem = (
  | {
    // Header element
    type: DropdownItemType.Header,
    // Header content
    content: React.ReactNode,
  }
  | {
    // Divider element
    type: DropdownItemType.Divider,
  }
  | {
    // Item from dropdown menu
    type: DropdownItemType.Item,
    // Item content
    content: React.ReactNode,
    // Item aria label
    ariaLabel: string,
    // Unique item ID
    id: string,
    // Click function for dropdown item
    onClick: () => void,
  }
);

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
  // Close the dropdown menu
  CloseDropdown = 'CloseDropdown',
}

// Action definitions
type Action = (
  | {
    type: ActionType.ToggleDropdown,
  }
  | {
    type: ActionType.CloseDropdown,
  }
);

/**
 * Reducer that executes actions
 * @author Alessandra De Lucas
 * @author Yuen Ler Chow
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
    case ActionType.CloseDropdown: {
      return {
        ...state,
        isDropdownOpen: false,
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
    dropdownButton,
    items,
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

  /* -------------- Refs -------------- */

  // Initialize refs
  const dropdownRef = useRef<HTMLDivElement>(null);

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Handle clicking outside of the dropdown menu to close it
   * @author Yuen Ler Chow
   * @param event the mouse event
   */
  const handleClickOutside = (event: MouseEvent) => {
    if (
      // Dropdown has been rendered
      dropdownRef.current
      // Click occurred outside the dropdown
      && !dropdownRef.current.contains(event.target as Element)
    ) {
      dispatch({ type: ActionType.CloseDropdown });
    }
  };

  /*------------------------------------------------------------------------*/
  /* ------------------------- Lifecycle Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Mount
   * @author Yuen Ler Chow
   */
  useEffect(() => {
    // Add event listener to close dropdown when clicking outside
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <div
      className="dropdown"
      ref={dropdownRef}
      data-bs-theme={isDarkModeOn() ? 'dark' : undefined}
    >
      <button
        className={
          combineClassNames([
            'btn dropdown-toggle border',
            isDropdownOpen && 'show',
            `btn-${dropdownButton.variant}`,
            dropdownButton.variant === Variant.Light && 'text-dark',
          ])
        }
        type="button"
        id={dropdownButton.id}
        aria-expanded={isDropdownOpen}
        aria-label={dropdownButton.ariaLabel}
        onClick={() => {
          dispatch({
            type: ActionType.ToggleDropdown,
          });
        }}
      >
        {
          dropdownButton.content
        }
      </button>
      <ul
        className={
          combineClassNames([
            'dropdown-menu',
            isDarkModeOn() && 'dropdown-menu-dark',
            isDropdownOpen && 'show',
          ])
        }
      >
        {Object.values(items).map((item) => {
          if (item.type === DropdownItemType.Header) {
            return (
              // TODO: Implement header
              <span />
            );
          }
          if (item.type === DropdownItemType.Divider) {
            return (
              // TODO: Implement divider
              <span />
            );
          }
          return (
            <li
              key={item.id}
            >
              <button
                type="button"
                aria-label={item.ariaLabel}
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({
                    type: ActionType.CloseDropdown,
                  });
                  item.onClick();
                }}
              >
                {item.content}
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
