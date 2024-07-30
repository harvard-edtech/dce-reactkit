// /**
//  * This function finds URLs within a given string and returns an array of 
//  * their locations.
//  * @author Leisha Bhandari
//  * @param block: The block of text to search for URLs
//  * @returns Arrays where each of them contain the start and end index of the URL
//  */
// function findURLs(block: string): { start: number, end: number }[] {
//   // Expression representing the skeleton of a URL to help match and find the  
//   // URLs within the block of text (Also takes care of Unicode characters)
//   const urlSkeleton = /(https?:\/\/[^\s\u0000-\u001F.,]+[^\s\u0000-\u001F.,]?(?:\?[^\s\u0000-\u001F]+)?(?:#[^\s\u0000-\u001F]+)?)/g;
//   const found: { start: number, end: number }[] = [];
//   let match: RegExpExecArray | null;

//   // While loop to find the URLs in the given block of texts using the URL 
//   // skeleton
//   while ((match === urlSkeleton.exec(block)) 
//          && match !== null) {
//     // To find the beginning index of the URL
//     let start = match.index;
//     // To find the last index of the URL
//     let end = match.index + match[0].length;

//     // If statements to check whether the URL is followed by some kind of 
//     // punctuation mark
//     if (block.charAt(end) === '.' || /[,;:!?"]/.test(block.charAt(end))) {
//       end--;
//     }

//     // While statement to make sure that the URL does not start with a 
//     // punctuation mark
//     while (start > 0 && /[.,:;!?]/.test(block.charAt(start - 1))) {
//       start--;
//     }

//     // The object with start and end index of the URL is found and pushed to 
//     // the found array
//     found.push({ start, end });
//   }
  
//   // Returns the array of the found URLs location
//   return found;
// }