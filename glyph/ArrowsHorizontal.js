var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';

class ArrowsHorizontal extends Component {
  render() {
    return React.createElement(FontAwesomeIcon, _extends({ icon: faArrowsAltH }, this.props));
  }
}

export default ArrowsHorizontal;