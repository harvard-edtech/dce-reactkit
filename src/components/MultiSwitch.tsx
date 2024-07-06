/**
 * A switch with multiple options for selection
 * @author Alessandra De Lucas
 * @author Gabe Abrams
 * @author Austen Money
 */

// Import React
import React, { useReducer } from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Import shared helpers
import idify from '../helpers/idify';
import combineClassNames from '../helpers/combineClassNames';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // Array of all options for multi switch
  options: Option[],
  // The ID of the selected option
  selectedOptionId: string,
  /**
   * A handler to call when the switch is changed
   * @param selectedOptionId Updated option when switch is changed
   */
  onChange: (selectedOptionId: string) => void,
  // The height of the multi switch
  heightRem?: number,
};

// Option definition
type Option = {
  // Label
  label: string,
  // Icon
  icon: IconProp,
  // Unique ID
  id: string,
};

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
  // The option that the user is hovering over
  hoveredOptionId?: string,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Start hovering on an option
  StartHover = 'StartHover',
  // Stop hovering on an option
  StopHover = 'StopHover',
}

// Action definitions
type Action = (
  | {
    // Action type
    type: ActionType.StartHover,
    // The ID of the option that the user is hovering over
    hoveredOptionId: string,
  }
  | {
    // Action type
    type: (
      | ActionType.StopHover
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
    case ActionType.StartHover: {
      return {
        ...state,
        hoveredOptionId: action.hoveredOptionId,
      };
    }
    case ActionType.StopHover: {
      return {
        ...state,
        hoveredOptionId: undefined,
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

const MultiSwitch: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    options,
    selectedOptionId,
    onChange,
    heightRem = 3,
  } = props;

  /* -------------- State ------------- */

  // Initial state
  const initialState: State = {
    hoveredOptionId: undefined,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    hoveredOptionId,
  } = state;

  /*------------------------------------------------------------------------*/
  /* -------------------------------- Style ------------------------------- */
  /*------------------------------------------------------------------------*/

  // Calculate the index of the selected option
  const selectedOptionIndex = options.findIndex((option) => {
    return (option.id === selectedOptionId);
  });

  // Constants
  const gutterRems = heightRem * 0.1;
  const itemWidthRems = heightRem * 1.8;
  const textFontSize = heightRem / 3.5;
  const iconFontSize = heightRem / 2;
  const borderWidthRems = 0.05;

  // Style
  const style = `
    .MultiSwitch-outer-box {
      display: inline-block !important;
      position: relative;
      border-radius: 0.5rem !important;
      border: ${borderWidthRems}rem solid #666 !important;
      padding: 0 !important;
      height: ${heightRem}rem !important;
      width: ${gutterRems + (2 * borderWidthRems) + options.length * (itemWidthRems + gutterRems)}rem !important;
      overflow: visible !important;
      text-wrap: none !important;
      z-index: 0;
    }

    .MultiSwitch-options-container {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      z-index: 1;
      margin-top: ${gutterRems}rem;
      width: ${gutterRems + options.length * (itemWidthRems + gutterRems)}rem;
      overflow: visible !important;
      text-wrap: none !important;
    }

    .MultiSwitch-icon {
      font-size: ${iconFontSize}rems !important;
      color: white;
    }

    .MultiSwitch-option-button {
      position: relative !important;
      font-size: ${textFontSize}rem !important;
      z-index: 1 !important;
      display: inline-block !important;
      flex-grow: 0 !important;
      border: 0 !important;
      border-radius: 0.5rem !important;
      width: ${itemWidthRems}rem !important;
      height: ${heightRem - (2 * gutterRems)}rem !important;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: ${heightRem / 3}rem !important;
      line-height: 1 !important;
      margin-right: 0 !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      margin-left: ${gutterRems}rem !important;
      color: black !important;
      background-color: transparent !important;
      transition: background-color 0.3s ease-out !important;
    }

    .MultiSwitch-option-button-hovered {
      background-color: #545454 !important;
    }

    .MultiSwitch-option-text {
      display: inline-block;
      font-size: ${textFontSize}rem !important;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      text-align: center !important;

      color: white !important;
    }

    .MultiSwitch-option-text-selected {
      font-weight: bold;
    }

    .MultiSwitch-highlight-container {
      position: absolute;
      z-index: -1;
      left: 0;
      top: 0;
      display: inline-block;
      height: 0;
      width: 0;
      overflow: visible;
    }

    .MultiSwitch-highlight {
      position: absolute;
      border-radius: 0.5rem !important;
      width: ${itemWidthRems}rem;
      height: ${heightRem - (2 * gutterRems)}rem;
      top: ${gutterRems}rem;
      left: ${gutterRems}rem;
      transform: translate(${selectedOptionIndex * (itemWidthRems + gutterRems) + borderWidthRems}rem, -${borderWidthRems * 0.5}rem);
      transition: transform 0.3s ease-in-out;
    }
  `;

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  const optionElements = options.map((option) => {
    const isSelected = (option.id === selectedOptionId);
    const isHovered = (option.id === hoveredOptionId);

    return (
      <button
        type="button"
        key={option.id}
        className={combineClassNames([
          'MultiSwitch-option-button',
          (isHovered ? 'MultiSwitch-option-button-hovered' : ''),
          `MultiSwitch-option-button-with-id-${idify(option.id)}`,
          `MultiSwitch-option-button-is${isSelected ? '' : '-not'}-selected`,
        ])}
        aria-label={(
          isSelected
            ? `option "${option.label}", currently selected`
            : `click to select option "${option.label}"`
        )}
        onClick={() => {
          // Remove hover
          dispatch({
            type: ActionType.StopHover,
          });

          // Notify parent
          onChange(option.id);
        }}
        onMouseEnter={() => {
          dispatch({
            type: ActionType.StartHover,
            hoveredOptionId: option.id,
          });
        }}
        onMouseLeave={() => {
          dispatch({
            type: ActionType.StopHover,
          });
        }}
        onFocus={() => {
          dispatch({
            type: ActionType.StartHover,
            hoveredOptionId: option.id,
          });
        }}
        onBlur={() => {
          dispatch({
            type: ActionType.StopHover,
          });
        }}
        style={{
          pointerEvents: (
            (option.id === selectedOptionId)
              ? 'none'
              : undefined
          ),
        }}
        disabled={option.id === selectedOptionId}
      >
        <div className={`MultiSwitch-icon MultiSwitch-icon-${isSelected ? 'selected' : ''}`}>
          <FontAwesomeIcon
            icon={option.icon}
          />
        </div>
        <div className={`MultiSwitch-option-text MultiSwitch-option-text-${isSelected ? 'selected' : ''}`}>
          {option.label}
        </div>
      </button>
    );
  });

  // Highlight behind selected option
  const highlight = (
    <div className="MultiSwitch-highlight bg-danger d-inline-block" />
  );

  return (
    <div className="MultiSwitch-outer-box alert alert-dark m-0">
      {/* Style */}
      <style>
        {style}
      </style>

      {/* Options */}
      <div className="MultiSwitch-options-container">
        {optionElements}
      </div>

      {/* Highlight */}
      <div className="MultiSwitch-highlight-container">
        {highlight}
      </div>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default MultiSwitch;
