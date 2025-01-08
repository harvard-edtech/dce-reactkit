/**
 * A checkbox button
 * @author Gabe Abrams
 */

// Import React
import React from 'react';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faSquareMinus } from '@fortawesome/free-regular-svg-icons';

// Import shared types
import Variant from '../types/Variant';

// Import shared helpers
import { isDarkModeOn } from '../client/initClient';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

type Props = {
  // Text of the button
  text: React.ReactNode,
  // Handler for when this item is toggled
  onChanged: (checked: boolean) => void,
  // Aria label
  ariaLabel: string,
  // Button title
  title?: string,
  // If true, show a checkmark in the checkbox
  checked?: boolean,
  // The id of the button
  id?: string,
  // Custom class name of the button
  className?: string,
  // If true, no margin on right
  noMarginOnRight?: boolean,
  // Variant for when checkbox is checked
  checkedVariant?: Variant,
  // Variant for when checkbox is not checked
  uncheckedVariant?: Variant,
  // True if using a small button
  small?: boolean,
  // If true, show a dash in the checkbox (only relevant if unchecked)
  dashed?: boolean,
  // If true, use complex formatting (tabs, newlines) in the text
  useComplexFormatting?: boolean,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const CheckboxButton: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    text,
    onChanged,
    ariaLabel,
    title,
    checked,
    id,
    className,
    noMarginOnRight,
    checkedVariant = (
      isDarkModeOn()
        ? Variant.Light
        : Variant.Secondary
    ),
    uncheckedVariant = (
      isDarkModeOn()
        ? Variant.Secondary
        : Variant.Light
    ),
    small,
    dashed,
    useComplexFormatting,
  } = props;

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  // Determine the icon
  let icon: IconDefinition;
  if (checked) {
    icon = faCheckSquare;
  } else {
    icon = (
      dashed
        ? faSquareMinus
        : faSquare
    );
  }

  // Create the button
  return (
    <button
      type="button"
      id={id}
      title={title}
      className={`CheckboxButton-status-${checked ? 'checked' : 'unchecked'} ${dashed ? 'CheckboxButton-dashed ' : ''}btn btn-${checked ? checkedVariant : uncheckedVariant}${checked ? ' selected' : ''}${small ? ' btn-sm' : ''} m-0${noMarginOnRight ? '' : ' me-1'} ${className ?? ''}`}
      aria-label={`${ariaLabel}${checked ? ': currently checked' : ''}`}
      onClick={() => {
        onChanged(!checked);
      }}
    >
      <div className="d-flex">
        <div className="align-items-center">
          <FontAwesomeIcon
            icon={icon}
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

export default CheckboxButton;
