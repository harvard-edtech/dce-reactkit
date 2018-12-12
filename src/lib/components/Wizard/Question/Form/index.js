import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import custom styles
import './style.css';

// Import other components
import Question from '..';
import Button from '../../../Button';

const SUBMIT_ERROR_TIMEOUT = 2000; // ms to show submit button error

/**
 * onAnswered is called with the following:
 * {
 *   <form field name>: <form field value>,
 *   ...
 * }
 */

class Form extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      answerMap: {}, // field name => answer of field
      haltSubmitMap: {}, // field name => true/false (field is halting submit)
      submitButtonError: false,
    };

    // Bind functions
    this.onSubmitClicked = this.onSubmitClicked.bind(this);
  }

  onSubmitClicked() {
    // Deconstruct props
    const { onAnswered } = this.props;

    // Deconstruct state
    const {
      answerMap,
      haltSubmitMap,
    } = this.state;

    // Halt submission
    const haltSubmit = Object.values(haltSubmitMap).some((x) => { return x; });
    if (haltSubmit) {
      // Turn the submit button red for some time
      this.setState({
        submitButtonError: true,
      });
      setTimeout(() => {
        this.setState({
          submitButtonError: false,
        });
      }, SUBMIT_ERROR_TIMEOUT);
      return;
    }
    this.setState({
      submitButtonError: false,
    });

    // Call handler
    onAnswered(answerMap);
  }

  render() {
    // Deconstruct props
    const {
      title,
      subtitle,
      submitColor,
      submitTitle,
    } = this.props;

    // Turn children into an array if it isn't already
    let { children } = this.props;
    if (!Array.isArray(children)) {
      children = [children];
    }

    // Deconstruct state
    const {
      submitButtonError,
    } = this.state;

    // Wrap form fields
    const wrappedChildren = children.map((child) => {
      if (!child.props) {
        return child;
      }
      const childOnChange = child.props.onChange;
      return React.cloneElement(child, {
        onChange: (answer, haltSubmit) => {
          // Call child's onChange handler
          if (childOnChange) {
            childOnChange(answer, haltSubmit);
          }

          // Update form results
          const {
            answerMap,
            haltSubmitMap,
          } = this.state;
          answerMap[child.props.name] = answer;
          haltSubmitMap[child.props.name] = haltSubmit;
          this.setState({
            answerMap,
            haltSubmitMap,
          });
        },
        key: child.props.name,
      });
    });

    // Create submit button
    const submitButton = (
      <Button
        text={(
          submitButtonError
            ? 'Fix Issues Above First'
            : submitTitle
        )}
        disabled={submitButtonError}
        color={(
          submitButtonError
            ? 'danger'
            : submitColor
        )}
        onClick={this.onSubmitClicked}
        block
      />
    );

    // Render a chooser
    return (
      <Question
        title={title}
        subtitle={subtitle}
      >
        {wrappedChildren}
        {submitButton}
      </Question>
    );
  }
}

Form.propTypes = {
  /* The title of the form */
  title: PropTypes.string,
  /* The subtitle of the form */
  subtitle: PropTypes.string,
  /* The title of the submit button */
  submitTitle: PropTypes.string,
  /* The color of the submit button */
  submitColor: PropTypes.string,
  /* Handler to call when the form is submitted */
  onAnswered: PropTypes.func,
  /* The children of this component */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Form.defaultProps = {
  title: 'Please Complete this Form:',
  subtitle: null,
  submitTitle: 'Continue',
  submitColor: 'info',
  onAnswered: () => {},
};

export default Form;
