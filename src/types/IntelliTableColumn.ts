import ParamType from './ParamType';

/**
 * Column description for a column in the IntelliTable
 * @author Gabe Abrams
 */
type IntelliTableColumn = {
  // Human-readable name of the column
  title: string,
  // Parameter name (property inside the data object)
  param: string,
  // Type of value
  type: (
    | ParamType.Boolean
    | ParamType.Float
    | ParamType.Int
    | ParamType.String
    | ParamType.JSON
  ),
  // If true, column starts hidden
  startsHidden?: boolean,
};

export default IntelliTableColumn;
