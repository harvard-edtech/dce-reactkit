/**
 * Options for field types
 * @author Yuen Ler Chow
 */
enum DBEntryFieldType {
  // A string input field
  String = 'String',
  // A number input field
  Number = 'Number',
  // input field with subfields that are also DBEntryFields
  Object = 'Object',
  // list of strings input field
  StringArray = 'StringArray',
  // list of numbers input field
  NumberArray = 'NumberArray',
}

export default DBEntryFieldType;
