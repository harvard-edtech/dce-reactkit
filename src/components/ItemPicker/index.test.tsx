// Import React
import React from 'react';

// Import testing lib
import Raixa from 'raixa';

// Import item picker
import ItemPicker from '.';

// Import types
import PickableItem from './types/PickableItem';

const items: PickableItem[] = [
  {
    id: '1',
    name: 'Item 1',
    isGroup: false,
    checked: false,
  },
  {
    id: '2',
    name: 'Item 2',
    isGroup: false,
    checked: false,
  },
  {
    id: '3',
    name: 'Item 3',
    isGroup: true,
    children: [
      {
        id: '4',
        name: 'Item 4',
        isGroup: false,
        checked: false,
      },
      {
        id: '5',
        name: 'Item 5',
        isGroup: false,
        checked: false,
      },
      {
        id: '6',
        name: 'Item 6',
        isGroup: true,
        children: [
          {
            id: '7',
            name: 'Item 7',
            isGroup: false,
            checked: false,
          },
          {
            id: '8',
            name: 'Item 8',
            isGroup: true,
            children: [
              {
                id: '9',
                name: 'Item 9',
                isGroup: false,
                checked: false,
              },
              {
                id: '10',
                name: 'Item 10',
                isGroup: true,
                children: [
                  {
                    id: '11',
                    name: 'Item 11',
                    isGroup: false,
                    checked: false,
                  },
                  {
                    id: '12',
                    name: 'Item 12',
                    isGroup: true,
                    children: [
                      {
                        id: '13',
                        name: 'Item 13',
                        isGroup: true,
                        children: [
                          {
                            id: '14',
                            name: 'Item 14',
                            isGroup: true,
                            children: [
                              {
                                id: '15',
                                name: 'Item 15',
                                isGroup: true,
                                children: [
                                  {
                                    id: '16',
                                    name: 'Item 16',
                                    isGroup: false,
                                    checked: false,
                                  },
                                  {
                                    id: '17',
                                    name: 'Item 17',
                                    isGroup: true,
                                    children: [
                                      {
                                        id: '18',
                                        name: 'Item 18',
                                        isGroup: false,
                                        checked: false,
                                      },
                                      {
                                        id: '19',
                                        name: 'Item 19',
                                        isGroup: true,
                                        children: [
                                          {
                                            id: '20',
                                            name: 'Item 20',
                                            isGroup: true,
                                            children: [
                                              {
                                                id: '21',
                                                name: 'Item 21',
                                                isGroup: false,
                                                checked: false,
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: '22',
                name: 'Item 22',
                isGroup: false,
                checked: false,
              },
            ],
          },
        ],
      },
      {
        id: '23',
        name: 'Item 23',
        isGroup: false,
        checked: false,
      },
    ],
  },
  {
    id: '24',
    name: 'Item 24',
    isGroup: false,
    checked: false,
  },
];

const allCheckedItems: PickableItem[] = [
  {
    id: '1',
    name: 'Item 1',
    isGroup: false,
    checked: true,
  },
  {
    id: '2',
    name: 'Item 2',
    isGroup: false,
    checked: true,
  },
  {
    id: '3',
    name: 'Item 3',
    isGroup: true,
    children: [
      {
        id: '4',
        name: 'Item 4',
        isGroup: false,
        checked: true,
      },
      {
        id: '5',
        name: 'Item 5',
        isGroup: false,
        checked: true,
      },
      {
        id: '6',
        name: 'Item 6',
        isGroup: true,
        children: [
          {
            id: '7',
            name: 'Item 7',
            isGroup: false,
            checked: true,
          },
          {
            id: '8',
            name: 'Item 8',
            isGroup: true,
            children: [
              {
                id: '9',
                name: 'Item 9',
                isGroup: false,
                checked: true,
              },
              {
                id: '10',
                name: 'Item 10',
                isGroup: true,
                children: [
                  {
                    id: '11',
                    name: 'Item 11',
                    isGroup: false,
                    checked: true,
                  },
                  {
                    id: '12',
                    name: 'Item 12',
                    isGroup: true,
                    children: [
                      {
                        id: '13',
                        name: 'Item 13',
                        isGroup: true,
                        children: [
                          {
                            id: '14',
                            name: 'Item 14',
                            isGroup: true,
                            children: [
                              {
                                id: '15',
                                name: 'Item 15',
                                isGroup: true,
                                children: [
                                  {
                                    id: '16',
                                    name: 'Item 16',
                                    isGroup: false,
                                    checked: true,
                                  },
                                  {
                                    id: '17',
                                    name: 'Item 17',
                                    isGroup: true,
                                    children: [
                                      {
                                        id: '18',
                                        name: 'Item 18',
                                        isGroup: false,
                                        checked: true,
                                      },
                                      {
                                        id: '19',
                                        name: 'Item 19',
                                        isGroup: true,
                                        children: [
                                          {
                                            id: '20',
                                            name: 'Item 20',
                                            isGroup: true,
                                            children: [
                                              {
                                                id: '21',
                                                name: 'Item 21',
                                                isGroup: false,
                                                checked: true,
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: '22',
                name: 'Item 22',
                isGroup: false,
                checked: true,
              },
            ],
          },
        ],
      },
      {
        id: '23',
        name: 'Item 23',
        isGroup: false,
        checked: true,
      },
    ],
  },
  {
    id: '24',
    name: 'Item 24',
    isGroup: false,
    checked: true,
  },
];

const someCheckedItems: PickableItem[] = [
  {
    id: '1',
    name: 'Item 1',
    isGroup: false,
    checked: false,
  },
  {
    id: '2',
    name: 'Item 2',
    isGroup: false,
    checked: false,
  },
  {
    id: '3',
    name: 'Item 3',
    isGroup: true,
    children: [
      {
        id: '4',
        name: 'Item 4',
        isGroup: false,
        checked: false,
      },
      {
        id: '5',
        name: 'Item 5',
        isGroup: false,
        checked: true,
      },
      {
        id: '6',
        name: 'Item 6',
        isGroup: true,
        children: [
          {
            id: '7',
            name: 'Item 7',
            isGroup: false,
            checked: false,
          },
          {
            id: '8',
            name: 'Item 8',
            isGroup: true,
            children: [
              {
                id: '9',
                name: 'Item 9',
                isGroup: false,
                checked: false,
              },
              {
                id: '10',
                name: 'Item 10',
                isGroup: true,
                children: [
                  {
                    id: '11',
                    name: 'Item 11',
                    isGroup: false,
                    checked: false,
                  },
                  {
                    id: '12',
                    name: 'Item 12',
                    isGroup: true,
                    children: [
                      {
                        id: '13',
                        name: 'Item 13',
                        isGroup: true,
                        children: [
                          {
                            id: '14',
                            name: 'Item 14',
                            isGroup: true,
                            children: [
                              {
                                id: '15',
                                name: 'Item 15',
                                isGroup: true,
                                children: [
                                  {
                                    id: '16',
                                    name: 'Item 16',
                                    isGroup: false,
                                    checked: true,
                                  },
                                  {
                                    id: '17',
                                    name: 'Item 17',
                                    isGroup: true,
                                    children: [
                                      {
                                        id: '18',
                                        name: 'Item 18',
                                        isGroup: false,
                                        checked: false,
                                      },
                                      {
                                        id: '19',
                                        name: 'Item 19',
                                        isGroup: true,
                                        children: [
                                          {
                                            id: '20',
                                            name: 'Item 20',
                                            isGroup: true,
                                            children: [
                                              {
                                                id: '21',
                                                name: 'Item 21',
                                                isGroup: false,
                                                checked: true,
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: '22',
                name: 'Item 22',
                isGroup: false,
                checked: true,
              },
            ],
          },
        ],
      },
      {
        id: '23',
        name: 'Item 23',
        isGroup: false,
        checked: true,
      },
    ],
  },
  {
    id: '24',
    name: 'Item 24',
    isGroup: false,
    checked: false,
  },
];

/**
 * Makes sure that all expected checked items (including nested items) are
 *   checked. Also make sure that no items are checked that should not be
 *   checked. Throw an error if the assertion fails
 * @author Yuen Ler Chow
 * @param pickableItems full list of items
 * @param expectedCheckedItemIds list of item ids that must be checked
 */
const assertExpectedItemsAreChecked = (
  pickableItems: PickableItem[],
  expectedCheckedItemIds: string[],
) => {
  for (const item of pickableItems) {
    const itemShouldBeChecked = (
      expectedCheckedItemIds.includes(String(item.id))
    );

    if (item.isGroup) {
      // Recursively check children
      assertExpectedItemsAreChecked(item.children, expectedCheckedItemIds);
    } else if (item.checked && !itemShouldBeChecked) {
      throw new Error(`Item ${item.id} is checked but not expected to be checked`);
    } else if (!item.checked && itemShouldBeChecked) {
      throw new Error(`Item ${item.id} is not checked but expected to be checked`);
    }
  }
};

test.skip(
  'All Checkboxes appear when initially rendered',
  async () => {
    Raixa.render(
      <ItemPicker
        title="Files"
        items={items}
        onChanged={() => { }}
      />,
    );

    // Make sure every checkbox exists
    for (let i = 1; i <= 24; i++) {
      Raixa.assertExists(`.NestableItemList-CheckboxButton-${i}`);
    }
  },
);

test.skip(
  'Collapsing item 3 results in only the first 3 items and item 24 showing',
  async () => {
    Raixa.render(
      <ItemPicker
        title="Files"
        items={items}
        onChanged={() => { }}
      />,
    );

    // Collapse the dropdown
    Raixa.click('.NestableItemList-dropdown-button-3');

    // Make sure all the children of the dropdown do not exist
    for (let i = 1; i <= 24; i++) {
      if (i <= 3 || i === 24) {
        Raixa.assertExists(`.NestableItemList-CheckboxButton-${i}`);
      } else {
        Raixa.assertAbsent(`.NestableItemList-CheckboxButton-${i}`);
      }
    }
  },
);

test.skip(
  'Collapsing item 15 results hides items 16 through 21',
  async () => {
    Raixa.render(
      <ItemPicker
        title="Files"
        items={items}
        onChanged={() => { }}
      />,
    );

    // Collapse the dropdown
    Raixa.click('.NestableItemList-dropdown-button-15');

    // Make sure all the children of the dropdown do not exist
    for (let i = 1; i <= 24; i++) {
      if (i <= 15 || i >= 22) {
        Raixa.assertExists(`.NestableItemList-CheckboxButton-${i}`);
      } else {
        Raixa.assertAbsent(`.NestableItemList-CheckboxButton-${i}`);
      }
    }
  },
);

test.skip(
  'Collapsing item 10 results hides items 11 through 21',
  async () => {
    Raixa.render(
      <ItemPicker
        title="Files"
        items={items}
        onChanged={() => { }}
      />,
    );

    // Collapse the dropdown
    Raixa.click('.NestableItemList-dropdown-button-10');

    // Make sure all the children of the dropdown do not exist
    for (let i = 1; i <= 24; i++) {
      if (i <= 10 || i >= 22) {
        Raixa.assertExists(`.NestableItemList-CheckboxButton-${i}`);
      } else {
        Raixa.assertAbsent(`.NestableItemList-CheckboxButton-${i}`);
      }
    }
  },
);

test.skip(
  'All Checkboxes are unchecked when initially rendered',
  async () => {
    Raixa.render(
      <ItemPicker
        title="Files"
        items={items}
        onChanged={() => { }}
      />,
    );

    // Make sure all checkboxes are unchecked
    for (let i = 1; i <= 24; i++) {
      Raixa.assertHasClass(
        `.NestableItemList-CheckboxButton-${i}`,
        'CheckboxButton-status-unchecked',
      );
    }
  },
);

test.skip(
  'Checking item 1 checks items 1',
  async () => {
    let updatedItems: PickableItem[] = [];
    Raixa.render(
      <ItemPicker
        title="Files"
        items={items}
        onChanged={(newUpdatedItems) => {
          updatedItems = newUpdatedItems;
        }}
      />,
    );

    // Make sure the checkbox is unchecked to start
    Raixa.assertHasClass(
      '.NestableItemList-CheckboxButton-1',
      'CheckboxButton-status-unchecked',
    );

    // Toggle the checkbox
    Raixa.click('.NestableItemList-CheckboxButton-1');

    // Make sure the item is now checked
    assertExpectedItemsAreChecked(updatedItems, ['1']);
  },
);

test.skip(
  'Clicking item 1 unchecks items 1',
  async () => {
    let updatedItems: PickableItem[] = [];
    Raixa.render(
      <ItemPicker
        title="Files"
        items={allCheckedItems}
        onChanged={(newUpdatedItems) => {
          updatedItems = newUpdatedItems;
        }}
      />,
    );

    // Make sure the checkbox starts checked
    Raixa.assertHasClass(
      '.NestableItemList-CheckboxButton-1',
      'CheckboxButton-status-checked',
    );

    // Uncheck the checkbox
    Raixa.click('.NestableItemList-CheckboxButton-1');

    // Make sure everything but the first checkbox is checked
    const expected = [];
    for (let i = 2; i <= 24; i++) {
      expected.push(String(i));
    }
    assertExpectedItemsAreChecked(updatedItems, expected);
  },
);

test.skip(
  'Checking item 3 checks items 3 through 23',
  async () => {
    let updatedItems: PickableItem[] = [];
    Raixa.render(
      <ItemPicker
        title="Files"
        items={items}
        onChanged={(newUpdatedItems) => {
          updatedItems = newUpdatedItems;
        }}
      />,
    );

    // Make sure items 3-23 are unchecked
    for (let i = 3; i <= 23; i++) {
      Raixa.assertHasClass(
        `.NestableItemList-CheckboxButton-${i}`,
        'CheckboxButton-status-unchecked',
      );
    }

    // Toggle the checkbox
    Raixa.click('.NestableItemList-CheckboxButton-3');

    // Make sure the checkbox and its children are all checked
    const expected = [];
    for (let i = 3; i <= 23; i++) {
      expected.push(String(i));
    }
    assertExpectedItemsAreChecked(updatedItems, expected);
  },
);

test.skip(
  'Clicking folder 3 checks unchecks 3 through 23',
  async () => {
    let updatedItems: PickableItem[] = [];
    Raixa.render(
      <ItemPicker
        title="Files"
        items={allCheckedItems}
        onChanged={(newUpdatedItems) => {
          updatedItems = newUpdatedItems;
        }}
      />,
    );

    // Make sure items 3-23 start checked
    for (let i = 3; i <= 23; i++) {
      Raixa.assertHasClass(
        `.NestableItemList-CheckboxButton-${i}`,
        'CheckboxButton-status-checked',
      );
    }

    // Toggle the checkbox
    Raixa.click('.NestableItemList-CheckboxButton-3');

    // Make sure 3-23 are not checked
    assertExpectedItemsAreChecked(updatedItems, ['1', '2', '24']);
  },
);

test.skip(
  'Clicking dashed folder 3 checks 3 through 23',
  async () => {
    let updatedItems: PickableItem[] = [];
    Raixa.render(
      <ItemPicker
        title="Files"
        items={someCheckedItems}
        onChanged={(newUpdatedItems) => {
          updatedItems = newUpdatedItems;
        }}
      />,
    );

    // Make sure the checkbox is dashed to start
    Raixa.assertHasClass(
      '.NestableItemList-CheckboxButton-3',
      'CheckboxButton-dashed',
    );

    // Toggle the checkbox
    Raixa.click('.NestableItemList-CheckboxButton-3');

    // Make sure checkboxes 3-23 are all checked
    const expected = [];
    for (let i = 3; i <= 23; i++) {
      expected.push(String(i));
    }
    assertExpectedItemsAreChecked(updatedItems, expected);
  },
);
