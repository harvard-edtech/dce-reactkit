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
      // Category of the event (each app determines how to categorize its events)
      category: string | { name: string },
      // Subcategory of the event (each app determines how to categorize its events)
      subcategory?: string | { name: string },
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
        // Target of the action (each app determines the list of targets)
        // These are usually buttons, panels, elements, etc.
        target: string,
        // The type of action performed on the target
        action: LogAction,
      }
    )
  ),
) => Promise<Log>;

export default LogFunction;
