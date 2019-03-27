import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkOutlined } from '@fortawesome/free-regular-svg-icons';

class Bookmark extends Component {
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

Bookmark.propTypes = {
  // If true, bolt is shown in an outline instead of filled
  outlined: PropTypes.bool,
};

Bookmark.defaultProps = {
  outlined: false,
};

export default Bookmark;
