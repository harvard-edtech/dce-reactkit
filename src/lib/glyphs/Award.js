import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';

class Award extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faAward} {...this.props} />
    );
  }
}

export default Award;
