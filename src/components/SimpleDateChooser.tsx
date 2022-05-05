/**
 * A very simple, lightweight date chooser
 * @author Gabe Abrams
 */

// Import React
import React from 'react';

// Import helpers
import getOrdinal from '../helpers/getOrdinal';
import getTimeInfoInET from '../helpers/getTimeInfoInET';

/*------------------------------------------------------------------------*/
/*                                  Types                                 */
/*------------------------------------------------------------------------*/

type Props = {
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
  // Number of months in the future to allow the user to schedule into
  // (max is 12)
  numMonthsToShow?: number,
};

/*------------------------------------------------------------------------*/
/*                                Constants                               */
/*------------------------------------------------------------------------*/

// Constants
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const SimpleDateChooser: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /*                                  Setup                                 */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    name,
    month,
    day,
    year,
    onChange,
  } = props;
  const numMonthsToShow = Math.min(props.numMonthsToShow ?? 6, 12);

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
  for (let i = 0; i < numMonthsToShow; i++) {
    // Get month and year info
    const unmoddedMonth = (today.month + i);
    const month = (
      unmoddedMonth > 12
        ? unmoddedMonth - 12
        : unmoddedMonth
    );
    const monthName = MONTH_NAMES[month - 1];
    const year = (
      unmoddedMonth > 12
        ? today.year + 1
        : today.year
    );

    // Figure out which days are allowed
    const days = [];
    const numDaysInMonth = (new Date(year, month, 0)).getDate();
    const firstDay = (
      month === today.month
        ? today.day // Current month: start at current date
        : 1 // Future month: start at beginning of month
    );
    for (let day = firstDay; day <= numDaysInMonth; day++) {
      days.push(day);
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
        value={choice.month}
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
        className="custom-select d-inline-block mr-1"
        style={{ width: 'auto' }}
        id={`SimpleDateChooser-${name}-month`}
        value={month}
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
