/**
 * Single cross-server credential
 * @author Gabe Abrams
 */
type CrossServerCredential = {
    description: string;
    key: string;
    secret: string;
    scopes: string[];
};
export default CrossServerCredential;
