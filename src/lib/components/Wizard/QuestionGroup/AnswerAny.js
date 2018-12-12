import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * onAnswered is called with the following:
 * {
 *   questionKey: answer from the question that was answered
 * }
 */

class AnswerAny extends Component {
  render() {
    // Deconstruct state
    const {
      onAnswered,
      children,
    } = this.props;

    // Wrap children so that if any child answers a question, our onAnswered is
    // called
    const wrappedChildren = children.map((child) => {
      const childOnAnswered = child.props.onAnswered;
      const wrappedChild = React.cloneElement(child, {
        onAnswered: (childAnswer) => {
          // Call child's onAnswered handler
          if (childOnAnswered) {
            childOnAnswered(childAnswer);
          }

          // Call AnswerAny's onAnswered handler
          if (onAnswered) {
            const answer = {};
            answer[child.props.questionKey] = childAnswer;
            onAnswered(answer);
          }
        },
        key: child.props.questionKey,
      });
      return wrappedChild;
    });

    return (
      <div>
        {wrappedChildren}
      </div>
    );
  }
}

AnswerAny.propTypes = {
  /* A function to call when the one of the questions is answered */
  onAnswered: PropTypes.func.isRequired,
  /* The children of this component (must be questions) */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AnswerAny;
