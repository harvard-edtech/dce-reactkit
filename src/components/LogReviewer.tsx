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
  faCalendar,
  faCircle,
  faHammer,
  faList,
  faTag,
  faTimes,
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

// Map of loaded logs (year => month => Log[])
type LogMap = {
  [k: string]: {
    [k: string]: Log[]
  }
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

// Date filter state
type DateFilterState = {
  // Current start date
  startDate: {
    // Full year
    year: number,
    // 1-indexed month
    month: number,
    // 1-indexed day
    day: number,
  },
  // Current end date
  endDate: {
    // Full year
    year: number,
    // 1-indexed month
    month: number,
    // 1-indexed day
    day: number,
  },
};

// Context filter state
type ContextFilterState = {
  [k: string]: (
    // No subcontexts
    | boolean // True if selected
    // Includes subcontexts
    | {
      [k: string]: boolean // True if selected
    }
  )
};

// Tag filter state
type TagFilterState = {
  [k: string]: boolean // tag => true if in the list of tags to show
};

// Action filter state (only relevant for action logs)
type ActionErrorFilterState = {
  // Required type of log
  type: LogType | undefined, // If undefined, no filter applied
  // Query for error message (only relevant if type is error)
  errorMessage: string, // If empty, no filter applied
  // Query for error code (only relevant if type is error)
  errorCode: string, // If empty, no filter applied
  // Action targets to include (only relevant if type is action)
  target: {
    [k: string]: boolean
  },
  // Action types to include (only relevant if type is action)
  action: {
    [k: string]: boolean
  },
};

// Advanced filter state
type AdvancedFilterState = {
  // Query for user first name (case insensitive)
  userFirstName: string, // If empty, no filter applied
  // Query for user last name (case insensitive)
  userLastName: string, // If empty, no filter applied
  // Query for user email (case insensitive)
  userEmail: string, // If empty, no filter applied
  // Match for userId (numerical)
  userId: string, // If empty, no filter applied
  // If true, include students
  includeLearners: boolean,
  // If true, include ttms
  includeTTMs: boolean,
  // If true, include admins
  includeAdmins: boolean,
  // Match for courseId (numerical)
  courseId: string, // If empty, no filter applied
  // Query for course name (case insensitive)
  courseName: string, // If empty, no filter applied
  // Required isMobile value
  isMobile: (true | false | undefined), // If undefined, no filter applied
  // Required log source value
  source: LogSource | undefined, // If undefined, no filter applied
  // Query for route path (only relevant if source is server)
  routePath: string, // If empty, no filter applied
  // Query for route template (only relevant if source is server)
  routeTemplate: string, // If empty, no filter applied
};

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
  // Loaded logs (year => month => Log[])
  logMap: LogMap,
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
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Show the loading bar
  StartLoading = 'start-loading',
  // Finish loading one or more months of logs
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
}

// Action definitions
type Action = (
  | {
    // Action type
    type: ActionType.FinishLoading,
    // Updated logMap
    logMap: LogMap,
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
        logMap: action.logMap,
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
    logMap: {},
    expandedFilterDrawer: undefined,
    dateFilterState: initDateFilterState,
    contextFilterState: initContextFilterState,
    tagFilterState: initTagFilterState,
    actionErrorFilterState: initActionErrorFilterState,
    advancedFilterState: initAdvancedFilterState,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    loading,
    logMap,
    expandedFilterDrawer,
    dateFilterState,
    contextFilterState,
    tagFilterState,
    actionErrorFilterState,
    advancedFilterState,
  } = state;

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Get the list of year/month combos that need to be loaded given a new
   *   start or end date and the existing logMap
   * @author Gabe Abrams
   * @param newDateFilterState the new date filter state
   * @returns list of year/month combos that need to be loaded
   */
  const listMonthsToLoad = (
    newDateFilterState: DateFilterState,
  ): { year: number, month: number }[] => {
    // List of year/month combos that need to be loaded
    const toLoad: { year: number, month: number }[] = [];

    // Loop through dates
    let { year, month } = newDateFilterState.startDate;
    while (
      // Earlier year
      (year < newDateFilterState.endDate.year)
      // Current year but included month
      || (
        year === newDateFilterState.endDate.year
        && month <= newDateFilterState.endDate.month
      )
    ) {
      // Add to list if not already loaded
      if (
        !logMap[year]
        || !logMap[year][month]
      ) {
        toLoad.push({
          year,
          month,
        });
      }

      // Increment
      month += 1;
      if (month > 12) {
        month -= 12;
        year += 1;
      }
    }

    // Return
    return toLoad;
  };

  /**
   * Handle updated start/end dates (updates state, loads if necessary)
   * @author Gabe Abrams
   * @param newDateFilterState the new date filter state
   */
  const handleDateRangeUpdated = async (
    newDateFilterState: DateFilterState,
  ) => {
    // Update state
    dispatch({
      type: ActionType.UpdateDateFilterState,
      dateFilterState: newDateFilterState,
    });

    // Check which year/month combos we need to load
    const toLoad = listMonthsToLoad(newDateFilterState);

    // If nothing to load, finished
    if (toLoad.length === 0) {
      return;
    }

    // Start loading
    dispatch({
      type: ActionType.StartLoading,
    });

    // Load required months
    try {
      for (let i = 0; i < toLoad.length; i++) {
        // Destructure
        const { year, month } = toLoad[i];

        // Load
        let logs: Log[] = [];
        let pageNumber = 1;
        let hasAnotherPage = true;

        while (hasAnotherPage) {
          const response = await visitServerEndpoint({
            path: `${LOG_REVIEW_ROUTE_PATH_PREFIX}/years/${year}/months/${month}`,
            method: 'GET',
            params: {
              pageNumber,
            },
          });

          logs = logs.concat(response.items);
          hasAnotherPage = response.hasAnotherPage;
          pageNumber += 1;
        }

        // Add to map
        if (!logMap[year]) {
          logMap[year] = {};
        }
        logMap[year][month] = logs;
      }
    } catch (err) {
      return showFatalError(err);
    }

    // Finish loading
    dispatch({
      type: ActionType.FinishLoading,
      logMap,
    });
  };

  /*------------------------------------------------------------------------*/
  /* ------------------------- Lifecycle Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Mount
   * @author Gabe Abrams
   */
  useEffect(
    () => {
      // Perform initial load
      handleDateRangeUpdated(dateFilterState);
    },
    [],
  );

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

  if (!loading) {
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
              dontAllowFuture
              numMonthsToShow={36}
              onChange={(month, day, year) => {
                dateFilterState.startDate = { month, day, year };
                handleDateRangeUpdated(dateFilterState);
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
              dontAllowFuture
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
                handleDateRangeUpdated(dateFilterState);
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

    // Actually filter the logs
    // > Perform filters
    const logs: Log[] = [];
    Object.keys(logMap).forEach((year) => {
      Object.keys(logMap[year]).forEach((month) => {
        logMap[year][month].forEach((log) => {
          /* ----------- Date Filter ---------- */

          // Before start date
          if (
            // Previous year
            log.year < dateFilterState.startDate.year
            // Same year, earlier month
            || (
              (log.year === dateFilterState.startDate.year)
              && (log.month < dateFilterState.startDate.month)
            )
            // Same year, same month, earlier day
            || (
              (log.year === dateFilterState.startDate.year)
              && (log.month === dateFilterState.startDate.month)
              && (log.day < dateFilterState.startDate.day)
            )
          ) {
            return;
          }

          // After end date
          if (
            // Later year
            log.year > dateFilterState.endDate.year
            // Same year, later month
            || (
              (log.year === dateFilterState.endDate.year)
              && (log.month > dateFilterState.endDate.month)
            )
            // Same year, same month, later day
            || (
              (log.year === dateFilterState.endDate.year)
              && (log.month === dateFilterState.endDate.month)
              && (log.day > dateFilterState.endDate.day)
            )
          ) {
            return;
          }

          /* --------- Context Filter --------- */

          // Context doesn't match
          if (
            // Whole context is deselected
            contextFilterState[log.context] === false
            // None of the subcontexts are selected
            || (
              // Has subcontexts
              typeof contextFilterState[log.context] !== 'boolean'
              // None of the subcontexts are selected
              && Object.values(contextFilterState[log.context] ?? {})
                .every((isSelected) => {
                  return !isSelected;
                })
            )
          ) {
            return;
          }

          // Subcontext doesn't match
          if (
            // Log context is not "uncategorized" (no point in further filters)
            log.context !== LogBuiltInMetadata.Context.Uncategorized
            // Log has a subcontext
            && log.subcontext
            // Context has subcontexts
            && (
              contextFilterState[log.context]
              && contextFilterState[log.context] !== false
              && contextFilterState[log.context] !== true
            )
            // Subcontext is not selected
            && !(contextFilterState as any)[log.context][log.subcontext]
          ) {
            return;
          }

          /* -------------- Tags -------------- */

          // No tags match
          if (
            // At least one tag is required
            Object.values(tagFilterState)
              .filter((isSelected) => {
                return isSelected;
              })
              .length > 0
            // No tags match
            && log.tags.every((tag) => {
              return !tagFilterState[tag];
            })
          ) {
            return;
          }

          /* ------- Actions and Errors ------- */

          // Log type doesn't match
          if (
            // Filter won't allow all types
            actionErrorFilterState.type !== undefined
            // Log type doesn't match
            && actionErrorFilterState.type !== log.type
          ) {
            return;
          }

          // Filter errors
          if (log.type === LogType.Error) {
            // Message doesn't match
            if (
              // Message exists
              log.errorMessage
              // Message filter exists
              && actionErrorFilterState.errorMessage.trim().length > 0
              // Message doesn't match
              && log.errorMessage.toLowerCase().includes(
                actionErrorFilterState.errorMessage.trim().toLowerCase(),
              )
            ) {
              return;
            }

            // Code doesn't match
            if (
              // Code exists
              log.errorCode
              // Code filter exists
              && actionErrorFilterState.errorCode.trim().length > 0
              // Code doesn't match
              && log.errorCode.toUpperCase().includes(
                actionErrorFilterState.errorCode.trim().toUpperCase(),
              )
            ) {
              return;
            }
          }

          // Filter actions
          if (log.type === LogType.Action) {
            // Target isn't selected
            if (
              // Target exists
              log.target
              // Target isn't selected
              && !actionErrorFilterState.target[log.target]
            ) {
              return;
            }

            // Action
            if (
              // Action exists
              log.action
              // Action isn't selected
              && !actionErrorFilterState.action[log.action]
            ) {
              return;
            }
          }

          /* --------- Advanced Filter -------- */

          // First name doesn't match
          if (
            // First name exists
            log.userFirstName
            // First name query doesn't match
            && !log.userFirstName.toLowerCase().includes(
              advancedFilterState.userFirstName.toLowerCase().trim(),
            )
          ) {
            return;
          }

          // Last name doesn't match
          if (
            // Last name exists
            log.userLastName
            // Last name query doesn't match
            && !log.userLastName.toLowerCase().includes(
              advancedFilterState.userLastName.toLowerCase().trim(),
            )
          ) {
            return;
          }

          // Email doesn't match
          if (
            // Email exists
            log.userEmail
            // Email query doesn't match
            && !log.userEmail.toLowerCase().includes(
              advancedFilterState.userEmail.toLowerCase().trim(),
            )
          ) {
            return;
          }

          // User id doesn't match
          if (
            // User id exists
            log.userId
            // User id doesn't match
            && !String(log.userId).includes(
              advancedFilterState.userId.trim(),
            )
          ) {
            return;
          }

          // Learner not allowed
          if (
            // User is a learner
            log.isLearner
            // Learners aren't included
            && !advancedFilterState.includeLearners
          ) {
            return;
          }

          // TTM not allowed
          if (
            // User is a ttm
            log.isTTM
            // TTMs aren't included
            && !advancedFilterState.includeTTMs
          ) {
            return;
          }

          // Admin not allowed
          if (
            // User is an admin
            log.isAdmin
            // Admins aren't included
            && !advancedFilterState.includeAdmins
          ) {
            return;
          }

          // Course Id doesn't match
          if (
            // Course Id exists
            log.courseId
            // Course Id doesn't match
            && !String(log.courseId).includes(
              advancedFilterState.courseId.trim(),
            )
          ) {
            return;
          }

          // Course name doesn't match
          if (
            // Course name exists
            log.courseName
            // Course name doesn't match
            && !String(log.courseName).includes(
              advancedFilterState.courseName.trim(),
            )
          ) {
            return;
          }

          // Mobile filter doesn't match
          if (
            // Mobile filter exists
            advancedFilterState.isMobile !== undefined
            // Device info exists
            && log.device
            // Mobile filter doesn't match
            && (advancedFilterState.isMobile !== log.device.isMobile)
          ) {
            return;
          }

          // Log source doesn't match
          if (
            // Source filter exists
            advancedFilterState.source !== undefined
            // Source info exists
            && log.source
            // Source filter doesn't match
            && (advancedFilterState.source !== log.source)
          ) {
            return;
          }

          // Route path doesn't match (Only for server source)
          if (
            // Source is server
            (log.source === LogSource.Server)
            // Route path is being filtered
            && (advancedFilterState.routePath.trim().length)
            // Route path doesn't match
            && !(log.routePath.includes(advancedFilterState.routePath.trim()))
          ) {
            return;
          }

          // Route template doesn't match (Only for server source)
          if (
            // Source is server
            (log.source === LogSource.Server)
            // Route template is being filtered
            && (advancedFilterState.routeTemplate.trim().length)
            // Route template doesn't match
            && !(log.routeTemplate.includes(advancedFilterState.routeTemplate.trim()))
          ) {
            return;
          }

          /* -------------- Done -------------- */

          // Made it past all filters. Add to the list
          logs.push(log);
        });
      });
    });

    /*----------------------------------------*/
    /* ---------------- Data ---------------- */
    /*----------------------------------------*/

    // Nothing to show notice
    const noLogsNotice = (
      logs.length === 0
        ? (
          <div className="alert alert-warning text-center mt-2">
            <h4 className="m-1">
              No Logs to Show
            </h4>
            <div>
              Either your filters are too strict or no matching logs have been
              created yet.
            </div>
          </div>
        )
        : undefined
    );

    // Create intelliTable
    const dataTable = (
      <IntelliTable
        title="Matching Logs:"
        csvName={`Logs from ${getHumanReadableDate()}`}
        id="logs"
        data={logs}
        columns={columns}
      />
    );

    // Main body
    body = (
      <>
        {filters}
        <div className="mt-2">
          {dataTable}
          {noLogsNotice}
        </div>
      </>
    );
  }

  /* ---------- Wrap in Modal --------- */

  return (
    <div className="LogReviewer-outer-container">
      {/* Style */}
      <style>{style}</style>

      <div className="LogReviewer-inner-container">
        <div className="LogReviewer-header">
          <div className="LogReviewer-header-title">
            <h3 className="text-center m-0">
              Log Review Dashboard
            </h3>
          </div>
          <div style={{ width: 0 }}>
            <button
              type="button"
              className="LogReviewer-header-close-button btn btn-dark btn-lg pe-0"
              aria-label="close log reviewer panel"
              onClick={onClose}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
          </div>
        </div>
        <div className="LogReviewer-contents">
          {body}
        </div>
      </div>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default LogReviewer;
