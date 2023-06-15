// Import types
import ValidationResult from '../shared/types/ValidationResult';

// Import constants
import { INVALID_EMAIL_ERROR } from '../shared/constants/ERROR_MESSAGES';

// Import function
import validateEmail from '../validateEmail';

/*------------------------------------------------------------------------*/
/* ---------------------------- Valid Tests --------------------------- */
/*------------------------------------------------------------------------*/

const validEmailPairs: { input: string, cleaned: string }[] = [
  {
    input: 'username@gmail.com',
    cleaned: 'username@gmail.com',
  },
  {
    input: 'u@hotmail.org',
    cleaned: 'u@hotmail.org',
  },
  {
    input: '   username@gmail.com',
    cleaned: 'username@gmail.com',
  },
  {
    input: 'username@gmail.com        ',
    cleaned: 'username@gmail.com',
  },
  {
    input: ' username@gmail.com ',
    cleaned: 'username@gmail.com',
  },
  {
    input: 'username@harvard.edu',
    cleaned: 'username@harvard.edu',
  },
  {
    input: 'username@harvard.subdomain.edu',
    cleaned: 'username@harvard.subdomain.edu',
  },
  {
    input: '\nusername@harvard.subdomain.edu',
    cleaned: 'username@harvard.subdomain.edu',
  },
  {
    input: '\n\tusername@harvard.subdomain.edu',
    cleaned: 'username@harvard.subdomain.edu',
  },
  {
    input: 'username@harvard.subdomain.edu\n',
    cleaned: 'username@harvard.subdomain.edu',
  },
  {
    input: 'username@harvard.subdomain.edu\n\t',
    cleaned: 'username@harvard.subdomain.edu',
  },
];

test(
  'Returns true for a given valid email and removes any leading or trailing whitespace.',
  async () => {
    validEmailPairs.forEach((pair) => {
      const validResponse: ValidationResult<string> = {
        isValid: true,
        cleanedValue: pair.cleaned,
      };

      expect(validateEmail(pair.input)).toStrictEqual(validResponse);
    });
  },
);

/*------------------------------------------------------------------------*/
/* ---------------------------- Invalid Tests --------------------------- */
/*------------------------------------------------------------------------*/

const invalidEmails: string[] = [
  '',
  ' ',
  'gmail.com',
  '@gmail.com ',
  'username',
  'username@.com',
  'user name@gmail.com',
  'username @gmail.com',
  'username@ gmail.com',
  'username@gmail .com',
  'username\t@gmail.com',
  'username\n@gmail.com',
  'username@gmail\n.com',
  'username@gmail.\tcom',
  'user\nname@gmail.com',
  'user\tname@gmail.com',
];

const invalidResponse: ValidationResult<string> = {
  isValid: false,
  errorMessage: INVALID_EMAIL_ERROR,
};

test(
  'Returns false for a given invalid email.',
  async () => {
    invalidEmails.forEach((email) => {
      expect(validateEmail(email)).toStrictEqual(invalidResponse);
    });
  },
);
