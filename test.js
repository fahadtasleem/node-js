var crypto = require('crypto');

var AESCrypt = {};

AESCrypt.decrypt = function(cryptkey, iv, encryptdata) {
    var decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv);
    return Buffer.concat([
        decipher.update(encryptdata),
        decipher.final()
    ]);
}

AESCrypt.encrypt = function(cryptkey, iv, cleardata) {
    var encipher = crypto.createCipheriv('aes-256-cbc', cryptkey, iv);
    return Buffer.concat([
        encipher.update(cleardata),
        encipher.final()
    ]);
}

var cryptkey = crypto.createHash('sha256').update('Nixnogen').digest(),
iv = new Buffer('a2xhcgAAAAAAAAAA'),
buf = new Buffer("Here is some data for the encrypt"), // 32 chars
enc = AESCrypt.encrypt(cryptkey, iv, buf);
var dec = AESCrypt.decrypt(cryptkey, iv, enc);

console.warn("encrypt length: ", enc.length);
console.warn("encrypt in Base64:", enc.toString('base64'));
console.warn("decrypt all: " + dec.toString('utf8'));