import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class Times extends Component {
  render() {
    // Deconstruct props
    const {
      grow,
      ...props
    } = this.props;

    return (
      <FontAwesomeIcon
        icon={faTimes}
        transform={grow ? `grow-${grow}` : undefined}
        {...props}
      />
    );
  }
}

export default Times;
