var forge = require('node-forge');
var pki = forge.pki;
var fs = require('fs');
var https = require('https');
var crypto = require('crypto');
var URLSafeBase64 = require('urlsafe-base64');

class AeCipher{
    constructor(key,iv){
        this.key = key;
        this.salt = 'T3!(rAwqq1';
        this.iv = iv || '0123456789012345';
        this.enckey = crypto.pbkdf2Sync(key, this.salt, 1000, 32, 'sha256').toString('base64');
        this.enckey = URLSafeBase64.encode(this.enckey);
        var buf = Buffer.from(this.enckey, 'base64');
        this.sigingKey = buf.slice(0,16);
        this.encryptionKey = buf.slice(16);
    }

    encrypt(data){
        //crypto.fips = true;
        console.log(crypto.fips);
        console.log(this.enckey);
        console.log(this.sigingKey.toString());
        console.log(this.encryptionKey.toString());
        let iv = new Buffer(crypto.randomBytes(16));
        console.log('iv '+iv.toString())
        let cipher = crypto.createCipheriv('aes-128-cbc', this.encryptionKey, iv);
        var encrypted = Buffer.concat([cipher.update(data),cipher.final()]);
        console.log('-----')
        console.log(encrypted+' ');
        let eBuf = Buffer.from('80','hex');
        let iBuf = new Buffer(8);
        iBuf.writeInt16BE(1234);
        let ivBuf = Buffer.from(iv);
        let strBuf = Buffer.from(encrypted);
        console.log(strBuf);
        console.log('orig size '+strBuf.length);
        let temp = Buffer.concat([eBuf,iBuf,ivBuf],eBuf.length+iBuf.length+ivBuf.length);
        console.log(temp.length+' '+eBuf.length+' '+iBuf.length+' '+ivBuf.length);
        let partsBuf = Buffer.concat([temp,strBuf],temp.length+strBuf.length);
        console.log(partsBuf+ '  '+partsBuf.length);
        //console.log(parts,);
        let hash = crypto.createHmac('sha256', this.sigingKey).update(partsBuf).digest();
        console.log(hash);
        let hBuf = hash;
        partsBuf = Buffer.concat([partsBuf,hBuf],partsBuf.length+hBuf.length);
        console.log(partsBuf.toString());
        partsBuf = partsBuf.toString('base64');
        encrypted = URLSafeBase64.encode(new Buffer(partsBuf)).toString('base64');
        console.log(encrypted);
        return encrypted;
        //console.log(new Buffer(str).toString('base64'));
    }

    decrypt(data){
        data = URLSafeBase64.decode(data);
        console.log('decrypt --- - - -');
        data = Buffer.from(data.toString(),'base64');
        console.log(data+ ' '+data.length);
        let h = crypto.createHmac('sha256', this.sigingKey);
        let hmaxdata = data.slice(data.length-32,data.length);
        let d = data.slice(0,data.length-32);
        h.update(d);
        console.log(hmaxdata.toString('base64')+' '+d.length);
        let ddi = h.digest('base64');
        console.log(ddi);
        let iv = data.slice(9,25);
        let cipherText = data.slice(25,data.length-32);
        console.log(iv.toString())
        console.log(iv.length+' '+cipherText.length);
        console.log(cipherText.toString());
        let decipher = crypto.createDecipheriv('aes-128-cbc',this.encryptionKey,iv);
        let dt = Buffer.concat([
            decipher.update(cipherText),
            decipher.final()
        ]);
        console.log(dt.toString('utf-8'));
        return dt.toString('utf-8');
        //decipher.final('utf-8');
    }
}

// let a =new AeCipher('wdnmkhWU');
// let d = a.encrypt('ABCD');
// let c = a.decrypt(d);

module.exports = AeCipher;