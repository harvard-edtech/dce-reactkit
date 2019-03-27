import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

class Bolt extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faBolt} {...this.props} />
    );
  }
}

export default Bolt;
