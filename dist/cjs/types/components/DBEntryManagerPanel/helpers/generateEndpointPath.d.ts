/**
 * Generates the endpoint path for the given collection name
 * @author Yuen Ler Chow
 * @param collectionName the name of the collection
 * @param [adminsOnly] true if the endpoint is for admins only
 * @returns the endpoint path
 */
declare const generateEndpointPath: (collectionName: string, adminsOnly?: boolean) => string;
export default generateEndpointPath;
