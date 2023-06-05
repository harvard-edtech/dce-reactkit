import ValidationResult from '../shared/types/ValidationResult';
import validateEmail from '../validateEmail';

/* 
 * VALID TESTS - should all return isValid === true 
 */

const validEmails: string[] = [ 
  'username@gmail.com', 
  'u@hotmail.org',
  '   username@gmail.com', 
  'username@gmail.com        ',
  ' username@gmail.com ',
  'username@harvard.edu',
  'username@harvard.subdomain.edu',
];

const validCleanedEmails: string[] = [ 
  'username@gmail.com', 
  'u@hotmail.org',
  'username@gmail.com', 
  'username@gmail.com',
  'username@gmail.com',
  'username@harvard.edu',
  'username@harvard.subdomain.edu',
];

test(
  'Returns true for a given valid email and removes any leading or trailing whitespace.',
  async () => {
    validEmails.forEach((email, idx) => {
      const validResponse: ValidationResult = { 
        isValid: true, 
        cleanedValue: validCleanedEmails[idx],
      };

      expect(validateEmail(email)).toStrictEqual(validResponse);
    })
  },
); 

/* 
 * INVALID TESTS - should all return isValid === false 
 */

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
];

const invalidResponse: ValidationResult = { 
  isValid: false, 
  errorMessage: 'Please provide a valid email address.',
}

test(
  'Returns false for a given invalid email.',
  async () => {
    invalidEmails.forEach((email) => {
      expect(validateEmail(email)).toStrictEqual(invalidResponse);
    })
  },
); 
