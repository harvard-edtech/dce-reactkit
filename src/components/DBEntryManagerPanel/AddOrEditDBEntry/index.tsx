/**
 * Panel for adding a DBEntry to the database
 * @author Yuen Ler Chow
 */

// Import React
import React, { useReducer } from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

// Import shared components
import CheckboxButton from '../../CheckboxButton';
import LoadingSpinner from '../../LoadingSpinner';
import RadioButton from '../../RadioButton';
import ButtonInputGroup from '../../ButtonInputGroup';

// Import shared helpers
import { alert, showFatalError } from '../../AppWrapper';
import visitServerEndpoint from '../../../helpers/visitServerEndpoint';

// Import other types
import DBEntry from '../types/DBEntry';
import DBEntryField from '../types/DBEntryField';
import DBEntryFieldType from '../types/DBEntryFieldType';

// Import other components
import CreatableMultiselect from './CreatableMultiselect';


/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  /**
   * Handler for when the user finishes adding the DBEntry
   * (if no DBEntry is returned, process was cancelled)
   * @param DBEntry the DBEntry that was just created
   */
  onFinished: (dbEntry?: DBEntry) => void,
  /**
   * Function to validate the DBEntry before saving
   * @param dbEntry
   */
  validateEntry?: (dbEntry: DBEntry) => Promise<void>,
  /**
   * Function to modify the DBEntry before saving
   * @param dbEntry
   * @returns the modified DBEntry
   */
  modifyEntry?: (dbEntry: DBEntry) => DBEntry,
  // The fields needed to create a new DBEntry
  entryFields: DBEntryField[],
  // The DBEntry to edit (if any)
  dbEntryToEdit?: DBEntry,
  // The unique object key of the DBEntry
  idPropName: string,
  // item name
  itemName: string,
  // Server endpoint path to save the DBEntry
  saveEndpointPath: string,
  // All entries in the database
  entries: DBEntry[],
};

/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/

const style = `
  .AddOrEditDBEntry-input-label {
    min-width: 7rem;
  }
`;

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
  // The DBEntry's current state
  entry: DBEntry,
  // True if currently saving
  saving: boolean,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Update the DBEntry
  UpdateDBEntry = 'UpdateDBEntry',
  // Start the save spinner
  StartSave = 'StartSave',
}

// Action definitions
type Action = (
  | {
    // Action type
    type: ActionType.UpdateDBEntry,
    // New state of the DBEntry
    dbEntry: DBEntry,
  }
  | {
    // Action type
    type: (
      | ActionType.StartSave
    ),
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
    case ActionType.UpdateDBEntry: {
      return {
        ...state,
        entry: action.dbEntry,
      };
    }
    case ActionType.StartSave: {
      return {
        ...state,
        saving: true,
      };
    }
    default: {
      return state;
    }
  }
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const AddOrEditDBEntry: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    onFinished,
    entryFields,
    dbEntryToEdit,
    validateEntry,
    modifyEntry,
    idPropName,
    saveEndpointPath,
    entries,
    itemName,
  } = props;

  /* -------------- State ------------- */

  // Initial state
  const initialState: State = {
    entry: dbEntryToEdit || {},
    saving: false,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    entry,
    saving,
  } = state;

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Save changes to the DBEntry and then finish
   * @author Yuen Ler Chow
   */
  const save = async () => {
    // Start the save loading indicator
    dispatch({ type: ActionType.StartSave });

    // add all default values to the entry
    entryFields.forEach((field) => {
      if (field.defaultValue && !entry[field.objectKey]) {
        entry[field.objectKey] = field.defaultValue;
      }
    });

    const modifiedEntry = modifyEntry ? modifyEntry(entry) : entry;

    // add id key to entry so that when we delete the item, the key will always be "id"
    modifiedEntry.id = modifiedEntry[idPropName];

    // Send to server
    try {
      await visitServerEndpoint({
        path: saveEndpointPath,
        method: 'POST',
        params: {
          item: JSON.stringify(modifiedEntry),
        },
      });

      // Finish
      onFinished(entry);
    } catch (err) {
      return showFatalError(err);
    }
  };

  /**
   * Cancel and return without saving
   * @author Gabe Abrams
   */
  const cancel = () => {
    onFinished(undefined);
  };

  /**
   * Create validation error message for the DBEntry
   * @author Yuen Ler Chow
   * @param fields the fields to validate
   * @returns the validation error message, or an empty string if no error
   */

  const validate = (fields: DBEntryField[]) => {
    let validationError = '';
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i];
      const value = entry[field.objectKey];

      // Check if required field is empty. Field is automatically required if it is the idPropName
      if ((field.required || (field.objectKey === idPropName)) && !value) {
        validationError = `Please fill in the ${field.label} field`;
        return validationError;
      }

      // Check if unique field is unique
      if (field.objectKey === idPropName) {
        if (entries.find((e) => { return e[idPropName] === value; })) {
          validationError = `An item with the ${field.label} ${value} already exists. ${field.label} must be unique.`;
          return validationError;
        }
      }

      // If they have entered a value for the field, check if it is valid
      if (value || field.type === DBEntryFieldType.Object) {
        // String validation
        if (field.type === DBEntryFieldType.String) {
          if (
            // Minimum length requirement is defined
            field.minNumChars
            // Value is too short
            && value.length < field.minNumChars
          ) {
            validationError = `${field.label} must be at least ${field.minNumChars} character${field.minNumChars === 1 ? '' : 's'} long`;
          } else if (
            // Maximum length requirement is defined
            field.maxNumChars
            // Value is too long
            && value.length > field.maxNumChars
          ) {
            validationError = `${field.label} must be at most ${field.maxNumChars} character${field.maxNumChars === 1 ? '' : 's'} long`;
          }
          // Number validation
        } else if (field.type === DBEntryFieldType.Number) {
          if (
            // Minimum value requirement is defined
            field.minNumber
            // Value is too small
            && value < field.minNumber
          ) {
            validationError = `${field.label} must be at least ${field.minNumber}`;
          } else if (
            // Maximum value requirement is defined
            field.maxNumber
            // Value is too large
            && value > field.maxNumber
          ) {
            validationError = `${field.label} must be at most ${field.maxNumber}`;
          }
        } else if (
          field.type === DBEntryFieldType.StringArray
          || field.type === DBEntryFieldType.NumberArray
        ) {
          // String and Number Array validation
          if (
            // Minimum number of elements requirement is defined
            field.minNumElements
            // Value has too few elements
            && value.length < field.minNumElements
          ) {
            validationError = `${field.label} must have at least ${field.minNumElements} value${field.minNumElements === 1 ? '' : 's'}`;
          } else if (
            // Maximum number of elements requirement is defined
            field.maxNumElements
            // Value has too many elements
            && value.length > field.maxNumElements
          ) {
            validationError = `${field.label} must have at most ${field.maxNumElements} value${field.maxNumElements === 1 ? '' : 's'}`;
          } else if (field.type === DBEntryFieldType.NumberArray) {
            // Number Array validation
            for (let j = 0; j < value.length; j += 1) {
              if (
                // Minimum value requirement is defined
                field.minNumber
                // Value is too small
                && value[j] < field.minNumber
              ) {
                validationError = `${field.label} values must be at least ${field.minNumber}`;
                return validationError;
              } if (
                // Maximum value requirement is defined
                field.maxNumber
                // Value is too large
                && value[j] > field.maxNumber
              ) {
                validationError = `${field.label} values must be at most ${field.maxNumber}`;
                return validationError;
              }
            }
          }
        } else if (field.type === DBEntryFieldType.Object) {
          validationError = validate(field.subfields);
        }
      }
      if (validationError) {
        return validationError;
      }
    }
    return validationError;
  };

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* ---------------- Views --------------- */
  /*----------------------------------------*/

  // Body
  let body: React.ReactNode;

  /* ------------- Loading ------------ */

  if (saving) {
    body = (
      <LoadingSpinner />
    );
  }

  /* -------------- Form -------------- */

  // If not saving, validate what the user has entered
  if (!saving) {
    // Validation error if there is one
    const validationError = validate(entryFields);

    /**
     * Render a single entry field
     * @author Yuen Ler Chow
     * @param field the entry field to render
     * @param disabled true if the field should be disabled
     */
    const renderEntryField = (field: DBEntryField, disabled: boolean) => {
      if (field.type === DBEntryFieldType.String) {
        if (field.choices) {
          return (
            <div
              key={field.objectKey}
              className="mb-2"
            >
              <div
                className="input-group"
                style={{
                  pointerEvents: (disabled ? 'none' : 'auto'),
                }}
              >
                <ButtonInputGroup
                  label={field.label}
                >
                  {
                    field.choices.map((choice) => {
                      return (
                        <RadioButton
                          key={choice.value}
                          text={choice.title}
                          selected={entry[field.objectKey] === choice.value}
                          onSelected={() => {
                            entry[field.objectKey] = choice.value;
                            dispatch({
                              type: ActionType.UpdateDBEntry,
                              dbEntry: entry,
                            });
                          }}
                          ariaLabel={choice.title}
                        />
                      );
                    })
                  }
                </ButtonInputGroup>
              </div>
            </div>
          );
        }

        return (
          <div
            className="mb-2"
            key={field.objectKey}
          >
            <div className="input-group">
              <span
                className="AddOrEditDBEntry-input-label input-group-text"
              >
                {field.label}
              </span>
              <input
                disabled={disabled}
                type="text"
                className="form-control"
                placeholder={field.placeholder}
                aria-describedby="AddOrEditDBEntry-form-name-label"
                value={entry[field.objectKey] || ''}
                onChange={(e) => {
                  entry[field.objectKey] = (
                    e.target.value
                  );
                  dispatch({
                    type: ActionType.UpdateDBEntry,
                    dbEntry: entry,
                  });
                }}
              />
            </div>
          </div>
        );
      }

      if (field.type === DBEntryFieldType.Number) {
        return (
          <div
            key={field.objectKey}
            className="mb-2"
          >
            <div className="input-group">
              <span
                className="AddOrEditDBEntry-input-label input-group-text"
              >
                {field.label}
              </span>
              <input
                type="text"
                className="form-control"
                placeholder={field.placeholder}
                aria-describedby="AddOrEditDBEntry-form-name-label"
                value={entry[field.objectKey] || ''}
                disabled={disabled}
                onChange={(e) => {
                  entry[field.objectKey] = (
                    e.target.value
                      .replace(/[^0-9]/g, '')
                  );
                  dispatch({
                    type: ActionType.UpdateDBEntry,
                    dbEntry: entry,
                  });
                }}
              />
            </div>
          </div>
        );
      }

      if (field.type === DBEntryFieldType.StringArray) {
        if (field.choices) {
          return (
            <div
              key={field.objectKey}
              className="mb-2"
            >
              <div
                className="input-group"
                style={{
                  pointerEvents: (disabled ? 'none' : 'auto'),
                }}
              >
                <ButtonInputGroup
                  label={field.label}
                >
                  {
                    field.choices.map((choice) => {
                      return (
                        <CheckboxButton
                          key={choice.value}
                          text={choice.title}
                          checked={entry[field.objectKey] && entry[field.objectKey].includes(choice.value)}
                          onChanged={(checked) => {
                            if (checked) {
                              // Initialize array if it doesn't exist
                              if (!entry[field.objectKey]) {
                                entry[field.objectKey] = [];
                              }

                              // Add value to array
                              entry[field.objectKey].push(choice.value);
                            } else {
                              // Remove value from array
                              entry[field.objectKey] = (
                                entry[field.objectKey]
                                  .filter((val: string) => {
                                    return val !== choice.value;
                                  })
                              );
                            }

                            // Save
                            dispatch({
                              type: ActionType.UpdateDBEntry,
                              dbEntry: entry,
                            });
                          }}
                          ariaLabel={choice.title}
                        />
                      );
                    })
                  }
                </ButtonInputGroup>
              </div>
            </div>
          );
        }

        // Flexible (no specific choices for this field)
        return (
          <div
            key={field.objectKey}
            className="mb-2"
          >
            <div className="input-group">
              <span
                className="AddOrEditDBEntry-input-label input-group-text"
              >
                {field.label}
              </span>
              <div className="flex-grow-1">
                <CreatableMultiselect
                  disabled={disabled}
                  type={DBEntryFieldType.StringArray}
                  values={entry[field.objectKey] || []}
                  onChange={(values) => {
                    // Update entry and save
                    entry[field.objectKey] = values;
                    dispatch({
                      type: ActionType.UpdateDBEntry,
                      dbEntry: entry,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        );
      }

      if (field.type === DBEntryFieldType.NumberArray) {
        return (
          <div
            key={field.objectKey}
            className="mb-2"
          >
            <div className="input-group">
              <span
                className="AddOrEditDBEntry-input-label input-group-text"
              >
                {field.label}
              </span>
              <div className="flex-grow-1">
                <CreatableMultiselect
                  disabled={disabled}
                  type={DBEntryFieldType.NumberArray}
                  values={entry[field.objectKey] || []}
                  onChange={(values) => {
                    entry[field.objectKey] = values;
                    dispatch({
                      type: ActionType.UpdateDBEntry,
                      dbEntry: entry,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        );
      }

      if (field.type === DBEntryFieldType.Object) {
        return (
          <div
            key={field.objectKey}
            className="mb-2"
          >
            <div className="input-group">
              {/* Label */}
              <span
                className="AddOrEditDBEntry-input-label input-group-text"
              >
                {field.label}
              </span>
              {/* Add each subfield */}
              <div className="flex-grow-1 p-2 form-control">
                {
                  field.subfields.map((subfield: DBEntryField) => {
                    return <div>{renderEntryField(subfield, disabled)}</div>;
                  })
                }
              </div>
            </div>
          </div>
        );
      }

      // This should never happen
      return null;
    };

    // UI
    body = (
      <div>
        <h1>{dbEntryToEdit ? `Edit ${itemName}` : `Create ${itemName}`}</h1>
        {/* Entry fields */}
        {
          entryFields.map((field: DBEntryField) => {
            const disabled = (idPropName === field.objectKey && dbEntryToEdit !== undefined)
              || (field.lockAfterCreation !== undefined && dbEntryToEdit !== undefined);
            return renderEntryField(field, disabled);
          })
        }

        {/* Buttons */}
        <div className="text-center mt-2">
          <button
            type="button"
            id="AddOrEditDBEntry-save-changes-button"
            className="btn btn-primary btn-lg me-1"
            aria-label="Save changes"
            onClick={async () => {
              if (validationError && validationError.length > 0) {
                return alert(
                  'Please fix the following error',
                  validationError,
                );
              }
              if (validateEntry) {
                try {
                  await validateEntry(entry);
                } catch (error) {
                  return alert(
                    'Please fix the following error',
                    String(error),
                  );
                }
              }
              save();
            }}
          >
            <FontAwesomeIcon
              icon={faSave}
              className="me-1"
            />
            Save
          </button>
          <button
            type="button"
            id="AddOrEditDBEntry-cancel-button"
            className="btn btn-secondary btn-lg me-1"
            aria-label="save changes"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <div className="alert alert-light text-black">
      <style>
        {style}
      </style>
      {body}
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default AddOrEditDBEntry;
