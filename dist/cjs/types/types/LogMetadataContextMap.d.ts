/**
 * Type of the context map in a LogMetadata file
 * @author Gabe Abrams
 */
type LogMetadataContextMap = {
    [k: string]: (string | {
        _: string;
        [k: string]: string;
    });
};
export default LogMetadataContextMap;
