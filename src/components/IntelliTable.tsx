/**
 * Intelligent table
 * @author Gabe Abrams
 */

// Import React
import React, { useReducer } from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
  faCheckCircle,
  faXmarkCircle,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

// Import shared types
import ParamType from '../types/ParamType';
import IntelliTableColumn from '../types/IntelliTableColumn';

// Import shared helpers
import roundToNumDecimals from '../helpers/roundToNumDecimals';
import genCSV from '../helpers/genCSV';

// Import shared components
import Modal from './Modal';
import ModalType from '../types/ModalType';
import CheckboxButton from './CheckboxButton';
import CSVDownloadButton from './CSVDownloadButton';
import Variant from '../types/Variant';
import { alert } from './AppWrapper';

/*------------------------------------------------------------------------*/
/*                                  Types                                 */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // Title of the table
  title: string,
  // Unique hyphenated id of the table (e.g. table-name)
  id: string,
  // Ordered list of data objects
  data: {
    // Required id column
    id: string | number,
    // Rest of data
    [k: string]: any
  }[],
  // Column information
  columns: IntelliTableColumn[],
  // Name of the CSV file. If excluded, title is used
  csvName?: string,
};

// Sort types
enum SortType {
  // Ascending
  Ascending = 'ascending',
  // Descending
  Descending = 'descending',
}

/*------------------------------------------------------------------------*/
/*                                  State                                 */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
  // Current sort column (or undefined for data order sort)
  sortColumnParam: (undefined | string),
  // Sort type
  sortType: SortType,
  // Map of which columns are visible
  columnVisibilityMap: { // param => true if visible
    [k: string]: boolean,
  },
  // If true, the column visibility customization modal is visible
  columnVisibilityCustomizationModalVisible: boolean,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Toggle sort column param
  ToggleSortColumn = 'toggle-sort-column',
  // Toggle the visibility of a column
  UpdateColumnVisibility = 'update-column-visibility',
  // Toggle the column visibility customization modal
  ToggleColVisCusModalVisibility = 'toggle-col-vis-cus-modal-visibility',
  // Show all columns
  ShowAllColumns = 'show-all-columns',
  // Hide all columns
  HideAllColumns = 'hide-all-columns',
}

// Action definitions
type Action = (
  | {
    // Action type
    type: ActionType.ToggleSortColumn,
    // Param for the column to toggle
    param: string,
  }
  | {
    // Action type
    type: ActionType.UpdateColumnVisibility,
    // Param for the column to update
    param: string,
    // If true, make the column visible
    visible: boolean,
  }
  | {
    // Action type
    type: (
      | ActionType.ToggleColVisCusModalVisibility
      | ActionType.ShowAllColumns
      | ActionType.HideAllColumns
    ),
  }
);

/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ToggleSortColumn: {
      if (action.param !== state.sortColumnParam) {
        // Different column param
        return {
          ...state,
          sortColumnParam: action.param,
          sortType: SortType.Ascending,
        };
      }
      if (state.sortType === SortType.Ascending) {
        // Switch to descending
        return {
          ...state,
          sortType: SortType.Descending,
        };
      }
      // Stop sorting by column
      return {
        ...state,
        sortColumnParam: undefined,
        sortType: SortType.Ascending,
      };
    }
    case ActionType.UpdateColumnVisibility: {
      const { columnVisibilityMap } = state;
      columnVisibilityMap[action.param] = action.visible;
      return {
        ...state,
        columnVisibilityMap,
      };
    }
    case ActionType.ToggleColVisCusModalVisibility: {
      return {
        ...state,
        columnVisibilityCustomizationModalVisible: !state.columnVisibilityCustomizationModalVisible,
      };
    }
    case ActionType.ShowAllColumns: {
      const { columnVisibilityMap } = state;
      Object.keys(columnVisibilityMap).forEach((param) => {
        columnVisibilityMap[param] = true;
      });
      return {
        ...state,
        columnVisibilityMap,
      };
    }
    case ActionType.HideAllColumns: {
      const { columnVisibilityMap } = state;
      Object.keys(columnVisibilityMap).forEach((param) => {
        columnVisibilityMap[param] = false;
      });
      return {
        ...state,
        columnVisibilityMap,
      };
    }
    default: {
      return state;
    }
  }
};

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const IntelliTable: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /*                                  Setup                                 */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    title,
    id,
    columns,
  } = props;

  // Get data, show empty row if none
  const data = (
    (props.data && props.data.length > 0)
      ? props.data
      : [{ id: 'empty-row' }]
  );

  // Get CSV filename
  let filename = `${title}.csv`;
  if (props.csvName) {
    filename = (
      props.csvName.endsWith('.csv')
        ? props.csvName
        : `${props.csvName}.csv`
    );
  }

  /* -------------- State ------------- */

  // Initial state
  const initColumnVisibilityMap: {
    [k: string]: boolean
  } = {};
  columns.forEach((column) => {
    initColumnVisibilityMap[column.param] = !column.startsHidden;
  });
  const initialState: State = {
    sortColumnParam: undefined,
    sortType: SortType.Descending,
    columnVisibilityMap: initColumnVisibilityMap,
    columnVisibilityCustomizationModalVisible: false,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    sortColumnParam,
    sortType,
    columnVisibilityMap,
    columnVisibilityCustomizationModalVisible,
  } = state;

  /*------------------------------------------------------------------------*/
  /*                                 Render                                 */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /*                  Modal                 */
  /*----------------------------------------*/

  // Modal that may be defined
  let modal: React.ReactNode;

  /* ------- Col Vis Customization Modal ------ */

  if (columnVisibilityCustomizationModalVisible) {
    // Create modal
    modal = (
      <Modal
        type={ModalType.Okay}
        title="Choose columns to show:"
        onClose={() => {
          const noColumnsSelected = (
            Object.values(columnVisibilityMap)
              .every((isSelected) => {
                return !isSelected;
              })
          );
          if (noColumnsSelected) {
            return alert(
              'Choose at least one column',
              'To continue, you have to choose at least one column to show'
            );
          }
          dispatch({
            type: ActionType.ToggleColVisCusModalVisibility,
          });
        }}
        okayVariant={Variant.Light}
      >
        {/* Columns */}
        {
          columns.map((column) => {
            return (
              <CheckboxButton
                key={column.param}
                id={`IntelliTable-${id}-toggle-visibility-${column.param}`}
                className="mb-2"
                text={column.title}
                onChanged={(checked) => {
                  dispatch({
                    type: ActionType.UpdateColumnVisibility,
                    param: column.param,
                    visible: checked,
                  });
                }}
                checked={columnVisibilityMap[column.param]}
                ariaLabel={`show "${column.title}" column in the ${title} table`}
                checkedVariant={Variant.Light}
                uncheckedVariant={Variant.Secondary}
              />
            );
          })
        }
        <div className="mt-3">
          Or you can:
        </div>
        <button
          type="button"
          id={`IntelliTable-${id}-select-all-columns`}
          className="btn btn-secondary me-2"
          aria-label={`show all columns in the ${title} table`}
          onClick={() => {
            dispatch({
              type: ActionType.ShowAllColumns,
            });
          }}
        >
          Select All
        </button>
        <button
          type="button"
          id={`IntelliTable-${id}-select-none-columns`}
          className="btn btn-secondary"
          aria-label={`hide all columns in the ${title} table`}
          onClick={() => {
            dispatch({
              type: ActionType.HideAllColumns,
            });
          }}
        >
          Deselect All
        </button >
      </Modal>
    );
  }

  /*----------------------------------------*/
  /*                 Main UI                */
  /*----------------------------------------*/

  // Table header
  const headerCells = (
    columns
      .filter((column) => {
        return columnVisibilityMap[column.param];
      })
      .map((column) => {
        // Custom info based on current sort type
        let sortButtonAriaLabel;
        let sortIcon = faSort;
        let sortingByThisColumn = false;
        if (!sortColumnParam) {
          // Not being sorted yet
          sortButtonAriaLabel = `sort ascending by ${column.title}`;
          sortIcon = faSort;
        } else if (column.param === sortColumnParam) {
          // Already sorted by this column
          sortingByThisColumn = true;
          if (sortType === SortType.Ascending) {
            // Sorted ascending
            sortButtonAriaLabel = `sort descending by ${column.title}`;
            sortIcon = faSortDown;
          } else {
            // Sorted descending
            sortButtonAriaLabel = `stop sorting by ${column.title}`;
            sortIcon = faSortUp;
          }
        } else {
          // Sorted by a different column
          sortButtonAriaLabel = `sort ascending by ${column.title}`;
          sortIcon = faSort;
        }

        // Create the cell UI
        return (
          <th
            key={column.param}
            scope="col"
            id={`IntelliTable-${id}-header-${column.param}`}
            className="text-start"
            style={{
              borderRight: '0.05rem solid #555',
              borderLeft: '0.05rem solid #555',
            }}
          >
            <div className="d-flex align-items-center justify-content-start flex-row h-100">
              {/* Title */}
              <span className="text-nowrap">
                {column.title}
              </span>
              {/* Buttons */}
              <div>
                <button
                  type="button"
                  id={`IntelliTable-${id}-sort-by-${column.param}-button`}
                  className={`btn btn-${sortingByThisColumn ? 'light' : 'secondary'} btn-sm ms-1 ps-1 pe-1 pt-0 pb-0`}
                  aria-label={sortButtonAriaLabel}
                  onClick={() => {
                    dispatch({
                      type: ActionType.ToggleSortColumn,
                      param: column.param,
                    });
                  }}
                >
                  <FontAwesomeIcon
                    icon={sortIcon}
                  />
                </button>
              </div>
            </div>
          </th>
        );
      })
  );
  const tableHeader = (
    <thead>
      <tr>
        {headerCells}
      </tr>
    </thead>
  );

  // Sort data
  let sortedData = [...data];
  const paramType = columns.find((column) => {
    return (column.param === sortColumnParam);
  })?.type;
  const descending = (sortType === SortType.Descending);
  if (sortColumnParam) {
    sortedData.sort((a, b) => {
      const aVal = a[sortColumnParam];
      const bVal = b[sortColumnParam];

      // Tiebreaker sort by timestamp, most recent first (used if tied)
      const tiebreaker = (
        (b.timestamp ?? 0)
        - (a.timestamp ?? 0)
      );

      // Auto-sort undefined and null to end of list
      if (
        (aVal === undefined || aVal === null)
        || (bVal === undefined || bVal === null)
      ) {
        // At least one was undefined
        if (
          (aVal === undefined || aVal === null)
          && (bVal === undefined || bVal === null)
        ) {
          // Both undefined
          return tiebreaker;
        }
        if (aVal === undefined || aVal === null) {
          // First was undefined
          return 1;
        }
        // Second was undefined
        return -1;
      }

      // Sort differently based on the data type
      // > Boolean
      if (paramType === ParamType.Boolean) {
        if (aVal && !bVal) {
          return (descending ? -1 : 1);
        }
        if (!aVal && bVal) {
          return (descending ? 1 : -1);
        }
        return tiebreaker;
      }
      // > Number
      if (
        paramType === ParamType.Int
        || paramType === ParamType.Float
      ) {
        return (
          descending
            ? (bVal - aVal)
            : (aVal - bVal)
        );
      }
      // > String
      if (paramType === ParamType.String) {
        if (aVal < bVal) {
          return (descending ? 1 : -1);
        }
        if (aVal > bVal) {
          return (descending ? -1 : 1);
        }
        return tiebreaker;
      }
      // > JSON
      if (paramType === ParamType.JSON) {
        const aSize = (
          Array.isArray(aVal)
            ? aVal.length
            : Object.keys(aVal).length
        );
        const bSize = (
          Array.isArray(bVal)
            ? bVal.length
            : Object.keys(bVal).length
        );
        return (
          descending
            ? (bSize - aSize)
            : (aSize - bSize)
        );
      }

      // No sort
      return tiebreaker;
    });
  }

  // Table body
  const rows = sortedData.map((datum) => {
    // Build cells
    const cells = (
      columns
        .filter((column) => {
          return columnVisibilityMap[column.param];
        })
        .map((column) => {
        // Get value
        let value: any = datum;
        const paramParts = column.param.split('.');
        paramParts.forEach((paramPart) => {
          value = (value ?? {})[paramPart];
        });
        let fullValue: React.ReactNode;
        let visibleValue: React.ReactNode;
        let title: string = '';
        if (column.type === ParamType.Boolean) {
          fullValue = !!(value);
          const noValue = (
            value === undefined
            || value === null
          );
          visibleValue = (
            noValue
              ? (
                <FontAwesomeIcon
                  icon={faMinus}
                />
              )
              : (
                <FontAwesomeIcon
                  icon={fullValue ? faCheckCircle : faXmarkCircle}
                />
              )
          );
          title = (fullValue ? 'True' : 'False');
          if (noValue) {
            title = 'Empty Cell';
          }
        } else if (column.type === ParamType.Int) {
          fullValue = Number.parseInt(value, 10);
          const noValue = Number.isNaN(fullValue);
          visibleValue = (
            noValue
              ? (
                <FontAwesomeIcon
                  icon={faMinus}
                />
              )
              : fullValue
          );
          title = String(fullValue);
          if (noValue) {
            title = 'Empty Cell';
          }
        } else if (column.type === ParamType.Float) {
          fullValue = Number.parseFloat(value);
          const noValue = Number.isNaN(fullValue);
          visibleValue = (
            noValue
              ? (
                <FontAwesomeIcon
                  icon={faMinus}
                />
              )
              : roundToNumDecimals(fullValue as number, 2)
          );
          title = String(fullValue);
          if (noValue) {
            title = 'Empty Cell';
          }
        } else if (column.type === ParamType.String) {
          fullValue = String(value).trim();
          const noValue = (
            value === undefined
            || value === null
            || String(fullValue).trim().length === 0
          );
          visibleValue = (
            noValue
              ? (
                <FontAwesomeIcon
                  icon={faMinus}
                />
              )
              : fullValue
          );
          title = `"${value}"`;
          if (noValue) {
            title = 'Empty Cell';
          }
        } else if (column.type === ParamType.JSON) {
          fullValue = JSON.stringify(value);
          const noValue = (
            Array.isArray(value)
              ? (!value || value.length === 0)
              : Object.keys(value ?? {}).length === 0
          );
          visibleValue = (
            noValue
              ? (
                <FontAwesomeIcon
                  icon={faMinus}
                />
              )
              : fullValue
          );
          title="JSON Object"
        }

        // Create UI
        return (
          <td
            key={`${datum.id}-${column.param}`}
            title={title}
            style={{
              borderRight: '0.05rem solid #555',
              borderLeft: '0.05rem solid #555',
            }}
          >
            {visibleValue}
          </td>
        );
      })
    );

    // Add cells to a row
    return (
      <tr key={datum.id}>
        {cells}
      </tr>
    );
  });
  const tableBody = (
    <tbody>
      {rows}
    </tbody>
  );

  // Build table
  const table = (
    <table className="table table-dark table-striped">
      {tableHeader}
      {tableBody}
    </table>
  );

  // Count the number of hidden columns
  const numHiddenCols = (
    Object.values(columnVisibilityMap)
      .filter((isVisible) => {
        return !isVisible;
      })
      .length
  );

  // Build CSV
  const csv = genCSV(
    data,
    columns.filter((column) => {
      return columnVisibilityMap[column.param];
    }),
  );

  // Build main UI
  return (
    <div className={`IntelliTable-container-${id}`}>
      {/* Modal */}
      {modal}
      {/* Header */}
      <div className="d-flex align-items-center justify-content-start">
        {/* Title */}
        <h3 className="m-0">
          {title}
        </h3>
        {/* Buttons */}
        <div className="flex-grow-1 text-end">
          {/* Download Button */}
          <CSVDownloadButton
            aria-label={`download data as csv for ${title}`}
            id={`IntelliTable-${id}-download-as-csv`}
            filename={filename}
            csv={csv}
          />
          {/* Show/Hide Columns */}
          <button
            type="button"
            className="btn btn-secondary ms-2"
            aria-label={`show panel for customizing which columns show in table ${title}`}
            id={`IntelliTable-${id}-show-column-customization-modal`}
            onClick={() => {
              dispatch({
                type: ActionType.ToggleColVisCusModalVisibility,
              });
            }}
          >
            Show/Hide Cols
            {numHiddenCols > 0 && (
              <>
                {' '}
                (
                {numHiddenCols}
                {' '}
                hidden)
              </>
            )}
          </button>
        </div>
      </div>
      {/* Table */}
      <div
        className={`IntelliTable-table-${id} mt-2`}
        style={{
          overflowX: 'auto',
        }}
      >
        {table}
      </div>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/

// Export component
export default IntelliTable;
