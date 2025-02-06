/**
 * Single cross-server credential
 * @author Gabe Abrams
 */
type CrossServerCredential = {
    description: string;
    key: string;
    encodedeSecret: string;
    scopes: string[];
};
export default CrossServerCredential;
