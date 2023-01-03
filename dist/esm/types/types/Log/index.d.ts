import LogMainInfo from './LogMainInfo';
import LogSourceSpecificInfo from './LogSourceSpecificInfo';
import LogTypeSpecificInfo from './LogTypeSpecificInfo';
/**
 * A single log event corresponding to an action performed by a user or an
 *   error encountered by a user
 * @author Gabe Abrams
 */
declare type Log = (LogMainInfo & LogSourceSpecificInfo & LogTypeSpecificInfo);
export default Log;
