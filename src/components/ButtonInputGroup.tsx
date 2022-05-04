/**
 * Input group with a title and space for buttons
 * @author Gabe Abrams
 */

// Import React
import React from 'react';

/*------------------------------------------------------------------------*/
/*                                  Types                                 */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // Label text
  label: string,
  // Minimum width of the label (css units)
  minLabelWidth?: string,
  // Buttons
  children: React.ReactNode,
};

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const ButtonInputGroup: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /*                                  Setup                                 */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    label,
    minLabelWidth,
    children,
  } = props;

  /*------------------------------------------------------------------------*/
  /*                                 Render                                 */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /*                 Main UI                */
  /*----------------------------------------*/

  return (
    <div className="input-group">
      <div className="input-group-prepend d-flex w-100">
        {/* Label */}
        <span
          className="input-group-text"
          style={{
            minWidth: (
              minLabelWidth
              ?? undefined
            ),
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          {label}
        </span>

        {/* Contents */}
        <span
          className="input-group-text flex-grow-1 rounded-right"
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderLeftWidth: 0,
          }}
        >
          {children}
        </span>
      </div>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/

// Export component
export default ButtonInputGroup;
