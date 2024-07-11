// Importing the testing function
import chicagoTitleCase from './chicagoTitleCase';

// Import constants
import { INVALID_STRING_ERRORS, INVALID_REGEX_ERROR } from './shared/constants/ERROR_MESSAGES';

/*------------------------------------------------------------------------*/
/* ---------------------------- Valid Tests --------------------------- */
/*------------------------------------------------------------------------*/

const validTests: { input: string, expected: string }[] = [
  {
    input: 'this is the american language',
    expected: 'This the American language',
  },
  {
    input: 'to kill a mockingbird',
    expected: 'To Kill a Mockingbird',
  },
  {
    input: 'the lord of the rings',
    expected: 'The Lord of the Rings',
  },
  {
    input: 'pride and prejudice',
    expected: 'Pride and Prejudice',
  },
  {
    input: 'the road not taken',
    expected: 'The Road Not Taken',
  },
];

test(
  'Converts strings to Chicago title case correctly.',
  async () => {
    validTests.forEach(({ input, expected }) => {
      expect(chicagoTitleCase(input)).toBe(expected);
    });
  },
);

/*------------------------------------------------------------------------*/
/* ---------------------------- Edge Cases ---------------------------- */
/*------------------------------------------------------------------------*/

const edgeCases: { input: string, expected: string }[] = [
  {
    input: 'x',
    expected: 'X',
  },
  {
    input: ' ',
    expected: ' ',
  },
  {
    input: '',
    expected: '',
  },
  {
    input: 'the',
    expected: 'The',
  },
  {
    input: 'THE ROAD NOT TAKEN',
    expected: 'The Road Not Taken',
  },
  {
    input: 'tO kiLL A mOckingBirD',
    expected: 'To Kill a Mockingbird',
  },
  {
    input: 'pRiDe And pReduJiCe',
    expected: 'Pride and Prejudice',
  },
];

test(
  'Handles the edge cases for the function that converts a string to Chicago Title Case.',
  async () => {
    edgeCases.forEach(({ input, expected }) => {
      expect(chicagoTitleCase(input)).toBe(expected);
    });
  },
);
