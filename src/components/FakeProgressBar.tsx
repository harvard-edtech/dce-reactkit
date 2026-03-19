/**
 * Fake progress bar that approaches completion but never fully finishes.
 * Built on top of the existing ProgressBar component.
 *
 * Two phases:
 *   1. Fast phase (0–90%): random jumps of 1–5% at randomized intervals,
 *      paced to reach ~90% in roughly estimatedTimeSec seconds.
 *   2. Slow phase (90–99%): crawls 1% at a time with longer random delays,
 *      never reaching 100% on its own.
 *
 * When isFinished becomes true, the bar immediately jumps to 100%.
 * @author Yuen Ler Chow
 */

// Import React
import React, { useReducer, useEffect } from 'react';

// Import helpers
import { waitMs } from 'dce-commonkit';

// Import types
import Variant from '../types/Variant';
import ProgressBarSize from '../types/ProgressBarSize';

// Import components
import ProgressBar from './ProgressBar';

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

// Percent where the bar switches from fast random jumps to a slow crawl
const SLOW_PHASE_START_PERCENT = 90;

// Highest percent the bar will reach on its own (before isFinished is true)
const MAX_UNFINISHED_PERCENT = 99;

// Average step size during the fast phase (uniform random from 1–5)
const AVG_FAST_PHASE_STEP = 3;

// Minimum delay (ms) between steps during the slow phase
const SLOW_PHASE_MIN_DELAY_MS = 2000;

// Maximum delay (ms) between steps during the slow phase
const SLOW_PHASE_MAX_DELAY_MS = 5000;

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // True if the task is finished (triggers animation to 100%)
  isFinished?: boolean,
  // Estimated time (in seconds) to finish the task (default 8)
  estimatedTimeSec?: number,
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
};

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
  // Current progress percentage (0-99)
  progress: number,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Advance the progress by a given step
  Advance = 'Advance',
  // Set progress to 100% (task complete)
  Complete = 'Complete',
}

// Action definitions
type Action = (
  | {
    // Action type
    type: ActionType.Advance,
    // Number of percent points to advance
    step: number,
  }
  | {
    // Action type
    type: ActionType.Complete,
  }
);

/**
 * Reducer that executes actions
 * @author Yuen Ler Chow
 * @param state current state
 * @param action action to execute
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.Advance: {
      return {
        ...state,
        progress: Math.min(100, state.progress + action.step),
      };
    }
    case ActionType.Complete: {
      return {
        ...state,
        progress: 100,
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

const FakeProgressBar: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure props
  const {
    isFinished,
    estimatedTimeSec = 8,
    striped,
    variant,
    bgVariant,
    showOutline,
    size,
  } = props;

  /* -------------- State ------------- */

  // Initial state
  const initialState: State = {
    progress: 0,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    progress,
  } = state;

  // Convert estimate to milliseconds
  const estimatedMs = estimatedTimeSec * 1000;

  // Average interval between updates to reach ~90% in the estimated time
  const avgIntervalMs = (estimatedMs / SLOW_PHASE_START_PERCENT) * AVG_FAST_PHASE_STEP;

  /*------------------------------------------------------------------------*/
  /* ------------------------- Lifecycle Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Animate to 100% when isFinished becomes true
   * @author Yuen Ler Chow
   */
  useEffect(
    () => {
      if (isFinished) {
        dispatch({
          type: ActionType.Complete,
        });
      }
    },
    [isFinished],
  );

  /**
   * Advance the progress in two phases:
   * 1) Random jumps up to 90%
   * 2) Slow crawl from 90% to 99%
   * @author Yuen Ler Chow
   */
  useEffect(
    () => {
      // Stop if already finished or at max
      if (isFinished || progress >= MAX_UNFINISHED_PERCENT) {
        return;
      }

      // Determine which phase we are in
      const inFastPhase = progress < SLOW_PHASE_START_PERCENT;

      // Default values
      let delay = avgIntervalMs;
      let step = 1;

      if (inFastPhase) {
        // Randomize delay around the average interval for variability
        const randomnessMultiplier = 0.5 + (Math.random());
        delay = avgIntervalMs * randomnessMultiplier;

        // Randomly move forward by 1-5%, capped at 90%
        step = Math.min(
          1 + Math.floor(Math.random() * 5),
          SLOW_PHASE_START_PERCENT - progress,
        );
      } else {
        // Crawl slowly 1% at a time, clamped so we don't exceed 99%
        delay = SLOW_PHASE_MIN_DELAY_MS + (Math.random() * (SLOW_PHASE_MAX_DELAY_MS - SLOW_PHASE_MIN_DELAY_MS));
        step = Math.min(1, MAX_UNFINISHED_PERCENT - progress);
      }

      // Track whether this effect invocation is still current
      let cancelled = false;

      // Wait then dispatch the next progress update
      (async () => {
        await waitMs(delay);
        if (!cancelled) {
          dispatch({
            type: ActionType.Advance,
            step,
          });
        }
      })();

      return () => {
        cancelled = true;
      };
    },
    [progress, avgIntervalMs, isFinished],
  );

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <ProgressBar
      percentProgress={progress}
      striped={striped}
      variant={variant}
      bgVariant={bgVariant}
      showOutline={showOutline}
      size={size}
    />
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default FakeProgressBar;
