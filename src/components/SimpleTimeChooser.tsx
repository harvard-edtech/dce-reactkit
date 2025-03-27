/**
 * A very simple, lightweight time chooser
 * @author Gardenia Liu
 */

// Import React
import React, { useReducer } from 'react';

// Import helpers
import padZerosLeft from '../helpers/padZerosLeft';

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
  // /**
  //  * Handler for when time changes
  //  * @param hour new 24hr hour number
  //  * @param minute new minute number
  //  */
  // onChange: (hour: number, minute: number) => void,
  // Interval in minutes between each choice
  // Allowed options: 15, 30, 60, defaults to 15
  // If an unsupported interval is passed in, it will default to 15
  intervalMin?: number,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

// Allowed intervals between options
const ALLOWED_INTERVALS = [15, 30, 60]; // min

// Default interval to use if an unsupported interval is passed in
const DEFAULT_INTERVAL = ALLOWED_INTERVALS[0]; // min

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
  // Currently selected hour
  hour: number,
  // Currently selected minute
  minute: number,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Set a new time
  SetTime = 'SetTime',
}

// Action definitions
type Action = (
  | {
    // Action type
    type: ActionType.SetTime,
    // New hour
    hour: number,
    // New minute
    minute: number,
  }
);

/**
 * Reducer that executes actions
 * @author Gardenia Liu
 * @param state current state
 * @param action action to execute
 * @returns updated state
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SetTime: {
      return {
        ...state,
        hour: action.hour,
        minute: action.minute,
      };
    }
    default: {
      return state;
    }
  }
};

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
    // onChange,
  } = props;
  let {
    intervalMin = DEFAULT_INTERVAL,
  } = props;

  // Use default interval if not supported
  if (!ALLOWED_INTERVALS.includes(intervalMin)) {
    intervalMin = DEFAULT_INTERVAL;
  }

  /* -------------- State ------------- */

  // Initial state
  const initialState: State = {
    hour,
    minute,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  // const {
  //   hour,
  //   minute,
  // } = state;

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Convert number of minutes since midnight into 24hour and minute format
   * @author Gabe Abrams
   * @param minSinceMidnight total minutes since midnight
   * @returns hours (24) and minutes
   */
  const convertMinSinceMidnightToHoursAndMin = (minSinceMidnight: number): {
    hours: number,
    minutes: number,
  } => {
    return {
      hours: Math.floor(minSinceMidnight / 60),
      minutes: minSinceMidnight % 60,
    };
  };

  /**
   * Convert time in minutes into HH:MM format
   * @author Gardenia Liu
   * @param totalMinutes total minutes since midnight
   * @returns formatted time string
   */
  const formatTime = (totalMinutes: number): string => {
    // Handle special cases
    if (totalMinutes === 0) {
      return '12:00 Midnight';
    }
    if (totalMinutes === 12 * 60) {
      return '12:00 Noon';
    }

    // All normal cases:
    const timeInfo = convertMinSinceMidnightToHoursAndMin(totalMinutes);
    let { hours } = timeInfo;
    const { minutes } = timeInfo;

    // Process 24hr -> 12hr
    const isAM = (hours < 12);
    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours %= 12;
    }

    // Pad with zeros
    const paddedMinutes = padZerosLeft(minutes, 2);

    // Assemble time string
    return `${hours}:${paddedMinutes} ${isAM ? 'AM' : 'PM'}`;
  };

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  // Generate list of time options
  const times: string[] = [];
  for (let time = 0; time < 24 * 60; time += intervalMin) {
    times.push(formatTime(time));
  }

  // Create choice options
  const selectedTimeMin = state.hour * 60 + state.minute; // minutes since midnight
  const timeOptions: React.ReactNode[] = times.map((timeString, timeIndex) => {
    // Create time option
    const numMinutesForChoice = timeIndex * intervalMin;

    // Render the option
    return (
      <option
        key={numMinutesForChoice}
        value={numMinutesForChoice}
        aria-label={`choose ${timeString}`}
      >
        {timeString}
      </option>
    );
  });

  return (
    <div
      className="SimpleTimeChooser-container"
      aria-label={`time chooser with selected time: ${formatTime(selectedTimeMin)}`}
    >
      {/* Time Chooser */}
      <select
        aria-label={`time for ${ariaLabel}`}
        className="custom-select d-inline-block"
        style={{ width: 'auto' }}
        id={`SimpleTimeChooser-${name}-time`}
        value={selectedTimeMin}
        onChange={(e) => {
          // Parse selector value (string)
          const newTime = Number.parseInt(e.target.value, 10);

          // Convert minutes since midnight to hour and minute
          const timeInfo = convertMinSinceMidnightToHoursAndMin(newTime);

          // Dispatch local update
          dispatch({
            type: ActionType.SetTime,
            hour: timeInfo.hours,
            minute: timeInfo.minutes,
          });

          // Notify parent of change
          // onChange(timeInfo.hours, timeInfo.minutes);
        }}
      >
        {timeOptions}
      </select>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default SimpleTimeChooser;
