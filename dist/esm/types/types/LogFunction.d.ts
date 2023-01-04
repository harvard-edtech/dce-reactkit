import Log from './Log';
import LogAction from './LogAction';
/**
 * Type of a log action function
 * @author Gabe Abrams
 */
declare type LogFunction = (opts: ({
    category: string | {
        _: string;
    };
    subcategory?: string | {
        _: string;
    };
    tags?: string[];
    metadata?: {
        [k: string]: any;
    };
} & ({
    error: any;
} | {
    action: LogAction;
    target?: string;
}))) => Promise<Log>;
export default LogFunction;
