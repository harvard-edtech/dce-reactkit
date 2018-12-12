import React, { Component } from 'react';
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

export default Square;
