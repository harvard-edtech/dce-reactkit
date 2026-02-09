/**
 * Customizable Progress Bar component using Bootstrap styles
 * @author Allison Zhang
 */

// Import React
import React from 'react';

// Import types
import Variant from '../types/Variant';
import ProgressBarSize from '../types/ProgressBarSize';

// Import helpers
import {
  roundToNumDecimals,
  padDecimalZeros,
} from 'dce-commonkit';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = (
  & (
    // Percent
    | {
      // Percentage progress (0-100)
      percentProgress: number,
      // Num decimal places to show (default 0)
      numDecimalPlaces?: number,
    }
    // Items
    | {
      // Current progress (number of items completed)
      numComplete: number,
      // Maximum progress (total number of items)
      total: number,
    }
  )
  & {
    // Whether to show striped effect (default false)
    striped?: boolean,
    // Variant of the progress bar (default warning)
    variant?: Variant,
    // Background variants (default secondary subtle)
    bgVariant?: Variant,
    // Hide outline (default false)
    showOutline?: boolean,
    // Size of the progress bar (default md)
    size?: ProgressBarSize,
  }
);

// Progress status definition
type ProgressStatus = (
  | {
    // usePercent true
    usePercent: true,
    // Percentage progress (0-100)
    percentProgress: number,
    // Num decimal places to show (default 0)
    numDecimalPlaces?: number,
  }
  // Items
  | {
    // usePercent false
    usePercent: false,
    // Current progress (number of items completed)
    numComplete: number,
    // Maximum progress (total number of items)
    total: number,
  }
);

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

// Multiplier for calculating width of number of items
const ITEM_WIDTH_MULTIPLIER = 1.3;

// Constant for percent width
const PERCENT_WIDTH = 2.7;

// Constant for item width
const ITEM_WIDTH = 2;

/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/

// Base styles
let style = `
  .ProgressBar-number-of,
  .ProgressBar-percent {
    white-space: nowrap;
    padding-right: 0.3em;
    text-align: left;
    transition: width .25s ease;
  }

  .ProgressBar-background {
    overflow: hidden;
  }

  .ProgressBar-bar {
    transition: width 1s ease;
    overflow: hidden;
  }
`;

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const ProgressBar: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure props
  const {
    striped,
    variant = Variant.Warning,
    bgVariant = Variant.Secondary,
    showOutline,
    size = ProgressBarSize.Medium,
  } = props;

  /* -------------- Status ------------- */

  // Determine progress status
  let status: ProgressStatus;

  // Check whether to use percent or items
  if ('percentProgress' in props) {
    // Percent
    const {
      percentProgress,
      numDecimalPlaces,
    } = props;
    status = {
      usePercent: true,
      percentProgress,
      numDecimalPlaces,
    };
  } else {
    // Items
    const {
      numComplete,
      total,
    } = props;
    status = {
      usePercent: false,
      numComplete,
      total,
    };
  }

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* ---------------- Sizes --------------- */
  /*----------------------------------------*/

  // Add dynamic general style
  style += `
    .ProgressBar-percent {
      min-width: ${(status.usePercent ? status.numDecimalPlaces ?? 0 : 0) + PERCENT_WIDTH}em;
    }
    .ProgressBar-number-of {
      min-width: ${((!status.usePercent ? String(status.total ?? 0).length || 1 : 0) * ITEM_WIDTH_MULTIPLIER) + ITEM_WIDTH}em;
    }
  `;

  // Size styles
  switch (size) {
    case ProgressBarSize.Medium:
      // Medium size
      style += `
        .ProgressBar-container .ProgressBar-number-of, .ProgressBar-container .ProgressBar-percent {
          font-size: 1em;
        }
        .ProgressBar-container .ProgressBar-background {
          height: 1.5em;
          border-radius: 0.5em;
        }
        .ProgressBar-container .ProgressBar-bar {
          height: 1.5em;
          border-radius: 0.5em;
        }
      `;
      break;
    case ProgressBarSize.Large:
      // Large size
      style += `
        .ProgressBar-container .ProgressBar-number-of, .ProgressBar-container .ProgressBar-percent {
          font-size: 1.5em;
        }
        .ProgressBar-container .ProgressBar-background {
          height: 2em;
          border-radius: 0.7em;
        }
        .ProgressBar-container .ProgressBar-bar {
          height: 2em;
          border-radius: 0.7em;
        }
      `;
      break;
    default:
      break;
  }

  // Get the width of the outline based on size
  const outlineWidth = (() => {
    switch (size) {
      case ProgressBarSize.Medium: return '0.05em';
      case ProgressBarSize.Large: return '0.08em';
      default: return '0.05em';
    }
  })();

  /*----------------------------------------*/
  /* --------------- Stripes -------------- */
  /*----------------------------------------*/

  // Stripes style
  const stripesStyle = `
    .ProgressBar-stripes {
      background-image: linear-gradient(315deg, #ffffff 25%, #000000 25%, #000000 50%, #ffffff 50%, #ffffff 75%, #000000 75%, #000000 100%);
      background-size: 6em 6em;
      animation: ProgressBar-stripe-animation 2.5s linear infinite;
      opacity: 0.09;
    }
    @keyframes ProgressBar-stripe-animation {
      0% {
        background-position: -6em 0;
      }
      100% {
        background-position: 0 0;
      }
    }
  `;

  // Stripes for striped effect
  let stripes: React.ReactNode = null;
  if (striped) {
    stripes = (
      <div>
        <style>{stripesStyle}</style>
        <div
          className="ProgressBar-stripes position-absolute"
          style={{
            width: '200%',
            height: '100%',
          }}
        >
          &nbsp;
        </div>
      </div>
    );
  }

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  // Calculate the width of the progress bar
  let progressBarWidthPercent = 0;
  if (status.usePercent) {
    // Use percent progress directly
    progressBarWidthPercent = status.percentProgress;
  } else if (status.total > 0) {
    // Calculate percent progress from items
    progressBarWidthPercent = (status.numComplete / status.total) * 100;
  }

  // Render the progress bar
  return (
    <div className="ProgressBar-container d-flex align-items-center">
      {/* Style */}
      <style>{style}</style>
      {/* Use items */}
      {!status.usePercent && status.numComplete && (
        <span className="ProgressBar-number-of">
          {status.numComplete}
          &nbsp;of&nbsp;
          {status.total}
        </span>
      )}
      {/* Use percentage */}
      {status.usePercent && (
        <span className="ProgressBar-percent">
          {
            padDecimalZeros(
              roundToNumDecimals(status.percentProgress ?? 0, status?.numDecimalPlaces ?? 0),
              status?.numDecimalPlaces ?? 0,
            )
          }
          %
        </span>
      )}
      {/* Progress Bar Filled Area */}
      <div
        className={`ProgressBar-background bg-${bgVariant} flex-grow-1`}
        style={{
          boxShadow: `0 0 0 ${outlineWidth} ${showOutline ? '#000' : '#DEE2E6'}`,
        }}
        aria-valuenow={status.usePercent ? status.percentProgress : status.numComplete}
        aria-valuemin={0}
        aria-valuemax={status.usePercent ? 100 : status.total}
      >
        <div
          className={
            `ProgressBar-bar bg-${variant} text-start position-relative`
          }
          style={{
            width: `${progressBarWidthPercent}%`,
            overflow: 'hidden',
          }}
        >
          {/* Show Strips (if they exist) */}
          {stripes}
          {/* Space so the bar has some content */}
          &nbsp;
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
