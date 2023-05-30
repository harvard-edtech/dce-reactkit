import validateString from "./validateString/index";
// import validatePhoneNumber from "./validatePhoneNumber.js";
// import validateEmail from "./validateEmail.js";
// import validateRegex from './shared/helpers/validateRegex.js';

  const reqs = { 
    minLen: 20, 
    maxLen: 2,
    lettersOnly: true, 
    numbersOnly: true, 
    ignoreWhitespace: true,
    regexTest: '/\s+/g',
    regexDescription: 'Must not have whitespace',
  };
  
  let testString = "  ";
  let response = validateString(testString, reqs);


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
  if (response.isValid === false) { 
      console.log(response.errorMessage);
  }
  
//   /* input was valid */
//   else { 
//       console.log(response.cleanedNumber);
//   }

