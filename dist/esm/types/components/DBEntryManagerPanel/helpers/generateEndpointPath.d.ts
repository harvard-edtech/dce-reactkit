/**
 * Generates the endpoint path for the given collection name
 * @author Yuen Ler Chow
 * @param {string} collectionName the name of the collection
 * @param {boolean} adminsOnly true if the endpoint is for admins only
 */
declare const generateEndpointPath: (collectionName: String, adminsOnly?: boolean | undefined) => string;
export default generateEndpointPath;
