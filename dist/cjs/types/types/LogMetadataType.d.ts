import LogMetadataContextMap from './LogMetadataContextMap';
import LogMetadataTagMap from './LogMetadataTagMap';
import LogMetadataTargetMap from './LogMetadataTargetMap';
/**
 * Type of a LogMetadata file
 * @author Gabe Abrams
 */
declare type LogMetadataType = {
    Context?: LogMetadataContextMap;
    Tag?: LogMetadataTagMap;
    Target?: LogMetadataTargetMap;
};
export default LogMetadataType;
