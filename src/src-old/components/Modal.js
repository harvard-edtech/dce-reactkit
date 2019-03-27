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
      children,
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
    const buttonComponents = buttons.map((buttonProperties) => {
      const {
        text,
        color,
        onClick,
      } = buttonProperties;

      return (
        <Button
          key={text}
          text={text}
          color={color}
          className="mr-1"
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
        {title && (
          <ModalHeader
            toggle={allowClose ? this.toggle : undefined}
          >
            {title || 'Notice:'}
          </ModalHeader>
        )}
        {(body || children) && (
          <ModalBody>
            {body || children}
          </ModalBody>
        )}
        {(buttonComponents.length > 0 || footerMessageText) && (
          <ModalFooter>
            <span className="mr-auto">{footerMessageText}</span>
            {buttonComponents}
          </ModalFooter>
        )}
      </BootstrapModal>
    );
  }
}

Modal.propTypes = {
  /* The title of the modal */
  title: PropTypes.string,
  /* The text body of the modal */
  body: PropTypes.string,
  /* The body of the modal (if no text body) */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /* A message to show on the left side of the footer */
  footerMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  /* Buttons to show in the modal */
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      color: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
  /* If true, the modal is allowed to be closed */
  allowClose: PropTypes.bool,
  /* Handler for when the modal is closed */
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  title: null,
  body: null,
  children: null,
  footerMessage: null,
  buttons: [],
  allowClose: false,
  onClose: null,
};

export default Modal;
