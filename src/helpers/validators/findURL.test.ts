// eslint-disable-next-line import/no-named-as-default
import findURL from './findURL';

/*------------------------------------------------------------------------*/
/* ---------------------------- Valid Tests ----------------------------- */
/*------------------------------------------------------------------------*/

const validTests: {
  block: string,
  expected: {
    startIndice: number,
    endIndice: number
  }[]
}[] = [
  {
    block: 'Visit http://example.com',
    expected: [{ startIndice: 6, endIndice: 23 }],
  },
  {
    block: 'Multiple URLs: http://one.com and http://two.com.',
    expected: [
      { startIndice: 15, endIndice: 28 },
      { startIndice: 34, endIndice: 47 },
    ],
  },
  {
    block: 'http://localhost and http://127.0.0.1.',
    expected: [
      { startIndice: 0, endIndice: 15 },
      { startIndice: 21, endIndice: 36 },
    ],
  },
  {
    block: 'Embedded URL: text https://embedded-url.com?query=1&value=2.',
    expected: [{ startIndice: 19, endIndice: 58 }],
  },
  {
    block: 'Secure site: https://secure-site.com/path?query=string#fragment',
    expected: [{ startIndice: 13, endIndice: 62 }],
  },
  {
    block: 'Trailing punctuation http://example.com, should not affect the URL',
    expected: [{ startIndice: 21, endIndice: 38 }],
  },
  {
    block: 'Starting punctuation ,http://example.com should not affect the URL',
    expected: [{ startIndice: 22, endIndice: 39 }],
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
    startIndice: number,
    endIndice: number
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
