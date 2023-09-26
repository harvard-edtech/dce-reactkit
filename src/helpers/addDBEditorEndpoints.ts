// Import express
import express from 'express';

// Import shared helpers
import genRouteHandler from './genRouteHandler';
import generateEndpointPath from '../components/DBEntryManagerPanel/helpers/generateEndpointPath';

// Import shared types
import ParamType from '../types/ParamType';

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
  find: (filterQuery: any) => Promise<any[]>,
  /**
   * Insert an item into the collection
   * @param item the item to insert
   */
  insert: (item: any) => Promise<void>,
  /**
   * Delete an item in the collection
   * @param id the id of the item to delete
   */
  delete: (filterQuery: { id: string }) => Promise<void>,
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
const addDBEditorEndpoints = (
  opts: {
    app: express.Application,
    collectionName: string,
    adminsOnly: boolean,
    collection: DCEMangoCollection,
  },
) => {
  const {
    app,
    collectionName,
    adminsOnly,
    collection,
  } = opts;

  // Generate the endpoint path
  const endpointPath = generateEndpointPath(collectionName, adminsOnly);

  /**
   * List all items in the collection
   * @author Yuen Ler Chow
   * @returns {any[]} the list of items in the collection
   */
  app.get(
    endpointPath,
    genRouteHandler({
      paramTypes: {
        filterQuery: ParamType.JSONOptional,
      },
      handler: async ({ params }) => {
        const filterQuery = params.filterQuery ?? {};
        const categories = await collection.find(filterQuery);
        return categories;
      },
    }),
  );

  /**
   * Create a new item in the collection
   * @author Yuen Ler Chow
   * @param {any} item the item to create
   */
  app.post(
    endpointPath,
    genRouteHandler({
      paramTypes: {
        item: ParamType.JSON,
      },
      handler: async ({
        params,
      }) => {
        // Destructure params
        const {
          item,
        } = params;

        await collection.insert(item);
      },
    }),
  );

  /**
   * Remove an item from the collection by id
   * @author Yuen Ler Chow
   */
  app.delete(
    `${endpointPath}/:id`,
    genRouteHandler({
      paramTypes: {
        id: ParamType.String,
      },
      handler: async ({
        params,
      }) => {
        // Destructure params
        const {
          id,
        } = params;

        await collection.delete({ id });
      },
    }),
  );
};

export default addDBEditorEndpoints;
