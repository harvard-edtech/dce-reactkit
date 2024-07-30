// Import the function to be tested
import findURLs from './findURL';

// Import constants
import { INVALID_STRING_ERRORS, INVALID_REGEX_ERROR } from './shared/constants/ERROR_MESSAGES';

/*------------------------------------------------------------------------*/
/* ---------------------------- Valid Tests ----------------------------- */
/*------------------------------------------------------------------------*/

const validTests: { 
  block: string, 
  expected: { 
    start: number, 
    end: number 
  }[] 
}[] = [
  {
    block: 'Visit http://example.com',
    expected: [{ start: 6, end: 23 }],
  },
  {
    block: 'Multiple URLs: http://one.com and http://two.com.',
    expected: [
      { start: 15, end: 29 },
      { start: 34, end: 48 },
    ],
  },
  {
    block: 'http://localhost and http://127.0.0.1.',
    expected: [
      { start: 0, end: 15 },
      { start: 21, end: 37 },
    ],
  },
  {
    block: 'Embedded URL: text https://embedded-url.com?query=1&value=2.',
    expected: [{ start: 13, end: 51 }],
  },
  {
    block: 'Secure site: https://secure-site.com/path?query=string#fragment',
    expected: [{ start: 13, end: 58 }],
  },
  {
    block: 'No URL',
    expected: [],
  },
];

test(
  'Returns correct start and end indices for valid URLs within a string.',
  async () => {
    validTests.forEach(({ block, expected }) => {
      expect(findURLs(block)).toStrictEqual(expected);
    });
  },
);

/*------------------------------------------------------------------------*/
/* ---------------------------- Invalid Tests --------------------------- */
/*------------------------------------------------------------------------*/

const invalidTests: { 
  block: string, 
  expected: { 
    start: number, 
    end: number 
  }[] 
}[] = [
  {
    block: 'Does not follow URL regex format http:/example.com and htt://example.com.',
    expected: [],
  },
  {
    block: 'Trailing punctuation http://example.com, should not affect the URL',
    expected: [{ start: 21, end: 38 }],
  },
  {
    block: 'Starting punctuation ,http://example.com should not affect the URL',
    expected: [{ start: 22, end: 39 }],
  },
  {
    block: 'No spaces in the URL http://exa mple.com',
    expected: [],
  },
  {
    block: '',
    expected: [],
  },
];

test(
  'Returns empty array for strings without valid URLs or for invalid input formats.',
  async () => {
    invalidTests.forEach(({ block, expected }) => {
      expect(findURLs(block)).toStrictEqual(expected);
    });
  },
);