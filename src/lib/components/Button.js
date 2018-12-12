import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import bootstrap components
import { Button as BootstrapButton } from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

/* Allowed colors:
 * - primary
 * - secondary
 * - success
 * - info
 * - warning
 * - danger
 * - link
 *
 * To disable, include "disabled" tag
 * To use outline-style of button, include "outline" tag
 * To use block-style of button, include "block" tag
 *
 * Sizes:
 * - lg
 * - sm
 * - normal (used by default)
 */

class Button extends Component {
  render() {
    // Extract properties
    const {
      text,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      children,
      ...props
    } = this.props;

    // Set up button style

    return (
      <BootstrapButton
        {...props}
        style={{
          marginRight,
          marginLeft,
          marginTop,
          marginBottom,
        }}
      >
        {text || children || 'Choose'}
      </BootstrapButton>
    );
  }
}

export default Button;
