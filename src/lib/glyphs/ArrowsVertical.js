import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons';

class ArrowsVertical extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faArrowsAltV} {...this.props} />
    );
  }
}

export default ArrowsVertical;
