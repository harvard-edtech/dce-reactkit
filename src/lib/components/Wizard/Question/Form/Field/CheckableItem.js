import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import bootstrap componenets
import { FormFeedback } from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

// Import other components
import Field from '.';
import Checkbox from '../../../../Checkbox';
import Well from '../../../../Well';
import LeftAddon from '../../../../Layout/LeftAddon';

class CheckableItem extends Component {
  constructor(props) {
    super(props);

    // Deconstruct props
    const {
      onChange,
      startChecked,
      required,
    } = this.props;

    const checked = startChecked;
    const haltSubmit = (required && !startChecked);

    // Create initial state
    this.state = {
      haltSubmit, // Halt submission until checked (if required)
    };

    // Bind functions
    this.onCheckboxChange = this.onCheckboxChange.bind(this);

    // Update parent
    onChange(checked, haltSubmit);
  }

  onCheckboxChange(checked) {
    // Send answer to onChange listener
    const {
      onChange,
      required,
    } = this.props;

    // Validation
    const haltSubmit = (required && !checked);

    // Update state
    this.setState({
      haltSubmit,
    });

    // Update handler
    onChange(checked, haltSubmit);
  }

  render() {
    // Deconstruct props
    const {
      title,
      name,
      subtitle,
      startChecked,
      children,
    } = this.props;

    // Deconstruct state
    const { haltSubmit } = this.state;

    // Create content
    let content = children;
    if (!content) {
      if (title || subtitle) {
        content = (
          <div>
            <h5 className="mb-0">
              {title}
            </h5>
            {subtitle && (
              <p className="mb-0 mt-2">{subtitle}</p>
            )}
          </div>
        );
      } else {
        content = (
          <h5 className="mb-0">
            Unnamed Item
          </h5>
        );
      }
    }

    // Render the field
    return (
      <Field name={name}>
        <Well
          className={`p-2 border mb-0${haltSubmit ? ' border-danger' : ' border-secondary'}`}
        >
          <LeftAddon
            centerVertically
          >
            <Checkbox
              onChange={this.onCheckboxChange}
              startChecked={startChecked}
            />
            <div
              className="ml-2"
            >
              {content}
            </div>
          </LeftAddon>
        </Well>
        <FormFeedback
          className={haltSubmit ? 'd-block' : null}
        >
          This needs to be checked
        </FormFeedback>
      </Field>
    );
  }
}

CheckableItem.propTypes = {
  /* Title of the number item (replaced by children if children are included) */
  title: PropTypes.string,
  /* The field name (to be used as a key in the form) */
  name: PropTypes.string.isRequired,
  /* Subtitle of the item (replaced by children if children are included) */
  subtitle: PropTypes.string,
  /* Handler to call when checkbox is toggled */
  onChange: PropTypes.func,
  /* If true, checkbox starts checked */
  startChecked: PropTypes.bool,
  /* If true, checkbox must be checked to submit the form */
  required: PropTypes.bool,
  /* The children of this component (displayed as content) */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

CheckableItem.defaultProps = {
  title: null,
  subtitle: null,
  onChange: () => {},
  startChecked: false,
  required: false,
  children: null,
};

export default CheckableItem;
