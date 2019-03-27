import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Checkbox.propTypes = {
  // If true, the checkbox is checked
  checked: PropTypes.bool,
  // Factor by which to grow the checkbox
  grow: PropTypes.number,
};

Checkbox.defaultProps = {
  checked: false,
  grow: null,
};

export default Checkbox;
