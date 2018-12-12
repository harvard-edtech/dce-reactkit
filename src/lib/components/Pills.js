import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import bootstrap components
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

class Pills extends Component {
  constructor(props) {
    super(props);

    // Deconstruct props
    const { activeItem } = this.props;

    // Initialize state
    this.state = {
      activeItem,
    };

    // Bind functions
    this.itemClicked = this.itemClicked.bind(this);
  }

  itemClicked(index) {
    // Deconstruct props
    const { updateActiveOnClick } = this.props;

    // Update active pill
    if (updateActiveOnClick) {
      this.setState({
        activeItem: index,
      });
    }

    // Call handler
    const { items } = this.props;
    const { onClick } = items[index];
    if (onClick) {
      onClick(items[index], index);
    }
  }

  render() {
    // Extract properties
    const {
      items,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      ...props
    } = this.props;

    // Deconstruct state
    const { activeItem } = this.state;

    const itemElements = items.map((item, index) => {
      return (
        <NavItem
          color="secondary"
        >
          <NavLink
            href="#"
            onClick={() => { this.itemClicked(index); }}
            active={(
              activeItem !== undefined
                ? activeItem === index
                : item.active
            )}
            disabled={item.disabled}
          >
            {item.text}
          </NavLink>
        </NavItem>
      );
    });

    return (
      <Nav
        pills
        style={{
          marginRight,
          marginLeft,
          marginTop,
          marginBottom,
        }}
      >
        {itemElements}
      </Nav>
    );
  }
}

export default Pills;
