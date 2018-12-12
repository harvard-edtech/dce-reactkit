import React, { Component } from 'react';
import PropTypes from 'prop-types';
import genUUID from 'uuid/v1';

// Import bootstrap componenets
import {
  Input as BootstrapInput,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
// Import bootstrap stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

// Import other components
import Field from '.';
import Well from '../../../../Well';
import Button from '../../../../Button';
import RightAddonLayout from '../../../../Layout/RightAddon';

// Import glyphs
import Minus from '../../../../../glyphs/Minus';
import Plus from '../../../../../glyphs/Plus';

// Import helpers
import isFloat from '../../../../../common/isFloat';
import isInteger from '../../../../../common/isInteger';
import math from '../../../../../common/math';

class NumberItem extends Component {
  constructor(props) {
    super(props);

    this.key = genUUID();

    // Deconstruct props
    const {
      min,
      max,
      integer,
      step,
      onChange,
      defaultNumber,
    } = this.props;

    // Determine step
    this.step = step;
    if (step === null) {
      this.step = (
        integer
          ? 1
          : 0.1
      );
    }

    // Determine defaultNumber
    this.defaultNumber = defaultNumber;
    if (defaultNumber === null) {
      this.defaultNumber = (
        min !== null
          ? min
          : 0
      );
    }

    // Create initial state
    let value = defaultNumber;

    // Apply min and max right away
    if (min !== null && value < min) {
      value = min;
    }
    if (max !== null && value > max) {
      value = max;
    }

    const haltSubmit = false;
    this.state = {
      number: value,
      string: String(value),
      haltSubmit,
    };

    // Bind functions
    this.onInputBlurred = this.onInputBlurred.bind(this);

    // Update parent
    onChange(value, haltSubmit);
  }

  onInputBlurred() {
    // Deconstruct props
    const {
      min,
      max,
      integer,
      numDecimals,
      onChange,
    } = this.props;

    // Deconstruct state
    let { string } = this.state;

    let number = null;
    let err = null;

    // Check for empty field
    if (!string || string.trim().length === 0) {
      // Use the default number
      number = this.defaultNumber;
    // Validate number
    } else if (integer) {
      if (!isFloat(string)) {
        err = 'This needs to be a valid number';
      } else if (!isInteger(string)) {
        err = 'This item only accepts whole numbers (integers)';
      } else {
        // Valid int! Parse it
        number = parseInt(string);
      }
    } else if (!isFloat(string)) {
      err = 'This needs to be a valid number';
    } else {
      // Valid float! Save it
      number = parseFloat(string);
    }

    // Check min/max
    if (number !== null) {
      if (min !== null && number < min) {
        err = `This number is smaller than the minimum (must be ${min} or larger)`;
      }
      if (max !== null && number > max) {
        err = `This number is larger than the maximum (must be no greater than ${max})`;
      }
    }

    // Number should be null if there's an error
    if (err) {
      number = null;
    }

    // Create string from number with appropriate number of decimals
    if (number !== null) {
      if (numDecimals !== null) {
        string = String(number.toFixed(numDecimals));
        number = parseFloat(string);
      } else {
        string = String(number);
      }
    }

    // Update state
    const haltSubmit = !!err;
    this.setState({
      number,
      err,
      haltSubmit,
      string,
    });

    // Update handler
    onChange(number, haltSubmit);
  }

  onButtonClicked(isAdder) {
    // Deconstruct props
    const { onChange } = this.props;

    // Get current number
    const { number } = this.state;
    const newNumber = (
      isAdder
        ? math.add(number, this.step)
        : math.sub(number, this.step)
    );

    // Update state
    const haltSubmit = false;
    this.setState({
      haltSubmit,
      err: null,
      number: newNumber,
      string: newNumber,
    });

    onChange(newNumber, haltSubmit);
  }

  render() {
    // Deconstruct props
    const {
      title,
      name,
      subtitle,
      min,
      max,
      integer,
      numDecimals,
      children,
    } = this.props;

    // Deconstruct state
    const {
      number,
      string,
      haltSubmit,
      err,
    } = this.state;

    // Determine the step size
    let { step } = this.props;
    if (step === null) {
      step = (
        integer
          ? 1
          : 0.1
      );
    }

    // Disable adder and subtracter
    let adderDisabled;
    let subberDisabled;
    if (number === null) {
      adderDisabled = true;
      subberDisabled = true;
    } else {
      adderDisabled = (
        max !== null
          ? number + step > max
          : false
      );
      subberDisabled = (
        min !== null
          ? number - step < min
          : false
      );
    }

    // Create content
    let content = children;
    if (!content) {
      if (title || subtitle) {
        content = (
          <div>
            <h5
              className="mb-0"
            >
              {title}
            </h5>
            {subtitle && (
              <p className="mb-0 mt-2">{subtitle}</p>
            )}
          </div>
        );
      } else {
        content = (
          <h5>
            Unnamed Item
          </h5>
        );
      }
    }

    // Render the field
    return (
      <Field
        name={name}
      >
        <Well
          className={`p-2 border mb-0${haltSubmit ? ' border-danger' : ' border-secondary'}`}
        >
          <RightAddonLayout centerVertically>
            {content}
            <div className="text-nowrap">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button
                    color="info"
                    disabled={subberDisabled}
                    onClick={() => {
                      this.onButtonClicked(false);
                    }}
                  >
                    <Minus />
                  </Button>
                </InputGroupAddon>
                <BootstrapInput
                  value={string}
                  className="border-info"
                  placeholder={this.defaultNumber}
                  bsSize="lg"
                  style={{
                    width: '5em',
                  }}
                  min={min}
                  max={max}
                  decimals={numDecimals}
                  step={step}
                  onChange={(event) => {
                    // Update string in state
                    this.setState({
                      string: event.target.value,
                    });
                  }}
                  onBlur={this.onInputBlurred}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    color="info"
                    disabled={adderDisabled}
                    onClick={() => {
                      this.onButtonClicked(true);
                    }}
                  >
                    <Plus />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </RightAddonLayout>
        </Well>
        <FormFeedback
          className={haltSubmit ? 'd-block' : null}
        >
          {err}
        </FormFeedback>
      </Field>
    );
  }
}

NumberItem.propTypes = {
  /* Title of the number item (replaced by children if children are included) */
  title: PropTypes.string,
  /* The field name (to be used as a key in the form) */
  name: PropTypes.string.isRequired,
  /* Subtitle of the item (replaced by children if children are included) */
  subtitle: PropTypes.string,
  /* Minimum allowed number */
  min: PropTypes.number,
  /* Maximum allowed number */
  max: PropTypes.number,
  /* Increment step (for when + or - are clicked) */
  step: PropTypes.number,
  /* Handler to call when number is changed */
  onChange: PropTypes.func,
  /* Default value of the number field (reverts to this if field is emptied) */
  defaultNumber: PropTypes.number,
  /* If true, only integers are allowed */
  integer: PropTypes.bool,
  /* The number of decimals to display and round to */
  numDecimals: PropTypes.number,
  /* The children of this component (displayed as content) */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

NumberItem.defaultProps = {
  title: null,
  subtitle: null,
  min: null,
  max: null,
  step: null,
  onChange: () => {},
  defaultNumber: null,
  integer: false,
  numDecimals: null,
  children: null,
};

export default NumberItem;
