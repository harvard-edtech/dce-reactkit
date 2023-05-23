import React from 'react';
import DBEntryFieldType from '../types/DBEntryFieldType';
declare type Props = {
    type: DBEntryFieldType.StringArray | DBEntryFieldType.NumberArray;
    values: string[] | number[];
    onChange: (values: string[] | number[]) => void;
    disabled?: boolean;
};
declare const CreatableMultiselect: React.FC<Props>;
export default CreatableMultiselect;
