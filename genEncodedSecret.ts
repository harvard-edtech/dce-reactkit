// Import crypto lib
import crypto from 'crypto';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// Get args
const REACTKIT_CRED_ENCODING_SALT = process.env.npm_config_salt;
if (!REACTKIT_CRED_ENCODING_SALT) {
  console.log('Encoding salt is required: --salt=...');
  process.exit(1);
}

// Get the key
let key = process.env.npm_config_key;
if (!key) {
  console.log('Key is required: --key=...');
  process.exit(1);
}

// Get the description
let description = process.env.npm_config_description;
if (!description) {
  console.log('Description is required: --description=...');
  process.exit(1);
}

// Get secret
let secret = process.env.npm_config_secret;
if (!secret) {
  // Generate a random secret
  secret = '';
  for (let i = 0; i < 32; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  console.log('Generated a random secret. If you have one in mind, use --secret=...');
}

// Get the host name
const host = process.env.npm_config_host;
if (!host) {
  console.log('Host of the receiving server is required: --host=...');
  process.exit(1);
}

// Encryption process based on:
// https://medium.com/@tony.infisical/guide-to-nodes-crypto-module-for-encryption-decryption-65c077176980

// Create a random initialization vector
const iv = crypto.randomBytes(12).toString('base64');

// Create a cipher
const cipher = crypto.createCipheriv(
  'aes-256-gcm',
  Buffer.from(secret, 'base64'),
  Buffer.from(iv, 'base64'),
);

// Encrypt the string
let ciphertext = cipher.update(secret, 'utf8', 'base64');

// Finalize the encryption
ciphertext += cipher.final('base64');

// Get the authentication tag
const tag = cipher.getAuthTag();

// JSONify the encrypted data
const encryptionPack = encodeURIComponent(JSON.stringify({
  ciphertext,
  iv,
  tag,
}));

// Show the encrypted data
console.log('\n\n');
console.log('––––– Done! What\'s Next: –––––');
console.log('');
console.log('On the server *sending* the requests, append the following to the REACTKIT_CROSS_SERVER_CREDENTIALS env var:');
console.log(`|${host}:${key}:${secret}|`);
console.log('');
console.log('On the server *receiving* the requests, add an entry to the "CrossServerCredential" collection:');
console.log(`{ "description": "${description}", "key": "${key}", "encodedeSecret": "${encryptionPack}", "scopes": [] }`);
console.log('');
console.log('For all scopes that the server should have access to, add them to the "scopes" array.');
