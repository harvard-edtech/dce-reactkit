import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

class Menu extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faBars} {...this.props} />
    );
  }
}

export default Menu;
