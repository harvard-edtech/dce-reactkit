/**
 * Context filter state
 * @author Yuen Ler Chow
 */
type ContextFilterState = {
    [k: string]: (boolean | {
        [k: string]: boolean;
    });
};
export default ContextFilterState;
