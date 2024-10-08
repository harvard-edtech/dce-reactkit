/**
 * List of error codes built into the react kit
 * @author Gabe Abrams
 */
declare enum ReactKitErrorCode {
    NoResponse = "DRK1",
    NoCode = "DRK2",
    SessionExpired = "DRK3",
    MissingParameter = "DRK4",
    InvalidParameter = "DRK5",
    HostNotAllowed = "DRK17",
    HostBanned = "DRK18",
    WrongCourse = "DRK6",
    NoCACCLSendRequestFunction = "DRK7",
    NoCACCLGetLaunchInfoFunction = "DRK8",
    NotTTM = "DRK9",
    NotAdmin = "DRK10",
    NotAllowedToReviewLogs = "DRK11",
    ThemeCheckedBeforeReactKitReady = "DRK12",
    SessionExpiredMessageGottenBeforeReactKitReady = "DRK13",
    NotConnected = "DRK14",
    SelfSigned = "DRK15",
    ResponseParseError = "DRK16"
}
export default ReactKitErrorCode;
