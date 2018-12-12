import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import bootstrap components
import { Alert as BootstrapAlert } from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
    this.closeClicked = this.closeClicked.bind(this);
  }

  closeClicked() {
    this.setState({
      visible: false,
    });

    // Call parent's onDismiss function
    const { onDismiss } = this.props;
    if (onDismiss) {
      onDismiss();
    }
  }

  render() {
    // Extract properties
    const {
      dismissible,
      onDismiss,
      children,
      centered,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      ...props
    } = this.props;

    // Deconstruct state
    const { visible } = this.state;

    return (

      <BootstrapAlert
        isOpen={visible}
        toggle={dismissible ? this.closeClicked : undefined}
        style={{
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
          textAlign: (centered ? 'center' : 'left'),
        }}
        {...props}
      >
        {children}
      </BootstrapAlert>
    );
  }
}

export default Alert;
