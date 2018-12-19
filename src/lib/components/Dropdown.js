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
      items,
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

Dropdown.propTypes = {
  /* Title/label of the dropdown */
  title: PropTypes.string.isRequired,
  /* The bootstrap color of the dropdown button */
  color: PropTypes.string,
  /* If true, the dropdown menu is right-aligned (left-aligned otherwise) */
  rightAligned: PropTypes.bool,
  /* If true, the dropdown menu is inserted in-line (instead of block) */
  inline: PropTypes.bool,
  /* The dropdown items */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      /* The title of the item */
      text: PropTypes.string,
      /* If true, this item is a divider (text is ignored) */
      divider: PropTypes.bool,
      /* If true, this item is a header item (not clickable) */
      header: PropTypes.bool,
      /* If true, this item is disabled (not clickable) */
      disabled: PropTypes.bool,
      /* Handler to call when item is clicked */
      onClick: PropTypes.func,
    })
  ),
};

Dropdown.defaultProps = {
  color: 'secondary',
  rightAligned: false,
  inline: false,
  items: [],
};

export default Dropdown;
