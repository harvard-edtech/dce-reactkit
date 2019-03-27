import Validator from 'validator';

/* Simple object of built-in text validators */
export default {
  // Validates emails
  email: Validator.isEmail,
  // Validates 8-digit numbers (HUIDs)
  eightDigit: datum => {
    if (!Number.isNaN(parseFloat(datum))) {
      return false;
    }
    return String(datum).length === 8;
  },
  // Validates numbers
  number: datum => {
    return !Number.isNaN(parseFloat(datum));
  }
};