import _ from 'lodash-arithmetic';

export default {
  add: (a, b) => {
    return _.add(a, b);
  },
  sub: (a, b) => {
    return _.subtract(a, b);
  },
  mult: (a, b) => {
    return _.multiply(a, b);
  },
  div: (a, b) => {
    return _.divide(a, b);
  },
};
