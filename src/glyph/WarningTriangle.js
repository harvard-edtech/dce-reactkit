import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

class WarningTriangle extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faExclamationTriangle} {...this.props} />
    );
  }
}

export default WarningTriangle;
