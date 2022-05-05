/**
 * Server-side API param types
 * @author Gabe Abrams
 */
enum ParamType {
  Boolean = 'boolean', // Boolean
  BooleanOptional = 'boolean-optional', // Optional boolean
  Float = 'float', // Float Number
  FloatOptional = 'float-optional', // Optional Float Number
  Int = 'int', // Integer Number
  IntOptional = 'int-optional', // Optional Integer Number
  JSON = 'json', // JSONified object
  JSONOptional = 'json-optional', // Optional JSONified object
  String = 'string', // String
  StringOptional = 'string-optional', // Optional string
}

export default ParamType;
