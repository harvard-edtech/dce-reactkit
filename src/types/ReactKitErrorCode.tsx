// Highest error code = DRK2

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
}

export default ReactKitErrorCode;