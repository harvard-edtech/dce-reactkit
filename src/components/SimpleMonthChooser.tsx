/**
 * A very simple, lightweight month chooser
 * @author Gabe Abrams
 */

// Import React
import React from 'react';

// Import other components
import SimpleDateChooser from './SimpleDateChooser';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

type Props = {
  // Aria label
  ariaLabel: string,
  // Name of the chooser (machine-readable, hyphenated)
  name: string,
  // Currently selected month
  month: number,
  // Currently selected year
  year: number,
  /**
   * Handler for when month changes
   * @param month new 1-indexed month number
   * @param year new full year number
   */
  onChange: (month: number, year: number) => void,
  // Number of months in either the past or future to allow the user to choose from
  // If we aren't allowing the past or the future, we will throw an error
  // (max is 12, default is 6 in the past and 6 in the future)
  numMonthsToShow?: number,
  // If true, the user isn't allowed to select dates in the past
  dontAllowPast?: boolean,
  // If true, the user isn't allowed to select dates in the future
  dontAllowFuture?: boolean,
  // If true, the chooser is disabled
  isDisabled?: boolean,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const SimpleMonthChooser: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    ariaLabel,
    name,
    dontAllowPast,
    dontAllowFuture,
    numMonthsToShow,
    onChange,
    month,
    year,
    isDisabled,
  } = props;

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <SimpleDateChooser
      ariaLabel={ariaLabel}
      name={name}
      month={month}
      day={1}
      year={year}
      numMonthsToShow={numMonthsToShow}
      dontAllowPast={dontAllowPast}
      dontAllowFuture={dontAllowFuture}
      isDisabled={isDisabled}
      hideDay
      onChange={(newMonth, newDay, newYear) => {
        onChange(newMonth, newYear);
      }}
    />
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default SimpleMonthChooser;
