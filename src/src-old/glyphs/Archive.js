import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive } from '@fortawesome/free-solid-svg-icons';

class Archive extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faArchive} {...this.props} />
    );
  }
}

export default Archive;
