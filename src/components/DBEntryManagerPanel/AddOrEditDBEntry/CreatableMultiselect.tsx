// Import React
import React, { KeyboardEventHandler, useReducer } from 'react';

// Import React Select
import CreatableSelect from 'react-select/creatable';
import { MultiValue } from 'react-select';

// Import other types
import DBEntryFieldType from '../types/DBEntryFieldType';


/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // Type of the field
  type: DBEntryFieldType.StringArray | DBEntryFieldType.NumberArray;
  // The values entered by the user
  values: string[] | number[];
  // Function to call when the values change
  onChange: (values: string[] | number[]) => void;
  // True if the field is disabled
  disabled?: boolean;
};

// An option for the multiselect component
type Option = {
  // What the user sees and types in for the option
  label: string;
  // Lowercase, no spaces, no special characters of the label
  value: string;
};

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
  // what the user has typed in so far(before pressing enter or tab)
  inputValue: string,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Update the input value
  SetInputValue = 'SetInputValue',
}

// Action definitions
type Action = (
  | {
    // Action type
    type: ActionType.SetInputValue;
    // New value
    value: string
  }
);

/**
 * Reducer that executes actions
 * @author Yuen Ler Chow
 * @param state current state
 * @param action action to execute
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SetInputValue: {
      return {
        ...state,
        inputValue: action.value,
      };
    }
    default: {
      return state;
    }
  }
};

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

const CreatableMultiselect: React.FC<Props> = (props) => {

  // Destructure all props
  const {
    type,
    values,
    onChange,
    disabled,
  } = props;

  /* -------------- State ------------- */

  // Initial state
  const initialState: State = {
    inputValue: '',
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const { inputValue } = state;


  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Creates an option for the multiselect component
   * @author Yuen Ler Chow
   * @param label label of the option
   */
  const createOption = (label: string): Option => {
    // set the value to the label without special characters and spaces, and lowercase
    return {
      label,
      value: (
        label
          .toLowerCase()
          .replace(/\W/g, '')
          .replace(' ', '-')
      ),
    };
  };

  /**
   * Adds the values to the multiselect component
   * @author Yuen Ler Chow
   * @param newValue new value to add
   */
  const addValues = (newValue: string) => {
    if (type === DBEntryFieldType.NumberArray) {
      const newValues = (
        newValue
          // Split into items
          .split(',')
          // Trim strings
          .map((val) => {
            return val.trim();
          })
          // Filter zero length
          .filter((trimmedVal) => {
            return trimmedVal.length > 0;
          })
          // Parse to number
          .map(Number.parseFloat)
          // Filter out existing values
          .filter((numberVal) => {
            return !values.some((value) => {
              return value === numberVal;
            });
          })
      );
      onChange([...values, ...newValues] as number[]);
    } else {
      const newValues = (
        newValue
          // Split into items
          .split(',')
          // Trim strings
          .map((val) => {
            return val.trim();
          })
          // Filter zero length
          .filter((trimmedVal) => {
            return (trimmedVal.length > 0);
          })
          // Filter out existing values
          .filter((val) => {
            return !values.some((value) => {
              return value === val;
            })
          })
      );
      onChange([...values, ...newValues] as string[]);
    }
    // resets text field to empty because the values have been added
    dispatch({
      type: ActionType.SetInputValue,
      value: '',
    });
  };

  /**
   * Adds the values to the multiselect component when enter or tab is pressed
   * @author Yuen Ler Chow
   * @param event keyboard event
   */
  const handleKeyDown: KeyboardEventHandler = (event) => {

    // Skip if no input value
    if (!inputValue) {
      return;
    }

    // Add values if enter or tab is pressed
    if (['Enter', 'Tab'].includes(event.key)) {
      event.preventDefault();
      addValues(inputValue);
    }
  };

  /**
   * Handles the input change of the multiselect component
   * @author Yuen Ler Chow
   * @param input input value
   */
  const handleInputChange = (input: string) => {
    // Create copy of input value so we can modify it
    let newValue = input;

    // Don't allow user to type in non numbers
    if (type === DBEntryFieldType.NumberArray) {
      newValue = input.replace(/[^0-9,]/g, '');
    }

    if (input.includes(',')) {
      // if the input has a comma, add the values separated by commas
      addValues(newValue);
    } else {
      // simply update the input value to the new input value
      dispatch({
        type: ActionType.SetInputValue,
        value: newValue,
      });
    }
  };

  /**
   * Handles the value change of the multiselect component
   * @author Yuen Ler Chow
   * @param newValue new values
   */
  const handleValueChange = (newValues: MultiValue<Option>) => {
    // Skip if no new values
    if (!newValues) {
      return;
    }

    // Update values based on type
    if (type === DBEntryFieldType.NumberArray) {
      const numberValues: number[] = newValues.map((val) => {
        return Number(val.value);
      });
      onChange(numberValues);
    } else {
      const stringValues: string[] = newValues.map((val) => {
        return val.value;
      });
      onChange(stringValues);
    }
  };

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <CreatableSelect
      isDisabled={!!disabled}
      components={{ DropdownIndicator: null }}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={handleValueChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="Type/paste value and press enter..."
      value={values.map((val) => {
        return createOption(String(val));
      })}
    />
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

export default CreatableMultiselect;
