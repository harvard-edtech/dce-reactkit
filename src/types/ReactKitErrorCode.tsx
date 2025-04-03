// Highest error code = DRK36

/**
 * List of error codes built into the react kit
 * @author Gabe Abrams
 */
enum ReactKitErrorCode {
  NoResponse = 'DRK1',
  NoCode = 'DRK2',
  SessionExpired = 'DRK3',
  NoCACCLSendRequestFunction = 'DRK7',
  SimpleDateChooserInvalidDateRange = 'DRK35',
  SimpleDateChooserInvalidNumMonths = 'DRK36',
}

export default ReactKitErrorCode;
