// Import React
import React from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props
type Props = {
  // Current page number (1-indexed)
  currentPage: number,
  // Total number of pages
  numPages: number,
  // True if a page change is in progress (to disable buttons)
  loading?: boolean,
  /**
   * Handler for when page is changed
   * @param page - the new page number
   */
  onPageChanged: (page: number) => void,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const Pagination: React.FC<Props> = (props: Props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure props
  const {
    currentPage,
    numPages,
    loading = false,
    onPageChanged,
  } = props;

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  // Compute pages to display
  const pages: number[] = [];
  const delta = 2; // how many pages to show on either side of current
  let start = Math.max(1, currentPage - delta);
  let end = Math.min(numPages, currentPage + delta);

  // If we are too close to the beginning or end, shift the window.
  if (currentPage - delta < 1) {
    end = Math.min(numPages, end + (1 - (currentPage - delta)));
  }
  if (currentPage + delta > numPages) {
    start = Math.max(1, start - ((currentPage + delta) - numPages));
  }
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Render
  return (
    <nav
      aria-label="Page navigation for logs"
      className="mt-3"
    >
      <ul className="pagination justify-content-center">
        {/* Previous Button */}
        <li className={`page-item ${(currentPage <= 1 || loading) ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => { return onPageChanged(currentPage - 1); }}
            disabled={currentPage <= 1 || loading}
            aria-label="Go to previous page"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {' '}
            Prev
          </button>
        </li>

        {/* First page (if needed) */}
        {(currentPage > 3 && pages[0] !== 1) && (
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => { return onPageChanged(1); }}
              disabled={loading}
              aria-label="Go to page 1"
            >
              1
            </button>
          </li>
        )}

        {/* Ellipsis if gap between first page and start of window */}
        {currentPage > 4 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}

        {/* Page numbers */}
        {pages.map((pageNum) => {
          return (
            <li key={pageNum} className={`page-item ${pageNum === currentPage ? 'active' : ''}`}>
              <button
                type="button"
                className="page-link"
                onClick={() => { return onPageChanged(pageNum); }}
                disabled={loading}
                aria-label={`Go to page ${pageNum}`}
              >
                {pageNum}
              </button>
            </li>
          );
        })}

        {/* Ellipsis if gap between end of window and last page */}
        {currentPage < numPages - 3 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}

        {/* Last page (if needed) */}
        {(
          currentPage < numPages - 2
          && pages[pages.length - 1] !== numPages
        ) && (
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => { return onPageChanged(numPages); }}
              disabled={loading}
              aria-label="Go to last page"
            >
              {numPages}
            </button>
          </li>
        )}

        {/* Next Button */}
        <li className={`page-item ${(currentPage >= numPages || loading) ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => { return onPageChanged(currentPage + 1); }}
            disabled={currentPage >= numPages || loading}
            aria-label="Go to next page"
          >
            Next
            {' '}
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
