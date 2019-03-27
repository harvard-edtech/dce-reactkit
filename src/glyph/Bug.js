import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';

class Bug extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faBug} {...this.props} />
    );
  }
}

export default Bug;
