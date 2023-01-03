/**
 * Types of actions
 * @author Gabe Abrams
 */
declare enum LogAction {
    Open = "open",
    Close = "close",
    Expand = "expand",
    Collapse = "collapse",
    View = "view",
    Interrupt = "interrupt",
    Create = "create",
    Edit = "edit",
    Delete = "delete",
    Add = "add",
    Remove = "remove",
    Activate = "activate",
    Deactivate = "deactivate",
    Peek = "peek",
    Unknown = "unknown"
}
export default LogAction;
