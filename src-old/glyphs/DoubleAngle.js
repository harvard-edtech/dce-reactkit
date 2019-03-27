import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleUp,
  faAngleDoubleDown,
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons';

/* use direction="up|down|left|right" (default is "right")
 */

class DoubleAngle extends Component {
  render() {
    // Extract props
    const {
      direction,
      ...props
    } = this.props;

    switch (direction) {
      case 'up':
        return (
          <FontAwesomeIcon icon={faAngleDoubleUp} {...props} />
        );
      case 'down':
        return (
          <FontAwesomeIcon icon={faAngleDoubleDown} {...props} />
        );
      case 'left':
        return (
          <FontAwesomeIcon icon={faAngleDoubleLeft} {...props} />
        );
      default:
        return (
          <FontAwesomeIcon icon={faAngleDoubleRight} {...props} />
        );
    }
  }
}

DoubleAngle.propTypes = {
  /* Direction of the angle */
  direction: PropTypes.oneOf([
    'up',
    'down',
    'left',
    'right',
  ]),
};

DoubleAngle.defaultProps = {
  direction: 'right',
};

export default DoubleAngle;
