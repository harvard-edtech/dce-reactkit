import { LogSource } from 'dce-commonkit';
/**
 * Advanced filter state
 * @author Yuen Ler Chow
 */
type AdvancedFilterState = {
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userId: string;
    includeLearners: boolean;
    includeTTMs: boolean;
    includeAdmins: boolean;
    courseId: string;
    courseName: string;
    isMobile: (true | false | undefined);
    source: LogSource | undefined;
    routePath: string;
    routeTemplate: string;
};
export default AdvancedFilterState;
