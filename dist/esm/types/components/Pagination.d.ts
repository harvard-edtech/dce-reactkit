import React from 'react';
type Props = {
    currentPage: number;
    numPages: number;
    loading?: boolean;
    /**
     * Handler for when page is changed
     * @param page - the new page number
     */
    onPageChanged: (page: number) => void;
};
declare const Pagination: React.FC<Props>;
export default Pagination;
