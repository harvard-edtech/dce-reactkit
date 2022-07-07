/**
 * Failure pending that pops into view
 * @author Gabe Abrams
 */

// Import React
import React from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';

/*------------------------------------------------------------------------*/
/*                                  Types                                 */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // Size of pending in rem
  sizeRem?: number,
  // Bootstrap variant of circle
  circleVariant?: string,
  // Bootstrap variant of pending
  hourglassVariant?: string,
};

/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/

const style = `
  .PopPendingMark-outer-container {
    position: relative;
    display: inline-block;
    border-radius: 50%;

    animation-name: PopPendingMark-outer-container;
    animation-duration: 0.8s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
  }
  @keyframes PopPendingMark-outer-container {
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

  .PopPendingMark-hourglass {
    position: absolute;
    left: 28%;
    top: 21%;

    animation-name: PopPendingMark-pending;
    animation-duration: 0.3s;
    animation-delay: 0.3s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
  }
  @keyframes PopPendingMark-pending {
    0% {
      transform: scale(0.7) rotate(30deg);
      opacity: 0;
    }
    100% {
      transform: scale(1) rotate(0);
      opacity: 1;
    }
  }
`;

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const PopPendingMark: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /*                                  Setup                                 */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    sizeRem = 3,
    circleVariant = 'warning',
    hourglassVariant = 'white',
  } = props;

  /*------------------------------------------------------------------------*/
  /*                                 Render                                 */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /*                 Main UI                */
  /*----------------------------------------*/

  return (
    <div
      className={`PopPendingMark-outer-container bg-${circleVariant}`}
      style={{
        width: `${sizeRem}rem`,
        height: `${sizeRem}rem`,
      }}
      aria-label="mark indicating that the item is pending"
    >
      {/* Style */}
      <style>{style}</style>
      {/* Pending mark */}
      <div>
        <FontAwesomeIcon
          icon={faHourglass}
          className={`PopPendingMark-hourglass text-${hourglassVariant}`}
          style={{
            fontSize: `${sizeRem * 0.6}rem`,
          }}
        />
      </div>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/

// Export component
export default PopPendingMark;
