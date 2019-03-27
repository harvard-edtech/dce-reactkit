import _ from 'lodash-arithmetic';

/* Simple object with high-precision mathematical functions */
export default {
  // Adds a + b
  add: (a, b) => {
    return _.add(a, b);
  },
  // Subtracts b from a
  sub: (a, b) => {
    return _.subtract(a, b);
  },
  // Multiplies a * b
  mult: (a, b) => {
    return _.multiply(a, b);
  },
  // Divides a / b
  div: (a, b) => {
    return _.divide(a, b);
  },
};
