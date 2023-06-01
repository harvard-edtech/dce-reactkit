import DBEntryFieldType from './DBEntryFieldType';

/**
 * A database entry input field
 * @author Yuen Ler Chow
 */
type DBEntryField = (
  {
    // The label of the field
    label: string,
    // The key/prop this corresponds to in the DBEntry
    objectKey: string,
    // The placeholder text
    placeholder: string,
    // If true, only allow the user to edit when creating (not when editing)
    lockAfterCreation?: boolean,
    // If true, the field is required
    required?: boolean,
  } & (
    // A string input field
    | {
      // The type of the field
      type: DBEntryFieldType.String,
      // The required minimum number of characters
      minNumChars?: number,
      // The required maximum number of characters
      maxNumChars?: number,
      // The default value for the field
      defaultValue?: string,
      // If defined, the choices the user can choose from
      choices?: {
        // The title of the choice (human-readable)
        title: string,
        // The value of the choice (what is stored in the DB)
        value: string,
      }[],
    }
    // A number input field
    | {
      // The type of the field
      type: DBEntryFieldType.Number,
      // The required minimum number
      minNumber?: number,
      // The required maximum number
      maxNumber?: number,
      // The default value for the field
      defaultValue?: number,
    }
    // Checkbox input field
    | {
      // The type of the field
      type: DBEntryFieldType.StringArray,
      // The required minimum number of elements
      minNumElements?: number,
      // The required maximum number of elements
      maxNumElements?: number,
      // The default value for the field
      defaultValue?: string[],
      // If defined, the choices the user can choose from
      choices?: {
        // The title of the choice (human-readable)
        title: string,
        // The value of the choice (what is stored in the DB)
        value: string,
      }[],
    }
    // A number list input field
    | {
      // The type of the field
      type: DBEntryFieldType.NumberArray,
      // The required minimum number of elements
      minNumElements?: number,
      // The required maximum number of elements
      maxNumElements?: number,
      // The required minimum number
      minNumber?: number,
      // The required maximum number
      maxNumber?: number,
      // The default value for the field
      defaultValue?: number[],
    }
    // Object input field
    | {
      // The type of the field
      type: DBEntryFieldType.Object,
      // The required minimum number of elements
      defaultValue?: { [k: string]: any },
      // The required minimum number of elements
      subfields: DBEntryField[],
    }
  )
);

export default DBEntryField;
