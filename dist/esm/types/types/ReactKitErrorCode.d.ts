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
    ResponseParseError = "DRK16",
    SignedRequestUnparseable = "DRK28",
    SignedRequestInvalidCollection = "DRK21",
    SignedRequestInvalidCredential = "DRK23",
    SignedRequestInvalidScope = "DRK22",
    SignedRequestInvalidTimestamp = "DRK24",
    SignedRequestInvalidSignature = "DRK25",
    SignedRequestInvalidBody = "DRK26",
    CrossServerNoCredentialsToSignWith = "DRK27",
    CrossServerMissingSignedRequestInfo = "DRK29",
    CrossServerNoCredentialEncodingSalt = "DRK30",
    NoOauthLib = "DRK31",
    NoCryptoLib = "DRK32",
    InvalidCrossServerCredentialsFormat = "DRK33",
    UnknownCrossServerError = "DRK34"
}
export default ReactKitErrorCode;
