/**
 * Log reviewer panel that allows users (must be approved admins) to
 *   review logs written by dce-reactkit
 * @author Gabe Abrams
 */

// Import React
import React, { useReducer, useEffect } from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCalendar,
  faCircle,
  faHammer,
  faList,
  faTag,
  faTimes,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

// Import shared helpers
import visitServerEndpoint from '../helpers/visitServerEndpoint';
import getTimeInfoInET from '../helpers/getTimeInfoInET';
import { alert, showFatalError } from './AppWrapper';
import getHumanReadableDate from '../helpers/getHumanReadableDate';

// Import shared constants
import LOG_REVIEW_ROUTE_PATH_PREFIX from '../constants/LOG_REVIEW_ROUTE_PATH_PREFIX';

// Import shared types
import Log from '../types/Log';
import LogMetadataType from '../types/LogMetadataType';
import LogSource from '../types/LogSource';
import LogType from '../types/LogType';
import LogAction from '../types/LogAction';
import ParamType from '../types/ParamType';
import IntelliTableColumn from '../types/IntelliTableColumn';
import LogBuiltInMetadata from '../types/LogBuiltInMetadata';
import LogMetadataContextMap from '../types/LogMetadataContextMap';
import LogMetadataTargetMap from '../types/LogMetadataTargetMap';
import DateFilterState from '../client/types/from-server/DateFilterState';
import ContextFilterState from '../client/types/from-server/ContextFilterState';
import TagFilterState from '../client/types/from-server/TagFilterState';
import ActionErrorFilterState from '../client/types/from-server/ActionErrorFilterState';
import AdvancedFilterState from '../client/types/from-server/AdvancedFilterState';

// Import shared components
import SimpleDateChooser from './SimpleDateChooser';
import LoadingSpinner from './LoadingSpinner';
import Drawer from './Drawer';
import ItemPicker from './ItemPicker';
import PickableItem from './ItemPicker/types/PickableItem';
import CheckboxButton from './CheckboxButton';
import TabBox from './TabBox';
import RadioButton from './RadioButton';
import ButtonInputGroup from './ButtonInputGroup';
import IntelliTable from './IntelliTable';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props
type Props = {
  // LogMetadata file for the app
  LogMetadata: LogMetadataType,
  // Function to call when the user wants to close the log reviewer
  onClose: () => void,
};

// Triple of year/month/day
type DateTriple = {
  // Full year
  year: number,
  // 1-indexed month
  month: number,
  // 1-indexed day
  day: number,
};

// Types of filter drawers
enum FilterDrawer {
  Date = 'date',
  Context = 'context',
  Tag = 'tag',
  Action = 'action',
  Advanced = 'advanced',
}

/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/

const style = `
  .LogReviewer-outer-container {
    /* Full Screen */
    display: inline-block;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    
    /* On Top and Fixed */
    position: fixed;
    z-index: 90000;

    /* Space around contents */
    padding: 0.5rem;

    /* Dark Background */
    background-color: rgba(0, 0, 0, 0.7);

    /* No Clickthrough */
    pointer-events: none;
  }
  
  .LogReviewer-inner-container {
    /* Full screen, rounded modal-like look */
    display: flex;
    height: 100%;
    border: 0.05rem solid black;
    border-radius: 0.5rem;
    overflow: hidden;
    padding: 0.7rem;

    /* Solid background */
    background-color: white;
    color: black;

    /* Place contents in flex column */
    flex-direction: column;

    /* Re-allow interaction */
    pointer-events: all;
  }

  .LogReviewer-header {
    /* Elements in flex row */
    display: flex;
    flex-direction: row;
  }

  .LogReviewer-header-title {
    /* Take up remaining width */
    flex-grow: 1;
  }

  .LogReviewer-contents {
    /* Take up remaining height */
    flex-grow: 1;

    /* Vertical scroll */
    overflow-y: auto;
  }

  .LogReviewer-header-close-button {
    border: 0 !important;
    background-color: transparent !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    padding-right: 1em !important;
    margin: 0 !important;
    color: #444 !important;

    right: 0 !important;
    position: absolute !important;
  }
  .LogReviewer-header-close-button:hover {
    border: 0 !important;
    background-color: transparent !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin: 0 !important;
    color: #000 !important;
  }
`;

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

const columns: IntelliTableColumn[] = [
  {
    title: 'First Name',
    param: 'userFirstName',
    type: ParamType.String,
  },
  {
    title: 'Last Name',
    param: 'userLastName',
    type: ParamType.String,
  },
  {
    title: 'Email',
    param: 'userEmail',
    type: ParamType.String,
  },
  {
    title: 'Canvas Id',
    param: 'userId',
    type: ParamType.Int,
  },
  {
    title: 'Student?',
    param: 'isLearner',
    type: ParamType.Boolean,
  },
  {
    title: 'Teaching Staff?',
    param: 'isTTM',
    type: ParamType.Boolean,
    startsHidden: true,
  },
  {
    title: 'Admin?',
    param: 'isAdmin',
    type: ParamType.Boolean,
    startsHidden: true,
  },
  {
    title: 'Course Canvas Id',
    param: 'courseId',
    type: ParamType.Int,
    startsHidden: true,
  },
  {
    title: 'Course Name',
    param: 'courseName',
    type: ParamType.String,
  },
  {
    title: 'Browser Name',
    param: 'browser.name',
    type: ParamType.String,
    startsHidden: true,
  },
  {
    title: 'Browser Version',
    param: 'browser.version',
    type: ParamType.String,
    startsHidden: true,
  },
  {
    title: 'OS',
    param: 'device.os',
    type: ParamType.String,
    startsHidden: true,
  },
  {
    title: 'Mobile?',
    param: 'device.isMobile',
    type: ParamType.Boolean,
    startsHidden: true,
  },
  {
    title: 'Year',
    param: 'year',
    type: ParamType.Int,
  },
  {
    title: 'Month',
    param: 'month',
    type: ParamType.Int,
  },
  {
    title: 'Day',
    param: 'day',
    type: ParamType.Int,
  },
  {
    title: 'Hour',
    param: 'hour',
    type: ParamType.Int,
  },
  {
    title: 'Minute',
    param: 'minute',
    type: ParamType.Int,
    startsHidden: true,
  },
  {
    title: 'Timestamp',
    param: 'timestamp',
    type: ParamType.Int,
    startsHidden: true,
  },
  {
    title: 'Context',
    param: 'context',
    type: ParamType.String,
  },
  {
    title: 'Subcontext',
    param: 'subcontext',
    type: ParamType.String,
  },
  {
    title: 'Tags',
    param: 'tags',
    type: ParamType.JSON,
    startsHidden: true,
  },
  {
    title: 'Log Level',
    param: 'level',
    type: ParamType.String,
    startsHidden: true,
  },
  {
    title: 'Metadata',
    param: 'metadata',
    type: ParamType.JSON,
    startsHidden: true,
  },
  {
    title: 'Source',
    param: 'source',
    type: ParamType.String,
  },
  {
    title: 'Server Route Path',
    param: 'routePath',
    type: ParamType.String,
    startsHidden: true,
  },
  {
    title: 'Server Route Template',
    param: 'routeTemplate',
    type: ParamType.String,
    startsHidden: true,
  },
  {
    title: 'Type',
    param: 'type',
    type: ParamType.String,
  },
  {
    title: 'Error Message',
    param: 'errorMessage',
    type: ParamType.String,
    startsHidden: true,
  },
  {
    title: 'Error Code',
    param: 'errorCode',
    type: ParamType.String,
    startsHidden: true,
  },
  {
    title: 'Error Stack',
    param: 'errorStack',
    type: ParamType.String,
    startsHidden: true,
  },
  {
    title: 'Action Target',
    param: 'target',
    type: ParamType.String,
    startsHidden: true,
  },
  {
    title: 'Action Type',
    param: 'action',
    type: ParamType.String,
    startsHidden: true,
  },
];

/*------------------------------------------------------------------------*/
/* -------------------------- Static Functions -------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Turn a machine-readable name into a human-readable name
 * @author Gabe Abrams
 * @param name machine-readable name
 * @returns human-readable name
 */
const genHumanReadableName = (machineReadableName: string) => {
  let humanReadableName = '';

  // Add chars and spaces
  const chars = machineReadableName.split('');
  chars.forEach((char) => {
    if (/[A-Z]/.test(char)) {
      // Uppercase! Add a space before
      humanReadableName += ' ';
    }
    humanReadableName += char;
  });
  const words = (
    humanReadableName
      .trim()
      // Split into words
      .split(' ')
      // Filter out whitespace
      .filter((word) => {
        return (word.length > 0);
      })
      // Capitalize first letter
      .map((word) => {
        if (word.length <= 1) {
          return word;
        }
        return `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`;
      })
  );

  // Handle acronyms by piling words together
  const consolidatedWords: string[] = [];
  let acronym = '';
  words.forEach((word) => {
    if (word.length === 1) {
      // Add on to acronym
      acronym += word;
    } else {
      // Wrap up acronym
      if (acronym.length > 0) {
        consolidatedWords.push(acronym);
        acronym = '';
      }

      // Full word. Just add it
      consolidatedWords.push(word);
    }
  });
  // Add trailing acronym
  if (acronym.length > 0) {
    consolidatedWords.push(acronym);
  }

  // Return
  return consolidatedWords.join(' ');
};

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
  /* -------------- Logs -------------- */
  // True if currently loading
  loading: boolean,
  // Loaded logs
  logs: Log[],
  /* ------------- Filters ------------ */
  // Current expanded filter drawer
  expandedFilterDrawer: FilterDrawer | undefined,
  // State of date filters
  dateFilterState: DateFilterState,
  // State of context filters
  contextFilterState: ContextFilterState,
  // State of tag filters
  tagFilterState: TagFilterState,
  // State of the action and error filter
  actionErrorFilterState: ActionErrorFilterState,
  // State of the advanced filter
  advancedFilterState: AdvancedFilterState,
  // Current page number
  pageNumber: number,
  // If true, there is another page to load
  hasAnotherPage: boolean,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Show the loading bar
  StartLoading = 'start-loading',
  // Finish loading logs
  FinishLoading = 'finish-loading',
  // Reset filters to initial values
  ResetFilters = 'reset-filters',
  // Choose a filter drawer to toggle
  ToggleFilterDrawer = 'toggle-filter-drawer',
  // Hide filter drawer
  HideFilterDrawer = 'hide-filter-drawer',
  // Handle the date filter state
  UpdateDateFilterState = 'update-date-filter-state',
  // Update the context filter state
  UpdateContextFilterState = 'update-context-filter-state',
  // Update the tag filter state
  UpdateTagFilterState = 'update-tag-filter-state',
  // Update the action and error filter state
  UpdateActionErrorFilterState = 'update-action-error-filter-state',
  // Update the advanced filter state
  UpdateAdvancedFilterState = 'update-advanced-filter-state',
  // Increment the page number
  IncrementPageNumber = 'increment-page-number',
  // Decrement the page number
  DecrementPageNumber = 'decrement-page-number',
  // Set has another page
  SetHasAnotherPage = 'set-has-another-page',
}

// Action definitions
type Action = (
  | {
    // Action type
    type: ActionType.FinishLoading,
    // Updated logs
    logs: Log[],
  }
  | {
    // Action type
    type: ActionType.ToggleFilterDrawer,
    // The drawer to show
    filterDrawer: FilterDrawer,
  }
  | {
    // Action type
    type: ActionType.ResetFilters,
    // Initial filter states
    initDateFilterState: DateFilterState,
    initContextFilterState: ContextFilterState,
    initTagFilterState: TagFilterState,
    initActionErrorFilterState: ActionErrorFilterState,
    initAdvancedFilterState: AdvancedFilterState,
  }
  | {
    // Action type
    type: ActionType.UpdateDateFilterState,
    // New date filter state
    dateFilterState: DateFilterState,
  }
  | {
    // Action type
    type: ActionType.UpdateContextFilterState,
    // New context filter state
    contextFilterState: ContextFilterState,
  }
  | {
    // Action type
    type: ActionType.UpdateTagFilterState,
    // New tag filter state
    tagFilterState: TagFilterState,
  }
  | {
    // Action type
    type: ActionType.UpdateActionErrorFilterState,
    // New action and error filter state
    actionErrorFilterState: ActionErrorFilterState,
  }
  | {
    // Action type
    type: ActionType.UpdateAdvancedFilterState,
    // New advanced filter state
    advancedFilterState: AdvancedFilterState,
  }
  | {
    type: ActionType.IncrementPageNumber,
  }
  | {
    type: ActionType.DecrementPageNumber,
  }
  | {
    type: ActionType.SetHasAnotherPage,
    hasAnotherPage: boolean,
  }
  | {
    // Action type
    type: (
      | ActionType.StartLoading
      | ActionType.HideFilterDrawer
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
    case ActionType.StartLoading: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionType.FinishLoading: {
      return {
        ...state,
        loading: false,
        logs: action.logs,
      };
    }
    case ActionType.ToggleFilterDrawer: {
      return {
        ...state,
        expandedFilterDrawer: (
          state.expandedFilterDrawer === action.filterDrawer
            ? undefined // hide
            : action.filterDrawer
        ),
      };
    }
    case ActionType.HideFilterDrawer: {
      return {
        ...state,
        expandedFilterDrawer: undefined,
      };
    }
    case ActionType.ResetFilters: {
      return {
        ...state,
        dateFilterState: action.initDateFilterState,
        contextFilterState: action.initContextFilterState,
        tagFilterState: action.initTagFilterState,
        actionErrorFilterState: action.initActionErrorFilterState,
        advancedFilterState: action.initAdvancedFilterState,
      };
    }
    case ActionType.UpdateDateFilterState: {
      return {
        ...state,
        dateFilterState: action.dateFilterState,
      };
    }
    case ActionType.UpdateContextFilterState: {
      return {
        ...state,
        contextFilterState: action.contextFilterState,
      };
    }
    case ActionType.UpdateTagFilterState: {
      return {
        ...state,
        tagFilterState: action.tagFilterState,
      };
    }
    case ActionType.UpdateActionErrorFilterState: {
      return {
        ...state,
        actionErrorFilterState: action.actionErrorFilterState,
      };
    }
    case ActionType.UpdateAdvancedFilterState: {
      return {
        ...state,
        advancedFilterState: action.advancedFilterState,
      };
    }
    case ActionType.IncrementPageNumber: {
      return {
        ...state,
        pageNumber: state.pageNumber + 1,
      };
    }
    case ActionType.DecrementPageNumber: {
      return {
        ...state,
        pageNumber: state.pageNumber - 1,
      };
    }
    case ActionType.SetHasAnotherPage: {
      return {
        ...state,
        hasAnotherPage: action.hasAnotherPage,
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

const LogReviewer: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure props
  const {
    LogMetadata,
    onClose,
  } = props;

  // Create complete map of contexts
  const contextMap: LogMetadataContextMap = {};
  [
    (LogMetadata.Context ?? {}),
    LogBuiltInMetadata.Context,
  ].forEach((partialContextMap) => {
    Object.keys(partialContextMap).forEach((context) => {
      // Add context
      contextMap[context] = (partialContextMap as any)[context];

      // If context has children, add an "uncategorized" subcontext
      if (typeof contextMap[context] !== 'string') {
        (contextMap[context] as any)[LogBuiltInMetadata.Context.Uncategorized] = (
          LogBuiltInMetadata.Context.Uncategorized
        );
      }
    });
  });

  // Create complete map of targets
  const targetMap: LogMetadataTargetMap = {};
  [
    (LogMetadata.Target ?? {}),
    LogBuiltInMetadata.Target,
  ].forEach((partialTargetMap) => {
    Object.keys(partialTargetMap).forEach((target) => {
      targetMap[target] = (partialTargetMap as any)[target];
    });
  });

  /* -------------- State ------------- */

  // Create initial date filter state
  const today = getTimeInfoInET();
  const initStartDate: DateTriple = {
    year: today.year,
    month: today.month,
    day: 1,
  };
  const initEndDate: DateTriple = {
    year: today.year,
    month: today.month,
    day: today.day,
  };
  const initDateFilterState: DateFilterState = {
    startDate: initStartDate,
    endDate: initEndDate,
  };

  // Create initial context filter state
  const initContextFilterState: ContextFilterState = {};
  Object.keys(contextMap).forEach((context) => {
    const contextValue = contextMap[context];
    if (typeof contextValue === 'string') {
      // Case: no subcontexts, init as checked
      initContextFilterState[contextValue] = true;
    } else {
      // Case: subcontexts exist
      initContextFilterState[context] = {};
      Object.values(contextMap[context]).forEach((subcontext) => {
        // Skip self ("_")
        if (subcontext === '_') {
          return;
        }

        // Initialize as checked
        (initContextFilterState[context] as any)[subcontext] = true;
      });
    }
  });

  // Create initial tag filter state
  const initTagFilterState: TagFilterState = {};
  Object.keys(LogMetadata.Tag ?? {}).forEach((tag) => {
    initTagFilterState[tag] = false;
  });

  // Create advanced filter state
  const initAdvancedFilterState: AdvancedFilterState = {
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userId: '',
    includeLearners: true,
    includeTTMs: true,
    includeAdmins: true,
    courseId: '',
    courseName: '',
    isMobile: undefined,
    source: undefined,
    routePath: '',
    routeTemplate: '',
  };

  // Create action and error filter state
  const initActionErrorFilterState: ActionErrorFilterState = {
    type: undefined,
    errorMessage: '',
    errorCode: '',
    target: {},
    action: {},
  };
  Object.values(targetMap).forEach((target) => {
    initActionErrorFilterState.target[target] = true;
  });
  Object.values(LogAction).forEach((action) => {
    initActionErrorFilterState.action[action] = true;
  });

  // Initial state
  const initialState: State = {
    loading: true,
    logs: [],
    expandedFilterDrawer: undefined,
    dateFilterState: initDateFilterState,
    contextFilterState: initContextFilterState,
    tagFilterState: initTagFilterState,
    actionErrorFilterState: initActionErrorFilterState,
    advancedFilterState: initAdvancedFilterState,
    pageNumber: 1,
    hasAnotherPage: false,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    loading,
    logs,
    expandedFilterDrawer,
    dateFilterState,
    contextFilterState,
    tagFilterState,
    actionErrorFilterState,
    advancedFilterState,
    pageNumber,
    hasAnotherPage,
  } = state;

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Fetch logs from the server based on current filters
   */
  const fetchLogs = async () => {
    dispatch({ type: ActionType.StartLoading });

    try {
      // Prepare filter parameters
      const filters = {
        dateFilterState,
        contextFilterState,
        tagFilterState,
        actionErrorFilterState,
        advancedFilterState,
      };

      // Send filters to the server
      let fetchedLogs: Log[] = [];

      const response = await visitServerEndpoint({
        path: `${LOG_REVIEW_ROUTE_PATH_PREFIX}`,
        method: 'GET',
        params: {
          pageNumber,
          filters,
        },
      });

      fetchedLogs = fetchedLogs.concat(response.items);
      dispatch({
        type: ActionType.SetHasAnotherPage,
        hasAnotherPage: response.hasAnotherPage,
      });

      // Update logs in state
      dispatch({
        type: ActionType.FinishLoading,
        logs: fetchedLogs,
      });
    } catch (err) {
      return showFatalError(err);
    }
  };

  /*------------------------------------------------------------------------*/
  /* ------------------------- Lifecycle Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Fetch logs whenever page number changes
   */
  useEffect(() => {
    fetchLogs();
  }, [
    pageNumber,
  ]);

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/
  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  // Body that will be filled with the contents of the panel
  let body: React.ReactNode;

  /* ------------- Loading ------------ */

  if (loading) {
    body = (
      <div className="text-center p-5">
        <LoadingSpinner />
      </div>
    );
  }

  /* ------------ Review UI ----------- */

  /*----------------------------------------*/
  /* ------------ Pagination -------------- */
  /*----------------------------------------*/

  const paginationControls = logs.length > 0 && (
    <div className="text-center mt-3">
      <button
        type="button"
        className="btn btn-secondary me-2"
        disabled={pageNumber <= 1}
        onClick={() => {
          dispatch({
            type: ActionType.DecrementPageNumber,
          });
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
        Previous Page
      </button>
      <span className="mx-3">
        Page
        {' '}
        {pageNumber}
      </span>
      <button
        type="button"
        className="btn btn-secondary ms-2"
        disabled={!hasAnotherPage}
        onClick={() => {
          dispatch({
            type: ActionType.IncrementPageNumber,
          });
        }}
      >
        Next Page
        <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
      </button>
    </div>
  );

  /*----------------------------------------*/
  /* --------------- Filters -------------- */
  /*----------------------------------------*/

  // Filter toggle
  const filterToggles = (
    <div className="LogReviewer-filter-toggles">
      <h3 className="m-0">
        Filters:
      </h3>
      <div className="LogReviewer-filter-toggle-buttons alert alert-secondary p-2 m-0">
        {/* Date */}
        <button
          type="button"
          id="LogReviewer-toggle-date-filter-drawer"
          className={`btn btn-${FilterDrawer.Date === expandedFilterDrawer ? 'warning' : 'light'} me-2`}
          aria-label="toggle date filter drawer"
          onClick={() => {
            dispatch({
              type: ActionType.ToggleFilterDrawer,
              filterDrawer: FilterDrawer.Date,
            });
          }}
        >
          <FontAwesomeIcon
            icon={faCalendar}
            className="me-2"
          />
          Date
        </button>
        {/* Context */}
        <button
          type="button"
          id="LogReviewer-toggle-context-filter-drawer"
          className={`btn btn-${FilterDrawer.Context === expandedFilterDrawer ? 'warning' : 'light'} me-2`}
          aria-label="toggle context filter drawer"
          onClick={() => {
            dispatch({
              type: ActionType.ToggleFilterDrawer,
              filterDrawer: FilterDrawer.Context,
            });
          }}
        >
          <FontAwesomeIcon
            icon={faCircle}
            className="me-2"
          />
          Context
        </button>
        {/* Tag */}
        {/* Skip if no tags are used */}
        {(LogMetadata.Tag && Object.keys(LogMetadata.Tag).length > 0) && (
        <button
          type="button"
          id="LogReviewer-toggle-tag-filter-drawer"
          className={`btn btn-${FilterDrawer.Tag === expandedFilterDrawer ? 'warning' : 'light'} me-2`}
          aria-label="toggle tag filter drawer"
          onClick={() => {
            dispatch({
              type: ActionType.ToggleFilterDrawer,
              filterDrawer: FilterDrawer.Tag,
            });
          }}
        >
          <FontAwesomeIcon
            icon={faTag}
            className="me-2"
          />
          Tag
        </button>
        )}
        {/* Action */}
        <button
          type="button"
          id="LogReviewer-toggle-action-filter-drawer"
          className={`btn btn-${FilterDrawer.Action === expandedFilterDrawer ? 'warning' : 'light'} me-2`}
          aria-label="toggle action and error filter drawer"
          onClick={() => {
            dispatch({
              type: ActionType.ToggleFilterDrawer,
              filterDrawer: FilterDrawer.Action,
            });
          }}
        >
          <FontAwesomeIcon
            icon={faHammer}
            className="me-2"
          />
          Action
        </button>
        {/* Advanced */}
        <button
          type="button"
          id="LogReviewer-toggle-advanced-filter-drawer"
          className={`btn btn-${FilterDrawer.Advanced === expandedFilterDrawer ? 'warning' : 'light'} me-2`}
          aria-label="toggle advanced filter drawer"
          onClick={() => {
            dispatch({
              type: ActionType.ToggleFilterDrawer,
              filterDrawer: FilterDrawer.Advanced,
            });
          }}
        >
          <FontAwesomeIcon
            icon={faList}
            className="me-2"
          />
          Advanced
        </button>
        {/* Reset */}
        <button
          type="button"
          id="LogReviewer-reset-filters-button"
          className="btn btn-light"
          aria-label="reset filters"
          onClick={() => {
            dispatch({
              type: ActionType.ResetFilters,
              initActionErrorFilterState,
              initAdvancedFilterState,
              initContextFilterState,
              initDateFilterState,
              initTagFilterState,
            });
          }}
        >
          <FontAwesomeIcon
            icon={faTimes}
          />
          {' '}
          Reset
        </button>

        {/* Submit filter changes */}
        <button
          type="button"
          id="LogReviewer-submit-filters-button"
          className="btn btn-primary ms-2"
          aria-label="submit filters"
          onClick={() => {
            dispatch({
              type: ActionType.HideFilterDrawer,
            });
            fetchLogs();
          }}
        >
          <FontAwesomeIcon
            icon={faSearch}
          />
          {' '}
          Filter
        </button>
      </div>
    </div>
  );

  // Filter drawer
  let filterDrawer: React.ReactNode;
  if (expandedFilterDrawer) {
    if (expandedFilterDrawer === FilterDrawer.Date) {
      filterDrawer = (
        <TabBox title="Date">
          <SimpleDateChooser
            ariaLabel="filter start date"
            name="filter-start-date"
            year={dateFilterState.startDate.year}
            month={dateFilterState.startDate.month}
            day={dateFilterState.startDate.day}
            chooseFromPast
            numMonthsToShow={36}
            onChange={(month, day, year) => {
              dateFilterState.startDate = { month, day, year };
              dispatch({
                type: ActionType.UpdateDateFilterState,
                dateFilterState,
              });
            }}
          />
          {' '}
          to
          {' '}
          <SimpleDateChooser
            ariaLabel="filter end date"
            name="filter-end-date"
            year={dateFilterState.endDate.year}
            month={dateFilterState.endDate.month}
            day={dateFilterState.endDate.day}
            chooseFromPast
            numMonthsToShow={12}
            onChange={(month, day, year) => {
              if (
                year < dateFilterState.startDate.year
                  || (
                    year === dateFilterState.startDate.year
                    && month < dateFilterState.startDate.month
                  )
                  || (
                    year === dateFilterState.startDate.year
                    && month === dateFilterState.startDate.month
                    && day < dateFilterState.startDate.day
                  )
              ) {
                return alert(
                  'Invalid Start Date',
                  'The start date cannot be before the end date.',
                );
              }
              dateFilterState.endDate = { month, day, year };
              dispatch({
                type: ActionType.UpdateDateFilterState,
                dateFilterState,
              });
            }}
          />
        </TabBox>
      );
    } else if (expandedFilterDrawer === FilterDrawer.Context) {
      // Create item picker items
      const builtInPickableItem: PickableItem = {
        id: 'built-in-contexts',
        name: 'Auto-logged',
        isGroup: true,
        children: [],
      };
      const pickableItems: PickableItem[] = [];
      Object.keys(contextMap)
        .forEach((context) => {
          const value = contextMap[context];
          if (typeof value === 'string') {
            // No subcategories
            const item: PickableItem = {
              id: context,
              name: genHumanReadableName(context),
              isGroup: false,
              checked: !!contextFilterState[context],
            };

            // Add built-in items to its own folder
            const isBuiltIn = context in LogBuiltInMetadata.Context;
            if (isBuiltIn) {
              // Add to built-in pickable item
              builtInPickableItem.children.push(item);
            } else {
              // Add to pickable items list
              pickableItems.push(item);
            }
            return;
          }

          // Has subcategories
          const children: PickableItem[] = (
            Object.keys(value)
            // Remove parent name
              .filter((subcontext) => {
                return subcontext !== '_';
              })
            // Create child pickable items
              .map((subcontext) => {
                return {
                  id: subcontext,
                  name: genHumanReadableName(subcontext),
                  isGroup: false,
                  checked: (contextFilterState[context] as any)[subcontext],
                };
              })
          );
          const item: PickableItem = {
            id: context,
            name: genHumanReadableName(context),
            isGroup: true,
            children,
          };
          pickableItems.push(item);
        });
      // Add built-in contexts to end ofl ist
      pickableItems.push(builtInPickableItem);

      // Create filter UI
      filterDrawer = (
        <ItemPicker
          title="Context"
          items={pickableItems}
          onChanged={(updatedItems) => {
            // Update our state
            updatedItems.forEach((pickableItem) => {
              if (pickableItem.isGroup) {
                // Has subcontexts

                if (pickableItem.id === 'built-in-contexts') {
                  // Built-in

                  // Treat as if these were top-level contexts
                  pickableItem.children.forEach((subcontextItem) => {
                    contextFilterState[subcontextItem.id] = (
                      'checked' in subcontextItem
                        && subcontextItem.checked
                    );
                  });
                } else {
                  // Not built-in
                  pickableItem.children.forEach((subcontextItem) => {
                    if (!subcontextItem.isGroup) {
                      (
                        contextFilterState[pickableItem.id] as { [k: string]: boolean }
                      )[subcontextItem.id] = (
                        subcontextItem.checked
                      );
                    }
                  });
                }
              } else {
                // No subcontexts
                (contextFilterState as any)[pickableItem.id] = (
                  pickableItem.checked
                );
              }
            });
            dispatch({
              type: ActionType.UpdateContextFilterState,
              contextFilterState,
            });
          }}
        />
      );
    } else if (expandedFilterDrawer === FilterDrawer.Tag) {
      // Create filter UI
      filterDrawer = (
        <TabBox title="Tags">
          <div>
            If any tags are selected, logs must contain at least one
            (but not necessarily all) of the
            selected tags.
          </div>
          <div className="d-flex gap-1 flex-wrap">
            {
                Object.keys(LogMetadata.Tag ?? {})
                  .map((tag) => {
                    const description = genHumanReadableName(tag);
                    return (
                      <CheckboxButton
                        key={tag}
                        id={`LogReviewer-tag-${tag}-checkbox`}
                        text={description}
                        ariaLabel={`require that logs be tagged with "${description}" or any other selected tag`}
                        checked={tagFilterState[tag]}
                        onChanged={(checked) => {
                          tagFilterState[tag] = checked;
                          dispatch({
                            type: ActionType.UpdateTagFilterState,
                            tagFilterState,
                          });
                        }}
                      />
                    );
                  })
              }
          </div>
        </TabBox>
      );
    } else if (expandedFilterDrawer === FilterDrawer.Action) {
      // Create filter UI
      filterDrawer = (
        <>
          {/* Log Type */}
          <TabBox title="Log Type">
            <RadioButton
              id="LogReviewer-type-all"
              text="All Logs"
              onSelected={() => {
                actionErrorFilterState.type = undefined;
                dispatch({
                  type: ActionType.UpdateActionErrorFilterState,
                  actionErrorFilterState,
                });
              }}
              ariaLabel="show logs of all types"
              selected={actionErrorFilterState.type === undefined}
            />
            <RadioButton
              id="LogReviewer-type-action-only"
              text="Action Logs Only"
              onSelected={() => {
                actionErrorFilterState.type = LogType.Action;
                dispatch({
                  type: ActionType.UpdateActionErrorFilterState,
                  actionErrorFilterState,
                });
              }}
              ariaLabel="only show action logs"
              selected={actionErrorFilterState.type === LogType.Action}
            />
            <RadioButton
              id="LogReviewer-type-error-only"
              text="Action Error Only"
              onSelected={() => {
                actionErrorFilterState.type = LogType.Error;
                dispatch({
                  type: ActionType.UpdateActionErrorFilterState,
                  actionErrorFilterState,
                });
              }}
              ariaLabel="only show error logs"
              selected={actionErrorFilterState.type === LogType.Error}
              noMarginOnRight
            />
          </TabBox>
          {/* Actions */}
          {
              (
                actionErrorFilterState.type === undefined
                || actionErrorFilterState.type === LogType.Action
              ) && (
                <TabBox title="Action Log Details">
                  {/* Action */}
                  <ButtonInputGroup
                    label="Action"
                    className="mb-2"
                    wrapButtonsAndAddGaps
                  >
                    {
                      Object.keys(LogAction)
                        .map((action) => {
                          const description = genHumanReadableName(action);
                          return (
                            <CheckboxButton
                              key={action}
                              id={`LogReviewer-action-${action}-checkbox`}
                              text={description}
                              ariaLabel={`include logs with action type "${description}" in results`}
                              noMarginOnRight
                              checked={actionErrorFilterState.action[action]}
                              onChanged={(checked) => {
                                actionErrorFilterState.action[action] = checked;
                                dispatch({
                                  type: ActionType.UpdateActionErrorFilterState,
                                  actionErrorFilterState,
                                });
                              }}
                            />
                          );
                        })
                    }
                  </ButtonInputGroup>
                  {/* Target */}
                  <ButtonInputGroup
                    label="Target"
                    wrapButtonsAndAddGaps
                  >
                    {/* List of targets */}
                    {
                      Object.keys(targetMap)
                        .map((target) => {
                          const description = genHumanReadableName(target);
                          return (
                            <CheckboxButton
                              key={target}
                              id={`LogReviewer-target-${target}-checkbox`}
                              text={description}
                              ariaLabel={`include logs with target "${description}" in results`}
                              checked={actionErrorFilterState.target[target]}
                              noMarginOnRight
                              onChanged={(checked) => {
                                actionErrorFilterState.target[target] = checked;
                                dispatch({
                                  type: ActionType.UpdateActionErrorFilterState,
                                  actionErrorFilterState,
                                });
                              }}
                            />
                          );
                        })
                    }
                  </ButtonInputGroup>
                </TabBox>
              )
            }
          {/* Errors */}
          {
              (
                actionErrorFilterState.type === undefined
                || actionErrorFilterState.type === LogType.Error
              ) && (
                <TabBox title="Error Log Details">
                  {/* Message */}
                  <div className="input-group mb-2">
                    <span className="input-group-text">
                      Error Message
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="query for error message"
                      value={actionErrorFilterState.errorMessage}
                      placeholder="e.g. undefined is not a function"
                      onChange={(e) => {
                        actionErrorFilterState.errorMessage = e.target.value;
                        dispatch({
                          type: ActionType.UpdateActionErrorFilterState,
                          actionErrorFilterState,
                        });
                      }}
                    />
                  </div>
                  {/* Code */}
                  <div className="input-group mb-2">
                    <span className="input-group-text">
                      Error Code
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="query for error code"
                      value={actionErrorFilterState.errorCode}
                      placeholder="e.g. GC22"
                      onChange={(e) => {
                        actionErrorFilterState.errorCode = (
                          (e.target.value)
                            .trim()
                            .toUpperCase()
                        );
                        dispatch({
                          type: ActionType.UpdateActionErrorFilterState,
                          actionErrorFilterState,
                        });
                      }}
                    />
                  </div>
                </TabBox>
              )
            }
        </>
      );
    } else if (expandedFilterDrawer === FilterDrawer.Advanced) {
      // Create advanced filter ui
      filterDrawer = (
        <>
          {/* User Info */}
          <TabBox title="User">
            {/* First Name */}
            <div className="input-group mb-2">
              <span className="input-group-text">
                User First Name
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="query for user first name"
                value={advancedFilterState.userFirstName}
                placeholder="e.g. Divardo"
                onChange={(e) => {
                  advancedFilterState.userFirstName = e.target.value;
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
              />
            </div>
            {/* Last Name */}
            <div className="input-group mb-2">
              <span className="input-group-text">
                User Last Name
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="query for user last name"
                value={advancedFilterState.userLastName}
                placeholder="e.g. Calicci"
                onChange={(e) => {
                  advancedFilterState.userLastName = e.target.value;
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
              />
            </div>
            {/* Email */}
            <div className="input-group mb-2">
              <span className="input-group-text">
                User Email
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="query for user email"
                value={advancedFilterState.userEmail}
                placeholder="e.g. calicci@fas.harvard.edu"
                onChange={(e) => {
                  advancedFilterState.userEmail = (
                    (e.target.value)
                      .trim()
                  );
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
              />
            </div>
            {/* Canvas Id */}
            <div className="input-group mb-2">
              <span className="input-group-text">
                User Canvas Id
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="query for user canvas id"
                value={advancedFilterState.userId}
                placeholder="e.g. 104985"
                onChange={(e) => {
                  const { value } = e.target;
                  // Only update if value contains only numbers
                  if (/^\d+$/.test(value)) {
                    advancedFilterState.userId = (
                      (e.target.value)
                        .trim()
                    );
                  }
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
              />
            </div>
            {/* Role */}
            <ButtonInputGroup label="Role">
              <CheckboxButton
                text="Students"
                onChanged={(checked) => {
                  advancedFilterState.includeLearners = checked;
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
                checked={advancedFilterState.includeLearners}
                ariaLabel="show logs from students"
              />
              <CheckboxButton
                text="Teaching Team Members"
                onChanged={(checked) => {
                  advancedFilterState.includeTTMs = checked;
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
                checked={advancedFilterState.includeTTMs}
                ariaLabel="show logs from teaching team members"
              />
              <CheckboxButton
                text="Admins"
                onChanged={(checked) => {
                  advancedFilterState.includeAdmins = checked;
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
                checked={advancedFilterState.includeAdmins}
                ariaLabel="show logs from admins"
              />
            </ButtonInputGroup>
          </TabBox>

          {/* Course Info */}
          <TabBox title="Course">
            {/* Name */}
            <div className="input-group mb-2">
              <span className="input-group-text">
                Course Name
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="query for course name"
                value={advancedFilterState.courseName}
                placeholder="e.g. GLC 200"
                onChange={(e) => {
                  advancedFilterState.courseName = e.target.value;
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
              />
            </div>
            {/* Canvas Id */}
            <div className="input-group mb-2">
              <span className="input-group-text">
                Course Canvas Id
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="query for course canvas id"
                value={advancedFilterState.courseId}
                placeholder="e.g. 15948"
                onChange={(e) => {
                  const { value } = e.target;
                  // Only update if value contains only numbers
                  if (/^\d+$/.test(value)) {
                    advancedFilterState.courseId = (
                      (e.target.value)
                        .trim()
                    );
                  }
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
              />
            </div>
          </TabBox>

          {/* Device Info */}
          <TabBox title="Device">
            <ButtonInputGroup label="Device Type">
              <RadioButton
                text="All Devices"
                ariaLabel="show logs from all devices"
                selected={advancedFilterState.isMobile === undefined}
                onSelected={() => {
                  advancedFilterState.isMobile = undefined;
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
              />
              <RadioButton
                text="Mobile Only"
                ariaLabel="show logs from mobile devices"
                selected={advancedFilterState.isMobile === true}
                onSelected={() => {
                  advancedFilterState.isMobile = true;
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
              />
              <RadioButton
                text="Desktop Only"
                ariaLabel="show logs from desktop devices"
                selected={advancedFilterState.isMobile === false}
                onSelected={() => {
                  advancedFilterState.isMobile = false;
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
                noMarginOnRight
              />
            </ButtonInputGroup>
          </TabBox>

          {/* Source */}
          <TabBox title="Source">
            <ButtonInputGroup label="Source Type">
              <RadioButton
                text="Both"
                ariaLabel="show logs from all sources"
                selected={advancedFilterState.source === undefined}
                onSelected={() => {
                  advancedFilterState.source = undefined;
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
              />
              <RadioButton
                text="Client Only"
                ariaLabel="show logs from client source"
                selected={advancedFilterState.source === LogSource.Client}
                onSelected={() => {
                  advancedFilterState.source = LogSource.Client;
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
              />
              <RadioButton
                text="Server Only"
                ariaLabel="show logs from server source"
                selected={advancedFilterState.source === LogSource.Server}
                onSelected={() => {
                  advancedFilterState.source = LogSource.Server;
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState,
                  });
                }}
                noMarginOnRight
              />
            </ButtonInputGroup>

            {/* Server filters */}
            {advancedFilterState.source !== LogSource.Client && (
            <div className="mt-2">
              {/* Route path */}
              <div className="input-group mb-2">
                <span className="input-group-text">
                  Server Route Path
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="query for server route path"
                  value={advancedFilterState.routePath}
                  placeholder="e.g. /api/ttm/courses/12345"
                  onChange={(e) => {
                    advancedFilterState.courseName = (
                      (e.target.value)
                        .trim()
                    );
                    dispatch({
                      type: ActionType.UpdateAdvancedFilterState,
                      advancedFilterState,
                    });
                  }}
                />
              </div>

              {/* Route template */}
              <div className="input-group mb-2">
                <span className="input-group-text">
                  Server Route Template
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="query for server route template"
                  value={advancedFilterState.routeTemplate}
                  placeholder="e.g. /api/ttm/courses/:courseId"
                  onChange={(e) => {
                    advancedFilterState.courseName = (
                      (e.target.value)
                        .trim()
                    );
                    dispatch({
                      type: ActionType.UpdateAdvancedFilterState,
                      advancedFilterState,
                    });
                  }}
                />
              </div>
            </div>
            )}
          </TabBox>
        </>
      );
    }
  }

  // Filters UI
  const filters = (
    <>
      {filterToggles}
      {filterDrawer && (
      <Drawer customBackgroundColor="#eee">
        {filterDrawer}
      </Drawer>
      )}
    </>
  );

  // Main body
  body = (
    <>
      {filters}
      <div className="mt-2">
        <IntelliTable
          title="Matching Logs:"
          csvName={`Logs from ${getHumanReadableDate()}`}
          id="logs"
          data={logs}
          columns={columns}
        />
        {logs.length === 0 && (
          <div className="alert alert-warning text-center mt-2">
            <h4 className="m-1">No Logs to Show</h4>
            <div>
              Either your filters are too strict or no matching logs have been
              created yet.
            </div>
          </div>
        )}
        {paginationControls}
      </div>
    </>
  );

  /* ---------- Wrap in Modal --------- */

  return (
    <div className="LogReviewer-outer-container">
      {/* Style */}
      <style>{style}</style>

      <div className="LogReviewer-inner-container">
        <div className="LogReviewer-header">
          <div className="LogReviewer-header-title">
            <h3 className="text-center m-0">Log Review Dashboard</h3>
          </div>
          <div style={{ width: 0 }}>
            <button
              type="button"
              className="LogReviewer-header-close-button btn btn-dark btn-lg pe-0"
              aria-label="close log reviewer panel"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
        <div className="LogReviewer-contents">{body}</div>
      </div>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default LogReviewer;
