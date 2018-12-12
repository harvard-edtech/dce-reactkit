import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';

class Barcode extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faBarcode} {...this.props} />
    );
  }
}

export default Barcode;
