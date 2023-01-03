import Log from './Log';
import LogAction from './LogAction';
/**
 * Type of a log action function
 * @author Gabe Abrams
 */
declare type LogFunction = (opts: ({
    category: string | {
        name: string;
    };
    subcategory?: string | {
        name: string;
    };
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
