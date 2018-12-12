import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';

class Checkbox extends Component {
  render() {
    // Deconstruct props
    const {
      grow,
      checked,
      ...props
    } = this.props;

    return (
      <FontAwesomeIcon
        icon={(
          checked
            ? faCheckSquare
            : faSquare
        )}
        transform={grow ? `grow-${grow}` : undefined}
        {...props}
      />
    );
  }
}

export default Checkbox;
