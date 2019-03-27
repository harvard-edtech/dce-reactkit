var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare as faSquareFilled } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

class Square extends Component {
  render() {
    // Deconstruct props
    const _props = this.props,
          {
      grow,
      filled
    } = _props,
          props = _objectWithoutProperties(_props, ['grow', 'filled']);

    if (filled) {
      return React.createElement(FontAwesomeIcon, _extends({
        icon: faSquareFilled,
        transform: grow ? `grow-${grow}` : undefined
      }, props));
    }
    return React.createElement(FontAwesomeIcon, _extends({
      icon: faSquare,
      transform: grow ? `grow-${grow}` : undefined
    }, props));
  }
}

Square.propTypes = {
  // If true, the square is filled
  filled: PropTypes.bool,
  // Factor by which to grow the check mark
  grow: PropTypes.number
};

Square.defaultProps = {
  filled: false,
  grow: null
};

export default Square;