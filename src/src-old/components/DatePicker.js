import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import date picker
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class DatePicker extends Component {
  constructor(props) {
    super(props);

    // Initialize date
    const { defaultDate } = this.props;
    this.defaultDate = (defaultDate || new Date());
    this.state = {
      date: this.defaultDate,
    };

    // Bind functions
    this.onDateChanged = this.onDateChanged.bind(this);
  }

  onDateChanged(date) {
    // Update state
    this.setState({
      date,
    });

    // Update parent via handler
    const { onChange } = this.props;
    onChange(date);
  }

  render() {
    // Deconstruct state
    const { date } = this.state;

    return (
      <ReactDatePicker
        selected={date}
        onChange={this.onDateChanged}
        className="form-control"
      />
    );
  }
}

DatePicker.propTypes = {
  /* The default date to display in the chooser */
  defaultDate: PropTypes.instanceOf(Date),
  /* Handler to call when date is changed */
  onChange: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  defaultDate: null,
};

export default DatePicker;
