import React, { Component } from 'react';

// Import glyphs
import Circle from '../../../glyphs/Circle';

// Import custom styles
import './style.css';

class LoadSplash extends Component {
  render() {
    // Deconstruct props
    const { message } = this.props;

    return (
      <div className="container">
        {message && (
          <h3>
            {message}
          </h3>
        )}
        <div>
          <Circle className="circle-1" />
          <Circle className="circle-2" />
          <Circle className="circle-3" />
          <Circle className="circle-4" />
        </div>
      </div>
    );
  }
}

export default LoadSplash;
