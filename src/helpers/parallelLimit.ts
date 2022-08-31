/**
 * Run tasks in parallel with a limit on how many tasks can execute at once.
 *   No guarantees are made about the order of task execution
 * @author Gabe Abrams
 * @param taskFunctions functions that start asynchronous tasks and optionally
 *   resolve with values
 * @param limit maximum number of asynchronous tasks to permit to run at
 *   once
 * @returns array of resolved values in the same order as the task functions
 */
const parallelLimit = async (
  taskFunctions: (() => Promise<any>)[],
  limit: number,
): Promise<any[]> => {
  const results: any[] = [];

  // Wait until finished with all tasks
  await new Promise<void>((resolve) => {
    /* ------------- Helpers ------------ */

    let nextTaskIndex = 0;
    let numFinishedTasks = 0;
    /**
     * Start the next task
     * @author Gabe Abrams
     */
    const startTask = async () => {
      const taskIndex = nextTaskIndex++;

      // Get the task
      const taskFunction = taskFunctions[taskIndex];
      if (!taskFunction) {
        return;
      }

      // Execute task
      const result = await taskFunction();

      // Add results
      results[taskIndex] = result;

      // Tally and finish
      if (++numFinishedTasks === taskFunctions.length) {
        return resolve();
      }

      // Not finished! Start another task
      startTask();
    };

    /* ----------- Start Tasks ---------- */

    for (let i = 0; i < limit; i++) {
      startTask();
    }
  });

  return results;
};

export default parallelLimit;
