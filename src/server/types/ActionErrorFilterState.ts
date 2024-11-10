import LogType from '../../types/LogType';

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

export default ActionErrorFilterState;
