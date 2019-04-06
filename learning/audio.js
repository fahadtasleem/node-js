var fs = require('fs');

var t = fs.readFileSync('./poc/audio.txt');

//console.log(t.toString('binary').toString('binary'));
var b = Buffer.from(t.toString(),'base64');
fs.writeFileSync("a.mp3",b);