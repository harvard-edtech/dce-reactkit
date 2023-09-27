import LogFunction from '../types/LogFunction';
type MetadataPopulator = () => Promise<{
    [k: string]: any;
}>;
/**
 * Set the metadata populator function that will be called before every client
 *   event is logged. The function should return a set of metadata values that
 *   will be added to all client events
 * @author Gabe Abrams
 * @param metadataPopulator function to call that will return a set of metadata
 *   values that will be added to all client events
 */
export declare const setClientEventMetadataPopulator: (newMetadataPopulator: MetadataPopulator) => void;
/**
 * Log a user action on the client (cannot be used on the server)
 * @author Gabe Abrams
 */
declare const logClientEvent: LogFunction;
export default logClientEvent;
