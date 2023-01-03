// Import shared types
import LogAction from '../LogAction';
import LogType from '../LogType';

/**
 * Log info that is specific to the type of log
 * @author Gabe Abrams
 */
type LogTypeSpecificInfo = (
  // Error
  | {
    // Type of the event
    type: LogType.Error,
    // The error message
    errorMessage: string,
    // The error code
    errorCode: string,
    // Error stack trace
    errorStack: string,
  }
  // Action
  | {
    // Type of the event
    type: LogType.Action,
    // Target of the action (each app determines the list of targets)
    // These are usually buttons, panels, elements, etc.
    target: string,
    // The type of action performed on the target
    action: LogAction,
  }
);

export default LogTypeSpecificInfo;
