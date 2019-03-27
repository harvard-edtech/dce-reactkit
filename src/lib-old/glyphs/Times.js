import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Times.propTypes = {
  // Factor by which to grow the check mark
  grow: PropTypes.number,
};

Times.defaultProps = {
  grow: null,
};

export default Times;
