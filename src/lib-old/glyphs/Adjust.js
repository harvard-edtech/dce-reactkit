import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';

class Adjust extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faAdjust} {...this.props} />
    );
  }
}

export default Adjust;
