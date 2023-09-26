/* -------- State Definition -------- */

type State = {
  // The number of times the component has been forced to render
  renderCount: number,
};

/* ------------- Reducer ------------ */

/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 */
const reducer = (state: State): State => {
  return {
    renderCount: state.renderCount + 1,
  };
};

/* -------------- Main -------------- */

/**
 * Create a function that forces a render of a component. Use this only when
 *   absolutely necessary
 * @author Gabe Abrams
 * @param useReducer the useReducer hook
 * @returns forceRender function
 */
const useForceRender = (useReducer: any) => {
  // Initial state
  const initialState: State = {
    renderCount: 0,
  };

  // Initialize state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useReducer(reducer, initialState);

  // Create and return the forceRender function
  return () => {
    dispatch();
  };
};

export default useForceRender;
