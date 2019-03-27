import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';

class IdCard extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faIdCard} {...this.props} />
    );
  }
}

export default IdCard;
