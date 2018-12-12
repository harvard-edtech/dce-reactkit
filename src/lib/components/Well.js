import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import Alert from './Alert';

class Well extends Component {
  render() {
    // Deconstruct properties
    const {
      children,
      ...props
    } = this.props;

    return (
      <Alert
        color="secondary"
        {...props}
      >
        {children}
      </Alert>
    );
  }
}

export default Well;
