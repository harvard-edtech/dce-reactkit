/**
 * Single cross-server credential
 * @author Gabe Abrams
 */
type CrossServerCredential = {
  // Description of the credential (human-readable)
  description: string,
  // The key of the credential
  key: string,
  // The secret of the credential
  secret: string,
  // The list of scopes for the credential
  scopes: string[],
};

export default CrossServerCredential;
