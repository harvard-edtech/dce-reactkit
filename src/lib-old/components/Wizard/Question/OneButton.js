import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import Question from '.';
import Button from '../../Button';

/**
 * onAnswered is called with the following:
 * {
 *   true
 * }
 */

class OneButton extends Component {
  constructor(props) {
    super(props);

    this.onAddClicked = this.onAddClicked.bind(this);
  }

  onAddClicked() {
    // Deconstruct props
    const { onAnswered } = this.props;

    if (onAnswered) {
      onAnswered(true);
    }
  }

  render() {
    // Deconstruct props
    const {
      title,
      subtitle,
      buttonTitle,
      buttonColor,
    } = this.props;

    // Render a chooser
    return (
      <Question
        title={title}
        subtitle={subtitle}
      >
        <Button
          text={buttonTitle}
          color={buttonColor}
          size="lg"
          block
          onClick={() => {
            this.onAddClicked();
          }}
        />
      </Question>
    );
  }
}

OneButton.propTypes = {
  /* The title of the question */
  title: PropTypes.string,
  /* The subtitle of the question */
  subtitle: PropTypes.string,
  /* The title of the button to click */
  buttonTitle: PropTypes.string,
  /* The color of the button to click */
  buttonColor: PropTypes.string,
  /* Function to call when button is clicked */
  onAnswered: PropTypes.func.isRequired,
};

OneButton.defaultProps = {
  title: 'Click to continue:',
  subtitle: null,
  buttonTitle: 'Click Here',
  buttonColor: 'info',
};

export default OneButton;
