/**
 * Main information in a log event
 * @author Gabe Abrams
 */
type LogMainInfo = {
  // Unique id of the log event
  id: string,
  // First name of the user
  userFirstName: string,
  // Last name of the user
  userLastName: string,
  // User email
  userEmail: string,
  // User Canvas Id
  userId: number,
  // If true, the user is a learner
  isLearner: boolean,
  // If true, the user is an admin
  isAdmin: boolean,
  // If true, the user is a ttm
  isTTM: boolean,
  // The id of the Canvas course that the user launched from
  courseId: number,
  // The name of the Canvas course
  courseName: string,
  // Browser info
  browser: {
    // Name of the browser
    name: string,
    // Version of the browser
    version: string,
  },
  // Device info
  device: {
    // Name of the operating system
    os: string,
    // If true, device is a mobile device
    isMobile: boolean,
  },
  // Calendar year that the event is from
  year: number,
  // Month that the event is from (1 = Jan, 12 = Dec)
  month: number,
  // Day of the month that the event is from
  day: number,
  // Hour of the day (24hr) when the event occurred
  hour: number,
  // Minute of the day when the event occurred
  minute: number,
  // Timestamp of event (ms since epoch)
  timestamp: number,
  // Category of the event (each app determines how to categorize its events)
  category: string,
  // Subcategory of the event (each app determines how to categorize its events)
  subcategory: string,
  // List of tags that apply to this action (each app determines tag usage)
  tags: string[],
  // Additional optional custom metadata
  metadata?: {
    [k: string]: any,
  },
};

export default LogMainInfo;
