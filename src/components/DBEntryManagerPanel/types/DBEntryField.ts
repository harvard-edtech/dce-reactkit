import DBEntryFieldType from './DBEntryFieldType';


/**
 * A database entry input field
 * @author Yuen Ler Chow
 */
type DBEntryField = (

  {
    label: string,
    objectKey: string,
    placeholder: string,
    lockAfterCreation?: boolean, // If true, only allow the user to edit when creating (not when editing)
    required?: boolean,
  } & (
    // A string input field
    | {
      type: DBEntryFieldType.String,
      minNumChars?: number,
      maxNumChars?: number,
      defaultValue?: string,
      choices?: {
        title: string,
        value: string,
      }[],
    }
    // A number input field
    | {
      type: DBEntryFieldType.Number,
      minNumber?: number,
      maxNumber?: number,
      defaultValue?: number,
    }
    // Checkbox input field
    | {
      type: DBEntryFieldType.StringArray,
      minNumElements?: number,
      maxNumElements?: number,
      defaultValue?: string[],
      choices?: {
        title: string,
        value: string,
      }[],
    }
    // A number list input field
    | {
      type: DBEntryFieldType.NumberArray,
      minNumElements?: number,
      maxNumElements?: number,
      minNumber?: number,
      maxNumber?: number,
      defaultValue?: number[],
    }
    // Object input field
    | {
      type: DBEntryFieldType.Object,
      defaultValue?: any,
      subfields: DBEntryField[],
    }
  )
);

export default DBEntryField;
