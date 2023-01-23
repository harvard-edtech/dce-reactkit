/**
 * Drawer container
 * @author Gabe Abrams
 */

// Import React
import React from 'react';

/*------------------------------------------------------------------------*/
/*                                  Types                                 */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // Custom background color
  customBackgroundColor?: string,
  // Children to display
  children: React.ReactNode,
};

/*------------------------------------------------------------------------*/
/*                                  Style                                 */
/*------------------------------------------------------------------------*/

const style = `
  .Drawer-container {
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 0;
    margin-bottom: 1rem;
    padding: 0.75rem;
    border-left: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    border-bottom-left-radius: .25rem;
    border-bottom-right-radius: .25rem;
    box-shadow: inset 0 0 0.5rem 0 rgba(0, 0, 0, 0.05);
  }
`;

/*------------------------------------------------------------------------*/
/*                                Component                               */
/*------------------------------------------------------------------------*/

const Drawer: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /*                                  Setup                                 */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    customBackgroundColor,
    children,
  } = props;

  /*------------------------------------------------------------------------*/
  /*                                 Render                                 */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /*                 Main UI                */
  /*----------------------------------------*/

  return (
    <div
      className="Drawer-container"
      style={{
        backgroundColor: (customBackgroundColor ?? undefined),
      }}
    >
      <style>{style}</style>
      {children}
    </div>
  );
};

/*------------------------------------------------------------------------*/
/*                                 Wrap Up                                */
/*------------------------------------------------------------------------*/

// Export component
export default Drawer;
