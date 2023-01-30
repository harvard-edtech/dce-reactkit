/**
 * Types of actions
 * @author Gabe Abrams
 */
declare enum LogAction {
    Open = "Open",
    Close = "Close",
    Cancel = "Cancel",
    Expand = "Expand",
    Collapse = "Collapse",
    View = "View",
    Interrupt = "Interrupt",
    Create = "Create",
    Modify = "Modify",
    Delete = "Delete",
    Add = "Add",
    Remove = "Remove",
    Activate = "Activate",
    Deactivate = "Deactivate",
    Peek = "Peek",
    Unknown = "Unknown"
}
export default LogAction;
