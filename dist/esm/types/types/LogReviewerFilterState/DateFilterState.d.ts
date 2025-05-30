/**
 * Date filter state
 * @author Yuen Ler Chow
 */
type DateFilterState = {
    startDate: {
        year: number;
        month: number;
        day: number;
    };
    endDate: {
        year: number;
        month: number;
        day: number;
    };
};
export default DateFilterState;
