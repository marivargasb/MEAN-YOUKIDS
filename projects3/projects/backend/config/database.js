const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

// Export config object
module.exports = {
  uri: 'mongodb://127.0.0.1:27017/tubeKids2', // Databse URI and database name
  secret: crypto, // Cryto-created secret
  useNewUrlParser: true,
  db: 'tubeKids2' // Database name
}
