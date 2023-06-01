/**
 * DB Entry Manager Panel
 * @author Yuen Ler Chow
 */

// Import React
import React, { useReducer, useEffect } from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faCog } from '@fortawesome/free-solid-svg-icons';

// import dce-reactkit components
import TabBox from '../TabBox';
import visitServerEndpoint from '../../helpers/visitServerEndpoint';
import { showFatalError, confirm } from '../AppWrapper';
import LoadingSpinner from '../LoadingSpinner';

// import types
import DBEntry from './types/DBEntry';
import DBEntryField from './types/DBEntryField';

// Import other components
import AddOrEditDBEntry from './AddOrEditDBEntry';
import generateEndpointPath from './helpers/generateEndpointPath';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // List of db entry fields
  entryFields: DBEntryField[],
  // a prop that is unique to each item
  idPropName: string,
  // the prop that you want to show up as the title of each item
  titlePropName: string,
  // The prop that you want in parentheses after the title
  descriptionPropName: string,
  // the title of the tabBox
  itemListTitle: string,
  // the phrase you want when you say "add a new [itemName]"
  itemName: string,
  // Function to validate the db entry before sending to the server
  validateEntry?: (dbEntry: DBEntry) => Promise<void>,
  // Function to modify the db entry before sending to the server
  modifyEntry?: (dbEntry: DBEntry) => Promise<DBEntry>,
  // True if editing is disabled
  disableEdit?: boolean,
  // Name of the collection in the database
  collectionName: string,
  // True if only admins can access this page
  adminsOnly?: boolean,
  // the query to filter the db entries
  filterQuery?: { [k: string]: any },
};

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
  // List of db items
  dbEntries: DBEntry[],
  // True if adding a new db item
  adding: boolean,
  // Db item to edit
  dbEntryToEdit?: DBEntry,
  // True if loading
  loading: boolean,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Show adder
  ShowAdder = 'ShowAdder',
  // Show editor
  ShowEditor = 'ShowEditor',
  // Finish adding
  FinishAdd = 'FinishAdd',
  // Finish loading
  FinishLoading = 'FinishLoading',
  // Start deletion process
  StartDelete = 'StartDelete',
  // Finish deletion process
  FinishDelete = 'FinishDelete',
}

// Action definitions
type Action = (
  | {
    // Action type
    type: ActionType.FinishLoading,
    // db entry list
    dbEntries: DBEntry[],
  }
  | {
    // Action type
    type: ActionType.ShowEditor,
    // db item to edit
    dbEntry: DBEntry,
  }
  | {
    // Action type
    type: (
      | ActionType.ShowAdder
    ),
  }
  | {
    // Action type
    type: ActionType.FinishAdd,
    // DB entry that was added
    dbEntry?: DBEntry,
    idPropName: string,
  }
  | {
    // Action type
    type: ActionType.StartDelete,
  }
  | {
    // Action type
    type: ActionType.FinishDelete,
    // db entry that was deleted
    dbEntry: DBEntry,
    // unique id prop name
    idPropName: string,
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
    case ActionType.FinishLoading: {
      return {
        ...state,
        loading: false,
        dbEntries: action.dbEntries,
      };
    }
    case ActionType.ShowAdder: {
      return {
        ...state,
        adding: true,
        dbEntryToEdit: undefined,
      };
    }
    case ActionType.ShowEditor: {
      return {
        ...state,
        adding: false,
        dbEntryToEdit: action.dbEntry,
      };
    }
    case ActionType.FinishAdd: {
      // Handle cancel
      const finishedEntry = action.dbEntry;
      if (!finishedEntry) {
        return {
          ...state,
          adding: false,
          dbEntryToEdit: undefined,
        };
      }

      // Create an updated list of DB entries
      let updatedDbEntries: DBEntry[];
      if (state.adding) {
        updatedDbEntries = [...state.dbEntries, finishedEntry];
      } else {
        updatedDbEntries = state.dbEntries.map((existingDbEntry) => {
          if (state.dbEntryToEdit && state.dbEntryToEdit[action.idPropName] === existingDbEntry[action.idPropName]) {
            // This is the entry being edited! Replace
            return finishedEntry;
          }
          // This is not the entry being edited
          return existingDbEntry;
        });
      }

      // Update the state
      return {
        ...state,
        adding: false,
        dbEntryToEdit: undefined,
        dbEntries: updatedDbEntries,
      };
    }
    case ActionType.StartDelete: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionType.FinishDelete: {
      return {
        ...state,
        loading: false,
        // Remove the deleted entry from the list
        dbEntries: state.dbEntries.filter((entry: DBEntry) => {
          return (
            entry[action.idPropName] !== action.dbEntry[action.idPropName]
          );
        }),
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

const DBEntryManagerPanel: React.FC<Props> = (props) => {

  // Destructure all props
  const {
    entryFields,
    titlePropName,
    descriptionPropName,
    idPropName,
    itemListTitle,
    itemName,
    validateEntry,
    modifyEntry,
    disableEdit,
    collectionName,
    adminsOnly,
    filterQuery
  } = props;

  /* -------------- State ------------- */

  // Initial state
  const initialState: State = {
    dbEntries: [],
    adding: false,
    loading: true,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    adding,
    dbEntryToEdit,
    dbEntries,
    loading,
  } = state;

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  // Generate the endpoint path
  const endpoint = generateEndpointPath(collectionName, adminsOnly);

  /**
   * Delete a database entry
   * @author Yuen Ler Chow
   * @param entry the database entry to delete
   */
  const deleteEntry = async (entry: DBEntry) => {
    // Confirm
    const confirmed = await confirm(
      'Remove?',
      `Are you sure you want to remove this ${itemName}?`,
      {
        confirmButtonText: 'Remove Item',
      },
    );

    // Skip if cancelled
    if (!confirmed) {
      return;
    }

    // Remove the entry
    try {
      // Start loader
      dispatch({
        type: ActionType.StartDelete,
      });

      // Perform deletion
      await visitServerEndpoint({
        path: `${endpoint}/${entry[idPropName]}`,
        method: 'DELETE',
      });

      // Finish loader
      dispatch({
        type: ActionType.FinishDelete,
        dbEntry: entry,
        idPropName,
      });
    } catch (err) {
      return showFatalError(err);
    }
  };

  /*------------------------------------------------------------------------*/
  /* ------------------------- Lifecycle Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Mount
   * @author Yuen Ler Chow
   */
  useEffect(
    () => {
      (async () => {
        // Load list of database entries
        try {
          const data = await visitServerEndpoint({
            path: endpoint,
            method: 'GET',
            params: {
              filterQuery: JSON.stringify(filterQuery),
            },
          });

          // Save loaded data
          dispatch({
            type: ActionType.FinishLoading,
            dbEntries: data,
          });
        } catch (err) {
          return showFatalError(err);
        }
      })();
    },
    [],
  );

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* ---------------- Views --------------- */
  /*----------------------------------------*/

  let body: React.ReactNode;

  /* ------------- Loading ------------ */

  if (loading) {
    body = (
      <LoadingSpinner />
    );
  }

  /* ------------- List of entries ------------ */

  if (!loading && !adding && !dbEntryToEdit) {
    // Create body
    body = (
      <div>
        <TabBox
          title={itemListTitle}
        >
          {/* List of DB entries */}
          {dbEntries.map((entry) => {
            return (
              <div
                key={entry[idPropName]}
                className="alert alert-secondary p-2 mb-2 d-flex align-items-center justify-content-center mb-1"
              >
                {/* Title */}
                <div className="flex-grow-1">
                  <h4 className="m-0">
                    <span className="fw-bold">
                      {entry[titlePropName]}
                    </span>
                    <span className="small">
                      {' '}
                      (
                      {entry[descriptionPropName]}
                      )
                    </span>
                  </h4>
                </div>

                {/* Buttons */}
                <div className="d-flex align-items-center">
                  {/* Remove Button */}
                  <button
                    type="button"
                    id={`DBEntryManagerPanel-remove-entry-with-id-${entry[idPropName]}`}
                    className="btn btn-secondary me-1"
                    aria-label={`remove database entry: ${entry[titlePropName]}`}
                    onClick={() => {
                      deleteEntry(entry);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                    />
                    <span className="d-none d-md-inline ms-1">
                      Remove
                    </span>
                  </button>

                  {/* Edit Button */}
                  {!disableEdit && (
                    <button
                      type="button"
                      id={`DBEntryManagerPanel-edit-with-id-${entry[idPropName]}`}
                      className="btn btn-primary"
                      aria-label={`edit db entry: ${entry[titlePropName]}`}
                      onClick={() => {
                        dispatch({
                          type: ActionType.ShowEditor,
                          dbEntry: entry,
                        });
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCog}
                      />
                      <span className="d-none d-md-inline ms-1">
                        Edit
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Add DB entry Button */}
          <div className="d-grid">
            <button
              type="button"
              id="DBEntryManagerPanel-add-entry"
              className="btn btn-lg btn-primary"
              aria-label={`add a new ${itemName} entry to the list of entries`}
              onClick={() => {
                dispatch({
                  type: ActionType.ShowAdder,
                });
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="me-2"
              />
              Add
              {' '}
              {itemName}
            </button>
          </div>
        </TabBox>
      </div>
    );
  }

  /* --------- Create or edit entry -------- */

  if (!loading && (adding || dbEntryToEdit)) {
    body = (
      <AddOrEditDBEntry
        saveEndpointPath={endpoint}
        validateEntry={validateEntry}
        modifyEntry={modifyEntry}
        entryFields={entryFields}
        dbEntryToEdit={dbEntryToEdit}
        idPropName={idPropName}
        entries={dbEntries}
        onFinished={(entry?: DBEntry) => {
          dispatch({
            type: ActionType.FinishAdd,
            dbEntry: entry,
            idPropName,
          });
        }}
      />
    );
  }

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <div>
      {body}
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default DBEntryManagerPanel;
