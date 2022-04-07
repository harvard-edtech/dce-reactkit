/**
 * Wait for a certain number of ms
 * @author Gabe Abrams
 * @param ms number of ms to wait
 */
const waitMs = async (ms = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export default waitMs;
