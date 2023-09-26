import express from 'express';
/**
 * Interface for a collection in the database
 * @author Yuen Ler Chow
 */
type DCEMangoCollection = {
    /**
     * Find all items in the collection that match the filter query
     * @param filterQuery query for the filter
     * @returns list of items that match the filter query
     */
    find: (filterQuery: any) => Promise<any[]>;
    /**
     * Insert an item into the collection
     * @param item the item to insert
     */
    insert: (item: any) => Promise<void>;
    /**
     * Delete an item in the collection
     * @param id the id of the item to delete
     */
    delete: (filterQuery: {
        id: string;
    }) => Promise<void>;
};
/**
 * Add all routes for the DBEditor
 * @author Yuen Ler Chow
 * @param opts object containing all arguments
 * @param opts.app express app to add routes too
 * @param opts.collectionName the name of the collection
 * @param opts.adminsOnly true if the endpoint is for admins only
 * @param opts.collection dce-mango db collection
 */
declare const addDBEditorEndpoints: (opts: {
    app: express.Application;
    collectionName: string;
    adminsOnly: boolean;
    collection: DCEMangoCollection;
}) => void;
export default addDBEditorEndpoints;
