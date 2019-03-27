var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkOutlined } from '@fortawesome/free-regular-svg-icons';

class Bolt extends Component {
  render() {
    // Extract props
    const _props = this.props,
          {
      outlined
    } = _props,
          props = _objectWithoutProperties(_props, ['outlined']);

    if (outlined) {
      return React.createElement(FontAwesomeIcon, _extends({ icon: faBookmarkOutlined }, props));
    }
    return React.createElement(FontAwesomeIcon, _extends({ icon: faBookmark }, props));
  }
}

Bolt.propTypes = {
  // If true, bolt is shown in an outline instead of filled
  outlined: PropTypes.bool
};

Bolt.defaultProps = {
  outlined: false
};

export default Bolt;