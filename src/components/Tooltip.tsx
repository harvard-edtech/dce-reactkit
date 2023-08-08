/**
 * Simple tooltip component
 * @author Gabe Abrams
 */

// Import React
import React, { useEffect, useReducer, useRef } from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // Icon to show next to the text
  icon?: IconProp,
  // Text of the tooltip
  text: string,
  // Children to wrap in the tooltip
  children: React.ReactNode,
  // If true, tooltip is wider
  wide?: boolean,
  // If true, tooltip is thinner
  thin?: boolean,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

// Tooltip widths
const TOOLTIP_WIDTH_THIN_REM = 5;
const TOOLTIP_WIDTH_NORMAL_REM = 7;
const TOOLTIP_WIDTH_WIDE_REM = 10;

// Tooltip border radius
const TOOLTIP_BORDER_RADIUS_REM = 0.3;

/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/

const style = `
  /* Container for contents and tooltip */
  .Tooltip-outer-container {
    display: inline-block;
    position: relative;
  }

  /* Container for just tooltip */
  .Tooltip-tooltip-container {
    /* Position in middle but take no space */
    /* (so layout of page is unaffected) */
    position: absolute;
    display: inline-block;
    top: 0;
    left: 50%;
    height: 0;
    width: 0;
    overflow: visible;
  }

  /* Tooltip */
  .Tooltip-tooltip {
    /* Position above item */
    display: inline-block;
    position: absolute;
    top: -2.3rem;
    height: 1.8rem;
    z-index: 1;

    /* Use standard black font */
    font-size: 1rem;
    color: black;

    /* Non-interactive */
    pointer-events: none;
  }

  /* Tooltip box (the rectangle surrounding the text) */
  .Tooltip-box,
  .Tooltip-box-shadow,
  .Tooltip-box-highlight {
    /* Fill all space with rectangle */
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    width: 100%;
    height: 100%;

    /* Rounded border */
    border: 0.15rem solid black;
    border-radius: ${TOOLTIP_BORDER_RADIUS_REM}rem;
  }

  /* Tooltip highlight (the bright background to the text) */
  .Tooltip-box-highlight {
    /* Bootstrap warning variant background */
    background-color: rgb(255, 193, 7);
    border-radius: ${TOOLTIP_BORDER_RADIUS_REM}rem;

    /* Place on top */
    z-index: -1;
  }

  /* Tooltip box (the black rectangle) */
  .Tooltip-box {
    /* Plain black background */
    background-color: black;

    /* Place in middle */
    z-index: -2;
  }

  /* Tooltip box shadow (the white shadow beneath the box) */
  .Tooltip-box-shadow {
    /* White shadow */
    box-shadow: 0 0 0.3rem white;

    /* Place beneath */
    z-index: -3;
  }

  /* Tooltip contents (the text and icon) */
  .Tooltip-contents {
    /* Center text, don't allow overflow */
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Space within parent */
    z-index: 1;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    height: 100%;
  }

  /* Tooltip text */
  .Tooltip-text {
    /* Center text, add ellipsis */
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
  }

  /* Classes to switch between tooltip visible/hidden */
  .Tooltip-tooltip-visible-true {
    opacity: 1;
  }
  .Tooltip-tooltip-visible-false {
    opacity: 0;
  }

  /* Classes to switch between tooltip sizes */
  .Tooltip-size-thin {
    width: ${TOOLTIP_WIDTH_THIN_REM}rem;
    left: calc(50% - ${TOOLTIP_WIDTH_THIN_REM / 2}rem);
  }
  .Tooltip-size-normal {
    width: ${TOOLTIP_WIDTH_NORMAL_REM}rem;
    left: calc(50% - ${TOOLTIP_WIDTH_NORMAL_REM / 2}rem);
  }
  .Tooltip-size-wide {
    width: ${TOOLTIP_WIDTH_WIDE_REM}rem;
    left: calc(50% - ${TOOLTIP_WIDTH_WIDE_REM / 2}rem);
  }

  /* Arrow (beneath tooltip) */
  .Tooltip-arrow,
  .Tooltip-arrow-shadow {
    /* Position beneath tooltip */
    position: absolute;
    top: -1.5rem;
    font-size: 1.5rem;
    left: calc(50% - 0.5rem);
    width: 0;
    display: inline-block;

    /* Non-interactive */
    pointer-events: none;
  }

  /* Arrow itself */
  .Tooltip-arrow {
    color: black;
    z-index: 4;
  }

  /* Arrow shadow */
  .Tooltip-arrow-shadow {
    z-index: -1;

    /* Blur a white version of the caret as a shadow */
    color: white;
    filter: blur(0.2rem);
  }

  /* Classes to switch between arrow visible/hidden */
  .Tooltip-arrow-visible-true {
    opacity: 1;
  }
  .Tooltip-arrow-visible-false {
    opacity: 0;
  }
`;

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
  // If true, the tooltip is visible
  isVisible: boolean,
  // Number of pixels to nudge the tooltip
  nudgePx: number,
  // If true, bottom left corner of tooltip should not be rounded
  squareBottomLeft?: boolean,
  // If true, bottom right corner of tooltip should not be rounded
  squareBottomRight?: boolean,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Make the tooltip visible
  Show = 'Show',
  // Make the tooltip invisible
  Hide = 'Hide',
  // Set nudge pixels
  SetNudgePx = 'SetNudgePx',
  // Set whether bottom left corner should be square
  SetSquareBottomLeft = 'SetSquareBottomLeft',
  // Set whether bottom right corner should be square
  SetSquareBottomRight = 'SetSquareBottomRight',
}

// Action definitions
type Action = (
  | {
    // Action type
    type: ActionType.SetNudgePx,
    // Number of pixels to nudge the tooltip
    nudgePx: number,
  }
  | {
    // Action type
    type: ActionType.SetSquareBottomLeft,
    // If true, bottom left corner of tooltip should not be rounded
    squareBottomLeft: boolean,
  }
  | {
    // Action type
    type: ActionType.SetSquareBottomRight,
    // If true, bottom right corner of tooltip should not be rounded
    squareBottomRight: boolean,
  }
  | {
    // Action type
    type: (
      | ActionType.Show
      | ActionType.Hide
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
    case ActionType.Show: {
      return {
        ...state,
        isVisible: true,
      };
    }
    case ActionType.Hide: {
      return {
        ...state,
        isVisible: false,
        nudgePx: 0,
      };
    }
    case ActionType.SetNudgePx: {
      return {
        ...state,
        nudgePx: action.nudgePx,
      };
    }
    case ActionType.SetSquareBottomLeft: {
      return {
        ...state,
        squareBottomLeft: action.squareBottomLeft,
      };
    }
    case ActionType.SetSquareBottomRight: {
      return {
        ...state,
        squareBottomRight: action.squareBottomRight,
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

const Tooltip: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    icon,
    text,
    children,
    wide,
    thin,
  } = props;

  /* -------------- State ------------- */

  // Initial state
  const initialState: State = {
    isVisible: false,
    nudgePx: 0,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    isVisible,
    nudgePx,
    squareBottomLeft,
    squareBottomRight,
  } = state;

  /* -------------- Refs -------------- */

  // Initialize refs
  const tooltipContainer = useRef<HTMLDivElement | null>(null);
  const arrowElement = useRef<HTMLDivElement | null>(null);

  /*------------------------------------------------------------------------*/
  /* ------------------------- Lifecycle Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Update (also called on mount)
   * @author Gabe Abrams
   */
  useEffect(
    () => {
      // Update tooltip container position
      if (tooltipContainer.current && isVisible) {
        // Get the tooltip container location
        const tooltipContainerRect = (
          tooltipContainer
            .current
            .getBoundingClientRect()
        );

        // Get the window width
        const windowWidth = window.innerWidth;

        // Calculate new nudge value
        let newNudgePx: number;
        if (tooltipContainerRect.left < 0) {
          // Tooltip is off the left side of the screen
          newNudgePx = -1 * tooltipContainerRect.left;
        } else if (tooltipContainerRect.right > windowWidth) {
          // Tooltip is off the right side of the screen
          newNudgePx = -1 * (tooltipContainerRect.right - windowWidth);
        } else {
          // Tooltip is in the middle of the screen
          newNudgePx = 0;
        }

        // Update state
        dispatch({
          type: ActionType.SetNudgePx,
          nudgePx: newNudgePx,
        });
      }

      // Update border rounding
      if (arrowElement.current && isVisible) {
        // Get the arrow location
        const arrowRect = (
          arrowElement
            .current
            .getBoundingClientRect()
        );

        // REM in pixels given font size
        const remInPixels = Number.parseInt(
          getComputedStyle(document.documentElement).fontSize,
          10,
        );

        // Set bottom left corner rounding
        dispatch({
          type: ActionType.SetSquareBottomLeft,
          squareBottomLeft: (
            arrowRect.left < (TOOLTIP_BORDER_RADIUS_REM * remInPixels)
          ),
        });

        // Set bottom right corner rounding
        dispatch({
          type: ActionType.SetSquareBottomRight,
          squareBottomRight: (
            arrowRect.right
            > window.innerWidth - (TOOLTIP_BORDER_RADIUS_REM * remInPixels)
          ),
        });
      }
    },
    [isVisible],
  );

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  // Determine size
  let size = 'normal';
  if (wide) {
    size = 'wide';
  } else if (thin) {
    size = 'thin';
  }

  // Render
  return (
    <div
      className="Tooltip-outer-container"
      aria-label={text}
      onMouseEnter={() => {
        dispatch({
          type: ActionType.Show,
        });
      }}
      onMouseLeave={() => {
        dispatch({
          type: ActionType.Hide,
        });
      }}
      onFocus={() => {
        dispatch({
          type: ActionType.Show,
        });
      }}
      onBlur={() => {
        dispatch({
          type: ActionType.Hide,
        });
      }}
    >
      {/* Style */}
      <style>
        {style}
      </style>

      {/* Children */}
      {children}

      {/* Arrow */}
      <div
        className={`Tooltip-arrow Tooltip-arrow-visible-${isVisible ? 'true' : 'false'}`}
        ref={arrowElement}
      >
        <FontAwesomeIcon
          icon={faCaretDown}
        />
      </div>
      <div className={`Tooltip-arrow-shadow Tooltip-arrow-visible-${isVisible ? 'true' : 'false'}`}>
        <FontAwesomeIcon
          icon={faCaretDown}
        />
      </div>

      {/* Tooltip */}
      <div
        className="Tooltip-tooltip-container"
      >
        <div
          className={`Tooltip-tooltip Tooltip-tooltip-visible-${isVisible ? 'true' : 'false'} Tooltip-size-${size}`}
          role="tooltip"
          ref={tooltipContainer}
          style={{
            transform: `translateX(${nudgePx}px)`,
          }}
        >
          {/* Box */}
          <div className="Tooltip-box-highlight" />
          <div
            className="Tooltip-box"
            style={{
              borderBottomLeftRadius: squareBottomLeft ? 0 : undefined,
              borderBottomRightRadius: squareBottomRight ? 0 : undefined,
            }}
          />
          <div
            className="Tooltip-box-shadow"
            style={{
              borderBottomLeftRadius: squareBottomLeft ? 0 : undefined,
              borderBottomRightRadius: squareBottomRight ? 0 : undefined,
            }}
          />

          {/* Contents */}
          <div className="Tooltip-contents">
            {/* Icon */}
            {icon && (
              <FontAwesomeIcon
                icon={icon}
                className="me-1"
              />
            )}

            {/* Text */}
            <span className="Tooltip-text">
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default Tooltip;
