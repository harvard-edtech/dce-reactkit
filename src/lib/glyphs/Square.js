import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare as faSquareFilled } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

class Square extends Component {
  render() {
    // Deconstruct props
    const {
      grow,
      filled,
      ...props
    } = this.props;

    if (filled) {
      return (
        <FontAwesomeIcon
          icon={faSquareFilled}
          transform={grow ? `grow-${grow}` : undefined}
          {...props}
        />
      );
    }
    return (
      <FontAwesomeIcon
        icon={faSquare}
        transform={grow ? `grow-${grow}` : undefined}
        {...props}
      />
    );
  }
}

Square.propTypes = {
  // If true, the square is filled
  filled: PropTypes.bool,
  // Factor by which to grow the check mark
  grow: PropTypes.number,
};

Square.defaultProps = {
  filled: false,
  grow: null,
};

export default Square;
