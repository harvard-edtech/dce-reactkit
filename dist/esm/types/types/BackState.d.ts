/**
 * State of the current subpanel, determining what happens when the user tries
 *   to go back to the home screen
 * @author Yuen Ler Chow
 */
declare enum BackState {
    Normal = "Normal",
    UnsavedChanges = "UnsavedChanges",
    Blocked = "Blocked"
}
export default BackState;
