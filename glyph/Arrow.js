var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faArrowRight, faArrowLeft, faArrowCircleUp, faArrowCircleDown, faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

/* use direction="up|down|left|right" (default is "right")
 * add circled prop to put the chevron in a circle bubble
 */

class Arrow extends Component {
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
          return React.createElement(FontAwesomeIcon, _extends({ icon: faArrowCircleUp }, props));
        case 'down':
          return React.createElement(FontAwesomeIcon, _extends({ icon: faArrowCircleDown }, props));
        case 'left':
          return React.createElement(FontAwesomeIcon, _extends({ icon: faArrowCircleLeft }, props));
        default:
          return React.createElement(FontAwesomeIcon, _extends({ icon: faArrowCircleRight }, props));
      }
    } else {
      switch (direction) {
        case 'up':
          return React.createElement(FontAwesomeIcon, _extends({ icon: faArrowUp }, props));
        case 'down':
          return React.createElement(FontAwesomeIcon, _extends({ icon: faArrowDown }, props));
        case 'left':
          return React.createElement(FontAwesomeIcon, _extends({ icon: faArrowLeft }, props));
        default:
          return React.createElement(FontAwesomeIcon, _extends({ icon: faArrowRight }, props));
      }
    }
  }
}

export default Arrow;