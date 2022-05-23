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
    WrongCourse = "DRK6",
    NoCACCLSendRequestFunction = "DRK7",
    NoCACCLGetLaunchInfoFunction = "DRK8",
    NotTTM = "DRK9",
    NotAdmin = "DRK10"
}
export default ReactKitErrorCode;
