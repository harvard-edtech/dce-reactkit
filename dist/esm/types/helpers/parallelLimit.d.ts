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
declare const parallelLimit: (taskFunctions: (() => Promise<any>)[], limit: number) => Promise<any[]>;
export default parallelLimit;
