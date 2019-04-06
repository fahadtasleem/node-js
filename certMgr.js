var forge = require('node-forge');
var pki = forge.pki;
var fs = require('fs');
var https = require('https');
var AeCipher = require('./aecipher');

class CertMgr {
    constructor() {

    }

    generateKeyPair() {
        this.keys = pki.rsa.generateKeyPair(2048);
        let pemk = pki.privateKeyToPem(this.keys.privateKey);
        fs.writeFileSync('privce.prv', pemk);
        fs.writeFileSync('publickey.pub', pki.publicKeyToPem(this.keys.publicKey));
    }

    generateCSR() {
        var csr = pki.createCertificationRequest();
        csr.publicKey = this.keys.publicKey;
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
        csr.setSubject(attrs);
        csr.setAttributes([{
            name: 'extensionRequest',
            extensions: [{
                    name: 'basicConstraints',
                    cA: false
                },
                //#TODO {
                //     name: 'subjectAltName',
                //     altNames: [{
                //         type: 6, // URI
                //         value: 'http://ABCxyz.com'
                //     }]
                // },
                {
                    name: 'extKeyUsage',
                    serverAuth: true,
                    clientAuth: true
                }
            ]
        }]);

        csr.sign(this.keys.privateKey, forge.md.sha256.create());
        return pki.certificationRequestToPem(csr);
    }

    generateCertificate(c) {
        this.generateKeyPair();
        let csr = this.generateCSR();
        this.ae = new AeCipher(c.authkey);
        let enCsr = this.ae.encrypt(csr);
        this.getCertFromCA(enCsr);
    }

    getCertFromCA(enCsr) {
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
            method: 'POST',
            headers: requestHeaders,
            rejectUnauthorized: false,
        };
        let that = this;
        var req = https.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (body) {
                let parsedBody;
                console.log(body)
                try {
                    parsedBody = JSON.parse(body);
                    let cert = that.ae.decrypt(parsedBody.certificate);
                    console.log(cert);
                    fs.writeFileSync('certificate.pem', cert);
                } catch (e) {
                    console.log(e);
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
    }
}

module.exports = CertMgr;


let c = new CertMgr();
c.generateCertificate({authkey: 'RQR1ROkz'});