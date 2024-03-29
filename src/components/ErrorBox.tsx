/**
 * Displays an error
 * @author Gabe Abrams
 */

// Import React
import React from 'react';

// Import FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Import shared types
import ReactKitErrorCode from '../types/ReactKitErrorCode';
import Variant from '../types/Variant';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

type Props = {
  // Error to display
  error: any,
  // Customized title of error box
  title?: string,
  // Handler for close,
  onClose?: () => void,
  // Variant for notice (defaults to danger)
  variant?: Variant,
  // Custom icon before error message (defaults to exclamation triangle)
  icon?: IconProp,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const ErrorBox: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  const {
    error,
    title = 'An Error Occurred',
    onClose,
    variant = Variant.Danger,
    icon = faExclamationTriangle,
  } = props;

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  // Determine error text
  const errorText: string = (
    typeof error === 'string'
      ? error.trim()
      : String(error.message || 'An unknown error occurred. Please contact support.')
  );

  // Error code box
  let errorCodeBox;
  if (error && (error as any).code) {
    errorCodeBox = (
      <span>
        {' '}
        <span
          style={{
            backgroundColor: 'white',
            borderRadius: '0.3rem',
            paddingLeft: '0.2rem',
            paddingRight: '0.2rem',
            color: '#DC4150',
            fontVariant: 'small-caps',
            fontSize: '80%',
            whiteSpace: 'nowrap',
          }}
        >
          code:
          {' '}
          {String((error as any).code ?? ReactKitErrorCode.NoCode).toUpperCase()}
        </span>
      </span>
    );
  }

  // Main UI
  return (
    <div
      className={`alert alert-${variant} text-center`}
      style={{
        maxWidth: '40rem',
        margin: 'auto',
      }}
    >
      <h4 className="mb-1">
        <FontAwesomeIcon
          icon={icon}
          className="me-2"
        />
        {title}
      </h4>
      <div>
        {errorText}
        {errorCodeBox}
      </div>
      {onClose && (
        <div className="mt-2">
          <button
            type="button"
            className="btn btn-light"
            aria-label="dismiss error and close this activity or view"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default ErrorBox;
