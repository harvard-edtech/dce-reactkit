import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';

class Ban extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faBan} {...this.props} />
    );
  }
}

export default Ban;
