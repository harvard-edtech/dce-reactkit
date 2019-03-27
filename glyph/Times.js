var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class Times extends Component {
  render() {
    // Deconstruct props
    const _props = this.props,
          {
      grow
    } = _props,
          props = _objectWithoutProperties(_props, ['grow']);

    return React.createElement(FontAwesomeIcon, _extends({
      icon: faTimes,
      transform: grow ? `grow-${grow}` : undefined
    }, props));
  }
}

Times.propTypes = {
  // Factor by which to grow the check mark
  grow: PropTypes.number
};

Times.defaultProps = {
  grow: null
};

export default Times;