/**
 * Create a function that forces a render of a component. Use this only when
 *   absolutely necessary
 * @author Gabe Abrams
 * @param useReducer the useReducer hook
 * @returns forceRender function
 */
declare const useForceRender: (useReducer: any) => () => void;
export default useForceRender;
