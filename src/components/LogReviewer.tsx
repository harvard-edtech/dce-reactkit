/**
 * Log reviewer panel that allows users (must be approved admins) to
 *   review logs written by dce-reactkit
 * @author Gabe Abrams
 */

// Import React
import React, { useEffect, useReducer, useRef } from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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
import LOG_REVIEW_GET_LOGS_ROUTE from '../constants/LOG_REVIEW_GET_LOGS_ROUTE';

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
import LogReviewerFilterState from '../types/LogReviewerFilterState';
import DateFilterState from '../types/LogReviewerFilterState/DateFilterState';
import ContextFilterState from '../types/LogReviewerFilterState/ContextFilterState';
import TagFilterState from '../types/LogReviewerFilterState/TagFilterState';
import ActionErrorFilterState from '../types/LogReviewerFilterState/ActionErrorFilterState';
import AdvancedFilterState from '../types/LogReviewerFilterState/AdvancedFilterState';
import Variant from '../types/Variant';

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
import Pagination from './Pagination';
import cloneDeep from '../helpers/cloneDeep';

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
  // True if currently loading new logs
  loading: boolean,
  // Loaded logs
  logs: Log[],
  /* ------------- Filters ------------ */
  // Current expanded filter drawer
  expandedFilterDrawer: FilterDrawer | undefined,
  // State of date filters
  pendingDateFilterState: DateFilterState,
  // State of context filters
  pendingContextFilterState: ContextFilterState,
  // State of tag filters
  pendingTagFilterState: TagFilterState,
  // State of the action and error filter
  pendingActionErrorFilterState: ActionErrorFilterState,
  // State of the advanced filter
  pendingAdvancedFilterState: AdvancedFilterState,
  // Current page number
  pageNumber: number,
  // If true, there is another page to load
  hasAnotherPage: boolean,
  // Total number of pages
  numPages: number,
  // If true, filters have changed
  userMadeFilterChange: boolean,
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
  // Set has another page
  SetHasAnotherPage = 'set-has-another-page',
  // Set the number of pages
  SetNumPages = 'set-num-pages',
  // Set page number
  SetPageNumber = 'set-page-number',
  // Reset user made filter change indicator
  ResetUserMadeFilterChange = 'reset-user-made-filter-change',
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
    type: ActionType.SetHasAnotherPage,
    hasAnotherPage: boolean,
  }
  | {
    type: ActionType.SetNumPages,
    numPages: number,
  }
  | {
    type: ActionType.SetPageNumber,
    pageNumber: number,
  }
  | {
    type: ActionType.StartLoading,
  }
  | {
    // Action type
    type: (
      | ActionType.HideFilterDrawer
      | ActionType.ResetUserMadeFilterChange
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
        pendingDateFilterState: action.initDateFilterState,
        pendingContextFilterState: action.initContextFilterState,
        pendingTagFilterState: action.initTagFilterState,
        pendingActionErrorFilterState: action.initActionErrorFilterState,
        pendingAdvancedFilterState: action.initAdvancedFilterState,
        pageNumber: 1,
      };
    }
    case ActionType.UpdateDateFilterState: {
      return {
        ...state,
        pendingDateFilterState: action.dateFilterState,
        userMadeFilterChange: true,
      };
    }
    case ActionType.UpdateContextFilterState: {
      return {
        ...state,
        pendingContextFilterState: action.contextFilterState,
        userMadeFilterChange: true,
      };
    }
    case ActionType.UpdateTagFilterState: {
      return {
        ...state,
        pendingTagFilterState: action.tagFilterState,
        userMadeFilterChange: true,
      };
    }
    case ActionType.UpdateActionErrorFilterState: {
      return {
        ...state,
        pendingActionErrorFilterState: action.actionErrorFilterState,
        userMadeFilterChange: true,
      };
    }
    case ActionType.UpdateAdvancedFilterState: {
      return {
        ...state,
        pendingAdvancedFilterState: action.advancedFilterState,
        userMadeFilterChange: true,
      };
    }
    case ActionType.SetHasAnotherPage: {
      return {
        ...state,
        hasAnotherPage: action.hasAnotherPage,
      };
    }
    case ActionType.SetNumPages: {
      return {
        ...state,
        numPages: action.numPages,
      };
    }
    case ActionType.SetPageNumber: {
      return {
        ...state,
        pageNumber: action.pageNumber,
      };
    }
    case ActionType.ResetUserMadeFilterChange: {
      return {
        ...state,
        userMadeFilterChange: false,
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
        (contextMap[context] as any)[
          LogBuiltInMetadata.Context.Uncategorized
        ] = (
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
      Object.keys(contextMap[context]).forEach((subcontext) => {
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
    pendingDateFilterState: initDateFilterState,
    pendingContextFilterState: initContextFilterState,
    pendingTagFilterState: initTagFilterState,
    pendingActionErrorFilterState: initActionErrorFilterState,
    pendingAdvancedFilterState: initAdvancedFilterState,
    pageNumber: 1,
    hasAnotherPage: false,
    numPages: 1,
    userMadeFilterChange: false,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    loading,
    logs,
    expandedFilterDrawer,
    pendingDateFilterState,
    pendingContextFilterState,
    pendingTagFilterState,
    pendingActionErrorFilterState,
    pendingAdvancedFilterState,
    pageNumber,
    numPages,
    userMadeFilterChange,
  } = state;

  /* -------------- Refs -------------- */

  // Initialize refs
  const activeFiltersRef = useRef({
    dateFilterState: JSON.parse(JSON.stringify(pendingDateFilterState)),
    contextFilterState: JSON.parse(JSON.stringify(pendingContextFilterState)),
    tagFilterState: JSON.parse(JSON.stringify(pendingTagFilterState)),
    actionErrorFilterState: JSON.parse(JSON.stringify(pendingActionErrorFilterState)),
    advancedFilterState: JSON.parse(JSON.stringify(pendingAdvancedFilterState)),
  });

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Fetch logs from the server based on current filters
   * @author Yuen Ler Chow
   * @param opts object containing all arguments
   * @param opts.filters the filters to apply
   * @param opts.pageNum the page number to fetch
   * @param opts.filtersChanged if true, the filters have changed
   */
  const fetchLogs = async (
    opts: {
      filters: LogReviewerFilterState,
      pageNum: number,
      filtersChanged: boolean,
    },
  ) => {
    const {
      filters,
      pageNum,
      filtersChanged,
    } = opts;

    dispatch({
      type: ActionType.StartLoading,
    });

    try {
      // Send filters to the server
      let fetchedLogs: Log[] = [];

      // Get logs from server
      const response = await visitServerEndpoint({
        path: LOG_REVIEW_GET_LOGS_ROUTE,
        method: 'GET',
        params: {
          pageNumber: pageNum,
          filters,
          countDocuments: filtersChanged,
        },
      });

      fetchedLogs = fetchedLogs.concat(response.items);
      dispatch({
        type: ActionType.SetHasAnotherPage,
        hasAnotherPage: response.hasAnotherPage,
      });

      if (filtersChanged && response.numPages !== undefined) {
        dispatch({
          type: ActionType.SetNumPages,
          numPages: response.numPages,
        });
      }

      // Update logs in state
      dispatch({
        type: ActionType.FinishLoading,
        logs: fetchedLogs,
      });

      // Update page number
      dispatch({
        type: ActionType.SetPageNumber,
        pageNumber: pageNum,
      });
    } catch (err) {
      return showFatalError(err);
    }
  };

  /*------------------------------------------------------------------------*/
  /* ------------------------- Lifecycle Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Fetch logs on mount
   * @author Yuen Ler Chow
   */
  useEffect(() => {
    fetchLogs({
      filters: {
        dateFilterState: pendingDateFilterState,
        contextFilterState: pendingContextFilterState,
        tagFilterState: pendingTagFilterState,
        actionErrorFilterState: pendingActionErrorFilterState,
        advancedFilterState: pendingAdvancedFilterState,
      },
      pageNum: 1,
      filtersChanged: true,
    });
  }, []);

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/
  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  /*----------------------------------------*/
  /* ------------ Pagination -------------- */
  /*----------------------------------------*/

  const paginationControls = logs.length > 0 && (
    <Pagination
      currentPage={pageNumber}
      numPages={numPages}
      loading={loading}
      onPageChanged={(targetPage) => {
        const { current: activeFilters } = activeFiltersRef;
        fetchLogs({
          filters: {
            dateFilterState: activeFilters.dateFilterState,
            contextFilterState: activeFilters.contextFilterState,
            tagFilterState: activeFilters.tagFilterState,
            actionErrorFilterState: activeFilters.actionErrorFilterState,
            advancedFilterState: activeFilters.advancedFilterState,
          },
          pageNum: targetPage,
          filtersChanged: false,
        });
      }}
    />
  );

  /*----------------------------------------*/
  /* --------------- Filters -------------- */
  /*----------------------------------------*/

  // Filter toggle
  const filterToggles = (
    <div className="LogReviewer-filter-toggles">
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
            // Save active filters
            // Deep clone the initial filter states to avoid any reference issues
            // if the filter states are modified later
            activeFiltersRef.current = cloneDeep({
              dateFilterState: initDateFilterState,
              contextFilterState: initContextFilterState,
              tagFilterState: initTagFilterState,
              actionErrorFilterState: initActionErrorFilterState,
              advancedFilterState: initAdvancedFilterState,
            });
            fetchLogs(
              {
                filters: {
                  dateFilterState: initDateFilterState,
                  contextFilterState: initContextFilterState,
                  tagFilterState: initTagFilterState,
                  actionErrorFilterState: initActionErrorFilterState,
                  advancedFilterState: initAdvancedFilterState,
                },
                pageNum: 1,
                filtersChanged: true,
              },
            );
            dispatch({
              type: ActionType.ResetFilters,
              initActionErrorFilterState,
              initAdvancedFilterState,
              initContextFilterState,
              initDateFilterState,
              initTagFilterState,
            });
            dispatch({
              type: ActionType.HideFilterDrawer,
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
        { userMadeFilterChange && (
        <button
          type="button"
          id="LogReviewer-submit-filters-button"
          className="btn btn-primary ms-2"
          aria-label="submit filters"
          onClick={() => {
            dispatch({
              type: ActionType.HideFilterDrawer,
            });

            // Reset user made filter change indicator
            dispatch({
              type: ActionType.ResetUserMadeFilterChange,
            });

            // Save active filters
            // Deep clone the pending filter states to avoid any reference issues
            // if the filter states are modified later
            activeFiltersRef.current = cloneDeep({
              dateFilterState: pendingDateFilterState,
              contextFilterState: pendingContextFilterState,
              tagFilterState: pendingTagFilterState,
              actionErrorFilterState: pendingActionErrorFilterState,
              advancedFilterState: pendingAdvancedFilterState,
            });

            fetchLogs(
              {
                filters: {
                  dateFilterState: pendingDateFilterState,
                  contextFilterState: pendingContextFilterState,
                  tagFilterState: pendingTagFilterState,
                  actionErrorFilterState: pendingActionErrorFilterState,
                  advancedFilterState: pendingAdvancedFilterState,
                },
                pageNum: 1,
                filtersChanged: true,
              },
            );
          }}
        >
          <FontAwesomeIcon
            icon={faSearch}
          />
          {' '}
          Apply Filters
        </button>
        )}
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
            year={pendingDateFilterState.startDate.year}
            month={pendingDateFilterState.startDate.month}
            day={pendingDateFilterState.startDate.day}
            chooseFromPast
            numMonthsToShow={36}
            onChange={(month, day, year) => {
              const newDateFilterState = {
                ...pendingDateFilterState,
                startDate: { month, day, year },
              };
              dispatch({
                type: ActionType.UpdateDateFilterState,
                dateFilterState: newDateFilterState,
              });
            }}
          />
          {' '}
          to
          {' '}
          <SimpleDateChooser
            ariaLabel="filter end date"
            name="filter-end-date"
            year={pendingDateFilterState.endDate.year}
            month={pendingDateFilterState.endDate.month}
            day={pendingDateFilterState.endDate.day}
            chooseFromPast
            numMonthsToShow={12}
            onChange={(month, day, year) => {
              if (
                year < pendingDateFilterState.startDate.year
                  || (
                    year === pendingDateFilterState.startDate.year
                    && month < pendingDateFilterState.startDate.month
                  )
                  || (
                    year === pendingDateFilterState.startDate.year
                    && month === pendingDateFilterState.startDate.month
                    && day < pendingDateFilterState.startDate.day
                  )
              ) {
                return alert(
                  'Invalid End Date',
                  'The end date cannot be before the start date.',
                );
              }
              const newDateFilterState = {
                ...pendingDateFilterState,
                endDate: { month, day, year },
              };
              dispatch({
                type: ActionType.UpdateDateFilterState,
                dateFilterState: newDateFilterState,
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
              checked: !!pendingContextFilterState[context],
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
                return (subcontext !== '_');
              })
            // Create child pickable items
              .map((subcontext) => {
                return {
                  id: subcontext,
                  name: genHumanReadableName(subcontext),
                  isGroup: false,
                  checked: (pendingContextFilterState[context] as any)[subcontext],
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
      // Add built-in contexts to end of list
      pickableItems.push(builtInPickableItem);

      // Create filter UI
      filterDrawer = (
        <ItemPicker
          title="Context"
          items={pickableItems}
          onChanged={(updatedItems) => {
            // Update our state
            const newContextFilterState = { ...pendingContextFilterState };
            updatedItems.forEach((pickableItem) => {
              if (pickableItem.isGroup) {
                // Has subcontexts

                if (pickableItem.id === 'built-in-contexts') {
                  // Built-in

                  // Treat as if these were top-level contexts
                  pickableItem.children.forEach((subcontextItem) => {
                    newContextFilterState[subcontextItem.id] = (
                      'checked' in subcontextItem
                        && subcontextItem.checked
                    );
                  });
                } else {
                  // Not built-in
                  pickableItem.children.forEach((subcontextItem) => {
                    if (!subcontextItem.isGroup) {
                      (
                        newContextFilterState[pickableItem.id] as {
                          [k: string]: boolean
                        }
                      )[subcontextItem.id] = (
                        subcontextItem.checked
                      );
                    }
                  });
                }
              } else {
                // No subcontexts
                (newContextFilterState as any)[pickableItem.id] = (
                  pickableItem.checked
                );
              }
            });

            // Update state
            dispatch({
              type: ActionType.UpdateContextFilterState,
              contextFilterState: newContextFilterState,
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
            (but not necessarily all) of the selected tags.
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
                        checked={pendingTagFilterState[tag]}
                        onChanged={(checked) => {
                          const newTagFilterState = {
                            ...pendingTagFilterState,
                            [tag]: checked,
                          };
                          dispatch({
                            type: ActionType.UpdateTagFilterState,
                            tagFilterState: newTagFilterState,
                          });
                        }}
                        checkedVariant={Variant.Light}
                        uncheckedVariant={Variant.Light}
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
                const newActionErrorFilterState = {
                  ...pendingActionErrorFilterState,
                  type: undefined,
                };
                dispatch({
                  type: ActionType.UpdateActionErrorFilterState,
                  actionErrorFilterState: newActionErrorFilterState,
                });
              }}
              ariaLabel="show logs of all types"
              selected={pendingActionErrorFilterState.type === undefined}
              unselectedVariant={Variant.Light}
            />
            <RadioButton
              id="LogReviewer-type-action-only"
              text="Action Logs Only"
              onSelected={() => {
                const newActionErrorFilterState = {
                  ...pendingActionErrorFilterState,
                  type: LogType.Action,
                };
                dispatch({
                  type: ActionType.UpdateActionErrorFilterState,
                  actionErrorFilterState: newActionErrorFilterState,
                });
              }}
              ariaLabel="only show action logs"
              selected={pendingActionErrorFilterState.type === LogType.Action}
              unselectedVariant={Variant.Light}
            />
            <RadioButton
              id="LogReviewer-type-error-only"
              text="Action Error Only"
              onSelected={() => {
                const newActionErrorFilterState = {
                  ...pendingActionErrorFilterState,
                  type: LogType.Error,
                };
                dispatch({
                  type: ActionType.UpdateActionErrorFilterState,
                  actionErrorFilterState: newActionErrorFilterState,
                });
              }}
              ariaLabel="only show error logs"
              selected={pendingActionErrorFilterState.type === LogType.Error}
              noMarginOnRight
              selectedVariant={Variant.Light}
              unselectedVariant={Variant.Light}
            />
          </TabBox>
          {/* Actions */}
          {
              (
                pendingActionErrorFilterState.type === undefined
                || pendingActionErrorFilterState.type === LogType.Action
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
                              checked={pendingActionErrorFilterState.action[action]}
                              onChanged={(checked) => {
                                const newActionErrorFilterState = {
                                  ...pendingActionErrorFilterState,
                                  action: {
                                    ...pendingActionErrorFilterState.action,
                                    [action]: checked,
                                  },
                                };
                                dispatch({
                                  type: ActionType.UpdateActionErrorFilterState,
                                  actionErrorFilterState: newActionErrorFilterState,
                                });
                              }}
                              checkedVariant={Variant.Light}
                              uncheckedVariant={Variant.Light}
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
                              checked={pendingActionErrorFilterState.target[target]}
                              noMarginOnRight
                              onChanged={(checked) => {
                                const newActionErrorFilterState = {
                                  ...pendingActionErrorFilterState,
                                  target: {
                                    ...pendingActionErrorFilterState.target,
                                    [target]: checked,
                                  },
                                };
                                dispatch({
                                  type: ActionType.UpdateActionErrorFilterState,
                                  actionErrorFilterState: newActionErrorFilterState,
                                });
                              }}
                              checkedVariant={Variant.Light}
                              uncheckedVariant={Variant.Light}
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
                pendingActionErrorFilterState.type === undefined
                || pendingActionErrorFilterState.type === LogType.Error
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
                      value={pendingActionErrorFilterState.errorMessage}
                      placeholder="e.g. undefined is not a function"
                      onChange={(e) => {
                        const newActionErrorFilterState = {
                          ...pendingActionErrorFilterState,
                          errorMessage: e.target.value,
                        };
                        dispatch({
                          type: ActionType.UpdateActionErrorFilterState,
                          actionErrorFilterState: newActionErrorFilterState,
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
                      value={pendingActionErrorFilterState.errorCode}
                      placeholder="e.g. GC22"
                      onChange={(e) => {
                        const newActionErrorFilterState = {
                          ...pendingActionErrorFilterState,
                          errorCode: (
                            (e.target.value)
                              .trim()
                              .toUpperCase()
                          ),
                        };
                        dispatch({
                          type: ActionType.UpdateActionErrorFilterState,
                          actionErrorFilterState: newActionErrorFilterState,
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
                value={pendingAdvancedFilterState.userFirstName}
                placeholder="e.g. Divardo"
                onChange={(e) => {
                  const newAdvancedFilterState = {
                    ...pendingAdvancedFilterState,
                    userFirstName: e.target.value,
                  };
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState: newAdvancedFilterState,
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
                value={pendingAdvancedFilterState.userLastName}
                placeholder="e.g. Calicci"
                onChange={(e) => {
                  const newAdvancedFilterState = {
                    ...pendingAdvancedFilterState,
                    userLastName: e.target.value,
                  };
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState: newAdvancedFilterState,
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
                value={pendingAdvancedFilterState.userEmail}
                placeholder="e.g. calicci@fas.harvard.edu"
                onChange={(e) => {
                  const newAdvancedFilterState = {
                    ...pendingAdvancedFilterState,
                    userEmail: (
                      (e.target.value)
                        .trim()
                    ),
                  };
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState: newAdvancedFilterState,
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
                value={pendingAdvancedFilterState.userId}
                placeholder="e.g. 104985"
                onChange={(e) => {
                  const { value } = e.target;
                  // Only update if value contains only numbers
                  if (/^\d+$/.test(value) || value === '') {
                    const newAdvancedFilterState = {
                      ...pendingAdvancedFilterState,
                      userId: (
                        (e.target.value)
                          .trim()
                      ),
                    };
                    dispatch({
                      type: ActionType.UpdateAdvancedFilterState,
                      advancedFilterState: newAdvancedFilterState,
                    });
                  }
                }}
              />
            </div>
            {/* Role */}
            <ButtonInputGroup label="Role">
              <CheckboxButton
                text="Students"
                onChanged={(checked) => {
                  const newAdvancedFilterState = {
                    ...pendingAdvancedFilterState,
                    includeLearners: checked,
                  };
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState: newAdvancedFilterState,
                  });
                }}
                checked={pendingAdvancedFilterState.includeLearners}
                ariaLabel="show logs from students"
                checkedVariant={Variant.Light}
                uncheckedVariant={Variant.Light}
              />
              <CheckboxButton
                text="Teaching Team Members"
                onChanged={(checked) => {
                  const newAdvancedFilterState = {
                    ...pendingAdvancedFilterState,
                    includeTTMs: checked,
                  };
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState: newAdvancedFilterState,
                  });
                }}
                checked={pendingAdvancedFilterState.includeTTMs}
                ariaLabel="show logs from teaching team members"
                checkedVariant={Variant.Light}
                uncheckedVariant={Variant.Light}
              />
              <CheckboxButton
                text="Admins"
                onChanged={(checked) => {
                  const newAdvancedFilterState = {
                    ...pendingAdvancedFilterState,
                    includeAdmins: checked,
                  };
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState: newAdvancedFilterState,
                  });
                }}
                checked={pendingAdvancedFilterState.includeAdmins}
                ariaLabel="show logs from admins"
                checkedVariant={Variant.Light}
                uncheckedVariant={Variant.Light}
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
                value={pendingAdvancedFilterState.courseName}
                placeholder="e.g. GLC 200"
                onChange={(e) => {
                  const newAdvancedFilterState = {
                    ...pendingAdvancedFilterState,
                    courseName: e.target.value,
                  };
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState: newAdvancedFilterState,
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
                value={pendingAdvancedFilterState.courseId}
                placeholder="e.g. 15948"
                onChange={(e) => {
                  const { value } = e.target;
                  // Only update if value contains only numbers
                  if (/^\d+$/.test(value) || value === '') {
                    const newAdvancedFilterState = {
                      ...pendingAdvancedFilterState,
                      courseId: (
                        (e.target.value)
                          .trim()
                      ),
                    };
                    dispatch({
                      type: ActionType.UpdateAdvancedFilterState,
                      advancedFilterState: newAdvancedFilterState,
                    });
                  }
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
                selected={pendingAdvancedFilterState.isMobile === undefined}
                onSelected={() => {
                  const newAdvancedFilterState = {
                    ...pendingAdvancedFilterState,
                    isMobile: undefined,
                  };
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState: newAdvancedFilterState,
                  });
                }}
                selectedVariant={Variant.Light}
                unselectedVariant={Variant.Light}
              />
              <RadioButton
                text="Mobile Only"
                ariaLabel="show logs from mobile devices"
                selected={pendingAdvancedFilterState.isMobile === true}
                onSelected={() => {
                  const newAdvancedFilterState = {
                    ...pendingAdvancedFilterState,
                    isMobile: true,
                  };
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState: newAdvancedFilterState,
                  });
                }}
                selectedVariant={Variant.Light}
                unselectedVariant={Variant.Light}
              />
              <RadioButton
                text="Desktop Only"
                ariaLabel="show logs from desktop devices"
                selected={pendingAdvancedFilterState.isMobile === false}
                onSelected={() => {
                  const newAdvancedFilterState = {
                    ...pendingAdvancedFilterState,
                    isMobile: false,
                  };
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState: newAdvancedFilterState,
                  });
                }}
                noMarginOnRight
                selectedVariant={Variant.Light}
                unselectedVariant={Variant.Light}
              />
            </ButtonInputGroup>
          </TabBox>

          {/* Source */}
          <TabBox title="Source">
            <ButtonInputGroup label="Source Type">
              <RadioButton
                text="Both"
                ariaLabel="show logs from all sources"
                selected={pendingAdvancedFilterState.source === undefined}
                onSelected={() => {
                  const newAdvancedFilterState = {
                    ...pendingAdvancedFilterState,
                    source: undefined,
                  };
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState: newAdvancedFilterState,
                  });
                }}
                selectedVariant={Variant.Light}
                unselectedVariant={Variant.Light}
              />
              <RadioButton
                text="Client Only"
                ariaLabel="show logs from client source"
                selected={pendingAdvancedFilterState.source === LogSource.Client}
                onSelected={() => {
                  const newAdvancedFilterState = {
                    ...pendingAdvancedFilterState,
                    source: LogSource.Client,
                  };
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState: newAdvancedFilterState,
                  });
                }}
                selectedVariant={Variant.Light}
                unselectedVariant={Variant.Light}
              />
              <RadioButton
                text="Server Only"
                ariaLabel="show logs from server source"
                selected={pendingAdvancedFilterState.source === LogSource.Server}
                onSelected={() => {
                  const newAdvancedFilterState = {
                    ...pendingAdvancedFilterState,
                    source: LogSource.Server,
                  };
                  dispatch({
                    type: ActionType.UpdateAdvancedFilterState,
                    advancedFilterState: newAdvancedFilterState,
                  });
                }}
                noMarginOnRight
                selectedVariant={Variant.Light}
                unselectedVariant={Variant.Light}
              />
            </ButtonInputGroup>

            {/* Server filters */}
            {pendingAdvancedFilterState.source !== LogSource.Client && (
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
                  value={pendingAdvancedFilterState.routePath}
                  placeholder="e.g. /api/ttm/courses/12345"
                  onChange={(e) => {
                    const newAdvancedFilterState = {
                      ...pendingAdvancedFilterState,
                      routePath: (
                        (e.target.value)
                          .trim()
                      ),
                    };
                    dispatch({
                      type: ActionType.UpdateAdvancedFilterState,
                      advancedFilterState: newAdvancedFilterState,
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
                  value={pendingAdvancedFilterState.routeTemplate}
                  placeholder="e.g. /api/ttm/courses/:courseId"
                  onChange={(e) => {
                    const newAdvancedFilterState = {
                      ...pendingAdvancedFilterState,
                      routeTemplate: (
                        (e.target.value)
                          .trim()
                      ),
                    };
                    dispatch({
                      type: ActionType.UpdateAdvancedFilterState,
                      advancedFilterState: newAdvancedFilterState,
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

  // Body that will be filled with the contents of the panel
  const body: React.ReactNode = (
    <>
      {
        loading && (
          <div className="text-center p-5">
            <LoadingSpinner />
          </div>
        )
      }
      {!loading && (
        <div>
          {filters}
        </div>
      )}
      {
      !loading && logs.length === 0 && (
        <div className="alert alert-warning text-center mt-2">
          <h4 className="m-1">No Logs to Show</h4>
          <div>
            Either your filters are too strict or no matching logs have been
            created yet.
          </div>
        </div>
      )
    }
      <div
        className={loading || logs.length === 0 ? 'd-none' : undefined}
      >
        <IntelliTable
          title="Matching Logs"
          csvName={`Logs from ${getHumanReadableDate()}`}
          id="logs"
          data={logs}
          columns={columns}
        />
      </div>
      {!loading && logs.length > 0 && paginationControls}
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
            <h3 className="text-center">Log Review Dashboard</h3>
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
