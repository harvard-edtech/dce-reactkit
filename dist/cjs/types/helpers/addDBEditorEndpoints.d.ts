import express from 'express';
interface Collection {
    find: (filterQuery: any) => Promise<any[]>;
    insert: (item: any) => Promise<void>;
    delete: (filterQuery: {
        id: string;
    }) => Promise<void>;
}
/**
 * Add all routes for the training list
 * @author Yuen Ler Chow
 * @param app express app to add routes too
 */
declare const addDBEditorEndpoints: (opts: {
    app: express.Application;
    collectionName: String;
    adminsOnly: boolean;
    collection: Collection;
}) => void;
export default addDBEditorEndpoints;
