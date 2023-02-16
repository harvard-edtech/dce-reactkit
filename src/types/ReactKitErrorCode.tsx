// Highest error code = DRK13

/**
 * List of error codes built into the react kit
 * @author Gabe Abrams
 */
enum ReactKitErrorCode {
  NoResponse = 'DRK1',
  NoCode = 'DRK2',
  SessionExpired = 'DRK3',
  MissingParameter = 'DRK4',
  InvalidParameter = 'DRK5',
  WrongCourse = 'DRK6',
  NoCACCLSendRequestFunction = 'DRK7',
  NoCACCLGetLaunchInfoFunction = 'DRK8',
  NotTTM = 'DRK9',
  NotAdmin = 'DRK10',
  NotAllowedToReviewLogs = 'DRK11',
  ThemeCheckedBeforeReactKitReady = 'DRK12',
  SessionExpiredMessageGottenBeforeReactKitReady = 'DRK13',
}

export default ReactKitErrorCode;
