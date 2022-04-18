/**
 * An error with a code
 * @author Gabe Abrams
 */
class ErrorWithCode extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'ErrorWithCode';
    this.code = code;
  }
}

export default ErrorWithCode;
