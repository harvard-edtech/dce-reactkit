import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import bootstrap components
import { Button } from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

// Import custom styles
import './style.css';

// Import glyphs
import Check from '../../glyphs/Check';

/* Same properties as button component, plus:
 * - onChange: (index, optionText) function
 */

class Checkbox extends Component {
  constructor(props) {
    super(props);

    // Deconstruct props
    const { startChecked } = this.props;
    const checked = !!startChecked;

    // Initialize state
    this.state = {
      checked,
    };

    // Bind functions
    this.onClick = this.onClick.bind(this);

    // Update parent
    const { onChange } = this.props;
    if (onChange) {
      onChange(checked);
    }
  }

  onClick() {
    // Toggle checkbox
    let { checked } = this.state;
    checked = !checked;
    this.setState({
      checked,
    });

    // Call onChange handler
    const { onChange } = this.props;
    if (onChange) {
      onChange(checked);
    }
  }

  render() {
    // Extract properties
    const { light } = this.props;

    // Deconstruct state
    const { checked } = this.state;

    // Create the checkbox
    return (
      <Button
        title={checked ? 'Click to uncheck' : 'Click to check'}
        onClick={this.onClick}
        color={(
          light
            ? 'light'
            : 'dark'
        )}
        style={{
          border: (light ? '2px solid black' : null),
        }}
      >
        {checked
          ? (<Check grow="10" />)
          : (<Check grow="3" opacity="0.2" />)
        }
      </Button>
    );
  }
}

Checkbox.propTypes = {
  // If true, the checkbox starts checked (when initialized)
  startChecked: PropTypes.bool,
  /**
   * If included, this function is called when the checkbox is toggled with a
   *   boolean (is checked) as an argument
   * @param {boolean} isChecked true if the checkbox was just checked
   */
  onChange: PropTypes.func,
  // If true, the light theme is applied to the checkbox
  light: PropTypes.bool,
};

Checkbox.defaultProps = {
  startChecked: false,
  onChange: null,
  light: false,
};

export default Checkbox;
