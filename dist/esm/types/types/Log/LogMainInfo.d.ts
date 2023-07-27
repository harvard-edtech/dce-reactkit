import LogLevel from '../LogLevel';
/**
 * Main information in a log event
 * @author Gabe Abrams
 */
type LogMainInfo = {
    id: string;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userId: number;
    isLearner: boolean;
    isAdmin: boolean;
    isTTM: boolean;
    courseId: number;
    courseName: string;
    browser: {
        name: string;
        version: string;
    };
    device: {
        os: string;
        isMobile: boolean;
    };
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    timestamp: number;
    context: string;
    subcontext: string;
    tags: string[];
    level: LogLevel;
    metadata?: {
        [k: string]: any;
    };
};
export default LogMainInfo;
