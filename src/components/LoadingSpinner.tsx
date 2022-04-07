/**
 * Loading spinner/indicator
 * @author Gabe Abrams
 */

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

// Import style
import './LoadingSpinner.scss';

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const LoadingSpinner = () => {
  /*------------------------------------------------------------------------*/
  /*                                 Render                                 */
  /*------------------------------------------------------------------------*/

  // Add all four blips to a container
  return (
    <div className="text-center LoadingSpinner LoadingSpinner-container">
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
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/

// Export component
export default LoadingSpinner;
