/**
 * Failure x mark that pops into view
 * @author Gabe Abrams
 */

// Import React
import React from 'react';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // Size of x mark in rem
  sizeRem?: number,
  // Bootstrap variant of circle
  circleVariant?: string,
  // Bootstrap variant of x mark
  xVariant?: string,
};

/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/

const style = `
  .PopFailureMark-outer-container {
    position: relative;
    display: inline-block;
    border-radius: 50%;

    animation-name: PopFailureMark-outer-container;
    animation-duration: 0.8s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  @keyframes PopFailureMark-outer-container {
    0% {
      opacity: 0;
      transform: scale(1.5);
      filter: saturate(0);
    }
    80.7% {
      opacity: 1;
      transform: scale(1);
      filter: saturate(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
      filter: saturate(1);
    }
  }

  .PopFailureMark-x-stroke-1 {
    position: absolute;
    left: 25%;
    top: 19%;

    display: inline-block;
    height: 16%;
    width: 70%;

    transform-origin: left;

    animation-name: PopFailureMark-x-stroke-1;
    animation-duration: 0.3s;
    animation-delay: 0.3s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
  }
  @keyframes PopFailureMark-x-stroke-1 {
    0% {
      transform: rotate(45deg) scaleX(0);
    }
    100% {
      transform: rotate(45deg) scaleX(1);
    }
  }

  .PopFailureMark-x-stroke-2 {
    position: absolute;
    left: 75%;
    top: 19%;

    display: inline-block;
    height: 16%;
    width: 70%;

    transform-origin: left;

    animation-name: PopFailureMark-x-stroke-2;
    animation-duration: 0.3s;
    animation-delay: 0.6s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  @keyframes PopFailureMark-x-stroke-2 {
    0% {
      transform: rotate(135deg) scaleX(0);
    }
    100% {
      transform: rotate(135deg) scaleX(1);
    }
  }
`;

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const PopFailureMark: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    sizeRem = 3,
    circleVariant = 'danger',
    xVariant = 'white',
  } = props;

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <div
      className={`PopFailureMark-outer-container bg-${circleVariant}`}
      style={{
        width: `${sizeRem}rem`,
        height: `${sizeRem}rem`,
      }}
      aria-label="mark indicating failure"
    >
      {/* Style */}
      <style>{style}</style>
      {/* Failure mark */}
      <div
        className={`PopFailureMark-x-stroke-1 bg-${xVariant}`}
        style={{
          borderRadius: `${sizeRem / 5}rem`,
        }}
      />
      <div
        className={`PopFailureMark-x-stroke-2 bg-${xVariant}`}
        style={{
          borderRadius: `${sizeRem / 5}rem`,
        }}
      />
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default PopFailureMark;
