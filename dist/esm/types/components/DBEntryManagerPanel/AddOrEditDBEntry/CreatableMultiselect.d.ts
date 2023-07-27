/**
 * Multiselect component that allows the user to type in values and add them to
 *   the multiselect component
 * @author Yuen Ler Chow
 * @author Gabe Abrams
 */
import React from 'react';
import DBEntryFieldType from '../types/DBEntryFieldType';
type Props = {
    type: DBEntryFieldType.StringArray | DBEntryFieldType.NumberArray;
    values: string[] | number[];
    onChange: (values: string[] | number[]) => void;
    disabled?: boolean;
};
declare const CreatableMultiselect: React.FC<Props>;
export default CreatableMultiselect;
