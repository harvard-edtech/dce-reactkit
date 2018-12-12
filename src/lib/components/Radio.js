import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import bootstrap components
import { Button, ButtonGroup } from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

/* Same properties as button component, plus:
 * - onChange: (index, optionText) function
 */

class Radio extends Component {
  constructor(props) {
    super(props);

    // state.selected:
    // - null (none selected)
    // - number (index of selected radio)
    this.state = {
      selected: null,
    };

    // Bind functions
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(selected) {
    // Set this radio button as selected
    this.setState({ selected });

    // Deconstruct properties
    const {
      onChange,
      options,
    } = this.props;

    if (onChange) {
      onChange(selected, options[selected]);
    }
  }

  render() {
    // Deconstruct properties
    const {
      options,
      marginRight,
      marginLeft,
      marginTop,
      marginBottom,
      ...props
    } = this.props;

    // Deconstruct state
    const { selected } = this.state;

    const buttons = options.map((text, index) => {
      return (
        <Button
          key={`${text}`}
          {...props}
          onClick={() => {
            return this.onRadioBtnClick(index);
          }}
          active={selected === index}
        >
          {text}
        </Button>
      );
    });

    return (
      <ButtonGroup
        style={{
          marginRight,
          marginLeft,
          marginTop,
          marginBottom,
        }}
      >
        {buttons}
      </ButtonGroup>
    );
  }
}

export default Radio;
