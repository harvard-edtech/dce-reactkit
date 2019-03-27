// Import math
import math from '../../../common/math';

export default (data) => {
  return data.reduce((sum, value) => {
    return math.add(sum, value);
  }, 0);
};
