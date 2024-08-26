import isValid from './isValid';

/*------------------------------------------------------------------------*/
/* ---------------------------- Valid Tests --------------------------- */
/*------------------------------------------------------------------------*/

const validUrls: string[] = [
  'http://example.com',
  'https://example.com',
  'http://www.example.com',
  'https://www.example.com',
  'https://example.com/path',
  'http://example.com/path',
  'https://example.com?query=string',
  'http://example.com?query=string',
  'https://example.com#fragment',
  'http://example.com#fragment',
  'http://localhost',
  'https://localhost:3000',
  'http://localhost:3000',
  'http://127.0.0.1',
  'http://127.0.0.1:3000',
  'https://127.0.0.1:3000',
];

test(
  'Returns true for a given valid URL.',
  async () => {
    validUrls.forEach((url) => {
      expect(isValid(url)).toBe(true);
    });
  },
);

/*------------------------------------------------------------------------*/
/* ---------------------------- Invalid Tests --------------------------- */
/*------------------------------------------------------------------------*/

// A comprehensive list of invalid URLs for testing purposes.
const invalidUrls: string[] = [
  '',
  ' ',
  'example',
  'http://',
  'http:/?/',
  'http://#',
  'http://##/',
  '//',
  '//x',
  'http://.',
  'http://..',
  'http://.www.foo.bar/',
  'http://1.1.1.1.1',
  'http://example.com:12:34:56',
  'http://example.com::10',
  'http://example.com.',
  'http://.example.com',
  'http://example.com:-+',
  'http://example..com',
];

test(
  'Returns false for a given invalid URL.',
  async () => {
    invalidUrls.forEach((url) => {
      const result = isValid(url);
      expect(result).toBe(false);
    });
  },
);
