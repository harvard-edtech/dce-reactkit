import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faChevronCircleUp,
  faChevronCircleDown,
  faChevronCircleRight,
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

/* use direction="up|down|left|right" (default is "right")
 * add circled prop to put the chevron in a circle bubble
 */

class Chevron extends Component {
  render() {
    // Extract props
    const {
      circled,
      direction,
      ...props
    } = this.props;

    if (circled) {
      switch (direction) {
        case 'up':
          return (
            <FontAwesomeIcon icon={faChevronCircleUp} {...props} />
          );
        case 'down':
          return (
            <FontAwesomeIcon icon={faChevronCircleDown} {...props} />
          );
        case 'left':
          return (
            <FontAwesomeIcon icon={faChevronCircleLeft} {...props} />
          );
        default:
          return (
            <FontAwesomeIcon icon={faChevronCircleRight} {...props} />
          );
      }
    } else {
      switch (direction) {
        case 'up':
          return (
            <FontAwesomeIcon icon={faChevronUp} {...props} />
          );
        case 'down':
          return (
            <FontAwesomeIcon icon={faChevronDown} {...props} />
          );
        case 'left':
          return (
            <FontAwesomeIcon icon={faChevronLeft} {...props} />
          );
        default:
          return (
            <FontAwesomeIcon icon={faChevronRight} {...props} />
          );
      }
    }
  }
}

Chevron.propTypes = {
  // If true, the chevron is shown in a circle
  circled: PropTypes.bool,
  // The direction of the chevron
  direction: PropTypes.oneOf([
    'up',
    'down',
    'left',
    'right',
  ]),
};

Chevron.defaultProps = {
  circled: false,
  direction: 'right',
};

export default Chevron;
