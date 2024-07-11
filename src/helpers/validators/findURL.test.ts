// Import the function to be tested
import findURLs from './findURL';

// Import constants
import { INVALID_STRING_ERRORS, INVALID_REGEX_ERROR } from './shared/constants/ERROR_MESSAGES';

/*------------------------------------------------------------------------*/
/* ---------------------------- Valid Tests --------------------------- */
/*------------------------------------------------------------------------*/

const validTests: { block: string, expected: { start: number, end: number }[] }[] = [
  {
    block: 'Visit http://example.com for more information.',
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
    block: 'Localhost URLs: http://localhost and http://127.0.0.1.',
    expected: [
      { start: 16, end: 31 },
      { start: 36, end: 52 },
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

const invalidTests: { block: string, expected: { start: number, end: number }[] }[] = [
  {
    block: 'No URL.',
    expected: [],
  },
  {
    block: 'URL format is wrong: http:/example.com and htt://example.com.',
    expected: [],
  },
  {
    block: 'Any punctuation after the URL http://example.com, should not count.',
    expected: [{ start: 20, end: 37 }],
  },
  {
    block: 'Starting punctuation ,http://example.com should not count.',
    expected: [{ start: 22, end: 39 }],
  },
  {
    block: 'Spaces in the middle http://exa mple.com is invalid.',
    expected: [],
  },
];

test(
  'Returns empty array for strings without valid URLs.',
  async () => {
    invalidTests.forEach(({ block, expected }) => {
      expect(findURLs(block)).toStrictEqual(expected);
    });
  },
);
