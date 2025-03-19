/**
 * A very simple, lightweight date chooser
 * @author Gabe Abrams
 * @author Gardeniu Liu
 */

// Import React
import React from 'react';
import getMonthName from '../helpers/getMonthName';

// Import helpers
import getOrdinal from '../helpers/getOrdinal';
import getTimeInfoInET from '../helpers/getTimeInfoInET';

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
  // Currently selected day
  day: number,
  // Currently selected year
  year: number,
  /**
   * Handler for when date changes
   * @param month new 1-indexed month number
   * @param day new 1-indexed day number
   * @param year new full year number
   */
  onChange: (month: number, day: number, year: number) => void,
  // Number of months in either the past or future to allow the user to choose from
  // If we aren't allowing the past or the future, we will throw an error
  // (max is 12, default is 6 in the past and 6 in the future)
  numMonthsToShow?: number,
  // If true, the user isn't allowed to select dates in the past
  dontAllowPast?: false,
  // If true, the user isn't allowed to select dates in the future
  dontAllowFuture?: false
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const SimpleDateChooser: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    ariaLabel,
    name,
    onChange,
    numMonthsToShow = 6,
    dontAllowFuture,
    dontAllowPast,
  } = props;

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  // Determine the set of choices allowed
  const today = getTimeInfoInET();
  const choices: {
    choiceName: string,
    month: number,
    days: number[],
    year: number,
  }[] = [];

  let startYear = today.year;
  let startMonth = today.month;

  // Don't allow past or future dates
  if (dontAllowPast && dontAllowFuture) {
    throw new Error("No past or future dates allowed");
  }
  // Recalculate startMonth and startYear when allowing past dates
  if (!dontAllowPast) {
    startMonth -= Math.max(0, numMonthsToShow - 1);
    while (startMonth <= 0) {
      startMonth += 12;
      startYear -= 1;
    }
  }
  // Calculate total number of months to show
  let totalMonthsToShow = numMonthsToShow;
  if (!dontAllowPast && !dontAllowFuture) {
    totalMonthsToShow = totalMonthsToShow * 2 - 1;
  }

  for (let i = 0; i < totalMonthsToShow; i++) {
    // Get month and year info
    const unmoddedMonth = (startMonth + i);
    let month = unmoddedMonth;
    while (month > 12) {
      month -= 12;
    }
    const monthName = getMonthName(month).full;
    // Year is start year +1 for each 12 months
    let yearsToAdd = 0;
    let monthsOfYearsToAdd = unmoddedMonth;
    while (monthsOfYearsToAdd > 12) {
      monthsOfYearsToAdd -= 12;
      yearsToAdd += 1;
    }
    const year = startYear + yearsToAdd;

    // Figure out which days are allowed
    const days = [];
    const numDaysInMonth = (new Date(year, month, 0)).getDate();

    // Current month
    if (month === today.month && year === today.year) {
      // Past selection: add all previous days of the month
      if (!dontAllowPast) {
        for (let day = 1; day < today.day; day++) {
          days.push(day);
        }
      }
      days.push(today.day); // Add current day
      // Future selection: add all remaining days of the month
      if (!dontAllowFuture) {
        for (let day = today.day + 1; day <= numDaysInMonth; day++) {
          days.push(day);
        }
      }
    } else { // Past or future month
      // Include all days in the month
      for (let day = 1; day <= numDaysInMonth; day++) {
        days.push(day);
      }
    }

    choices.push({
      choiceName: `${monthName} ${year}`,
      month,
      year,
      days,
    });
  }

  // Create choice options
  const {
    month,
    day,
    year,
  } = props;
  const monthOptions: React.ReactNode[] = [];
  const dayOptions: React.ReactNode[] = [];
  choices.forEach((choice) => {
    // Create month option
    monthOptions.push(
      <option
        key={`${choice.year}-${choice.month}`}
        value={`${choice.month}-${choice.year}`}
        aria-label={`choose ${choice.choiceName}`}
        onSelect={() => {
          onChange(choice.month, choice.days[0], choice.year);
        }}
      >
        {choice.choiceName}
      </option>,
    );

    // This is the currently selected month
    if (month === choice.month) {
      // Create day options
      choice.days.forEach((dayChoice) => {
        const ordinal = getOrdinal(dayChoice);
        dayOptions.push(
          <option
            key={`${choice.year}-${choice.month}-${dayChoice}`}
            value={dayChoice}
            aria-label={`choose date ${dayChoice}`}
          >
            {dayChoice}
            {ordinal}
          </option>,
        );
      });
    }
  });

  return (
    <div
      className="SimpleDateChooser d-inline-block"
      aria-label={`date chooser with selected date: ${month}/${day}/${year}`}
    >
      {/* Month Chooser */}
      <select
        aria-label={`month for ${ariaLabel}`}
        className="custom-select d-inline-block mr-1"
        style={{ width: 'auto' }}
        id={`SimpleDateChooser-${name}-month`}
        value={`${month}-${year}`}
        onChange={(e) => {
          const choice = choices[e.target.selectedIndex];

          // Change day, month, and year
          onChange(
            choice.month,
            choice.days[0],
            choice.year,
          );
        }}
      >
        {monthOptions}
      </select>

      {/* Day Chooser */}
      <select
        aria-label={`day for ${ariaLabel}`}
        className="custom-select d-inline-block"
        style={{ width: 'auto' }}
        id={`SimpleDateChooser-${name}-day`}
        value={day}
        onChange={(e) => {
          // Only change the day
          onChange(
            month,
            Number.parseInt(e.target.value, 10),
            year,
          );
        }}
      >
        {dayOptions}
      </select>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default SimpleDateChooser;
