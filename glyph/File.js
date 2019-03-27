var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileCsv } from '@fortawesome/free-solid-svg-icons';

class File extends Component {
  render() {
    const { type } = this.props;

    // Choose an icon
    let icon;
    switch (type) {
      case 'csv':
        icon = faFileCsv;
        break;
      default:
        icon = faFile;
        break;
    }

    return React.createElement(FontAwesomeIcon, _extends({ icon: icon }, this.props));
  }
}

File.propTypes = {
  // Supported file types: 'csv'
  type: PropTypes.string
};

File.defaultProps = {
  type: null
};

export default File;