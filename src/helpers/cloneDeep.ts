import clone from 'nanoclone';

const cloneDeep: <T>(obj: T) => T = clone;

export default cloneDeep;
