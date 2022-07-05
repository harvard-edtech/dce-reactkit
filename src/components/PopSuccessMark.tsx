/**
 * Success checkmark that pops into view
 * @author Gabe Abrams
 */

// Import React
import React from 'react';

/*------------------------------------------------------------------------*/
/*                                  Types                                 */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // Size of checkmark in rem
  sizeRem?: number,
  // Bootstrap variant of circle
  circleVariant?: string,
  // Bootstrap variant of checkmark
  checkVariant?: string,
};

/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/

const style = `
  .PopSuccessMark-outer-container {
    position: relative;
    display: inline-block;
    border-radius: 50%;

    animation-name: PopSuccessMark-outer-container;
    animation-duration: 0.8s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  @keyframes PopSuccessMark-outer-container {
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

  .PopSuccessMark-check-stroke-1 {
    position: absolute;
    left: 20%;
    top: 36%;

    display: inline-block;
    height: 16%;
    width: 35%;

    transform-origin: left;

    animation-name: PopSuccessMark-check-stroke-1;
    animation-duration: 0.3s;
    animation-delay: 0.3s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
  }
  @keyframes PopSuccessMark-check-stroke-1 {
    0% {
      transform: rotate(45deg) scaleX(0);
    }
    100% {
      transform: rotate(45deg) scaleX(1);
    }
  }


  .PopSuccessMark-check-stroke-2 {
    position: absolute;
    left: 35%;
    top: 63%;

    display: inline-block;
    height: 16%;
    width: 60%;

    transform-origin: left;

    animation-name: PopSuccessMark-check-stroke-2;
    animation-duration: 0.3s;
    animation-delay: 0.6s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  @keyframes PopSuccessMark-check-stroke-2 {
    0% {
      transform: rotate(-40deg) scaleX(0);
    }
    100% {
      transform: rotate(-40deg) scaleX(1);
    }
  }
`;

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const PopSuccessMark: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /*                                  Setup                                 */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    sizeRem = 3,
    circleVariant = 'success',
    checkVariant = 'white',
  } = props;

  /*------------------------------------------------------------------------*/
  /*                                 Render                                 */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /*                 Main UI                */
  /*----------------------------------------*/

  return (
    <div
      className={`PopSuccessMark-outer-container bg-${circleVariant}`}
      style={{
        width: `${sizeRem}rem`,
        height: `${sizeRem}rem`,
      }}
      aria-label="checkmark indicating success"
    >
      {/* Style */}
      <style>{style}</style>
      {/* Check mark */}
      <div
        className={`PopSuccessMark-check-stroke-1 bg-${checkVariant}`}
        style={{
          borderRadius: `${sizeRem / 5}rem`,
        }}
      />
      <div
        className={`PopSuccessMark-check-stroke-2 bg-${checkVariant}`}
        style={{
          borderRadius: `${sizeRem / 5}rem`,
        }}
      />
    </div>
  );
};

/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/

// Export component
export default PopSuccessMark;
