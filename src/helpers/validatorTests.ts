import validateString from "./validateString.js";
import validatePhoneNumber from "./validatePhoneNumber.js";
import validateEmail from "./validateEmail.js";
import validateRegex from './validateRegex.js';

  const reqs = { 
      minLen: 0,
      maxLen: 5, 
      lettersOnly: false,
      numbersOnly: true,
  }
  
  let testString = "austen@gmail.com";
  let response = validateEmail(testString);
  console.log(response);

  // testString = "a@gmail.com";
  // response = validateEmail(testString);
  // console.log(response);

  // testString = "a@gmail.com";
  // response = validateEmail(testString);
  // console.log(response);

  // testString = "a@gmail.com";
  // response = validateEmail(testString);
  // console.log(response);

  /* input was not valid */
//   if (response.isValid === false) { 
//       console.log(response.errorMessage);
//   }
  
//   /* input was valid */
//   else { 
//       console.log(response.cleanedNumber);
//   }

