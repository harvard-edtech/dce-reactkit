export default (items, getItems) => {
  // Use either items or getItems (whichever is included)
  let lst = items || getItems;

  // If no items, just resolve with empty list
  if (!lst) {
    return Promise.resolve([]);
  }

  // Call functions if type is function
  if (typeof lst === 'function') {
    lst = lst();
  }

  // Return a promise
  if (lst) {
    return Promise.resolve(lst);
  }
  return Promise.resolve([]);
};
