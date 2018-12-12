import React, { Component } from 'react';

// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

class RightAddon extends Component {
  render() {
    const {
      children,
      centerVertically,
    } = this.props;
    const leftChild = (children.length > 0 ? children[0] : {});
    const rightChild = (children.length > 1 ? children[1] : {});

    // Create classnames
    const leftClassName = (
      'flex-column flex-fill' + (centerVertically ? ' align-self-center' : '')
    );
    const rightClassName = (
      'flex-column' + (centerVertically ? ' align-self-center' : '')
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

export default RightAddon;
