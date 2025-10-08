/**
 * A very simple, lightweight date chooser
 * @author Gabe Abrams
 * @author Gardenia Liu
 */

// Import React
import React, { useReducer } from 'react';

// Import AppWrapper helpers
import { confirm } from './AppWrapper';

// Import helpers
import getOrdinal from '../helpers/getOrdinal';
import getMonthName from '../helpers/getMonthName';
import getTimeInfoInET from '../helpers/getTimeInfoInET';

// Import classes
import ErrorWithCode from '../errors/ErrorWithCode';

// Import types
import ReactKitErrorCode from '../types/ReactKitErrorCode';

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
  dontAllowPast?: boolean,
  // If true, the user isn't allowed to select dates in the future
  dontAllowFuture?: boolean,
  // If true, the chooser is disabled
  isDisabled?: boolean,
};

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------------- Views ------------- */

enum View {
  // Date chooser
  DateChooser = 'DateChooser',
  // Invalid date
  InvalidDate = 'InvalidDate',
}

/* -------- State Definition -------- */

type State = {
  view: View,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Fix invalid date so it is now in range
  FixInvalidDate = 'FixInvalidDate',
}

// Action definitions
type Action = {
  // Action type
  type: ActionType.FixInvalidDate,
};

/**
 * Reducer that executes actions
 * @author Gardenia Liu
 * @param state current state
 * @param action action to execute
 * @returns updated state
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.FixInvalidDate: {
      return {
        ...state,
        view: View.DateChooser,
      };
    }
    default: {
      return state;
    }
  }
};

/*------------------------------------------------------------------------*/
/* --------------------------- Static Helpers --------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Get the list of choices in the date chooser given props
 * @author Gardenia Liu
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.numMonthsToShow number of months to show
 * @param opts.dontAllowPast if true, the user isn't allowed to select dates in the past
 * @param opts.dontAllowFuture if true, the user isn't allowed to select dates in the future
 * @returns choices
 */
const getChoices = (
  opts: {
    numMonthsToShow?: number,
    dontAllowPast?: boolean,
    dontAllowFuture?: boolean,
  },
) => {
  // Destructure props
  const {
    dontAllowFuture,
    dontAllowPast,
    numMonthsToShow = 6,
  } = opts;

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
    throw new ErrorWithCode(
      'No past or future dates allowed',
      ReactKitErrorCode.SimpleDateChooserInvalidDateRange,
    );
  }

  // Require numMonthsToShow to be positive
  if (numMonthsToShow <= 0) {
    throw new ErrorWithCode(
      'numMonthsToShow must be positive',
      ReactKitErrorCode.SimpleDateChooserInvalidNumMonths,
    );
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

  // Return choices
  return choices;
};

/**
 * Checks whether a given date is outside the valid range of allowed choices
 * @author Gardenia Liu
 * @param opts object containing all arguments
 * @param opts.month 1-indexed month
 * @param opts.day day of the month
 * @param opts.year full year
 * @param opts.choices valid date choices
 * @returns true if date is out of range
 */
const isDateOutOfRange = (
  opts: {
    month: number,
    day: number,
    year: number,
    choices: {
      month: number,
      year: number,
      days: number[],
    }[],
  },
): boolean => {
  const {
    month,
    day,
    year,
    choices,
  } = opts;

  return !choices.some((choice) => {
    return (
      choice.month === month
      && choice.year === year
      && choice.days.includes(day)
    );
  });
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
    dontAllowPast,
    dontAllowFuture,
    numMonthsToShow,
    onChange,
    month,
    day,
    year,
    isDisabled = false,
  } = props;

  // Get choices
  const choices = getChoices({
    numMonthsToShow,
    dontAllowPast,
    dontAllowFuture,
  });

  /* -------------- State ------------- */

  // Check if the currently selected date is out of range
  const currentSelectedDateOutOfRange = isDateOutOfRange({
    month,
    day,
    year,
    choices,
  });

  // Initial state
  const initialState: State = {
    view: (
      currentSelectedDateOutOfRange
        ? View.InvalidDate
        : View.DateChooser
    ),
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    view,
  } = state;

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Ask the user if they want to edit an invalid date
   * @author Gardenia Liu
   * @author Gabe Abrams
   */
  const askToEditInvalidDate = async () => {
    // Ask the user if they want to edit the date
    const confirmed = await confirm(
      'Are you sure?',
      'The current date is outside the normal range. If you edit it, you\'ll need to choose a new date in the normal range.',
      {
        confirmButtonText: 'Edit Date',
      },
    );

    // Check if user confirmed
    if (confirmed) {
      // Update the date to today
      const today = getTimeInfoInET();
      onChange(today.month, today.day, today.year);

      // Update state
      dispatch({
        type: ActionType.FixInvalidDate,
      });
    }
  };

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* ---------------- Views --------------- */
  /*----------------------------------------*/

  // Body that will be filled with the current view
  let body: React.ReactNode;

  /* ---------- DateChooser ---------- */

  if (view === View.DateChooser) {
    // Create lists of options
    const monthOptions: React.ReactNode[] = [];
    const dayOptions: React.ReactNode[] = [];

    // Render each option and add it to the list
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

    // Create body
    body = (
      <div
        className="SimpleDateChooser-inner-container d-inline-block"
        aria-label={`date chooser with selected date: ${month}/${day}/${year}`}
      >
        {/* Month Chooser */}
        <select
          aria-label={`month for ${ariaLabel}`}
          className="custom-select form-select d-inline-block mr-1"
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
          disabled={isDisabled}
        >
          {monthOptions}
        </select>

        {/* Day Chooser */}
        <select
          aria-label={`day for ${ariaLabel}`}
          className="custom-select form-select d-inline-block"
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
          disabled={isDisabled}
        >
          {dayOptions}
        </select>
      </div>
    );
  }

  /* --------- DateOutOfRange --------- */

  if (view === View.InvalidDate) {
    body = (
      <div className="SimpleDateChooser-inner-container d-inline-block">
        <button
          type="button"
          className="btn btn-light"
          onClick={askToEditInvalidDate}
          aria-label={`edit date for ${ariaLabel}`}
        >
          {getMonthName(month).full}
          {' '}
          {day}
          {getOrdinal(day)}
          ,
          {' '}
          {year}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={askToEditInvalidDate}
          aria-label={`edit date for ${ariaLabel}`}
        >
          Edit
        </button>
      </div>
    );
  }

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <span className="SimpleDateChooser-outer-container">
      {body}
    </span>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default SimpleDateChooser;
