import validateString from "./validateString.js";

  const reqs = { 
      minLen: 0, /* must be less than maxLen (not enforced) */
      maxLen: 5, 
      lettersOnly: false
  }
  
  const testString: string = '99999';

  const response = validateString(testString, reqs);
  
  /* input was not valid */
  if (response.isValid === false) { 
      console.log(response.errorMessages);
  }
  
  /* input was valid */
  else { 
      console.log('VALID!');
  }

