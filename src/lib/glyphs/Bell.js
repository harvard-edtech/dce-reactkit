import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';

class Bell extends Component {
  render() {
    // Extract props
    const {
      slashed,
      ...props
    } = this.props;

    if (slashed) {
      return (
        <FontAwesomeIcon icon={faBellSlash} {...props} />
      );
    }
    return (
      <FontAwesomeIcon icon={faBell} {...props} />
    );
  }
}

export default Bell;
