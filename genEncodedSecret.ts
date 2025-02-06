// Import jwt
import jwt from 'jwt-simple';

// Get args
let { REACTKIT_CRED_ENCODING_SALT } = process.env;
if (!REACTKIT_CRED_ENCODING_SALT) {
  REACTKIT_CRED_ENCODING_SALT = process.env.npm_config_salt;
}
if (!REACTKIT_CRED_ENCODING_SALT) {
  console.log('REACTKIT_CRED_ENCODING_SALT is required either as an environment variable or as: --salt=...');
  process.exit(1);
}

// Get secret
let secret = process.env.npm_config_secret;
if (!secret) {
  // Generate a random secret
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  secret = '';
  for (let i = 0; i < 64; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  console.log('Generated a random secret. If you have one in mind, use --secret=...');
}

// Encode the secret
const encodedSecret = jwt.encode(secret, REACTKIT_CRED_ENCODING_SALT);
console.log(`\nNew Secret Generated!\n\nSecret: ${secret}\n\nEncoded Secret: ${encodedSecret}`);