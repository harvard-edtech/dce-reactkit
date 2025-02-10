import React from 'react';
type Props = {
    currentPage: number;
    numPages: number;
    loading?: boolean;
    onPageChanged: (page: number) => void;
};
declare const Pagination: React.FC<Props>;
export default Pagination;
