export declare const INVALID_REGEX_ERROR = "input does not follow the requested format";
export declare const INVALID_EMAIL_ERROR = "Please provide a valid email address.";
export declare const INVALID_PHONE_ERROR = "Please provide a valid phone number.";
export declare const INVALID_STRING_ERRORS: {
    MIN_LEN: (minLen: number) => string;
    MAX_LEN: (maxLen: number) => string;
    LETTERS_ONLY: string;
    NUMBERS_ONLY: string;
    MESSAGE_INTRO: string;
};
