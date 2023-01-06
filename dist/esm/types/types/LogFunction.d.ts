import Log from './Log';
import LogAction from './LogAction';
import LogLevel from './LogLevel';
/**
 * Type of a log action function
 * @author Gabe Abrams
 */
declare type LogFunction = (opts: ({
    context: string | {
        _: string;
    };
    subcontext?: string;
    tags?: string[];
    metadata?: {
        [k: string]: any;
    };
    level?: LogLevel;
} & ({
    error: any;
} | {
    action: LogAction;
    target?: string;
}))) => Promise<Log>;
export default LogFunction;
