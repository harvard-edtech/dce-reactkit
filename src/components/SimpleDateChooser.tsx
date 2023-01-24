/**
 * A very simple, lightweight date chooser
 * @author Gabe Abrams
 */

// Import React
import React from 'react';
import getMonthName from '../helpers/getMonthName';

// Import helpers
import getOrdinal from '../helpers/getOrdinal';
import getTimeInfoInET from '../helpers/getTimeInfoInET';
import forceNumIntoBounds from '../helpers/forceNumIntoBounds';

/*------------------------------------------------------------------------*/
/*                                  Types                                 */
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
  // Number of months to allow the user to choose from
  // (max is 12, default is 6)
  numMonthsToShow?: number,
  // If true, instead of showing numMonthsToShow months into the future,
  // show numMonthsToShow months into the past
  chooseFromPast?: boolean,
};

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const SimpleDateChooser: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /*                                  Setup                                 */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    ariaLabel,
    name,
    month,
    day,
    year,
    onChange,
    chooseFromPast,
  } = props;
  const numMonthsToShow = (props.numMonthsToShow ?? 6);

  /*------------------------------------------------------------------------*/
  /*                                 Render                                 */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /*                Main UI                 */
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
  if (chooseFromPast) {
    startMonth -= Math.max(0, numMonthsToShow - 1);
    while (startMonth <= 0) {
      startMonth += 12;
      startYear -= 1;
    }
  }
  for (let i = 0; i < numMonthsToShow; i++) {
    // Get month and year info
    const unmoddedMonth = (startMonth + i);
    let month = unmoddedMonth;
    while (month > 12) {
      month -= 12;
    }
    const monthName = getMonthName(month).full;
    // Year is start year +1 for each 12 months
    const year = (startYear + (Math.floor(unmoddedMonth / 12)));

    // Figure out which days are allowed
    const days = [];
    const numDaysInMonth = (new Date(year, month, 0)).getDate();
    if (chooseFromPast) {
      // Past selection
      const numDaysToAdd = (
        (month === today.month)
          ? today.day // Current month, only add up to today
          : numDaysInMonth // Past month, add all days
      );
      for (let day = 1; day <= numDaysToAdd; day++) {
        days.push(day);
      }
    } else {
      // Future selection: add all remaining days of the month
      const firstDay = (
        month === today.month
          ? today.day // Current month: start at current date
          : 1 // Future month: start at beginning of month
      );
      for (let day = firstDay; day <= numDaysInMonth; day++) {
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
  const monthOptions: React.ReactNode[] = [];
  const dayOptions: React.ReactNode[] = [];
  choices.forEach((choice) => {
    // Create month option
    monthOptions.push(
      <option
        key={choice.month}
        value={`${choice.month}-${choice.year}`}
        aria-label={`choose ${choice.choiceName}`}
        onSelect={() => {
          onChange(choice.month, choice.days[0], choice.year);
        }}
      >
        {choice.choiceName}
      </option>
    );

    if (month === choice.month) {
      // This is the currently selected month
      // Create day options
      choice.days.forEach((dayChoice) => {
        const ordinal = getOrdinal(dayChoice);
        dayOptions.push(
          <option
            key={dayChoice}
            value={dayChoice}
            aria-label={`choose date ${dayChoice}`}
          >
            {dayChoice}
            {ordinal}
          </option>
        );
      });
    }
  });

  return (
    <div
      className="SimpleDateChooser d-inline-block"
      aria-label={`date chooser with selected date: ${month} ${day}, ${year}`}
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
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/

// Export component
export default SimpleDateChooser;
