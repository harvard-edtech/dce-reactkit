/**
 * State of the current subpanel, determining what happens when the user tries
 *   to go back to the home screen
 * @author Yuen Ler Chow
 */
enum BackState {
  // The user can go back immediately, no confirmation required
  Normal = 'Normal',
  // The user must confirm before going back because progress will be lost
  UnsavedChanges = 'UnsavedChanges',
  // The user cannot go back right now because work is in progress
  Blocked = 'Blocked',
}

export default BackState;
