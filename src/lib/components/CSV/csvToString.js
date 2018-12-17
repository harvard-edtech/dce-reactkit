import CSVParser from 'papaparse';

export default (csv) => {
  return CSVParser.unparse(csv);
};
