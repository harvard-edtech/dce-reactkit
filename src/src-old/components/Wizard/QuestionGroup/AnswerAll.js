import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import glyphs
import Check from '../../../glyphs/Check';

// Import other components
import Question from '../Question';
import Button from '../../Button';

/**
 * onAnswered is called with the following:
 * {
 *   questionKey: answer from question,
 *   ...
 * }
 */

class AnswerAll extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      answerMap: {},
      answeredMap: {}, // questionKey => true if answered
    };
  }

  render() {
    // Deconstruct state
    const { answeredMap } = this.state;

    // Deconstruct props
    const {
      onAnswered,
    } = this.props;

    // Turn children into an array if it isn't already
    let { children } = this.props;
    if (!Array.isArray(children)) {
      children = [children];
    }

    // Wrap children so that if any child answers a question, our onAnswered is
    // called
    const wrappedChildren = children.map((child) => {
      const childOnAnswered = child.props.onAnswered;
      if (answeredMap[child.props.questionKey]) {
        // This is an answered question. Make it smaller
        return (
          <Question
            title={child.props.title}
            subtitle={child.props.subtitle}
          >
            <div className="text-center text-success">
              <h2>
                <Check className="mr-2" />
                Done
              </h2>
              <Button
                text="Change Response"
                onClick={() => {
                  answeredMap[child.props.questionKey] = false;
                  this.setState({
                    answeredMap,
                  });
                }}
              />
            </div>
          </Question>
        );
      }
      const wrappedChild = React.cloneElement(child, {
        onAnswered: (childAnswer) => {
          // Call child's onAnswered handler
          if (childOnAnswered) {
            childOnAnswered(childAnswer);
          }

          // Update state
          const {
            answerMap,
          } = this.state;
          answerMap[child.props.questionKey] = childAnswer;
          answeredMap[child.props.questionKey] = true;
          this.setState({
            answerMap,
            answeredMap,
          });

          // Call AnswerAll's onAnswered handler if all answers are in
          const numAnswered = (
            Object.values(answeredMap)
              .map((x) => { return (x ? 1 : 0); })
              .reduce((total, x) => { return total + x; })
          );
          const allAnswered = (numAnswered === children.length);
          if (allAnswered) {
            onAnswered(answerMap);
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

AnswerAll.propTypes = {
  /* A function to call when the one of the questions is answered */
  onAnswered: PropTypes.func.isRequired,
  /* The children of this component (must be questions) */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AnswerAll;
