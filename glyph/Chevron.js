var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faChevronRight, faChevronLeft, faChevronCircleUp, faChevronCircleDown, faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

/* use direction="up|down|left|right" (default is "right")
 * add circled prop to put the chevron in a circle bubble
 */

class Chevron extends Component {
  render() {
    // Extract props
    const _props = this.props,
          {
      circled,
      direction
    } = _props,
          props = _objectWithoutProperties(_props, ['circled', 'direction']);

    if (circled) {
      switch (direction) {
        case 'up':
          return React.createElement(FontAwesomeIcon, _extends({ icon: faChevronCircleUp }, props));
        case 'down':
          return React.createElement(FontAwesomeIcon, _extends({ icon: faChevronCircleDown }, props));
        case 'left':
          return React.createElement(FontAwesomeIcon, _extends({ icon: faChevronCircleLeft }, props));
        default:
          return React.createElement(FontAwesomeIcon, _extends({ icon: faChevronCircleRight }, props));
      }
    } else {
      switch (direction) {
        case 'up':
          return React.createElement(FontAwesomeIcon, _extends({ icon: faChevronUp }, props));
        case 'down':
          return React.createElement(FontAwesomeIcon, _extends({ icon: faChevronDown }, props));
        case 'left':
          return React.createElement(FontAwesomeIcon, _extends({ icon: faChevronLeft }, props));
        default:
          return React.createElement(FontAwesomeIcon, _extends({ icon: faChevronRight }, props));
      }
    }
  }
}

Chevron.propTypes = {
  // If true, the chevron is shown in a circle
  circled: PropTypes.bool,
  // The direction of the chevron
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right'])
};

Chevron.defaultProps = {
  circled: false,
  direction: 'right'
};

export default Chevron;