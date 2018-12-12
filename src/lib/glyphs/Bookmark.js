import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkOutlined } from '@fortawesome/free-regular-svg-icons';

class Bolt extends Component {
  render() {
    // Extract props
    const {
      outlined,
      ...props
    } = this.props;

    if (outlined) {
      return (
        <FontAwesomeIcon icon={faBookmarkOutlined} {...props} />
      );
    }
    return (
      <FontAwesomeIcon icon={faBookmark} {...props} />
    );
  }
}

export default Bolt;
