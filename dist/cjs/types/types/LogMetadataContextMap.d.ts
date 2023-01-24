/**
 * Type of the context map in a LogMetadata file
 * @author Gabe Abrams
 */
declare type LogMetadataContextMap = {
    [k: string]: (string | {
        _: string;
        [k: string]: string;
    });
};
export default LogMetadataContextMap;
