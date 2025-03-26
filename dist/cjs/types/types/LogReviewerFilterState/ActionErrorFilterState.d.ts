import LogType from '../LogType';
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
