import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

class Minus extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faMinus} {...this.props} />
    );
  }
}

export default Minus;
