/**
 * Copiable text box
 * @author Gabe Abrams
 */

// Import React
import React, { useReducer } from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

// Import other reactkit functions
import { alert } from './AppWrapper';
import waitMs from '../helpers/waitMs';

/*------------------------------------------------------------------------*/
/*                                  Types                                 */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // The text to copy
  text: string,
  // If defined, the text area will have a maximum width
  maxTextWidthRem?: number,
  // Human-readable label of the copy field
  label?: string,
  // FontAwesome icon to place before the label
  labelIcon?: any,
  // If defined, the label will have a minimum width
  minLabelWidthRem?: number,
  // If true, the box will be a textarea to support larger, multiline text
  multiline?: boolean,
  // Number of lines to show in multiline view (only relevant if multiline)
  numVisibleLines?: number,
  // If defined, text box becomes clickable and this is the handler
  onClick?: () => void,
  // Id of the text area
  textAreaId?: string,
  // Id of the copy button
  copyButtonId?: string,
};

/*------------------------------------------------------------------------*/
/*                                  State                                 */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
  // True if text was recently copied
  recentlyCopied: boolean,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
  // Indicate that the text was recently copied
  IndicateRecentlyCopied = 'indicate-recently-copied',
  // Clear the status
  ClearRecentlyCopiedStatus = 'clear-recently-copied-status',
}

// Action definitions
type Action = {
  // Action type
  type: (
    | ActionType.IndicateRecentlyCopied
    | ActionType.ClearRecentlyCopiedStatus
  ),
};

/**
 * Reducer that executes actions
 * @author Gabe Abrams
 * @param state current state
 * @param action action to execute
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.IndicateRecentlyCopied: {
      return {
        recentlyCopied: true,
      };
    }
    case ActionType.ClearRecentlyCopiedStatus: {
      return {
        recentlyCopied: false,
      };
    }
    default: {
      return state;
    }
  }
};

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const CopiableBox: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /*                                  Setup                                 */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    text,
    maxTextWidthRem,
    label,
    labelIcon,
    minLabelWidthRem,
    multiline,
    numVisibleLines = 10,
    onClick,
    textAreaId,
    copyButtonId,
  } = props;

  /* -------------- State ------------- */

  // Initial state
  const initialState: State = {
    recentlyCopied: false,
  };

  // Initialize state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure common state
  const {
    recentlyCopied,
  } = state;

  /*------------------------------------------------------------------------*/
  /*                           Component Functions                          */
  /*------------------------------------------------------------------------*/

  /**
   * Perform a copy
   * @author Gabe Abrams
   */
  const performCopy = async () => {
    // Write to clipboard
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      return alert(
        'Unable to copy',
        'Oops! We couldn\'t copy that to the clipboard. Please copy the text manually.',
      );
    }

    // Show copied notice
    dispatch({
      type: ActionType.IndicateRecentlyCopied,
    });

    // Wait a moment
    await waitMs(4000);

    // Hide copied notice
    dispatch({
      type: ActionType.ClearRecentlyCopiedStatus,
    });
  };

  /*------------------------------------------------------------------------*/
  /*                                 Render                                 */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /*                 Main UI                */
  /*----------------------------------------*/

  return (
    <div className="input-group mb-2">
      {/* Label */}
      {(label || labelIcon) && (
        <span
          className="input-group-text"
          style={{
            minWidth: (
              minLabelWidthRem
                ? `${minLabelWidthRem}rem`
                : undefined
            ),
          }}
        >
          {labelIcon && (
            <FontAwesomeIcon
              icon={labelIcon}
              className={label ? 'me-1' : undefined}
            />
          )}
          {label}
        </span>
      )}

      {/* Text */}
      {
        multiline
          ? (
            <textarea
              id={textAreaId}
              className="CopiableBox-text CopiableBox-text-multiline form-control bg-white text-dark"
              value={text}
              aria-label={`${label} text`}
              rows={numVisibleLines}
              onClick={onClick}
              style={{
                cursor: (
                  onClick
                    ? 'pointer'
                    : 'default'
                ),
                textDecoration: (
                  onClick
                    ? 'underline'
                    : undefined
                ),
                maxWidth: (
                  maxTextWidthRem
                    ? `${maxTextWidthRem}rem`
                    : undefined
                ),
              }}
              readOnly
            />
          )
          : (
            <input
              id={textAreaId}
              type="text"
              className="CopiableBox-text CopiableBox-text-single-line form-control bg-white text-dark"
              value={text}
              aria-label={`${label} text`}
              onClick={onClick}
              style={{
                cursor: (
                  onClick
                    ? 'pointer'
                    : 'default'
                ),
                textDecoration: (
                  onClick
                    ? 'underline'
                    : undefined
                ),
                maxWidth: (
                  maxTextWidthRem
                    ? `${maxTextWidthRem}rem`
                    : undefined
                ),
              }}
              readOnly
            />
          )
      }

      <button
        id={copyButtonId}
        className="btn btn-secondary"
        type="button"
        aria-label={`copy ${label} to the clipboard`}
        disabled={recentlyCopied}
        style={{
          minWidth: '5.2rem',
        }}
        onClick={performCopy}
      >
        {
          recentlyCopied
            ? 'Copied!'
            : (
              <span>
                <FontAwesomeIcon
                  icon={faClipboard}
                  className="me-1"
                />
                Copy
              </span>
            )
        }
      </button>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/

// Export component
export default CopiableBox;
