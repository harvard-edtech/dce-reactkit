/**
 * Types of actions
 * @author Gabe Abrams
 */
enum LogAction {
  // Target was opened by the user (it was not on screen, but now it is)
  Open = 'Open',
  // Target was closed by the user (it was on screen, but now it is not)
  Close = 'Close',
  // Target was cancelled by the user (it was on closed without saving)
  Cancel = 'Cancel',
  // Target was expanded by the user (it always remains on screen, but size was changed)
  Expand = 'Expand',
  // Target was collapsed by the user (it always remains on screen, but size was changed)
  Collapse = 'Collapse',
  // Target was viewed by the user (only for items that are not opened or closed, those must use Open/Close actions)
  View = 'View',
  // Target interrupted the user (popup, dialog, validation message, etc. appeared without user prompting)
  Interrupt = 'Interrupt',
  // Target was created by the user (it did not exist before)
  Create = 'Create',
  // Target was modified by the user (it existed and was changed)
  Modify = 'Modify',
  // Target was deleted by the user (it existed and now it doesn't)
  Delete = 'Delete',
  // Target was added by the user (it already existed and was added to another place)
  Add = 'Add',
  // Target was removed by the user (it was removed from something but still exists)
  Remove = 'Remove',
  // Target was activated by the user (click, check, tap, keypress, etc.)
  Activate = 'Activate',
  // Target was deactivated by the user (click away, uncheck, tap outside of, tab away, etc.)
  Deactivate = 'Deactivate',
  // User showed interest in a target (hover, peek, etc.)
  Peek = 'Peek',
  // Halt a process (pause, etc.)
  Halt = 'Halt',
  // Resume a process (resume a halted process)
  Resume = 'Resume',
  // Jump to/seek to/reveal/go to/navigate to a target
  Jump = 'Jump',
  // Unknown action
  Unknown = 'Unknown',
}

export default LogAction;
