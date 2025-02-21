/**
 * A box with a tab on the top that holds buttons and other content
 * @author Gabe Abrams
 */

// Import React
import React from 'react';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

type Props = {
  // Title of the box
  title: React.ReactNode,
  // Children/contents inside the box
  children: React.ReactNode,
  // Children to display on the top right of the tab box
  topRightChildren?: React.ReactNode,
  // If true, don't add margin below the tab box
  noBottomMargin?: boolean,
  // If true, don't add padding to bottom of tab box
  noBottomPadding?: boolean,
};

/*------------------------------------------------------------------------*/
/* -------------------------------- Style ------------------------------- */
/*------------------------------------------------------------------------*/

const style = `
  /* Tab Box */
  .TabBox-box {
    /* Light Border */
    border: 0.15rem solid #dedede;
    
    /* Rounded Corners (except top-left) */
    border-bottom-right-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;

    /* Very Light Gray Border */
    background: #fdfdfd;

    /* Align Contents on Left */
    text-align: left;

    /* Add Text Padding */
    padding-left: 0.3rem;
    padding-right: 0.3rem;
  }

  /* Container for Title */
  .TabBox-title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    left: 0;
    text-align: left;
  }

  /* Tab-style Title */
  .TabBox-title {
    /* Place so it Barely Overlaps the Box Border */
    display: inline-block;
    position: relative;
    top: 0.15rem; /* Gives Illusion that Border Doesn't Exist Below Tab */

    /* Title-sized Font */
    font-size: 1.5rem;

    /* Add Border on Top and Sides */
    border-top: 0.15rem solid #dedede;
    border-left: 0.15rem solid #dedede;
    border-right: 0.15rem solid #dedede;

    /* Round the Top Corners */
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;

    /* Add Text Padding */
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    /* Match Background Color of Box */
    background: #fdfdfd;
  }

  /* Container for the top-right children */
  .TabBox-title-right {
    margin-right: 0.5rem;
  }

  /* Make the TabBox's Children Appear Above Title if Overlap Occurs */
  .TabBox-children {
    position: relative;
    z-index: 1;
  }
`;

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const TabBox: React.FC<Props> = (props) => {
  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  const {
    title,
    children,
    topRightChildren,
    noBottomPadding,
    noBottomMargin,
  } = props;

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  return (
    <div className={`TabBox-container ${noBottomMargin ? '' : 'mb-2'}`}>
      {/* Style */}
      <style>{style}</style>

      {/* Title Row with Left and Right sections */}
      <div className="TabBox-title-container">
        <div className="TabBox-title">
          {title}
        </div>
        {topRightChildren && (
          <div className="TabBox-title-right">
            {topRightChildren}
          </div>
        )}
      </div>

      {/* Contents */}
      <div className={`TabBox-box ps-2 pt-2 pe-2 ${noBottomPadding ? '' : 'pb-2'}`}>
        <div className="TabBox-children">
          {children}
        </div>
      </div>
    </div>
  );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default TabBox;
