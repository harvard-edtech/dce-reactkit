import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import Alert from './Alert';

class Well extends Component {
  render() {
    // Deconstruct properties
    const { children } = this.props;

    return (
      <Alert color="secondary">
        {children}
      </Alert>
    );
  }
}

Well.propTypes = {
  /* Children (body) of the well */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Well;
