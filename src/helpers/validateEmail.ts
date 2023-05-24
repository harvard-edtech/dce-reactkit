/** 
 * Determines whether a given email address is valid.
 * @author Austen Money
 * @param email email address
 * @returns whether email fulfills proper formatting requirements 
 */
const validateEmail = (email: string): boolean => {
  
  const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) // regex sourced from HTML living standard

  return emailRegex.test(email);
};

export default validateEmail;