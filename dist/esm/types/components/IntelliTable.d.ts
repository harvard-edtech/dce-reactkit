/**
 * Intelligent table
 * @author Gabe Abrams
 */
import React from 'react';
import IntelliTableColumn from '../types/IntelliTableColumn';
type Props = {
    title: string;
    id: string;
    data: {
        id: string | number;
        [k: string]: any;
    }[];
    columns: IntelliTableColumn[];
    csvName?: string;
};
declare const IntelliTable: React.FC<Props>;
export default IntelliTable;
