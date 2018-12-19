import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleUp,
  faAngleDown,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';

/* use direction="up|down|left|right" (default is "right")
 */

class Angle extends Component {
  render() {
    // Extract props
    const {
      direction,
      ...props
    } = this.props;

    switch (direction) {
      case 'up':
        return (
          <FontAwesomeIcon icon={faAngleUp} {...props} />
        );
      case 'down':
        return (
          <FontAwesomeIcon icon={faAngleDown} {...props} />
        );
      case 'left':
        return (
          <FontAwesomeIcon icon={faAngleLeft} {...props} />
        );
      default:
        return (
          <FontAwesomeIcon icon={faAngleRight} {...props} />
        );
    }
  }
}

Angle.propTypes = {
  /* Direction of the angle */
  direction: PropTypes.oneOf([
    'up',
    'down',
    'left',
    'right',
  ]),
};

Angle.defaultProps = {
  direction: 'right',
};

export default Angle;
