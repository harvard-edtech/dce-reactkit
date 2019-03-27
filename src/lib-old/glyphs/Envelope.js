import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

class Envelope extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faEnvelope} {...this.props} />
    );
  }
}

export default Envelope;
