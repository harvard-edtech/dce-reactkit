// Import React
import React from 'react';

// Regular express that matches urls
const urlRegex = /(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,6}(:[0-9]{1,5})?(\/\S*)?/g;

/**
 * Given some text, make the links clickable
 * @author Gabe Abrams
 * @param text the text to process
 * @param [opts] options to customize behavior
 * @param [opts.newTab] if true, links will open in a new tab
 * @param [opts.preventPropagation] if true, clicks to link will prevent
 *   propagation
 * @param [opts.inheritColor] if true, inherit text color for links
 * @returns the processed text
 */
const makeLinksClickable = (
  text: string,
  opts?: {
    newTab?: boolean,
    preventPropagation?: boolean,
    inheritColor?: boolean,
  },
): React.ReactNode => {
  // Search text for links
  let matches = urlRegex.exec(text);

  // If no matches, just return the text
  if (!matches) {
    return text;
  }

  // Check if using new tab
  const newTab = opts?.newTab;

  // Next element key
  let nextKey = 0;

  // Process each link
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  while (matches) {
    // Get the link
    const link = matches[0];

    // Get the index of the link
    const { index } = matches;

    // Add the text before the link
    elements.push(
      <span key={nextKey += 1}>
        {text.substring(lastIndex, index)}
      </span>,
    );

    // Add the link
    elements.push(
      <a
        key={nextKey += 1}
        href={link}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
        style={{
          textDecoration: 'underline',
          color: opts?.inheritColor ? 'inherit' : undefined,
        }}
        onClick={(e) => {
          // Prevent propagation if requested
          if (opts?.preventPropagation) {
            e.stopPropagation();
          }
        }}
      >
        {link}
      </a>,
    );

    // Update the last index
    lastIndex = index + link.length;

    // Get the next match
    matches = urlRegex.exec(text);
  }

  // Add the last bit of text
  const remainingText = text.substring(lastIndex);
  if (remainingText && remainingText.length > 0) {
    elements.push(
      <span key={nextKey += 1}>
        {remainingText}
      </span>,
    );
  }

  // Return the elements
  return elements;
};

export default makeLinksClickable;
