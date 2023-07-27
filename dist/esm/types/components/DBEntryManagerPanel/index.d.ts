/**
 * DB Entry Manager Panel
 * @author Yuen Ler Chow
 * @author Gabe Abrams
 */
import React from 'react';
import DBEntry from './types/DBEntry';
import DBEntryField from './types/DBEntryField';
declare type Props = {
    entryFields: DBEntryField[];
    idPropName: string;
    titlePropName: string;
    descriptionPropName: string;
    itemListTitle: string;
    itemName: string;
    /**
     * Function to validate the db entry before sending to the server
     *   (throws an error if not validate)
     * @param dbEntry the db entry to validate
     */
    validateEntry?: (dbEntry: DBEntry) => Promise<void>;
    /**
     * Function to modify the db entry before sending to the server
     * @param dbEntry the db entry to modify
     * @returns the modified db entry
     */
    modifyEntry?: (dbEntry: DBEntry) => Promise<DBEntry> | DBEntry;
    disableEdit?: boolean;
    collectionName: string;
    adminsOnly?: boolean;
    filterQuery?: {
        [k: string]: any;
    };
};
declare const DBEntryManagerPanel: React.FC<Props>;
export default DBEntryManagerPanel;
