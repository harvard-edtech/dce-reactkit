import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';

class Download extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faCloudDownloadAlt} {...this.props} />
    );
  }
}

export default Download;
