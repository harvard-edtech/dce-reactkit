/**
 * State of the current subpanel, determining what happens when the user tries
 *   to go back to the home screen
 * @author Yuen Ler Chow
 */
declare enum BackState {
    Normal = "normal",
    UnsavedChanges = "unsaved-changes",
    Blocked = "blocked"
}
export default BackState;
