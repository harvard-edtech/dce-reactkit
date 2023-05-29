"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./validateString/index");
// import validatePhoneNumber from "./validatePhoneNumber.js";
// import validateEmail from "./validateEmail.js";
// import validateRegex from './shared/helpers/validateRegex.js';
var reqs = {
    minLen: 0,
    maxLen: 5,
    lettersOnly: false,
    numbersOnly: true,
};
var testString = "austen@gmail.com";
var response = (0, index_1.default)(testString, reqs);
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
