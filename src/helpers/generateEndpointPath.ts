
/**
 * Generates the endpoint path for the given collection name
 * @author Yuen Ler Chow
 * @param {string} collectionName the name of the collection
 * @param {boolean} adminsOnly true if the endpoint is for admins only
 */
const generateEndpointPath = (collectionName: String, adminsOnly?: boolean) => {
  return `/api/${adminsOnly ? 'admin/' : 'ttm/'}dce-reactkit/dbeditor/${collectionName}`;
};
export default generateEndpointPath;
