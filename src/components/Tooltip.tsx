/**
 * Simple tooltip component
 * @author Gabe Abrams
 */

// Import React
import React, { useEffect, useRef } from 'react';

// Import Bootstrap
import { Tooltip as BSTooltip } from 'bootstrap';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
  // Text of the tooltip
  text: string,
  // Children to wrap in the tooltip
  children: JSX.Element,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const Tooltip: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Props ------------- */

  // Destructure all props
  const {
    text,
    children,
  } = props;

  /* -------------- Refs -------------- */

  // Child ref
  const childRef = useRef<Element>(undefined as unknown as Element);

  /*------------------------------------------------------------------------*/
  /* ------------------------- Lifecycle Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Update (also called on mount)
   * @author Gabe Abrams
   */
  useEffect(
    () => {
      // Skip if no child
      if (!childRef.current) {
        return;
      }

      // Initialize tooltip
      const t = new BSTooltip(
        childRef.current,
        {
          title: text,
          placement: 'top',
          trigger: 'hover',
        },
      );

      // Clean up tooltip
      return () => {
        t.dispose();
      };
    },
    [text],
  );

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  // Clone child and add ref
  return React.cloneElement(
    children,
    { ref: childRef },
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default Tooltip;
