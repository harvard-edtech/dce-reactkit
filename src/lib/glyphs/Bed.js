import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';

class Bed extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faBed} {...this.props} />
    );
  }
}

export default Bed;
