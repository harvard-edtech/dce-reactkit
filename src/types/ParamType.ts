/**
 * Server-side API param types
 * @author Gabe Abrams
 */
enum ParamType {
  Boolean = 'Boolean', // Boolean
  BooleanOptional = 'BooleanOptional', // Optional boolean
  Float = 'Float', // Float Number
  FloatOptional = 'FloatOptional', // Optional Float Number
  Int = 'Int', // Integer Number
  IntOptional = 'IntOptional', // Optional Integer Number
  JSON = 'JSON', // JSONified object
  JSONOptional = 'JSONOptional', // Optional JSONified object
  String = 'String', // String
  StringOptional = 'StringOptional', // Optional string
}

export default ParamType;
