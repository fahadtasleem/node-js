var forge = require('node-forge');
var pki = forge.pki;
var fs = require('fs');
var https = require('https');
var crypto = require('crypto');
var URLSafeBase64 = require('urlsafe-base64');
var AeCipher = require('./aecipher');

var keys = pki.rsa.generateKeyPair({
  bits: 2048,
  e: 65537
});
//console.log(keys);
let pemk = pki.privateKeyToPem(keys.privateKey);
fs.writeFileSync('privce.prv', pemk);
fs.writeFileSync('publickey.pub', pki.publicKeyToPem(keys.publicKey));

var cert = pki.createCertificationRequest();
cert.publicKey = keys.publicKey;
cert.version = 1;
// alternatively set public key from a csr
//cert.publicKey = csr.publicKey;
// NOTE: serialNumber is the hex encoded value of an ASN.1 INTEGER.
// Conforming CAs should ensure serialNumber is:
// - no more than 20 octets
// - non-negative (prefix a '00' if your value starts with a '1' bit)
// cert.serialNumber = '01';
// cert.validity.notBefore = new Date();
// cert.validity.notAfter = new Date();
// cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
var attrs = [{
  name: 'commonName',
  value: 'ABCxyz'
}, {
  name: 'countryName',
  value: 'IN'
}, {
  shortName: 'ST',
  value: 'KARNATAKA'
}, {
  name: 'localityName',
  value: 'BANGALORE'
}, {
  name: 'organizationName',
  value: 'COLOR TOKENS'
}, {
  shortName: 'OU',
  value: 'CT'
}];
cert.setSubject(attrs);

cert.setAttributes([{
  name: 'extensionRequest',
  extensions: [{
      name: 'basicConstraints',
      cA: false,
      critical: true
    },
    {
      name: 'subjectAltName',
      altNames: [{
        type: 6, // URI
        value: 'http://example.org/webid#me'
      }]
    },
    {
      name: 'extKeyUsage',
      serverAuth: true,
      clientAuth: true
    }
  ]
}]);
console.log(cert.getAttribute('extensionRequest'));

cert.sign(keys.privateKey, forge.md.sha256.create());

console.log(cert);
let csr = pki.certificationRequestToPem(cert);
//csr = fs.readFileSync('test.csr');
fs.writeFileSync('cert.csr', csr);

let authkey = "RQR1ROkz";

let ae = new AeCipher(authkey);
let enCsr = ae.encrypt(csr);
console.log(enCsr);
let data = {
  csr: enCsr,
  tenantName: 'CTDemo'
};
let hostname = '10.11.70.195';
let requestHeaders = {
  'Content-Type': 'application/json'
};
var options = {
  hostname: hostname,
  port: 443,
  path: '/ca/v1/all/certSignRequest',
  //setHost: false,
  method: 'POST',
  headers: requestHeaders,
  rejectUnauthorized: false
};
console.log('Sending request ');
console.log(data);
var req = https.request(options, function (res) {
  res.setEncoding('utf8');
  res.on('data', function (body) {
    let parsedBody;
    console.log(body)
    try {
      parsedBody = JSON.parse(body);
      let cer = ae.decrypt(parsedBody.certificate);
      console.log(cer);
      console.log('--- YAYAYAYAY- -')
      fs.writeFileSync('certificate.pem', cer);
    } catch (e) {
      console.log("[CTIE] :: unable to parse response");
    }
    //callback(res.statusCode, res.headers, parsedBody);
  });
});

req.on('error', function (e) {
  console.log(`[CTIE] :: HTTPS request failed :: error: ${e.toString()}`);

});
let strdata = JSON.stringify(data);
req.write(strdata);
req.end();

// var req1 = https.request(Object.assign({},options,{path: '/ca/v1/all/getCABundle'}), function(res) {
//   res.setEncoding('utf8');
//   res.on('data', function (body) {
//       let parsedBody;
//       console.log(body)
//       try {
//           parsedBody = JSON.parse(body); 
//           let cer = ae.decrypt(parsedBody.caBundle);
//           console.log(cer);
//           fs.writeFileSync('caBundle.pem',cer);
//       } catch(e) {
//           console.log("[CTIE] :: unable to parse response");
//       }
//       //callback(res.statusCode, res.headers, parsedBody);
//   });
// });

// strdata= JSON.stringify({'tenantName': 'CTDemo'});
// req1.write(strdata);
// req1.end();