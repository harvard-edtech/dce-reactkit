import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

class Check extends Component {
  render() {
    // Deconstruct props
    const {
      grow,
      ...props
    } = this.props;

    return (
      <FontAwesomeIcon
        icon={faCheck}
        transform={grow ? `grow-${grow}` : undefined}
        {...props}
      />
    );
  }
}

export default Check;
