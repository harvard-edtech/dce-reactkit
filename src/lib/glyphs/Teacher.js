import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';

class Teacher extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faChalkboardTeacher} {...this.props} />
    );
  }
}

export default Teacher;
