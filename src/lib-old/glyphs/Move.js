import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

class Move extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faArrowsAlt} {...this.props} />
    );
  }
}

export default Move;
