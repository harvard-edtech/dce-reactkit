import React, { Component } from 'react';
import PropTypes from 'prop-types';
import genUUID from 'uuid/v1';

// Import bootstrap components
import {
  Dropdown as BootstrapDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      dropdownOpen: false,
    };

    // Bind functions
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { dropdownOpen } = this.state;

    this.setState({
      dropdownOpen: !dropdownOpen,
    });
  }

  render() {
    // Deconstruct props
    const {
      title,
      color,
      rightAligned,
      inline,
      items, // { text, divider, header, disabled, onClick }
      ...props
    } = this.props;

    // Deconstruct state
    const { dropdownOpen } = this.state;

    const itemElements = items.map((item) => {
      return (
        <DropdownItem
          header={item.header}
          divider={item.divider}
          disabled={item.disabled}
          onClick={item.onClick}
          key={genUUID()}
        >
          {item.text}
        </DropdownItem>
      );
    });

    return (
      <BootstrapDropdown
        isOpen={dropdownOpen}
        toggle={this.toggle}
        className={inline ? 'd-inline-block' : null}
      >
        <DropdownToggle
          color={color}
          caret
          {...props}
        >
          {title}
        </DropdownToggle>
        <DropdownMenu
          right={rightAligned}
        >
          {itemElements}
        </DropdownMenu>
      </BootstrapDropdown>
    );
  }
}

export default Dropdown;
