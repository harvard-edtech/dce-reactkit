/**
 * Type of a LogMetadata file
 * @author Gabe Abrams
 */
declare type LogMetadataType = {
    Context?: {
        [k: string]: (string | {
            _: string;
            [k: string]: string;
        });
    };
    Tag?: {
        [k: string]: string;
    };
    Target?: {
        [k: string]: string;
    };
};
export default LogMetadataType;
