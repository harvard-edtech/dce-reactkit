/**
 * Loading spinner/indicator
 * @author Gabe Abrams
 */

// Import react
import React from 'react';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/

const style = `
/* Container fades in */
.LoadingSpinner-container {
  animation-name: LoadingSpinner-container-fade-in;
  animation-duration: 0.3s;
  animation-delay: 0.4s;
  animation-fill-mode: both;
  animation-timing-function: ease-out;
}
@keyframes LoadingSpinner-container-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Blips */
.LoadingSpinner-blip-1,
.LoadingSpinner-blip-2,
.LoadingSpinner-blip-3,
.LoadingSpinner-blip-4 {
  font-size: 1.8rem;
  opacity: 0.6;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

/* First Blip */
.LoadingSpinner-blip-1 {
  animation: LoadingSpinner-pop-animation 2s infinite;
}

/* Second Blip */
.LoadingSpinner-blip-2 {
  animation: LoadingSpinner-pop-animation 2s infinite;
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

/* Third Blip */
.LoadingSpinner-blip-3 {
  animation: LoadingSpinner-pop-animation 2s infinite;
  animation-delay: 0.2s;
}

/* Fourth Blip */
.LoadingSpinner-blip-4 {
  animation: LoadingSpinner-pop-animation 2s infinite;
  animation-delay: 0.3s;
}

/* Pop Animation for Each Blip */
@keyframes LoadingSpinner-pop-animation {
  0%  {
    transform: scale(1.0);
  }
  10% {
    transform: scale(1.5);
  }
  30% {
    transform: scale(1.0);
  }
  100% {
    transform: scale(1.0);
  }
}
`;

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const LoadingSpinner = () => {
  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  // Add all four blips to a container
  return (
    <div className="text-center LoadingSpinner LoadingSpinner-container">
      <style>{style}</style>
      <FontAwesomeIcon
        icon={faCircle}
        className="LoadingSpinner-blip-1 me-1"
      />
      <FontAwesomeIcon
        icon={faCircle}
        className="LoadingSpinner-blip-2 me-1"
      />
      <FontAwesomeIcon
        icon={faCircle}
        className="LoadingSpinner-blip-3 me-1"
      />
      <FontAwesomeIcon
        icon={faCircle}
        className="LoadingSpinner-blip-4"
      />
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default LoadingSpinner;
