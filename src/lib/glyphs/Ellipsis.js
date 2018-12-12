import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

class Adjust extends Component {
  render() {
    // Deconstruct props
    const {
      vertical,
      ...props
    } = this.props;

    if (vertical) {
      return (
        <FontAwesomeIcon icon={faEllipsisV} {...props} />
      );
    }
    return (
      <FontAwesomeIcon icon={faEllipsisH} {...props} />
    );
  }
}

export default Adjust;
