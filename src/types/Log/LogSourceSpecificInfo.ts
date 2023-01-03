// Import shared types
import LogSource from '../LogSource';

/**
 * Log info that is specific to the type of source
 * @author Gabe Abrams
 */
type LogSourceSpecificInfo = (
  // Client
  | {
    // Source of the event
    source: LogSource.Client,
  }
  // Server
  | {
    // Source of the event
    source: LogSource.Server,
    // Route path (e.g. /api/admin/courses/53450/blocks)
    routePath: string,
    // Route template (e.g. /api/admin/courses/:courseId/blocks)
    routeTemplate: string,
  }
);

export default LogSourceSpecificInfo;
