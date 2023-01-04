// Import shared types
import Log from './Log';
import LogAction from './LogAction';

/**
 * Type of a log action function
 * @author Gabe Abrams
 */
type LogFunction = (
  opts: (
    // Shared info
    {
      // Context of the event (each app determines how to organize contexts)
      context: string | { _: string },
      // Subcontext of the event (each app determines how to organize subcontexts)
      subcontext?: string,
      // List of tags that apply to this action (each app determines tag usage)
      tags?: string[],
      // Additional optional custom metadata
      metadata?: {
        [k: string]: any,
      },
    } & (
      // Error
      | {
        // The error object to log
        error: any,
      }
      // Action
      | {
        // The type of action performed
        action: LogAction,
        // Target of the action (each app determines the list of targets)
        // These are usually buttons, panels, elements, etc.
        // If no target is included, this should indicate that this is an action
        // being performed on the whole feature (open/close/etc)
        target?: string,
      }
    )
  ),
) => Promise<Log>;

export default LogFunction;
