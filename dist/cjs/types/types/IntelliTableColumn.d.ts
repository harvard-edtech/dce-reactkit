import ParamType from './ParamType';
/**
 * Column description for a column in the IntelliTable
 * @author Gabe Abrams
 */
type IntelliTableColumn = {
    title: string;
    param: string;
    type: (ParamType.Boolean | ParamType.Float | ParamType.Int | ParamType.String | ParamType.JSON);
    startsHidden?: boolean;
};
export default IntelliTableColumn;
