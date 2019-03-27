var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

/* use direction="up|down|left|right" (default is "right")
 */

class Angle extends Component {
  render() {
    // Extract props
    const _props = this.props,
          {
      direction
    } = _props,
          props = _objectWithoutProperties(_props, ['direction']);

    switch (direction) {
      case 'up':
        return React.createElement(FontAwesomeIcon, _extends({ icon: faAngleUp }, props));
      case 'down':
        return React.createElement(FontAwesomeIcon, _extends({ icon: faAngleDown }, props));
      case 'left':
        return React.createElement(FontAwesomeIcon, _extends({ icon: faAngleLeft }, props));
      default:
        return React.createElement(FontAwesomeIcon, _extends({ icon: faAngleRight }, props));
    }
  }
}

Angle.propTypes = {
  /* Direction of the angle */
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right'])
};

Angle.defaultProps = {
  direction: 'right'
};

export default Angle;