var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

class Adjust extends Component {
  render() {
    // Deconstruct props
    const _props = this.props,
          {
      vertical
    } = _props,
          props = _objectWithoutProperties(_props, ['vertical']);

    if (vertical) {
      return React.createElement(FontAwesomeIcon, _extends({ icon: faEllipsisV }, props));
    }
    return React.createElement(FontAwesomeIcon, _extends({ icon: faEllipsisH }, props));
  }
}

Adjust.propTypes = {
  // If true, ellipsis is vertical
  vertical: PropTypes.bool
};

Adjust.defaultProps = {
  vertical: false
};

export default Adjust;