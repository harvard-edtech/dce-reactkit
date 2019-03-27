import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import bootstrap components
import {
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input as BootstrapInput,
  FormFeedback,
} from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

// Import other componenets
import Field from '.';

class Input extends Component {
  constructor(props) {
    super(props);

    // Deconstruct props
    const {
      onChange,
      required,
    } = this.props;

    const answer = '';
    const haltSubmit = required;

    // Create initial state
    this.state = {
      haltSubmit, // Halt submission until required has passed
      answer,
    };

    // Bind functions
    this.onUpdate = this.onUpdate.bind(this);

    // Update parent
    onChange(answer, haltSubmit);
  }

  onUpdate(event) {
    // Deconstruct props
    const {
      onChange,
      required,
    } = this.props;

    // Extract value from event
    const answer = event.target.value;

    // Validation
    const haltSubmit = (
      required
      && (
        !answer
        || answer.trim().length === 0
      )
    );

    // Update state
    this.setState({
      haltSubmit,
      answer,
    });

    // Send answer to onChange listener
    onChange(answer, haltSubmit);
  }

  render() {
    // Deconstruct props
    const {
      name,
      leftLabel,
      rightLabel,
      placeholder,
    } = this.props;

    // Deconstruct state
    const {
      haltSubmit,
      answer,
    } = this.state;

    // Create input item
    const input = (
      <BootstrapInput
        invalid={haltSubmit}
        placeholder={placeholder}
        value={answer}
        onChange={this.onUpdate}
      />
    );

    // Render a chooser
    return (
      <Field name={name}>
        <InputGroup>
          {leftLabel && (
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                {leftLabel}
              </InputGroupText>
            </InputGroupAddon>
          )}
          {input}
          {rightLabel && (
            <InputGroupAddon addonType="append">
              <InputGroupText>
                {rightLabel}
              </InputGroupText>
            </InputGroupAddon>
          )}
          <FormFeedback>
            This field is required
          </FormFeedback>
        </InputGroup>
      </Field>
    );
  }
}

Input.propTypes = {
  /* The field name (to be used as a key in the form) */
  name: PropTypes.string.isRequired,
  /* A label string to display to the left of the input field */
  leftLabel: PropTypes.string,
  /* A label string to display to the right of the input field */
  rightLabel: PropTypes.string,
  /* Placeholder text for the input field */
  placeholder: PropTypes.string,
  /* Handler to call when the text is changed */
  onChange: PropTypes.func,
  /* If true, field is required for the form to be submitted */
  required: PropTypes.bool,
};

Input.defaultProps = {
  leftLabel: null,
  rightLabel: null,
  placeholder: '',
  onChange: () => {},
  required: false,
};

export default Input;
