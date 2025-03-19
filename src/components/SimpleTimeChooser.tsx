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

const allowedIntervals = [15, 30, 60];
let safeIntervalMin = 15;

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
    intervalMin = 15,
  } = props;

  // Detect interval, set to 15min if not supported
  if (allowedIntervals.includes(intervalMin)) {
    safeIntervalMin = intervalMin;
  }

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  // Helper function: Convert time in minutes into HH:MM format
  const formatTime = (totalMinutes: number): string => {
    if (totalMinutes === 0) {
      return '12:00 Midnight'
    } else if (totalMinutes === 12*60) {
      return '12:00 Noon'
    }

    let hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let period = 'AM';
    if (hours >= 12) {
      period = 'PM';
    }
    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours = hours % 12;
    }

    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    return `${paddedHours}:${paddedMinutes} ${period}`;
  }

  const times = [];
  for (let time = 0; time < 24*60; time+= safeIntervalMin) {
    times.push(formatTime(time));
  }

  // Create choice options
  const selectedTime = hour * 60 + minute;
  const timeOptions: React.ReactNode[] = [];
  times.forEach((timeString, timeIndex) => {
    // Create time option
    const optionValue = timeIndex * safeIntervalMin;
    timeOptions.push(
      <option
        key={`time-${timeIndex}`}
        value={optionValue}
        aria-label={`choose ${timeString}`}
      >
        {timeString}
      </option>,
    );
  });

  return (
    <div
      className="SimpleTimeChooser-container"
      aria-label={`time chooser with selected time: ${selectedTime}`}
    >
      {/* Time Chooser */}
      <select
        aria-label={`time for ${ariaLabel}`}
        className="custom-select d-inline-block"
        style={{ width: 'auto' }}
        id={`SimpleTimeChooser-${name}-time`}
        value={selectedTime}
        onChange={(e) => {
          const newTime = Number(e.target.value);
          const newHour = Math.floor(newTime / 60);
          const newMinute = newTime % 60;
          onChange(newHour, newMinute);
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
