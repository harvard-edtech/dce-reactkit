/**
 * Single cross-server credential
 * @author Gabe Abrams
 */
type CrossServerCredential = {
  // Description of the credential (human-readable)
  description: string,
  // The key of the credential
  key: string,
  // The encoded secret of the credential
  encodedeSecret: string,
  // The list of scopes for the credential
  scopes: string[],
};

export default CrossServerCredential;
