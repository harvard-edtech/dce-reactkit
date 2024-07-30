
// Import the function to be tested
// import isValid from './validURL';

// // Import constants
// import { INVALID_STRING_ERRORS, INVALID_REGEX_ERROR } from './shared/constants/ERROR_MESSAGES';

// /*------------------------------------------------------------------------*/
// /* ---------------------------- Valid Tests --------------------------- */
// /*------------------------------------------------------------------------*/

// const validUrls: string[] = [
//   'http://example.com',
//   'https://example.com',
//   'http://www.example.com',
//   'https://www.example.com',
//   'https://example.com/path',
//   'http://example.com/path',
//   'https://example.com?query=string',
//   'http://example.com?query=string',
//   'https://example.com#fragment',
//   'http://example.com#fragment',
//   'http://localhost',
//   'https://localhost:3000',
//   'http://localhost:3000',
//   'http://127.0.0.1',
//   'http://127.0.0.1:3000',
//   'ftp://example.com/path',
//   'ftp://example.com',
//   'https://127.0.0.1:3000',
//   'file:///C:/path/to/file'
// ];

// test(
//   'Returns true for a given valid URL.',
//   async () => {
//     validUrls.forEach((url) => {
//       expect(isValid(url)).toBe(true);
//     });
//   },
// );

// /*------------------------------------------------------------------------*/
// /* ---------------------------- Invalid Tests --------------------------- */
// /*------------------------------------------------------------------------*/

// const invalidUrls: string[] = [
//   '',
//   ' ',
//   'example',
//   'http://',
//   'http://.',
//   'http://..',
//   'http://##/',
//   'http://../',
//   'http://??/',
//   'http://#',
//   'http://##',
//   '//',
//   '//a',
//   '///a',
//   '///',
//   'http:///a',
//   'http://www.foo.bar./',
//   'http://foo.bar/foo(bar)baz quux',
//   'http://3628126748',
//   'http://.www.foo.bar/',
//   'http://.www.foo.bar./',
//   'http://123.123.123',
//   'http://1.1.1.1.1',
//   'http://example.com:99999',
//   'http://example.com:80:80',
//   'http://example.com::80',
//   'http://example.com:-80',
//   'http://-example.com',
//   'http://example.com-',
//   'http://example.com_',
//   'http://example..com',
//   'http://example.com.',
//   'http://.example.com'
// ];

// test(
//   'Returns false for a given invalid URL.',
//   async () => {
//     invalidUrls.forEach((url) => {
//       expect(isValid(url)).toBe(false);
//     });
//   },
// );