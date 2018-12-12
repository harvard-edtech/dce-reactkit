import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import other components
import Card from '../../Card';

class Question extends Component {
  render() {
    // Deconstruct props
    const {
      title,
      subtitle,
      children,
    } = this.props;

    // Render a chooser
    return (
      <Card
        title={title}
        subtitle={subtitle}
        className="mb-2"
      >
        {children}
      </Card>
    );
  }
}

Question.propTypes = {
  /* The question title */
  title: PropTypes.string,
  /* The subtitle of the question */
  subtitle: PropTypes.string,
  /* The children of this question (displayed in the body) */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Question.defaultProps = {
  title: 'Please complete the following to continue',
  subtitle: null,
};

export default Question;
