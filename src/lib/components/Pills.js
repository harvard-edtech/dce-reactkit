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
    const { initialActiveIndex } = this.props;

    // Initialize state
    this.state = {
      activeItem: initialActiveIndex,
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
    const { items } = this.props;

    // Deconstruct state
    const { activeItem } = this.state;

    const itemElements = items.map((item, index) => {
      // Deconstruct item
      const {
        text,
        active,
        disabled,
      } = item;

      return (
        <NavItem
          color="secondary"
        >
          <NavLink
            href="#"
            onClick={() => { this.itemClicked(index); }}
            active={(
              activeItem !== null
                ? activeItem === index
                : active
            )}
            disabled={disabled}
          >
            {text}
          </NavLink>
        </NavItem>
      );
    });

    return (
      <Nav pills>
        {itemElements}
      </Nav>
    );
  }
}

Pills.propTypes = {
  /* The items to show as pills */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      /* The label text of the item */
      text: PropTypes.string.isRequired,
      /* If true, item is marked active (ignored if activeItem is defined) */
      active: PropTypes.bool,
      /* If true, item is disabled */
      disabled: PropTypes.bool,
      /* Handler to call when clicked (called with item, index as args) */
      onClick: PropTypes.func,
    })
  ),
  /* If true, when an item is clicked, it is made active */
  updateActiveOnClick: PropTypes.bool,
  /* The index of the initial active item */
  initialActiveIndex: PropTypes.number,
};

Pills.defaultProps = {
  items: null,
  updateActiveOnClick: false,
  initialActiveIndex: null,
};

export default Pills;
