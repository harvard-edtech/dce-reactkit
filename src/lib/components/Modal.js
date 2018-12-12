import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import bootstrap components
import {
  Modal as BootstrapModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from './Button';

class Modal extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    // Only show the modal if there's some content to display
    this.state = {
      isOpen: !!(
        props.body
        || props.title
        || props.buttons
        || props.footerMessage
      ),
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    // Deconstruct state
    const { isOpen } = this.state;

    // Toggle state
    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    // Deconstruct properties
    const {
      title,
      body,
      footerMessage,
      buttons,
      allowClose,
      onClose,
    } = this.props;

    // Get footer text
    let footerMessageText;
    if (footerMessage && typeof footerMessage === 'string') {
      footerMessageText = footerMessage;
    }

    // Deconstruct state
    const { isOpen } = this.state;

    // Choose backdrop
    const backdrop = (allowClose ? true : 'static');

    // Create buttons
    const buttonComponents = (buttons || []).map((buttonProperties) => {
      const {
        onClick,
        ...props
      } = buttonProperties;

      // Add margin between buttons (if not included)
      if (props.marginRight === undefined) {
        props.marginRight = '5px';
      }

      return (
        <Button
          key={`${props.text}`}
          {...props}
          onClick={() => {
            this.toggle();
            if (onClick) {
              onClick();
            }
          }}
        />
      );
    });

    return (
      <BootstrapModal
        isOpen={isOpen}
        toggle={this.toggle}
        onClosed={onClose}
        backdrop={backdrop}
      >
        { title && (
          <ModalHeader
            toggle={allowClose ? this.toggle : undefined}
          >
            {title || 'Notice:'}
          </ModalHeader>
        )}
        { body && (
          <ModalBody>
            {body || 'This is all.'}
          </ModalBody>
        )}
        { (buttonComponents.length > 0 || footerMessageText) && (
          <ModalFooter>
            <span className="mr-auto">{footerMessageText}</span>
            {buttonComponents}
          </ModalFooter>
        )}
      </BootstrapModal>
    );
  }
}

export default Modal;
