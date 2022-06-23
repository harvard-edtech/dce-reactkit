// Import other helpers
import waitMs from './waitMs';

/**
 * Start a dynamic wait, call the function once the operation has completed and
 *   the dynamic wait will continue waiting for the rest of the minimum time
 * @author Gabe Abrams
 * @param minWaitMs the minimum number of ms to wait
 * @returns async function to call to finish the wait
 */
const startMinWait = (minWaitMs: number): () => Promise<void> => {
  const startTimestamp = Date.now();

  /**
   * Finish the remaining time to wait
   * @author Gabe Abrams
   */
  return async () => {
    const endTimestamp = Date.now();

    // Calculate remaining time to wait
    const elapsedTimeMs = (endTimestamp - startTimestamp);
    const remainingTimeToWaitMs = minWaitMs - elapsedTimeMs;
    if (remainingTimeToWaitMs <= 0) {
      return;
    }

    // Perform wait
    await waitMs(remainingTimeToWaitMs);
  };
};

export default startMinWait;
