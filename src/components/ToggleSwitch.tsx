/**
 * A toggle switch that toggles on or off
 * @author Alessandra De Lucas
 * @author Gabe Abrams
 */

// Import React
import React from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

// Import shared types
import Variant from '../types/Variant';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // If true, the toggle switch is in the on position
  isOn: boolean,
  /**
   * A handler to call when the switch is toggled
   * @param isOn Updated value for isOn
   */
  onToggle: (isOn: boolean) => void,
  // Unique ID for the toggle switch
  id?: string,
  // Custom className for the toggle switch
  className?: string,
  // A description for what it means when the toggle switch is on
  // E.g. "airplane mode is active"
  // Description will be placed into a sentence with the structure:
  // `If on, ${description}. Currently on. Click to turn off.`
  description: string,
  // Custom background variant for the "on" state (defaults to Variant.Info)
  backgroundVariantWhenOn?: Variant,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const ToggleSwitch: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    isOn,
    onToggle,
    id,
    className,
    description,
    backgroundVariantWhenOn = Variant.Info,
  } = props;

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  const backgroundVariant = (
    isOn
      ? backgroundVariantWhenOn
      : 'secondary'
  );

  return (
    <button
      id={id}
      aria-label={`If on, ${description}. Currently ${isOn ? 'on' : 'off'}. Click to turn ${isOn ? 'off' : 'on'}.`}
      className={`alert alert-${backgroundVariant} bg-${backgroundVariant} mb-0 rounded-pill d-inline-block pt-0 pb-0 px-3 ${className ?? ''}`}
      onClick={() => {
        onToggle(!isOn);
      }}
      type="button"
    >
      <FontAwesomeIcon
        icon={faCircle}
        className="text-light"
        style={{
          transform: `translateX(${isOn ? '' : '-'}0.7rem)`,
          transition: '0.3s transform ease-in-out',
        }}
      />
    </button>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default ToggleSwitch;
