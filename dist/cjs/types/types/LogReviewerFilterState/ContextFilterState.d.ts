type ContextFilterState = {
    [k: string]: (boolean | {
        [k: string]: boolean;
    });
};
export default ContextFilterState;
