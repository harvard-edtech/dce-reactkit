// Import commonkit
import {
  ErrorWithCode,
  CommonKitErrorCode,
} from 'dce-commonkit';

/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */

// Import helpers
// TODO: fix dependency cycle
// eslint-disable-next-line import/no-cycle
import { getSendRequest } from './initClient';
import { showSessionExpiredMessage } from '../components/AppWrapper';

/*------------------------------------------------------------------------*/
/*                               Stub Logic                               */
/*------------------------------------------------------------------------*/

// Stored stub responses
const stubResponses: {
  [method: string]: {
    [path: string]: (
      | {
        // Success boolean
        success: true,
        // Body of response from fake server
        body: any,
      }
      | {
        // Success boolean
        success: false,
        // Error message
        errorMessage: string,
        // Error code
        errorCode: string,
      }
      | undefined
    )
  }
} = {};

/**
 * Add a stub response
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param [opts.method=GET] http request method
 * @param opts.path pathname of the request
 * @param [opts.body] body of the response if successful
 * @param [opts.errorMessage] error message if not successful
 * @param [opts.errorCode] error code if not successful
 */
export const _setStubResponse = (
  opts: {
    method?: string,
    path: string,
    body?: any,
    errorMessage?: string,
    errorCode?: string,
  },
) => {
  const {
    path,
    body,
  } = opts;
  const method = (opts.method ?? 'GET').toUpperCase();
  const errorMessage = (opts.errorMessage ?? 'An unknown error has occurred.');
  const errorCode = (opts.errorCode ?? CommonKitErrorCode.NoCode);

  // Store to stub responses
  if (!stubResponses[method]) {
    stubResponses[method] = {};
  }
  stubResponses[method][path] = (
    (opts.errorMessage || opts.errorCode)
      ? {
        success: false,
        errorMessage,
        errorCode,
      }
      : {
        success: true,
        body: body ?? undefined,
      }
  );
};

/*------------------------------------------------------------------------*/
/*                                  Main                                  */
/*------------------------------------------------------------------------*/

/**
 * Visit an endpoint on the server [for client only]
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.path - the path of the server endpoint
 * @param [opts.method=GET] - the method of the endpoint
 * @param [opts.params] - query/body parameters to include
 * @returns response from server
 */
const visitServerEndpoint = async (
  opts: {
    path: string,
    method?: ('GET' | 'POST' | 'DELETE' | 'PUT'),
    params?: { [key in string]: any },
  },
): Promise<any> => {
  // Set default method
  const method = (opts.method ?? 'GET');
  // Handle stubs
  const stubResponse = stubResponses[method]?.[opts.path];
  if (stubResponse) {
    // Remove from list
    try {
      stubResponses[method][opts.path] = undefined;
    } catch (err) {
      // Ignore
    }
    // Success
    if (stubResponse.success) {
      return stubResponse.body;
    }
    // Error
    throw new ErrorWithCode(
      stubResponse.errorMessage,
      stubResponse.errorCode,
    );
  }

  // Remove properties with undefined values
  let params: { [key in string]: any } | undefined;
  if (opts.params) {
    params = Object.fromEntries(
      Object
        .entries(opts.params)
        .filter(([, value]) => {
          return value !== undefined;
        }),
    );
  }

  // Automatically JSONify arrays and objects
  if (params) {
    params = Object.fromEntries(
      Object
        .entries(params)
        .map(([key, value]) => {
          if (Array.isArray(value) || typeof value === 'object') {
            return [key, JSON.stringify(value)];
          }
          return [key, value];
        }),
    );
  }

  // Send the request
  const sendRequest = await getSendRequest();
  const response = await sendRequest({
    path: opts.path,
    method: opts.method ?? 'GET',
    params,
  });

  // Check for failure
  if (!response || !response.body) {
    throw new ErrorWithCode(
      'We didn\'t get a response from the server. Please check your internet connection.',
      CommonKitErrorCode.NoResponse,
    );
  }
  if (!response.body.success) {
    // Session expired
    if (response.body.code === CommonKitErrorCode.SessionExpired) {
      showSessionExpiredMessage();

      // Never return (don't continue execution)
      await new Promise(() => {
        // Promise that never returns
      });
    }

    // Other errors
    throw new ErrorWithCode(
      (
        response.body.message
        || 'An unknown error occurred. Please contact an admin.'
      ),
      (
        response.body.code
        || CommonKitErrorCode.NoCode
      ),
    );
  }

  // Success! Extract the body
  const { body } = response.body;

  // Return
  return body;
};

export default visitServerEndpoint;
