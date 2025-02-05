/**
 * Reusable nested item picker
 * @author Yuen Ler Chow
 * @author Gabe Abrams
 */

// Import React
import React, { useReducer } from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

// Import shared components
import CheckboxButton from '../CheckboxButton';
import Variant from '../../types/Variant';

// Import types
import PickableItem from './types/PickableItem';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // List of items to show
  items: PickableItem[],
  /**
   * Handler to call when item selection is changed
   * @param updatedItems an updated copy of the list of items with checked
   *   values updated
   */
  onChanged: (updatedItems: PickableItem[]) => void,
};

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
  // Map of children that are expanded
  childExpanded: {
    [k: string]: boolean
  },
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Toggle whether a child are being shown
  ToggleChild = 'toggle-child',
}

// Action definitions
type Action = (
  | {
    // Action type
    type: ActionType.ToggleChild,
    // Id of the child to show
    id: (string | number),
  }
);

/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ToggleChild: {
      return {
        ...state,
        childExpanded: {
          ...state.childExpanded,
          [String(action.id)]: !state.childExpanded[String(action.id)],
        },
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

const NestableItemList: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    items,
    onChanged,
  } = props;

  /* -------------- State ------------- */

  // Create initial map of child expanded booleans
  const initChildExpanded: { [k: string]: boolean } = {};
  items.forEach((item) => {
    initChildExpanded[String(item.id)] = false;
  });

  // Initial state
  const initialState: State = {
    childExpanded: initChildExpanded,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    childExpanded,
  } = state;

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Checks if all items in a list are checked
   * @author Yuen Ler Chow
   * @param pickableItems a list of items
   * @returns true if all items are checked. If any item is a group,
   *   we recursively check its children
   */
  const allChecked = (pickableItems: PickableItem[]): boolean => {
    return pickableItems.every((item: PickableItem) => {
      if (item.isGroup) {
        return allChecked(item.children);
      }
      return item.checked;
    });
  };

  /**
   * Checks if none of the items in a list are checked
   * @author Yuen Ler Chow
   * @param pickableItems a list of items
   * @returns true if all items are unchecked. If any item is a group, we
   *   recursively check its children
   */
  const noneChecked = (pickableItems: PickableItem[]): boolean => {
    return pickableItems.every((item: PickableItem) => {
      if (item.isGroup) {
        return noneChecked(item.children);
      }
      return !item.checked;
    });
  };

  /**
   * Change whether specific items are checked
   * @author Yuen Ler Chow
   * @param id the id of the item we want to check or uncheck OR true if
   *   we are checking/unchecking all items, independent of their id
   * @param checked if true, the item will be checked.
   * @param pickableItems the list of items we iterate through to find the item
   *   we want to check/uncheck
   * @returns a list of items with the item now checked/unchecked.
   *   If it is a group, its children will also become checked/unchecked
   */
  const changeChecked = (id: string | number | true, checked: boolean, pickableItems: PickableItem[]): PickableItem[] => {
    const updatedItems: PickableItem[] = pickableItems.map((item: PickableItem) => {
      if (item.id === id || id === true) {
        if (item.isGroup) {
          return {
            ...item,
            children: changeChecked(true, checked, item.children),
          };
        }
        return {
          ...item,
          checked,
        };
      }
      if (item.isGroup) {
        return {
          ...item,
          children: changeChecked(id, checked, item.children),
        };
      }
      return item;
    });
    return updatedItems;
  };

  /**
   * Within a tree of items, swap in the list of updated items into the spot
   *   indicated by the id
   * @author Yuen Ler Chow
   * @param id the id of the item group we want to change
   * @param updatedItems the list of items we want to change the items in the group to
   * @returns a list of all items containing the updated items
   */
  const changeItems = (id: string | number, updatedItems: PickableItem[]): PickableItem[] => {
    return items.map((item: PickableItem) => {
      if (item.id === id) {
        return {
          ...item,
          children: updatedItems,
        };
      }
      return item;
    });
  };

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  return (
    <div>
      {
        items.map((item) => {
          return (
            <div key={item.id}>
              {/* Dropdown Button */}
              <span
                className="NestableItemList-dropdown-button-container d-inline-block"
                style={{
                  minWidth: '2rem',
                }}
              >
                {item.isGroup && (
                  <button
                    className={`NestableItemList-dropdown-button NestableItemList-dropdown-button-${item.id}`}
                    style={{
                      border: 0,
                      backgroundColor: 'transparent',
                    }}
                    type="button"
                    onClick={() => {
                      dispatch({
                        type: ActionType.ToggleChild,
                        id: item.id,
                      });
                    }}
                    aria-label={`${childExpanded[item.id] ? 'Hide' : 'Show'} items in ${item.name}`}
                  >
                    <FontAwesomeIcon
                      icon={childExpanded[item.id] ? faChevronDown : faChevronRight}
                    />
                  </button>
                )}
              </span>

              {/* Checkbox and Text */}
              <CheckboxButton
                className={`NestableItemList-CheckboxButton-${item.id}`}
                text={item.name}
                checked={item.isGroup ? allChecked(item.children) : item.checked}
                dashed={item.isGroup ? !noneChecked(item.children) : false}
                onChanged={(checked) => {
                  onChanged(changeChecked(item.id, checked, items));
                }}
                ariaLabel={`Select ${item.name}`}
                checkedVariant={Variant.Light}
                uncheckedVariant={Variant.Light}
              />

              {/* Children */}
              {(item.isGroup && childExpanded[item.id]) && (
                <div
                  className="NestableItemList-children-container"
                  style={{
                    paddingLeft: '2.2rem',
                  }}
                >
                  <NestableItemList
                    items={item.children}
                    onChanged={(updatedItems) => {
                      onChanged(changeItems(item.id, updatedItems));
                    }}
                  />
                </div>
              )}
            </div>
          );
        })
      }
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default NestableItemList;
