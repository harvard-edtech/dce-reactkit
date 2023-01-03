/**
 * Types of actions
 * @author Gabe Abrams
 */
enum LogAction {
  // Target was opened by the user (it was not on screen, but now it is)
  Open = 'open',
  // Target was closed by the user (it was on screen, but now it is not)
  Close = 'close',
  // Target was expanded by the user (it always remains on screen, but size was changed)
  Expand = 'expand',
  // Target was collapsed by the user (it always remains on screen, but size was changed)
  Collapse = 'collapse',
  // Target was viewed by the user (only for items that are not opened or closed, those must use Open/Close actions)
  View = 'view',
  // Target interrupted the user (popup, dialog, validation message, etc. appeared without user prompting)
  Interrupt = 'interrupt',
  // Target was created by the user (it did not exist before)
  Create = 'create',
  // Target was edited by the user (it existed and was changed)
  Edit = 'edit',
  // Target was deleted by the user (it existed and now it doesn't)
  Delete = 'delete',
  // Target was added by the user (it already existed and was added to another place)
  Add = 'add',
  // Target was removed by the user (it was removed from something but still exists)
  Remove = 'remove',
  // Target was activated by the user (click, check, tap, keypress, etc.)
  Activate = 'activate',
  // Target was deactivated by the user (click away, uncheck, tap outside of, tab away, etc.)
  Deactivate = 'deactivate',
  // User showed interest in a target (hover, peek, etc.)
  Peek = 'peek',
  // Unknown action
  Unknown = 'unknown',
};

export default LogAction;
