import Validator from 'validator';

export default {
  email: Validator.isEmail,
  eightDigit: (datum) => {
    if (!Number.isNaN(parseFloat(datum))) {
      return false;
    }
    return String(datum).length === 8;
  },
  number: (datum) => {
    return !Number.isNaN(parseFloat(datum));
  },
};
