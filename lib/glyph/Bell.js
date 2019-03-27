var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';

class Bell extends Component {
  render() {
    // Extract props
    const _props = this.props,
          {
      slashed
    } = _props,
          props = _objectWithoutProperties(_props, ['slashed']);

    if (slashed) {
      return React.createElement(FontAwesomeIcon, _extends({ icon: faBellSlash }, props));
    }
    return React.createElement(FontAwesomeIcon, _extends({ icon: faBell }, props));
  }
}

Bell.propTypes = {
  // If true, a slash is shown cutting through the bell
  slashed: PropTypes.bool
};

Bell.defaultProps = {
  slashed: false
};

export default Bell;