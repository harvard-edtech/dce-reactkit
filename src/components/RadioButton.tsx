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

/*------------------------------------------------------------------------*/
/*                                  Types                                 */
/*------------------------------------------------------------------------*/

type Props = {
  // Text of the button
  text: string,
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
  // If true, no margin on right
  noMarginOnRight?: boolean,
  // Variant for when radio is selected
  selectedVariant?: Variant,
  // Variant for when radio is not selected
  unselectedVariant?: Variant,
  // True if using a small button
  small?: boolean,
};

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const RadioButton: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /*                                  Setup                                 */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    text,
    onSelected,
    ariaLabel,
    title,
    selected,
    id,
    noMarginOnRight,
    selectedVariant = Variant.Primary,
    unselectedVariant = Variant.Light,
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
      className={`btn btn-${selected ? selectedVariant : unselectedVariant}${selected ? ' selected' : ''}${small ? ' btn-sm' : ''} m-0${noMarginOnRight ? '' : ' me-2'}`}
      aria-label={`${ariaLabel}${selected ? ': currently selected' : ''}`}
      onClick={() => {
        if (!selected) {
          onSelected();
        }
      }}
    >
      <FontAwesomeIcon
        icon={selected ? faDotCircle : faCircle}
        className="me-1"
      />
      {text}
    </button>
  );
};

/*------------------------------------------------------------------------*/
/*                                 Wrap up                                */
/*------------------------------------------------------------------------*/

export default RadioButton;
