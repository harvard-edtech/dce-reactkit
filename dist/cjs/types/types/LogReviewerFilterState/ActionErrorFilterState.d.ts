import LogType from '../LogType';
/**
 * Action filter state (only relevant for action logs)
 * @author Yuen Ler Chow
 */
type ActionErrorFilterState = {
    type: LogType | undefined;
    errorMessage: string;
    errorCode: string;
    target: {
        [k: string]: boolean;
    };
    action: {
        [k: string]: boolean;
    };
};
export default ActionErrorFilterState;
