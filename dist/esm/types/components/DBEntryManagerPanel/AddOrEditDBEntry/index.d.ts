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
    onFinished: (dbEntry?: DBEntry) => void;
    /**
     * Function to validate the DBEntry before saving
     * @param dbEntry
     */
    validateEntry?: (dbEntry: DBEntry) => Promise<void>;
    /**
     * Function to modify the DBEntry before saving
     * @param dbEntry
     * @returns the modified DBEntry
     */
    modifyEntry?: (dbEntry: DBEntry) => DBEntry;
    entryFields: DBEntryField[];
    dbEntryToEdit?: DBEntry;
    idPropName: string;
    itemName: string;
    saveEndpointPath: string;
    entries: DBEntry[];
};
declare const AddOrEditDBEntry: React.FC<Props>;
export default AddOrEditDBEntry;
