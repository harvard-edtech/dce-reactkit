import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';

class ArrowsHorizontal extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faArrowsAltH} {...this.props} />
    );
  }
}

export default ArrowsHorizontal;
