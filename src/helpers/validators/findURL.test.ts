// Import function to test
import findURL from './findURL';

/*------------------------------------------------------------------------*/
/* ---------------------------- Valid Tests ----------------------------- */
/*------------------------------------------------------------------------*/

const validTests: {
  block: string,
  expected: {
    startIndex: number,
    endIndex: number
  }[]
}[] = [
  {
    block: 'Visit http://example.com',
    expected: [{ startIndex: 6, endIndex: 23 }],
  },
  {
    block: 'Multiple URLs: http://one.com and http://two.com.',
    expected: [
      { startIndex: 15, endIndex: 28 },
      { startIndex: 34, endIndex: 47 },
    ],
  },
  {
    block: 'http://localhost and http://127.0.0.1.',
    expected: [
      { startIndex: 0, endIndex: 15 },
      { startIndex: 21, endIndex: 36 },
    ],
  },
  {
    block: 'Embedded URL: text https://embedded-url.com?query=1&value=2.',
    expected: [{ startIndex: 19, endIndex: 58 }],
  },
  {
    block: 'Secure site: https://secure-site.com/path?query=string#fragment',
    expected: [{ startIndex: 13, endIndex: 62 }],
  },
  {
    block: 'Trailing punctuation http://example.com, should not affect the URL',
    expected: [{ startIndex: 21, endIndex: 38 }],
  },
  {
    block: 'Starting punctuation ,http://example.com should not affect the URL',
    expected: [{ startIndex: 22, endIndex: 39 }],
  },
  {
    block: 'No URL',
    expected: [],
  },
];

test(
  'Returns correct start and end indices for valid URLs within a string',
  async () => {
    validTests.forEach(({ block, expected }) => {
      const result = findURL(block);
      expect(result).toStrictEqual(expected);
    });
  },
);
/*------------------------------------------------------------------------*/
/* ---------------------------- Invalid Tests --------------------------- */
/*------------------------------------------------------------------------*/

const invalidTests: {
  block: string,
  expected: {
    startIndex: number,
    endIndex: number
  }[]
}[] = [
  {
    block: 'Does not follow URL regex format http:/example.com and htt://example.com.',
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
      const result = findURL(block);
      expect(result).toStrictEqual(expected);
    });
  },
);
