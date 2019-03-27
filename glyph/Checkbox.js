var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';

class Checkbox extends Component {
  render() {
    // Deconstruct props
    const _props = this.props,
          {
      grow,
      checked
    } = _props,
          props = _objectWithoutProperties(_props, ['grow', 'checked']);

    return React.createElement(FontAwesomeIcon, _extends({
      icon: checked ? faCheckSquare : faSquare,
      transform: grow ? `grow-${grow}` : undefined
    }, props));
  }
}

Checkbox.propTypes = {
  // If true, the checkbox is checked
  checked: PropTypes.bool,
  // Factor by which to grow the checkbox
  grow: PropTypes.number
};

Checkbox.defaultProps = {
  checked: false,
  grow: null
};

export default Checkbox;