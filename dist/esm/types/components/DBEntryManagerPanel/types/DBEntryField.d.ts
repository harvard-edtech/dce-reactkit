import DBEntryFieldType from './DBEntryFieldType';
/**
 * A database entry input field
 * @author Yuen Ler Chow
 */
type DBEntryField = ({
    label: string;
    objectKey: string;
    placeholder: string;
    lockAfterCreation?: boolean;
    required?: boolean;
} & ({
    type: DBEntryFieldType.String;
    minNumChars?: number;
    maxNumChars?: number;
    defaultValue?: string;
    choices?: {
        title: string;
        value: string;
    }[];
} | {
    type: DBEntryFieldType.Number;
    minNumber?: number;
    maxNumber?: number;
    defaultValue?: number;
} | {
    type: DBEntryFieldType.StringArray;
    minNumElements?: number;
    maxNumElements?: number;
    defaultValue?: string[];
    choices?: {
        title: string;
        value: string;
    }[];
} | {
    type: DBEntryFieldType.NumberArray;
    minNumElements?: number;
    maxNumElements?: number;
    minNumber?: number;
    maxNumber?: number;
    defaultValue?: number[];
} | {
    type: DBEntryFieldType.Object;
    defaultValue?: {
        [k: string]: any;
    };
    subfields: DBEntryField[];
}));
export default DBEntryField;
