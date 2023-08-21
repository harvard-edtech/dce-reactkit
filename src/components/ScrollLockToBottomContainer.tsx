/**
 * Container that automatically scrolls when new items are added,
 *   lets the user scroll up to see old items, but resumes
 *   autoscroll when the user scrolls back to the bottom
 * @author Gabe Abrams
 */

// Import React
import React, { useReducer, useEffect, useRef } from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

// Import shared types
import Variant from '../types/Variant';

// Import shared helper
import idify from '../helpers/idify';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // Name items in the container, "Messages" or "Comments" for example
  // If excluded, a generic name will be used
  itemsName?: string,
  // Items in the scroll container
  items: AutoScrollItem[],
  // Custom variant for the "Jump to Bottom" button
  jumpToBottomButtonVariant?: Variant,
};

// AutoScrollItem definition
type AutoScrollItem = {
  // Unique item id
  id: string | number,
  // The item to render
  item: React.ReactNode,
};

/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/

const style = `
  .ScrollLockToBottom-outer-container {
    /* Take up all space */
    height: 100%;
    position: relative;
  }

  .ScrollLockToBottom-scrollable-container {
    /* Take up max 100% height, don't take it up if not needed */
    /* (so column-reverse layout doesn't start at the bottom) */
    max-height: 100%;
    overflow-y: auto;

    /* Allow children to position */
    position: relative;

    /* Reverse order of children so scroll starts at bottom */
    /* (but children will have to be rendered in reverse order) */
    display: flex;
    flex-direction: column-reverse;
  }

  .ScrollLockToBottom-jump-to-bottom-container {
    /* Don't take any space in parent */
    height: 0;
    overflow: visible;

    /* On top of items */
    z-index: 2;

    /* Position in center bottom */
    position: absolute;
    bottom: 2rem;

    /* Center horizontally */
    width: 100%;
    text-align: center;
  }

  .ScrollLockToBottom-item-container {
    /* Normal Height */
    position: relative;
    z-index: 1;
  }
`;

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

// Scrolled to bottom threshold
// (how close you have to be to the bottom for it to count as the bottom)
const SCROLLED_TO_BOTTOM_THRESHOLD_REMS = 2;

/*------------------------------------------------------------------------*/
/* -------------------------- Static Functions -------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Get ids of items
 * @author Gabe Abrams
 * @param items the items in the container
 * @returns ids of items
 */
const getItemIds = (items: AutoScrollItem[]): (string | number)[] => {
  return Array.from(items).map((child) => {
    return child.id;
  });
};

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
  // If true, the user was scrolled to the bottom after last update
  wasScrolledToBottom: boolean,
  // If true, the "jump to bottom" button is visible
  jumpToBottomButtonVisible: boolean,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Identify that the user is now scrolled to the bottom
  NowScrolledToBottom = 'NowScrolledToBottom',
  // Identify that the user scrolled away from the bottom
  NowScrolledAwayFromBottom = 'NowScrolledAwayFromBottom',
  // Identify that new content appeared at the bottom but is not visible
  NewContentAtBottom = 'NewContentAtBottom',
}

// Action definitions
type Action = (
  | {
    // Action type
    type: (
      | ActionType.NowScrolledToBottom
      | ActionType.NowScrolledAwayFromBottom
      | ActionType.NewContentAtBottom
    ),
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
    case ActionType.NowScrolledToBottom: {
      return {
        ...state,
        // Store the event
        wasScrolledToBottom: true,
        // Hide the "jump to bottom" button
        jumpToBottomButtonVisible: false,
      };
    }
    case ActionType.NowScrolledAwayFromBottom: {
      return {
        ...state,
        // Store the event
        wasScrolledToBottom: false,
      };
    }
    case ActionType.NewContentAtBottom: {
      return {
        ...state,
        // Store the event
        wasScrolledToBottom: false,
        // Show the "jump to bottom" button
        jumpToBottomButtonVisible: true,
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

const ScrollLockToBottom: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    itemsName,
    items,
    jumpToBottomButtonVariant = Variant.Danger,
  } = props;

  /* -------------- State ------------- */

  // Initial state
  const initialState: State = {
    wasScrolledToBottom: true,
    jumpToBottomButtonVisible: false,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    wasScrolledToBottom,
    jumpToBottomButtonVisible,
  } = state;

  /* -------------- Refs -------------- */

  // Initialize refs
  const lastItemIds = useRef<(string | number)[]>([]);
  const container = useRef<HTMLDivElement | null>(null);

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Scroll --------------- */
  /*----------------------------------------*/

  /**
   * Check if the user is scrolled to the bottom
   * @author Gabe Abrams
   * @returns true if scrolled to the bottom
   */
  const isScrolledToBottom = (): boolean => {
    // Skip if no container
    if (!container.current) {
      return true;
    }

    // Get info about container
    const {
      scrollTop,
    } = container.current;

    // Distance to bottom
    const rootFontSizePx = Number.parseInt(
      getComputedStyle(document.documentElement).fontSize,
      10,
    );
    const distanceToBottomRems = Math.abs(scrollTop / rootFontSizePx);

    // Figure out if we're scrolled to the bottom
    return (distanceToBottomRems < SCROLLED_TO_BOTTOM_THRESHOLD_REMS);
  };

  /**
   * Scroll the user to the bottom of the container
   * @author Gabe Abrams
   */
  const scrollToBottom = () => {
    // Skip if no container
    if (!container.current) {
      return;
    }

    // Update state
    dispatch({
      type: ActionType.NowScrolledToBottom,
    });

    // Scroll to bottom
    container.current.scrollTop = 0;
  };

  /*----------------------------------------*/
  /* -------------- Handlers -------------- */
  /*----------------------------------------*/

  /**
   * Handle scroll events on the container
   * @author Gabe Abrams
   */
  const handleScroll = () => {
    // Skip if no container
    if (!container.current) {
      return;
    }

    // Check if now scrolled to bottom
    const nowScrolledToBottom = isScrolledToBottom();

    // Remember if now no longer scrolled to bottom
    if (nowScrolledToBottom) {
      dispatch({
        type: ActionType.NowScrolledToBottom,
      });
    } else {
      dispatch({
        type: ActionType.NowScrolledAwayFromBottom,
      });
    }
  };

  /*------------------------------------------------------------------------*/
  /* ------------------------- Lifecycle Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Mount
   * @author Gabe Abrams
   */
  useEffect(
    () => {
      // Scroll to the bottom
      scrollToBottom();
    },
    [],
  );

  /**
   * Update (also called on mount)
   * @author Gabe Abrams
   */
  useEffect(
    () => {
      // Check if new content appeared
      const currentItemIds = getItemIds(items);

      // Check if new content appeared at bottom
      const newContentAtBottom = (
        currentItemIds.length > 0
        && (
          currentItemIds[currentItemIds.length - 1]
          !== lastItemIds.current[lastItemIds.current.length - 1]
        )
      );

      // Do nothing if no new content
      if (!newContentAtBottom) {
        return;
      }

      // Check if used to be scrolled to the bottom
      if (wasScrolledToBottom) {
        // Was scrolled to the bottom! Autoscroll.
        scrollToBottom();
      } else {
        // Not scrolled to bottom. Show "jump to bottom" button.
        dispatch({
          type: ActionType.NewContentAtBottom,
        });
      }

      // Update last item ids
      lastItemIds.current = currentItemIds;
    },
    [items],
  );

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  // Jump to Bottom button
  let jumpToBottomButton: React.ReactNode;
  if (jumpToBottomButtonVisible) {
    jumpToBottomButton = (
      <div className={`ScrollLockToBottom-jump-to-bottom-container ScrollLockToBottom-for-${idify(itemsName ?? 'items')}`}>
        <button
          type="button"
          className={`ScrollLockToBottom-jump-to-bottom-button ScrollLockToBottom-jump-to-bottom-button-for-${idify(itemsName ?? 'items')} btn btn-sm btn-${jumpToBottomButtonVariant} pt-0 pb-0`}
          onClick={scrollToBottom}
          aria-label="scroll back to bottom and show new content"
        >
          New
          {' '}
          {itemsName ?? 'Content'}
          <FontAwesomeIcon
            icon={faChevronDown}
            className="ms-1"
          />
        </button>
      </div>
    );
  }

  // Main UI
  return (
    <div className="ScrollLockToBottom-outer-container bg-warning">
      {/* Style */}
      <style>
        {style}
      </style>

      {/* Jump to bottom button */}
      {jumpToBottomButton}

      {/* Scrollable Item Container */}
      <div
        className="ScrollLockToBottom-scrollable-container"
        onScroll={() => {
          handleScroll();
        }}
        ref={container}
      >
        {/* Items */}
        {
          items
            // Render each item with a key
            .map((item) => {
              return (
                <div
                  className="ScrollLockToBottom-item-container"
                  key={item.id}
                >
                  {item.item}
                </div>
              );
            })
            // Reverse order because flex column is reverse
            .reverse()
        }
      </div>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default ScrollLockToBottom;
