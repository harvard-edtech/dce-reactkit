import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faArrowDown,
  faArrowRight,
  faArrowLeft,
  faArrowCircleUp,
  faArrowCircleDown,
  faArrowCircleRight,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

/* use direction="up|down|left|right" (default is "right")
 * add circled prop to put the chevron in a circle bubble
 */

class Arrow extends Component {
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
            <FontAwesomeIcon icon={faArrowCircleUp} {...props} />
          );
        case 'down':
          return (
            <FontAwesomeIcon icon={faArrowCircleDown} {...props} />
          );
        case 'left':
          return (
            <FontAwesomeIcon icon={faArrowCircleLeft} {...props} />
          );
        default:
          return (
            <FontAwesomeIcon icon={faArrowCircleRight} {...props} />
          );
      }
    } else {
      switch (direction) {
        case 'up':
          return (
            <FontAwesomeIcon icon={faArrowUp} {...props} />
          );
        case 'down':
          return (
            <FontAwesomeIcon icon={faArrowDown} {...props} />
          );
        case 'left':
          return (
            <FontAwesomeIcon icon={faArrowLeft} {...props} />
          );
        default:
          return (
            <FontAwesomeIcon icon={faArrowRight} {...props} />
          );
      }
    }
  }
}

export default Arrow;
