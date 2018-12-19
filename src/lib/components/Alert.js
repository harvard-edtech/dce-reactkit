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
      centered,
      children,
      ...props
    } = this.props;

    // Deconstruct state
    const { visible } = this.state;

    return (
      <BootstrapAlert
        isOpen={visible}
        toggle={dismissible ? this.closeClicked : undefined}
        style={{
          textAlign: (centered ? 'center' : 'left'),
        }}
        {...props}
      >
        {children}
      </BootstrapAlert>
    );
  }
}

Alert.propTypes = {
  /* If true, the alert is dismissible */
  dismissible: PropTypes.bool,
  /* Handler to call when the alert is dismissed (only valid if dismissible) */
  onDismiss: PropTypes.func,
  /* If true, text is centered in the alert */
  centered: PropTypes.bool,
  /* Children (body) of the alert */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Alert.defaultProps = {
  dismissible: false,
  onDismiss: null,
  centered: false,
};

export default Alert;
