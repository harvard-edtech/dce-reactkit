/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

export const INVALID_REGEX_ERROR = 'input does not follow the requested format';
export const INVALID_EMAIL_ERROR = 'Please provide a valid email address.';
export const INVALID_PHONE_ERROR = 'Please provide a valid phone number.';
export const INVALID_STRING_ERRORS = {
  MIN_LEN: (minLen: number) => {
    return `input must not be under ${minLen} character(s)`;
  },
  MAX_LEN: (maxLen: number) => {
    return `input must not be over ${maxLen} character(s)`;
  },
  LETTERS_ONLY: 'input must only contain letters',
  NUMBERS_ONLY: 'input must only contain numbers',
  MESSAGE_INTRO: 'The following error(s) occurred: ',
};
