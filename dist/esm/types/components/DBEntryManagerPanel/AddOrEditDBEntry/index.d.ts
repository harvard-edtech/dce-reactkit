/**
 * Panel for adding a DBEntry to the database
 * @author Yuen Ler Chow
 */
import React from 'react';
import DBEntry from '../types/DBEntry';
import DBEntryField from '../types/DBEntryField';
declare type Props = {
    /**
     * Handler for when the user finishes adding the DBEntry
     * (if no DBEntry is returned, process was cancelled)
     * @param DBEntry the DBEntry that was just created
     */
    onFinished: (dbEntry: DBEntry | undefined) => void;
    entryFields: DBEntryField[];
    DBEntryToEdit: DBEntry | undefined;
    validationFunction?: (dbEntry: DBEntry) => Promise<void>;
    objectModifier?: (dbEntry: DBEntry) => DBEntry;
    idPropName: string;
    endpoint: string;
    entries: DBEntry[];
};
declare const AddorEditDBEntry: React.FC<Props>;
export default AddorEditDBEntry;
