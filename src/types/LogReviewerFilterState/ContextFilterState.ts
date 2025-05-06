/**
 * Context filter state
 * @author Yuen Ler Chow
 */
type ContextFilterState = {
  [k: string]: (
    // No subcontexts
    | boolean // True if selected
    // Includes subcontexts
    | {
      [k: string]: boolean // True if selected
    }
  )
};

export default ContextFilterState;
