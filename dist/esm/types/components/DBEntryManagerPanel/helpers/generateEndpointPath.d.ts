/**
 * Generates the endpoint path for the given collection name
 * @author Yuen Ler Chow
 * @param collectionName the name of the collection
 * @param [adminsOnly] true if the endpoint is for admins only
 */
declare const generateEndpointPath: (collectionName: string, adminsOnly?: boolean | undefined) => string;
export default generateEndpointPath;
