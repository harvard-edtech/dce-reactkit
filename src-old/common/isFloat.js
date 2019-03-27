export default (str) => {
  return String(str).match(/^-?\d*(\.\d+)?$/);
};
