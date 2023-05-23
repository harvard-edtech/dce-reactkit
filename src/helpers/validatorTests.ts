import validateString from "./validateString.js";
import validatePhoneNumber from "./validatePhoneNumber.js";

  const reqs = { 
      minLen: 0,
      maxLen: 5, 
      lettersOnly: false,
      numbersOnly: true,
  }
  
  const testString: string = "803----0       43----52 99";

  const response = validatePhoneNumber(testString);
  
  /* input was not valid */
  if (response.isValid === false) { 
      console.log(response.errorMessage);
  }
  
  /* input was valid */
  else { 
      console.log(response.cleanedNumber);
  }

