import validateString from "./validateString.js";
import validatePhoneNumber from "./validatePhoneNumber.js";
import validateEmail from "./validateEmail.js";

  const reqs = { 
      minLen: 0,
      maxLen: 5, 
      lettersOnly: false,
      numbersOnly: true,
  }
  
  const testString: string = "a@gmail.com";

  const response = validateEmail(testString);
  
  console.log(response);

  /* input was not valid */
//   if (response.isValid === false) { 
//       console.log(response.errorMessage);
//   }
  
//   /* input was valid */
//   else { 
//       console.log(response.cleanedNumber);
//   }

