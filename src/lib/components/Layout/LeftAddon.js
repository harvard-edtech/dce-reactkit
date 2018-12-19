import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

/*
Looks like:
...............................................................................
| .............. ............................................................ |
| | Left Addon | |   Right area fills the rest of the space (second child)  | |
| '''''''''''''' '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' |
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
*/

class LeftAddon extends Component {
  render() {
    const {
      children,
      centerVertically,
    } = this.props;
    const leftChild = (children.length > 0 ? children[0] : {});
    const rightChild = (children.length > 1 ? children[1] : {});

    // Create classnames
    const leftClassName = (
      'flex-column' + (centerVertically ? ' align-self-center' : '')
    );
    const rightClassName = (
      'flex-column flex-fill' + (centerVertically ? ' align-self-center' : '')
    );

    return (
      <div className="d-flex flex-row">
        <div className={leftClassName}>
          {leftChild}
        </div>
        <div
          className={rightClassName}
        >
          <div className="d-inline-block">
            {rightChild}
          </div>
        </div>
      </div>
    );
  }
}

LeftAddon.propTypes = {
  /* Must have two children: first child is the item that's added on the left,
   * the second child is the item that spans the rest of the row
   */
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  // If true, the items are vertically centered
  centerVertically: PropTypes.bool,
};

LeftAddon.defaultProps = {
  centerVertically: false,
};

export default LeftAddon;
