var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignLeft, faAlignRight, faAlignJustify } from '@fortawesome/free-solid-svg-icons';

class TextAlign extends Component {
  render() {
    // Deconstruct props
    const {
      left,
      right,
      justify,
      center
    } = this.props;

    let icon;
    if (left) {
      icon = faAlignLeft;
    } else if (right) {
      icon = faAlignRight;
    } else if (justify) {
      icon = faAlignJustify;
    } else if (center) {
      icon = faAlignCenter;
    } else {
      icon = faAlignLeft;
    }
    return React.createElement(FontAwesomeIcon, _extends({ icon: icon }, this.props));
  }
}

TextAlign.propTypes = {
  // If true, left align is shown
  left: PropTypes.bool,
  // If true, right align is shown
  right: PropTypes.bool,
  // If true, justify alignment is shown
  justify: PropTypes.bool,
  // If true, center align is shown
  center: PropTypes.bool
};

TextAlign.defaultProps = {
  left: null,
  right: null,
  justify: null,
  center: null
};

export default TextAlign;