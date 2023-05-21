
/**
 * Generates the endpoint path for the given collection name
 * @author Yuen Ler Chow
 * @param {string} collectionName the name of the collection
 * @param {boolean} adminsOnly true if the endpoint is for admins only
 */
const generateEndpointPath = (collectionName: String, adminsOnly?: boolean) => {
  const userPath = adminsOnly ? 'admin' : 'ttm';
  return `/api/${userPath}/dce-reactkit/dbeditor/${collectionName}`;
};
export default generateEndpointPath;
