import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

Bell.propTypes = {
  // If true, a slash is shown cutting through the bell
  slashed: PropTypes.bool,
};

Bell.defaultProps = {
  slashed: false,
};

export default Bell;
