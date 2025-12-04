/**
 * Generates the endpoint path for the given collection name
 * @author Yuen Ler Chow
 * @param collectionName the name of the collection
 * @param [adminsOnly] true if the endpoint is for admins only
 * @returns the endpoint path
 */
const generateEndpointPath = (collectionName: string, adminsOnly: boolean = true) => {
  // Determine prefix based on whether the endpoint is for admins only
  const userPath = adminsOnly ? 'admin' : 'ttm';

  // Return the endpoint path
  return `/api/${userPath}/dce-commonkit/dbeditor/${collectionName}`;
};

export default generateEndpointPath;
