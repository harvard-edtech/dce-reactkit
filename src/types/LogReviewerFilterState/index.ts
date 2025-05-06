import DateFilterState from './DateFilterState';
import ContextFilterState from './ContextFilterState';
import TagFilterState from './TagFilterState';
import ActionErrorFilterState from './ActionErrorFilterState';
import AdvancedFilterState from './AdvancedFilterState';

/**
 * A bundle of filter state objects for each type of filter
 * @author Gabe Abrams
 */
type LogReviewerFilterState = {
  // Date filter state
  dateFilterState: DateFilterState,
  // Context filter state
  contextFilterState: ContextFilterState,
  // Tag filter state
  tagFilterState: TagFilterState,
  // Action error filter state
  actionErrorFilterState: ActionErrorFilterState,
  // Advanced filter state
  advancedFilterState: AdvancedFilterState,
};

export default LogReviewerFilterState;
