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
      children,
      ...props
    } = this.props;

    // Set up button style
    return (
      <BootstrapButton {...props}>
        {text || children || 'Choose'}
      </BootstrapButton>
    );
  }
}

Button.propTypes = {
  /* Label text of the button */
  text: PropTypes.string,
  /* Body of the button (only valid if text is not included) */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /* Also, all Bootstrap button props may be included:
   * https://reactstrap.github.io/components/buttons/
   */
};

Button.defaultProps = {
  text: null,
  children: null,
};

export default Button;
