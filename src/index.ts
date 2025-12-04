// Import dce-commonkit
import {
  // Errors
  ErrorWithCode,
  // Constants
  MINUTE_IN_MS,
  HOUR_IN_MS,
  DAY_IN_MS,
  LOG_REVIEW_ROUTE_PATH_PREFIX,
  LOG_ROUTE_PATH,
  LOG_REVIEW_STATUS_ROUTE,
  LOG_REVIEW_GET_LOGS_ROUTE,
  SELECT_ADMIN_CHECK_ROUTE,
  // Helpers
  abbreviate,
  avg,
  ceilToNumDecimals,
  floorToNumDecimals,
  forceNumIntoBounds,
  padDecimalZeros,
  padZerosLeft,
  roundToNumDecimals,
  sum,
  waitMs,
  getOrdinal,
  getTimeInfoInET,
  startMinWait,
  getHumanReadableDate,
  getPartOfDay,
  stringsToHumanReadableList,
  onlyKeepLetters,
  parallelLimit,
  getMonthName,
  genCSV,
  extractProp,
  compareArraysByProp,
  getLocalTimeInfo,
  genCommaList,
  validateEmail,
  validatePhoneNumber,
  validateString,
  idify,
  prefixWithAOrAn,
  everyAsync,
  filterAsync,
  forEachAsync,
  mapAsync,
  someAsync,
  capitalize,
  shuffleArray,
  getWordCount,
  cloneDeep,
  getTimestampFromTimeInfoInET,
  // Types
  ParamType,
  DayOfWeek,
  Log,
  LogType,
  LogSource,
  LogAction,
  LogBuiltInMetadata,
  LogMetadataType,
  LogFunction,
  LogTypeSpecificInfo,
  LogMainInfo,
  LogSourceSpecificInfo,
  LogLevel,
  CommonKitErrorCode,
} from 'dce-commonkit';

// Import components
import AppWrapper, {
  alert,
  prompt,
  confirm,
  showFatalError,
  addFatalErrorHandler,
  leaveToURL,
} from './components/AppWrapper';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBox from './components/ErrorBox';
import Modal from './components/Modal';
import TabBox from './components/TabBox';
import RadioButton from './components/RadioButton';
import CheckboxButton from './components/CheckboxButton';
import ButtonInputGroup from './components/ButtonInputGroup';
import SimpleDateChooser from './components/SimpleDateChooser';
import SimpleTimeChooser from './components/SimpleTimeChooser';
import Drawer from './components/Drawer';
import PopSuccessMark from './components/PopSuccessMark';
import PopFailureMark from './components/PopFailureMark';
import PopPendingMark from './components/PopPendingMark';
import CopiableBox from './components/CopiableBox';
import ItemPicker from './components/ItemPicker';
import LogReviewer from './components/LogReviewer';
import IntelliTable from './components/IntelliTable';
import CSVDownloadButton from './components/CSVDownloadButton';
import DBEntryManagerPanel from './components/DBEntryManagerPanel';
import Tooltip from './components/Tooltip';
import ToggleSwitch from './components/ToggleSwitch';
import AutoscrollToBottomContainer from './components/AutoscrollToBottomContainer';
import MultiSwitch from './components/MultiSwitch';
import Dropdown from './components/Dropdown';
import ProgressBar from './components/ProgressBar';

// Import dynamic constants
import DynamicWord from './dynamicConstants/DynamicWord';

// Import helpers
import initClient from './helpers/initClient';
import visitServerEndpoint from './helpers/visitServerEndpoint';
import stubServerEndpoint from './helpers/stubServerEndpoint';
import logClientEvent, { setClientEventMetadataPopulator } from './helpers/logClientEvent';
import canReviewLogs from './helpers/canReviewLogs';
import isMobileOrTablet from './helpers/isMobileOrTablet';
import makeLinksClickable from './helpers/makeLinksClickable';
import combineClassNames from './helpers/combineClassNames';
import useForceRender from './helpers/useForceRender';
import isSelectAdmin from './helpers/isSelectAdmin';

// Import types
import ModalButtonType from './types/ModalButtonType';
import ModalSize from './types/ModalSize';
import ModalType from './types/ModalType';
import Variant from './types/Variant';
import IntelliTableColumn from './types/IntelliTableColumn';
import DropdownItemType from './types/DropdownItemType';
import LogReviewerFilterState from './types/LogReviewerFilterState';
import ProgressBarSize from './types/ProgressBarSize';

// Component-specific-types
import PickableItem from './components/ItemPicker/types/PickableItem';
import DBEntry from './components/DBEntryManagerPanel/types/DBEntry';
import DBEntryField from './components/DBEntryManagerPanel/types/DBEntryField';
import DBEntryFieldType from './components/DBEntryManagerPanel/types/DBEntryFieldType';

// Export each item
export {
  // Components
  AppWrapper,
  LoadingSpinner,
  ErrorBox,
  Modal,
  TabBox,
  RadioButton,
  CheckboxButton,
  ButtonInputGroup,
  SimpleDateChooser,
  SimpleTimeChooser,
  Drawer,
  PopSuccessMark,
  PopFailureMark,
  PopPendingMark,
  CopiableBox,
  ItemPicker,
  LogReviewer,
  IntelliTable,
  CSVDownloadButton,
  DBEntryManagerPanel,
  Tooltip,
  ToggleSwitch,
  AutoscrollToBottomContainer,
  MultiSwitch,
  Dropdown,
  ProgressBar,
  // Global functions
  alert,
  prompt,
  confirm,
  showFatalError,
  // Dynamic Constants
  DynamicWord,
  // Helpers
  stubServerEndpoint,
  canReviewLogs,
  isMobileOrTablet,
  makeLinksClickable,
  isSelectAdmin,
  // Client helpers
  initClient,
  visitServerEndpoint,
  logClientEvent,
  addFatalErrorHandler,
  leaveToURL,
  combineClassNames,
  useForceRender,
  setClientEventMetadataPopulator,
  // Types
  ModalButtonType,
  ModalSize,
  ModalType,
  Variant,
  IntelliTableColumn,
  DropdownItemType,
  LogReviewerFilterState,
  ProgressBarSize,
  // Component-specific-types
  PickableItem,
  DBEntry,
  DBEntryField,
  DBEntryFieldType,
  /* ------------- Common ------------- */
  // Errors
  ErrorWithCode,
  // Constants
  MINUTE_IN_MS,
  HOUR_IN_MS,
  DAY_IN_MS,
  LOG_REVIEW_ROUTE_PATH_PREFIX,
  LOG_ROUTE_PATH,
  LOG_REVIEW_STATUS_ROUTE,
  LOG_REVIEW_GET_LOGS_ROUTE,
  SELECT_ADMIN_CHECK_ROUTE,
  // Helpers
  abbreviate,
  avg,
  ceilToNumDecimals,
  floorToNumDecimals,
  forceNumIntoBounds,
  padDecimalZeros,
  padZerosLeft,
  roundToNumDecimals,
  sum,
  waitMs,
  getOrdinal,
  getTimeInfoInET,
  startMinWait,
  getHumanReadableDate,
  getPartOfDay,
  stringsToHumanReadableList,
  onlyKeepLetters,
  parallelLimit,
  getMonthName,
  genCSV,
  extractProp,
  compareArraysByProp,
  getLocalTimeInfo,
  genCommaList,
  validateEmail,
  validatePhoneNumber,
  validateString,
  idify,
  prefixWithAOrAn,
  everyAsync,
  filterAsync,
  forEachAsync,
  mapAsync,
  someAsync,
  capitalize,
  shuffleArray,
  getWordCount,
  cloneDeep,
  getTimestampFromTimeInfoInET,
  // Types
  ParamType,
  DayOfWeek,
  Log,
  LogType,
  LogSource,
  LogAction,
  LogBuiltInMetadata,
  LogMetadataType,
  LogFunction,
  LogTypeSpecificInfo,
  LogMainInfo,
  LogSourceSpecificInfo,
  LogLevel,
  CommonKitErrorCode,
};
