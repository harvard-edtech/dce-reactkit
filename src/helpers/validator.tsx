/**
 * 
 * validator.tsx
 * 
 */

type Result = 
    | { isValid: true, prettyInput: string } 
    | { isValid: false, errorMessage: string }

type Requirements = {
    minLen?: number 
    maxLen?: number 
    lettersOnly?: boolean 
}

/** 
 * Determines whether a given input string is considered valid based on 
 * the provided requirements.
 * @author Austen Money
 * @param input string containing user input 
 * @param reqs requirements that input should conform to 
 * @returns whether input is considered valid and either a formatted version 
 *          of the input (if valid) or an error message (if invalid) 
 */
const validate = (input: string, reqs: Requirements): Result => {

    if (reqs.maxLen) { /* apply max char requirement */
        if (input.trim().length > reqs.maxLen) { /* account for whitespace */
            return { /* invalid input is longer than max */
                isValid: false,
                errorMessage: `Input must not be over ${reqs.maxLen} characters.`
            } // pass over all failed checks
        }
    }

    if (reqs.minLen) { /* apply min char requirement */
        if (input.trim().length < reqs.minLen) { /* account for whitespace */
            return { /* invalid input is shorter than min */
                isValid: false,
                errorMessage: `Input must not be under ${reqs.minLen} characters.`
            }
        }
    }

    if (reqs.lettersOnly) { /* apply alphabetical requirement */
        /* determine whether input contains only alphabetical characters */
        for (let i = 0, len = input.length; i < len; i++) {
            let curr = input.charCodeAt(i);

            if (!(curr > 64 && curr < 91) && /* upper alpha (A-Z) */
                !(curr > 96 && curr < 123) && /* lower alpha (a-z) */
                !(curr === 32 || curr === 13)) { /* whitespace */

                return { /* invalid input contains non-alphabetical character */
                    isValid: false,
                    errorMessage: `Input must not contain non-letters.`
                }
            }
        }
    }

    /* make input obj format pretty here */
    let formatted: string = input.toUpperCase();
    formatted = '"' + formatted.trim() + '"';

    return { /* input is valid, so return true + formatted version */
        isValid: true,
        prettyInput: formatted
    }
}

/** 
 * Applies given requirements to user-provided input, alerting user and 
 * preventing further input while input does not conform to requirements. 
 * When input conforms to requirements, it is formatted and displayed as 
 * an HTML object.  
 * @author Austen Money
 * @param docInput object containing user text input 
 * @param reqs requirements that input should conform to 
 * @returns none
 */
const handleInput = (docInput: any, reqs: Requirements) => { 
    docInput.addEventListener('keyup', () => {
        const response: Result = validate(docInput.value, reqs);
        
        /* input was not valid */
        if (response.isValid === false) { 
            window.alert(response.errorMessage);
            docInput.value = docInput.value.slice(0, -1);
        }
        
        /* input was valid */
        else { 
            let htmlMessage = document.getElementById("message");
            if (htmlMessage !== null) {
                htmlMessage.innerHTML = response.prettyInput;
            }
        }
    })
}

/* alter depending on what rules are applied to input */
const reqs: Requirements = { 
    // minLen: 2, /* doesn't work with decider function */
    maxLen: 5, 
    lettersOnly: true
}

const docInput: any = document.getElementById("input");

if (docInput !== null) {
    handleInput(docInput, reqs);
}
