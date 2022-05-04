/**
 * A checkbox button
 * @author Gabe Abrams
 */

// Import React
import React from 'react';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

// Import shared types
import Variant from '../types/Variant';

/*------------------------------------------------------------------------*/
/*                                  Types                                 */
/*------------------------------------------------------------------------*/

type Props = {
  // Text of the button
  text: string,
  // Handler for when this item is toggled
  onChanged: (checked: boolean) => void,
  // Aria label
  ariaLabel: string,
  // Button title
  title?: string,
  // True if checked
  checked?: boolean,
  // The id of the button
  id?: string,
  // If true, no margin on right
  noMarginOnRight?: boolean,
  // Variant for when checkbox is checked
  checkedVariant?: Variant,
  // Variant for when checkbox is not checked
  uncheckedVariant?: Variant,
  // True if using a small button
  small?: boolean,
};

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const CheckboxButton: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /*                                  Setup                                 */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    text,
    onChanged,
    ariaLabel,
    title,
    checked,
    id,
    noMarginOnRight,
    checkedVariant = Variant.Secondary,
    uncheckedVariant = Variant.Light,
    small,
  } = props;

  /*------------------------------------------------------------------------*/
  /*                                 Render                                 */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /*                Main UI                 */
  /*----------------------------------------*/

  return (
    <button
      type="button"
      id={id}
      title={title}
      className={`btn btn-${checked ? checkedVariant : uncheckedVariant}${checked ? ' selected' : ''}${small ? ' btn-sm' : ''} m-0${noMarginOnRight ? '' : ' me-1'}`}
      aria-label={`${ariaLabel}${checked ? ': currently checked' : ''}`}
      onClick={() => {
        onChanged(!checked);
      }}
    >
      <FontAwesomeIcon
        icon={checked ? faCheckSquare : faSquare}
        className="me-1"
      />
      {text}
    </button>
  );
};

/*------------------------------------------------------------------------*/
/*                                 Wrap up                                */
/*------------------------------------------------------------------------*/

export default CheckboxButton;
