// Import function
import genCommaList from './genCommaList';

test(
  'Empty list.',
  async () => {
    const emptyList: string[] = [];
    const emptyListResponse: string = '';

    const result = genCommaList(emptyList);
    expect(result).toStrictEqual(emptyListResponse);
  },
);

test(
  'One word list.',
  async () => {
    const oneList: string[] = ['apples'];
    const oneListResponse: string = 'apples';

    const result = genCommaList(oneList);
    expect(result).toStrictEqual(oneListResponse);
  },
);

test(
  'Two word list.',
  async () => {
    const twoList: string[] = ['apples', 'oranges'];
    const twoListResponse: string = 'apples and oranges';

    const result = genCommaList(twoList);
    expect(result).toStrictEqual(twoListResponse);
  },
);

test(
  'Three word list.',
  async () => {
    const threeList: string[] = ['apples', 'oranges', 'bananas'];
    const threeListResponse: string = 'apples, oranges, and bananas';

    const result = genCommaList(threeList);
    expect(result).toStrictEqual(threeListResponse);
  },
);

test(
  'Four word list.',
  async () => {
    const fourList: string[] = ['apples', 'oranges', 'bananas', 'grapes'];
    const fourListResponse: string = 'apples, oranges, bananas, and grapes';

    const result = genCommaList(fourList);
    expect(result).toStrictEqual(fourListResponse);
  },
);
