import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

class Circle extends Component {
  render() {
    return (
      <FontAwesomeIcon
        icon={faCircle}
        {...this.props}
      />
    );
  }
}

export default Circle;
