/**
 * A shimmer effect to add to the background of an element. The parent of this element
 *   will automatically have its overflow hidden
 * @author Alessandra De Lucas
 * @author Gabe Abrams
 */

// Import React
import React, { useRef, useEffect } from 'react';

// Import commonkit
import {
  waitMs,
} from 'dce-commonkit';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // The duration in seconds of the shimmer animation
  durationSec?: number,
  // The number of iterations of the shimmer animation
  numShimmers?: number,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const Shimmer: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    durationSec = 2,
    numShimmers,
  } = props;

  const numShimmerIterations: string = (
    numShimmers
      ? String(numShimmers)
      : 'infinite'
  );

  /* --------------- Refs ------------- */

  // Ref for the shimmer container
  const containerRef = useRef<HTMLDivElement>(null);

  /*------------------------------------------------------------------------*/
  /* -------------------------------- Style ------------------------------- */
  /*------------------------------------------------------------------------*/

  // Style
  const style = `
    .Shimmer-container {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 0;
      overflow: visible;
    }

    .Shimmer-shine {
      display: inline-block;
      position: absolute;
      width: 100%;
      height: 100vh;

      background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0)); 

      animation-name: Shimmer-slide-animation;
      animation-duration: ${durationSec}s;
      animation-iteration-count: ${numShimmerIterations};
      animation-timing-function: ease-in-out;
      animation-fill-mode: both;
    }

    @keyframes Shimmer-slide-animation {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `;

  /*------------------------------------------------------------------------*/
  /* ------------------------- Lifecycle Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Mount: force parent to have its overflow hidden
   * @author Gabe Abrams
   */
  useEffect(
    () => {
      (async () => {
        // Wait for the container to exist
        while (!containerRef.current) {
          await waitMs(20);
        }

        // Find the parent
        const parent = containerRef.current.parentElement;
        if (!parent) {
          return;
        }

        // Force the parent's overflow to be hidden
        parent.style.overflow = 'hidden';
      })();
    },
    [],
  );

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <div
      className="Shimmer-container"
      ref={containerRef}
    >
      {/* Style */}
      <style>
        {style}
      </style>

      {/* Moving shimmer */}
      <div className="Shimmer-shine" />
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default Shimmer;
