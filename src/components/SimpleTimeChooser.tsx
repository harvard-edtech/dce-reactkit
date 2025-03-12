/**
 * A very simple, lightweight date chooser
 * @author Gardenia Liu
 */

// Import React
import React from 'react';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

type Props = {
  // Aria label
  ariaLabel: string,
  // Name of the chooser (machine-readable, hyphenated)
  name: string,
  // Currently selected hour of the day (24hr)
  hour: number,
  // Currently selected minute within the hour
  minute: number,
  /**
   * Handler for when time changes
   * @param hour new 24hr hour number
   * @param minute new minute number
   */
  onChange: (hour: number, minute: number) => void,
  // Interval in minutes between each choice
  // Allowed options: 15, 30, 60, defaults to 15
  intervalMin?: number,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

// TODO: add supported intervals and default interval?

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const SimpleTimeChooser: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    ariaLabel,
    name,
    hour,
    minute,
    onChange,
  } = props;

  // Detect interval, set to 15min if not supported

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  // TODO: generate choices

  return (
    <div className="SimpleTimeChooser-container">
      Nothing here yet
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default SimpleTimeChooser;
