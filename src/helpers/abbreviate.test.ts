/**
 * Unit tests for abbreviate helper
 * @author Gabe Abrams
 */

import abbreviate from './abbreviate';

describe('helpers > abbreviate', () => {
  it('should return the original text if it is shorter than the maxChars parameter', () => {
      const text = 'Hello, world!';
      const maxChars = 20;
      expect(abbreviate(text, maxChars)).toEqual(text);
  });

  it('should abbreviate the text if it is longer than the maxChars parameter', () => {
    const text = 'This is a really long string that needs to be abbreviated';
    const maxChars = 20;
    expect(abbreviate(text, maxChars)).toEqual('This is a really...');
  });

  it('should handle leading/trailing whitespace', () => {
    const text = '   This is a string with leading/trailing whitespace   ';
    const maxChars = 20;
    expect(abbreviate(text, maxChars)).toEqual('This is a string...');
  });
});