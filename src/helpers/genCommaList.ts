/**
 * Given an array of strings, create a single comma-separated string that includes
 * 'and' as well as an oxford comma.
 * Ex: ['apples'] => 'apples'
 * Ex: ['apples', 'bananas'] => 'apples and bananas'
 * Ex: ['apples', 'bananas', 'grapes'] => 'apples, bananas, and grapes'
 * @author Austen Money
 * @param list an array of elements to be made into a single comma-separated string.
 * @returns a comma-separated string.
 */
const genCommaList = (list: string[]): string => {
  const { length } = list;

  return (
    length < 2
      ? list.join('')
      : `${list.slice(0, length - 1).join(', ')}${length < 3 ? ' and ' : ', and '}${list[length - 1]}`
  );
};

export default genCommaList;
