import LogAction from '../LogAction';
import LogType from '../LogType';
/**
 * Log info that is specific to the type of log
 * @author Gabe Abrams
 */
declare type LogTypeSpecificInfo = ({
    type: LogType.Error;
    errorMessage: string;
    errorCode: string;
    errorStack: string;
} | {
    type: LogType.Action;
    target: string;
    action: LogAction;
});
export default LogTypeSpecificInfo;
