import React, { Component } from 'react';

// Import other components
import Alert from '../Alert';
import Modal from '../Modal';

// Import glyphs
import WarningTriangle from '../../glyphs/WarningTriangle';

class ErrorSplash extends Component {
  render() {
    const {
      title,
      body,
      err,
      buttons,
      allowClose,
    } = this.props;

    // Construct message
    let message;
    if (body) {
      message = body;
    } else if (err && err.message) {
      ({ message } = err);
    } else if (err && typeof err === 'string') {
      message = err;
    } else {
      message = 'An unknown error occurred. If this issue keeps happening, please contact an admin.';
    }

    // Construct error code message
    const codeMessage = ((err && err.code) && (
      <div>
        Error code:&nbsp;
        <strong>{err.code}</strong>
      </div>
    ));

    return (
      <div>
        <Modal
          title={title || 'Oops!'}
          body={message}
          footerMessage={codeMessage}
          buttons={buttons}
          allowClose={allowClose}
        />
        <Alert color="warning" centered>
          <div>
            <WarningTriangle />
            <strong>Oops!</strong>
          </div>
          {message}
          {codeMessage}
        </Alert>
      </div>
    );
  }
}

export default ErrorSplash;
