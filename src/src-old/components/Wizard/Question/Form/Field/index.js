import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Field extends Component {
  render() {
    // Deconstruct props
    const {
      name,
      children,
    } = this.props;

    // Render a chooser
    return (
      <div
        key={name}
        className="mb-2"
      >
        {children}
      </div>
    );
  }
}

Field.propTypes = {
  /* The field name (to be used as a key in the form) */
  name: PropTypes.string.isRequired,
  /* The children of this component */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Field;
