/**
 * A radio selection button
 * @author Gabe Abrams
 */

// Import React
import React from 'react';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

// Import shared types
import Variant from '../types/Variant';
import { isDarkModeOn } from '../client/initClient';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

type Props = {
  // Text of the button
  text: React.ReactNode,
  // Handler for when this item is selected (not called if already selected)
  onSelected: () => void,
  // Aria label
  ariaLabel: string,
  // Button title
  title?: string,
  // True if selected
  selected?: boolean,
  // The id of the button
  id?: string,
  // Custom class name of the button
  className?: string,
  // If true, no margin on right
  noMarginOnRight?: boolean,
  // Variant for when radio is selected
  selectedVariant?: Variant,
  // Variant for when radio is not selected
  unselectedVariant?: Variant,
  // True if using a small button
  small?: boolean,
  // If true, use complex formatting (tabs, newlines) in the text
  useComplexFormatting?: boolean,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const RadioButton: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    text,
    onSelected,
    ariaLabel,
    title,
    selected,
    id,
    className,
    noMarginOnRight,
    selectedVariant = (
      isDarkModeOn()
        ? Variant.Light
        : Variant.Secondary
    ),
    unselectedVariant = (
      isDarkModeOn()
        ? Variant.Secondary
        : Variant.Light
    ),
    small,
    useComplexFormatting,
  } = props;

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <button
      type="button"
      id={id}
      title={title}
      className={`btn btn-${selected ? selectedVariant : unselectedVariant}${selected ? ' selected' : ''}${small ? ' btn-sm' : ''} m-0${noMarginOnRight ? '' : ' me-1'} ${className ?? ''}`}
      aria-label={`${ariaLabel}${selected ? ': currently selected' : ''}`}
      onClick={() => {
        if (!selected) {
          onSelected();
        }
      }}
    >
      <div className="d-flex">
        <div className="align-items-center">
          <FontAwesomeIcon
            icon={selected ? faDotCircle : faCircle}
            className="me-1"
          />
        </div>
        {
          useComplexFormatting
            ? (
              <pre
                className="ps-2 text-start text-break"
                style={{
                  whiteSpace: 'pre-wrap',
                  tabSize: 2,
                }}
              >
                {text}
              </pre>
            )
            : (
              <div className="flex-grow-1 text-start text-break ps-2">
                {text}
              </div>
            )
        }
      </div>
    </button>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

export default RadioButton;
