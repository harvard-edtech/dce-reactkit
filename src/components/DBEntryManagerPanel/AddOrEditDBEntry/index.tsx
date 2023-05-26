/**
 * Panel for adding a DBEntry to the database
 * @author Yuen Ler Chow
 */

// Import React
import React, { useReducer } from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
} from '@fortawesome/free-solid-svg-icons';

// Import dce-reactkit
import {
  CheckboxButton,
  LoadingSpinner,
  RadioButton,
  ButtonInputGroup,
  alert,
  showFatalError,
  visitServerEndpoint,
} from 'dce-reactkit';

import DBEntry from '../types/DBEntry';
import DBEntryField from '../types/DBEntryField';
import DBEntryFieldType from '../types/DBEntryFieldType';

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
  onFinished: (dbEntry: DBEntry | undefined) => void,
  entryFields: DBEntryField[],
  DBEntryToEdit: DBEntry | undefined
  validationFunction?: (dbEntry: DBEntry) => Promise<void>
  objectModifier?: (dbEntry: DBEntry) => DBEntry
  idPropName: string
  endpoint: string
  entries: DBEntry[]
};

/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/
const style = `
  .AddDBEntry-input-label {
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
    DBEntry: DBEntry,
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
        entry: action.DBEntry,
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

const AddorEditDBEntry: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    onFinished,
    entryFields,
    DBEntryToEdit,
    validationFunction,
    objectModifier,
    idPropName,
    endpoint,
    entries,
  } = props;

  /* -------------- State ------------- */

  // Initial state
  const initialState: State = {
    entry: DBEntryToEdit || {},
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

    const modifiedEntry = objectModifier ? objectModifier(entry) : entry;

    // Send to server
    try {
      await visitServerEndpoint({
        path: endpoint,
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
  const cancel = async () => {
    onFinished(undefined);
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

  if (!saving) {
    // create validation boolean array for each field
    let validationError = '';

    for (let i = 0; i < entryFields.length; i += 1) {
      const field = entryFields[i];
      const value = entry[field.objectKey];

      if (field.required && !value) {
        validationError = `Please fill in the ${field.label} field`;
        break;
      }

      if (field.objectKey === idPropName) {
        if (entries.find((e) => { return e[idPropName] === value; })) {
          validationError = `An item with the ${field.label} ${value} already exists. ${field.label} must be unique.`;
          break;
        }
      }

      if (value) {
        if (field.type === DBEntryFieldType.String) {
          if (field.minNumChars && value.length < field.minNumChars) {
            validationError = `${field.label} must be at least ${field.minNumChars} characters long`;
          } else if (field.maxNumChars && value.length > field.maxNumChars) {
            validationError = `${field.label} must be at most ${field.maxNumChars} characters long`;
          }
        } else if (field.type === DBEntryFieldType.Number) {
          if (field.minNumber && value < field.minNumber) {
            validationError = `${field.label} must be at least ${field.minNumber}`;
          } else if (field.maxNumber && value > field.maxNumber) {
            validationError = `${field.label} must be at most ${field.maxNumber}`;
          }
        } else if (field.type === DBEntryFieldType.StringArray || field.type === DBEntryFieldType.NumberArray) {
          if (field.minNumElements && value.length < field.minNumElements) {
            validationError = `${field.label} must have at least ${field.minNumElements} values`;
          } else if (field.maxNumElements && value.length > field.maxNumElements) {
            validationError = `${field.label} must have at most ${field.maxNumElements} values`;
          } else if (field.type === DBEntryFieldType.NumberArray) {
            for (let j = 0; j < value.length; j += 1) {
              if (field.minNumber && value[j] < field.minNumber) {
                validationError = `${field.label} values must be at least ${field.minNumber}`;
                break;
              } else if (field.maxNumber && value[j] > field.maxNumber) {
                validationError = `${field.label} values must be at most ${field.maxNumber}`;
                break;
              }
            }
          }
        }
      }
    }

    const validationFailed = !!validationError;

    const renderEntryField = (field: DBEntryField, disabled: boolean) => {
      if (field.type === DBEntryFieldType.String) {
        if (field.choices) {
          return (
            <div
              key={field.objectKey}
              className="mb-2"
            >
              <div className="input-group"
                style={{
                  pointerEvents:
                    (disabled) ? 'none' : 'auto',
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
                              DBEntry: entry,
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
                className="AddDBEntry-input-label input-group-text"
                id="AddDBEntry-form-name-label"
              >
                {field.label}
              </span>
              <input
                id="AddDBEntry-form-name-input"
                disabled={disabled}
                type="text"
                className="form-control"
                placeholder={field.placeholder}
                aria-describedby="AddDBEntry-form-name-label"
                value={entry[field.objectKey] || ''}
                onChange={(e) => {
                  entry[field.objectKey] = (
                    e.target.value
                      .replace(/[^a-zA-Z0-9\s(),-]/g, '')
                  );
                  dispatch({
                    type: ActionType.UpdateDBEntry,
                    DBEntry: entry,
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
                className="AddDBEntry-input-label input-group-text"
                id="AddDBEntry-form-name-label"
              >
                {field.label}
              </span>
              <input
                id="AddDBEntry-form-name-input"
                type="text"
                className="form-control"
                placeholder={field.placeholder}
                aria-describedby="AddDBEntry-form-name-label"
                value={entry[field.objectKey] || ''}
                disabled={disabled}
                onChange={(e) => {
                  entry[field.objectKey] = (
                    e.target.value
                      .replace(/[^0-9]/g, '')
                  );
                  dispatch({
                    type: ActionType.UpdateDBEntry,
                    DBEntry: entry,
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
              <div className="input-group"
                style={{
                  pointerEvents:
                    disabled ? 'none' : 'auto',
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
                              if (!entry[field.objectKey]) {
                                entry[field.objectKey] = [];
                              }
                              entry[field.objectKey].push(choice.value);
                            } else {
                              entry[field.objectKey] = entry[field.objectKey]
                                .filter((val: any) => { return val !== choice.value; });
                            }
                            dispatch({
                              type: ActionType.UpdateDBEntry,
                              DBEntry: entry,
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
            key={field.objectKey}
            className="mb-2"
          >
            <div className="input-group">
              <span
                className="AddDBEntry-input-label input-group-text"
                id="AddDBEntry-form-name-label"
              >
                {field.label}
              </span>
              <div className="flex-grow-1">
                <CreatableMultiselect
                  disabled={disabled}
                  type={DBEntryFieldType.StringArray}
                  values={entry[field.objectKey] || []}
                  onChange={(values) => {
                    entry[field.objectKey] = values;
                    dispatch({
                      type: ActionType.UpdateDBEntry,
                      DBEntry: entry,
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
                className="AddDBEntry-input-label input-group-text"
                id="AddDBEntry-form-name-label"
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
                      DBEntry: entry,
                    });
                  }}
                />
              </div>
            </div>
          </div>

        );
      }
      if (field.type == DBEntryFieldType.Object) {
        return (
          <div
            key={field.objectKey}
            className="mb-2"
          >
            <div className="input-group">
              <span
                className="AddDBEntry-input-label input-group-text"
                id="AddDBEntry-form-name-label"
              >
                {field.label}
              </span>
              {
                field.subfields.map((subfield: DBEntryField) => {
                  return renderEntryField(subfield, disabled);
                })
              }
            </div>
          </div>

        );

      }

      return null;

    }

    // UI
    body = (
      <div>
        {
          entryFields.map((field: DBEntryField) => {
            const disabled = (idPropName === field.objectKey && DBEntryToEdit !== undefined)
              || (field.lockAfterCreation !== undefined && DBEntryToEdit !== undefined);
            return renderEntryField(field, disabled);
          })
        }

        {/* Buttons */}
        <div className="text-center mt-2">
          <button
            type="button"
            id="AddDBEntry-save-changes-button"
            className="btn btn-primary btn-lg me-1"
            aria-label="save changes"
            onClick={async () => {
              if (validationFailed) {
                return alert(
                  'Please fix the following error',
                  validationError,
                );
              }
              if (validationFunction) {
                try {
                  validationFunction(entry);
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
            id="AddDBEntry-cancel-button"
            className="btn btn-secondary btn-lg me-1"
            aria-label="save changes"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      </div >
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
export default AddorEditDBEntry;
