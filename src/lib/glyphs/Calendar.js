import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

class Calendar extends Component {
  render() {
    return (
      <FontAwesomeIcon icon={faCalendar} {...this.props} />
    );
  }
}

export default Calendar;
