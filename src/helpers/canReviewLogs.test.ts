/**
 * Unit tests for canReviewLogs
 * @author Gabe Abrams
 */

// Import dce-reactkit
import stubServerEndpoint from './stubServerEndpoint';

// Import main function
import canReviewLogs, { resetCanReviewCache } from './canReviewLogs';

// Import shared constants
import LOG_REVIEW_STATUS_ROUTE from '../constants/LOG_REVIEW_STATUS_ROUTE';

describe('helpers > canReviewLogs', () => {
  beforeEach(() => {
    // Reset the cache
    resetCanReviewCache();
  });

  it('should return true if the server returns a truthy value', async () => {
    stubServerEndpoint({
      method: 'GET',
      path: LOG_REVIEW_STATUS_ROUTE,
      body: true,
    });

    const result = await canReviewLogs();
    expect(result).toEqual(true);
  });

  it('should return false if the server returns a falsy value', async () => {
    stubServerEndpoint({
      method: 'GET',
      path: LOG_REVIEW_STATUS_ROUTE,
      body: false,
    });

    const result = await canReviewLogs();
    expect(result).toEqual(false);
  });

  it('should return false if the server throws an error', async () => {
    stubServerEndpoint({
      method: 'GET',
      path: LOG_REVIEW_STATUS_ROUTE,
      errorMessage: 'Server error',
      errorCode: 'C500',
    });

    const result = await canReviewLogs();
    expect(result).toEqual(false);
  });

  it('should cache the server response and return it on subsequent calls', async () => {
    stubServerEndpoint({
      method: 'GET',
      path: LOG_REVIEW_STATUS_ROUTE,
      body: true,
    });

    const result1 = await canReviewLogs();
    const result2 = await canReviewLogs();
    expect(result1).toEqual(true);
    expect(result2).toEqual(true);
  });
});
