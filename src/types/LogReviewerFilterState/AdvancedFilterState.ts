import LogSource from '../LogSource';

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

export default AdvancedFilterState;
