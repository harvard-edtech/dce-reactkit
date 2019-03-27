import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Check.propTypes = {
  // Factor by which to grow the check mark
  grow: PropTypes.number,
};

Check.defaultProps = {
  grow: null,
};

export default Check;
