import Log from './Log';
import LogAction from './LogAction';
/**
 * Type of a log action function
 * @author Gabe Abrams
 */
declare type LogFunction = (opts: ({
    category: string;
    subcategory?: string;
    tags?: string[];
    metadata?: {
        [k: string]: any;
    };
} & ({
    error: any;
} | {
    target: string;
    action: LogAction;
}))) => Promise<Log>;
export default LogFunction;
