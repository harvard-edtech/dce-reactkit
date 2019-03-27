import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class Plus extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faPlus} {...this.props} />
    );
  }
}

export default Plus;
