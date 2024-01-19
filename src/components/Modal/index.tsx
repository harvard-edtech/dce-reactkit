/**
 * General use modal component
 * @author Gabe Abrams
 */

// Import React
import React, { useEffect, useRef } from 'react';

// Import shared types
import ModalProps from './ModalProps';

// Import helpers from AppWrapper
import { addModal, removeModal, updateModal } from '../AppWrapper';

/*------------------------------------------------------------------------*/
/* --------------------------- Static Helpers --------------------------- */
/*------------------------------------------------------------------------*/

// Next unique id
let nextUniqueId = 0;

/**
 * Get a new unique id for this modal
 * @author Gabe Abrams
 * @returns new unique id
 */
const getNextUniqueId = (): number => {
  // eslint-disable-next-line no-plusplus
  return nextUniqueId++;
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const Modal: React.FC<ModalProps> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  /* -------------- Refs -------------- */

  // Initialize refs
  const id = useRef<number>(getNextUniqueId());

  /*------------------------------------------------------------------------*/
  /* ------------------------- Lifecycle Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
   * Mount: add to app wrapper
   * @author Gabe Abrams
   */
  useEffect(
    () => {
      addModal(id.current, props);
    },
    [],
  );

  /**
   * Update: update modal props in app wrapper when props change
   * @author Gabe Abrams
   */
  useEffect(
    () => {
      // Update modal props
      updateModal(id.current, props);
    },
    [props],
  );

  /**
   * Unmount: remove from app wrapper when unmounting
   * @author Gabe Abrams
   */
  useEffect(
    () => {
      return () => {
        // Remove modal
        removeModal(id.current);
      };
    },
    [],
  );

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/

  return (
    <div className="Modal-shell d-none" />
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default Modal;
