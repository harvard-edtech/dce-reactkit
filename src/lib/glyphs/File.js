import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFile,
  faFileCsv,
} from '@fortawesome/free-solid-svg-icons';

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

    return (
      <FontAwesomeIcon icon={icon} {...this.props} />
    );
  }
}

export default File;
