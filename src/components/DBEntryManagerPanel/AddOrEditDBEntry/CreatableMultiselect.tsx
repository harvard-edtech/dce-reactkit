import React, { KeyboardEventHandler, useReducer } from 'react';

import CreatableSelect from 'react-select/creatable';
import DBEntryFieldType from '../types/DBEntryFieldType';
import { MultiValue } from 'react-select';

const components = {
  DropdownIndicator: null,
};

type Option = {
  readonly label: string;
  readonly value: string;
};

// Props definition
type Props = {
  type: DBEntryFieldType.StringArray | DBEntryFieldType.NumberArray;
  values: string[] | number[];
  onChange: (values: string[] | number[]) => void;
};

/* -------- State Definition -------- */
type State = {
  inputValue: string;
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  SetInputValue = 'SetInputValue',
}

// Action definitions
type Action = (
  | { type: ActionType.SetInputValue; value: string }
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

const CreatableMultiselect: React.FC<Props> = (props) => {

  // destructure all props 
  const {
    type,
    values,
    onChange,
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


  /**
   * Creates an option for the multiselect component
   * @author Yuen Ler Chow
   * @param label label of the option
   */
  const createOption = (label: string): Option => {
    return {
      label,
      value: label.toLowerCase().replace(/\W/g, '')
        .replace(' ', '-'),
    };
  };

  /**
   * Adds the values to the multiselect component
   * @author Yuen Ler Chow
   * @param newValue new value to add
   */
  const addValues = (newValue: string) => {
    if (type === DBEntryFieldType.NumberArray) {
      const newValues = newValue.split(',')
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
          })
        });
      onChange([...values, ...newValues] as number[]);
    } else {
      const newValues = newValue.split(',')
        // Trim strings
        .map((val) => {
          return val.trim();
        })
        // Filter zero length
        .filter((trimmedVal) => {
          return trimmedVal.length > 0;
        })
        // Filter out existing values
        .filter((val) => {
          return !values.some((value) => {
            return value === val;
          });
        });
      onChange([...values, ...newValues] as string[]);
    }
    dispatch({ type: ActionType.SetInputValue, value: '' });
  };

  /**
   * Adds the values to the multiselect component when enter or tab is pressed
   * @author Yuen Ler Chow
   * @param event keyboard event
   */
  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        addValues(inputValue);
        event.preventDefault();
    }
  };

  /**
   * Handles the input change of the multiselect component
   * @author Yuen Ler Chow
   * @param input input value
   */

  const handleInputChange = (input: string) => {
    let newValue = input;
    if (type === DBEntryFieldType.NumberArray) {
      newValue = input.replace(/[^0-9,]/g, '');
    }
    if (input.includes(',')) {
      addValues(newValue);
    } else {
      dispatch({ type: ActionType.SetInputValue, value: newValue });
    }
  };

  /**
   * Handles the value change of the multiselect component
   * @author Yuen Ler Chow
   * @param newValue new values
   */
  const handleValueChange = (newValues: MultiValue<Option>) => {
    if (newValues) {
      if (type === DBEntryFieldType.NumberArray) {
        const numberValues: number[] = [];
        newValues.forEach((val) => {
          numberValues.push(Number(val.value));
        });
        onChange(numberValues);
      } else {
        const stringValues: string[] = [];
        newValues.forEach((val) => {
          stringValues.push(val.value);
        });
        onChange(stringValues);
      }
    }
  };

  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => handleValueChange(newValue)}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="Type something and press enter..."
      value={values.map((val) => {
        return createOption(val.toString());
      })}
    />
  );
};
export default CreatableMultiselect;
