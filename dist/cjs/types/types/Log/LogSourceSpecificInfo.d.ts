import LogSource from '../LogSource';
/**
 * Log info that is specific to the type of source
 * @author Gabe Abrams
 */
type LogSourceSpecificInfo = ({
    source: LogSource.Client;
} | {
    source: LogSource.Server;
    routePath: string;
    routeTemplate: string;
});
export default LogSourceSpecificInfo;
