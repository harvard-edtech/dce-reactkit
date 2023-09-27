// Import shared types
import LOG_ROUTE_PATH from '../constants/LOG_ROUTE_PATH';
import LogBuiltInMetadata from '../types/LogBuiltInMetadata';
import LogFunction from '../types/LogFunction';
import LogLevel from '../types/LogLevel';

// Import shared functions
import visitServerEndpoint from './visitServerEndpoint';

/* ------- Metadata Populator ------- */

// Type of a metadata populator function
type MetadataPopulator = () => { [k: string]: any } | Promise<{ [k: string]: any }>;

// Current metadata populator function
let metadataPopulator: MetadataPopulator;

/**
 * Set the metadata populator function that will be called before every client
 *   event is logged. The function should return a set of metadata values that
 *   will be added to all client events
 * @author Gabe Abrams
 * @param metadataPopulator function to call that will return a set of metadata
 *   values that will be added to all client events
 */
export const setClientEventMetadataPopulator = (
  newMetadataPopulator: MetadataPopulator,
) => {
  metadataPopulator = newMetadataPopulator;
};

/* -------------- Main -------------- */

/**
 * Log a user action on the client (cannot be used on the server)
 * @author Gabe Abrams
 */
const logClientEvent: LogFunction = async (opts) => {
  // Populate metadata
  let metadata = (opts.metadata ?? {});
  if (metadataPopulator) {
    try {
      const autoPopulatedMetadata = await metadataPopulator();
      metadata = {
        ...autoPopulatedMetadata,
        ...metadata,
      };
    } catch (err) {
      // Add error to metadata
      metadata = {
        autoPopulatedMetadataNotAvailable: true,
        ...metadata,
      };
    }
  }

  // Send to server
  return visitServerEndpoint({
    path: LOG_ROUTE_PATH,
    method: 'POST',
    params: {
      context: (
        typeof opts.context === 'string'
          ? opts.context
          : (
            ((opts.context as any) ?? {})._
            ?? LogBuiltInMetadata.Context.Uncategorized
          )
      ),
      subcontext: (
        opts.subcontext
        ?? LogBuiltInMetadata.Context.Uncategorized
      ),
      level: (
        opts.level
        ?? LogLevel.Info
      ),
      tags: JSON.stringify(opts.tags ?? []),
      metadata: JSON.stringify(metadata),
      errorMessage: (
        (opts as any).error
          ? (opts as any).error.message
          : undefined
      ),
      errorCode: (
        (opts as any).error
          ? (opts as any).error.code
          : undefined
      ),
      errorStack: (
        (opts as any).error
          ? (opts as any).error.stack
          : undefined
      ),
      target: (
        (opts as any).action
          ? (
            (opts as any).target
            ?? LogBuiltInMetadata.Target.NoTarget
          )
          : undefined
      ),
      action: (
        (opts as any).action
          ? (opts as any).action
          : undefined
      ),
    },
  });
};

export default logClientEvent;
