var http = require('http');
var fs = require('fs');

let s = http.createServer((req,res)=>{
    let filePath = './bridgeTest.js';
    var stat = fs.statSync(filePath);
    console.log(stat.size);
    res.writeHead(200, {
        'Content-Type': "application/octet-stream",
        "Content-Disposition": "attachment; filename=abc.txt",
        'Content-Length': stat.size
    });
    fs.createReadStream(filePath).pipe(res);
    
});

s.listen(8090);
console.log('Listening...')