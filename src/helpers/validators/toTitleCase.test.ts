// Importing the testing function
import toTitleCase from './toTitleCase';

/*------------------------------------------------------------------------*/
/* ---------------------------- Valid Tests --------------------------- */
/*------------------------------------------------------------------------*/

const validTests: { input: string, expected: string }[] = [
  {
    input: 'this is the american language',
    expected: 'This Is the American Language',
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
      expect(toTitleCase(input)).toEqual(expected);
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
    input: 'pride and prejudice',
    expected: 'Pride and Prejudice',
  },
];

test(
  'Handles the edge cases for the function that converts a string to Chicago Title Case.',
  async () => {
    edgeCases.forEach(({ input, expected }) => {
      expect(toTitleCase(input)).toEqual(expected);
    });
  },
);

/*------------------------------------------------------------------------*/
/* --------------------------- Failure Cases -------------------------- */
/*------------------------------------------------------------------------*/

const failureCases: { input: any, errorExpected: string }[] = [
  {
    input: undefined,
    errorExpected: 'Input is undefined',
  },
  {
    input: null,
    errorExpected: 'Input is null',
  },
  {
    input: 123,
    errorExpected: 'Input is a number. It must be a string',
  },
];

failureCases.forEach(({ input, errorExpected }) => {
  test(
    `Throws an error when handed invalid input (${input}).`,
    () => {
      expect(() => { return toTitleCase(input); }).toThrow(errorExpected);
    },
  );
});
