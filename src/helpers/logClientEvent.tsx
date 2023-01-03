// Import shared types
import LOG_ROUTE_PATH from '../constants/LOG_ROUTE_PATH';
import LogFunction from '../types/LogFunction';

// Import shared functions
import visitServerEndpoint from './visitServerEndpoint';

/**
 * Log a user action on the client (cannot be used on the server)
 * @author Gabe Abrams
 */
const logClientEvent: LogFunction = async (opts) => {
  return visitServerEndpoint({
    path: LOG_ROUTE_PATH,
    method: 'POST',
    params: {
      category: (
        typeof opts.category === 'string'
          ? opts.category
          : opts.category.name
      ),
      subcategory: (
        typeof opts.category === 'string'
          ? opts.subcategory
          : ((opts.subcategory as any) ?? { name: 'none' }).name
      ),
      tags: JSON.stringify(opts.tags),
      metadata: JSON.stringify(opts.metadata ?? {}),
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
        (opts as any).target
          ? (opts as any).target
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
