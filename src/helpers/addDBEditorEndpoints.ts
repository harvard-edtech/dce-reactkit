import express from 'express';

// Import dce-reactkit
import { genRouteHandler, ParamType } from 'dce-reactkit';
import generateEndpointPath from './generateEndpointPath';

/**
 * Add all routes for the training list
 * @author Yuen Ler Chow
 * @param app express app to add routes too
 */
const addDBEditorEndpoints = (opts: {
  app: express.Application, collectionName: String, adminsOnly: boolean, collection: any
}) => {
  const {
    app,
    collectionName,
    adminsOnly,
    collection,
  } = opts;

  const endpoint = generateEndpointPath(collectionName, adminsOnly);

  /**
   * List all items in the collection
   * @author Yuen Ler Chow
   * @returns {any[]} the list of items in the collection
   */
  app.get(
    endpoint,
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
    endpoint,
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
    `${endpoint}/:id`,
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
