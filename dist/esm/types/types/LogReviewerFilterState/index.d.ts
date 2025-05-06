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
    dateFilterState: DateFilterState;
    contextFilterState: ContextFilterState;
    tagFilterState: TagFilterState;
    actionErrorFilterState: ActionErrorFilterState;
    advancedFilterState: AdvancedFilterState;
};
export default LogReviewerFilterState;
