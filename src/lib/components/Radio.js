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
    const { initialSelectedIndex } = this.props;
    this.state = {
      selected: initialSelectedIndex,
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
      items,
    } = this.props;

    if (onChange) {
      onChange(items[selected], selected);
    }
  }

  render() {
    // Deconstruct properties
    const {
      items,
      color,
    } = this.props;

    // Deconstruct state
    const { selected } = this.state;

    const buttons = items.map((text, index) => {
      return (
        <Button
          key={text}
          onClick={() => {
            return this.onRadioBtnClick(index);
          }}
          active={selected === index}
          color={color}
        >
          {text}
        </Button>
      );
    });

    return (
      <ButtonGroup>
        {buttons}
      </ButtonGroup>
    );
  }
}

Radio.propTypes = {
  /* Array of item labels to choose from */
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  /* Handler to call when radio is changed. Called with option, index. */
  onChange: PropTypes.func,
  /* The initial item index to select */
  initialSelectedIndex: PropTypes.number,
  /* Bootstrap color of the buttons */
  color: PropTypes.string,
};

Radio.defaultProps = {
  onChange: null,
  initialSelectedIndex: 0,
  color: 'secondary',
};

export default Radio;
