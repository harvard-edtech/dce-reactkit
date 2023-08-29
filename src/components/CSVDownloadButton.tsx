/**
 * Button for downloading a csv file
 * @author Gabe Abrams
 */

// Import React
import React from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // The filename
  filename: string,
  // The contents of the CSV file to download
  csv: string,
  // Id of the button
  id?: string,
  // Class name of the button
  className?: string,
  // Aria label for the button
  ariaLabel?: string,
  // Style for the button
  style?: { [k: string]: any },
  // Handler for when the button is clicked (in addition to download)
  onClick?: () => void,
  // Contents of button
  children?: React.ReactNode,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const CSVDownloadButton: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    filename,
    csv,
    id,
    className,
    ariaLabel,
    style,
    onClick,
    children,
  } = props;

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  // Render the button
  return (
    <a
      id={id}
      download={filename}
      href={`data:application/octet-stream,${encodeURIComponent(csv)}`}
      className={`CSVDownloadButton-button ${className ?? 'btn btn-secondary'}`}
      aria-label={(
        ariaLabel
          ? `Click to download ${filename}`
          : ariaLabel
      )}
      style={style}
      onClick={onClick}
    >
      {!children && (
        <>
          <FontAwesomeIcon
            icon={faCloudDownloadAlt}
          />
          {' '}
          Download CSV
        </>
      )}
      {children}
    </a>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default CSVDownloadButton;
