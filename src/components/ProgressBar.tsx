/**
 * Customizable Progress Bar component using Bootstrap styles
 * @author Allison Zhang
 */

// Import React
import React from 'react';

// Import types
import Variant from '../types/Variant';
import ProgressBarSize from '../types/ProgressBarSize';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

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
    hideOutline?: boolean,
    // Size of the progress bar (default md)
    size?: ProgressBarSize,
  }
);

/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/

let style = `
  .ProgressBar-number-of,
  .ProgressBar-percent {
    flex: 0 0 auto;
    white-space: nowrap;
    padding-right: 0.5em;
    padding-left: 0.25em;
    text-align: right;
    transition: width 240ms ease;
  }

  .ProgressBar-background {
    overflow: hidden;
  }

  .ProgressBar-bar {
    transition: all 1s ease;
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

  // Get either items or percentage props
  const {
    percentProgress,
    numDecimalPlaces,
    numComplete,
    total,
  } = (() => {
    if ('percentProgress' in props) {
      const {
        percentProgress: progress,
        numDecimalPlaces: num,
      } = props;
      return {
        percentProgress: progress,
        numDecimalPlaces: num,
      };
    }
    const {
      numComplete: num,
      total: tot,
    } = props;
    return {
      numComplete: num,
      total: tot,
    };
  })();

  const {
    striped = false,
    variant = Variant.Warning,
    bgVariant = Variant.Secondary,
    hideOutline = false,
    size = ProgressBarSize.Medium,
  } = props;

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* ---------------- Sizes --------------- */
  /*----------------------------------------*/

  // Size styles
  switch (size) {
    case ProgressBarSize.Small:
      // Small size
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
        .ProgressBar-percent {
          min-width: ${((numDecimalPlaces || 0) * 1) + 3}em;
          max-width: ${((numDecimalPlaces || 0) * 1) + 3}em;
        }
        .ProgressBar-number-of {
          min-width: ${((total?.toString().length || 1) * 1.3) + 2}em;
          max-width: ${((total?.toString().length || 1) * 1.3) + 2}em;
        }
      `;
      break;
    case ProgressBarSize.Medium:
      // Medium size
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
        .ProgressBar-percent {
          min-width: ${((numDecimalPlaces || 0) * 1) + 3}em;
          max-width: ${((numDecimalPlaces || 0) * 1) + 3}em;
        }
        .ProgressBar-number-of {
          min-width: ${((total?.toString().length || 1) * 1.2) + 2}em;
          max-width: ${((total?.toString().length || 1) * 1.2) + 2}em;
        }
      `;
      break;
    case ProgressBarSize.Large:
      // Large size
      style += `
        .ProgressBar-container .ProgressBar-number-of, .ProgressBar-container .ProgressBar-percent {
          font-size: 2em;
        }
        .ProgressBar-container .ProgressBar-background {
          height: 3em;
          border-radius: 1em;
        }
        .ProgressBar-container .ProgressBar-bar {
          height: 3em;
          border-radius: 1em;
        }
        .ProgressBar-percent {
          min-width: ${((numDecimalPlaces || 0) * 1) + 3}em;
          max-width: ${((numDecimalPlaces || 0) * 1) + 3}em;
        }
        .ProgressBar-number-of {
          min-width: ${((total?.toString().length || 1) * 1.2) + 2}em;
          max-width: ${((total?.toString().length || 1) * 1.2) + 2}em;
        }
      `;
      break;
    default:
      break;
  }

  // Get the width of the outline based on size
  const outlineWidth = (() => {
    switch (size) {
      case ProgressBarSize.Small: return '1px';
      case ProgressBarSize.Medium: return '1.5px';
      case ProgressBarSize.Large: return '2px';
      default: return '1px';
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
  const stripes: React.ReactNode = (
    <div>
      <style>{stripesStyle}</style>
      <div
        className="ProgressBar-stripes position-absolute "
        style={{
          width: '200%',
          height: '100%',
        }}
      >
        &nbsp;
      </div>
    </div>
  );

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  // Render the progress bar
  return (
    <div className="ProgressBar-container d-flex align-items-center">
      {/* Style */}
      <style>{style}</style>
      {numComplete && (
        <span
          className="ProgressBar-number-of pe-2 align-self-center"
        >
          {numComplete}
          &nbsp;of&nbsp;
          {total}
        </span>
      )}
      {percentProgress && (
        <span
          className="ProgressBar-percent pe-2 align-self-center"
        >
          {percentProgress.toFixed(numDecimalPlaces ?? 0)}
          %
        </span>
      )}
      <div
        className={`ProgressBar-background bg-${bgVariant} w-100`}
        style={{
          boxShadow: `0px 0px 0 ${outlineWidth} ${hideOutline ? '#DEE2E6' : '#000'}`,
        }}
      >
        <div
          className={
            `ProgressBar-bar bg-${variant} text-start position-relative`
          }
          style={{
            width: `${(percentProgress ?? (numComplete / total) * 100).toFixed(numDecimalPlaces ?? 0)}%`,
            overflow: 'hidden',
          }}
        >
          {striped && stripes}
          &nbsp;
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
