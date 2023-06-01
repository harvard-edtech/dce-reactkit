/**
 * DB Entry Manager Panel
 * @author Yuen Ler Chow
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
    validateEntry?: (dbEntry: DBEntry) => Promise<void>;
    modifyEntry?: (dbEntry: DBEntry) => Promise<DBEntry>;
    disableEdit?: boolean;
    collectionName: string;
    adminsOnly?: boolean;
    filterQuery?: {
        [k: string]: any;
    };
};
declare const DBEntryManagerPanel: React.FC<Props>;
export default DBEntryManagerPanel;
